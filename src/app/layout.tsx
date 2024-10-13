import type { Metadata } from "next";
import localFont from "next/font/local";
import ClientWrapper from "./ClientWrapper";
import Header from "@/components/Header";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
  modal
}: Readonly<{
  children: React.ReactNode;
  modal?: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <main
          className={
            'pt-24 px-5 w-full max-w-xl mx-auto md:px-1.5 md:max-w-[1000px] min-h-[calc(100vh-140px)]'
          }
        >
          {/* RecoilRoot와 같은 클라이언트 상태 관리는 클라이언트 컴포넌트로 이동 */}
          <ClientWrapper>{children}</ClientWrapper>
          {modal}
        </main>
      </body>
    </html>
  );
}

