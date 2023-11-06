import { Checkbox } from "@/components/common";
import styles from "../login/styles.module.scss";
import registerStyles from "./styles.module.scss";

export default function Login() {
  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <p className={styles.comment}>
          Don&apost invest in what
          <br />
          you don't understand
        </p>
        <p className={styles.hello}>회원가입</p>
      </div>
      <form className={styles.form}>
        <div className={styles.textfield}>
          <label>E-mail</label>
          <input type="email" required placeholder="이메일 주소" />
        </div>
        <div className={styles.textfield}>
          <label>닉네임</label>
          <input type="text" required placeholder="이름" />
        </div>
        <div className={styles.textfield}>
          <label>비밀번호</label>
          <input type="password" required placeholder="비밀번호" />
        </div>
        <div className={styles.textfield}>
          <label>비밀번호 확인</label>
          <input type="password" required placeholder="비밀번호 확인" />
        </div>
        <div className={registerStyles.checkboxes}>
          <Checkbox id="agree1" right small required>
            서비스 이용약관 동의 (필수)
          </Checkbox>
          <Checkbox id="agree1" right small required>
            개인정보 수집 및 이용 동의 (필수)
          </Checkbox>
        </div>
        <button className={registerStyles.button} type="submit">
          회원가입
        </button>
      </form>
    </main>
  );
}
