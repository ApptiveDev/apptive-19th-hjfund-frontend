"use client";

import Headline from "@/components/pages/creator/editor/headline";
import Editor from "@/components/pages/creator/editor";
import styles from "./styles.module.scss";
import { Button } from "@/components/common";

export default function Page() {
  return (
    <main className={styles.main}>
      <Headline>
        <Button color="gray">임시 저장</Button>
        <Button>등록</Button>
      </Headline>
      <Editor />
    </main>
  );
}
