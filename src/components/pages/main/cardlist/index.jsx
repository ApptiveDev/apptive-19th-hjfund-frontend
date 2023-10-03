"use client";

import { useState } from "react";
import { ArrowMainCardlist, CommentMainCard, HeartMainCard } from "@/components/svg";
import Link from "next/link";

import styles from "./styles.module.scss";

export default function CardList() {
  const DUMMY_LENGTH = 3;

  const [index, setIndex] = useState(0);

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <span>최근 리포트</span>
        <span>Recent Reports</span>
      </div>
      <div className={styles.list}>
        <button onClick={() => setIndex((prev) => (prev + DUMMY_LENGTH - 1) % DUMMY_LENGTH)}>
          <ArrowMainCardlist color="white" />
        </button>
        <div className={styles.roll_container}>
          <div className={styles.roll} style={{ transform: `translateX(${-380 * index}px)` }}>
            {Array.from({ length: DUMMY_LENGTH }).map((_, i) => (
              <Link key={"card-" + i} href="/any" className={styles.card}>
              <div className={styles.image}>
                <img alt="thumbnail" src="/examples/tesla_main_card.webp" />
              </div>
              <div className={styles.info}>
                <p className={styles.title}>테슬라 리서치 리포트 II</p>
                <div>
                  <p>작성자명</p>
                  <div className={styles.reactions}>
                    <div>
                      <CommentMainCard color="#969696" />
                      <span>20</span>
                    </div>
                    <div>
                      <HeartMainCard color="#969696" />
                      <span>22</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
            ))}
          </div>
        </div>
        <button onClick={() => setIndex((prev) => (prev + 1) % DUMMY_LENGTH)}>
          <ArrowMainCardlist style={{
            transform: "rotate(180deg)"
          }} color="white" />
        </button>
      </div>
    </div>
  )
}