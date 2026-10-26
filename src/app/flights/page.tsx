"use client";

import React, { useState } from "react";
import { Plane, Calendar, Users, Send, CheckCircle2, MessageCircle } from "lucide-react";
import { createInquiry } from "@/lib/db";
import confetti from "canvas-confetti";

export default function FlightsPage() {
  const [tripType, setTripType] = useState("Round Trip");
  const [fromCity, setFromCity] = useState("Islamabad (ISB)");
  const [toCity, setToCity] = useState("Jeddah (JED)");
  const [departDate, setDepartDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [cabinClass, setCabinClass] = useState("Economy");
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const desc = `Flight Inquiry: ${tripType} from ${fromCity} to ${toCity} | Depart: ${departDate} ${returnDate ? `| Return: ${returnDate}` : ''} | ${passengers} Passengers | Class: ${cabinClass}`;

    const res = await createInquiry({
      inquiry_type: "flight",
      package_title: desc,
      full_name: name,
      whatsapp_number: whatsapp,
      num_travelers: Number(passengers),
      departure_city: fromCity,
      travel_date: departDate,
      return_date: returnDate,
      special_requirements: desc,
      status: "new"
    });

    setLoading(false);
    if (res.success) {
      setSubmitted(true);
      confetti({ particleCount: 70, spread: 60 });
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfbf8] pb-16">
      <div className="py-14 sm:py-20 bg-[#022c22] text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <span className="text-xs font-semibold text-amber-300 uppercase tracking-widest block mb-2">
            Air Ticketing & Reservation
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white mb-4">
            Flight Booking & Inquiries
          </h1>
          <p className="text-xs sm:text-base text-emerald-100/90 font-light max-w-2xl mx-auto">
            Book domestic & international air tickets with leading airlines (Saudi Airlines, PIA, Emirates, Qatar Airways, Turkish Airlines, Flynas).
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <CheckCircle2 className="w-14 h-14 text-emerald-600 mx-auto" />
              <h3 className="font-serif text-2xl font-bold text-[#064e3b]">Flight Request Received!</h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                Thank you! Our ticketing team will check real-time airline fares and seat availability, and contact your WhatsApp shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-6 py-2.5 bg-[#064e3b] text-[#f7e5a9] text-xs font-semibold rounded-full"
              >
                Book Another Flight
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Trip Type Selector */}
              <div className="flex gap-4 border-b border-slate-100 pb-4">
                {["Round Trip", "One Way", "Group Booking"].map((t) => (
                  <label key={t} className="flex items-center gap-2 cursor-pointer text-xs sm:text-sm font-semibold text-slate-700">
                    <input
                      type="radio"
                      name="tripType"
                      checked={tripType === t}
                      onChange={() => setTripType(t)}
                      className="text-[#064e3b] focus:ring-[#064e3b]"
                    />
                    <span>{t}</span>
                  </label>
                ))}
              </div>

              {/* Route */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Departure From (شہر جہاں سے روانگی)</label>
                  <input
                    type="text"
                    required
                    value={fromCity}
                    onChange={(e) => setFromCity(e.target.value)}
                    placeholder="e.g. Islamabad (ISB), Lahore (LHE)"
                    className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Destination To (منزل)</label>
                  <input
                    type="text"
                    required
                    value={toCity}
                    onChange={(e) => setToCity(e.target.value)}
                    placeholder="e.g. Jeddah (JED), Madinah (MED), Dubai (DXB)"
                    className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              {/* Dates & Passengers */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Departure Date</label>
                  <input
                    type="date"
                    required
                    value={departDate}
                    onChange={(e) => setDepartDate(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl border border-slate-200"
                  />
                </div>
                {tripType === "Round Trip" && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Return Date</label>
                    <input
                      type="date"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      className="w-full text-xs p-3 rounded-xl border border-slate-200"
                    />
                  </div>
                )}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Passengers</label>
                  <input
                    type="number"
                    min={1}
                    value={passengers}
                    onChange={(e) => setPassengers(Number(e.target.value))}
                    className="w-full text-xs p-3 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              {/* Contact info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Passenger Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full name as per passport"
                    className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">WhatsApp Number *</label>
                  <input
                    type="tel"
                    required
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="0321-xxxxxxx"
                    className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-[#064e3b] hover:bg-[#022c22] text-[#f7e5a9] font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Plane className="w-4 h-4" />
                <span>{loading ? "Searching..." : "Get Live Flight Rates on WhatsApp"}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
