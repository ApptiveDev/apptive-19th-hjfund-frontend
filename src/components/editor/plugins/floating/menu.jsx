import { forwardRef } from "react";
import styles from "./styles.module.scss";
import { classes } from "@/tools/classes";
import { conditionalClass } from "@/tools/classes";
import Icon from "@/components/icon";

import BoldIcon from "./icons/bold.svg";
import StrikethroughIcon from "./icons/strikethrough.svg";
import UnderlineIcon from "./icons/underline.svg";
import PalleteIcon from "./icons/pallete.svg";

export const FloatingMenu = forwardRef(({ editor, coords }, ref) => {

  return (
    <div
      ref={ref}
      style={coords ? { top: coords.y, left: coords.x } : undefined}
      aria-hidden={!coords}
      className={classes(styles.floating, conditionalClass(!coords, styles.hidden))}
    >
      <button className={styles.link}>
        <Icon size={16} iconType="link-chain" />
        <span>링크</span>
      </button>
      <span className={styles.divider} />
      <button className={styles.icon}>
        <BoldIcon />
      </button>
      <button className={styles.icon}>
        <StrikethroughIcon />
      </button>
      <button className={styles.icon}>
        <UnderlineIcon />
      </button>
      <button className={classes(styles.icon, styles.pallete)}>
        <span />
        <PalleteIcon />
      </button>
    </div>
  );
});
