"use client";

import { forwardRef } from "react";
import styles from "./styles.module.scss";
import { classes } from "@/tools/classes";

const Boolean = forwardRef(
  (
    {
      onChange,
      className,
      style,
      checked,
      booleanType = "checkbox",
      booleanBackgroundColor,
      booleanBorderColor,
      booleanIconColor,
      booleanHoverBackgroundColor,
      booleanHoverBorderColor,
      booleanHoverIconColor,
      booleanCheckedBackgroundColor,
      booleanCheckedBorderColor,
      booleanCheckedIconColor,
      ...props
    },
    ref
  ) => {
    return (
      <input
        ref={ref}
        type={booleanType}
        className={classes(styles[booleanType], className)}
        style={{
          "--boolean-background-color": booleanBackgroundColor,
          "--boolean-border-color": booleanBorderColor,
          "--boolean-icon-color": booleanIconColor,
          "--boolean-hover-background-color": booleanHoverBackgroundColor,
          "--boolean-hover-border-color": booleanHoverBorderColor,
          "--boolean-hover-color": booleanHoverIconColor,
          "--boolean-checked-background-color": booleanCheckedBackgroundColor,
          "--boolean-checked-border-color": booleanCheckedBorderColor,
          "--boolean-checked-color": booleanCheckedIconColor,
          ...style,
        }}
        {...props}
      />
    );
  }
);

export default Boolean;
