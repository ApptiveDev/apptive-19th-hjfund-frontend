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
            <span style={{ marginLeft: "4px" }}>{likes}</span>
          </div>
        </div>
        <div>
          <button>
          </button>
          <span role="separator" />
          <button>
          </button>
          <span role="separator" />
          <button>
          </button>
        </div>
      </div>
    </article>
  );
};
