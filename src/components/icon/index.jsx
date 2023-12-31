"use client";

import React from "react";
import PropTypes from "prop-types";

import icons from "./assets";
import styles from "./styles.module.scss";

const Icon = ({
  button,
  buttonSize = 36,
  size = 24,
  iconType = "add-square",
  ...props
}) => {
  const IconComponent = icons[iconType];

  if (button) {
    return (
      <button
        className={styles.button}
        style={{
          width: buttonSize,
          height: buttonSize,
        }}
      >
        <IconComponent
          style={{
            width: size,
            height: size,
          }}
          {...props}
        />
      </button>
    );
  }

  return (
    <IconComponent
      style={{
        width: size,
        height: size,
      }}
      {...props}
    />
  );
};

Icon.propTypes = {
  button: PropTypes.bool,
  buttonSize: PropTypes.number,
  size: PropTypes.number,
  iconType: PropTypes.oneOf(Object.keys(icons)).isRequired,
};

export default Icon;
