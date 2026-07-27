import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "@/components/common/Footer";
import { DynamicPagesList } from "@/components/dynamic-content-page/DynamicPagesList";
import SmoothScroll from "@/components/layout/SmoothScroll";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });
// 
// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// Geist Local Fonts
const geistLight = localFont({
  src: "../public/assets/fonts/Geist-Light.ttf",
  variable: "--font-geist-light",
});

const geistRegular = localFont({
  src: "../public/assets/fonts/Geist-Regular.ttf",
  variable: "--font-geist-regular",
});

const geistMedium = localFont({
  src: "../public/assets/fonts/Geist-Medium.ttf",
  variable: "--font-geist-medium",
});

const geistSemiBold = localFont({
  src: "../public/assets/fonts/Geist-SemiBold.ttf",
  variable: "--font-geist-semibold",
});

const geistBold = localFont({
  src: "../public/assets/fonts/Geist-Bold.ttf",
  variable: "--font-geist-bold",
});

// Geist Mono Local Fonts
const geistMonoLight = localFont({
  src: "../public/assets/fonts/GeistMono-Light.ttf",
  variable: "--font-geist-mono-light",
});

const geistMonoRegular = localFont({
  src: "../public/assets/fonts/GeistMono-Regular.ttf",
  variable: "--font-geist-mono-regular",
});

const geistMonoMedium = localFont({
  src: "../public/assets/fonts/GeistMono-Medium.ttf",
  variable: "--font-geist-mono-medium",
});

const geistMonoSemiBold = localFont({
  src: "../public/assets/fonts/GeistMono-SemiBold.ttf",
  variable: "--font-geist-mono-semibold",
});

const geistMonoBold = localFont({
  src: "../public/assets/fonts/GeistMono-Bold.ttf",
  variable: "--font-geist-mono-bold",
});

export const metadata: Metadata = {
  title: "Legal Savvy",
  description: "Legal Savvy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistLight.variable} ${geistRegular.variable} ${geistMedium.variable} ${geistSemiBold.variable} ${geistBold.variable} ${geistMonoLight.variable} ${geistMonoRegular.variable} ${geistMonoMedium.variable} ${geistMonoSemiBold.variable} ${geistMonoBold.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SmoothScroll />
        {children}
        <Footer />
        <DynamicPagesList />
      </body>
    </html>
  );
}
