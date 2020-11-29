import React, { FC } from "react";
import Link from "next/link";
import styles from "./PerSwitcher.module.css";
import { useGlobalState as useSearchGlobalState } from "../contexts/SearchContext";
import { useGlobalState as useLoadingGlobalState } from "../contexts/LoadingContext";
import removeEmpty from "../lib/removeEmpty";
import { setCookie } from "nookies";

const PerButton: FC<{ per: number }> = ({ children, per }) => {
  const loading = useLoadingGlobalState();
  const options = useSearchGlobalState();

  return loading || options.per === per ? (
    <span>{children}</span>
  ) : (
    <Link
      href={{
        pathname: "/search",
        query: removeEmpty({
          ...options,
          page: 1,
          per: per,
        }),
      }}
    >
      <a
        onClick={() => {
          console.log(per);
          setCookie(null, "per", per.toString(), {
            maxAge: 30 * 24 * 60 * 60,
            path: "/",
          });
        }}
      >
        <span>{children}</span>
      </a>
    </Link>
  );
};

const PerSwitcher = React.memo(() => {
  const options = useSearchGlobalState();

  return (
    <div className={styles.perSwitcher}>
      <ul className={styles.perList}>
        <li className={`${options.per === 100 ? styles.selected : ""}`}>
          <PerButton per={100}>多</PerButton>
        </li>
        <li className={`${options.per === 50 ? styles.selected : ""}`}>
          <PerButton per={50}>少</PerButton>
        </li>
      </ul>
    </div>
  );
});

export default PerSwitcher;
