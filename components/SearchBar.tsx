import React, { FC, useEffect, useState } from "react";
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
import JussenButton from "./JussenButton";

import useTranslation from "next-translate/useTranslation";

const sortAxisOptions = [
  "+viewCounter",
  "-viewCounter",
  "+startTime",
  "-startTime",
  "+commentCounter",
  "-commentCounter",
  "+mylistCounter",
  "-mylistCounter",
  "+lengthSeconds",
  "-lengthSeconds",
  "+lastCommentTime",
  "-lastCommentTime",
];

const SearchBar: FC = () => {
  const { t } = useTranslation("SearchBar");
  const options = useSearchGlobalState();
  const searchDispatch = useSearchDispatch();
  const loading = useLoadingGlobalState();
  const loadingDispatch = useLoadingDispatch();
  const [takesALongTime, setTakesALongTime] = useState<boolean>(false);

  const isJussenPast = (() => {
    const now = new Date();
    return now.getMonth() > 12 && now.getDay() > 23;
  })();

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
                value={options.q || ""}
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
                  {t("search")}
                </button>
              </Link>
            </div>
            {options.count === null || options.count === undefined ? (
              ""
            ) : (
              <span>
                {options.count.toLocaleString()} {t("results")}
              </span>
            )}
            {takesALongTime ? (
              <div>
                <span>{t("search-firsttime")}</span>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className={styles.filter}>
          <span className={styles.filterName}>{t("sort")}</span>
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
            {Object.entries(sortAxisOptions).map(([key]) => (
              <option value={sortAxisOptions[key]} key={sortAxisOptions[key]}>
                {t(sortAxisOptions[key])}
              </option>
            ))}
          </select>
          {
            ""
            // <>
            //   <span className={styles.filterName}>{t("user-id-filter")}</span>
            //   <label>
            //     <input
            //       className={`${styles.inputNumber} ${styles.big}`}
            //       type="number"
            //       min="0"
            //       value={options.userId || ""}
            //       onChange={(e) => {
            //         searchDispatch({
            //           type: "update",
            //           payload: {
            //             userId: parseInt(e.target.value),
            //           },
            //         });
            //       }}
            //     />
            //   </label>
            // </>
          }
        </div>
        <div className={styles.filter}>
          <span className={styles.filterName}>{t("my-list-count")}</span>
          <label>
            <input
              className={styles.inputNumber}
              type="number"
              min="0"
              value={options.mylistCounterGte || ""}
              onChange={(e) => {
                searchDispatch({
                  type: "update",
                  payload: { mylistCounterGte: parseInt(e.target.value) },
                });
              }}
            />
            <span className={styles.filterWord}>{t("common:min")}</span>
          </label>
          <label>
            <input
              className={styles.inputNumber}
              type="number"
              min="0"
              value={options.mylistCounterLte || ""}
              onChange={(e) => {
                searchDispatch({
                  type: "update",
                  payload: { mylistCounterLte: parseInt(e.target.value) },
                });
              }}
            />
            <span className={styles.filterWord}>{t("common:max")}</span>
          </label>
          <span className={styles.filterName}>{t("duration")}</span>
          <label>
            <input
              className={styles.inputNumber}
              type="number"
              step="0.1"
              min="0"
              value={options.lengthMinutesGte || ""}
              onChange={(e) => {
                searchDispatch({
                  type: "update",
                  payload: {
                    lengthMinutesGte: parseLimitedFloat(e.target.value),
                  },
                });
              }}
            />
            <span className={styles.filterWord}>{t("common:min")}</span>
          </label>
          <label>
            <input
              className={styles.inputNumber}
              type="number"
              step="0.1"
              min="0"
              value={options.lengthMinutesLte || ""}
              onChange={(e) => {
                searchDispatch({
                  type: "update",
                  payload: {
                    lengthMinutesLte: parseLimitedFloat(e.target.value),
                  },
                });
              }}
            />
            <span className={styles.filterWord}>{t("common:max")}</span>
          </label>
          <span className={styles.filterName}>{t("views")}</span>
          <label>
            <input
              className={`${styles.inputNumber} ${styles.big}`}
              type="number"
              min="0"
              value={options.viewCounterGte || ""}
              onChange={(e) => {
                searchDispatch({
                  type: "update",
                  payload: { viewCounterGte: parseInt(e.target.value) },
                });
              }}
            />
            <span className={styles.filterWord}>{t("common:min")}</span>
          </label>
          <label>
            <input
              className={`${styles.inputNumber} ${styles.big}`}
              type="number"
              min="0"
              value={options.viewCounterLte || ""}
              onChange={(e) => {
                searchDispatch({
                  type: "update",
                  payload: { viewCounterLte: parseInt(e.target.value) },
                });
              }}
            />
            <span className={styles.filterWord}>{t("common:max")}</span>
          </label>
        </div>
        <div className={styles.filter}>
          <span className={styles.filterName}>{t("date-filter")}</span>
          <label className={styles.filterDate}>
            <span className={styles.filterWord}>{t("start-date")}</span>
            <input
              className={styles.inputDatetime}
              type="datetime-local"
              pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}"
              value={options.startTimeGte || ""}
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
            <span className={styles.filterWord}>{t("end-date")}</span>
            <input
              className={styles.inputDatetime}
              type="datetime-local"
              pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}"
              value={options.startTimeLte || ""}
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
          <JussenButton targetYear={new Date().getFullYear()} />
          {isJussenPast ? (
            <JussenButton targetYear={new Date().getFullYear() + 1} />
          ) : (
            ""
          )}
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
