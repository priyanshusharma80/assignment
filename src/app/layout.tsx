import "./globals.css";
import { ReactNode } from "react";
import Header from "@/components/Header";
import Tabs from "@/components/Options";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="flex justify-between items-center flex-col font-circular bg-gradient-to-b from-gray-50 via-gray-100 to-gray-50 text-gray-800">
        {/* Header and Tabs */}
        <div className="main-container bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Header />
            <Tabs />
          </div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</div>
      </body>
    </html>
  );
}
