import React from "react";
import TrackVisibility from "react-on-screen";
import Tag, { NoLinkTag } from "./Tag";

// タグはそれぞれ検索用オプションの影響を受けて毎回更新される。
// 1ページ内のタグ量は基本的に多くなる傾向にあり(1ページ平均900タグほど)、
// これを毎回すべて更新するとレンダリングが多すぎてとても遅くなる。
// react-on-screen を使用することで現在画面上に現れているタグのリンクのみ更新することで
// 高速化を図っている。
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
