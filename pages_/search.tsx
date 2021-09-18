import Head from "next/head";
import { GetServerSideProps } from "next";
import { useDispatch as useSearchDispatch } from "../contexts/SearchContext";
import { useDispatch as useLoadingDispatch } from "../contexts/LoadingContext";
import { useDispatch as useViewingDispatch } from "../contexts/ViewingContext";
import { State as ViewingState } from "../reducers/viewing";
import { SearchOptions } from "../reducers/search";
import { useEffect } from "react";
import NextErrorComponent from "next/error";

import {
  VideoClient,
  VideoSnapshotClient,
  Video,
  QueryParams,
  VideoSortKeys,
  Response,
} from "../lib/search";
import VideoList from "../components/VideoList";
import { usedFields } from "../components/VideoDetail";

import Layout from "../components/Layout";
import parseLimitedFloat from "../lib/parseLimitedFloat";

import { parseCookies } from "nookies";

import { format } from "date-fns";
import * as Sentry from "@sentry/node";
import { AxiosError } from "axios";

import { actualMaxPageNumber, MAX_OFFSET, MAX_SS_OFFSET } from "../lib/pager";

export default function Search({
  videos,
  searchOptions,
  viewing,
  errorCode,
}: {
  videos: Pick<Video, typeof usedFields[number]>[];
  searchOptions: SearchOptions;
  viewing: ViewingState;
  errorCode?: number;
}): JSX.Element {
  const searchDispatch = useSearchDispatch();
  const loadingDispatch = useLoadingDispatch();
  const viewingDispatch = useViewingDispatch();

  useEffect(() => {
    searchDispatch({
      type: "update",
      payload: { ...searchOptions },
    });
  }, [searchOptions]);
  useEffect(() => {
    loadingDispatch({
      type: "update",
      payload: false,
    });
  }, [videos]);
  useEffect(() => {
    viewingDispatch({
      type: "update",
      payload: viewing,
    });
  }, [viewing]);

  if (errorCode) {
    return <NextErrorComponent statusCode={errorCode} />;
  }

  return (
    <Layout>
      <Head>
        <title>検索結果</title>
      </Head>
      <VideoList videos={videos} />
    </Layout>
  );
}

// これより以下すべてserverPropsを生成するためのコード
// 分けても良いかもしれん
const LIMIT = 100;
const defaultQuery: QueryParams = {
  _sort: "startTime",
  q: "音MAD",
  targets: "tagsExact",
  _limit: LIMIT,
};

const calcOffset = (page?: number, per = 100): number => {
  if (!page || page < 0) {
    page = 1;
  }
  const offset = (page - 1) * per;

  return offset;
};

function toISOStringWithTimezone(date: Date): string {
  const pad = function (str: string): string {
    return ("0" + str).slice(-2);
  };
  const year = date.getFullYear().toString();
  const month = pad((date.getMonth() + 1).toString());
  const day = pad(date.getDate().toString());
  const hour = pad(date.getHours().toString());
  const min = pad(date.getMinutes().toString());
  const sec = pad(date.getSeconds().toString());
  const tz = -date.getTimezoneOffset();
  const sign = tz >= 0 ? "+" : "-";
  const tzHour = pad((tz / 60).toString());
  const tzMin = pad((tz % 60).toString());

  return `${year}-${month}-${day}T${hour}:${min}:${sec}${sign}${tzHour}:${tzMin}`;
}

