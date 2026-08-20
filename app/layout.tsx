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
  title: "دعوة زفاف | أحمد و أريج",
  description: "يسرنا دعوتكم لحضور حفل زفافنا. شاركونا فرحتنا!",
  openGraph: {
    title: "دعوة زفاف | محمد وسهيلة",
    description: "يسرنا دعوتكم لحضور حفل زفافنا. شاركونا فرحتنا!",
    locale: "ar_EG",
    type: "website",
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
