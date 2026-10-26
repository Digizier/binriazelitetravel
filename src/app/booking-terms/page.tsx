import React from "react";

export default function BookingTermsPage() {
  return (
    <div className="min-h-screen bg-[#fcfbf8] py-14 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <h1 className="font-serif text-2xl sm:text-4xl font-bold text-[#064e3b]">
          Booking Terms & Guidelines
        </h1>
        <p className="text-xs text-slate-500">Effective Date: October 2026</p>

        <section className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <h2 className="font-serif text-lg font-bold text-slate-900">1. Passport Validity</h2>
          <p>
            All international pilgrims and travelers must hold a valid machine-readable passport with at least six (6) months of validity from the planned date of departure.
          </p>

          <h2 className="font-serif text-lg font-bold text-slate-900">2. Hotel Check-In & Check-Out Hours</h2>
          <p>
            Standard hotel check-in time in Saudi Arabia is 4:00 PM and check-out time is 12:00 PM. Early check-in or late check-out is strictly subject to hotel room availability and may incur supplemental charges.
          </p>

          <h2 className="font-serif text-lg font-bold text-slate-900">3. Luggage Regulations</h2>
          <p>
            Travelers must comply with baggage weight allowances specified on their confirmed airline e-ticket (typically 2 bags of 23kg each for economy, plus Zamzam water allowance where certified).
          </p>
        </section>
      </div>
    </div>
  );
}
