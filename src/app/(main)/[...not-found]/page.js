import Header from "@/components/header";
import styles from "./styles.module.scss";
import Buttons from "./components";

export default function NotFound() {
  return (
    <>
      <main className={styles.container}>
        <Header />
        <img
          src="/images/illustration/undraw_page_not_found_re_e9o6.svg"
          width={860.13137}
          height={571.14799}
        />
        <h1>404 - 페이지를 찾을 수 없음.</h1>
        <p>
          주소를 잘못 입력하셨거나, 페이지가 이동되었거나 삭제되었습니다.
          <br />
          주소를 다시 한 번 확인해 보십시오.
        </p>
        <Buttons />
      </main>
    </>
  );
}
