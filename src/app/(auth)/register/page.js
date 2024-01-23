import Container from "../(components)/container";

import styles from "./styles.module.scss";
import Form from "./(components)/form";
import Link from "next/link";

export const metadata = {
  title: "회원가입",
};

export default function RegisterPage() {
  return (
    <Container>
      <div className={styles.title}>
        <h1>회원가입</h1>
        <p>StockTree에 오신 것을 환영합니다.</p>
      </div>
      <Form />
      <div className={styles.lost}>
        <span>이미 계정이 있으신가요?</span>
        <Link replace className="link" href="/login">로그인</Link>
      </div>
    </Container>
  );
}
