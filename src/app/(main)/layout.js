import "@/styles/globals.scss";

import { Footer } from "@/components";
import HeaderInverter from "./(components)/header-inverter";

export const metadata = {
  title: process.env.WEBSITE_NAME,
  description: "프론트엔드 초안",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <HeaderInverter />
        {children}
        <Footer />
      </body>
    </html>
  );
}
