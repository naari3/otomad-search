import React, { useEffect } from "react";
import styles from "./ViewingSwitcher.module.css";
import { useDispatch as useViewingDispatch, useGlobalState as useViewingGlobalState } from "../contexts/ViewingContext";
import { useWindowSize } from "../lib/useWindowSize";

const ViewingSwitcher = React.memo(() => {
  const viewing = useViewingGlobalState();
  const viewingDispatch = useViewingDispatch();
  const windowSize = useWindowSize();

  useEffect(() => {
    if (windowSize.width <= 480) {
      viewingDispatch({
        type: "update",
        payload: "detail",
      });
    }
  }, [windowSize]);

  return (
    <div className={styles.viewingSwitcher}>
      <ul className={styles.viewingList}>
        <li className={`${styles.detail} ${viewing === "detail" ? styles.selected : ""}`}>
          <a
            className={viewing === "detail" ? styles.selected : ""}
            onClick={() => {
              viewingDispatch({
                type: "update",
                payload: "detail",
              });
            }}
          >
            <span>①</span>
          </a>
        </li>
        <li className={`${styles.icon} ${viewing !== "detail" ? styles.selected : ""}`}>
          <a
            onClick={() => {
              viewingDispatch({
                type: "update",
                payload: "icon",
              });
            }}
          >
            <span>⑥</span>
          </a>
        </li>
      </ul>
    </div>
  );
});
ViewingSwitcher.displayName = "ViewingSwitcher";

export default ViewingSwitcher;
