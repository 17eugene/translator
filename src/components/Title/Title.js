import React from "react";

import styles from "./Title.module.css";

function Title({ title }) {
  return (
    <div className={styles.titleWrapper}>
      <h1 className={styles.titleText}>{title}</h1>
    </div>
  );
}

export default Title;
