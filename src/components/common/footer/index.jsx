import Link from "next/link";
import styles from "./styles.module.scss";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        <div>
          <Link href="/any" className={styles["link-big"]}>
            커뮤니티
          </Link>
          <Link href="/any">종목</Link>
          <Link href="/any">투자노트</Link>
        </div>
        <div>
          <Link href="/any" className={styles["link-big"]}>
            리포트 포스팅
          </Link>
          <Link href="/any">인베스팅</Link>
          <Link href="/any">재무지식</Link>
        </div>
        <div>
          <Link href="/any" className={styles["link-big"]}>
            스크랩
          </Link>
          <Link href="/any">커뮤니티 스크랩</Link>
          <Link href="/any">리포트 스크랩</Link>
        </div>
        <div>
          <Link href="/any" className={styles["link-big"]}>
            마이페이지
          </Link>
          <Link href="/any">프로필 수정</Link>
          <Link href="/any">회원 탈퇴</Link>
          <Link href="/any">이용약관 </Link>
        </div>
      </div>
      <div className={styles.logo}>
        <p>{process.env.WEBSITE_NAME}</p>
        <Image
          alt="logo"
          src="/images/logo/stocktree.png"
          srcSet="/images/logo/stocktree@2x.png 2x, /images/logo/stocktree@3x.png 3x"
          width={213}
          height={48}
        />
      </div>
    </footer>
  );
};

export default Footer;
