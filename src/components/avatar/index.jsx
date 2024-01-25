import { classes } from "@/tools/classes";
import styles from "./styles.module.scss";

export default function Avatar({ url, size = 24, className, style, ...props }) {
  return (
    <div
      className={classes(styles.avatar, className)}
      style={{
        "--size": `${size}px`,
      }}
      {...props}
    >
      <img alt="avatar" src={url ?? "/images/etc/fallback-profile.png"} />
    </div>
  );
}
