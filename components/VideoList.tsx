import React from "react";
import { Video, VideoFields } from "../lib/search";
import VideoDetail from "./VideoDetail";
import VideoIcon from "./VideoIcon";
import ViewingSwitcher from "./ViewingSwitcher";
import styles from "./Video.module.css";
import videoListStyles from "./VideoList.module.css";
import Pager from "../components/Pager";
import { useGlobalState as useViewingGlobalState } from "../contexts/ViewingContext";
import { VideoProps } from "./VideoDetail";
import PerSwitcher from "./PerSwitcher";

type Props = {
  videos: VideoProps["video"][];
};

const VideoList = React.memo(({ videos }: Props) => {
  const viewing = useViewingGlobalState();
  return (
    <>
      <div className={videoListStyles.toolbar}>
        <div className={videoListStyles.left}>
          <Pager />
        </div>
        <div className={videoListStyles.right}>
          <ViewingSwitcher />
          <PerSwitcher />
        </div>
      </div>
      <ul
        className={`${styles.videoList} ${
          viewing === "detail" ? styles.videoDetailList : styles.videoIconList
        } `}
      >
        {videos.map((v) => (
          <li className={styles.item} key={v.contentId}>
            {viewing === "detail" ? (
              <VideoDetail video={v} />
            ) : (
              <VideoIcon video={v} />
            )}
          </li>
        ))}
      </ul>
      <div className={videoListStyles.toolbar}>
        <div className={videoListStyles.left}>
          <Pager />
        </div>
        <div className={videoListStyles.right}>
          <ViewingSwitcher />
          <PerSwitcher />
        </div>
      </div>
    </>
  );
});

export default VideoList;
