import styles from "./styles.module.scss";

export default function Remove() {
  return (
    <main className={styles.main}>
      <h1 className={styles.notice}>회원탈퇴 전에 꼭 확인하세요!</h1>
      <p style={{ marginBottom: 20 }}>
        탈퇴하면 마이페이지, 스크랩, 개인정보 등이 삭제됩니다.
      </p>
      <p style={{ marginBottom: 130 }}>정말 탈퇴하시겠습니까?</p>
      <label className={styles.agree}>
        <span>예, 탈퇴하겠습니다.</span>
        <input type="checkbox" />
      </label>
      <button className={[styles.button, "my-button"].join(" ")}>
        탈퇴하기
      </button>
    </main>
  );
}
