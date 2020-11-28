import React from "react";
import Link from "next/link";
import styles from "./Video.module.css";
import { VideoProps } from "./VideoDetail";
import { useGlobalState as useSearchGlobalState } from "../contexts/SearchContext";
import { useGlobalState as useLoadingGlobalState } from "../contexts/LoadingContext";
import removeEmpty from "../lib/removeEmpty";

type Props = VideoProps;

const VideoData = React.memo(({ video }: Props) => {
  const options = useSearchGlobalState();

  return (
    <div className={styles.itemData}>
      <ul className={styles.list}>
        <li className={styles.count}>
          再生{" "}
          <span className={styles.value}>
            {video.viewCounter.toLocaleString()}
          </span>
        </li>
        <li className={styles.count}>
          コメ{" "}
          <span className={styles.value}>
            {video.commentCounter.toLocaleString()}
          </span>
        </li>
        <li className={styles.count}>
          マイ{" "}
          <span className={styles.value}>
            {video.mylistCounter.toLocaleString()}
          </span>
        </li>
        <li className={`${styles.count} ${styles.user}`}>
          <Link
            href={{
              pathname: "/search",
              query: removeEmpty({ ...options, page: 1, userId: video.userId }),
            }}
          >
            <a className={styles.value}>{video.userId}</a>
          </Link>
        </li>
      </ul>
    </div>
  );
});

export default VideoData;
