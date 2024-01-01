import desktopStyles from "./desktop.module.scss";
import mobileStyles from "./mobile.module.scss";

import Logo from "../logo";
import Link from "next/link";
import { Request, Notification, Search, UserProfile, Menu } from "./components";
import { MobileSearch } from "./components";

export const DesktopHeader = () => {
  return (
    <header data-useragent="desktop" className={desktopStyles.header}>
      <nav>
        <Link href="/">
          <Logo />
          <h1>StockTree</h1>
        </Link>
        <div>
          <Link href="/report">
            리포트
          </Link>
          <Link href="/notes">
            투자노트
          </Link>
        </div>
      </nav>
      <div style={{ flex: 1 }} />
      <ul>
        <Request />
        <Search />
        <Notification />
        <UserProfile />
      </ul>
    </header>
  );
};

export const MobileHeader = () => {
  return (
    <header data-useragent="mobile" className={mobileStyles.header}>
      <Link className={mobileStyles.logo} href="/">
        <Logo />
        <h1>StockTree</h1>
      </Link>
      <div style={{ flex: 1 }} />
      <ul>
        <MobileSearch />
        <Menu />
      </ul>
    </header>
  );
};
