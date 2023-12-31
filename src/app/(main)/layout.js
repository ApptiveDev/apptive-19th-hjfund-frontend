import "../globals.css";

import { Header, Footer } from "@/components";

export const metadata = {
  title: process.env.WEBSITE_NAME,
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
