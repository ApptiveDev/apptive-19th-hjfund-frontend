"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import styles from "./styles.module.scss";
import Tab from "@/components/tab";
import { classes } from "@/tools/classes";
import { conditionalClass } from "@/tools/classes";

export default function Navigation({ isMobile }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const ReportTabs = [
    {
      name: "최신순",
      order: "latest",
    },
    {
      name: "인기순",
      order: "popular",
    },
  ];

  const nowTab = params.get("order") ?? "latest";

  const changeTab = (order) => {
    const current = new URLSearchParams(Array.from(params.entries()));
    current.set("order", order);

    const search = current.toString();
    const url = search ? `${pathname}?${search}` : pathname;

    router.push(url, undefined, { shallow: true });
  };

  return (
    <>
      <div
        className={classes(
          styles.container,
          conditionalClass(isMobile, styles.mobile)
        )}
      >
        <h2 className={styles.title}>리포트</h2>
      </div>
      <nav
        className={classes(
          styles.nav,
          conditionalClass(isMobile, styles.mobile)
        )}
      >
        <div className={styles.items}>
          {ReportTabs.map((tab) => (
            <Tab
              key={tab.order}
              title={tab.name}
              active={nowTab === tab.order}
              onClick={() => changeTab(tab.order)}
            />
          ))}
        </div>
      </nav>
    </>
  );
}
