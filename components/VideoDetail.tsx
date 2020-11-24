import React from "react";
import { Video, VideoFields } from "../lib/search";
import styles from "./Video.module.css";
import stripTag from "../lib/stripTag";
import VideoWrap from "./VideoWrap";
import VideoData from "./VideoData";
import TagList from "./TagList";

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
          <div className={styles.list}>
            <TagList tags={video.tags.split(" ")} />
          </div>
        </div>
        <VideoData video={video} />
      </div>
    </div>
  );
});

export default VideoDetail;
