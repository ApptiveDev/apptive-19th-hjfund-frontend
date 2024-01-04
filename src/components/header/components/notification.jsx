"use client";

import { forwardRef, useEffect, useRef, useState } from "react";
import Icon from "../../icon";

import styles from "../desktop.module.scss";
import { classes } from "@/tools/classes";

const NotificationButton = forwardRef(({ onClick }, ref) => {
  return (
    <li ref={ref}>
      <Icon
        button
        iconType="bell-notification"
        className={styles["button-invert-icon"]}
        onClick={onClick}
      />
    </li>
  );
});

const NotificationItem = ({ icon, content }) => {
  return (
    <li className={styles.item}>
      <div>{icon}</div>
      <p className={styles.content}>{content}</p>
    </li>
  );
};

const NotificationSheet = forwardRef((props, ref) => {
  return (
    <li
      ref={ref}
      className={classes(styles.layer, styles["notification-sheet"])}
      {...props}
    >
      <header>
        <h3>알림</h3>
        <Icon size={18} button iconType="vertical-slider-square" />
      </header>
      <ul className={styles["notification-list"]}>
        <NotificationItem
          icon={<Icon iconType="news-paper" />}
          content={
            "일하는개미 님의 새 리포트가 등록되었습니다.\n지금 확인해 보세요!"
          }
        />
      </ul>
    </li>
  );
});

const Notification = () => {
  const [isOpened, setIsOpened] = useState(false);

  const buttonRef = useRef();
  const sheetRef = useRef();

  // Close the sheet when clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        !buttonRef.current?.contains(e.target) &&
        !sheetRef.current?.contains(e.target)
      ) {
        setIsOpened(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  });

  return (
    <>
      <NotificationButton onClick={() => setIsOpened(!isOpened)} />
      {isOpened && <NotificationSheet ref={sheetRef} />}
    </>
  );
};

export default Notification;
