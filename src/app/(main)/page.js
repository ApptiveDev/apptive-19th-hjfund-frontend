import Banner from "./(components)/banner";
import CardList from "./(components)/card-list";
import Indexes from "./(components)/indexes";
import styles from "./styles.module.scss";

export default function Home() {
  return (
    <main className={styles.page}>
      <Banner />
      <CardList />
      <Indexes />
    </main>
  );
}
