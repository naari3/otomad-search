import { useState, Dispatch, SetStateAction, useEffect } from "react";
import styles from "./Thumbnail.module.css";
import TrackVisibility from "react-on-screen";

const NO_THUMBNAIL_URL =
  "https://nicovideo.cdn.nimg.jp/web/img/common/no_thumbnail_M.jpg";

const Inner = ({
  isVisible,
  setViewable,
}: {
  isVisible: boolean;
  setViewable: Dispatch<SetStateAction<boolean>>;
}) => {
  useEffect(() => {
    if (isVisible) setViewable(isVisible);
  }, [isVisible]);

  return <></>;
};

// TODO: https://github.com/naari3/otomad-search/issues/15
const Thumbnail = ({
  thumbnailUrl,
  title,
}: {
  thumbnailUrl: string;
  title: string;
}) => {
  const [viewable, setViewable] = useState(false);

  return (
    <>
      <TrackVisibility
        once={true}
        throttleInterval={0}
        partialVisibility={true}
        offset={250}
      >
        {({ isVisible }) => (
          <Inner isVisible={isVisible} setViewable={setViewable} />
        )}
      </TrackVisibility>
      <img
        className={styles.thumb}
        src={viewable ? `${thumbnailUrl}.M` : NO_THUMBNAIL_URL}
        onError={(e) => {
          e.currentTarget.src = thumbnailUrl;
        }}
        alt={title}
      />
    </>
  );
};

export default Thumbnail;
