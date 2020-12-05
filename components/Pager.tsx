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
import { actualMaxPageNumber, MAX_OFFSET, MAX_SS_OFFSET } from "../lib/pager";
import * as gtag from "../lib/gtag";

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
          gtag.event({
            action: "pager",
            category: "Otomads",
            label: "happy",
          });
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

const Pager: FC = () => {
  const options = useSearchGlobalState();
  const [hasPrevPrevPage, setHasPrevPrevPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasNextNextPage, setHasNextNextPage] = useState(false);

  useEffect(() => {
    const actualMaxPageNum = actualMaxPageNumber(
      options.per,
      options.count,
      options.isSs ? MAX_SS_OFFSET : MAX_OFFSET
    );
    setHasPrevPrevPage(options.page > 2);
    setHasPrevPage(options.page > 1);
    setHasNextPage(actualMaxPageNum > options.page);
    setHasNextNextPage(actualMaxPageNum > options.page + 1);
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
