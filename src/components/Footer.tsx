"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Mail, MapPin, MessageCircle, Heart, ShieldCheck } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();

  // Strictly hide public footer on admin routes
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="w-full bg-[#022c22] text-slate-200 border-t-2 border-[#d4af37]/40 relative overflow-hidden">
      {/* Subtle background ornamentation */}
      <div className="absolute top-0 right-0 -mt-24 -mr-24 w-96 h-96 bg-[#064e3b]/30 rounded-full blur-3xl pointer-events-none" />

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          
          {/* Brand Info (2 Columns on large screens) */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3">
              <img 
                src="/logo.png" 
                alt="Bin Riaz Elite Travels and Tours" 
                width={64}
                height={64}
                className="h-16 w-16 object-contain"
              />
              <div className="flex flex-col">
                <span className="font-serif text-xl font-bold tracking-tight text-white leading-tight">
                  BIN RIAZ <span className="text-[#f7e5a9]">ELITE</span>
                </span>
                <span className="text-[11px] tracking-widest uppercase font-semibold text-amber-200/90">
                  Travels & Tours
                </span>
                <span className="text-[10px] text-emerald-200/70">
                  A Brand by Bin Riaz Group of Companies
                </span>
              </div>
            </Link>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-sm">
              Your trusted travel partner for Umrah, Hajj, international & domestic tours. We create sacred journeys and unforgettable travel experiences with premium care and personalized attention.
            </p>

            {/* Social Media Links */}
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://www.facebook.com/profile.php?id=61592274299457"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-emerald-900/60 border border-emerald-700/50 flex items-center justify-center text-amber-300 hover:bg-[#d4af37] hover:text-[#022c22] transition-colors"
                aria-label="Facebook Profile"
              >
                <span className="font-bold text-xs">FB</span>
              </a>
              <a
                href="https://www.instagram.com/binriazgroup"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-emerald-900/60 border border-emerald-700/50 flex items-center justify-center text-amber-300 hover:bg-[#d4af37] hover:text-[#022c22] transition-colors"
                aria-label="Instagram Profile"
              >
                <span className="font-bold text-xs">IG</span>
              </a>
              <a
                href="https://www.tiktok.com/@binriazgroup"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-emerald-900/60 border border-emerald-700/50 flex items-center justify-center text-amber-300 hover:bg-[#d4af37] hover:text-[#022c22] transition-colors"
                aria-label="TikTok Channel"
              >
                <span className="font-bold text-xs">TT</span>
              </a>
              <a
                href="https://wa.me/923216001913"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-emerald-900/60 border border-emerald-700/50 flex items-center justify-center text-emerald-300 hover:bg-emerald-600 hover:text-white transition-colors"
                aria-label="WhatsApp Channel"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold tracking-wider uppercase text-[#f7e5a9] border-b border-emerald-800/80 pb-2">
              Quick Links
            </h4>
            <ul className="grid grid-cols-2 sm:grid-cols-1 gap-2 text-xs sm:text-sm text-slate-300">
              <li><Link href="/" className="hover:text-amber-300 transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-amber-300 transition-colors">About Us</Link></li>
              <li><Link href="/umrah-packages" className="hover:text-amber-300 transition-colors">Umrah Packages</Link></li>
              <li><Link href="/hajj" className="hover:text-amber-300 transition-colors">Hajj Services</Link></li>
              <li><Link href="/tours" className="hover:text-amber-300 transition-colors">All Tours</Link></li>
              <li><Link href="/visa" className="hover:text-amber-300 transition-colors">Visa Services</Link></li>
              <li><Link href="/inquiry" className="hover:text-amber-300 transition-colors">Inquiry Form</Link></li>
              <li><Link href="/contact" className="hover:text-amber-300 transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Our Services */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold tracking-wider uppercase text-[#f7e5a9] border-b border-emerald-800/80 pb-2">
              Our Services
            </h4>
            <ul className="grid grid-cols-2 sm:grid-cols-1 gap-2 text-xs sm:text-sm text-slate-300">
              <li><Link href="/umrah-packages" className="hover:text-amber-300 transition-colors">Umrah Packages</Link></li>
              <li><Link href="/tours" className="hover:text-amber-300 transition-colors">International Tours</Link></li>
              <li><Link href="/tours" className="hover:text-amber-300 transition-colors">Domestic Tours</Link></li>
              <li><Link href="/tours" className="hover:text-amber-300 transition-colors">Family Packages</Link></li>
              <li><Link href="/visa" className="hover:text-amber-300 transition-colors">Saudi & Tourist Visas</Link></li>
              <li><Link href="/hotels" className="hover:text-amber-300 transition-colors">Hotel Booking</Link></li>
              <li><Link href="/flights" className="hover:text-amber-300 transition-colors">Flight Booking</Link></li>
              <li><Link href="/transport" className="hover:text-amber-300 transition-colors">Ziyarat & Transport</Link></li>
            </ul>
          </div>

          {/* Contact Details & Legal */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold tracking-wider uppercase text-[#f7e5a9] border-b border-emerald-800/80 pb-2">
              Contact Us
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                <div>
                  <a href="tel:03216001913" className="hover:text-amber-300 block">0321-6001913</a>
                  <a href="tel:03157801913" className="hover:text-amber-300 block text-xs text-slate-400">Office: 0315-7801913</a>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <a href="https://wa.me/923216001913" target="_blank" rel="noopener noreferrer" className="hover:text-amber-300">
                  WhatsApp: +92 321 6001913
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                <a href="mailto:binriazelitetravel@gmail.com" className="hover:text-amber-300 break-all">
                  binriazelitetravel@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                <span>Bin Riaz Group of Companies, Pakistan</span>
              </li>
            </ul>

            {/* Legal Links in 2 Columns on Mobile */}
            <div className="pt-2 border-t border-emerald-900/60">
              <span className="text-[11px] font-semibold text-amber-200/80 block mb-1">Legal</span>
              <div className="grid grid-cols-2 gap-1.5 text-[11px] text-slate-400">
                <Link href="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
                <Link href="/terms" className="hover:text-white">Terms & Conditions</Link>
                <Link href="/refund-policy" className="hover:text-white">Refund Policy</Link>
                <Link href="/booking-terms" className="hover:text-white">Booking Terms</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Brand Bar */}
        <div className="mt-10 pt-6 border-t border-emerald-900/80 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-400 gap-2 pb-16 md:pb-0">
          <p>© {new Date().getFullYear()} Bin Riaz Elite Travels & Tours. All Rights Reserved.</p>
          <p className="flex items-center gap-1 text-slate-400">
            A Brand by <span className="text-amber-300 font-semibold">Bin Riaz Group of Companies</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
