"use client";

import React, { useState } from "react";
import { Phone, Mail, MapPin, MessageCircle, Send, CheckCircle2 } from "lucide-react";
import { createInquiry } from "@/lib/db";
import confetti from "canvas-confetti";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await createInquiry({
      full_name: name,
      whatsapp_number: whatsapp,
      package_title: `Contact Form: ${subject || "General Inquiry"}`,
      special_requirements: message,
      status: "new",
      inquiry_type: "general"
    });

    setLoading(false);
    if (res.success) {
      setSubmitted(true);
      confetti({ particleCount: 70, spread: 60 });
      setName("");
      setWhatsapp("");
      setSubject("");
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfbf8] pb-16">
      <div className="py-14 sm:py-20 bg-[#022c22] text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <span className="text-xs font-semibold text-amber-300 uppercase tracking-widest block mb-2">
            Reach Out To Our Travel Experts
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white mb-4">
            Contact Us
          </h1>
          <p className="text-xs sm:text-base text-emerald-100/90 font-light max-w-2xl mx-auto">
            Get in touch with Malik Amir Riaz and our dedicated travel team for bookings, quotations, and inquiries.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Contact Details (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <h3 className="font-serif text-xl font-bold text-[#064e3b]">
                Office & Direct Helpline
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Main Helpline / WhatsApp</span>
                    <a href="tel:03216001913" className="text-sm font-bold text-slate-900 block hover:text-[#064e3b]">
                      0321-6001913
                    </a>
                    <a href="tel:03157801913" className="text-xs text-slate-500 block hover:text-[#064e3b]">
                      Office: 0315-7801913
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Direct WhatsApp</span>
                    <a
                      href="https://wa.me/923216001913"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-bold text-emerald-700 block hover:underline"
                    >
                      +92 321 6001913 (Malik Amir Riaz)
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Official Email</span>
                    <a href="mailto:info@binriazelitetravel.com" className="text-sm font-bold text-slate-900 block hover:text-[#064e3b]">
                      info@binriazelitetravel.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 text-slate-700 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Corporate Office</span>
                    <p className="text-xs text-slate-700 leading-relaxed font-medium">
                      Bin Riaz Group of Companies, Pakistan
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-4 border-t border-slate-100">
                <span className="text-xs font-semibold text-slate-700 block mb-2">Connect On Social Media:</span>
                <div className="flex items-center gap-2">
                  <a
                    href="https://www.facebook.com/profile.php?id=61592274299457"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-slate-100 text-xs font-bold text-slate-700 hover:bg-[#064e3b] hover:text-white"
                  >
                    Facebook
                  </a>
                  <a
                    href="https://www.instagram.com/binriazgroup"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-slate-100 text-xs font-bold text-slate-700 hover:bg-[#064e3b] hover:text-white"
                  >
                    Instagram
                  </a>
                  <a
                    href="https://www.tiktok.com/@binriazgroup"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-slate-100 text-xs font-bold text-slate-700 hover:bg-[#064e3b] hover:text-white"
                  >
                    TikTok
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="font-serif text-2xl font-bold text-[#064e3b] mb-2">
                Send Us a Direct Message
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                Fill in the details below and we will revert back on your phone/WhatsApp.
              </p>

              {submitted ? (
                <div className="p-8 text-center bg-emerald-50 rounded-2xl border border-emerald-200">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
                  <h4 className="font-serif text-lg font-bold text-[#064e3b]">Message Sent!</h4>
                  <p className="text-xs text-slate-600 mt-1">
                    JazakAllah Khair. Our team will review your message and contact your WhatsApp promptly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 text-xs font-semibold text-[#064e3b] underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Malik Amir Riaz"
                      className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">WhatsApp / Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      placeholder="0321-xxxxxxx"
                      className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Subject</label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="e.g. Umrah 15 Days / Dubai Package"
                      className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Your Message *</label>
                    <textarea
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Write your travel dates, passenger details or question here..."
                      className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 bg-[#064e3b] hover:bg-[#022c22] text-[#f7e5a9] font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>{loading ? "Sending..." : "Send Message"}</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
