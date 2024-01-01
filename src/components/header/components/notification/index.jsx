"use client";

import { forwardRef, useEffect, useRef, useState } from "react";
import Icon from "../../../icon";

import styles from "../../styles.module.scss";

const NotificationButton = forwardRef(({ invert, onClick }, ref) => {
  return (
    <li ref={ref}>
      <Icon
        className={invert ? styles["icon-invert"] : ""}
        button
        iconType="bell-notification"
        onClick={onClick}
      />
    </li>
  );
});

const NotificationItem = ({ icon, content }) => {
  return (
    <li className={styles.item}>
      <div>
        {icon}
      </div>
      <p className={styles.content}>{content}</p>
    </li>
  );
}

const NotificationSheet = forwardRef((props, ref) => {
  return (
    <li ref={ref} className={[styles.layer, styles["notification-sheet"]].join(" ")} {...props}>
      <header>
        <h3>알림</h3>
        <Icon size={18} button iconType="vertical-slider-square" />
      </header>
      <ul className={styles["notification-list"]}>
        <NotificationItem icon={<Icon iconType="news-paper" />} content={"일하는개미 님의 새 리포트가 등록되었습니다.\n지금 확인해 보세요!"} />
      </ul>
    </li>
  );
});

const Notification = ({ invert }) => {
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
      <NotificationButton invert={invert} onClick={() => setIsOpened(!isOpened)} />
      {isOpened && <NotificationSheet ref={sheetRef} />}
    </>
  );
};

export default Notification;
