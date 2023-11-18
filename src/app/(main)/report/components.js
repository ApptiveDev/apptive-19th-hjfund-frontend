import styles from "./styles.module.scss";
import ArticleComment from "@/components/svg/article_comment";
import ArticleLike from "@/components/svg/article_like";

export function Dropdown() {
  return (
    <p className={styles.dropdown}>
      <li>정확도순</li>
      <hr />
      <li>최신순</li>
    </p>
  );
}

export const ReportPreview = ({
  picture,
  company,
  title,
  creator,
  likes,
  comments,
}) => {
  return (
    <article type="button" onClick="" className={styles.sector}>
      <img className={styles.reportImg} src={picture} alt="report_image" />
      <p className={styles.reportTextbox}>
        <div className={styles.reportText}>
          <p className={styles.reportCompany}>{company}</p>
          <p className={styles.reportTitle}>{title}</p>
        </div>
        <div className={styles.reportInfo}>
          <button className={styles.reportCreator}>{creator}</button>
          <p className={styles.buttons}>
            <button onClick="" className={styles.reportLike}>
              <ArticleLike color="#E73325" />
              &nbsp;
              {likes}
            </button>
            <button onClick="" className={styles.reportComment}>
              <ArticleComment />
              &nbsp;
              {comments}
            </button>
          </p>
        </div>
      </p>
    </article>
  );
};
