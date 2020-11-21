import React from "react";
import { Video, VideoFields } from "../lib/search";
import VideoDetail from "./VideoDetail";
import styles from "./VideoList.module.css";
import Pager from "../components/Pager";

type Props = {
  videos: Pick<Video, keyof VideoFields>[];
};

const VideoList = React.memo(({ videos }: Props) => (
  <>
    <Pager />
    <ul className={styles.videoList}>
      {videos.map((v) => (
        <li className={styles.item} key={v.contentId}>
          <VideoDetail video={v} />
        </li>
      ))}
    </ul>
    <Pager />
  </>
));

export default VideoList;
