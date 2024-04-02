/* eslint @typescript-eslint/no-unused-vars: 0 */
// https://site.nicovideo.jp/search-api-docs/search.html
const BASE_URL = "https://snapshot.search.nicovideo.jp/";

import * as Sentry from "@sentry/node";

// Video と Live で共通しているパラメータ
export type Content = {
  contentId: string;
  title: string;
  description: string;
  userId: number;
  viewCounter: number;
  thumbnailUrl: string;
  startTime: string;
  commentCounter: number;
  categoryTags: string;
  channelId: number;
  tags: string;
  tagsExact: string;
};

export type Video = Content & {
  mylistCounter: number;
  likeCounter: number;
  lengthSeconds: number;
  threadId: number;
  lastCommentTime: string;
  lockTagsExact: string;
  genre: string;
};

export const VideoFieldKeys = [
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
  "likeCounter",
  "lengthSeconds",
  "threadId",
  "lastCommentTime",
  "lockTagsExact",
  "genre",
] as const;

export const VideoSortKeys = [
  "userId",
  "viewCounter",
  "startTime",
  "commentCounter",
  "channelId",
  "mylistCounter",
  "likeCounter",
  "lengthSeconds",
  "threadId",
  "lastCommentTime",
] as const;
export type VideoFields = Omit<Video, "tagsExact">;
type VideoSorts = typeof VideoSortKeys[number];
type VideoFilters = Omit<Video, "contentId" | "title" | "description" | "thumbnailUrl">;

export type Live = Content & {
  communityId: number;
  providerTypecommunity: "official" | "community" | "channel";
  openTime: string;
  liveEndTime: string;
  timeshiftEnabled: boolean;
  scoreTimeshiftReserved: number;
  liveScreenshotThumbnailSmall: string;
  tsScreenshotThumbnailSmall: string;
  communityText: string;
  communityIcon: string;
  memberOnly: boolean;
  liveStatus: "past" | "onair" | "reserved";
};

type LiveFields = Omit<Live, "tagsExact">;
type LiveSorts = Omit<
  Live,
  | "contentId"
  | "title"
  | "description"
  | "providerType"
  | "tags"
  | "tagsExact"
  | "categoryTags"
  | "timeshiftEnabled"
  | "thumbnailUrl"
  | "liveScreenshotThumbnailSmall"
  | "tsScreenshotThumbnailSmall"
  | "communityText"
  | "communityIcon"
  | "memberOnly"
  | "liveStatus"
>;
type LiveFilters = Omit<
  Live,
  "contentId" | "title" | "description" | "thumbnailUrl" | "liveScreenshotThumbnailSmall" | "tsScreenshotThumbnailSmall" | "communityIcon"
>;

// 返ってくるであろうレスポンス
export type Response<C extends Partial<Content>> = {
  meta: {
    status: number;
    totalCount: number;
    id: string;
  };
  data: C[];
};

type InnerQueryParams = {
  q: string;
  targets: string;
  fields: string;
  jsonFilter?: string;
  _sort: string;
  _offset?: number;
  _limit?: number;
  _context: string;
};

export type Filter = {
  [key in "lt" | "lte" | "gt" | "gte" | number]?: string | number;
};

