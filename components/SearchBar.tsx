import * as React from "react";
import Link from "next/link";
import styles from "./SearchBar.module.css";

import { useDispatch, useGlobalState } from "../contexts/SearchContext";

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

const SearchBar = () => {
  const options = useGlobalState();
  const dispatch = useDispatch();

  return (
    <div className={styles.searchBar}>
      <select
        name="sort"
        onChange={(e) => {
          dispatch({
            type: "update",
            payload: { _sort: e.target.value },
          });
        }}
        value={options._sort}
      >
        {Object.entries(sortAxisOptions).map(([key, message]) => (
          <option value={key} key={key}>
            {message}
          </option>
        ))}
      </select>
      <div>
        <span className={styles.filterName}>マイリスト数</span>
        <label>
          <input
            className={styles.inputMylist}
            type="number"
            defaultValue={options.mylistCounterGte}
            onChange={(e) => {
              dispatch({
                type: "update",
                payload: { mylistCounterGte: parseInt(e.target.value) },
              });
            }}
          />{" "}
          以上
        </label>{" "}
        <label>
          <input
            className={styles.inputMylist}
            type="number"
            defaultValue={options.mylistCounterLt}
            onChange={(e) => {
              dispatch({
                type: "update",
                payload: { mylistCounterLt: parseInt(e.target.value) },
              });
            }}
          />{" "}
          未満
        </label>
      </div>
      <div>
        <span className={styles.filterName}>日付指定</span>
        <label>
          開始日{" "}
          <input
            type="datetime-local"
            pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}"
            defaultValue={options.startTimeGte}
            onChange={(e) => {
              dispatch({
                type: "update",
                payload: { startTimeGte: e.target.value },
              });
            }}
          />
        </label>
        <label>
          終了日{" "}
          <input
            type="datetime-local"
            pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}"
            defaultValue={options.startTimeLt}
            onChange={(e) => {
              dispatch({
                type: "update",
                payload: { startTimeLt: e.target.value },
              });
            }}
          />
        </label>
      </div>
      <Link
        href={{
          pathname: "/search",
          query: options,
        }}
      >
        <a>検索</a>
      </Link>
    </div>
  );
};

export default SearchBar;
