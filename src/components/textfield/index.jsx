"use client";

import { forwardRef, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { classes } from "@/tools/classes";
import { conditionalClass } from "@/tools/classes";

const Textfield = forwardRef(
  (
    {
      className,
      style,
      onFocus,
      onBlur,
      textfieldSize = "medium",
      textfieldLeft,
      textfieldRight,
      textfieldBackgroundColor,
      textfieldBorderColor,
      textfieldTextColor,
      textfieldHoverBackgroundColor,
      textfieldHoverBorderColor,
      textfieldHoverTextColor,
      textfieldFocusBackgroundColor,
      textfieldFocusBorderColor,
      textfieldFocusTextColor,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
      <div
        className={classes(
          styles.textfield,
          styles[textfieldSize],
          conditionalClass(isFocused, styles.focus),
          className
        )}
        style={{
          "--textfield-background-color": textfieldBackgroundColor,
          "--textfield-border-color": textfieldBorderColor,
          "--textfield-text-color": textfieldTextColor,
          "--textfield-hover-background-color": textfieldHoverBackgroundColor,
          "--textfield-hover-border-color": textfieldHoverBorderColor,
          "--textfield-hover-text-color": textfieldHoverTextColor,
          "--textfield-focus-background-color": textfieldFocusBackgroundColor,
          "--textfield-focus-border-color": textfieldFocusBorderColor,
          "--textfield-focus-text-color": textfieldFocusTextColor,
          ...style,
        }}
      >
        {textfieldLeft}
        <input
          ref={ref}
          onFocus={(e) => {
            setIsFocused(true);
            onFocus && onFocus(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur && onBlur(e);
          }}
          {...props}
        />
        {textfieldRight}
      </div>
    );
  }
);

export default Textfield;
