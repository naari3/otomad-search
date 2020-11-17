import Head from "next/head";
import { GetServerSideProps } from "next";

import { VideoClient, Video } from "../lib/search";
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

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const client = new VideoClient({ context: "otomad-search" });

  const videos = (
    await client.search(
      {
        _sort: "-mylistCounter",
        q: "音MAD",
        targets: "tags",
        _limit: 100,
      },
      allFields
    )
  ).data.data;

  return {
    props: {
      videos,
    },
  };
};
