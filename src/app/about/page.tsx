import React from "react";
import Link from "next/link";
import { Award, ShieldCheck, Users, Clock, Heart, Sparkles, MapPin, Phone, MessageCircle } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#fcfbf8] pb-16">
      {/* Hero */}
      <div className="py-14 sm:py-20 bg-[#022c22] text-white text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <span className="text-xs font-semibold text-amber-300 uppercase tracking-widest block mb-2">
            A Brand by Bin Riaz Group of Companies
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white mb-4">
            About Bin Riaz Elite Travels & Tours
          </h1>
          <p className="text-xs sm:text-base text-emerald-100/90 font-light max-w-2xl mx-auto">
            Providing premium, transparent, and trustworthy travel facilitation for sacred Umrah journeys and global tour experiences.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-12">
        {/* Company Overview */}
        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="text-xs font-bold text-[#996515] uppercase tracking-wider">
              Leadership & Commitment
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#064e3b]">
              Your Journey Is Our Highest Priority
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Led by <strong className="text-slate-900">Malik Amir Riaz</strong>, Bin Riaz Elite Travels & Tours is built on a foundation of uncompromised integrity, spiritual dedication, and client satisfaction. We understand that performing Umrah or traveling abroad with family is a deeply meaningful milestone.
            </p>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Every hotel, airline booking, visa process, and transport arrangement is personally audited to ensure complete transparency with zero hidden surprises.
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200 aspect-[4/3]">
            <img
              src="https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=1000&q=80"
              alt="Makkah Clock Tower"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Core Values */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center">
            <ShieldCheck className="w-10 h-10 text-[#064e3b] mx-auto mb-3" />
            <h3 className="font-serif text-base font-bold text-slate-900 mb-2">100% Transparency</h3>
            <p className="text-xs text-slate-600">Exact hotel distances, confirmed flight numbers, and verified visa documentation.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center">
            <Users className="w-10 h-10 text-[#064e3b] mx-auto mb-3" />
            <h3 className="font-serif text-base font-bold text-slate-900 mb-2">Personalized Attention</h3>
            <p className="text-xs text-slate-600">Custom family arrangements, wheelchair support, and 24/7 dedicated local assistance in Saudi Arabia.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center">
            <Award className="w-10 h-10 text-[#064e3b] mx-auto mb-3" />
            <h3 className="font-serif text-base font-bold text-slate-900 mb-2">Group Strength</h3>
            <p className="text-xs text-slate-600">Backed by the trusted corporate legacy of Bin Riaz Group of Companies.</p>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="bg-[#064e3b] text-white p-8 rounded-3xl text-center space-y-4">
          <h3 className="font-serif text-2xl font-bold">Have Questions or Want to Meet Us?</h3>
          <p className="text-xs sm:text-sm text-emerald-100/90 max-w-lg mx-auto">
            Contact Malik Amir Riaz directly or reach our office helpline for consultation.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://wa.me/923216001913"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 rounded-full bg-[#f7e5a9] text-[#022c22] font-bold text-xs sm:text-sm flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp: 0321-6001913</span>
            </a>
            <a
              href="tel:03157801913"
              className="px-5 py-2.5 rounded-full bg-emerald-800 text-white font-semibold text-xs sm:text-sm border border-emerald-600"
            >
              Office: 0315-7801913
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
