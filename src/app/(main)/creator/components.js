import styles from "./styles.module.scss";
import { ReportLikeLinear, ReportCommentLinear } from "@/components/svg";

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
              <ReportLikeLinear color="#6C6C6C" />
              &nbsp;
              {likes}
            </button>
            <button onClick="" className={styles.reportComment}>
              <ReportCommentLinear color="#6C6C6C" />
              &nbsp;
              {comments}
            </button>
          </p>
        </div>
      </p>
    </article>
  );
};
