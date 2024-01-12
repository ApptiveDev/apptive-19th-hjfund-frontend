import Header from "@/components/header";
import styles from "./styles.module.scss";
import Toolbar from "./(components)/toolbar";
import EditorHeadline from "@/components/editor/headline";
import EditorContent from "@/components/editor/content";

export default function Page() {
  return (
    <main>
      <Header className={styles.header} />
      <Toolbar />
      <EditorHeadline />
      <EditorContent />
    </main>
  );
}
