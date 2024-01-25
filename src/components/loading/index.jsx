import { classes } from "@/tools/classes";
import styles from "./styles.module.scss";
import { conditionalClass } from "@/tools/classes";

export function LoadingIndicator({ className, invert, ...props }) {
  return (
    <div
      className={classes(
        styles.indicator,
        conditionalClass(invert, styles.invert),
        className
      )}
      {...props}
    >
      <span />
      <span />
      <span />
    </div>
  );
}

export default function LoadingLayer({ className, invert, ...props }) {
  return (
    <div className={classes(styles.layer, className)} {...props}>
      <LoadingIndicator invert={invert} />
    </div>
  );
}
