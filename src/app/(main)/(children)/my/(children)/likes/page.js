import Header from "@/components/header";
import styles from "./styles.module.scss";
import Navigation from "../../(components)/navigation";
import { useUserAgent } from "@/tools/user-agent";
import useAuthChecker from "@/tools/auth-checker";

export default function LikesPage() {
  useAuthChecker();
  const { isMobile } = useUserAgent();

  return (
    <main className={styles.main}>
      <Header absolute />
      <Navigation isMobile={isMobile} />
    </main>
  );
}
