import * as React from "react";
import { Video, VideoFields } from "../lib/search";
import VideoDetail from "./VideoDetail";
import styles from "./VideoList.module.css";

type Props = {
  videos: Pick<Video, keyof VideoFields>[];
};

const VideoList = ({ videos }: Props) => (
  <>
    <ul className={styles.videoList}>
      {videos.map((v) => (
        <li className={styles.item} key={v.contentId}>
          <VideoDetail video={v} />
        </li>
      ))}
    </ul>
  </>
);

export default VideoList;
