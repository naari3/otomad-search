import React from "react";
import { Video, VideoFields } from "../lib/search";
import styles from "./Video.module.css";

type Props = {
  video: Pick<Video, keyof VideoFields>;
};

const VideoData = React.memo(({ video }: Props) => {
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
      </ul>
    </div>
  );
});

export default VideoData;
