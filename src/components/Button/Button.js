import React from "react";

import { Button } from "semantic-ui-react";

import styles from "./Button.module.css";

function TranslateBtn({ onClick }) {
  return (
    <div className={styles.btnContainer}>
      <Button className={styles.btn} onClick={onClick}>
        Translate
      </Button>
    </div>
  );
}

export default TranslateBtn;
