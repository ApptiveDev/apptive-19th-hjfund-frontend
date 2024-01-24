"use client";

import styles from "./styles.module.scss";
import Boolean from "@/components/boolean";
import Button from "@/components/button";
import Textfield from "@/components/textfield";
import { isPasswordInvalid } from "@/tools/auth-form-checkes";
import { useState } from "react";

export default function Form() {
  const [formState, setFormState] = useState({
    password: {
      value: "",
      error: true,
    },
    agree: false,
  });

  return (
    <form className={styles.form}>
      <p>
        회원 탈퇴를 진행하면 좋아요 목록, 작성한 리포트, 투자노트 등의 모든
        정보가 즉시 삭제되며, 복구할 수 없습니다. 또한 탈퇴 후 30일간 재가입이
        불가합니다. 계속하려면 비밀번호를 입력하여 주세요.
      </p>
      <Textfield
        className={styles.textfield}
        placeholder="비밀번호"
        type="password"
        value={formState.password.value}
        onChange={(e) => {
          setFormState((prev) => ({
            ...prev,
            password: {
              value: e.target.value,
              error: isPasswordInvalid(e.target.value),
            },
          }));
        }}
      />
      <label className={styles.checkbox}>
        <Boolean
          checked={formState.agree}
          onChange={(e) =>
            setFormState((prev) => ({
              ...prev,
              agree: e.target.checked,
            }))
          }
        />
        <span>위 내용을 충분히 이해하였으며, 이에 동의합니다.</span>
      </label>
      <Button
        className={styles.button}
        buttonStyle="outlined"
        buttonSize="small"
        disabled={formState.password.error || !formState.agree}
      >
        회원 탈퇴
      </Button>
    </form>
  );
}
