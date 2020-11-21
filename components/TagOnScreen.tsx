import React from "react";
import TrackVisibility from "react-on-screen";
import Tag, { NoLinkTag } from "./Tag";

const TagOnScreen = ({ name }: { name: string }) => {
  return (
    <TrackVisibility throttleInterval={0} offset={250} partialVisibility={true}>
      {({ isVisible }) =>
        isVisible ? <Tag name={name} /> : <NoLinkTag name={name}></NoLinkTag>
      }
    </TrackVisibility>
  );
};

export default TagOnScreen;
