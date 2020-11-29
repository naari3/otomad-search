import React, { useEffect } from "react";
import Link from "next/link";
import styles from "./PerSwitcher.module.css";
import {
  useDispatch as useSearchDispatch,
  useGlobalState as useSearchGlobalState,
} from "../contexts/SearchContext";
import {
  useDispatch as useLoadingDispatch,
  useGlobalState as useLoadingGlobalState,
} from "../contexts/LoadingContext";
import removeEmpty from "../lib/removeEmpty";

const PerSwitcher = React.memo(() => {
  const loading = useLoadingGlobalState();
  const options = useSearchGlobalState();
  const optionsDispatch = useSearchDispatch();

  return (
    <div className={styles.perSwitcher}>
      <ul className={styles.perList}>
        <li className={`${options.per === 100 ? styles.selected : ""}`}>
          {loading || options.per === 100 ? (
            <span>多</span>
          ) : (
            <Link
              href={{
                pathname: "/search",
                query: removeEmpty({
                  ...options,
                  page: 1,
                  per: 100,
                }),
              }}
            >
              <a>
                <span>多</span>
              </a>
            </Link>
          )}
        </li>
        <li className={`${options.per === 50 ? styles.selected : ""}`}>
          {loading || options.per === 50 ? (
            <span>少</span>
          ) : (
            <Link
              href={{
                pathname: "/search",
                query: removeEmpty({
                  ...options,
                  page: 1,
                  per: 50,
                }),
              }}
            >
              <a>
                <span>少</span>
              </a>
            </Link>
          )}
        </li>
      </ul>
    </div>
  );
});

export default PerSwitcher;
