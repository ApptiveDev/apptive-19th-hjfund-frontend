import { classes } from "@/tools/classes";
import styles from "./styles.module.scss";
import LoadingLayer from "../loading";
import { conditionalClass } from "@/tools/classes";

const Button = ({
  children,
  className,
  style,
  disabled,
  buttonLoading,
  buttonSize = "medium",
  buttonStyle = "filled",
  // overrides
  buttonBackgroundColor,
  buttonBorderColor,
  buttonTextColor,
  buttonHoverBackgroundColor,
  buttonHoverBorderColor,
  buttonHoverTextColor,
  buttonLoadingIndicatorColor,
  ...props
}) => {
  return (
    <button
      disabled={disabled || buttonLoading}
      className={classes(
        styles.button,
        styles[buttonSize],
        styles[buttonStyle],
        conditionalClass(buttonLoading, styles.loading),
        className
      )}
      style={{
        "--button-background-color": buttonBackgroundColor,
        "--button-border-color": buttonBorderColor,
        "--button-text-color": buttonTextColor,
        "--button-hover-background-color": buttonHoverBackgroundColor,
        "--button-hover-border-color": buttonHoverBorderColor,
        "--button-hover-text-color": buttonHoverTextColor,
        ...style,
      }}
      {...props}
    >
      <LoadingLayer
        className={classes(styles.loading, styles[buttonStyle])}
        invert={buttonStyle === "filled"}
        style={{
          "--button-background-color": buttonBackgroundColor,
          "--button-text-color": buttonLoadingIndicatorColor,
          opacity: buttonLoading ? 1 : 0,
        }}
      />
      {children}
    </button>
  );
};

export default Button;
