import styles from "./styles.module.scss";

import Logo from "../logo";
import Link from "next/link";
import { RequestButton, NotificationButton, SearchButton, UserProfileButton } from "./components";

const Header = ({ invert = false }) => {
  return (
    <header className={[styles.header, invert ? styles.invert : ""].join(" ")}>
      <nav>
        <Link href="/">
          <Logo className={invert ? styles["logo-invert"] : ""} />
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
        <RequestButton invert={invert} />
        <SearchButton invert={invert} />
        <NotificationButton invert={invert} />
        <UserProfileButton invert={invert} />
      </ul>
    </header>
  );
};

export default Header;
