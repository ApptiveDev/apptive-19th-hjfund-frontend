import { classes } from "@/tools/classes";

import styles from "./styles.module.scss";
import { conditionalClass } from "@/tools/classes";
import { FixedLayerId } from "../layer";
import { createPortal } from "react-dom";
import { useEffect } from "react";

export default function Modal({
  isOpen,
  onClose,
  className,
  children,
  clickOutsideToClose = true,
  anchorRef,
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

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

  return createPortal(
    element,
    (anchorRef && anchorRef.current) ?? document.getElementById(FixedLayerId)
  );
}
