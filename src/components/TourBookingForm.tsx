"use client";

import React, { useState } from "react";
import { createInquiry } from "@/lib/db";
import { Package } from "@/types";
import { 
  Send, 
  CheckCircle2, 
  PhoneCall, 
  Users, 
  MapPin, 
  Calendar, 
  Bed, 
  Sparkles,
  AlertCircle
} from "lucide-react";
import { WhatsAppSolidIcon } from "@/components/icons/SocialIcons";
import confetti from "canvas-confetti";

interface TourBookingFormProps {
  pkg: Package;
}

export default function TourBookingForm({ pkg }: TourBookingFormProps) {
  const [fullName, setFullName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [departureCity, setDepartureCity] = useState("Islamabad");
  const [numTravelers, setNumTravelers] = useState("2");
  const [travelDate, setTravelDate] = useState("");
  const [roomType, setRoomType] = useState("Double / Twin Sharing");
  const [specialReqs, setSpecialReqs] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !whatsapp.trim()) {
      setErrorMsg("Please provide your Full Name and WhatsApp Number.");
      return;
    }

    setSubmitting(true);
    setErrorMsg("");

    const combinedNotes = [
      `=== ✈️ TOUR BOOKING INQUIRY ===`,
      `🌍 Tour Package: ${pkg.title}`,
      `⏱️ Duration: ${pkg.duration}`,
      `🏨 Room Preference: ${roomType}`,
      `✈️ Departure City: ${departureCity || "Pakistan"}`,
      `📅 Travel Date: ${travelDate || "Flexible"}`,
      `👥 Total Travelers: ${numTravelers || 1} Persons`,
      specialReqs ? `\n📝 Special Requests: ${specialReqs}` : ""
    ].filter(Boolean).join("\n");

    const res = await createInquiry({
      inquiry_type: "package_booking",
      package_title: `Tour: ${pkg.title}`,
      package_id: pkg.id,
      full_name: fullName,
      whatsapp_number: whatsapp,
      departure_city: departureCity,
      travel_date: travelDate,
      num_travelers: Number(numTravelers) || 1,
      stay_duration: pkg.duration,
      special_requirements: combinedNotes,
      status: "new"
    });

    setSubmitting(false);

    if (res.success) {
      setSuccess(true);
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      if (document.documentElement) document.documentElement.scrollTop = 0;
      if (document.body) document.body.scrollTop = 0;
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
    } else {
      setErrorMsg(res.error || "Failed to submit booking inquiry. Please try again.");
    }
  };

  const waFollowUpText = encodeURIComponent(
    `Assalam-o-Alaikum Bin Riaz Elite Travel, I just submitted an inquiry for "${pkg.title}" (${pkg.duration}, Price: ${pkg.currency} ${pkg.price?.toLocaleString()}). Traveler Name: ${fullName}, Persons: ${numTravelers}. Please share quotation & details.`
  );
  const waFollowUpUrl = `https://wa.me/923216001913?text=${waFollowUpText}`;

  if (success) {
    return (
      <div className="bg-emerald-50 border-2 border-emerald-300 rounded-3xl p-6 sm:p-8 text-center space-y-4 animate-in fade-in duration-300">
        <div className="w-14 h-14 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#064e3b]">
          Tour Inquiry Submitted Successfully!
        </h3>
        <p className="text-xs sm:text-sm text-slate-700 max-w-md mx-auto leading-relaxed">
          Thank you <strong className="text-slate-900">{fullName}</strong>. Your tour inquiry for <strong className="text-[#064e3b]">{pkg.title}</strong> has been received and registered under our official booking desk.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={waFollowUpUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#064e3b] hover:bg-[#022c22] text-[#f7e5a9] px-6 py-3 rounded-full text-xs sm:text-sm font-bold shadow-md transition-all"
          >
            <WhatsAppSolidIcon size={18} className="text-[#25D366]" />
            <span>Connect on WhatsApp for Instant Confirmation</span>
          </a>

          <button
            type="button"
            onClick={() => setSuccess(false)}
            className="text-xs text-slate-500 hover:text-slate-800 underline py-2"
          >
            Submit Another Inquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-lg p-6 sm:p-8 space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-[#996515] border border-amber-200 rounded-full text-xs font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Tour Booking & Customization</span>
        </div>
        <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#064e3b]">
          Book or Customize this Tour
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Fill in your details below. Our tour consultant will provide flight options, visa assistance, and customized itinerary.
        </p>
      </div>

      {errorMsg && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Row 1: Name & WhatsApp */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Full Name (پورا نام) *
            </label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Muhammad Riaz"
              className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#064e3b]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              WhatsApp / Mobile Number *
            </label>
            <input
              type="tel"
              required
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              placeholder="0321-xxxxxxx"
              className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#064e3b]"
            />
          </div>
        </div>

        {/* Row 2: Departure City & Travelers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-amber-600" />
              <span>Departure City (روانگی کا شہر)</span>
            </label>
            <select
              value={departureCity}
              onChange={(e) => setDepartureCity(e.target.value)}
              className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#064e3b]"
            >
              <option value="Islamabad">Islamabad (ISB)</option>
              <option value="Lahore">Lahore (LHE)</option>
              <option value="Karachi">Karachi (KHI)</option>
              <option value="Sialkot">Sialkot (SKT)</option>
              <option value="Multan">Multan (MUX)</option>
              <option value="Peshawar">Peshawar (PEW)</option>
              <option value="Faisalabad">Faisalabad (LYP)</option>
              <option value="Other">Other City</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-emerald-600" />
              <span>Number of Travelers (مسافروں کی تعداد)</span>
            </label>
            <select
              value={numTravelers}
              onChange={(e) => setNumTravelers(e.target.value)}
              className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#064e3b]"
            >
              <option value="1">1 Person (Solo)</option>
              <option value="2">2 Persons (Couple / Friends)</option>
              <option value="3">3 Persons</option>
              <option value="4">4 Persons (Family)</option>
              <option value="5">5 Persons</option>
              <option value="6+">6+ Persons (Group)</option>
            </select>
          </div>
        </div>

        {/* Row 3: Travel Date & Room Type */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-amber-600" />
              <span>Preferred Travel Date / Month</span>
            </label>
            <input
              type="date"
              value={travelDate}
              onChange={(e) => setTravelDate(e.target.value)}
              className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#064e3b]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
              <Bed className="w-3.5 h-3.5 text-emerald-600" />
              <span>Room Preference</span>
            </label>
            <select
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
              className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#064e3b]"
            >
              <option value="Double / Twin Sharing">Double / Twin Sharing (2 Persons)</option>
              <option value="Triple Room">Triple Sharing (3 Persons)</option>
              <option value="Quad Family Room">Quad Family Room (4 Persons)</option>
              <option value="Single Private Room">Single Private Room</option>
            </select>
          </div>
        </div>

        {/* Special Notes */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Any Special Requests / Additional Services (کوئی خاص خواہش یا سوال)
          </label>
          <textarea
            rows={2}
            value={specialReqs}
            onChange={(e) => setSpecialReqs(e.target.value)}
            placeholder="e.g. Visa assistance required, child with bed, extra night in Istanbul, vegetarian meal preference..."
            className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#064e3b]"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3.5 bg-[#064e3b] hover:bg-[#022c22] text-[#f7e5a9] font-bold text-sm sm:text-base rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <Send className="w-4 h-4 text-amber-300" />
          <span>{submitting ? "Submitting Inquiry..." : "Submit Tour Inquiry & Get Quotation"}</span>
        </button>
      </form>
    </div>
  );
}
