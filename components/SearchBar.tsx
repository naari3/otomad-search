import * as React from "react";
import { useState } from "react";
import Link from "next/link";
import { VideoSortKeys } from "../lib/search";

type Props = {
  searchOptions: {
    _sort?: string;
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

const SearchBar = ({ searchOptions: { _sort: defaultSort } }: Props) => {
  const [_sort, setSort] = useState(defaultSort || "-startTime");

  return (
    <>
      <select
        name="sort"
        onChange={(e) => {
          setSort(e.target.value);
        }}
      >
        {Object.entries(sortAxisOptions).map(([key, message]) => (
          <option value={key} key={key} selected={key == _sort}>
            {message}
          </option>
        ))}
      </select>
      <Link
        href={{
          pathname: "/search",
          query: {
            _sort,
          },
        }}
      >
        <a>検索</a>
      </Link>
    </>
  );
};

export default SearchBar;
