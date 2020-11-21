import React from "react";
import { Video, VideoFields } from "../lib/search";
import styles from "./VideoDetail.module.css";
import formattedDate from "../lib/date";
import secondsToMs from "../lib/secondsToMs";
import stripTag from "../lib/stripTag";
import Tag from "./TagOnScreen";
import Thumbnail from "./Thumbnail";

type Props = {
  video: Pick<Video, keyof VideoFields>;
};

const urlPrefix = "https://www.nicovideo.jp/watch/";

const VideoDetail = React.memo(({ video }: Props) => {
  return (
    <div className={styles.videoDetail}>
      <div className={styles.videoWrap}>
        <p className={styles.itemTime}>
          <span>{formattedDate(video.startTime)}</span>
          <span className={styles.separate}>投稿</span>
        </p>
        <div className={styles.itemThumbBox}>
          <div className={styles.itemThumb}>
            <div>
              <a
                href={`${urlPrefix}${video.contentId}`}
                className={styles.itemThumbWrap}
                target="_blank"
              >
                <Thumbnail
                  thumbnailUrl={video.thumbnailUrl}
                  title={video.title}
                />
              </a>
            </div>
            <span className={styles.videoLength}>
              {secondsToMs(video.lengthSeconds)}
            </span>
          </div>
        </div>
      </div>
      <div className={styles.itemContent}>
        <p className={styles.itemTitle}>
          <a href={`${urlPrefix}${video.contentId}`} target="_blank">
            {video.title}
          </a>
        </p>
        <div>
          <p className={styles.itemDescription}>
            {stripTag(video.description)}
          </p>
          <ul className={`${styles.list} ${styles.tags}`}>
            {video.tags
              .split(" ")
              .filter(
                (tag) =>
                  !["音MAD", "音mad", "音ＭＡＤ", "音ｍａｄ"].includes(tag)
              )
              .map((tag) => (
                <li className={styles.tag}>
                  <Tag name={tag} />
                </li>
              ))}
          </ul>
        </div>
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
      </div>
    </div>
  );
});

export default VideoDetail;
