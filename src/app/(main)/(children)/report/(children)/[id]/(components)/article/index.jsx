import { Icon } from "@/components";
import styles from "./styles.module.scss";

const Article = ({ children, readtime }) => {
  return (
    <div className={styles.container}>
      <p className={styles.readtime}>
        <Icon size={14} iconType="circle-clock" />
        <span>{readtime} 소요</span>
      </p>
      <article className={styles.article}>{children}</article>
    </div>
  );
};

export default Article;