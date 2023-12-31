import styles from "./styles.module.scss";
import PropTypes from "prop-types";

const Button = ({
  children,
  className,
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
      }}
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  buttonSize: PropTypes.oneOf(["small", "medium", "big"]),
  buttonStyle: PropTypes.oneOf(["filled", "outlined"]),
  buttonBackgroundColor: PropTypes.string,
  buttonBorderColor: PropTypes.string,
  buttonTextColor: PropTypes.string,
  buttonHoverBackgroundColor: PropTypes.string,
  buttonHoverBorderColor: PropTypes.string,
  buttonHoverTextColor: PropTypes.string,
};

export default Button;
