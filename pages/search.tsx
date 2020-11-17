import Head from "next/head";
import { GetServerSideProps } from "next";

import { VideoClient, Video, QueryParams, VideoSortKeys } from "../lib/search";
import VideoList from "../components/VideoList";

import SearchBar from "../components/SearchBar";

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
  searchOptions: QueryParams;
}) {
  return (
    <>
      <Head>
        <title>検索結果</title>
      </Head>
      <SearchBar searchOptions={searchOptions} />
      <VideoList videos={videos} />
    </>
  );
}

const defaultQuery: QueryParams = {
  _sort: "startTime",
  q: "音MAD",
  targets: "tagsExact",
  _limit: 100,
};

const getSearchQuery = ({ _sort }: { _sort?: string }): QueryParams => {
  if (
    _sort === undefined ||
    !VideoSortKeys.map((a) => `${a}`).includes(_sort.replace(/^[-+]/, ""))
  ) {
    _sort = "-startTime";
  }

  return Object.assign(defaultQuery, {
    _sort,
  });
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const client = new VideoClient({ context: "otomad-search" });

  console.log(query);
  const searchQuery = getSearchQuery(query);
  const videos = (await client.search(searchQuery, allFields)).data.data;

  return {
    props: {
      videos,
      searchOptions: searchQuery,
    },
  };
};
