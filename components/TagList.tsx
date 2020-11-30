import React, { useEffect, useRef } from "react";
import styles from "./TagList.module.css";
import Tag from "./TagOnScreen";

type Props = {
  tags: string[];
};

const TagList = React.memo(({ tags }: Props) => {
  const ref = useRef<HTMLUListElement>(null);

  const filteredTags = (tags: string[]): string[] =>
    tags.filter(
      (tag) => !["音MAD", "音mad", "音ＭＡＤ", "音ｍａｄ"].includes(tag)
    );

  useEffect(() => {
    if (ref.current) {
      const event = new Event("scroll");
      ref.current.addEventListener("scroll", () => window.dispatchEvent(event));
    }
  }, []);

  return (
    <div className={styles.tagsWrapper}>
      <ul className={styles.tags} ref={ref}>
        {filteredTags(tags).map((tag) => (
          <li className={styles.tag} key={tag}>
            <Tag name={tag} />
          </li>
        ))}
      </ul>
    </div>
  );
});
TagList.displayName = "TagList";

export default TagList;
