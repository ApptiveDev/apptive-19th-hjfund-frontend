"use client";

import { useEffect, useState } from "react";
import Icon from "../../icon";

import styles from "../mobile.module.scss";
import Link from "next/link";
import { useAuth } from "@/tools/auth-provider";
import Avatar from "@/components/avatar";
import { postLogout } from "@/requests/user/auth/logout";


const MenuButton = ({ onClick, props }) => {
  return (
    <li {...props}>
      <Icon button iconType="dashboard-circle" onClick={onClick} />
    </li>
  );
};

const MenuProfile = ({ user }) => {
  return (
    <div className={styles["menu-profile"]}>
      <Avatar url={user.profile.photo} />
      <div className={styles.info}>
        <p>{user.nickName}</p>
        <p className={styles.email}>{user.uid}</p>
      </div>
    </div>
  );
};

const Navigation = ({ isLoggedIn }) => {
  return (
    <nav className={styles.navigation}>
      <Link href="/report">리포트</Link>
      <Link href="/note">투자노트</Link>
      {isLoggedIn && <Link href="/request">종목 요청하기</Link>}
      {/* <Link href="/notification">알림</Link> */}
    </nav>
  );
};

const UserMenu = () => {
  return (
    <div className={styles.navigation} style={{ marginBottom: 30 }}>
      <Link href="/my">마이페이지</Link>
      <button onClick={() => postLogout().then(() => location.reload())}>
        로그아웃
      </button>
    </div>
  );
};

const MenuSheet = ({ setIsOpened }) => {
  const { user, isLoggedIn } = useAuth();

  return (
    <li className={styles["menu-sheet"]} onClick={() => setIsOpened(false)}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        <Icon
          button
          className={styles.exit}
          onClick={() => setIsOpened(false)}
          iconType="delete-1"
        />
        {isLoggedIn && <MenuProfile user={user} />}
        <Navigation isLoggedIn={isLoggedIn} />
        <div style={{ flex: 1 }} />
        {isLoggedIn && <UserMenu />}
      </div>
    </li>
  );
};

const Menu = () => {
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    if (isOpened) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpened]);

  return (
    <>
      <MenuButton onClick={() => setIsOpened(true)} />
      {isOpened && <MenuSheet setIsOpened={setIsOpened} />}
    </>
  );
};

export default Menu;
