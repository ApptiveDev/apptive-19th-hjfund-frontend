import styles from "../desktop.module.scss";

const Progress = ({ progressState }) => {
  return (
    <div className={styles.progress}>
      <span style={{ width: `${progressState * 100}%` }} />
    </div>
  );
};

export default Progress;
