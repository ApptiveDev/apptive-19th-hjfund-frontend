import { classes } from "@/tools/classes";

import styles from "./styles.module.scss";
import { conditionalClass } from "@/tools/classes";
import { FixedLayerId } from "../layer";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

export function ModalTitle({ title, children, ...props }) {
  return (
    <div className={styles.title} {...props}>
      <h2>{title}</h2>
      {children}
    </div>
  );
}

export function ModalContent({ children, ...props }) {
  return (
    <div className={styles.content} {...props}>
      {children}
    </div>
  );
}

export function ModalFooter({ children, ...props }) {
  return (
    <div className={styles.footer} {...props}>
      {children}
    </div>
  );
}

export default function Modal({
  isOpen,
  onClose,
  className,
  children,
  clickOutsideToClose = true,
  anchorRef,
}) {
  const [isMountable, setIsMountable] = useState(false);

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

  useEffect(() => {
    setIsMountable(true);
  }, []);

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

  return (
    isMountable &&
    createPortal(
      element,
      (anchorRef && anchorRef.current) ?? document.getElementById(FixedLayerId)
    )
  );
}
