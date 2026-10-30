"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Phone, 
  Menu, 
  X, 
  MapPin, 
  Mail
} from "lucide-react";
import { WhatsAppSolidIcon } from "@/components/icons/SocialIcons";

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
    { name: "Umrah Inquiry Form", href: "/inquiry" },
    { name: "Overseas Form", href: "/overseas-inquiry" },
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
              binriazelitetravel@gmail.com
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
              <WhatsAppSolidIcon size={14} className="text-[#25D366]" />
              WhatsApp: +92 321 6001913
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo & Brand Identity */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group">
            <img 
              src="/logo.png" 
              alt="Bin Riaz Elite Travels and Tours Emblem" 
              width={56}
              height={56}
              className="h-11 w-11 sm:h-12 sm:w-12 md:h-14 md:w-14 object-contain transition-transform group-hover:scale-105 duration-300 shrink-0"
            />
            <div className="flex flex-col">
              <span className="font-serif text-base sm:text-lg md:text-xl font-bold tracking-tight text-[#064e3b] leading-tight">
                BIN RIAZ <span className="text-[#996515]">ELITE</span>
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-widest uppercase font-semibold text-slate-500">
                Travels & Tours
              </span>
              <span className="text-[8px] sm:text-[9px] text-[#064e3b]/80 font-medium">
                A Brand by Bin Riaz Group
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-3 xl:space-x-5">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-xs xl:text-sm font-medium transition-colors hover:text-[#064e3b] relative py-1 whitespace-nowrap ${
                    isActive 
                      ? "text-[#064e3b] font-semibold" 
                      : "text-slate-700 hover:text-[#064e3b]"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#d4af37] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Hamburger Button */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-slate-700 hover:text-[#064e3b] hover:bg-slate-100 transition-colors focus:outline-none"
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
                <Link
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
                </Link>
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
              <WhatsAppSolidIcon size={18} className="text-[#25D366]" />
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
