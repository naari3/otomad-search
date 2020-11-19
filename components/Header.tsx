import * as React from "react";
import SearchBar from "./SearchBar";
import styles from "./Header.module.css";
import Link from "next/link";

const Header = () => (
  <>
    <header className={styles.header}>
      <h1 className={styles.inner}>
        <Link href="/">otomad-search</Link>
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

export default Header;
