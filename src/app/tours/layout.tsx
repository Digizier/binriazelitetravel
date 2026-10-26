import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "International & Domestic Tours | Bin Riaz Elite Travels & Tours",
  description: "Explore curated international and domestic tour packages (Turkey, Dubai, Malaysia, Thailand, Switzerland, Northern Pakistan) with Bin Riaz Elite Travels.",
  openGraph: {
    title: "International & Domestic Tours | Bin Riaz Elite Travels & Tours",
    description: "Explore curated international and domestic tour packages (Turkey, Dubai, Malaysia, Thailand, Switzerland, Northern Pakistan) with Bin Riaz Elite Travels.",
    url: "https://binriazelitetravel.com/tours",
    siteName: "Bin Riaz Elite Travels & Tours",
    images: [
      {
        url: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Bin Riaz Elite Worldwide Tours",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "International & Domestic Tours | Bin Riaz Elite Travels & Tours",
    description: "Explore curated international and domestic tour packages with Bin Riaz Elite Travels.",
    images: ["https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1200&q=80"],
  },
};

export default function ToursLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
