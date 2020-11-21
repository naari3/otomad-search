import React from "react";
import { Video, VideoFields } from "../lib/search";
import styles from "./Video.module.css";
import VideoWrap from "./VideoWrap";
import VideoData from "./VideoData";

type Props = {
  video: Pick<Video, keyof VideoFields>;
};

const urlPrefix = "https://www.nicovideo.jp/watch/";

const VideoIcon = React.memo(({ video }: Props) => {
  return (
    <div className={styles.videoIcon}>
      <VideoWrap video={video} />
      <div className={styles.itemContent}>
        <p className={styles.itemTitle}>
          <a href={`${urlPrefix}${video.contentId}`} target="_blank">
            {video.title}
          </a>
        </p>
        <VideoData video={video} />
      </div>
    </div>
  );
});

export default VideoIcon;
