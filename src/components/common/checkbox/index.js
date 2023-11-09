import styles from "./styles.module.scss";

const Checkbox = ({ small, children, className, right = false, ...props }) => {
  return (
    <label className={[styles.checkbox, className].join(" ")}>
      <input type="checkbox" {...props} />
      {right ? children : null}
      {/* eslint-disable-next-line jsx-a11y/role-has-required-aria-props */}
      <span role="checkbox" className={small ? styles.small : ""}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={21}
          height={19}
          fill="none"
          {...props}
        >
          <path
            fillRule="evenodd"
            d="M19.904.803a1.5 1.5 0 0 1 .293 2.101l-11.333 15a1.5 1.5 0 0 1-2.394 0l-5.667-7.5a1.5 1.5 0 0 1 2.394-1.808l4.47 5.916L17.803 1.096a1.5 1.5 0 0 1 2.101-.293Z"
            clipRule="evenodd"
          />
        </svg>
      </span>
      {!right ? children : null}
    </label>
  );
};

export default Checkbox;
