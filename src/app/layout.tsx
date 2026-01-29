import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-outfit",
  display: "swap",
});

import ClientFixes from "@/components/ClientFixes";

export const metadata: Metadata = {
  title: "..:: Bienvenidos a Avidela Sport ::.. ",
  description: "Powered By CanteraPlay - ADD",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.variable} font-sans antialiased`} suppressHydrationWarning={true}>
        <ClientFixes />
        {children}
      </body>
    </html>
  );
}
