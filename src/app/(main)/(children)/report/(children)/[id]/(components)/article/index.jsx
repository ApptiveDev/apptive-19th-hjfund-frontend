"use client";

import Icon from "@/components/icon";
import styles from "./styles.module.scss";
import { useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { reportScrollProgressState } from "@/store/report";

const Article = ({ children, readtime }) => {
  const articleRef = useRef(null);
  const [_, setReportScrollProgress] = useRecoilState(
    reportScrollProgressState
  );

  useEffect(() => {
    if (!articleRef.current) return;

    setReportScrollProgress({
      start: articleRef.current.offsetTop - 60,
      end:
        articleRef.current.offsetTop +
        articleRef.current.offsetHeight -
        window.innerHeight +
        100,
    });
  }, [children]);

  return (
    <div className={styles.container}>
      <p className={styles.readtime}>
        <Icon size={14} iconType="circle-clock" />
        <span>{readtime} 소요</span>
      </p>
      <article ref={articleRef} className={styles.article}>
        {children}
      </article>
    </div>
  );
};

export default Article;
