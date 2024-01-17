import Button from "@/components/button";
import styles from "./styles.module.scss";

const textWithMode = {
  add: {
    title: "새 리포트",
    button: "리포트 게시",
  },
  edit: {
    title: "리포트 수정",
    button: "수정",
  },
};

const HeaderPlugin = ({ id }) => {
  const mode = id ? "edit" : "add";

  return (
    <div className={styles.container}>
      <p className={styles.title}>{textWithMode[mode]?.title}</p>
      <div className={styles.buttons}>
        {mode === "add" && <p className={styles.save}>변경사항이 저장됨</p>}
        <Button buttonSize="small">{textWithMode[mode]?.button}</Button>
      </div>
    </div>
  );
};

export default HeaderPlugin;
