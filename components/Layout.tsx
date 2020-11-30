import React, { FC } from "react";
import Header from "./Header";
import Footer from "./Footer";
import styles from "./Layout.module.css";

const Layout: FC = ({ children }) => (
  <>
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        <div className={styles.inner}>{children}</div>
      </main>

      <Footer />
    </div>
  </>
);

export default Layout;
