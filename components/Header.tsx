import * as React from "react";
import SearchBar from "./SearchBar";
import styles from "./Header.module.css";
import Link from "next/link";
import { useDispatch } from "../contexts/SearchContext";
import { initialState } from "../reducers/search";

const Header = () => {
  const dispatch = useDispatch();

  return (
    <>
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
              otomad-search
            </a>
          </Link>
        </h1>
      </header>
      <header className={styles.headerSticky}>
        {/* <h1>otomad-search</h1> */}
        <div className={styles.inner}>
          <SearchBar />
        </div>
      </header>
    </>
  );
};

export default Header;
