import { Card } from "@/components";
import Banner from "./(components)/banner";
import CardList from "./(components)/card-list";
import Indexes from "./(components)/indexes";

export default function MainPage() {
  return (
    <div>
      <Banner />
      <CardList />
      <Indexes />
    </div>
  );
}