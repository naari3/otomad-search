import React, { FC, useEffect } from "react"; // {FC} をimport対象に追加
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Layout from "../components/Layout";

const Home: FC = () => {
  return (
    <Layout>
      <Head>
        <title>otomad-search</title>
      </Head>

      <section className={styles.description}>
        <h2>概要</h2>
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
        <p>
          またその仕様上、17ページ(1700件目)以降を確認することは出来ません。
        </p>
        <h2>パラメータの説明</h2>
        <p>
          以上、以下の両方を選択できる項目は、いずれか片方のみの検索にも対応しています。
        </p>
        <h3>並び替え</h3>
        <p>ソート順を選択出来ます。</p>
        <p>人気順ソートは出来ません。</p>
        <h3>マイリスト数</h3>
        <p>指定されたマイリスト数の範囲で検索します。</p>
        <h3>再生時間</h3>
        <p>指定された再生時間の範囲で検索します。</p>
        <h3>日付指定</h3>
        <p>指定された日付の範囲で検索します。</p>
        <h2>クレジット</h2>
        <ul>
          <li>
            <a href="https://twitter.com/_naari_" target="_blank">
              @_naari_
            </a>
            : 企画と開発
          </li>
          <li>
            <a href="https://twitter.com/readybug_" target="_blank">
              @readybug_
            </a>
            : アイコン
          </li>
        </ul>
      </section>
    </Layout>
  );
};

export default Home;
