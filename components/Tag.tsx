import React from "react";
import styles from "./Tag.module.css";
import Link from "next/link";
import { useGlobalState as useSearchGlobalState } from "../contexts/SearchContext";
import { useGlobalState as useLoadingGlobalState } from "../contexts/LoadingContext";
import removeEmpty from "../lib/removeEmpty";
import * as gtag from "../lib/gtag";

const Tag = React.memo(({ name }: { name: string }) => {
  const loading = useLoadingGlobalState();
  const options = useSearchGlobalState();

  return loading ? (
    <NoLinkTag name={name}></NoLinkTag>
  ) : (
    <Link
      href={{
        pathname: "/search",
        query: removeEmpty({ ...options, page: 1, q: name }),
      }}
    >
      <a
        className={styles.tag}
        onClick={() => {
          gtag.event({
            action: "clickTag",
            category: "Otomads",
            label: "happy",
            value: name,
          });
        }}
      >
        {name}
      </a>
    </Link>
  );
});
Tag.displayName = "Tag";
const NoLinkTag = React.memo(({ name }: { name: string }) => {
  return <span className={`${styles.tag} ${styles.disabled}`}>{name}</span>;
});
NoLinkTag.displayName = "NoLinkTag";

export default Tag;
export { NoLinkTag };
