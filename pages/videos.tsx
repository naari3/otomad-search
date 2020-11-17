import Head from "next/head";
import { GetServerSideProps } from "next";

import { VideoClient, Video, QueryParams, VideoSortKeys } from "../lib/search";
import VideoList from "../components/VideoList";

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

export default function Videos({
  videos,
}: {
  videos: Pick<Video, typeof allFields[number]>[];
}) {
  return (
    <>
      <Head>
        <title>検索結果</title>
      </Head>
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

const getSearchQuery = ({ sort }: { sort?: string }): QueryParams => {
  if (!VideoSortKeys.map((a) => `${a}`).includes(sort.replace(/^[-+]/, ""))) {
    sort = "-startTime";
  }

  return Object.assign(defaultQuery, {
    _sort: sort,
  });
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const client = new VideoClient({ context: "otomad-search" });

  console.log(query);
  const videos = (await client.search(getSearchQuery(query), allFields)).data
    .data;

  return {
    props: {
      videos,
    },
  };
};
