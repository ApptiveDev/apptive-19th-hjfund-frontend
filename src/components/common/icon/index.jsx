import React from "react";
import icons from "./icons.json";
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
    {icons.icons["st-icon-" + name]}
  </i>
);
