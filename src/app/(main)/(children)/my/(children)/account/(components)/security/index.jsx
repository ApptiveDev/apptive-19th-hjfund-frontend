"use client";

import { classes } from "@/tools/classes";
import styles from "./styles.module.scss";
import Button from "@/components/button";
import { conditionalClass } from "@/tools/classes";
import { useRouter } from "next/navigation";

function SecurityItem({ label, description, button, disabled, onClick }) {
  return (
    <div className={styles.item}>
      <div className={styles.texts}>
        <p className={styles.label}>{label}</p>
        <p className={styles.description}>{description}</p>
      </div>
      <Button
        disabled={disabled}
        onClick={onClick}
        buttonSize="small"
        buttonStyle="outlined"
      >
        {button}
      </Button>
    </div>
  );
}

export default function Security({ isMobile }) {
  const router = useRouter();

  return (
    <div
      className={classes(
        styles.container,
        conditionalClass(isMobile, styles.mobile)
      )}
    >
      <SecurityItem
        label="비밀번호"
        description="보안을 위해 주기적으로 비밀번호를 변경하는 것이 좋습니다."
        button="변경"
        onClick={() => router.push("/my/account/password")}
      />
      <SecurityItem
        label="2단계 인증"
        description="Google Authenticator 등의 OTP 앱을 사용하여 내 계정을 안전하게 보호합니다."
        disabled
        button="준비 중"
      />
    </div>
  );
}
