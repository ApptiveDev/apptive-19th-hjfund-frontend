import Header from "@/components/header";
import styles from "./styles.module.scss";
import Editor from "@/components/editor";

export default function Page() {
  return (
    <main className={styles.main}>
      <Header absolute className={styles.header} />
      <Editor editable />
    </main>
  );
}
