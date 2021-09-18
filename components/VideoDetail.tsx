import React from "react";
import { Video } from "../lib/search";
import styles from "./Video.module.css";
import stripTag from "../lib/stripTag";
import VideoWrap from "./VideoWrap";
import VideoData from "./VideoData";
import TagList from "./TagList";

export const usedFields = [
  "contentId",
  "title",
  "description",
  "viewCounter",
  "thumbnailUrl",
  "startTime",
  "commentCounter",
  "tags",
  "mylistCounter",
  "likeCounter",
  "lengthSeconds",
  "userId",
] as const;

export type VideoProps = {
  video: Pick<Video, typeof usedFields[number]>;
};

const urlPrefix = "https://www.nicovideo.jp/watch/";

const VideoDetail = React.memo(({ video }: VideoProps) => {
  return (
    <div className={styles.videoDetail}>
      <VideoWrap video={video} float />
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
VideoDetail.displayName = "VideoDetail";

export default VideoDetail;
