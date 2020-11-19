import React, { FC } from "react"; // {FC} をimport対象に追加
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Layout from "../components/Layout";

const Home: FC = () => {
  return (
    <Layout>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className={styles.description}>
        <h2>説明</h2>
        <p>音MADを検索するためのサービスです。</p>
        <p>評価基準になりそうなものをフィルターとして設定できます。</p>
        <p>
          裏で{" "}
          <a
            href="https://site.nicovideo.jp/search-api-docs/search.html"
            target="_blank"
          >
            niconico コンテンツ検索API
          </a>{" "}
          を呼び出しています。
        </p>
      </section>
    </Layout>
  );
};

export default Home;
