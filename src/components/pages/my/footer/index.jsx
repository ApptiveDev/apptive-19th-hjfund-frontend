import styles from "./styles.module.scss";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Link href="/terms">이용약관</Link>
      <h1>{process.env.WEBSITE_NAME}</h1>
    </footer>
  );
}
