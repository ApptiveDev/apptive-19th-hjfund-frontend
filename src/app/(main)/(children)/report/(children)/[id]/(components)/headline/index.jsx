import { Button, Icon } from "@/components";
import styles from "./styles.module.scss";
import { useUserAgent } from "@/tools/user-agent";

const Thumbnail = ({ thumbnail }) => {
  return (
    <div className={styles.thumbnail}>
      <img alt="thumbnail" src={thumbnail} />
    </div>
  );
};

const Headline = ({
  title,
  itemName,
  itemCode,
  thumbnail,
  date,
  hearts,
  views,
}) => {
  const { isMobile } = useUserAgent();

  return (
    <section className={[styles.headline, isMobile ? styles.mobile : ""].join(" ")}>
      <div className={styles.container}>
        <div className={styles.item}>
          <span role="link">{itemName}</span>
          <div className={styles.seperator} />
          <span role="link">{itemCode}</span>
        </div>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.metadata}>
          <span>{date}</span>
          <span className={styles.chip}>
            <Icon size={18} iconType="heart" />
            {hearts}
          </span>
          <span className={styles.chip}>
            <Icon size={18} iconType="visible" />
            {views}
          </span>
        </div>
      </div>
      <Thumbnail thumbnail={thumbnail} />
    </section>
  );
};

export default Headline;
