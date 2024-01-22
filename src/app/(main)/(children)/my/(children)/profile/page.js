import Header from "@/components/header";
import styles from "./styles.module.scss";
import Navigation from "../../(components)/navigation";

export default function ProfilePage() {
  return (
    <main className={styles.main}>
      <Header absolute />
      <Navigation />
      <div style={{ height: 3000 }} />
    </main>
  );
}
