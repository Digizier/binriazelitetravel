"use client";

import React, { useState } from "react";
import Link from "next/navigation";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { 
  Phone, 
  MessageCircle, 
  Menu, 
  X, 
  MapPin, 
  Mail, 
  ChevronDown,
  Globe,
  Sparkles
} from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Strictly hide public header on admin routes
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Umrah Packages", href: "/umrah-packages" },
    { name: "Hajj Services", href: "/hajj" },
    { name: "Tours", href: "/tours" },
    { name: "Visa Services", href: "/visa" },
    { name: "Inquiry Form", href: "/inquiry" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <header className="w-full sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-amber-100/60 transition-all">
      {/* Top Bar for Desktop */}
      <div className="hidden lg:block bg-[#022c22] text-[#f7e5a9] text-xs py-2 px-6 border-b border-amber-900/40">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-1.5 text-emerald-100">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              Bin Riaz Group of Companies, Pakistan
            </span>
            <span className="flex items-center gap-1.5 text-emerald-100">
              <Mail className="w-3.5 h-3.5 text-amber-400" />
              info@binriazelitetravel.com
            </span>
          </div>
          <div className="flex items-center space-x-6">
            <a 
              href="tel:03157801913" 
              className="flex items-center gap-1.5 text-emerald-100 hover:text-amber-300 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              Office: 0315-7801913
            </a>
            <a 
              href="https://wa.me/923216001913" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-semibold text-amber-300 hover:text-white transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
              WhatsApp: +92 321 6001913
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo & Brand Identity */}
          <NextLink href="/" className="flex items-center gap-3 group">
            <img 
              src="/logo.png" 
              alt="Bin Riaz Elite Travels and Tours Emblem" 
              className="h-14 w-auto object-contain transition-transform group-hover:scale-105 duration-300"
            />
            <div className="flex flex-col">
              <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-[#064e3b] leading-tight">
                BIN RIAZ <span className="text-[#996515]">ELITE</span>
              </span>
              <span className="text-[10px] tracking-widest uppercase font-semibold text-slate-500">
                Travels & Tours
              </span>
              <span className="text-[9px] text-[#064e3b]/80 font-medium">
                A Brand by Bin Riaz Group
              </span>
            </div>
          </NextLink>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-7">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));
              return (
                <NextLink
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-[#064e3b] relative py-1 ${
                    isActive 
                      ? "text-[#064e3b] font-semibold" 
                      : "text-slate-700 hover:text-[#064e3b]"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#d4af37] rounded-full" />
                  )}
                </NextLink>
              );
            })}
          </nav>

          {/* Header Action CTA: WhatsApp Pill */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="https://wa.me/923216001913?text=Assalam-o-Alaikum%2C%20Bin%20Riaz%20Elite%20Travel%2C%20I%20would%20like%20to%20inquire%20about%20packages."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#064e3b] hover:bg-[#022c22] text-[#f7e5a9] px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold shadow-md shadow-emerald-900/10 hover:shadow-lg transition-all"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400 fill-emerald-400" />
              <span>WhatsApp Us</span>
              <span className="hidden xl:inline text-xs text-amber-200/90 font-mono">+92 321 6001913</span>
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex lg:hidden items-center gap-2">
            <a
              href="https://wa.me/923216001913"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-emerald-700 bg-emerald-50 rounded-full hover:bg-emerald-100"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-5 h-5 fill-emerald-600 text-emerald-600" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-[#064e3b] hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide-Down Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));
              return (
                <NextLink
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive 
                      ? "bg-emerald-50 text-[#064e3b] font-semibold" 
                      : "text-slate-700 hover:bg-slate-50 hover:text-[#064e3b]"
                  }`}
                >
                  {link.name}
                </NextLink>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
            <a
              href="https://wa.me/923216001913?text=Assalam-o-Alaikum%20Bin%20Riaz%20Elite%20Travel"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-[#064e3b] text-[#f7e5a9] py-3 rounded-xl font-semibold text-sm shadow-md"
            >
              <MessageCircle className="w-4 h-4 fill-emerald-400 text-emerald-400" />
              Chat on WhatsApp: 0321-6001913
            </a>
            <a
              href="tel:03157801913"
              className="w-full flex items-center justify-center gap-2 bg-amber-50 text-[#996515] py-2.5 rounded-xl font-semibold text-sm border border-amber-200"
            >
              <Phone className="w-4 h-4" />
              Call Office: 0315-7801913
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
