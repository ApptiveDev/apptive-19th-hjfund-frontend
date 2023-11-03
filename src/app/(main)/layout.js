import "../globals.css";

import { Header, Footer } from "@/components/common";

export const metadata = {
  title: "했제펀드",
  description: "프론트엔드 초안",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
