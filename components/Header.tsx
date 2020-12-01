import React, { FC } from "react";
import SearchBar from "./SearchBar";
import styles from "./Header.module.css";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { useDispatch } from "../contexts/SearchContext";
import { initialState } from "../reducers/search";
import useTranslation from "next-translate/useTranslation";

const Header: FC = () => {
  const { t } = useTranslation("Header");
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <>
      <Head>
        <link rel="icon" href="/otomad-search.svg" />
      </Head>
      <header className={`${styles.header} ${styles.titleBar}`}>
        <h1 className={styles.inner}>
          <Link href="/">
            <a
              onClick={() =>
                dispatch({
                  type: "init",
                  payload: {
                    ...initialState,
                  },
                })
              }
            >
              <img
                src="/otomad-search.svg"
                alt="otomad-search"
                className={styles.logo}
              />
              otomad-search
            </a>
          </Link>
        </h1>
      </header>
      <header>
        <div className={styles.inner}>
          <div className={styles.jussen}>
            <a
              className={styles.jussenLink}
              href="http://oto10.s602.xrea.com/10sen/"
              target="_blank"
              rel="noreferrer"
            >
              {t("10sen-navi-link")}
            </a>
          </div>
        </div>
      </header>
      <header
        className={`${styles.headerSearchBar} ${
          router.pathname === "/search" ? styles.searchBar : ""
        }`}
      >
        <div className={styles.inner}>
          <SearchBar />
        </div>
      </header>
    </>
  );
};

export default Header;
