import styles from "./styles.module.scss";
import { ReportLikeLinear, ReportCommentLinear } from "@/components/svg";

export const ReportPreview = ({
  picture,
  company,
  title,
  username,
  likes,
  comments,
}) => {
  return (
    <article className={styles.sector}>
      <img className={styles.reportImg} src={picture} alt="report_image" />
      <p className={styles.reportTextbox}>
        <div className={styles.reportText}>
          <p className={styles.reportCompany}>{company}</p>
          <p className={styles.reportTitle}>{title}</p>
        </div>
        <div className={styles.reportInfo}>
          <p className={styles.reportUser}>{username}</p>
          <p className={styles.buttons}>
            <button className={styles.reportLike}>
              <ReportLikeLinear color="#6C6C6C" />
              &nbsp;
              {likes}
            </button>
            <button className={styles.reportComment}>
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