const getSearchQuery = ({
  q,
  _sort,
  mylistCounterGte,
  mylistCounterLte,
  viewCounterGte,
  viewCounterLte,
  lengthMinutesGte,
  lengthMinutesLte,
  startTimeGte,
  startTimeLte,
  userId,
  page,
  per,
}: SearchOptions): QueryParams => {
  if (
    _sort === null ||
    !VideoSortKeys.map((a) => `${a}`).includes(_sort.replace(/^[-+]/, ""))
  ) {
    _sort = "-startTime";
  }

  const _offset = calcOffset(page, per);

  const filters = {};

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

  if (viewCounterGte) {
    if (!filters["viewCounter"]) {
      filters["viewCounter"] = {};
    }
    filters["viewCounter"]["gte"] = viewCounterGte;
  }
  if (viewCounterLte !== null) {
    if (!filters["viewCounter"]) {
      filters["viewCounter"] = {};
    }
    filters["viewCounter"]["lte"] = viewCounterLte;
  }

  if (startTimeGte) {
    if (!filters["startTime"]) {
      filters["startTime"] = {};
    }
    filters["startTime"]["gte"] = toISOStringWithTimezone(
      new Date(startTimeGte)
    );
  }
  if (startTimeLte) {
    if (!filters["startTime"]) {
      filters["startTime"] = {};
    }
    filters["startTime"]["lte"] = toISOStringWithTimezone(
      new Date(startTimeLte)
    );
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

  if (userId) filters["userId"] = { 0: userId };

  return {
    ...defaultQuery,
    _sort,
    _offset,
    _limit: per,
    filters,
    q: `${defaultQuery.q} ${q}`.trim(),
  };
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

const shouldExecCall = (options: SearchOptions): boolean => {
  if (
    Number.isFinite(options.mylistCounterGte) &&
    Number.isFinite(options.mylistCounterLte) &&
    options.mylistCounterGte > options.mylistCounterLte
  ) {
    return false;
  } else if (
    Number.isFinite(options.lengthMinutesGte) &&
    Number.isFinite(options.lengthMinutesLte) &&
    options.lengthMinutesGte > options.lengthMinutesLte
  ) {
    return false;
  }
  const startTimeGte = Date.parse(options.startTimeGte);
  const startTimeLte = Date.parse(options.startTimeLte);
  if (
    !Number.isNaN(startTimeGte) &&
    !Number.isNaN(startTimeLte) &&
    startTimeGte > startTimeLte
  ) {
    return false;
  }
  return true;
};

const roundNumber = (num: number): number => {
  if (num > 2147483647) return null;
  return num;
};

const roundDate = (datestr: string): string => {
  const unixTime = Date.parse(datestr);
  if (Number.isNaN(unixTime)) return null;
  const date = new Date(unixTime);

  if (date.getFullYear() < 2007) {
    return null;
  }

  if (date.getFullYear() > new Date().getFullYear()) {
    return null;
  }

  return format(date, "yyyy-MM-dd'T'HH:mm");
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = parseCookies(ctx);
  let viewing = cookies.viewing;
  let per = parseQueryToInt(cookies.per);
  if (viewing !== "detail" && viewing !== "icon") viewing = "detail";
  if (!per) per = 50;
  const { query } = ctx;
  const client = new VideoSnapshotClient({
    context: "otomad-search",
  });
  console.log(query);
  const searchOptions: SearchOptions = {
    q: parseQueryToString(query.q) || "",
    _sort: parseQueryToString(query._sort),
    mylistCounterGte: roundNumber(parseQueryToInt(query.mylistCounterGte)),
    mylistCounterLte: roundNumber(parseQueryToInt(query.mylistCounterLte)),
    viewCounterGte: roundNumber(parseQueryToInt(query.viewCounterGte)),
    viewCounterLte: roundNumber(parseQueryToInt(query.viewCounterLte)),
    lengthMinutesGte: roundNumber(
      parseQueryToLimitedFloat(query.lengthMinutesGte)
    ),
    lengthMinutesLte: roundNumber(
      parseQueryToLimitedFloat(query.lengthMinutesLte)
    ),
    userId: roundNumber(parseQueryToInt(query.userId)),
    startTimeGte: roundDate(parseQueryToString(query.startTimeGte)),
    startTimeLte: roundDate(parseQueryToString(query.startTimeLte)),
    page: roundNumber(parseQueryToInt(query.page)),
    per: Math.min(100, roundNumber(parseQueryToInt(query.per)) || per),
  };
  console.log({
    cookie: per,
    query: query.per,
    final: Math.min(100, roundNumber(parseQueryToInt(query.per)) || per),
  });

  const response = await (async (): Promise<
    Response<Pick<Video, typeof usedFields[number]>>
  > => {
    if (shouldExecCall(searchOptions)) {
      const searchQuery = getSearchQuery(searchOptions);
      if (searchQuery._offset > MAX_SS_OFFSET) {
        searchQuery._offset = 0;
        searchQuery._limit = 0;
      }
      const response = (
        await client.search(searchQuery, usedFields).catch((e: AxiosError) => {
          Sentry.captureException(e);

          return {
            data: {
              meta: { status: e.response.status, totalCount: 0, id: "" },
              data: [],
            },
          };
        })
      ).data;
      return response;
    } else {
      console.log("Should not call with this parameters");
      return { meta: { status: 200, totalCount: 0, id: "" }, data: [] };
    }
  })();

  console.log(response.data);

  if (response.meta.status !== 200) {
    ctx.res.statusCode = response.meta.status;
    return {
      props: {
        errorCode: response.meta.status,
      },
    };
  }

  const actualMaxPageNum = actualMaxPageNumber(
    searchOptions.per,
    response.meta.totalCount,
    MAX_SS_OFFSET
  );

  if (actualMaxPageNum < searchOptions.page) {
    searchOptions.page = actualMaxPageNum + 1;
  }

  return {
    props: {
      videos: response.data,
      searchOptions: {
        count: response.meta.totalCount,
        ...searchOptions,
        page:
          !!searchOptions.page || searchOptions.page < 0
            ? searchOptions.page
            : 1,
      },
      viewing,
    },
  };
};
