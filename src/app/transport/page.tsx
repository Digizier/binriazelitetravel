import React from "react";
import Link from "next/link";
import { Bus, MapPin, ShieldCheck, CheckCircle2 } from "lucide-react";
import { WhatsAppSolidIcon } from "@/components/icons/SocialIcons";

export default function TransportServicesPage() {
  const routes = [
    {
      title: "Jeddah Airport ➔ Makkah Hotel",
      desc: "Direct private arrival transfer from King Abdulaziz International Airport (JED) straight to your Makkah hotel door.",
      vehicles: "Private GMC Yukon, Toyota Camry, Hiace or Coaster"
    },
    {
      title: "Makkah ➔ Madinah Intercity Transfer",
      desc: "Comfortable highway journey with rest stops or high-speed Haramain Bullet Train ticket bookings.",
      vehicles: "Private AC Vehicle or High-Speed Bullet Train"
    },
    {
      title: "Makkah Mukarramah Historical Ziyarat",
      desc: "Guided spiritual visits to Jabal al-Nour (Ghar-e-Hira), Ghar-e-Thawr, Mina, Muzdalifah, Arafat and Jannat al-Mu'alla.",
      vehicles: "Private AC Vehicle with knowledgeable Urdu-speaking driver"
    },
    {
      title: "Madinah Munawwarah Sacred Ziyarat",
      desc: "Ziyarat of Masjid Quba, Masjid al-Qiblatayn, Mount Uhud & Martyrs Cemetery, and the Seven Mosques.",
      vehicles: "Private AC Vehicle with dedicated timing"
    },
    {
      title: "Taif Mountain & Ziyarat Day Tour",
      desc: "Full day excursion to the cool mountain city of Taif, Masjid Abdullah Ibn Abbas, and Cable Car.",
      vehicles: "Private Luxury GMC / SUV"
    }
  ];

  return (
    <div className="min-h-screen bg-[#fcfbf8] pb-16">
      <div className="py-14 sm:py-20 bg-[#022c22] text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <span className="text-xs font-semibold text-amber-300 uppercase tracking-widest block mb-2">
            Intercity Transfers & Guided Tours
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white mb-4">
            Transport & Ziyarat Services
          </h1>
          <p className="text-xs sm:text-base text-emerald-100/90 font-light max-w-2xl mx-auto">
            Reliable, air-conditioned private and family transport across Jeddah, Makkah, Madinah, and Taif.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-6">
        {routes.map((r) => (
          <div key={r.title} className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div className="space-y-1.5">
              <span className="text-[10px] uppercase font-bold text-amber-600 tracking-wider">
                Confirmed Transport Route
              </span>
              <h3 className="font-serif text-base sm:text-lg font-bold text-slate-900">
                {r.title}
              </h3>
              <p className="text-xs text-slate-600 max-w-xl">
                {r.desc}
              </p>
              <p className="text-[11px] text-emerald-700 font-semibold">
                Available Vehicles: {r.vehicles}
              </p>
            </div>

            <a
              href={`https://wa.me/923216001913?text=${encodeURIComponent(`Assalam-o-Alaikum, I want to book transport for ${r.title}.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-[#064e3b] text-[#f7e5a9] rounded-xl text-xs font-bold shrink-0 flex items-center justify-center gap-2 hover:bg-[#022c22] shadow"
            >
              <WhatsAppSolidIcon size={16} className="text-[#25D366]" />
              <span>Book on WhatsApp</span>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
