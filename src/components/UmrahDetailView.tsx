"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Package } from "@/types";
import { getPackageBySlug } from "@/lib/db";
import { 
  Building2, 
  MapPin, 
  Calendar, 
  Plane, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  PhoneCall, 
  ShieldCheck, 
  Sparkles,
  ArrowLeft,
  ChevronRight
} from "lucide-react";
import { WhatsAppSolidIcon } from "@/components/icons/SocialIcons";

interface UmrahDetailViewProps {
  initialPackage: Package;
}

export default function UmrahDetailView({ initialPackage }: UmrahDetailViewProps) {
  const [pkg, setPkg] = useState<Package>(initialPackage);
  const [activeImage, setActiveImage] = useState<string>(initialPackage.cover_image);

  // Real-time synchronization with Supabase
  useEffect(() => {
    let isMounted = true;
    async function fetchLivePackage() {
      try {
        const live = await getPackageBySlug(initialPackage.slug);
        if (live && isMounted) {
          setPkg(live);
          if (!activeImage || activeImage === initialPackage.cover_image) {
            setActiveImage(live.cover_image);
          }
        }
      } catch (err) {
        console.error("Error updating live package data:", err);
      }
    }

    fetchLivePackage();

    const handleUpdate = () => fetchLivePackage();
    window.addEventListener("kb_packages_updated", handleUpdate);
    return () => {
      isMounted = false;
      window.removeEventListener("kb_packages_updated", handleUpdate);
    };
  }, [initialPackage.slug]);

  const waText = encodeURIComponent(
    `Assalam-o-Alaikum Bin Riaz Elite Travel, mujhe Umrah Package "${pkg.title}" (${pkg.duration}, Price: ${pkg.currency} ${pkg.price?.toLocaleString()}) ke bare mein direct details chahiye. Please seat availability confirm kar dein.`
  );
  const waUrl = `https://wa.me/923216001913?text=${waText}`;

  const allImages = Array.from(new Set([pkg.cover_image, ...(pkg.gallery_urls || [])])).filter(Boolean);

  return (
    <div className="min-h-screen bg-[#fcfbf8] pb-16">
      {/* Top Breadcrumb & Return Bar */}
      <div className="bg-[#022c22] text-white py-4 border-b border-emerald-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs">
          <Link href="/umrah-packages" className="inline-flex items-center gap-1.5 text-amber-300 hover:underline">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Umrah Packages</span>
          </Link>
          <span className="text-emerald-300/80 hidden sm:inline">Bin Riaz Elite Verified Umrah Package</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Main Grid: 8 Columns Details, 4 Columns Sticky Booking Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Details (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-xs font-bold px-3 py-1 bg-emerald-100 text-[#064e3b] rounded-full">
                  {pkg.duration}
                </span>
                <span className="text-xs font-semibold px-3 py-1 bg-amber-100 text-[#996515] rounded-full">
                  Status: {pkg.status === 'available' ? 'Available' : pkg.status === 'limited' ? 'Limited Seats' : 'Sold Out'}
                </span>
                {pkg.departure_city && (
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-600" />
                    Departure from {pkg.departure_city}
                  </span>
                )}
              </div>

              <h1 className="font-serif text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                {pkg.title}
              </h1>
            </div>

            {/* Main Cover & Gallery Viewer */}
            <div className="space-y-3">
              <div className="rounded-3xl overflow-hidden aspect-[16/9] bg-slate-100 shadow-md border border-slate-200">
                <img
                  src={activeImage || pkg.cover_image || "/logo.png"}
                  alt={pkg.title}
                  className="w-full h-full object-cover transition-all duration-300"
                />
              </div>

              {/* Gallery Thumbnails if multiple images exist */}
              {allImages.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                  {allImages.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImage(img)}
                      className={`relative w-20 h-14 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                        activeImage === img ? "border-[#064e3b] ring-2 ring-emerald-400" : "border-slate-200 opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Hotels Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pkg.makkah_hotel && (
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Makkah Mukarramah Hotel</span>
                    <h3 className="font-serif text-base font-bold text-slate-900">{pkg.makkah_hotel}</h3>
                    <p className="text-xs text-amber-700 font-semibold mt-0.5">{pkg.makkah_distance || "Near Haram Courtyard"}</p>
                  </div>
                </div>
              )}

              {pkg.madinah_hotel && (
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Madinah Munawwarah Hotel</span>
                    <h3 className="font-serif text-base font-bold text-slate-900">{pkg.madinah_hotel}</h3>
                    <p className="text-xs text-emerald-700 font-semibold mt-0.5">{pkg.madinah_distance || "Near Masjid Nabawi"}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Flight Details */}
            {pkg.airline && (
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Plane className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Flight & Airline</span>
                    <h4 className="text-sm font-bold text-slate-900">{pkg.airline}</h4>
                    {pkg.flight_number && <p className="text-xs text-slate-500">Flight No: {pkg.flight_number}</p>}
                  </div>
                </div>
                {pkg.departure_date && (
                  <div className="text-xs text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
                    <span className="font-semibold text-slate-800">Departure:</span> {pkg.departure_date}
                  </div>
                )}
              </div>
            )}

            {/* Inclusions & Exclusions */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="font-serif text-lg font-bold text-slate-900 mb-6">
                Package Inclusions & Exclusions
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1.5 mb-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    What is Included
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                    {(pkg.inclusions && pkg.inclusions.length > 0 ? pkg.inclusions : [
                      "Return Air Ticket",
                      "Umrah Electronic Visa Processing",
                      "Confirmed Makkah & Madinah Hotel Accommodation",
                      "Complete Air-Conditioned Intercity Transport",
                      "Guided Historical Ziyarat in Makkah & Madinah"
                    ]).map((inc, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-red-600 flex items-center gap-1.5 mb-3">
                    <XCircle className="w-4 h-4 text-red-500" />
                    What is Excluded
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                    {(pkg.exclusions && pkg.exclusions.length > 0 ? pkg.exclusions : [
                      "Personal expenses and shopping",
                      "Room service food & beverages outside package",
                      "Excess baggage charges over airline limit"
                    ]).map((exc, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <XCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                        <span>{exc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* IMPORTANT NOTES & TERMS (Live Real-Time from Supabase) */}
            <div className="bg-amber-50/70 border border-amber-200 p-6 rounded-2xl">
              <h4 className="font-serif text-sm font-bold text-[#996515] mb-2 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                Important Notes & Terms
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line">
                {pkg.notes && pkg.notes.trim() ? pkg.notes : "Hotel check-in and check-out timings follow Saudi standard regulations (Check-in 4:00 PM, Check-out 12:00 PM). Package price is subject to airline ticket availability and currency exchange fluctuations at the time of final confirmation."}
              </p>
            </div>
          </div>

          {/* Right Sticky Booking Card (4 cols) */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-xl space-y-6">
              <div className="border-b border-slate-100 pb-5">
                <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block">
                  Package Price
                </span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-2xl sm:text-3xl font-serif font-extrabold text-[#064e3b]">
                    {pkg.currency} {pkg.price?.toLocaleString()}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">/ per person</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Room category: {pkg.room_types || "Quad / Triple / Double / Sharing"}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 bg-[#064e3b] hover:bg-[#022c22] text-[#f7e5a9] font-bold text-sm rounded-2xl shadow-lg shadow-emerald-950/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  <WhatsAppSolidIcon size={20} className="text-[#25D366]" />
                  <span>Inquire on WhatsApp</span>
                </a>

                <Link
                  href={`/inquiry?package=${encodeURIComponent(pkg.title)}`}
                  className="w-full py-3 bg-amber-50 hover:bg-amber-100 text-[#996515] border border-amber-200 font-bold text-sm rounded-2xl transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Submit Custom Requirement</span>
                </Link>
              </div>

              <div className="pt-4 border-t border-slate-100 text-center space-y-1">
                <p className="text-[11px] text-slate-500">Need immediate assistance?</p>
                <a
                  href="tel:03216001913"
                  className="text-xs font-bold text-[#064e3b] hover:underline flex items-center justify-center gap-1.5"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-amber-600" />
                  <span>Call Malik Amir Riaz: 0321-6001913</span>
                </a>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2 text-[11px] text-slate-600">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Verified Saudi MoFA Registered Visas</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>Official Bin Riaz Group of Companies</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
