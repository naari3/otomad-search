import React, { FC } from "react";
import Head from "next/head";
import Layout from "../components/Layout";

import { GetServerSideProps } from "next";
import { getSearchQuery, VideoSnapshotClient } from "../lib/search";
import { SearchOptions } from "../reducers/search";
import { usedFields } from "../components/VideoDetail";
import { actualMaxPageNumber, MAX_SS_OFFSET } from "../lib/pager";
import { parseQueryToInt, parseQueryToLimitedFloat, parseQueryToString, roundDate, roundNumber } from "../lib/parseQuery";

const Random: FC = () => {
  return (
    <Layout>
      <Head>
        <title>otomad-search</title>
      </Head>
      hi, there
    </Layout>
  );
};

export default Random;

const getRandomYear = () => {
  const min = 2007;
  const max = new Date().getFullYear();
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { query } = ctx;

  const client = new VideoSnapshotClient({
    context: "otomad-search",
  });
  const searchOptions: SearchOptions = {
    q: parseQueryToString(query.q) || "",
    _sort: parseQueryToString(query._sort),
    mylistCounterGte: roundNumber(parseQueryToInt(query.mylistCounterGte)),
    mylistCounterLte: roundNumber(parseQueryToInt(query.mylistCounterLte)),
    viewCounterGte: roundNumber(parseQueryToInt(query.viewCounterGte)),
    viewCounterLte: roundNumber(parseQueryToInt(query.viewCounterLte)),
    likeCounterGte: roundNumber(parseQueryToInt(query.likeCounterGte)),
    likeCounterLte: roundNumber(parseQueryToInt(query.likeCounterLte)),
    lengthMinutesGte: roundNumber(parseQueryToLimitedFloat(query.lengthMinutesGte)),
    lengthMinutesLte: roundNumber(parseQueryToLimitedFloat(query.lengthMinutesLte)),
    // userId: roundNumber(parseQueryToInt(query.userId)),
    startTimeGte: roundDate(parseQueryToString(query.startTimeGte)),
    startTimeLte: roundDate(parseQueryToString(query.startTimeLte)),
    page: 1,
    per: 100,
  };

  let response = await client.search(getSearchQuery(searchOptions), ["contentId"]);
  if (response.meta.totalCount > MAX_SS_OFFSET) {
    // 結果があまりにも巨大だったらランダムな年を指定して検索
    const randYear = getRandomYear();
    const startYear = new Date(randYear, 0, 1).toISOString();
    const endYear = new Date(randYear, 11, 31).toISOString();
    searchOptions.startTimeGte = roundDate(startYear);
    searchOptions.startTimeLte = roundDate(endYear);

    response = await client.search(getSearchQuery(searchOptions), ["contentId"]);
  }
  const actualMaxPageNum = actualMaxPageNumber(searchOptions.per, response.meta.totalCount, MAX_SS_OFFSET);

  const randomPage = Math.floor(Math.random() * actualMaxPageNum) + 1;

  const randomPageResponse = await client.search(getSearchQuery({ ...searchOptions, page: randomPage }), usedFields);
  const randomVideo = randomPageResponse.data[Math.floor(Math.random() * randomPageResponse.data.length)];

  if (!randomVideo) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    redirect: {
      destination: `https://www.nicovideo.jp/watch/${randomVideo.contentId}`,
      permanent: false,
    },
  };
};
