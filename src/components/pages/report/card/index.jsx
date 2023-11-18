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
  iconColor,
  ...props
}) {
  return (
    <Link href="/any" className={styles.sector}>
      <img
        className={styles.reportImg}
        src={thumbnail ?? process.env.FALLBACK_THUMBNAIL_URL}
        alt="report_image"
      />
      <p className={styles.reportTextbox}>
        <div className={styles.reportText}>
          <p className={styles.reportCompany}>{company}</p>
          <p className={styles.reportTitle}>{title}</p>
        </div>
        <div className={styles.reportInfo}>
          <button className={styles.reportCreator}>{creator}</button>
          <p className={styles.buttons}>
            <span>
              <ArticleLike color={iconColor ?? "#E73325"} />
              &nbsp;
              {hearts}
            </span>
            <span>
              <ArticleComment />
              &nbsp;
              {comments}
            </span>
          </p>
        </div>
      </p>
    </Link>
  );
}
