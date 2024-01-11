import Header from "@/components/header";
import styles from "./styles.module.scss";
import Toolbar from "./(components)/toolbar";

export default function Page() {
  return (
    <main>
      <Header className={styles.header} />
      <Toolbar />
    </main>
  );
}