// わからん
export type QueryParams = {
  q: string;
  targets: string;
  // filters?: string, // どうやって型つければいいんだろう
  // filters[mylistCounter][gt] とか filters[mylistCounter][lt] とか filters[mylistCounter][任意の自然数?] とかのキーを自動生成する必要がある
  filters?: { [k: string]: Filter };
  jsonFilter?: string;
  _sort: string;
  _offset?: number;
  _limit?: number;
  _context?: string;
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

const calcOffset = (page?: number, per = 100): number => {
  if (!page || page < 0) {
    page = 1;
  }
  const offset = (page - 1) * per;

  return offset;
};

const LIMIT = 100;
const defaultQuery: QueryParams = {
  _sort: "startTime",
  q: "音MAD",
  targets: "tagsExact",
  _limit: LIMIT,
};

export const getSearchQuery = ({
  q,
  _sort,
  mylistCounterGte,
  mylistCounterLte,
  viewCounterGte,
  viewCounterLte,
  likeCounterGte,
  likeCounterLte,
  lengthMinutesGte,
  lengthMinutesLte,
  startTimeGte,
  startTimeLte,
  // userId,
  page,
  per,
}: SearchOptions): QueryParams => {
  if (_sort === null || _sort === undefined || !VideoSortKeys.map((a) => `${a}`).includes(_sort.replace(/^[-+]/, ""))) {
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

  if (likeCounterGte) {
    if (!filters["likeCounter"]) {
      filters["likeCounter"] = {};
    }
    filters["likeCounter"]["gte"] = likeCounterGte;
  }
  if (likeCounterLte !== null) {
    if (!filters["likeCounter"]) {
      filters["likeCounter"] = {};
    }
    filters["likeCounter"]["lte"] = likeCounterLte;
  }

  if (startTimeGte) {
    if (!filters["startTime"]) {
      filters["startTime"] = {};
    }
    filters["startTime"]["gte"] = toISOStringWithTimezone(new Date(startTimeGte));
  }
  if (startTimeLte) {
    if (!filters["startTime"]) {
      filters["startTime"] = {};
    }
    filters["startTime"]["lte"] = toISOStringWithTimezone(new Date(startTimeLte));
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

  // if (userId) filters["userId"] = { 0: userId };

  return {
    ...defaultQuery,
    _sort,
    _offset,
    _limit: per,
    filters,
    q: `${defaultQuery.q} ${q}`.trim(),
  };
};

import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { SearchOptions } from "../reducers/search";

class BaseClient<C extends Content> {
  service: "video" | "live" | "snapshot/video";
  context: string;
  client: AxiosInstance;

  constructor({ service, context }: { service: "video" | "live" | "snapshot/video"; context: string }) {
    this.service = service;
    this.context = context;
    this.client = axios.create({
      baseURL: BASE_URL,
    });
  }

  async search<T extends readonly (keyof C)[]>(query: QueryParams, fields: T): Promise<Response<Pick<C, T[number]>>> {
    return (
      await this.rawSearch(query, fields).catch((e: AxiosError) => {
        Sentry.captureException(e);

        return {
          data: {
            meta: { status: e.response.status, totalCount: 0, id: "" },
            data: [],
          },
        };
      })
    ).data;
  }

  async rawSearch<T extends readonly (keyof C)[]>(query: QueryParams, fields: T): Promise<AxiosResponse<Response<Pick<C, T[number]>>>> {
    const { filters: filters, ...without_filters } = query;
    const params: InnerQueryParams = Object.assign(
      { _context: this.context },
      without_filters,
      {
        fields: fields.join(),
      },
      filters ? this.filtersToInner(filters) : {}
    );
    console.log(params);
    return this.client.get<Response<Pick<C, T[number]>>>(`/api/v2/${this.service}/contents/search`, { params });
  }

  private filtersToInner(filters: { [k: string]: Filter }): { [k: string]: string | number } {
    return Object.fromEntries(
      Object.entries(filters).flatMap(([key, f]) => Object.entries(f).map(([kind, value]) => [`filters[${key}][${kind}]`, value]))
    );
  }
}

export class VideoClient extends BaseClient<Video> {
  constructor({ context }: { context: string }) {
    super({ service: "video", context });
  }
}

export class LiveClient extends BaseClient<Live> {
  constructor({ context }: { context: string }) {
    super({ service: "live", context });
  }
}

export class VideoSnapshotClient extends BaseClient<Video> {
  constructor({ context }: { context: string }) {
    super({ service: "snapshot/video", context });
  }
}

// (async () => {
//     const fields = ["title", "description", "userId", "viewCounter", "thumbnailUrl", "startTime", "commentCounter", "categoryTags", "channelId", "tags", "mylistCounter", "lengthSeconds", "threadId", "lastCommentTime", "lockTagsExact", "genre"] as const
//     const query: QueryParams = {
//         q: "音MAD",
//         targets: "tags",
//         _sort: "-startDate",
//     }

//     const client = new VideoClient({ context: "otomad-serach" });
//     const response = await client.search(query, fields);
//     response.data.data.forEach(a => {
//         console.log(a.categoryTags, a.viewCounter, a.mylistCounter);
//     })
// })();
