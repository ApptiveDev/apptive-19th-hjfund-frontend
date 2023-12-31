"use client";

import { useState } from "react";
import styles from "./styles.module.scss";
import ProfileForm from "./(components)/profile-form";

export default function Profile() {
  const [isCreator, setIsCreator] = useState(true);

  return (
    <main className={styles.main}>
      <div className={styles.pic}>
        <img
          src="/images/my/profile.png"
          srcSet="/images/my/profile@2x.png 2x, /images/my/profile@3x.png 3x"
          alt="프로필 사진"
          width={175}
          height={175}
        />
        <div>
          <button className="my-button">변경</button>
          <button className="my-button">삭제</button>
        </div>
        <p>회원님은 네이버로 로그인하셨습니다</p>
      </div>
      <ProfileForm isCreator={isCreator} />
    </main>
  );
}
