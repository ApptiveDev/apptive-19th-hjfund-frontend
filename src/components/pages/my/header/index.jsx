import Link from "next/link";
import { BellHeader, UserHeader } from "@/components/svg";

import styles from "./styles.module.scss";
import headerStyles from "@/components/common/header/styles.module.scss";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <Link href="/" className={styles.title}>
          <h1>{process.env.WEBSITE_NAME}</h1>
        </Link>
      </div>
      <div className={styles.right}>
        <div className={styles.tools}>
          <div className={headerStyles.dropdown}>
            <UserHeader color="var(--text-color)" />
            <ul>
              <li>
                <Link href="/login">로그인</Link>
              </li>
              <li>
                <Link href="/my">마이페이지</Link>
              </li>
              <li>
                <Link href="/scraps">스크랩</Link>
              </li>
            </ul>
          </div>
          <div className={headerStyles.dropdown}>
            <div>
              <BellHeader color="var(--text-color)" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
