import React, { useMemo } from "react";
import { Video, VideoFields } from "../lib/search";
import VideoDetail from "./VideoDetail";
import styles from "./VideoList.module.css";
import Pager from "../components/Pager";

type Props = {
  videos: Pick<Video, keyof VideoFields>[];
};

const VideoList = ({ videos }: Props) =>
  useMemo(() => {
    console.log("render videos");
    return (
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
    );
  }, [videos]);

export default VideoList;
