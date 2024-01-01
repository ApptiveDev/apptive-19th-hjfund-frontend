import styles from "./styles.module.scss";

import Logo from "../logo";
import Link from "next/link";
import { Request, Notification, Search, UserProfile } from "./components";

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
        <Request invert={invert} />
        <Search invert={invert} />
        <Notification invert={invert} />
        <UserProfile invert={invert} />
      </ul>
    </header>
  );
};

export default Header;
