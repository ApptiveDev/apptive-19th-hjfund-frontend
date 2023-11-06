import Link from "next/link";
import { BellHeader, UserHeader } from "@/components/svg";
import Image from "next/image";

import styles from "./styles.module.scss";
import headerStyles from "@/components/common/header/styles.module.scss";

export default function Header() {
  return (
    <header className={[headerStyles.header, styles.header].join(" ")}>
      <div className={headerStyles.left}>
        <Link href="/" className={[headerStyles.title, styles.title].join(" ")}>
          <h1>{process.env.WEBSITE_NAME}</h1>
          <Image
            src="/images/logo/stocktree.png"
            srcSet="/images/logo/stocktree@2x.png 2x, /images/logo/stocktree@3x.png 3x"
            alt="stocktree logo"
          />
        </Link>
      </div>
      <div className={headerStyles.right}>
        <div className={headerStyles.tools}>
          <div className={[headerStyles.dropdown, styles.dropdown].join(" ")}>
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
