import ClientWrapper from "./ClientWrapper";
import Header from "@/components/Header";
import "./globals.css";

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
            "pt-24 px-5 w-11/12 mx-auto md:px-1.5 md:min-w-[1000px] min-h-[calc(100vh-140px)]"
          }
        >
          <ClientWrapper>{children}</ClientWrapper>
        </main>
      </body>
    </html>
  );
}
