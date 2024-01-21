import "@/styles/globals.scss";

import Footer from "@/components/footer";
import { RecoilRoot } from "@/store";
import { LayerComponents } from "@/components/layer";

export const metadata = {
  title: process.env.WEBSITE_NAME,
  description: "프론트엔드 초안",
};

export default function RootLayout({ children }) {
  return (
    <RecoilRoot>
      <html lang="en">
        <body>
          <LayerComponents />
          {children}
          <Footer />
        </body>
      </html>
    </RecoilRoot>
  );
}
