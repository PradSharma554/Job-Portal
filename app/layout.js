import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import ClientProvider from "@/components/HOC/ClientProvider";
import { Nav, Footer, ScrollToTop } from "@/paths";

const font = Plus_Jakarta_Sans({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Your Job Portal Name",
  description:
    "Find the best job opportunities across various industries on Your Job Portal Name.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${font.className} flex flex-col min-h-screen`}>
        <ClientProvider>
          <Nav />
          <div className="flex-grow mx-20 my-10 min-h-[calc(100vh-12rem)]">
            {children}
          </div>
          <ScrollToTop />
          <Footer />
        </ClientProvider>
      </body>
    </html>
  );
}
