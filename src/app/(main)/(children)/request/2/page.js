"use client";
import Link from "next/link";
import styles from "./styles.module.scss";
import { useState } from "react";

export default function Request2() {
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
            <div className={styles.selectedcategorybox}>
              <span className={styles.number}>2</span>
              <span className={styles.text}>세부요청</span>
            </div>
            <div className={styles.categorybox}>
              <span className={styles.number}>3</span>
              <span className={styles.text}>요청완료</span>
            </div>
          </div>
          <div style={{ flex: "1", width: "100%" }}>
            <div className={styles.email}>
              이메일 입력
              <div className={styles.inputEmail}>
                <input
                  className={styles.inputBar}
                  placeholder="연락 가능한 이메일을 입력해주세요"
                ></input>
                <p type="button" className={styles.callEmail}>
                  이메일 불러오기
                </p>
              </div>
            </div>
            <div className={styles.detailRequest}>
              세부 요청사항
              <div className={styles.inputBox}>
                <textarea
                  type="text"
                  className={styles.detailBox}
                  placeholder="Ex) 산업 전반에 대해 디테일하게 다뤄주세요 / 2021년 매출액 변동폭이 큰 이유가 궁금해요. 경쟁사 OOO와 비교해서 다뤄주세요..."
                ></textarea>
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
            }}
          >
            <span style={{ flex: "1" }} />
            <Link href="/request/3">
              <button className={styles.nextbutton}>요청하기</button>
            </Link>
          </div>
        </section>
      </section>
    </main>
  );
}
