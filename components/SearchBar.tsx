import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./SearchBar.module.css";
import removeEmpty from "../lib/removeEmpty";
import parseLimitedFloat from "../lib/parseLimitedFloat";
import * as gtag from "../lib/gtag";

import {
  useDispatch as useSearchDispatch,
  useGlobalState as useSearchGlobalState,
} from "../contexts/SearchContext";
import {
  useDispatch as useLoadingDispatch,
  useGlobalState as useLoadingGlobalState,
} from "../contexts/LoadingContext";

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
  const options = useSearchGlobalState();
  const searchDispatch = useSearchDispatch();
  const loading = useLoadingGlobalState();
  const loadingDispatch = useLoadingDispatch();
  const [takesALongTime, setTakesALongTime] = useState<boolean>(false);

  useEffect(() => {
    let takeId;
    if (loading)
      takeId = setTimeout(() => {
        setTakesALongTime(loading);
      }, 2500);
    else takeId = setTakesALongTime(false);
    return () => {
      clearTimeout(takeId);
    };
  }, [loading]);

  return (
    <div className={styles.searchBar}>
      <form>
        <div className={styles.filter}>
          <div>
            <div className={styles.otomadFixWrap}>
              <label className={styles.otomadLabel}>音MAD </label>
              <input
                type="text"
                value={options.q}
                className={styles.inputQueryBar}
                autoComplete={"off"}
                onChange={(e) => {
                  searchDispatch({
                    type: "update",
                    payload: { q: e.target.value },
                  });
                }}
              />
              <Link
                href={{
                  pathname: "/search",
                  query: { ...removeEmpty(options), page: 1 },
                }}
              >
                <button
                  className={styles.searchButton}
                  disabled={loading}
                  onClick={() => {
                    gtag.event({
                      action: "search",
                      category: "Otomads",
                      label: "happy",
                    });
                    loadingDispatch({
                      type: "update",
                      payload: true,
                    });
                  }}
                >
                  検索
                </button>
              </Link>
            </div>
            {options.count === null || options.count === undefined ? (
              ""
            ) : (
              <span>{options.count.toLocaleString()} 件</span>
            )}
            {takesALongTime ? (
              <div>
                <span>
                  初回や時間の空いたあとの検索は時間がかかる場合があります。
                </span>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className={styles.filter}>
          <span className={styles.filterName}>並び替え</span>
          <select
            className={styles.inputOrder}
            name="sort"
            onChange={(e) => {
              searchDispatch({
                type: "update",
                payload: { _sort: e.target.value },
              });
            }}
            value={options._sort || "-startTime"}
          >
            {Object.entries(sortAxisOptions).map(([key, message]) => (
              <option value={key} key={key}>
                {message}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.filter}>
          <span className={styles.filterName}>マイリスト数</span>
          <label>
            <input
              className={styles.inputNumber}
              type="number"
              min="0"
              defaultValue={options.mylistCounterGte}
              onChange={(e) => {
                searchDispatch({
                  type: "update",
                  payload: { mylistCounterGte: parseInt(e.target.value) },
                });
              }}
            />
            <span className={styles.filterWord}>以上</span>
          </label>
          <label>
            <input
              className={styles.inputNumber}
              type="number"
              min="0"
              defaultValue={options.mylistCounterLte}
              onChange={(e) => {
                searchDispatch({
                  type: "update",
                  payload: { mylistCounterLte: parseInt(e.target.value) },
                });
              }}
            />
            <span className={styles.filterWord}>以下</span>
          </label>
          <span className={styles.filterName}>再生時間</span>
          <label>
            <input
              className={styles.inputNumber}
              type="number"
              step="0.1"
              min="0"
              defaultValue={options.lengthMinutesGte}
              onChange={(e) => {
                searchDispatch({
                  type: "update",
                  payload: {
                    lengthMinutesGte: parseLimitedFloat(e.target.value),
                  },
                });
              }}
            />
            <span className={styles.filterWord}>分以上</span>
          </label>
          <label>
            <input
              className={styles.inputNumber}
              type="number"
              step="0.1"
              min="0"
              defaultValue={options.lengthMinutesLte}
              onChange={(e) => {
                const [big, small] = e.target.value.split(".");
                searchDispatch({
                  type: "update",
                  payload: {
                    lengthMinutesLte: parseLimitedFloat(e.target.value),
                  },
                });
              }}
            />
            <span className={styles.filterWord}>分以下</span>
          </label>
          <span className={styles.filterName}>再生数</span>
          <label>
            <input
              className={`${styles.inputNumber} ${styles.big}`}
              type="number"
              min="0"
              defaultValue={options.viewCounterGte}
              onChange={(e) => {
                searchDispatch({
                  type: "update",
                  payload: { viewCounterGte: parseInt(e.target.value) },
                });
              }}
            />
            <span className={styles.filterWord}>以上</span>
          </label>
          <label>
            <input
              className={`${styles.inputNumber} ${styles.big}`}
              type="number"
              min="0"
              defaultValue={options.viewCounterLte}
              onChange={(e) => {
                searchDispatch({
                  type: "update",
                  payload: { viewCounterLte: parseInt(e.target.value) },
                });
              }}
            />
            <span className={styles.filterWord}>以下</span>
          </label>
        </div>
        <div className={styles.filter}>
          <span className={styles.filterName}>日付指定</span>
          <label className={styles.filterDate}>
            <span className={styles.filterWord}>開始日</span>
            <input
              className={styles.inputDatetime}
              type="datetime-local"
              pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}"
              defaultValue={options.startTimeGte}
              onChange={(e) => {
                if (Number.isNaN(Date.parse(e.target.value))) {
                  searchDispatch({
                    type: "update",
                    payload: { startTimeGte: null },
                  });
                } else {
                  searchDispatch({
                    type: "update",
                    payload: { startTimeGte: e.target.value },
                  });
                }
              }}
            />
          </label>
          <label className={styles.filterDate}>
            <span className={styles.filterWord}>終了日</span>
            <input
              className={styles.inputDatetime}
              type="datetime-local"
              pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}"
              defaultValue={options.startTimeLte}
              onChange={(e) => {
                if (Number.isNaN(Date.parse(e.target.value))) {
                  searchDispatch({
                    type: "update",
                    payload: { startTimeLte: null },
                  });
                } else {
                  searchDispatch({
                    type: "update",
                    payload: { startTimeLte: e.target.value },
                  });
                }
              }}
            />
          </label>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
