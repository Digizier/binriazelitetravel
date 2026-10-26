import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Umrah Packages 2026 | Bin Riaz Elite Travels & Tours",
  description: "Browse 5-star luxury, executive, family, and economy Umrah packages from Pakistan with Bin Riaz Elite Travels. Direct airline tickets, visa, and luxury hotels near Haram.",
  openGraph: {
    title: "All Umrah Packages 2026 | Bin Riaz Elite Travels & Tours",
    description: "Browse 5-star luxury, executive, family, and economy Umrah packages from Pakistan with Bin Riaz Elite Travels. Direct airline tickets, visa, and luxury hotels near Haram.",
    url: "https://binriazelitetravel.com/umrah-packages",
    siteName: "Bin Riaz Elite Travels & Tours",
    images: [
      {
        url: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Bin Riaz Elite Umrah Packages",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "All Umrah Packages 2026 | Bin Riaz Elite Travels & Tours",
    description: "Browse 5-star luxury, executive, family, and economy Umrah packages from Pakistan.",
    images: ["https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=1200&q=80"],
  },
};

export default function UmrahPackagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
