import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import ScrollToTop from "@/components/ScrollToTop";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#022c22",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://binriazelitetravel.com"),
  title: "Bin Riaz Elite Travels & Tours | Umrah Packages & Worldwide Tours",
  description: "Official portal of Bin Riaz Elite Travels & Tours (A brand by Bin Riaz Group of Companies). Premium Umrah packages, Hajj facilitation, International & Domestic Tours, Visa services, and Air ticketing.",
  keywords: [
    "Bin Riaz Elite Travel",
    "Umrah Packages Pakistan",
    "Umrah Packages Sargodha",
    "Umrah Travel Agency Pakistan",
    "Umrah Visa Pakistan",
    "International Tours Pakistan",
    "Dubai Tour Package",
    "Turkey Tour Package",
    "Malik Amir Riaz"
  ],
  authors: [{ name: "Bin Riaz Group of Companies" }],
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/icon.png",
  },
  openGraph: {
    title: "Bin Riaz Elite Travels & Tours | Sacred Journeys, Lasting Memories",
    description: "Your trusted partner for 5-star & budget Umrah packages, worldwide tours, visas, and flight booking.",
    url: "https://binriazelitetravel.com",
    siteName: "Bin Riaz Elite Travels & Tours",
    images: [
      {
        url: "https://binriazelitetravel.com/logo.png",
        width: 800,
        height: 800,
        alt: "Bin Riaz Elite Travels and Tours Emblem",
      },
    ],
    locale: "en_PK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bin Riaz Elite Travels & Tours | Sacred Journeys, Lasting Memories",
    description: "Your trusted partner for 5-star & budget Umrah packages, worldwide tours, visas, and flight booking.",
    images: ["https://binriazelitetravel.com/logo.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full antialiased">
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-[#fcfbf8] text-slate-900 overflow-x-hidden selection:bg-[#d4af37] selection:text-[#022c22]">
        <ScrollToTop />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <MobileBottomNav />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
