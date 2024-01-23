"use client";
import Link from "next/link";
import styles from "./styles.module.scss";
import { useState } from "react";
import { VscCheck } from "react-icons/vsc";

export default function Request3() {
  return (
    <div className={styles.container}>
      <div className={styles.requestbox}>
        <div className={styles.requestboxheader}>
          <span>➊ 종목 선택</span>
          <span>➋ 세부정보 입력</span>
          <span>------------------------------</span>
          <span className={styles.selected}>➌ 요청 완료</span>
        </div>
        <div className={styles.requestboxbody}>
          <span className={styles.searchbox}>
            <VscCheck
              style={{ color: "white", height: "48px", width: "48px" }}
            />
          </span>
          <p className={styles.textbox}>
            <span className={styles.boxtitle}>요청 완료</span>
            <span className={styles.boxsubtitle}>
              검토 후, 기재하신 이메일로 결과가 발송됩니다.
            </span>
          </p>
        </div>
        <div className={styles.requestboxfooter}>
          <Link href="/">
            <button className={styles.nextbutton}>완료</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
