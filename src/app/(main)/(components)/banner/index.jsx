import { useUserAgent } from "@/tools/user-agent";
import styles from "./styles.module.scss";
import Image from "next/image";
import { classes } from "@/tools/classes";
import { conditionalClass } from "@/tools/classes";

const statements = [
  {
    message: "Don't invest in what\nyou don't understand.",
    author: "Warren Buffett",
  },
];

const Statement = () => {
  const { isMobile } = useUserAgent();

  return (
    <div
      className={classes(
        styles.statement,
        conditionalClass(isMobile, styles.mobile)
      )}
    >
      <h1>{statements[0].message}</h1>
      <p>- {statements[0].author} -</p>
    </div>
  );
};

const BannerBackground = () => {
  const { isMobile } = useUserAgent();

  return (
    <div
      className={classes(
        styles.background,
        conditionalClass(isMobile, styles.mobile)
      )}
    >
      <div className={styles.filter}></div>
      <Image
        alt="main-banner-background"
        src="/images/bg/main.jpg"
        srcSet="/images/bg/main@2x.jpg 2x, /images/bg/main@3x.jpg 3x"
        priority
        width={1366}
        height={911}
      />
    </div>
  );
};

const Banner = () => {
  return (
    <>
      <Statement />
      <BannerBackground />
    </>
  );
};

export default Banner;
