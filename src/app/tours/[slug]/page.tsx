import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPackageBySlug, FALLBACK_PACKAGES } from "@/lib/db";
import { 
  Building2, 
  MapPin, 
  Calendar, 
  Plane, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  MessageCircle, 
  PhoneCall, 
  ShieldCheck, 
  Sparkles,
  ArrowLeft,
  Globe
} from "lucide-react";

export function generateStaticParams() {
  return FALLBACK_PACKAGES.filter(p => p.category !== 'umrah').map((pkg) => ({
    slug: pkg.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function TourDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const pkg = await getPackageBySlug(slug);

  if (!pkg) {
    notFound();
  }

  const waText = encodeURIComponent(
    `Assalam-o-Alaikum Bin Riaz Elite Travel, mujhe Tour Package "${pkg.title}" (${pkg.duration}, Price: ${pkg.currency} ${pkg.price}) ke bare mein direct details chahiye. Please seat availability confirm kar dein.`
  );
  const waUrl = `https://wa.me/923216001913?text=${waText}`;

  return (
    <div className="min-h-screen bg-[#fcfbf8] pb-16">
      <div className="bg-[#022c22] text-white py-4 border-b border-emerald-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs">
          <Link href="/tours" className="inline-flex items-center gap-1.5 text-amber-300 hover:underline">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Tours</span>
          </Link>
          <span className="text-emerald-300/80 hidden sm:inline">Bin Riaz Elite Luxury Tour</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-8 space-y-8">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-xs font-bold px-3 py-1 bg-emerald-100 text-[#064e3b] rounded-full">
                  {pkg.duration}
                </span>
                <span className="text-xs font-semibold px-3 py-1 bg-amber-100 text-[#996515] rounded-full">
                  Status: {pkg.status === 'available' ? 'Available' : 'Limited Seats'}
                </span>
                {pkg.departure_city && (
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-600" />
                    Departure from {pkg.departure_city}
                  </span>
                )}
              </div>

              <h1 className="font-serif text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                {pkg.title}
              </h1>
            </div>

            <div className="rounded-3xl overflow-hidden aspect-[16/9] bg-slate-100 shadow-md border border-slate-200">
              <img
                src={pkg.cover_image}
                alt={pkg.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Inclusions & Exclusions */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="font-serif text-lg font-bold text-slate-900 mb-6">
                What is Included & Excluded
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1.5 mb-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Included in Package
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                    {(pkg.inclusions || [
                      "International Flight Airfare",
                      "4-Star / 5-Star Hotel Stay",
                      "Daily Breakfast Buffet",
                      "Airport Pick & Drop Transfers",
                      "Complete Guided City Tour",
                      "E-Visa Assistance"
                    ]).map((inc, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-red-600 flex items-center gap-1.5 mb-3">
                    <XCircle className="w-4 h-4 text-red-500" />
                    Excluded
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                    {(pkg.exclusions || [
                      "Personal shopping expenses",
                      "City tourism taxes",
                      "Meals outside itinerary"
                    ]).map((exc, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <XCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                        <span>{exc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-amber-50/70 border border-amber-200 p-6 rounded-2xl">
              <h4 className="font-serif text-sm font-bold text-[#996515] mb-2 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                Booking Terms
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed">
                Visa processing timeline depends on the respective country embassy guidelines. Please ensure your passport has at least 6 months validity from the departure date.
              </p>
            </div>
          </div>

          {/* Right Sticky Card */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-xl space-y-6">
              <div className="border-b border-slate-100 pb-5">
                <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block">
                  Tour Price
                </span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-2xl sm:text-3xl font-serif font-extrabold text-[#064e3b]">
                    {pkg.currency} {pkg.price?.toLocaleString()}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">/ per person</span>
                </div>
              </div>

              <div className="space-y-3">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 bg-[#064e3b] hover:bg-[#022c22] text-[#f7e5a9] font-bold text-sm rounded-2xl shadow-lg shadow-emerald-950/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5 fill-emerald-400 text-emerald-400" />
                  <span>Inquire on WhatsApp</span>
                </a>

                <Link
                  href="/inquiry"
                  className="w-full py-3 bg-amber-50 hover:bg-amber-100 text-[#996515] border border-amber-200 font-bold text-sm rounded-2xl transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Submit Custom Inquiry</span>
                </Link>
              </div>

              <div className="pt-4 border-t border-slate-100 text-center space-y-1">
                <p className="text-[11px] text-slate-500">Call Malik Amir Riaz:</p>
                <a
                  href="tel:03216001913"
                  className="text-xs font-bold text-[#064e3b] hover:underline flex items-center justify-center gap-1.5"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-amber-600" />
                  <span>0321-6001913</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
