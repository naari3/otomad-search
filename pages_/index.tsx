import React, { FC } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Layout from "../components/Layout";

import useTranslation from "next-translate/useTranslation";
import Trans from "next-translate/Trans";
import { GetStaticProps } from "next";

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
            <h2 key="h2" />,
            <p key="p" />,
            <a
              href="https://site.nicovideo.jp/search-api-docs/search.html"
              target="_blank"
              rel="noreferrer"
              key="a"
            />,
          ]}
        />
        <Trans
          i18nKey="index:index-parameters"
          components={[<h2 key="h2" />, <p key="p" />, <h3 key="h3" />]}
        />
        <h2>{t("credits")}</h2>
        <ul>
          <li>
            <p>
              <a
                href="https://twitter.com/_naari_"
                target="_blank"
                rel="noreferrer"
              >
                @_naari_
              </a>
              : {t("credits-development")}
            </p>
          </li>
          <li>
            <p>
              <a
                href="https://twitter.com/readybug_"
                target="_blank"
                rel="noreferrer"
              >
                @readybug_
              </a>
              : {t("credits-icon")}
            </p>
          </li>
        </ul>
      </section>
    </Layout>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return { props: { getStaticPropsWorks: true, lang: locale } };
};
