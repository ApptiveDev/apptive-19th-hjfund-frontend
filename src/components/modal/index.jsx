import { classes } from "@/tools/classes";

import styles from "./styles.module.scss";
import { conditionalClass } from "@/tools/classes";

export default function Modal({
  isOpen,
  onClose,
  className,
  children,
  clickOutsideToClose = true,
  anchorRef,
}) {
  const element = (
    <div
      className={classes(
        styles.blocking,
        conditionalClass(!isOpen, styles.hidden)
      )}
      aria-hidden={!isOpen}
      onClick={(e) => {
        if (clickOutsideToClose && e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className={classes(styles.container, className)}>{children}</div>
    </div>
  );

  return anchorRef && anchorRef.current
    ? createPortal(element, anchorRef.current)
    : element;
}
