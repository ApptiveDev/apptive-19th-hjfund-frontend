"use client";

import { useState } from "react";
import styles from "./styles.module.scss";

const ProfileForm = () => {
  const [data, setData] = useState({
    name: "홍길동",
    email: "abcd@naver.com",
    phone: null,
  });

  const onSubmit = () => false;

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      {Object.entries({
        name: {
          label: "이름",
          placeholder: "이름을 입력해주세요",
        },
        email: {
          label: "이메일",
          placeholder: "이메일을 입력해주세요",
        },
        phone: {
          label: "연락처",
          placeholder: "연락처를 입력해주세요 (선택)",
        },
      }).map(([key, metadata]) => (
        <div key={key} className={styles.row}>
          <label htmlFor="name">{metadata.label}</label>
          <input
            className="my-textfield"
            type="text"
            id="name"
            autoComplete="off"
            value={data[key]}
            placeholder={metadata.placeholder}
            onChange={(e) => setData({ ...data, [key]: e.target.value })}
          />
        </div>
      ))}
      <div className={styles.buttons}>
        <button className="my-button">취소</button>
        <button className="my-button">수정</button>
      </div>
    </form>
  );
};

export default ProfileForm;
