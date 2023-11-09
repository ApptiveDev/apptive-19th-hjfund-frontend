import {
  CommentLikeLinear,
  CommentMoreLinear,
  CommentReplyLinear,
} from "@/components/svg";

import styles from "./styles.module.scss";

export const Comment = ({
  profile,
  username,
  date,
  content,
  likes,
  children,
  reply_index,
}) => {
  return (
    <article className={styles.comment}>
      <img src={profile} alt="profile" />
      <div>
        <p>{username}</p>
        <p>{content}</p>
      </div>
      <div>
        <div>
          <time>{date}</time>
          <div>
            <CommentLikeLinear color="var(--main-color)" />
            <span style={{ marginLeft: "4px" }}>{likes}</span>
          </div>
        </div>
        <div>
          <button>
            <CommentReplyLinear color="var(--passive-text-color)" />
          </button>
          <span role="separator" />
          <button>
            <CommentLikeLinear color="var(--passive-text-color)" />
          </button>
          <span role="separator" />
          <button>
            <CommentMoreLinear color="var(--passive-text-color)" />
          </button>
        </div>
      </div>
    </article>
  );
};
