import "@/styles/globals.scss";

import { Footer } from "@/components";
import { DesktopHeader, MobileHeader } from "@/components/header/headers";
import HeaderContainer from "@/components/header/container";

export const metadata = {
  title: process.env.WEBSITE_NAME,
  description: "프론트엔드 초안",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <HeaderContainer>
          <DesktopHeader />
          <MobileHeader />
        </HeaderContainer>
        {children}
        <Footer />
      </body>
    </html>
  );
}
