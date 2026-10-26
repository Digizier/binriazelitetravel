"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Package } from "@/types";
import { getPackages } from "@/lib/db";
import PackageCard from "@/components/PackageCard";
import { Moon, Search, SlidersHorizontal, ChevronLeft, ChevronRight } from "lucide-react";

export default function UmrahPackagesPage() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const pageSize = 8; // Strictly 8 products per page as required

  useEffect(() => {
    async function load() {
      setLoading(true);
      const offset = (currentPage - 1) * pageSize;
      const res = await getPackages({
        category: "umrah",
        limit: pageSize,
        offset: offset,
        search: searchQuery
      });

      let items = res.packages;
      if (selectedFilter !== "all") {
        items = items.filter(p => p.package_type === selectedFilter);
      }

      setPackages(items);
      setTotalCount(res.totalCount);
      setLoading(false);
    }
    load();
  }, [currentPage, searchQuery, selectedFilter]);

  const totalPages = Math.ceil(totalCount / pageSize) || 1;

  return (
    <div className="min-h-screen bg-[#fcfbf8]">
      {/* Page Hero */}
      <div className="relative py-14 sm:py-20 bg-[#022c22] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=1800&q=80"
            alt="Makkah Holy Kaaba"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-1.5 bg-[#d4af37]/20 border border-[#d4af37]/40 px-3 py-1 rounded-full text-xs font-semibold text-amber-200 mb-3">
            <Moon className="w-3.5 h-3.5" />
            <span>Spiritual Journeys 2026</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white mb-3">
            Umrah Packages
          </h1>
          <p className="text-xs sm:text-base text-emerald-100/90 max-w-2xl mx-auto font-light">
            Browse our handpicked 5-Star, 4-Star, Economy, and Family Umrah packages with Haram-front luxury stays and guaranteed flights.
          </p>
        </div>
      </div>

      {/* Main Catalog Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Search & Filter Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {[
              { id: "all", label: "All Packages" },
              { id: "popular", label: "Popular" },
              { id: "family-favorite", label: "Family Favorite" },
              { id: "luxury", label: "5★ Luxury" },
              { id: "economy", label: "Economy" },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => { setSelectedFilter(f.id); setCurrentPage(1); }}
                className={`text-xs font-semibold px-4 py-2 rounded-full transition-all ${
                  selectedFilter === f.id
                    ? "bg-[#064e3b] text-[#f7e5a9] shadow"
                    : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Search Input (Hinglish/Phonetic friendly) */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              placeholder="Search package, hotel, airline..."
              className="w-full pl-9 pr-4 py-2 text-xs rounded-full border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#064e3b]"
            />
          </div>
        </div>

        {/* Packages Grid: strictly 2 columns on mobile, 4 columns on desktop */}
        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="h-80 rounded-2xl skeleton-shimmer border border-slate-200" />
            ))}
          </div>
        ) : packages.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-md mx-auto">
            <Moon className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="font-serif text-lg font-bold text-slate-800">No packages found</h3>
            <p className="text-xs text-slate-500 mt-1">Try selecting a different filter or clearing search.</p>
            <button
              onClick={() => { setSelectedFilter("all"); setSearchQuery(""); }}
              className="mt-4 px-4 py-2 bg-[#064e3b] text-[#f7e5a9] text-xs font-semibold rounded-full"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {packages.map((pkg) => (
              <PackageCard key={pkg.id} packageItem={pkg} />
            ))}
          </div>
        )}

        {/* Pagination Bar (Strictly 8 items per page) */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12 pt-6 border-t border-slate-200">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40"
              aria-label="Previous Page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {[...Array(totalPages)].map((_, i) => {
              const pageNum = i + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-9 h-9 rounded-xl text-xs font-bold transition-all ${
                    currentPage === pageNum
                      ? "bg-[#064e3b] text-[#f7e5a9] shadow-md"
                      : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40"
              aria-label="Next Page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
