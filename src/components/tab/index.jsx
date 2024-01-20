import { classes } from "@/tools/classes";
import styles from "./styles.module.scss";
import { conditionalClass } from "@/tools/classes";

export default function Tab({ title, active, onClick }) {
  return (
    <span
      className={classes(styles.tab, conditionalClass(active, styles.active))}
      onClick={onClick}
    >
      {title}
    </span>
  );
}
