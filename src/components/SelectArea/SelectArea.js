import React from "react";
import shortid from "shortid";

import styles from "./SelectArea.module.css";

function SelectArea({ list, onChange, value }) {
  return (
    <div className={styles.selectAreaContainer}>
      <select value={value} onChange={onChange} className={styles.options}>
        <option key={shortid.generate()}>Choose language</option>
        {list.map((language) => {
          return (
            <option key={shortid.generate()} value={language.code}>
              {language.name}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default SelectArea;
