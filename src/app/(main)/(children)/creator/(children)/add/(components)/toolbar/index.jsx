import Button from "@/components/button";
import styles from "./styles.module.scss";

const Toolbar = () => {
  return (
    <div className={styles.container}>
      <p className={styles.title}>새 리포트</p>
      <div className={styles.buttons}>
        <p className={styles.save}>변경사항이 자동으로 저장됨</p>
        <Button buttonSize="small">리포트 등록</Button>
      </div>
    </div>
  );
};

export default Toolbar;
