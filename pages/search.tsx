import Head from "next/head";
import { GetServerSideProps } from "next";
import styles from "../styles/Search.module.css";
import { SearchOptions, useDispatch } from "../contexts/SearchContext";
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

const defaultQuery: QueryParams = {
  _sort: "startTime",
  q: "音MAD",
  targets: "tagsExact",
  _limit: 100,
};

const getSearchQuery = ({
  _sort,
  mylistCounterGte,
  mylistCounterLt,
  startTimeGte,
  startTimeLt,
}: SearchOptions): QueryParams => {
  if (
    _sort === null ||
    !VideoSortKeys.map((a) => `${a}`).includes(_sort.replace(/^[-+]/, ""))
  ) {
    _sort = "-startTime";
  }

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
  };

  const searchQuery = getSearchQuery(searchOptions);
  const videos = (await client.search(searchQuery, allFields)).data.data;

  console.log(query);
  console.log(searchQuery);
  return {
    props: {
      videos,
      searchOptions,
    },
  };
};
