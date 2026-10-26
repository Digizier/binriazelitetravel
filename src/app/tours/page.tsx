"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Package } from "@/types";
import { getPackages } from "@/lib/db";
import PackageCard from "@/components/PackageCard";
import { 
  Globe, 
  Search, 
  MapPin, 
  Award, 
  Users, 
  Sparkles, 
  Send,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Star
} from "lucide-react";
import { WhatsAppSolidIcon } from "@/components/icons/SocialIcons";

export default function ToursPage() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all-tours");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const pageSize = 8; // Strictly 8 per page

  const filterTabs = [
    { id: "all-tours", label: "All Tours" },
    { id: "family-tours", label: "Family Tours" },
    { id: "honeymoon-packages", label: "Honeymoon Packages" },
    { id: "group-tours", label: "Group Tours" },
    { id: "customized-tours", label: "Customized Tours" },
    { id: "holiday-packages", label: "Holiday Packages" },
  ];

  useEffect(() => {
    async function load() {
      setLoading(true);
      const offset = (currentPage - 1) * pageSize;
      const res = await getPackages({
        category: activeTab === "all-tours" ? "international-tours" : activeTab,
        limit: pageSize,
        offset: offset,
        search: searchQuery
      });

      setPackages(res.packages);
      setTotalCount(res.totalCount);
      setLoading(false);
    }
    load();
  }, [activeTab, currentPage, searchQuery]);

  const totalPages = Math.ceil(totalCount / pageSize) || 1;

  const popularDestinations = [
    { name: "Turkey", image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=500&q=80" },
    { name: "Malaysia", image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=500&q=80" },
    { name: "Dubai", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=500&q=80" },
    { name: "Thailand", image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=500&q=80" },
    { name: "Switzerland", image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=500&q=80" },
    { name: "Singapore", image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=500&q=80" },
  ];

  return (
    <div className="min-h-screen bg-[#fcfbf8]">
      
      {/* ==============================================================
          HERO SECTION (Matching Reference Image 1)
      ============================================================== */}
      <div className="relative py-16 sm:py-24 bg-slate-950 text-white overflow-hidden">
        {/* Eiffel Tower / Paris Sunset background */}
        <div className="absolute inset-0 opacity-40">
          <img
            src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=2000&q=85"
            alt="International Tours Eiffel Tower Sunset"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#022c22] via-[#022c22]/70 to-slate-950/80" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs text-amber-200/80 mb-4">
            <Link href="/" className="hover:underline">Home</Link>
            <span>/</span>
            <Link href="/tours" className="hover:underline">Tours</Link>
            <span>/</span>
            <span className="text-white font-medium">International Tours</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-3">
            International Tours
          </h1>

          <p className="font-serif text-base sm:text-xl text-[#f7e5a9] font-semibold mb-3">
            Explore the World with Bin Riaz Elite Travel & Tours
          </p>

          <p className="text-xs sm:text-sm text-slate-200 max-w-3xl font-light leading-relaxed mb-8">
            Discover breathtaking destinations, create unforgettable memories, and experience the beauty of the world with our carefully planned international tours.
          </p>

          {/* 3 Trust Counters */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-emerald-800/80 max-w-4xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/40 flex items-center justify-center shrink-0">
                <Award className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-white">Trusted Travel Partner</h4>
                <p className="text-[11px] text-emerald-200/80">Your journey, our priority</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/40 flex items-center justify-center shrink-0">
                <Users className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-white">Expert Guidance</h4>
                <p className="text-[11px] text-emerald-200/80">Professional support at every step</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/40 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-white">Memorable Experiences</h4>
                <p className="text-[11px] text-emerald-200/80">Explore • Discover • Enjoy</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ==============================================================
          MAIN CATALOG AREA: Filter Tabs & 8-Items Grid
      ============================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#064e3b]">
            Our International Tour Packages
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-600">
            Handpicked destinations, comfortable stays and memorable experiences — all in one package.
          </p>
        </div>

        {/* Filter Pills matching Reference Image 1 */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setCurrentPage(1); }}
              className={`text-xs font-semibold px-4 py-2 rounded-full transition-all ${
                activeTab === tab.id
                  ? "bg-[#064e3b] text-[#f7e5a9] shadow-md"
                  : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Packages Grid: 4 columns desktop, 2 columns on mobile */}
        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="h-80 rounded-2xl skeleton-shimmer border border-slate-200" />
            ))}
          </div>
        ) : packages.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-md mx-auto">
            <Globe className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="font-serif text-lg font-bold text-slate-800">No tours found</h3>
            <p className="text-xs text-slate-500 mt-1">Please select "All Tours" or clear search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {packages.map((pkg) => (
              <PackageCard key={pkg.id} packageItem={pkg} isTourPage={true} />
            ))}
          </div>
        )}

        {/* Pagination Bar */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12 pt-6 border-t border-slate-200">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-9 h-9 rounded-xl text-xs font-bold transition-all ${
                  currentPage === i + 1
                    ? "bg-[#064e3b] text-[#f7e5a9] shadow-md"
                    : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* ==============================================================
          WHY CHOOSE OUR INTERNATIONAL TOURS
      ============================================================== */}
      <section className="py-12 sm:py-16 bg-[#f4f1ea] border-y border-amber-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#064e3b]">
              Why Choose Our International Tours?
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-600">
              We go beyond booking — we create experiences that last a lifetime.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 text-center">
              <Globe className="w-8 h-8 text-[#d4af37] mx-auto mb-2" />
              <h3 className="font-serif text-sm font-bold text-slate-900">Curated Destinations</h3>
              <p className="text-[11px] text-slate-500 mt-1">The world's best places handpicked</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 text-center">
              <Award className="w-8 h-8 text-[#d4af37] mx-auto mb-2" />
              <h3 className="font-serif text-sm font-bold text-slate-900">Comfortable Stays</h3>
              <p className="text-[11px] text-slate-500 mt-1">Quality hotels & verified resorts</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 text-center">
              <ShieldCheck className="w-8 h-8 text-[#d4af37] mx-auto mb-2" />
              <h3 className="font-serif text-sm font-bold text-slate-900">Safe & Reliable Travel</h3>
              <p className="text-[11px] text-slate-500 mt-1">Your safety matters above all</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 text-center">
              <Users className="w-8 h-8 text-[#d4af37] mx-auto mb-2" />
              <h3 className="font-serif text-sm font-bold text-slate-900">Dedicated Support</h3>
              <p className="text-[11px] text-slate-500 mt-1">Before & during your international trip</p>
            </div>
          </div>
        </div>
      </section>

      {/* ==============================================================
          READY TO EXPLORE THE WORLD? (Green CTA Bar)
      ============================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-[#064e3b] rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row justify-between items-center gap-6 shadow-xl">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-12 h-12 rounded-2xl bg-emerald-800/80 border border-emerald-600/50 flex items-center justify-center shrink-0 hidden sm:flex">
              <Globe className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                Ready to Explore the World?
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100/90 mt-1">
                Get in touch with our travel experts and plan your next international adventure.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/inquiry"
              className="px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold bg-[#f7e5a9] text-[#022c22] hover:bg-amber-200 transition-colors shadow"
            >
              Send Inquiry
            </Link>

            <a
              href="https://wa.me/923216001913?text=Assalam-o-Alaikum%20Bin%20Riaz%20Elite%20Travel%2C%20I%20would%20like%20to%20plan%20an%20international%20tour."
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold bg-[#25D366] hover:bg-[#1EBE5D] text-white flex items-center gap-2 shadow"
            >
              <WhatsAppSolidIcon size={16} className="text-white" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </div>

    </div>
  );
}
