import Head from "next/head";
import { GetServerSideProps } from "next";
import styles from "../styles/Search.module.css";
import { useDispatch } from "../contexts/SearchContext";
import { SearchOptions } from "../reducers/search";
import { useEffect } from "react";

import { VideoClient, Video, QueryParams, VideoSortKeys } from "../lib/search";
import VideoList from "../components/VideoList";

import Layout from "../components/Layout";

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
  mylistCounterLt,
  startTimeGte,
  startTimeLt,
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
  if (mylistCounterLt) {
    if (!filters["mylistCounter"]) {
      filters["mylistCounter"] = {};
    }
    filters["mylistCounter"]["lt"] = mylistCounterLt;
  }

  if (startTimeGte) {
    if (!filters["startTime"]) {
      filters["startTime"] = {};
    }
    filters["startTime"]["gte"] = startTimeGte;
  }
  if (startTimeLt) {
    if (!filters["startTime"]) {
      filters["startTime"] = {};
    }
    filters["startTime"]["lt"] = startTimeLt;
  }

  return Object.assign(defaultQuery, {
    _sort,
    _offset,
    filters,
  });
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const client = new VideoClient({ context: "otomad-search" });
  const searchOptions: SearchOptions = {
    _sort: (Array.isArray(query._sort) ? query._sort[0] : query._sort) || null,
    mylistCounterGte:
      parseInt(
        Array.isArray(query.mylistCounterGte)
          ? query.mylistCounterGte[0]
          : query.mylistCounterGte
      ) || null,
    mylistCounterLt:
      parseInt(
        Array.isArray(query.mylistCounterLt)
          ? query.mylistCounterLt[0]
          : query.mylistCounterLt
      ) || null,
    startTimeGte: Array.isArray(query.startTimeGte)
      ? query.startTimeGte[0]
      : query.startTimeGte || null,
    startTimeLt: Array.isArray(query.startTimeLt)
      ? query.startTimeLt[0]
      : query.startTimeLt || null,
    page:
      parseInt(Array.isArray(query.page) ? query.page[0] : query.page) || null,
  };

  const searchQuery = getSearchQuery(searchOptions);
  const response = (await client.search(searchQuery, allFields)).data;
  const videos = response.data;

  console.log(query);
  console.log(searchQuery);
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
