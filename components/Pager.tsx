import React, { useEffect, useState, FC } from "react";
import styles from "./Pager.module.css";
import Link from "next/link";
import { useGlobalState as useSearchGlobalState } from "../contexts/SearchContext";
import {
  useDispatch as useLoadingDispatch,
  useGlobalState as useLoadingGlobalState,
} from "../contexts/LoadingContext";
import removeEmpty from "../lib/removeEmpty";
import { UrlObject } from "url";

type Url = string | UrlObject;

type PagerButtonProps = {
  href: Url;
};

const PagerButton: FC<PagerButtonProps> = ({ href, children }) => {
  const loadingDispatch = useLoadingDispatch();
  const loading = useLoadingGlobalState();

  return loading ? (
    <span className={`${styles.pagerButton} ${styles.disabled}`}>
      {children}
    </span>
  ) : (
    <Link href={href}>
      <a
        className={styles.pagerButton}
        onClick={() => {
          loadingDispatch({
            type: "update",
            payload: true,
          });
        }}
      >
        {children}
      </a>
    </Link>
  );
};

const Pager = () => {
  const options = useSearchGlobalState();
  const loading = useLoadingGlobalState();
  const [, setMaxPages] = useState(1);
  const [hasPrevPrevPage, setHasPrevPrevPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasNextNextPage, setHasNextNextPage] = useState(false);

  const LIMIT = 100;
  const calcPageNumber = () => {
    const { count } = options;
    if (count === 0) {
      return 0;
    }
    return Math.ceil(count / LIMIT);
  };

  useEffect(() => {
    const pageNumber = calcPageNumber();
    setMaxPages(pageNumber);
    setHasPrevPrevPage(options.page > 2);
    setHasPrevPage(options.page > 1);
    setHasNextPage(
      pageNumber > options.page && 1600 / options.per >= options.page
    );
    setHasNextNextPage(
      pageNumber > options.page + 1 && 1600 / options.per >= options.page + 1
    );
  }, [options]);

  return (
    <div className={styles.pager}>
      {hasPrevPage ? (
        <PagerButton
          href={{
            pathname: "/search",
            query: removeEmpty({ ...options, page: options.page - 1 }),
          }}
        >
          ←
        </PagerButton>
      ) : (
        ""
      )}

      {hasPrevPrevPage ? (
        <PagerButton
          href={{
            pathname: "/search",
            query: removeEmpty({ ...options, page: options.page - 2 }),
          }}
        >
          {options.page - 2}
        </PagerButton>
      ) : (
        ""
      )}

      {hasPrevPage ? (
        <PagerButton
          href={{
            pathname: "/search",
            query: removeEmpty({ ...options, page: options.page - 1 }),
          }}
        >
          {options.page - 1}
        </PagerButton>
      ) : (
        ""
      )}

      <span
        className={`${styles.pagerButton} ${styles.switchingButton} ${styles.active}`}
      >
        {options.page}
      </span>

      {hasNextPage ? (
        <PagerButton
          href={{
            pathname: "/search",
            query: removeEmpty({ ...options, page: options.page + 1 }),
          }}
        >
          {options.page + 1}
        </PagerButton>
      ) : (
        ""
      )}
      {hasNextNextPage ? (
        <PagerButton
          href={{
            pathname: "/search",
            query: removeEmpty({ ...options, page: options.page + 2 }),
          }}
        >
          {options.page + 2}
        </PagerButton>
      ) : (
        ""
      )}

      {hasNextPage ? (
        <PagerButton
          href={{
            pathname: "/search",
            query: removeEmpty({ ...options, page: options.page + 1 }),
          }}
        >
          →
        </PagerButton>
      ) : (
        ""
      )}
    </div>
  );
};

export default Pager;
