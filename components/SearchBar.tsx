import * as React from "react";
import { useState } from "react";
import Link from "next/link";
import { VideoSortKeys } from "../lib/search";

export type Props = {
  searchOptions: {
    _sort?: string;
    mylistCounterGte?: number;
    mylistCounterLt?: number;
    startTimeGte?: string;
    startTimeLt?: string;
  };
};

const sortAxisOptions = {
  //   "+userId": "",
  //   "-userId": "",
  "+viewCounter": "再生数が少ない順",
  "-viewCounter": "再生数が多い順",
  "+startTime": "投稿日時が古い順",
  "-startTime": "投稿日時が新しい順",
  "+commentCounter": "コメント数が少ない順",
  "-commentCounter": "コメント数が多い順",
  //   "+channelId": "",
  //   "-channelId": "",
  "+mylistCounter": "マイリスト数が少ない順",
  "-mylistCounter": "マイリスト数が多い順",
  "+lengthSeconds": "再生時間が短い順",
  "-lengthSeconds": "再生時間が長い順",
  //   "+threadId": "",
  //   "-threadId": "",
  "+lastCommentTime": "コメントが古い順",
  "-lastCommentTime": "コメントが新しい順",
};

const SearchBar = ({ searchOptions: defaults }: Props) => {
  const [_sort, setSort] = useState(defaults._sort || "-startTime");
  const [mylistCounterGte, setMylistCounterGte] = useState<number | null>(
    defaults.mylistCounterGte || null
  );
  const [mylistCounterLt, setMylistCounterLt] = useState<number | null>(
    defaults.mylistCounterLt || null
  );
  const [startTimeGte, setStartTimeGte] = useState(
    defaults.startTimeGte || null
  );
  const [startTimeLt, setStartTimeLt] = useState(defaults.startTimeLt || null);

  return (
    <>
      <select
        name="sort"
        onChange={(e) => {
          setSort(e.target.value);
        }}
        defaultValue={_sort}
      >
        {Object.entries(sortAxisOptions).map(([key, message]) => (
          <option value={key} key={key}>
            {message}
          </option>
        ))}
      </select>
      <label>
        マイリスト数:{" "}
        <input
          type="number"
          onChange={(e) => setMylistCounterGte(parseInt(e.target.value))}
        />{" "}
        以上
      </label>
      <label>
        マイリスト数:{" "}
        <input
          type="number"
          onChange={(e) => setMylistCounterLt(parseInt(e.target.value))}
        />{" "}
        未満
      </label>
      <label>
        次の日時以降に投稿された音MAD{" "}
        <input
          type="datetime-local"
          pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}"
          onChange={(e) => setStartTimeGte(e.target.value)}
        />
      </label>
      <label>
        次の日時以前に投稿された音MAD{" "}
        <input
          type="datetime-local"
          pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}"
          onChange={(e) => setStartTimeLt(e.target.value)}
        />
      </label>
      <Link
        href={{
          pathname: "/search",
          query: {
            _sort,
            mylistCounterGte,
            mylistCounterLt,
            startTimeGte,
            startTimeLt,
          },
        }}
      >
        <a>検索</a>
      </Link>
    </>
  );
};

export default SearchBar;
