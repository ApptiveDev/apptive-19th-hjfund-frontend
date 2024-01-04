export { default as Notification } from "./notification";
export { default as Search } from "./search";
export { default as UserProfile } from "./profile";
export { default as Menu } from "./menu";
export { default as Progress } from "./progress";

import Link from "next/link";
import Button from "../../button";
import desktopStyles from "../desktop.module.scss";
import Icon from "@/components/icon";

export const Request = () => {
  return (
    <li className={desktopStyles["non-icon-button"]}>
      <Link href="/request">
        <Button
          className={desktopStyles["button-invert-outlined"]}
          buttonSize="small"
          buttonStyle="outlined"
        >
          종목 요청하기
        </Button>
      </Link>
    </li>
  );
};

export const MobileSearch = () => {
  return (
    <li>
      <Link href="/search">
        <Icon
          button
          iconType="magnifying-glass"
        />
      </Link>
    </li>
  );
};