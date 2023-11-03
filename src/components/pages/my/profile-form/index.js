"use client";

import { useState } from "react";
import styles from "./styles.module.scss";

const ProfileForm = ({ isCreator }) => {
  const [data, setData] = useState({
    name: "홍길동",
    bio: "",
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
        bio: {
          label: "소개",
          placeholder: "소개를 입력해주세요 (선택)",
          forCreator: true,
          large: true,
        },
        email: {
          label: "이메일",
          placeholder: "이메일을 입력해주세요",
        },
        phone: {
          label: "연락처",
          placeholder: "연락처를 입력해주세요 (선택)",
        },
      }).map(([key, metadata]) => {
        if (metadata.forCreator && !isCreator) return null;

        return (
          <div key={key} className={styles.row}>
            <label htmlFor="name">{metadata.label}</label>
            {(() => {
              const args = {
                className: "my-textfield",
                id: "name",
                autoComplete: "off",
                value: data[key],
                placeholder: metadata.placeholder,
                onChange: (e) => setData({ ...data, [key]: e.target.value }),
              };

              if (metadata.large) return <textarea {...args} />;
              return <input type="text" {...args} />;
            })()}
          </div>
        );
      })}
      <div className={styles.buttons}>
        <button className="my-button">취소</button>
        <button className="my-button">수정</button>
      </div>
    </form>
  );
};

export default ProfileForm;
