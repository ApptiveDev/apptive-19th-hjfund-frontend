import Header from "@/components/header";
import Profile from "./(components)/profile";
import CardList from "@/components/card-list";

export default function CreatorIdPage() {
  return (
    <main>
      <Header />
      <Profile />
      <CardList desktopMarginTop={80} mobileMarginTop={50} />
    </main>
  );
}
