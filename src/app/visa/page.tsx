import React from "react";
import Link from "next/link";
import { FileText, CheckCircle2, ShieldCheck, Clock, MessageCircle, ArrowRight } from "lucide-react";

export default function VisaServicesPage() {
  const visaTypes = [
    {
      title: "Saudi Umrah Electronic Visa",
      duration: "30 Days Stay",
      processing: "24 - 48 Hours Fast Track",
      requirements: [
        "Original Passport (Minimum 6 months validity)",
        "Clear Passport-size photograph (White background)",
        "CNIC / Smart Card copy",
        "Confirmed Flight Booking & Hotel details (provided by us)"
      ],
      description: "Official Ministry of Hajj & Umrah authorized electronic visa with instant verification."
    },
    {
      title: "Saudi Tourist / Multi-Entry Visa",
      duration: "1 Year Validity (90 Days stay per entry)",
      processing: "2 - 4 Business Days",
      requirements: [
        "Valid Passport with blank visa pages",
        "Valid US, UK, or Schengen Visa (if applying on waiver)",
        "National ID copy",
        "Recent digital photo"
      ],
      description: "Allows multiple entries into Saudi Arabia for tourism, business visits, and performing Umrah anytime."
    },
    {
      title: "Dubai (UAE) Tourist Visa",
      duration: "30 Days or 60 Days",
      processing: "1 - 3 Working Days",
      requirements: [
        "Passport scan (valid 6 months)",
        "CNIC copy",
        "White background passport photo"
      ],
      description: "Quick Dubai e-visa issuance with confirmed entry permits and travel insurance."
    },
    {
      title: "Turkey Tourist E-Visa & Sticker Visa",
      duration: "Single or Multiple Entry",
      processing: "Fast Track E-Visa / 10-15 Days for Sticker",
      requirements: [
        "Valid Passport",
        "Active US / UK / Schengen visa for Instant E-Visa",
        "Bank Statement & Employment Letter for Sticker Visa"
      ],
      description: "Complete file preparation, appointment booking, and visa file assessment."
    }
  ];

  return (
    <div className="min-h-screen bg-[#fcfbf8] pb-16">
      <div className="py-14 sm:py-20 bg-[#022c22] text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <span className="text-xs font-semibold text-amber-300 uppercase tracking-widest block mb-2">
            Global Travel Facilitation
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white mb-4">
            Visa Services
          </h1>
          <p className="text-xs sm:text-base text-emerald-100/90 font-light max-w-2xl mx-auto">
            Authorized electronic visa issuance and comprehensive visa file consultancy for Saudi Arabia, UAE, Turkey, and worldwide destinations.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {visaTypes.map((v) => (
            <div key={v.title} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-3">
                  <span className="text-xs font-bold px-3 py-1 bg-emerald-50 text-[#064e3b] rounded-full border border-emerald-200">
                    {v.duration}
                  </span>
                  <span className="text-xs text-amber-700 font-semibold flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {v.processing}
                  </span>
                </div>

                <h3 className="font-serif text-xl font-bold text-slate-900 mb-2">
                  {v.title}
                </h3>
                <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                  {v.description}
                </p>

                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Required Documents:
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-700 mb-6">
                  {v.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <a
                  href={`https://wa.me/923216001913?text=${encodeURIComponent(`Assalam-o-Alaikum Bin Riaz Elite Travel, I want to inquire about ${v.title} (${v.duration}, Processing: ${v.processing}). Please share requirements and charges.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-[#064e3b] hover:bg-[#022c22] text-[#f7e5a9] text-xs sm:text-sm font-bold rounded-xl flex items-center justify-center gap-2 shadow-sm hover:shadow transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-emerald-400 text-emerald-400" />
                  <span>Inquire on WhatsApp</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
