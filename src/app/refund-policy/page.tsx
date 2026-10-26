import React from "react";

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-[#fcfbf8] py-14 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <h1 className="font-serif text-2xl sm:text-4xl font-bold text-[#064e3b]">
          Cancellation & Refund Policy
        </h1>
        <p className="text-xs text-slate-500">Effective Date: October 2026</p>

        <section className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <h2 className="font-serif text-lg font-bold text-slate-900">1. Airline Ticket Refunds</h2>
          <p>
            Flight ticket cancellations and refunds are strictly governed by the issuing airline’s fare rules (e.g. Non-refundable promotional fares vs standard changeable tickets). Airline penalty fees and administrative service charges apply.
          </p>

          <h2 className="font-serif text-lg font-bold text-slate-900">2. Hotel & Ground Transport Cancellations</h2>
          <p>
            During peak Umrah and Hajj seasons (e.g. Ramadan, Rajab, Sha’ban), hotels operate under strict non-refundable policies once confirmed. Standard season cancellations received 14 days prior to check-in may be eligible for partial refunds based on hotel discretion.
          </p>

          <h2 className="font-serif text-lg font-bold text-slate-900">3. Visa Fees</h2>
          <p>
            Visa processing fees charged by the Saudi Ministry of Hajj & Umrah or foreign embassies are non-refundable once submitted to the government visa system, regardless of approval status.
          </p>
        </section>
      </div>
    </div>
  );
}
