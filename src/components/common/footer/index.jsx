import Link from "next/link";
import styles from "./styles.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        <div>
          <Link href="/any" className={styles["link-big"]}>커뮤니티</Link>
          <Link href="/any">종목</Link>
          <Link href="/any">투자노트</Link>
        </div>
        <div>
          <Link href="/any" className={styles["link-big"]}>리포트 포스팅</Link>
          <Link href="/any">인베스팅</Link>
          <Link href="/any">재무지식</Link>
        </div>
        <div>
          <Link href="/any" className={styles["link-big"]}>스크랩</Link>
          <Link href="/any">커뮤니티 스크랩</Link>
          <Link href="/any">리포트 스크랩</Link>
        </div>
        <div>
          <Link href="/any" className={styles["link-big"]}>마이페이지</Link>
          <Link href="/any">프로필 수정</Link>
          <Link href="/any">회원 탈퇴</Link>
          <Link href="/any">이용약관 </Link>
        </div>
      </div>
      <p className={styles.title}>웹사이트이름</p>
    </footer>
  )
}

export default Footer;