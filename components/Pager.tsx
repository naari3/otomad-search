import React, { useEffect, useState } from "react";
import styles from "./Pager.module.css";
import Link from "next/link";
import { useDispatch, useGlobalState } from "../contexts/SearchContext";
import removeEmpty from "../lib/removeEmpty";

const Pager = () => {
  const options = useGlobalState();
  const dispatch = useDispatch();

  const [maxPages, setMaxPages] = useState(1);
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
    setHasNextPage(pageNumber > options.page && 17 > options.page);
    setHasNextNextPage(pageNumber > options.page + 1 && 17 > options.page + 1);
  }, [options]);

  return (
    <div className={styles.pager}>
      {hasPrevPage ? (
        <Link
          href={{
            pathname: "/search",
            query: removeEmpty({ ...options, page: options.page - 1 }),
          }}
        >
          <a className={`${styles.pagerButton} ${styles.prevButton}`}>←</a>
        </Link>
      ) : (
        ""
      )}

      {hasPrevPrevPage ? (
        <Link
          href={{
            pathname: "/search",
            query: removeEmpty({ ...options, page: options.page - 2 }),
          }}
        >
          <a className={`${styles.pagerButton} ${styles.switchingButton}`}>
            {options.page - 2}
          </a>
        </Link>
      ) : (
        ""
      )}

      {hasPrevPage ? (
        <Link
          href={{
            pathname: "/search",
            query: removeEmpty({ ...options, page: options.page - 1 }),
          }}
        >
          <a className={`${styles.pagerButton} ${styles.switchingButton}`}>
            {options.page - 1}
          </a>
        </Link>
      ) : (
        ""
      )}

      <span
        className={`${styles.pagerButton} ${styles.switchingButton} ${styles.active}`}
      >
        {options.page}
      </span>

      {hasNextPage ? (
        <Link
          href={{
            pathname: "/search",
            query: removeEmpty({ ...options, page: options.page + 1 }),
          }}
        >
          <a className={`${styles.pagerButton} ${styles.switchingButton}`}>
            {options.page + 1}
          </a>
        </Link>
      ) : (
        ""
      )}
      {hasNextNextPage ? (
        <Link
          href={{
            pathname: "/search",
            query: removeEmpty({ ...options, page: options.page + 2 }),
          }}
        >
          <a className={`${styles.pagerButton} ${styles.switchingButton}`}>
            {options.page + 2}
          </a>
        </Link>
      ) : (
        ""
      )}

      {hasNextPage ? (
        <Link
          href={{
            pathname: "/search",
            query: removeEmpty({ ...options, page: options.page + 1 }),
          }}
        >
          <a className={`${styles.pagerButton} ${styles.nextButton}`}>→</a>
        </Link>
      ) : (
        ""
      )}
    </div>
  );
};

export default Pager;
