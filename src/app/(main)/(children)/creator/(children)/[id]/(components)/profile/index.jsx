import Avatar from "@/components/avatar";
import styles from "./styles.module.scss";

export default function Profile() {
  return (
    <div className={styles.profile}>
      <Avatar size={100} url="/examples/example-profile-1.jpg" />
      <div className={styles.texts}>
        <p className={styles.creator}>크리에이터</p>
        <p className={styles.name}>John Doe</p>
        <p className={styles.description}>
          안녕하세요 주린이를 위한 성공투자가이드, 스톡트리입니다.
          <br />
          Hello, I'm Stocktree, a successful investment guide for stock
          beginners.
        </p>
      </div>
    </div>
  );
}
