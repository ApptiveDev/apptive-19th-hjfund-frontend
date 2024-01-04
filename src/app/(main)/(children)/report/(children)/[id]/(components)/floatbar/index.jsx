import { useUserAgent } from "@/tools/user-agent";
import styles from "./styles.module.scss";
import { Icon } from "@/components";

const Floatbar = ({ authorName, authorProfile, authorDescription }) => {
  return (
    <div className={styles.container}>
      <div className={styles.editor}>
        <img
          className={styles.profile}
          alt="author-profile"
          src={authorProfile}
        />
        <p className={styles.caption}>에디터</p>
        <p className={styles.name}>{authorName}</p>
        <p className={styles.description}>{authorDescription}</p>
      </div>
      <div className={styles.icons}>
        <Icon button iconType="share-link" />
        <Icon button iconType="heart" />
        <Icon button iconType="text-style" />
      </div>
    </div>
  );
};

export default Floatbar;
