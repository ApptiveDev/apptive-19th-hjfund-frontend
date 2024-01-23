"use client";
import Link from "next/link";
import styles from "./styles.module.scss";
import { useState } from "react";

export default function Request2() {
  return (
    <div className={styles.container}>
      <div className={styles.requestbox}>
        <div className={styles.requestboxheader}>
          <span>➊ 종목 선택</span>
          <span className={styles.selected}>➋ 세부정보 입력</span>
          <span>------------------------------</span>
          <span>➌ 요청 완료</span>
        </div>
        <div className={styles.requestboxbody}>
          <span className={styles.textbox}>
            <span className={styles.boxtitle}>세부정보 입력</span>
            <span className={styles.boxsubtitle}>
              추가적인 설명, 연락받을 이메일 등을 입력해 주세요.
            </span>
          </span>
          <span className={styles.sized_box}>
            <input
              className={styles.description_input}
              multiline={true}
              type="text"
              placeholder="설명을 입력하세요"
            />
            <input
              className={styles.email_input}
              type="email"
              placeholder="이메일 주소 (선택)"
            />
            <p className={styles.email_footer}>
              이메일 주소를 기재하지 않으면 계정에 등록된 이메일 주소로 결과가
              통지됩니다.
            </p>
          </span>
        </div>
        <div className={styles.requestboxfooter}>
          <Link href="/request">
            <button className={styles.tomainbutton}>이전</button>
          </Link>

          <Link href="/request/3">
            <button className={styles.nextbutton}>다음</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
