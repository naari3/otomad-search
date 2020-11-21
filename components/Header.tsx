import * as React from "react";
import SearchBar from "./SearchBar";
import styles from "./Header.module.css";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { useDispatch } from "../contexts/SearchContext";
import { initialState } from "../reducers/search";

const Header = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <>
      <Head>
        <link rel="icon" href="/otomad-search.svg" />
      </Head>
      <header className={styles.header}>
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
      <header
        className={`${styles.headerSearchBar} ${
          router.pathname === "/search" ? styles.sticky : ""
        }`}
      >
        {/* <h1>otomad-search</h1> */}
        <div className={styles.inner}>
          <SearchBar />
        </div>
      </header>
    </>
  );
};

export default Header;
