import React, { FC } from "react";
import styles from "./Jussen.module.css";
import { useDispatch as useSearchDispatch } from "../contexts/SearchContext";

const JussenButton: FC<{ targetYear: number }> = ({ targetYear }) => {
  const searchDispatch = useSearchDispatch();

  const ev: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void = (
    e
  ) => {
    e.preventDefault();

    const since = `${targetYear - 1}-12-11T00:00`;
    const until = `${targetYear}-12-10T23:59`;

    searchDispatch({
      type: "update",
      payload: {
        startTimeGte: since,
        startTimeLte: until,
      },
    });
  };

  return (
    <button onClick={ev} className={styles.jussenButton}>
      {targetYear}年10選対象に絞る
    </button>
  );
};

export default JussenButton;
