import Icon from "../icon";
import Link from "next/link";
import Button from "../button";

import styles from "./styles.module.scss";

export const RequestButton = ({ invert = false }) => {
  return (
    <li className={styles["non-icon-button"]}>
      <Link href="/request">
        <Button
          className={invert ? styles["button-invert-outlined"] : ""}
          buttonSize="small"
          buttonStyle="outlined"
        >
          종목 요청하기
        </Button>
      </Link>
    </li>
  );
};

export const SearchButton = ({ invert = false }) => {
  return (
    <li>
      <Icon
        className={invert ? styles["icon-invert"] : ""}
        button
        iconType="magnifying-glass"
      />
    </li>
  );
};

export const NotificationButton = ({ invert = false }) => {
  return (
    <li>
      <Icon
        className={invert ? styles["icon-invert"] : ""}
        button
        iconType="bell-notification"
      />
    </li>
  );
};

export const UserProfileButton = ({ invert = false }) => {
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
        <Button
          className={invert ? styles["button-invert-filled"] : ""}
          buttonSize="small"
          buttonStyle="filled"
        >
          로그인
        </Button>
      </Link>
    </li>
  );
};
