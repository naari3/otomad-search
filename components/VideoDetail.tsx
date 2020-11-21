import React from "react";
import { Video, VideoFields } from "../lib/search";
import styles from "./Video.module.css";
import stripTag from "../lib/stripTag";
import VideoWrap from "./VideoWrap";
import VideoData from "./VideoData";
import Tag from "./TagOnScreen";

type Props = {
  video: Pick<Video, keyof VideoFields>;
};

const urlPrefix = "https://www.nicovideo.jp/watch/";

const VideoDetail = React.memo(({ video }: Props) => {
  return (
    <div className={styles.videoDetail}>
      <VideoWrap video={video} float />
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
                <li className={styles.tag} key={tag}>
                  <Tag name={tag} />
                </li>
              ))}
          </ul>
        </div>
        <VideoData video={video} />
      </div>
    </div>
  );
});

export default VideoDetail;
