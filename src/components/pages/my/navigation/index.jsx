"use client";

import Link from "next/link";
import styles from "./styles.module.scss";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className={styles.nav}>
      <div>
        {Object.entries({
          "/my/profile": "프로필",
          "/my/note": "투자노트",
          "/my/remove": "회원탈퇴",
        }).map(([url, label]) => (
          <Link href={url} className={pathname == url ? styles.active : ""}>
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
