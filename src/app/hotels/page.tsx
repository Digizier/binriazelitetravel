import React from "react";
import Link from "next/link";
import { Building2, MapPin, Star, MessageCircle, ShieldCheck } from "lucide-react";

export default function HotelsPage() {
  const hotels = [
    {
      name: "Swissotel Makkah (5★ Luxury)",
      city: "Makkah Mukarramah",
      distance: "50m from Clock Tower / Direct Haram access",
      rating: 5,
      image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=800&q=80",
      features: ["Haram View Rooms Available", "Direct Elevator to Courtyard", "Buffet Breakfast", "Free High-Speed Wi-Fi"],
      priceRange: "Starting from PKR 45,000 / night"
    },
    {
      name: "Dar Al Taqwa Hotel (5★)",
      city: "Madinah Munawwarah",
      distance: "Front Row Ladies & Gents Gate / Masjid Nabawi",
      rating: 5,
      image: "https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?auto=format&fit=crop&w=800&q=80",
      features: ["Direct Courtyard Access", "24/7 Concierge", "Tea Lounge", "Family Suites"],
      priceRange: "Starting from PKR 50,000 / night"
    },
    {
      name: "Voco Makkah (4★ Premium)",
      city: "Makkah Mukarramah",
      distance: "300m Shuttle Service to Haram",
      rating: 4,
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80",
      features: ["24/7 Dedicated Bus Service", "Spacious Modern Rooms", "On-site Dining", "Luggage Storage"],
      priceRange: "Starting from PKR 22,000 / night"
    },
    {
      name: "Emaar Elite Madinah (4★)",
      city: "Madinah Munawwarah",
      distance: "250m from Central Northern Markazia",
      rating: 4,
      image: "https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?auto=format&fit=crop&w=800&q=80",
      features: ["Walking Distance to Haram", "Near Shopping & Restaurants", "Quad & Triple Room Options"],
      priceRange: "Starting from PKR 24,000 / night"
    }
  ];

  return (
    <div className="min-h-screen bg-[#fcfbf8] pb-16">
      <div className="py-14 sm:py-20 bg-[#022c22] text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <span className="text-xs font-semibold text-amber-300 uppercase tracking-widest block mb-2">
            Makkah & Madinah Accommodations
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white mb-4">
            Hotel Booking & Reservations
          </h1>
          <p className="text-xs sm:text-base text-emerald-100/90 font-light max-w-2xl mx-auto">
            Book confirmed rooms in premier Haram-front and Markazia hotels in Makkah Mukarramah and Madinah Munawwarah with direct verification.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {hotels.map((h) => (
            <div key={h.name} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm flex flex-col justify-between group hover:shadow-lg transition-all">
              <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
                <img
                  src={h.image}
                  alt={h.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>{h.city}</span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-2">
                    {[...Array(h.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>

                  <h3 className="font-serif text-lg font-bold text-slate-900 mb-1">
                    {h.name}
                  </h3>

                  <p className="text-xs text-emerald-700 font-semibold mb-3 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{h.distance}</span>
                  </p>

                  <ul className="space-y-1 text-xs text-slate-600 mb-4">
                    {h.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#064e3b]">
                    {h.priceRange}
                  </span>

                  <a
                    href={`https://wa.me/923216001913?text=${encodeURIComponent(`Assalam-o-Alaikum, I want to book room in ${h.name} (${h.city}).`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-[#064e3b] text-[#f7e5a9] text-xs font-semibold rounded-xl flex items-center gap-1.5 hover:bg-[#022c22]"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-emerald-400" />
                    <span>Inquire Rates</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
