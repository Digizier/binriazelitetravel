"use client";

import React from "react";
import Link from "next/link";
import { Package } from "@/types";
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Building2, 
  Plane, 
  MessageCircle, 
  ChevronRight,
  Sparkles
} from "lucide-react";

interface PackageCardProps {
  packageItem: Package;
  isTourPage?: boolean;
}

export default function PackageCard({ packageItem, isTourPage = false }: PackageCardProps) {
  const isUmrah = packageItem.category === "umrah";
  const detailUrl = isUmrah ? `/umrah-packages/${packageItem.slug}` : `/tours/${packageItem.slug}`;

  // WhatsApp prefilled message
  const waText = encodeURIComponent(
    `Assalam-o-Alaikum Bin Riaz Elite Travel, mujhe "${packageItem.title}" (${packageItem.duration}) ke bare mein details aur current price/availability chahiye.`
  );
  const waUrl = `https://wa.me/923216001913?text=${waText}`;

  // Badge mapping
  const badgeConfig = {
    popular: { text: "Popular", bg: "bg-amber-100 text-amber-800 border-amber-200" },
    "family-favorite": { text: "Family Favorite", bg: "bg-emerald-100 text-emerald-800 border-emerald-200" },
    "best-seller": { text: "Best Seller", bg: "bg-amber-500 text-white border-amber-600" },
    luxury: { text: "VIP Luxury", bg: "bg-slate-900 text-amber-300 border-slate-700" },
    economy: { text: "Budget Saver", bg: "bg-blue-100 text-blue-800 border-blue-200" },
    standard: { text: "Standard", bg: "bg-slate-100 text-slate-700 border-slate-200" },
  };

  const badge = packageItem.package_type && badgeConfig[packageItem.package_type] 
    ? badgeConfig[packageItem.package_type] 
    : null;

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-amber-400/50 transition-all duration-300 flex flex-col justify-between h-full">
      {/* Cover Image Container */}
      <div className="relative aspect-[16/10] sm:aspect-[16/10] overflow-hidden bg-slate-100">
        <img
          src={packageItem.cover_image || "/logo.png"}
          alt={packageItem.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        
        {/* Destination / Category Tag */}
        <div className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 flex items-center gap-1 bg-black/60 backdrop-blur-md text-white text-[10px] sm:text-xs font-medium px-2 py-0.5 rounded-full">
          <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-400 shrink-0" />
          <span className="truncate max-w-[100px] sm:max-w-none">
            {packageItem.departure_city || (isUmrah ? "Saudi Arabia" : "International")}
          </span>
        </div>

        {/* Special Badge */}
        {badge && (
          <div className={`absolute top-2 right-2 sm:top-2.5 sm:right-2.5 text-[9px] sm:text-[11px] font-semibold px-2 py-0.5 rounded-full border shadow-sm ${badge.bg}`}>
            {badge.text}
          </div>
        )}

        {/* Duration Chip on bottom of image */}
        <div className="absolute bottom-2 left-2 sm:bottom-2.5 sm:left-2.5 bg-white/90 backdrop-blur-sm text-slate-800 text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-md flex items-center gap-1">
          <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#064e3b]" />
          <span>{packageItem.duration}</span>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-3 sm:p-4 flex flex-col flex-1 justify-between">
        <div>
          {/* Package Title */}
          <Link href={detailUrl} className="block group-hover:text-[#064e3b] transition-colors">
            <h3 className="font-serif text-sm sm:text-base font-bold text-slate-900 leading-snug line-clamp-2 min-h-[2.5rem]">
              {packageItem.title}
            </h3>
          </Link>

          {/* Quick Specifications (Hotels or Locations) */}
          <div className="mt-2.5 space-y-1 text-[11px] sm:text-xs text-slate-600">
            {isUmrah ? (
              <>
                {packageItem.makkah_hotel && (
                  <div className="flex items-center gap-1.5 truncate">
                    <Building2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span className="font-medium text-slate-800">Makkah:</span>
                    <span className="truncate text-slate-600">{packageItem.makkah_hotel}</span>
                  </div>
                )}
                {packageItem.madinah_hotel && (
                  <div className="flex items-center gap-1.5 truncate">
                    <Building2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="font-medium text-slate-800">Madinah:</span>
                    <span className="truncate text-slate-600">{packageItem.madinah_hotel}</span>
                  </div>
                )}
                {packageItem.airline && (
                  <div className="flex items-center gap-1.5 truncate text-[10px] sm:text-[11px] text-slate-500">
                    <Plane className="w-3 h-3 text-slate-400 shrink-0" />
                    <span className="truncate">{packageItem.airline}</span>
                  </div>
                )}
              </>
            ) : (
              <>
                {packageItem.makkah_hotel && (
                  <div className="flex items-center gap-1.5 truncate">
                    <Building2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span className="truncate">{packageItem.makkah_hotel}</span>
                  </div>
                )}
                {packageItem.departure_date && (
                  <div className="flex items-center gap-1.5 truncate text-slate-500">
                    <Calendar className="w-3 h-3 text-slate-400 shrink-0" />
                    <span>Departure: {packageItem.departure_date}</span>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Pricing & Status */}
        <div className="mt-3 pt-3 border-t border-slate-100">
          <div className="flex items-baseline justify-between mb-2.5">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-medium block">
                Starting from
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-sm sm:text-lg font-bold font-serif text-[#064e3b]">
                  {packageItem.currency} {packageItem.price?.toLocaleString()}
                </span>
                <span className="text-[10px] text-slate-500 font-normal">/ person</span>
              </div>
            </div>

            {/* Status indicator */}
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
              packageItem.status === 'available'
                ? 'bg-emerald-50 text-emerald-700'
                : packageItem.status === 'limited'
                ? 'bg-amber-50 text-amber-700'
                : 'bg-red-50 text-red-600'
            }`}>
              {packageItem.status === 'available' ? 'Available' : packageItem.status === 'limited' ? 'Limited' : 'Sold Out'}
            </span>
          </div>

          {/* Action Buttons: View Details & WhatsApp Inquiry */}
          <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
            <Link
              href={detailUrl}
              className="w-full text-center py-2 px-1 sm:px-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 hover:text-slate-900 transition-colors flex items-center justify-center gap-0.5"
            >
              <span>View Details</span>
              <ChevronRight className="w-3 h-3 text-slate-400" />
            </Link>

            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center py-2 px-1 sm:px-2 rounded-xl text-xs font-semibold text-[#f7e5a9] bg-[#064e3b] hover:bg-[#022c22] shadow-sm hover:shadow transition-all flex items-center justify-center gap-1"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-emerald-400 text-emerald-400 shrink-0" />
              <span className="truncate">Inquire</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
