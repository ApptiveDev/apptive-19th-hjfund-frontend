import { useUserAgent } from "@/tools/user-agent";
import styles from "./styles.module.scss";
import Image from "next/image";

const statements = [
  {
    message: "Don't invest in what\nyou don't understand.",
    author: "Warren Buffett"
  }
]

const Statement = () => {
  const { isMobile } = useUserAgent();

  return (
    <div className={[styles.statement, isMobile ? styles.mobile : ""].join(" ")}>
      <h1>{statements[0].message}</h1>
      <p>- {statements[0].author} -</p>
    </div>
  );

}

const BannerBackground = () => {
  const { isMobile } = useUserAgent();

  return (
    <div className={[styles.background, isMobile ? styles.mobile : ""].join(" ")}>
      <div className={styles.filter}></div>
      <Image
        alt="main-banner-background"
        src="/images/bg/main.jpg"
        srcSet="/images/bg/main@2x.jpg 2x, /images/bg/main@3x.jpg 3x"
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
  )
}

export default Banner;