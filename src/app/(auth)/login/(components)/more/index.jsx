import Link from "next/link";
import styles from "./styles.module.scss";

import { Naver, Google, Kakao } from "../social";
import Button from "@/components/button";

const More = () => (
  <div className={styles.container}>
    <div className={styles.divider}>
      <span>또는</span>
    </div>
    <div className={styles.links}>
      <Naver />
      <Kakao />
      <Google />
      <Link className={styles.register} href="/register">
        <Button buttonStyle="outlined">회원가입</Button>
      </Link>
    </div>
  </div>
);

export default More;
