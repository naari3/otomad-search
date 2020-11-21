import React from "react";
import styles from "./ViewingSwitcher.module.css";
import {
  useDispatch as useViewingDispatch,
  useGlobalState as useViewingGlobalState,
} from "../contexts/ViewingContext";

const ViewingSwitcher = React.memo(() => {
  const viewing = useViewingGlobalState();
  const viewingDispatch = useViewingDispatch();

  return (
    <div className={styles.viewingSwitcher}>
      <ul className={styles.viewingList}>
        <li
          className={`${styles.detail} ${
            viewing === "detail" ? styles.selected : ""
          }`}
        >
          <a
            className={viewing === "detail" ? styles.selected : ""}
            onClick={(e) => {
              viewingDispatch({
                type: "update",
                payload: "detail",
              });
            }}
          >
            <span>①</span>
          </a>
        </li>
        <li
          className={`${styles.icon} ${
            viewing !== "detail" ? styles.selected : ""
          }`}
        >
          <a
            onClick={(e) => {
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

export default ViewingSwitcher;
