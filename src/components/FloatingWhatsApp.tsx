"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";

export default function FloatingWhatsApp() {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <div className="fixed bottom-8 right-7 z-40 hidden md:flex items-center group">
      {/* Tooltip on desktop hover */}
      <span className="hidden md:inline-block mr-3 bg-white text-slate-800 text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg border border-slate-100 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        Chat with Malik Amir Riaz
      </span>

      <a
        href="https://wa.me/923216001913?text=Assalam-o-Alaikum%20Bin%20Riaz%20Elite%20Travel%20%26%20Tours%2C%20I%20would%20like%20to%20inquire%20about%20your%20services."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Direct WhatsApp Contact"
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-xl hover:scale-105 active:scale-95 transition-all duration-300"
      >
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white"></span>
        </span>
        <MessageCircle className="w-8 h-8 fill-white" />
      </a>
    </div>
  );
}
