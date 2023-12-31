import styles from "./styles.module.scss";

import Logo from "../logo";
import Link from "next/link";
import {  NotificationButton, RequestButton, SearchButton, UserProfileButton } from "./components";

const Header = () => {
  return (
    <header className={styles.header}>
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
        {/* <RequestButton /> */}
        <SearchButton />
        <NotificationButton />
        <UserProfileButton />
      </ul>
    </header>
  );
};

export default Header;
