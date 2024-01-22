import Header from "@/components/header";
import styles from "./styles.module.scss";
import Navigation from "../../(components)/navigation";

export default function CreatorPage() {
  return (
    <main className={styles.main}>
      <Header absolute />
      <Navigation />
    </main>
  );
}
