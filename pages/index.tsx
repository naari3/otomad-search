import React, { FC } from "react"; // {FC} をimport対象に追加
import Head from "next/head";
import styles from "../styles/Home.module.css";
import SearchBar from "../components/SearchBar";

const Home: FC = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <h1>otomad-search</h1>
      </header>

      <main className={styles.main}>
        <div>
          <label>
            マイリスト数下限: <input type="number"></input>
          </label>
          <button>検索</button>
        </div>
        <SearchBar searchOptions={{}} />
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
};

export default Home;
