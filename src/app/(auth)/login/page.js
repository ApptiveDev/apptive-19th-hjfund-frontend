import Container from "../(components)/container";

import styles from "./styles.module.scss";
import Form from "./(components)/form";
import More from "./(components)/more";
import Link from "next/link";

export const metadata = {
  title: "로그인",
};

export default function LoginPage() {
  return (
    <Container>
      <div className={styles.title}>
        <h1>로그인</h1>
        <p>StockTree의 다양한 컨텐츠를 만나보세요.</p>
      </div>
      <Form />
      <More />
      <div className={styles.lost}>
        <span>비밀번호를 잊으셨나요?</span>
        <Link className="link" href="/find">비밀번호 찾기</Link>
      </div>
    </Container>
  );
}
