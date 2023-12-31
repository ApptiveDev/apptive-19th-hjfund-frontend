import Header from "@/components/header";
import Banner from "./(components)/banner";
import CardList from "./(components)/card-list";
import Indexes from "./(components)/indexes";

export default function MainPage() {
  return (
    <div>
      <Header invert/>
      <Banner />
      <CardList />
      <Indexes />
    </div>
  );
}
