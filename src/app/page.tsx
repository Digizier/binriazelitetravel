"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Package, 
  Category, 
  Banner, 
  Testimonial, 
  SiteSettings 
} from "@/types";
import { 
  getPackages, 
  getCategories, 
  getBanners, 
  getTestimonials, 
  getSiteSettings, 
  createInquiry 
} from "@/lib/db";
import PackageCard from "@/components/PackageCard";
import { 
  Moon, 
  Compass, 
  Plane, 
  Building2, 
  Bus, 
  FileText, 
  ShieldCheck, 
  PhoneCall, 
  MessageCircle, 
  ChevronRight, 
  ChevronDown, 
  CheckCircle2, 
  Star, 
  Send, 
  Sparkles, 
  ArrowRight,
  Globe,
  Award,
  Users,
  Clock,
  MapPin
} from "lucide-react";
import confetti from "canvas-confetti";

export default function HomePage() {
  const [umrahPackages, setUmrahPackages] = useState<Package[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);

  // Form State
  const [formName, setFormName] = useState("");
  const [formWhatsApp, setFormWhatsApp] = useState("");
  const [formService, setFormService] = useState("Umrah Package");
  const [formPackage, setFormPackage] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  // FAQ Accordion Active state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const [pkgsRes, catsRes, bansRes, testsRes, setsRes] = await Promise.all([
          getPackages({ category: "umrah", limit: 4 }),
          getCategories(),
          getBanners(),
          getTestimonials(),
          getSiteSettings(),
        ]);
        setUmrahPackages(pkgsRes.packages);
        setCategories(catsRes);
        setBanners(bansRes);
        setTestimonials(testsRes);
        setSettings(setsRes);
      } catch (err) {
        console.error("Error loading home page data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formWhatsApp.trim()) return;

    setFormSubmitting(true);
    const res = await createInquiry({
      full_name: formName,
      whatsapp_number: formWhatsApp,
      inquiry_type: "general",
      package_title: formPackage || formService,
      special_requirements: formMessage,
      status: "new",
    });

    setFormSubmitting(false);
    if (res.success) {
      setFormSuccess(true);
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 } });
      setFormName("");
      setFormWhatsApp("");
      setFormMessage("");
    }
  };

  const servicesList = [
    { title: "Umrah Packages", href: "/umrah-packages", icon: Moon, desc: "Economy to 5-Star VIP Makkah & Madinah stays" },
    { title: "Hajj Services", href: "/hajj", icon: Sparkles, desc: "Government & Private Hajj facilitation" },
    { title: "Visa Assistance", href: "/visa", icon: FileText, desc: "Saudi Umrah, Tourist & International Visit Visas" },
    { title: "Flight Booking", href: "/flights", icon: Plane, desc: "Domestic & International confirmed air tickets" },
    { title: "Hotel Booking", href: "/hotels", icon: Building2, desc: "Haram & Markazia front-row luxury hotels" },
    { title: "Transport Services", href: "/transport", icon: Bus, desc: "VIP Private GMC, Hiace & Luxury buses" },
    { title: "Ziyarat Services", href: "/transport", icon: MapPin, desc: "Guided Makkah, Madinah & Taif historical tours" },
    { title: "International Tours", href: "/tours", icon: Globe, desc: "Dubai, Turkey, Baku, Malaysia, Europe & more" },
    { title: "Domestic Tours", href: "/tours", icon: Compass, desc: "Northern Pakistan, Skardu, Hunza & Swat" },
  ];

  const faqs = [
    {
      q: "What documents are required for Umrah Visa from Pakistan?",
      a: "For an Umrah Visa, you require an original Passport valid for at least 6 months, a copy of your CNIC/Smart Card, recent passport-sized photographs with blue/white background, and verified contact details. Our team handles the entire electronic visa submission."
    },
    {
      q: "How can I book or reserve a package with Bin Riaz Elite Travel?",
      a: "You can click 'WhatsApp Us' on any package or submit our quick Inquiry Form. Our travel specialist will verify real-time hotel/airline seat availability, share the itemized quotation, and guide you through the reservation process."
    },
    {
      q: "What is your package cancellation or refund policy?",
      a: "Airline and hotel refund policies depend on individual carrier terms and proximity to departure date. We provide transparent, client-friendly cancellation terms communicated beforehand in your booking invoice."
    },
    {
      q: "Do you provide customized family or VIP Umrah packages?",
      a: "Yes! We specialize in tailored itineraries where you choose your preferred 5-star or budget hotels, private GMC/chauffeur transport, custom dates, and direct airline flights."
    },
    {
      q: "Can I customize my international holiday or honeymoon tour?",
      a: "Absolutely. All our international packages (Dubai, Turkey, Baku, Malaysia, Switzerland, Maldives) can be customized with private transfers, romantic candlelight dinners, and sightseeing tours."
    }
  ];

  const popularDestinations = [
    { name: "Turkey", image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=500&q=80", count: "4 Packages" },
    { name: "Malaysia", image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=500&q=80", count: "3 Packages" },
    { name: "Dubai", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=500&q=80", count: "5 Packages" },
    { name: "Thailand", image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=500&q=80", count: "3 Packages" },
    { name: "Switzerland", image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=500&q=80", count: "2 Packages" },
    { name: "Singapore", image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=500&q=80", count: "2 Packages" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#fcfbf8]">
      
      {/* ==============================================================
          SECTION 1: HERO BANNER (Matching Reference Image 2)
      ============================================================== */}
      <section className="relative w-full min-h-[550px] lg:min-h-[640px] flex items-center justify-center overflow-hidden bg-slate-950">
        {/* Background Image with Warm Golden Hour Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=2000&q=85"
            alt="Makkah Clock Tower and Holy Kaaba Sunset"
            className="w-full h-full object-cover object-center opacity-40 mix-blend-luminosity scale-105 animate-pulse duration-10000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#022c22] via-[#022c22]/70 to-black/60" />
        </div>

        {/* Hero Content Box */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          {/* Trust Badge Pill */}
          <div className="inline-flex items-center gap-2 bg-[#d4af37]/20 border border-[#d4af37]/40 backdrop-blur-md px-4 py-1.5 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span className="text-xs sm:text-sm font-semibold tracking-wide text-amber-200 uppercase">
              Your Trusted Travel Partner
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight sm:leading-tight mb-4 drop-shadow-md">
            Sacred Journeys, <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f7e5a9] via-amber-200 to-[#d4af37]">
              Lasting Memories
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-slate-200 text-sm sm:text-lg max-w-2xl mx-auto mb-8 font-light leading-relaxed">
            We provide reliable and comfortable travel services for Umrah, Hajj, International & Domestic Tours. Your journey is our priority.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Link
              href="/umrah-packages"
              className="inline-flex items-center gap-2 bg-[#064e3b] hover:bg-[#043e2f] border border-emerald-500/30 text-[#f7e5a9] px-6 py-3.5 rounded-full text-sm sm:text-base font-bold shadow-lg shadow-emerald-950/40 hover:scale-105 transition-all"
            >
              <span>Explore Umrah Packages</span>
              <ArrowRight className="w-4 h-4 text-amber-300" />
            </Link>

            <a
              href="https://wa.me/923216001913?text=Assalam-o-Alaikum%20Bin%20Riaz%20Elite%20Travel%2C%20I%20would%20like%20to%20inquire%20about%20Umrah%20and%20Tour%20packages."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3.5 rounded-full text-sm sm:text-base font-semibold shadow-md transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-white text-white" />
              <span>WhatsApp Inquiry</span>
            </a>

            <a
              href="tel:03157801913"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-slate-100 border border-white/20 px-5 py-3.5 rounded-full text-sm sm:text-base font-semibold transition-all"
            >
              <PhoneCall className="w-4 h-4 text-amber-300" />
              <span>Call Now</span>
            </a>
          </div>
        </div>
      </section>

      {/* ==============================================================
          SECTION 2: FEATURED UMRAH PACKAGES (2 cards per row on mobile)
      ============================================================== */}
      <section id="featured-umrah" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#064e3b] tracking-tight">
            Featured Umrah Packages
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600">
            Choose from our carefully designed Umrah packages for a spiritual and comfortable journey.
          </p>
        </div>

        {/* Products Grid: 4 columns desktop, 2 columns on mobile */}
        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-80 rounded-2xl skeleton-shimmer border border-slate-200" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {umrahPackages.map((pkg) => (
              <PackageCard key={pkg.id} packageItem={pkg} />
            ))}
          </div>
        )}

        {/* View All Umrah Packages CTA */}
        <div className="text-center mt-8 sm:mt-10">
          <Link
            href="/umrah-packages"
            className="inline-flex items-center gap-2 bg-[#064e3b] hover:bg-[#022c22] text-[#f7e5a9] px-7 py-3 rounded-full text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all"
          >
            <span>View All Umrah Packages</span>
            <ChevronRight className="w-4 h-4 text-amber-300" />
          </Link>
        </div>
      </section>

      {/* ==============================================================
          SECTION 3: OUR SERVICES (Clean Card Grid)
      ============================================================== */}
      <section className="py-12 sm:py-16 bg-[#f4f1ea] border-y border-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#064e3b]">
              Our Services
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600">
              We offer a complete range of travel and tourism services to make your journey easier.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-5">
            {servicesList.map((srv) => {
              const Icon = srv.icon;
              return (
                <Link
                  key={srv.title}
                  href={srv.href}
                  className="group bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md hover:border-[#d4af37] transition-all flex flex-col items-center text-center justify-between"
                >
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#064e3b] group-hover:bg-[#064e3b] group-hover:text-[#f7e5a9] transition-colors flex items-center justify-center mb-3">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#064e3b] transition-colors">
                      {srv.title}
                    </h3>
                    <p className="text-[10px] sm:text-xs text-slate-500 mt-1 line-clamp-2">
                      {srv.desc}
                    </p>
                  </div>
                  <span className="text-[10px] font-semibold text-[#996515] mt-3 inline-flex items-center gap-0.5">
                    Explore <ChevronRight className="w-3 h-3" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==============================================================
          SECTION 4: EXPLORE MAIN CATEGORIES (Continuous Ticker / Marquee)
      ============================================================== */}
      <section className="py-10 bg-white overflow-hidden border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-5 flex justify-between items-end">
          <div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#064e3b]">
              Explore Main Categories
            </h2>
            <p className="text-xs text-slate-500">Browse tours and pilgrimage packages by specialty</p>
          </div>
          <Link href="/tours" className="text-xs font-bold text-[#996515] hover:underline flex items-center gap-1">
            View All <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Infinite Auto-Scrolling Marquee Container */}
        <div className="relative w-full overflow-hidden py-2">
          <div className="animate-marquee flex gap-3 sm:gap-4">
            {[...categories, ...categories].map((cat, idx) => (
              <Link
                key={`${cat.id}-${idx}`}
                href={cat.type === "umrah" ? "/umrah-packages" : `/tours?category=${cat.slug}`}
                className="shrink-0 bg-[#fbf9f4] hover:bg-[#064e3b] hover:text-white border border-amber-200/60 rounded-xl px-5 py-3 transition-colors flex items-center gap-2 group shadow-sm"
              >
                <div className="w-2 h-2 rounded-full bg-[#d4af37] group-hover:bg-amber-300" />
                <span className="text-xs sm:text-sm font-bold tracking-tight">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ==============================================================
          SECTION 5: WHY CHOOSE BIN RIAZ ELITE TRAVEL
      ============================================================== */}
      <section className="py-12 sm:py-16 bg-[#022c22] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#f7e5a9]">
              Why Choose Bin Riaz Elite Travel & Tours
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-emerald-100/80">
              Your trust and satisfaction are our top priorities.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-6">
            <div className="bg-emerald-950/60 border border-emerald-800/60 p-4 sm:p-5 rounded-2xl text-center flex flex-col items-center">
              <Award className="w-8 h-8 text-[#d4af37] mb-3" />
              <h3 className="font-bold text-xs sm:text-sm text-white">Trusted Travel Partner</h3>
              <p className="text-[11px] text-emerald-200/70 mt-1">A brand by Bin Riaz Group of Companies</p>
            </div>

            <div className="bg-emerald-950/60 border border-emerald-800/60 p-4 sm:p-5 rounded-2xl text-center flex flex-col items-center">
              <Users className="w-8 h-8 text-[#d4af37] mb-3" />
              <h3 className="font-bold text-xs sm:text-sm text-white">Experienced Team</h3>
              <p className="text-[11px] text-emerald-200/70 mt-1">Professional & dedicated travel experts</p>
            </div>

            <div className="bg-emerald-950/60 border border-emerald-800/60 p-4 sm:p-5 rounded-2xl text-center flex flex-col items-center">
              <Sparkles className="w-8 h-8 text-[#d4af37] mb-3" />
              <h3 className="font-bold text-xs sm:text-sm text-white">Customized Packages</h3>
              <p className="text-[11px] text-emerald-200/70 mt-1">Tailor solutions for every need</p>
            </div>

            <div className="bg-emerald-950/60 border border-emerald-800/60 p-4 sm:p-5 rounded-2xl text-center flex flex-col items-center">
              <ShieldCheck className="w-8 h-8 text-[#d4af37] mb-3" />
              <h3 className="font-bold text-xs sm:text-sm text-white">Safe & Comfortable</h3>
              <p className="text-[11px] text-emerald-200/70 mt-1">Your safety and comfort matters to us</p>
            </div>

            <div className="col-span-2 lg:col-span-1 bg-emerald-950/60 border border-emerald-800/60 p-4 sm:p-5 rounded-2xl text-center flex flex-col items-center">
              <Clock className="w-8 h-8 text-[#d4af37] mb-3" />
              <h3 className="font-bold text-xs sm:text-sm text-white">24/7 Dedicated Support</h3>
              <p className="text-[11px] text-emerald-200/70 mt-1">Always here to assist you in Saudi Arabia & Pakistan</p>
            </div>
          </div>
        </div>
      </section>

      {/* ==============================================================
          SECTION 6: HOW IT WORKS (5 Steps with Clear Disclaimer)
      ============================================================== */}
      <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#064e3b]">
            How It Works
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600">
            Getting started is simple. Follow these easy steps to plan your journey.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4 relative">
          {[
            { step: "1", title: "Explore Packages", desc: "Browse our available Umrah, Hajj & tour packages." },
            { step: "2", title: "Select a Package", desc: "Choose the package that fits your needs & budget." },
            { step: "3", title: "Send an Inquiry", desc: "Use our online form or WhatsApp to connect." },
            { step: "4", title: "Get Confirmation", desc: "Our team will contact you for details & availability." },
            { step: "5", title: "Proceed With Arrangements", desc: "Complete your booking after confirmation." },
          ].map((item, idx) => (
            <div key={item.step} className={`bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 text-center relative ${idx === 4 ? 'col-span-2 md:col-span-1' : ''}`}>
              <div className="w-9 h-9 rounded-full bg-[#064e3b] text-[#f7e5a9] font-bold text-sm flex items-center justify-center mx-auto mb-3 shadow-md">
                {item.step}
              </div>
              <h3 className="font-serif text-xs sm:text-sm font-bold text-slate-900 mb-1">{item.title}</h3>
              <p className="text-[11px] text-slate-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Clear Disclaimer */}
        <div className="mt-6 p-3 bg-amber-50/80 border border-amber-200/80 rounded-xl text-center max-w-2xl mx-auto">
          <p className="text-[11px] sm:text-xs text-[#996515] font-medium">
            <span className="font-bold">Note:</span> Submitting an inquiry does not automatically confirm a booking. Our team will get in touch with you for further details and confirmation.
          </p>
        </div>
      </section>

      {/* ==============================================================
          SECTION 7: INTERNATIONAL & DOMESTIC TOURS SPLIT BANNER
      ============================================================== */}
      <section className="py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* International Tours Banner */}
          <div className="relative rounded-3xl overflow-hidden min-h-[220px] sm:min-h-[260px] flex items-end p-6 sm:p-8 bg-slate-900 group">
            <img
              src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1000&q=80"
              alt="International Tours Dubai"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="relative z-10">
              <span className="text-[10px] sm:text-xs font-semibold text-amber-300 uppercase tracking-wider block mb-1">
                Worldwide Destinations
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-2">
                International Tours
              </h3>
              <p className="text-xs text-slate-200 max-w-sm mb-4">
                Discover amazing destinations around the world with our carefully planned international tour packages.
              </p>
              <Link
                href="/tours"
                className="inline-flex items-center gap-1.5 bg-[#064e3b] hover:bg-[#022c22] text-[#f7e5a9] text-xs font-bold px-4 py-2 rounded-full shadow"
              >
                <span>View All Tours</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Domestic Tours Banner */}
          <div className="relative rounded-3xl overflow-hidden min-h-[220px] sm:min-h-[260px] flex items-end p-6 sm:p-8 bg-slate-900 group">
            <img
              src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1000&q=80"
              alt="Domestic Northern Pakistan Tours"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="relative z-10">
              <span className="text-[10px] sm:text-xs font-semibold text-amber-300 uppercase tracking-wider block mb-1">
                Explore Pakistan
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-2">
                Domestic Tours
              </h3>
              <p className="text-xs text-slate-200 max-w-sm mb-4">
                Experience the majestic beauty of Pakistan with our exciting domestic tour packages (Hunza, Skardu, Swat).
              </p>
              <Link
                href="/tours?category=domestic-tours"
                className="inline-flex items-center gap-1.5 bg-[#064e3b] hover:bg-[#022c22] text-[#f7e5a9] text-xs font-bold px-4 py-2 rounded-full shadow"
              >
                <span>View Domestic Tours</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ==============================================================
          SECTION 8: POPULAR DESTINATIONS CAROUSEL
      ============================================================== */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#064e3b]">
            Popular Destinations
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-600">
            From vibrant cities to natural wonders, explore the most loved destinations around the world.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {popularDestinations.map((dest) => (
            <Link
              key={dest.name}
              href={`/tours?search=${encodeURIComponent(dest.name)}`}
              className="group relative rounded-2xl overflow-hidden aspect-[4/5] bg-slate-900 shadow-sm hover:shadow-lg transition-all"
            >
              <img
                src={dest.image}
                alt={dest.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <h3 className="font-serif text-sm font-bold">{dest.name}</h3>
                <span className="text-[10px] text-amber-300 font-medium">{dest.count}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ==============================================================
          SECTION 9: AUTHORIZED BRANDS & AIRLINE PARTNERS (Single Row Ticker)
      ============================================================== */}
      <section className="py-8 bg-slate-100/70 border-y border-slate-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4 text-center">
          <span className="text-xs uppercase tracking-widest font-semibold text-slate-500">
            Authorized Airline Partners & Genuine Service Providers
          </span>
        </div>
        <div className="relative w-full overflow-hidden">
          <div className="animate-marquee flex items-center gap-12 sm:gap-16 opacity-75">
            {[
              "Saudi Airlines", "PIA (Pakistan International)", "Emirates Airline", 
              "Qatar Airways", "Turkish Airlines", "Flynas", "Airblue", "SereneAir",
              "Saudi Airlines", "PIA (Pakistan International)", "Emirates Airline", 
              "Qatar Airways", "Turkish Airlines", "Flynas"
            ].map((airline, idx) => (
              <div key={idx} className="shrink-0 flex items-center gap-2 font-serif text-sm sm:text-base font-bold text-slate-700">
                <Plane className="w-4 h-4 text-[#064e3b]" />
                <span>{airline}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==============================================================
          SECTION 10: CUSTOMER REVIEWS (Testimonials)
      ============================================================== */}
      <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#064e3b]">
            What Our Customers Say
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600">
            Real stories from travelers who explored the world with us.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-3">
                  {[...Array(t.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-slate-700 italic leading-relaxed">
                  "{t.review_text}"
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-emerald-100 text-[#064e3b] font-bold text-xs flex items-center justify-center">
                  {t.customer_name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-900">{t.customer_name}</h3>
                  <p className="text-[10px] text-slate-500">{t.customer_city} • {t.service_used}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==============================================================
          SECTION 11: SPLIT SECTION - FAQS & INTERACTIVE INQUIRY FORM
      ============================================================== */}
      <section className="py-12 sm:py-16 bg-[#f4f1ea] border-t border-amber-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Left: FAQs Accordion (7 Columns) */}
            <div className="lg:col-span-7">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#064e3b] mb-2">
                Frequently Asked Questions
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mb-6">
                Find answers to common questions about our services and booking process.
              </p>

              <div className="space-y-3">
                {faqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-sm transition-all"
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      className="w-full text-left p-4 sm:p-5 flex justify-between items-center gap-4 hover:bg-slate-50/50"
                    >
                      <span className="font-serif text-xs sm:text-sm font-bold text-slate-900">
                        {faq.q}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#064e3b] transition-transform duration-200 shrink-0 ${
                          openFaq === idx ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {openFaq === idx && (
                      <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Quick Get In Touch Inquiry Form (5 Columns) */}
            <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-lg">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#064e3b] mb-1">
                Get In Touch
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                Have any questions or need a custom quote? Send us a message and our team will get back to your WhatsApp promptly.
              </p>

              {formSuccess ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
                  <h4 className="font-serif text-base font-bold text-[#064e3b]">Inquiry Received!</h4>
                  <p className="text-xs text-slate-600 mt-2">
                    JazakAllah Khair. Malik Amir Riaz and our travel team will review your inquiry and contact your WhatsApp shortly.
                  </p>
                  <button
                    onClick={() => setFormSuccess(false)}
                    className="mt-4 text-xs font-semibold text-[#064e3b] underline"
                  >
                    Submit another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="e.g. Muhammad Riaz"
                      className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#064e3b]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formWhatsApp}
                      onChange={(e) => setFormWhatsApp(e.target.value)}
                      placeholder="0321-xxxxxxx"
                      className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#064e3b]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Service
                      </label>
                      <select
                        value={formService}
                        onChange={(e) => setFormService(e.target.value)}
                        className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#064e3b] bg-white"
                      >
                        <option value="Umrah Package">Umrah Package</option>
                        <option value="International Tour">International Tour</option>
                        <option value="Domestic Tour">Domestic Tour</option>
                        <option value="Visa Service">Visa Service</option>
                        <option value="Flight Booking">Flight Booking</option>
                        <option value="Hotel Booking">Hotel Booking</option>
                        <option value="Transport & Ziyarat">Transport & Ziyarat</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Selected Package
                      </label>
                      <input
                        type="text"
                        value={formPackage}
                        onChange={(e) => setFormPackage(e.target.value)}
                        placeholder="Optional"
                        className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#064e3b]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Your Message / Travel Requirement
                    </label>
                    <textarea
                      rows={3}
                      value={formMessage}
                      onChange={(e) => setFormMessage(e.target.value)}
                      placeholder="Number of persons, preferred dates, hotel requirement..."
                      className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#064e3b]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={formSubmitting}
                    className="w-full py-3 bg-[#064e3b] hover:bg-[#022c22] text-[#f7e5a9] font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{formSubmitting ? "Sending Inquiry..." : "Send Inquiry"}</span>
                  </button>

                  <p className="text-[10px] text-slate-400 text-center">
                    By submitting, you agree to our Privacy Policy & Terms of Service.
                  </p>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
