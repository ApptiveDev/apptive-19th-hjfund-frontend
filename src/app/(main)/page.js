import Header from "@/components/header";
import Banner from "./(components)/banner";
import Indexes from "./(components)/indexes";
import CardList from "@/components/card-list";

export default function MainPage() {
  return (
    <main>
      <Header invert/>
      <Banner />
      <CardList desktopMarginTop={350} mobileMarginTop={330} />
      <Indexes />
    </main>
  );
}
