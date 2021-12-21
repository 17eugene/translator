import React from "react";

import styles from "./InputField.module.css";

function InputField({ onChange, value, detected }) {
  return (
    <div className={styles.inputWrapper}>
      <div className={styles.inputFieldContainer}>
        <p className={styles.detected}>
          Translate from: <span>{detected}</span>
        </p>
        <textarea
          value={value}
          onChange={onChange}
          className={styles.inputField}
          placeholder="Enter text to translate..."
        ></textarea>
      </div>
    </div>
  );
}

export default InputField;
