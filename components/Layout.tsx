import * as React from "react";
import Header from "./Header";
import styles from "./Layout.module.css";

const Layout = (props) => (
  <>
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        <div className={styles.inner}>{props.children}</div>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  </>
);

export default Layout;
