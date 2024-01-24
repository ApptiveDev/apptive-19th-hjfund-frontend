import Container from "../../../(components)/container";

import styles from "./styles.module.scss";
import Form from "./(components)/form";

export const metadata = {
  title: "회원 탈퇴",
};

export default function LoginPage() {
  return (
    <Container>
      <div className={styles.title}>
        <h1>회원 탈퇴</h1>
      </div>
      <Form />
    </Container>
  );
}
