"use client";
import Link from "next/link";
import styles from "./styles.module.scss";
import { useState } from "react";

export default function Request3() {
  return (
    <main className={styles.page}>
      <section className={styles.banner}>
        <section className={styles.contents}>
          <div className={styles.title}>종목요청</div>
          <div className={styles.category}>
            <div className={styles.categorybox}>
              <span className={styles.number}>1</span>
              <span className={styles.text}>기업선택</span>
            </div>
            <div className={styles.categorybox}>
              <span className={styles.number}>2</span>
              <span className={styles.text}>세부요청</span>
            </div>
            <div className={styles.selectedcategorybox}>
              <span className={styles.number}>3</span>
              <span className={styles.text}>요청완료</span>
            </div>
          </div>
          <div className={styles.textSet} style={{ flex: "1" }}>
            <div className={styles.lineOne}>요청이 완료되었습니다</div>
            <div className={styles.lineTwo}>
              문의사항은 name@gmail.com을 이용해주세요
            </div>
          </div>
          <Link href="/">
            <button className={styles.nextbutton}>홈으로</button>
          </Link>
        </section>
      </section>
    </main>
  );
}
