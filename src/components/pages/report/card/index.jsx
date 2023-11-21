"use client";
import React, { useState } from "react";
import ArticleLike from "@/components/svg/article_like";
import styles from "./styles.module.scss";
import Link from "next/link";
import ArticleComment from "@/components/svg/article_comment";

export default function Card({
  title,
  company,
  creator,
  comments,
  hearts,
  thumbnail,
}) {
  const [iconColor, setIconColor] = useState(false);
  const [heart, setHeart] = useState(hearts);
  const heartCount = () => {
    if (!iconColor) {
      setHeart(parseInt(heart, 10) + 1);
    } else {
      setHeart(parseInt(heart, 10) - 1);
    }
  };

  return (
    <div className={styles.sector}>
      <img
        className={styles.reportImg}
        src={thumbnail ?? process.env.FALLBACK_THUMBNAIL_URL}
        alt="report_image"
      />
      <p className={styles.reportTextbox}>
        <Link href="/any" className={styles.reportText}>
          <p className={styles.reportCompany}>{company}</p>
          <p className={styles.reportTitle}>{title}</p>
        </Link>
        <div className={styles.reportInfo}>
          <button className={styles.reportCreator}>{creator}</button>
          <p className={styles.buttons}>
            <span
              onClick={() => {
                setIconColor(!iconColor);
                heartCount();
              }}
            >
              <ArticleLike color={iconColor ? "#E73325" : "#737373"} />
              &nbsp;
              {heart}
            </span>
            <span>
              <ArticleComment />
              &nbsp;
              {comments}
            </span>
          </p>
        </div>
      </p>
    </div>
  );
}
