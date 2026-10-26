import React from "react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#fcfbf8] py-14 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <h1 className="font-serif text-2xl sm:text-4xl font-bold text-[#064e3b]">
          Terms & Conditions
        </h1>
        <p className="text-xs text-slate-500">Effective Date: October 2026</p>

        <section className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <h2 className="font-serif text-lg font-bold text-slate-900">1. Booking and Reservation</h2>
          <p>
            Submission of an online inquiry or requirement form does not constitute a guaranteed seat or confirmed reservation. Bookings are only finalized upon verified payment and issuance of formal confirmation vouchers by Bin Riaz Elite Travels & Tours.
          </p>

          <h2 className="font-serif text-lg font-bold text-slate-900">2. Rates and Currency Fluctuations</h2>
          <p>
            Package quotes are based on current airline tariff structures and Saudi Riyal (SAR) / foreign exchange rates. Unforeseen government tax increases or major currency devaluations prior to ticket issuance may result in price adjustments with advance notice.
          </p>

          <h2 className="font-serif text-lg font-bold text-slate-900">3. Visa Approval Authority</h2>
          <p>
            While our team executes full professional diligence, the ultimate approval, issuance, or rejection of any visa rests solely with the Ministry of Foreign Affairs (MoFA) and respective embassy immigration authorities.
          </p>
        </section>
      </div>
    </div>
  );
}
