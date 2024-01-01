export { default as Notification } from "./notification";
export { default as Search } from "./search";
export { default as UserProfile } from "./profile";

import Link from "next/link";
import Button from "../../button";
import styles from "../styles.module.scss";

export const Request = ({ invert = false }) => {
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