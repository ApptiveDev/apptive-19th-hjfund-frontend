"use client";

import React from "react";

import icons from "./assets";
import styles from "./styles.module.scss";

const Icon = ({
  button,
  buttonSize = 36,
  size = 24,
  iconType = "add-square",
  onClick,
  className,
  style,
  ...props
}) => {
  const IconComponent = icons[iconType];

  if (button) {
    return (
      <button
        className={[styles.button, className].join(" ")}
        onClick={onClick}
        style={{
          width: buttonSize,
          height: buttonSize,
          ...style
        }}
      >
        <IconComponent
          width={size} height={size} viewBox="0 0 24 24"
          {...props}
        />
      </button>
    );
  }

  return (
    <IconComponent
      width={size} height={size} viewBox="0 0 24 24"
      className={className}
      style={style}
      {...props}
    />
  );
};

export default Icon;
