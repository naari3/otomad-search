import React, { FC, useEffect } from "react"; // {FC} をimport対象に追加
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Layout from "../components/Layout";

import useTranslation from 'next-translate/useTranslation'
import Trans from "next-translate/Trans";

const Home: FC = () => {
  const { t } = useTranslation("index");
  return (
    <Layout>
      <Head>
        <title>otomad-search</title>
      </Head>

      <section className={styles.description}>
      <Trans
        i18nKey="index:index-overview"
        components={[
        <h2 />,
        <p />,
        <a href="https://site.nicovideo.jp/search-api-docs/search.html"
           target="_blank"
        />
        ]}
      />
      <Trans
        i18nKey="index:index-parameters"
        components={[
          <h2 />,
          <p />,
          <h3 />
        ]}
      />
        <h2>{t('credits')}</h2>
        <ul>
          <li>
            <p>
              <a href="https://twitter.com/_naari_" target="_blank">
                @_naari_
              </a>
              : {t('credits-development')}
            </p>
          </li>
          <li>
            <p>
              <a href="https://twitter.com/readybug_" target="_blank">
                @readybug_
              </a>
              : {t('credits-icon')}
            </p>
          </li>
        </ul>
      </section>
    </Layout>
  );
};

export default Home;

export async function getStaticProps({ locale }) {
  return { props: { getStaticPropsWorks: true, lang: locale } }
}
