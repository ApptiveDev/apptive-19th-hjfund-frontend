import desktopStyles from "./desktop.module.scss";
import mobileStyles from "./mobile.module.scss";

import Logo from "../logo";
import Link from "next/link";
import { Request, Notification, Search, UserProfile, Menu } from "./components";
import { UserAgentComponent } from "@/tools/user-agent";
import { MobileSearch } from "./components";

const DesktopHeader = () => {
  return (
    <header className={desktopStyles.header}>
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

const MobileHeader = () => {
  return (
    <header className={mobileStyles.header}>
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

const Header = UserAgentComponent({
  desktop: DesktopHeader,
  mobile: MobileHeader,
});

export default Header;
