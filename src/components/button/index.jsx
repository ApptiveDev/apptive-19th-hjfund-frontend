import styles from "./styles.module.scss";
import PropTypes from "prop-types";

const Button = ({
  children,
  className,
  style,
  buttonSize = "medium",
  buttonStyle = "filled",
  // overrides
  buttonBackgroundColor,
  buttonBorderColor,
  buttonTextColor,
  buttonHoverBackgroundColor,
  buttonHoverBorderColor,
  buttonHoverTextColor,
  ...props
}) => {
  return (
    <button
      className={[styles.button, styles[buttonSize], styles[buttonStyle], className].join(" ")}
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
      {children}
    </button>
  );
};

export default Button;
