import React from "react";
import Link from "next/link";
import { Sparkles, ShieldCheck, CheckCircle2, MessageCircle, Phone } from "lucide-react";

export default function HajjServicesPage() {
  return (
    <div className="min-h-screen bg-[#fcfbf8] pb-16">
      <div className="py-14 sm:py-20 bg-[#022c22] text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <span className="text-xs font-semibold text-amber-300 uppercase tracking-widest block mb-2">
            The Ultimate Pillar of Faith
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white mb-4">
            Hajj Services & Facilitation
          </h1>
          <p className="text-xs sm:text-base text-emerald-100/90 font-light max-w-2xl mx-auto">
            Comprehensive guidance and assistance for Government and Private Hajj schemes with authorized Saudi partners.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-8">
        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <h2 className="font-serif text-2xl font-bold text-[#064e3b]">
            Our Hajj Facilitation Standard
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            Hajj is a life-transforming spiritual journey requiring utmost care, adherence to official regulations, and dependable logistical coordination. Bin Riaz Elite Travels & Tours assists pilgrims with:
          </p>

          <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
              <span>Complete consultation on Ministry of Religious Affairs (MORA) Government and Private quota guidelines.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
              <span>Nusuk platform guidance, profile registration, and package selection for overseas Pakistanis and direct applicants.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
              <span>Mina, Arafat, and Muzdalifah camp category explanations (VIP Category A & B tents with sofa beds and catering).</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
              <span>Pre-departure training seminars and religious orientation on Manasik-e-Hajj.</span>
            </li>
          </ul>

          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
            <a
              href="https://wa.me/923216001913?text=Assalam-o-Alaikum%2C%20I%20want%20information%20regarding%20Hajj%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-6 bg-[#064e3b] text-[#f7e5a9] font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-emerald-400" />
              <span>Inquire for Hajj on WhatsApp</span>
            </a>
            <a
              href="tel:03216001913"
              className="py-3 px-6 bg-slate-100 text-slate-800 font-semibold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>Call: 0321-6001913</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
