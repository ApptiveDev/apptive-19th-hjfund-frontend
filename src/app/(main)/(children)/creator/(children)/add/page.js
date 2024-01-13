import Header from "@/components/header";
import styles from "./styles.module.scss";
import Toolbar from "./(components)/toolbar";
import Editor from "@/components/editor";

export default function Page() {
  return (
    <main className={styles.main}>
      <Header className={styles.header} />
      <Toolbar />
      <Editor />
    </main>
  );
}
