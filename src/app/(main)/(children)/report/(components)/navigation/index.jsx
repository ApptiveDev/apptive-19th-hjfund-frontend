"use client";

import Tab from "@/components/tab";
import styles from "./styles.module.scss";
import { usePathname, useRouter } from "next/navigation";
import { classes } from "@/tools/classes";
import { conditionalClass } from "@/tools/classes";

const tabs = [
  {
    title: "최신순",
    order: "latest",
  },
  {
    title: "인기순",
    order: "popular",
  },
];

export default function Navigation({ order = "latest", isMobile }) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <>
      <h2
        className={classes(
          styles.header,
          conditionalClass(isMobile, styles.mobile)
        )}
      >
        리포트
      </h2>
      <nav className={styles.nav}>
        <div
          className={classes(
            styles.tabs,
            conditionalClass(isMobile, styles.mobile)
          )}
        >
          {tabs.map((tab) => (
            <Tab
              key={tab.order}
              title={tab.title}
              active={order === tab.order}
              onClick={() =>
                router.replace(pathname + "?order=" + tab.order, undefined, {
                  shallow: true,
                })
              }
            />
          ))}
        </div>
      </nav>
    </>
  );
}
