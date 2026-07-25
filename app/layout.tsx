import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Note Hub",
  description: "A simple and efficient app for create and organizing your notes.",
  openGraph: {
      title: `Note Hub`,
      description: "A simple and efficient app for create and organizing your notes.",
      url: `https://08-zustand-puce-kappa.vercel.app/`,
      siteName: 'NoteHub',
      images: [
        {
          url: 'notehub.jpg',
          width: 1200,
          height: 630,
          alt: "Note Hub",
        },
      ]
    }
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <TanStackProvider>
          <Header />
          <main>
            {children}
            {modal}
          </main>
          <Footer />
        </TanStackProvider>

      </body>
    </html>
  );
}
