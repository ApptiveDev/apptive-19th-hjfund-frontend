"use client";

import { useEffect, useState } from "react";
import Icon from "../../icon";

import styles from "../mobile.module.scss";
import Link from "next/link";

const MenuButton = ({ onClick, props }) => {
  return (
    <li {...props}>
      <Icon button iconType="dashboard-circle" onClick={onClick} />
    </li>
  );
};

const MenuProfile = () => {
  return (
    <div className={styles["menu-profile"]}>
      <div className={styles.profile}>
        <img alt="profile" src="/examples/example-profile-1.jpg" />
      </div>
      <div className={styles.info}>
        <p>사용자 이름</p>
        <p className={styles.email}>someone@example.com</p>
      </div>
    </div>
  )
}

const Navigation = () => {
  return (
    <nav className={styles.navigation}>
      <Link href="/report">리포트</Link>
      <Link href="/note">투자노트</Link>
      <Link href="/request">종목 요청하기</Link>
      <Link href="/notification">알림</Link>
    </nav>
  )
}

const UserMenu = () => {
  return (
    <div className={styles.navigation} style={{marginBottom: 30}}>
      <Link href="/my">마이페이지</Link>
      <button>로그아웃</button>
    </div>
  )
}

const MenuSheet = ({ setIsOpened }) => {
  return (
    <li className={styles["menu-sheet"]} onClick={() => setIsOpened(false)}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        <Icon
          button
          className={styles.exit}
          onClick={() => setIsOpened(false)}
          iconType="delete-1"
        />
        <MenuProfile />
        <Navigation />
        <div style={{ flex: 1 }} />
        <UserMenu />
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
