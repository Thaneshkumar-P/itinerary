import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// const montserrat = localFont({
//   src: "./fonts/Montserrat-VariableFont_wght.ttf",
//   variable: "--font-montserrat",
//   // weight: "100 900"
// })

const montserrat = localFont({ src: './fonts/Montserrat-VariableFont_wght.ttf' })


export const metadata: Metadata = {
  title: "Yaadigo - Itinerary",
  description: "Yaadigo itinerary builder application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.className}`}
      >
        {children}
      </body>
    </html>
  );
}
