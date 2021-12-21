import React from "react";

import styles from "./OutputField.module.css";

function OutputField({ value }) {
  return (
    <div className={styles.outputFieldContainer}>
      <textarea defaultValue={value} className={styles.outputField}></textarea>
    </div>
  );
}

export default OutputField;
