import Head from "next/head";
import { GetServerSideProps } from "next";
import styles from "../styles/Search.module.css";
import { useDispatch } from "../contexts/SearchContext";
import { SearchOptions } from "../reducers/search";
import { useEffect } from "react";

import { VideoClient, Video, QueryParams, VideoSortKeys } from "../lib/search";
import VideoList from "../components/VideoList";

import Layout from "../components/Layout";
import parseLimitedFloat from "../lib/parseLimitedFloat";

export const allFields = [
  "contentId",
  "title",
  "description",
  "userId",
  "viewCounter",
  "thumbnailUrl",
  "startTime",
  "commentCounter",
  "categoryTags",
  "channelId",
  "tags",
  "mylistCounter",
  "lengthSeconds",
  "threadId",
  "lastCommentTime",
  "lockTagsExact",
  "genre",
] as const;

export default function Search({
  videos,
  searchOptions,
}: {
  videos: Pick<Video, typeof allFields[number]>[];
  searchOptions: SearchOptions;
}) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: "update",
      payload: { ...searchOptions },
    });
  }, [searchOptions]);

  return (
    <Layout>
      <Head>
        <title>検索結果</title>
      </Head>
      <VideoList videos={videos} />
    </Layout>
  );
}

const LIMIT = 100;
const defaultQuery: QueryParams = {
  _sort: "startTime",
  q: "音MAD",
  targets: "tagsExact",
  _limit: LIMIT,
};

const calcOffset = (page?: number): number => {
  if (!page || page < 0) {
    page = 1;
  }
  let offset = (page - 1) * LIMIT;
  if (offset > 1600) {
    return 1600;
  }

  return offset;
};

const getSearchQuery = ({
  _sort,
  mylistCounterGte,
  mylistCounterLte,
  lengthMinutesGte,
  lengthMinutesLte,
  startTimeGte,
  startTimeLte,
  page,
}: SearchOptions): QueryParams => {
  if (
    _sort === null ||
    !VideoSortKeys.map((a) => `${a}`).includes(_sort.replace(/^[-+]/, ""))
  ) {
    _sort = "-startTime";
  }

  const _offset = calcOffset(page);

  let filters = {};

  if (mylistCounterGte) {
    if (!filters["mylistCounter"]) {
      filters["mylistCounter"] = {};
    }
    filters["mylistCounter"]["gte"] = mylistCounterGte;
  }
  if (mylistCounterLte !== null) {
    if (!filters["mylistCounter"]) {
      filters["mylistCounter"] = {};
    }
    filters["mylistCounter"]["lte"] = mylistCounterLte;
  }

  if (startTimeGte) {
    if (!filters["startTime"]) {
      filters["startTime"] = {};
    }
    filters["startTime"]["gte"] = startTimeGte;
  }
  if (startTimeLte) {
    if (!filters["startTime"]) {
      filters["startTime"] = {};
    }
    filters["startTime"]["lte"] = startTimeLte;
  }

  if (lengthMinutesGte) {
    if (!filters["lengthSeconds"]) {
      filters["lengthSeconds"] = {};
    }
    filters["lengthSeconds"]["gte"] = lengthMinutesGte * 60;
  }
  if (lengthMinutesLte) {
    if (!filters["lengthSeconds"]) {
      filters["lengthSeconds"] = {};
    }
    filters["lengthSeconds"]["lte"] = lengthMinutesLte * 60;
  }

  return Object.assign(defaultQuery, {
    _sort,
    _offset,
    filters,
  });
};

const parseQueryToString = (target: string | string[]): string | null => {
  const result = Array.isArray(target) ? target[0] : target;
  return result ? result : null;
};

const parseQueryToInt = (target: string | string[]): number | null => {
  const result = parseInt(parseQueryToString(target));
  return Number.isNaN(result) ? null : result;
};

const parseQueryToLimitedFloat = (target: string | string[]): number | null => {
  const result = parseLimitedFloat(parseQueryToString(target));
  return Number.isNaN(result) ? null : result;
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const client = new VideoClient({ context: "otomad-search" });
  console.log(query);
  const searchOptions: SearchOptions = {
    _sort: parseQueryToString(query._sort) || null,
    mylistCounterGte: parseQueryToInt(query.mylistCounterGte),
    mylistCounterLte: parseQueryToInt(query.mylistCounterLte),
    lengthMinutesGte: parseQueryToLimitedFloat(query.lengthMinutesGte),
    lengthMinutesLte: parseQueryToLimitedFloat(query.lengthMinutesLte),
    startTimeGte: parseQueryToString(query.startTimeGte),
    startTimeLte: parseQueryToString(query.startTimeLte),
    page: parseQueryToInt(query.page),
  };

  const searchQuery = getSearchQuery(searchOptions);
  const response = (await client.search(searchQuery, allFields)).data;
  const videos = response.data;

  return {
    props: {
      videos,
      searchOptions: {
        count: response.meta.totalCount,
        ...searchOptions,
        page:
          !!searchOptions.page || searchOptions.page < 0
            ? searchOptions.page
            : 1,
      },
    },
  };
};
