import Header from "@/components/header";
import Navigation from "./(components)/navigation";
import CardList from "./(components)/card-list";
import { useUserAgent } from "@/tools/user-agent";


export default function ReportPage({ searchParams }) {
  const { isMobile } = useUserAgent();

  return (
    <main>
      <Header absolute />
      <Navigation order={searchParams.order} isMobile={isMobile} />
      <CardList />
    </main>
  );
}