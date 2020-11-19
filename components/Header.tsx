import * as React from "react";
import SearchBar from "./SearchBar";
import styles from "./Header.module.css";

const Header = () => (
  <header className={styles.header}>
    {/* <h1>otomad-search</h1> */}
    <div className={styles.inner}>
      <SearchBar />
    </div>
  </header>
);

export default Header;
