import Header from "@/components/header";
import CardList from "./(components)/card-list";
import Navigation from "./(components)/navigation";
import { useUserAgent } from "@/tools/user-agent";

export default function ReportPage() {
  const { isMobile } = useUserAgent();

  return (
    <main>
      <Header absolute />
      <Navigation isMobile={isMobile} />
      <CardList />
    </main>
  )
}