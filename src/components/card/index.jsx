import Link from "next/link";
import Icon from "../icon";
import styles from "./styles.module.scss";

const Card = ({ id, thumbnail, title, date, comments, hearts }) => {
  return (
    <Link href={"/reports/" + id}>
      <div className={styles.card}>
        <div className={styles.thumbnail}>
          <img alt="thumbnail" src={thumbnail} />
        </div>
        <div className={styles.info}>
          <p className={styles.title}>{title}</p>
          <div className={styles.metadata}>
            <p>{date}</p>
            <span>
              <Icon size={12} iconType="chat-bubble-oval" />
              {comments}
            </span>
            <span>
              <Icon size={12} iconType="heart" />
              {hearts}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
