import Link from "next/link";
import { BellHeader, UserHeader } from "@/components/svg";

import styles from "./styles.module.scss";
import headerStyles from "@/components/common/header/styles.module.scss";

export default function Header() {
  return (
    <header className={[headerStyles.header, styles.header].join(" ")}>
      <div className={headerStyles.left}>
        <Link href="/" className={[headerStyles.title, styles.title].join(" ")}>
          <h1>{process.env.WEBSITE_NAME}</h1>
        </Link>
      </div>
      <div className={headerStyles.right}>
        <div className={headerStyles.tools}>
          <div className={headerStyles.dropdown}>
            <UserHeader color="white" />
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
              <BellHeader color="white" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
