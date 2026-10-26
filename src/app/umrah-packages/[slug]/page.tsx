import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPackageBySlug, getPackages, FALLBACK_PACKAGES } from "@/lib/db";
import UmrahDetailView from "@/components/UmrahDetailView";

export async function generateStaticParams() {
  try {
    const { packages } = await getPackages({ limit: 100 });
    const umrahPkgs = packages.filter(p => p.category === 'umrah');
    if (umrahPkgs.length > 0) {
      return umrahPkgs.map((pkg) => ({
        slug: pkg.slug,
      }));
    }
  } catch (err) {
    console.warn("generateStaticParams umrah fallback:", err);
  }
  return FALLBACK_PACKAGES.filter(p => p.category === 'umrah').map((pkg) => ({
    slug: pkg.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const pkg = await getPackageBySlug(slug);

  if (!pkg) {
    return {
      title: "Umrah Package | Bin Riaz Elite Travels & Tours",
    };
  }

  const coverUrl = pkg.cover_image?.startsWith("http")
    ? pkg.cover_image
    : `https://binriazelitetravel.com${pkg.cover_image || "/logo.png"}`;

  const desc = pkg.description || pkg.notes
    ? (pkg.description || pkg.notes || "").slice(0, 160)
    : `Book ${pkg.title} (${pkg.duration}, ${pkg.currency} ${pkg.price?.toLocaleString()}) with Bin Riaz Elite Travels & Tours. 5-Star Makkah & Madinah hotels.`;

  return {
    title: `${pkg.title} | Bin Riaz Elite Travels & Tours`,
    description: desc,
    openGraph: {
      title: `${pkg.title} | Bin Riaz Elite Travels & Tours`,
      description: desc,
      url: `https://binriazelitetravel.com/umrah-packages/${pkg.slug}`,
      siteName: "Bin Riaz Elite Travels & Tours",
      images: [
        {
          url: coverUrl,
          width: 1200,
          height: 630,
          alt: pkg.title,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${pkg.title} | Bin Riaz Elite Travels & Tours`,
      description: desc,
      images: [coverUrl],
    },
  };
}

export default async function UmrahPackageDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const pkg = await getPackageBySlug(slug);

  if (!pkg) {
    notFound();
  }

  return <UmrahDetailView initialPackage={pkg} />;
}
