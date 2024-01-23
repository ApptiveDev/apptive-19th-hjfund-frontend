"use client";

import Link from "next/link";
import styles from "./styles.module.scss";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();

  return (

    pathname !== "/creator/add" && (
      <footer className={styles.footer}>
        <div className={styles.container}>
          <h2>StockTree</h2>
          <ul>
            <li>
              <Link href="/terms">이용약관</Link>
            </li>
            <li>
              <Link href="/privacy">개인정보 처리방침</Link>
            </li>
            <li>
              <Link href="/licenses">오픈소스 라이선스</Link>
            </li>
          </ul>
          <p>문의: {process.env.NEXT_PUBLIC_CONTACT_EMAIL_ADDRESS}</p>
        </div>
      </footer>
    )

  );
};

export default Footer;
