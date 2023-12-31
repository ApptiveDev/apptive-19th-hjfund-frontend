import Icon from "../icon";
import Link from "next/link";
import Button from "../button";

import styles from "./styles.module.scss";

export const RequestButton = () => {
  return (
    <li className={styles["non-icon-button"]}>
      <Link href="/request">
        <Button buttonSize="small" buttonStyle="outlined">
          종목 요청하기
        </Button>
      </Link>
    </li>
  );
};

export const SearchButton = () => {
  return (
    <li>
      <Icon button iconType="magnifying-glass" />
    </li>
  );
};

export const NotificationButton = () => {
  return (
    <li>
      <Icon button iconType="bell-notification" />
    </li>
  );
};

export const UserProfileButton = () => {
  const isLoggedIn = false;

  return isLoggedIn ? (
    <li>
      <button className={styles.profile}>
        <span>Profile</span>
      </button>
    </li>
  ) : (
    <li className={styles["non-icon-button"]}>
      <Link href="/login">
        <Button buttonSize="small" buttonStyle="filled">
          로그인
        </Button>
      </Link>
    </li>
  );
};
