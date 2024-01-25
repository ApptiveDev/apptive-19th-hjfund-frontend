"use client";

import Link from "next/link";
import Button from "../../button";

import styles from "../desktop.module.scss";
import { forwardRef, useEffect, useRef, useState } from "react";
import { classes } from "@/tools/classes";
import { useAuth } from "@/tools/auth-provider";
import Avatar from "@/components/avatar";
import { postLogout } from "@/requests/user/auth/logout";

const UserProfileButton = forwardRef(
  ({ onClick, isLoggedIn = false, user, ...props }, ref) => {
    return isLoggedIn ? (
      <li ref={ref} {...props}>
        <button className={styles.profile} onClick={onClick}>
          <Avatar url={user.profile.photo} />
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
  }
);

const UserProfileSheet = forwardRef((props, ref) => {
  const { user } = useAuth();

  return (
    <li
      ref={ref}
      className={classes(styles.layer, styles["profile-sheet"])}
      {...props}
    >
      <ul>
        <li className={styles.info}>
          <p>{user.nickName}</p>
          <p className={styles.email}>{user.uid}</p>
        </li>
        <li>
          <Link href="/my">마이페이지</Link>
        </li>
        <li>
          <button onClick={() => postLogout().then(() => location.reload())}>
            로그아웃
          </button>
        </li>
      </ul>
    </li>
  );
});

const UserProfile = () => {
  const { user, isLoggedIn } = useAuth();
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
      <UserProfileButton
        user={user}
        isLoggedIn={isLoggedIn}
        ref={buttonRef}
        onClick={() => setIsOpened(!isOpened)}
      />
      {isOpened && isLoggedIn && <UserProfileSheet ref={sheetRef} />}
    </>
  );
};

export default UserProfile;
