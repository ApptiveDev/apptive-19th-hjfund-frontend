"use client";

import Link from "next/link";
import Button from "../../../button";

import styles from "../../desktop.module.scss";
import { forwardRef, useEffect, useRef, useState } from "react";

const UserProfileButton = forwardRef(({ onClick, isLoggedIn = false, ...props }, ref) => {
  return isLoggedIn ? (
    <li ref={ref} {...props}>
      <button className={styles.profile} onClick={onClick}>
        <img src="/examples/example-profile-1.jpg" alt="profile" />
      </button>
    </li>
  ) : (
    <li ref={ref} className={styles["non-icon-button"]} {...props}>
      <Link href="/login">
        <Button
          buttonSize="small"
          buttonStyle="filled"
          className={styles["button-invert-filled"]}
        >
          로그인
        </Button>
      </Link>
    </li>
  );
});

const UserProfileSheet = forwardRef((props, ref) => {
  return (
    <li ref={ref} className={[styles.layer, styles["profile-sheet"]].join(" ")} {...props}>
      <ul>
        <li className={styles.info}>
          <p>사용자 이름</p>
          <p className={styles.email}>someon@example.com</p>
        </li>
        <li>
          <Link href="/my">마이페이지</Link>
        </li>
        <li>
          <button>로그아웃</button>
        </li>
      </ul>
    </li>
  );
});

const UserProfile = () => {
  const isLoggedIn = true;
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
  })

  return (
    <>
      <UserProfileButton
        isLoggedIn={isLoggedIn}
        ref={buttonRef}
        onClick={() => setIsOpened(!isOpened)}
      />
      {isOpened && isLoggedIn && <UserProfileSheet ref={sheetRef} />}
    </>
  );
};

export default UserProfile;
