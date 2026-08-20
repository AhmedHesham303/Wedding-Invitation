// app/layout.js
import { Amiri, Cairo } from "next/font/google";
import "./globals.css";
import type { ReactNode } from "react";

const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-amiri",
});

const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["400", "600", "700"],
  variable: "--font-cairo",
});

export const metadata = {
  title: "عقد قران | أحمد و أريچ",
  description: "يسرنا دعوتكم لحضور حفل زفافنا. شاركونا فرحتنا!",
  openGraph: {
    title: "عقد قران | أحمد و أريچ",
    description: "يسرنا دعوتكم لحضور عقد قراننا ، شاركونا فرحتنا !",
    locale: "ar_EG",
    type: "website",
  },
  icons: {
    icon: "/masjed.webp",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={`${amiri.variable} ${cairo.variable}`}>
      <body className="bg-background text-foreground font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
