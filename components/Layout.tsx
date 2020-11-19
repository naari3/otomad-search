import * as React from "react";
import Header from "./Header";
import Footer from "./Footer";
import styles from "./Layout.module.css";

const Layout = (props) => (
  <>
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        <div className={styles.inner}>{props.children}</div>
      </main>

      <Footer />
    </div>
  </>
);

export default Layout;
