import { Header, Footer, Navigation } from "@/components/pages/my";

import "@/app/globals.css";
import "./group.scss";

export const metadata = {
  title: "마이페이지",
  description: "마이페이지",
};

export default function Layout({ children }) {
  return (
    <html lang="ko">
      <body>
        <Header />
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
