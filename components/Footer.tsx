import React, { FC } from "react";
import styles from "./Footer.module.css";

const Footer: FC = () => (
  <footer className={styles.footer}>
    <p className={styles.copyright}>
      <small>
        © 2020 <a href="https://twitter.com/_naari_">naari3</a>
      </small>
    </p>
  </footer>
);

export default Footer;
