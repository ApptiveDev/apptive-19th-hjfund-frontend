"use client";

import Button from "@/components/button";
import Link from "next/link";

import styles from "./styles.module.scss";
import { useRouter } from "next/navigation";

export default function Buttons() {
  const router = useRouter();

  return (
    <div className={styles.buttons}>
      <Button onClick={() => router.back()} buttonStyle="outlined">
        뒤로가기
      </Button>
      <Link replace href="/">
        <Button buttonStyle="outlined">메인 페이지로</Button>
      </Link>
    </div>
  );
}
