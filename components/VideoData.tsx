import React from "react";
import Link from "next/link";
import styles from "./Video.module.css";
import { VideoProps } from "./VideoDetail";
import { useGlobalState as useSearchGlobalState } from "../contexts/SearchContext";
import { useGlobalState as useLoadingGlobalState } from "../contexts/LoadingContext";
import removeEmpty from "../lib/removeEmpty";
import TrackVisibility from "react-on-screen";

import useTranslation from "next-translate/useTranslation";

type Props = VideoProps;

const VideoData = React.memo(({ video }: Props) => {
  const { t } = useTranslation("VideoData");
  const options = useSearchGlobalState();
  const loading = useLoadingGlobalState();

  return (
    <div className={styles.itemData}>
      <ul className={styles.list}>
        <li className={styles.count}>
          {t("views")}{" "}
          <span className={styles.value}>
            {video.viewCounter.toLocaleString()}
          </span>
        </li>
        <li className={styles.count}>
          {t("comments")}{" "}
          <span className={styles.value}>
            {video.commentCounter.toLocaleString()}
          </span>
        </li>
        <li className={styles.count}>
          {t("mylists")}{" "}
          <span className={styles.value}>
            {video.mylistCounter.toLocaleString()}
          </span>
        </li>
        <li className={styles.count}>
          {t("likes")}{" "}
          <span className={styles.value}>
            {video.likeCounter.toLocaleString()}
          </span>
        </li>
        {video.userId ? (
          <li className={`${styles.count} ${styles.user}`}>
            <TrackVisibility
              throttleInterval={0}
              offset={250}
              partialVisibility={true}
            >
              {({ isVisible }) => {
                return isVisible && !loading ? (
                  <Link
                    href={{
                      pathname: "/search",
                      query: removeEmpty({
                        ...options,
                        page: 1,
                        userId: video.userId,
                      }),
                    }}
                  >
                    <a className={styles.value}>{video.userId}</a>
                  </Link>
                ) : (
                  <span className={styles.value}>{video.userId}</span>
                );
              }}
            </TrackVisibility>
          </li>
        ) : (
          ""
        )}
      </ul>
    </div>
  );
});
VideoData.displayName = "VideoData";

export default VideoData;
