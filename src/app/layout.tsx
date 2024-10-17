"use client";

import ClientWrapper from "./ClientWrapper";
import Header from "@/components/Header";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main
          className={
            "pt-24 px-5 w-10/12 mx-auto md:px-1.5 md:min-w-[1000px] min-h-[calc(100vh-140px)]"
          }
        >
          <ClientWrapper>{children}</ClientWrapper>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
          />
        </main>
      </body>
    </html>
  );
}
