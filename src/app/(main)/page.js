import { Card } from "@/components";
import Banner from "./(components)/banner";
import CardList from "./(components)/card-list";
import Indexes from "./(components)/indexes";
import styles from "./styles.module.scss";

export default function MainPage() {
  return (
    <div className={styles.container}>
      <Banner />
      <CardList />
      <Indexes />
    </div>
  );
}