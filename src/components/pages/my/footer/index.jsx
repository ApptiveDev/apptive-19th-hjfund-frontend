import styles from "./styles.module.scss";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Link href="/terms">이용약관</Link>
      <div className={styles.logo}>
        <p>{process.env.WEBSITE_NAME}</p>
        <img
          alt="logo"
          src="/images/logo/stocktree.png"
          srcSet="/images/logo/stocktree@2x.png 2x, /images/logo/stocktree@3x.png 3x"
        />
      </div>
    </footer>
  );
}
