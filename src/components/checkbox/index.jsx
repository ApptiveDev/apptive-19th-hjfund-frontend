"use client";

import { forwardRef, useImperativeHandle, useRef, useState } from "react";

import CheckIcon from "./icon.svg";
import styles from "./styles.module.scss";
import { classes } from "@/tools/classes";
import { conditionalClass } from "@/tools/classes";

const Checkbox = forwardRef(
  (
    {
      onChange,
      className,
      style,
      checkboxBackgroundColor,
      checkboxBorderColor,
      checkboxIconColor,
      checkboxHoverBackgroundColor,
      checkboxHoverBorderColor,
      checkboxHoverIconColor,
      checkboxCheckedBackgroundColor,
      checkboxCheckedBorderColor,
      checkboxCheckedIconColor,
      ...props
    },
    ref
  ) => {
    const [isChecked, setIsChecked] = useState(false);

    const inputRef = useRef(null);
    useImperativeHandle(ref, () => inputRef.current, []);

    return (
      <span
        role="checkbox"
        className={classes(
          styles.checkbox,
          conditionalClass(isChecked, styles.checked),
          className
        )}
        onClick={(e) => {
          e.stopPropagation();
          setIsChecked(!isChecked);
        }}
      >
        <input
          type="checkbox"
          className={styles.input}
          checked={isChecked}
          onChange={(e) => {
            setIsChecked(e.target.checked);
            onChange && onChange(e);
          }}
          onClick={(e) => e.stopPropagation()}
          style={{
            "--checkbox-background-color": checkboxBackgroundColor,
            "--checkbox-border-color": checkboxBorderColor,
            "--checkbox-icon-color": checkboxIconColor,
            "--checkbox-hover-background-color": checkboxHoverBackgroundColor,
            "--checkbox-hover-border-color": checkboxHoverBorderColor,
            "--checkbox-hover-icon-color": checkboxHoverIconColor,
            "--checkbox-checked-background-color":
              checkboxCheckedBackgroundColor,
            "--checkbox-checked-border-color": checkboxCheckedBorderColor,
            "--checkbox-checked-icon-color": checkboxCheckedIconColor,
            ...style,
          }}
          ref={inputRef}
          {...props}
        />
        <CheckIcon />
      </span>
    );
  }
);

export default Checkbox;
