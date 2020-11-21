import React from "react";
import styles from "./Tag.module.css";
import Link from "next/link";
import { useGlobalState as useSearchGlobalState } from "../contexts/SearchContext";
import { useGlobalState as useLoadingGlobalState } from "../contexts/LoadingContext";
import removeEmpty from "../lib/removeEmpty";

const Tag = React.memo(({ name }: { name: string }) => {
  const loading = useLoadingGlobalState();
  const options = useSearchGlobalState();

  return (
    <Link
      href={{
        pathname: "/search",
        query: removeEmpty({ ...options, page: 1, q: name }),
      }}
    >
      {loading ? (
        <NoLinkTag name={name}></NoLinkTag>
      ) : (
        <a className={styles.tag}>{name}</a>
      )}
    </Link>
  );
});

const NoLinkTag = React.memo(({ name }: { name: string }) => {
  return <span className={`${styles.tag} ${styles.disabled}`}>{name}</span>;
});

export default Tag;
export { NoLinkTag };
