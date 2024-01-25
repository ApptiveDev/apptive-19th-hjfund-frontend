import "@/styles/globals.scss";

import Footer from "@/components/footer";
import { RecoilRoot } from "@/store";
import { LayerComponents } from "@/components/layer";
import { AuthProvider } from "@/tools/auth-provider";

export const metadata = {
  title: "StockTree",
  description:
    "감사원은 세입·세출의 결산을 매년 검사하여 대통령과 차년도국회에 그 결과를 보고하여야 한다. 모든 국민은 그 보호하는 자녀에게 적어도 초등교육과 법률이 정하는 교육을 받게 할 의무를 진다.",
  openGraph: {
    images: ["/images/etc/og-image.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <RecoilRoot>
      <AuthProvider>
        <html lang="en">
          <body>
            <LayerComponents />
            {children}
            <Footer />
          </body>
        </html>
      </AuthProvider>
    </RecoilRoot>
  );
}
