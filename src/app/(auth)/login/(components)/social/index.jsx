import styles from "./styles.module.scss";
import Button from "@/components/button";

import KakaoLogo from "./svg/kakao.svg";
import NaverLogo from "./svg/naver.svg";
import GoogleLogo from "./svg/google.svg";
import { classes } from "@/tools/classes";

export const Kakao = () => (
  <Button className={classes(styles.button, styles.kakao)}>
    <KakaoLogo />
  </Button>
);

export const Naver = () => (
  <Button className={classes(styles.button, styles.naver)}>
    <NaverLogo />
  </Button>
);

export const Google = () => (
  <Button className={styles.button} buttonStyle="outlined">
    <GoogleLogo />
  </Button>
);
