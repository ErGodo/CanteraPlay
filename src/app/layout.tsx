import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
});

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
    <html lang="en">
  <body className={`${roboto.variable} antialiased`} suppressHydrationWarning={true}> 
        {children}
      </body>
    </html>
  );
}
