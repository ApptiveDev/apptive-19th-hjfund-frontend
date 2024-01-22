"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import styles from "./styles.module.scss";
import Tab from "@/components/tab";
import Link from "next/link";

const myPageTabs = [
  {
    name: "프로필",
    href: "/my/profile",
  },
  {
    name: "에디터 설정",
    href: "/my/editor",
  },
  {
    name: "좋아한 목록",
    href: "/my/likes",
  },
];

export default function Navigation() {
  const pathname = usePathname();

  useEffect(() => {});

  return (
    <>
      <div className={styles.container}>
        <h2 className={styles.title}>마이페이지</h2>
      </div>
      <nav className={styles.nav}>
        <div className={styles.items}>
          {myPageTabs.map((tab) => (
            <Link key={tab.href} href={tab.href}>
              <Tab title={tab.name} active={pathname.startsWith(tab.href)} />
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
