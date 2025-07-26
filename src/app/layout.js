import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import Providers from "@/components/Providers";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata = {
  title: "Animator| Portfolio",
  description: "3D Artist • Full-Stack Developer • Animator",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="overflow-x-hidden  bg-white text-gray-900 antialiased">
        <Providers>
          <div className=" w-full flex flex-col">
            <Header />
            <main className="flex-grow w-full max-w-6xl mx-auto px-4 py-8  animate-appear">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
