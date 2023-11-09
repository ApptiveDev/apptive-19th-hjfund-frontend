import Link from "next/link";
// import Image from "next/image";

import { CommentMainCard, HeartMainCard } from "@/components/svg";
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
    <Link href="/any" className={[styles.card, className].join(" ")} {...props}>
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
              <CommentMainCard color={iconColor ?? "white"} />
              <span>{comments}</span>
            </div>
            <div>
              <HeartMainCard color={iconColor ?? "white"} />
              <span>{hearts}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
