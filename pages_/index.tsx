import React, { FC } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Layout from "../components/Layout";

import { GetStaticProps } from "next";
import ChangeLanguage from "../components/ChangeLanguage";

import { getDescriptionData } from "../lib/description";

const Home: FC<{ descriptionHtml: string }> = ({ descriptionHtml }) => {
  return (
    <Layout>
      <Head>
        <title>otomad-search</title>
      </Head>

      <section>
        <ChangeLanguage />
      </section>

      <section className={styles.description}>
        <div
          dangerouslySetInnerHTML={{
            __html: descriptionHtml,
          }}
        />
      </section>
    </Layout>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  console.log(locale);
  console.log(getDescriptionData(locale));
  return {
    props: {
      getStaticPropsWorks: true,
      lang: locale,
      descriptionHtml: await getDescriptionData(locale),
    },
  };
};
