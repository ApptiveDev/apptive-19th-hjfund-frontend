"use client";

import { useEffect, useRef, useState } from "react";

import { ArrowMainCardlist } from "@/components/svg";
import { Card } from "..";
import styles from "./styles.module.scss";

export default function CardList() {
  const DUMMY_LENGTH = 3;
  const TIMER_DELAY = 5000;

  const timerRef = useRef(null);
  const [index, setIndex] = useState(0);

  const cancelTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const startTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => move(), TIMER_DELAY);
  };

  const move = (isPrev) => {
    setIndex((prev) => (prev + (isPrev ? DUMMY_LENGTH - 1 : 1)) % DUMMY_LENGTH);
  };

  useEffect(() => {
    startTimer();
    return cancelTimer;
  }, [index]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      className={styles.container}
      onPointerEnter={() => cancelTimer()}
      onPointerLeave={() => startTimer()}
    >
      <div className={styles.title}>
        <span>최근 리포트</span>
        <span>Recent Reports</span>
      </div>
      <div className={styles.list}>
        <button onClick={() => move(true)}>
          <ArrowMainCardlist color="white" />
        </button>
        <div className={styles.roll_container}>
          <div
            className={styles.roll}
            style={{ transform: `translateX(${-380 * index}px)` }}
          >
            {Array.from({ length: DUMMY_LENGTH }).map((_, i) => (
              <Card
                key={"card-" + i}
                className={styles.card}
                thumbnail="/examples/tesla_main_card.webp"
                title="테슬라 리서치 리포트 II"
                author="작성자명"
                comments={20}
                hearts={22}
                iconColor="#969696"
              />
            ))}
          </div>
        </div>
        <button onClick={() => move()}>
          <ArrowMainCardlist
            style={{
              transform: "rotate(180deg)",
            }}
            color="white"
          />
        </button>
      </div>
    </div>
  );
}
