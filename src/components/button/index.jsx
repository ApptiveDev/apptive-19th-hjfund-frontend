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
  ...props
}) => {
  return (
    <button
      className={[styles.button, styles[buttonSize], styles[buttonStyle], className].join(" ")}
      style={{
        "--button-background-color": buttonBackgroundColor,
        "--button-border-color": buttonBorderColor,
        "--button-text-color": buttonTextColor,
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
};

export default Button;
