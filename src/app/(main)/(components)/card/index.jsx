import Link from "next/link";
// import Image from "next/image";

import styles from "./styles.module.scss";

export default function Card({
  title,
  id,
  author,
  comments,
  hearts,
  thumbnail,
  iconColor,
  className,
  ...props
}) {
  return (
    <Link
      href="/report/1"
      className={[styles.card, className].join(" ")}
      {...props}
    >
      <div className={styles.image}>
        <img
          alt="thumbnail"
          src={thumbnail ?? process.env.FALLBACK_THUMBNAIL_URL}
        />
      </div>
      <div className={styles.info}>
        <p className={styles.title}>{title}</p>
        <div>
          <p>{author}</p>
          <div className={styles.reactions}>
            <div>
              <span>{comments}</span>
            </div>
            <div>
              <span>{hearts}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
