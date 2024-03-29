import Header from "@/components/header";
import styles from "./styles.module.scss";
import Navigation from "../../(components)/navigation";
import { EmailVerificationBanner, HelloBanner, PasswordChangeConfirmBanner } from "./(components)/banners";
import Profile from "./(components)/profile";
import Security from "./(components)/security";
import Link from "next/link";
import { classes } from "@/tools/classes";
import { useUserAgent } from "@/tools/user-agent";
import { conditionalClass } from "@/tools/classes";
import useAuthChecker from "@/tools/auth-checker";

export default function AccountPage({ searchParams }) {
  useAuthChecker();

  const { isMobile } = useUserAgent();
  const { new: newUser, password } = searchParams;

  return (
    <main className={styles.main}>
      <Header absolute />
      <Navigation isMobile={isMobile} />
      <div
        className={classes(
          styles.body,
          conditionalClass(isMobile, styles.mobile)
        )}
      >
        <div className={styles.banners}>
          {newUser && <HelloBanner />}
          {password && <PasswordChangeConfirmBanner />}
          <EmailVerificationBanner />
        </div>
        <Profile isMobile={isMobile} />
        <hr className={styles.hr} />
        <Security isMobile={isMobile} />
        <Link
          className={classes(
            "link",
            styles.remove,
            conditionalClass(isMobile, styles.mobile)
          )}
          href="/my/account/remove"
        >
          회원탈퇴
        </Link>
      </div>
    </main>
  );
}
