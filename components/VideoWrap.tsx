import React from "react";
import { Video, VideoFields } from "../lib/search";
import styles from "./Video.module.css";
import formattedDate from "../lib/date";
import secondsToMs from "../lib/secondsToMs";
import Thumbnail from "./Thumbnail";

type Props = {
  video: Pick<Video, keyof VideoFields>;
  float?: boolean;
};

const urlPrefix = "https://www.nicovideo.jp/watch/";

const VideoWrap = React.memo(({ video }: Props) => {
  return (
    <div className={`${styles.videoWrap} ${styles.float}`}>
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
  );
});

export default VideoWrap;
