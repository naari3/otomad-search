import React from "react";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import i18nConfig from "../i18n.json";
import styles from "./ChangeLanguage.module.css";

const { locales } = i18nConfig;

const ChangeLanguage = () => {
  const { t, lang } = useTranslation();

  return (
    <>
      {locales.map((lng) => {
        if (lng === lang) return null;

        // Or you can attach the current pathname at the end
        // to keep the same page
        return (
          <Link href="/" locale={lng} key={lng}>
            <a className={styles.lang}>{t(`common:language-name-${lng}`)}</a>
          </Link>
        );
      })}
    </>
  );
};

export default ChangeLanguage;
