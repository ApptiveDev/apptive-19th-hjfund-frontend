import styles from "./styles.module.scss";

const Button = ({ children, className, color = "main", ...props }) => {
  return (
    <button
      className={[styles.button, className].join(" ")}
      style={{
        "--color": `var(--${color}-color)`,
        "--hover-color": `var(--${color}-hover-color)`,
        "--pressed-color": `var(--${color}-pressed-color)`,
      }}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
