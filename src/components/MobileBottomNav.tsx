"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass, Moon, FileText, MessageCircle } from "lucide-react";

export default function MobileBottomNav() {
  const pathname = usePathname();

  // Strictly hide on admin panel
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const tabs = [
    { name: "Home", href: "/", icon: Home },
    { name: "Umrah", href: "/umrah-packages", icon: Moon },
    { name: "Tours", href: "/tours", icon: Compass },
    { name: "Inquire", href: "/inquiry", icon: FileText },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-amber-200/60 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] md:hidden">
      <div className="grid grid-cols-5 h-16 max-w-md mx-auto items-center px-1">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href || (tab.href !== "/" && pathname?.startsWith(tab.href));
          const Icon = tab.icon;
          return (
            <Link
              key={tab.name}
              href={tab.href}
              className={`flex flex-col items-center justify-center h-full transition-colors relative ${
                isActive ? "text-[#064e3b]" : "text-slate-500 hover:text-[#064e3b]"
              }`}
            >
              {isActive && (
                <span className="absolute top-0 w-8 h-1 bg-[#d4af37] rounded-b-full" />
              )}
              <Icon className={`w-5 h-5 transition-transform ${isActive ? "scale-110 text-[#064e3b]" : ""}`} />
              <span className={`text-[11px] font-medium mt-1 ${isActive ? "font-bold text-[#064e3b]" : ""}`}>
                {tab.name}
              </span>
            </Link>
          );
        })}

        {/* 5th Action: Instant WhatsApp button */}
        <a
          href="https://wa.me/923216001913?text=Assalam-o-Alaikum%20Bin%20Riaz%20Elite%20Travel%2C%20I%20have%20an%20inquiry."
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center h-full text-emerald-600 hover:text-emerald-700"
          aria-label="Direct WhatsApp Message"
        >
          <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-600/30">
            <MessageCircle className="w-4 h-4 fill-white" />
          </div>
          <span className="text-[10px] font-semibold text-emerald-700 mt-0.5">
            WhatsApp
          </span>
        </a>
      </div>
    </nav>
  );
}
