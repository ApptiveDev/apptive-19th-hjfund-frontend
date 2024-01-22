"use client";

import styles from "./styles.module.scss";
import Button from "@/components/button";
import { classes } from "@/tools/classes";

export function HelloBanner() {
  return (
    <div className={classes(styles.hello, styles.banner)}>
      <h2 className={styles.title}>StockTree의 회원이 되신 것을 환영합니다!</h2>
      <p className={styles.description}>
        2단계 인증, 프로필 사진 등 계정을 마저 설정하거나 사이트를 둘러보십시오.
      </p>
    </div>
  );
}

export function EmailVerificationBanner() {
  return (
    <div className={classes(styles.verification, styles.banner)}>
      <h2 className={styles.title}>이메일 인증을 완료해 주세요.</h2>
      <p className={styles.description}>
        댓글 작성, 크리에이터 신청 등의 기능을 이용하려면 먼저 이메일 인증을
        완료해 주세요.
      </p>
      <div className={styles.buttons}>
        <Button buttonSize="small" buttonStyle="outlined">
          인증 메일 다시 보내기
        </Button>
        <Button buttonSize="small" buttonStyle="outlined">
          이메일 변경하기
        </Button>
      </div>
    </div>
  );
}
