import React from "react";
import styles from "./styles.module.scss";

export const Icon = ({ name, size }) => (
  <i
    className={styles.icon}
    style={{
      fontSize: size ? size : undefined,
      width: size ? size : undefined,
      height: size ? size : undefined,
    }}
  >
    {"st-icon-" + name}
  </i>
);
