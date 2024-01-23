"use client";

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import styles from "./styles.module.scss";
import { classes } from "@/tools/classes";
import { conditionalClass } from "@/tools/classes";

const Radio = forwardRef(
  (
    {
      onChange,
      className,
      style,
      checked,
      radioBackgroundColor,
      radioBorderColor,
      radioIconColor,
      radioHoverBackgroundColor,
      radioHoverBorderColor,
      radioHoverIconColor,
      radioCheckedBackgroundColor,
      radioCheckedBorderColor,
      radioCheckedIconColor,
      ...props
    },
    ref
  ) => {
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
      if (checked !== undefined) setIsChecked(checked);
    }, [checked]);

    const inputRef = useRef(null);
    useImperativeHandle(ref, () => inputRef.current, []);

    return (
      <span
        role="radio"
        className={classes(
          styles.radio,
          conditionalClass(isChecked, styles.checked),
          className
        )}
        onClick={() => setIsChecked(!isChecked)}
      >
        <input
          type="radio"
          className={styles.input}
          checked={isChecked}
          onChange={(e) =>
            onChange ? onChange(e) : setIsChecked(e.target.checked)
          }
          onClick={(e) => e.stopPropagation()}
          style={{
            "--radio-background-color": radioBackgroundColor,
            "--radio-border-color": radioBorderColor,
            "--radio-icon-color": radioIconColor,
            "--radio-hover-background-color": radioHoverBackgroundColor,
            "--radio-hover-border-color": radioHoverBorderColor,
            "--radio-hover-icon-color": radioHoverIconColor,
            "--radio-checked-background-color":
              radioCheckedBackgroundColor,
            "--radio-checked-border-color": radioCheckedBorderColor,
            "--radio-checked-icon-color": radioCheckedIconColor,
            ...style,
          }}
          ref={inputRef}
          {...props}
        />
      </span>
    );
  }
);

export default Radio;
