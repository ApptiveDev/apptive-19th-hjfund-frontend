import Link from "next/link";
import styles from "./styles.module.scss";

const SocialButton = ({ className, url, imgSrc, imgSrcSet }) => (
  <a href={url ?? "/"} target="_blank" rel="noreferrer">
    <button type="button" className={className}>
      <img alt="google logo" src={imgSrc} srcSet={imgSrcSet} />
    </button>
  </a>
);

export default function Login() {
  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <p className={styles.comment}>
          Don't invest in what
          <br />
          you don't understand
        </p>
        <p className={styles.hello}>
          환영합니다! {process.env.WEBSITE_NAME}입니다
        </p>
        <p>로그인하시면 더 많은 정보를 보실 수 있습니다</p>
      </div>
      <form className={styles.form}>
        <div className={styles.textfield}>
          <label>E-mail</label>
          <input type="email" required placeholder="이메일 주소" />
        </div>
        <div className={styles.textfield}>
          <label>비밀번호</label>
          <input type="password" required placeholder="비밀번호" />
        </div>
        <div className={styles.buttons}>
          <button type="submit">로그인</button>
          <Link href="/signup">
            <button type="button">회원가입</button>
          </Link>
        </div>
      </form>
      <div className={styles.social}>
        <SocialButton
          url="/login/google"
          className={styles.google}
          imgSrc="/images/social/google.png"
          imgSrcSet="/images/social/google@2x.png 2x, /images/social/google@3x.png 3x"
        />
        <SocialButton
          url="/login/naver"
          className={styles.naver}
          imgSrc="/images/social/naver.png"
          imgSrcSet="/images/social/naver@2x.png 2x, /images/social/naver@3x.png 3x"
        />
        <SocialButton
          url="/login/kakao"
          className={styles.kakao}
          imgSrc="/images/social/kakao.png"
          imgSrcSet="/images/social/kakao@2x.png 2x, /images/social/kakao@3x.png 3x"
        />
      </div>
    </main>
  );
}
