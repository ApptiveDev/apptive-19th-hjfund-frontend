import styles from "./styles.module.scss";
import Icon from "@/components/icon";

const Floatbar = ({ authorName, authorProfile, authorDescription }) => {
  return (
    <div className={styles.container}>
      <div className={styles.editor}>
        <img
          className={styles.profile}
          alt="author-profile"
          src={authorProfile}
        />
        <p className={styles.caption}>크리에이터</p>
        <p className={styles.name}>{authorName}</p>
        <p className={styles.description}>{authorDescription}</p>
      </div>
      <div role="menu" className={styles.icons}>
        <Icon button iconType="share-link" />
        <Icon button iconType="heart" />
        <Icon button iconType="text-style" />
      </div>
    </div>
  );
};

export default Floatbar;
