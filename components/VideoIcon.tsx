import React from "react";
import styles from "./Video.module.css";
import VideoWrap from "./VideoWrap";
import VideoData from "./VideoData";
import { VideoProps } from "./VideoDetail";

type Props = VideoProps;

const urlPrefix = "https://www.nicovideo.jp/watch/";

const VideoIcon = React.memo(({ video }: Props) => {
  return (
    <div className={styles.videoIcon}>
      <VideoWrap video={video} />
      <div className={styles.itemContent}>
        <p className={styles.itemTitle}>
          <a
            href={`${urlPrefix}${video.contentId}`}
            target="_blank"
            rel="noreferrer"
          >
            {video.title}
          </a>
        </p>
        <VideoData video={video} />
      </div>
    </div>
  );
});
VideoIcon.displayName = "VideoIcon";

export default VideoIcon;
