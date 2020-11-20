import React, { useEffect, useState, FC } from "react";
import styles from "./Tag.module.css";
import Link from "next/link";
import { useGlobalState as useSearchGlobalState } from "../contexts/SearchContext";
import {
  useDispatch as useLoadingDispatch,
  useGlobalState as useLoadingGlobalState,
} from "../contexts/LoadingContext";
import removeEmpty from "../lib/removeEmpty";

const Tag = ({ name }: { name: string }) => {
  const options = useSearchGlobalState();
  const loading = useLoadingGlobalState();
  const loadingDispatch = useLoadingDispatch();

  return (
    <Link
      href={{
        pathname: "/search",
        query: removeEmpty({ ...options, page: 1, q: name }),
      }}
    >
      {loading ? (
        <span className={`${styles.tag} ${styles.disabled}`}>{name}</span>
      ) : (
        <a
          className={styles.tag}
          onClick={() => {
            loadingDispatch({
              type: "update",
              payload: true,
            });
          }}
        >
          {name}
        </a>
      )}
    </Link>
  );
};

export default Tag;
