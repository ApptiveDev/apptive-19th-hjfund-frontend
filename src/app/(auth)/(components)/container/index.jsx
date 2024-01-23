import { useUserAgent } from "@/tools/user-agent";
import styles from "./styles.module.scss";
import { classes } from "@/tools/classes";
import { conditionalClass } from "@/tools/classes";

const Container = ({ children, ...props }) => {
  const { isMobile } = useUserAgent();

  return (
    <main
      className={classes(
        styles.container,
        conditionalClass(isMobile, styles.mobile)
      )}
      {...props}
    >
      <div className={styles.box}>{children}</div>
    </main>
  );
};

export default Container;
