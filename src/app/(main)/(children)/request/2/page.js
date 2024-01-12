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
          <p className={styles.textbox}>
            <span className={styles.boxtitle}>세부정보 입력</span>
            <span className={styles.boxsubtitle}>
              추가적인 설명, 연락받을 이메일 등을 입력해 주세요.
            </span>
          </p>

          <p className={styles.searchbox}>검색창</p>
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
