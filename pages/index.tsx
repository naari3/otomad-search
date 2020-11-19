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

      <div>説明</div>
    </Layout>
  );
};

export default Home;
