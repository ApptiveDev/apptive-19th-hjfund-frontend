"use client";

import { usePathname } from "next/navigation";

import styles from "./styles.module.scss";
import Tab from "@/components/tab";
import Link from "next/link";
import { classes } from "@/tools/classes";
import { conditionalClass } from "@/tools/classes";

const myPageTabs = [
  {
    name: "계정",
    href: "/my/account",
  },
  {
    name: "크리에이터",
    href: "/my/creator",
  },
  {
    name: "좋아요 목록",
    href: "/my/likes",
  },
];

export default function Navigation({ isMobile }) {
  const pathname = usePathname();

  return (
    <>
      <div
        className={classes(
          styles.container,
          conditionalClass(isMobile, styles.mobile)
        )}
      >
        <h2 className={styles.title}>마이페이지</h2>
      </div>
      <nav
        className={classes(
          styles.nav,
          conditionalClass(isMobile, styles.mobile)
        )}
      >
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
