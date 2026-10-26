import React from "react";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#fcfbf8] py-14 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <h1 className="font-serif text-2xl sm:text-4xl font-bold text-[#064e3b]">
          Privacy Policy
        </h1>
        <p className="text-xs text-slate-500">Last updated: October 2026</p>

        <section className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <h2 className="font-serif text-lg font-bold text-slate-900">1. Information We Collect</h2>
          <p>
            Bin Riaz Elite Travels & Tours collects personal information including full name, contact numbers (WhatsApp and phone), passport numbers, flight preferences, and passport image attachments submitted solely for facilitating visa issuance, air ticketing, and hotel reservations.
          </p>

          <h2 className="font-serif text-lg font-bold text-slate-900">2. How We Protect Your Data</h2>
          <p>
            We strictly protect all customer information. We do not sell, rent, or lease customer data to third-party marketing companies. Data is shared only with official embassy visa portals, airlines, and registered hotel operators required for completing your bookings.
          </p>

          <h2 className="font-serif text-lg font-bold text-slate-900">3. Contact for Inquiries</h2>
          <p>
            For any privacy-related requests or data deletion questions, please email us at <strong>info@binriazelitetravel.com</strong> or call <strong>0321-6001913</strong>.
          </p>
        </section>
      </div>
    </div>
  );
}
