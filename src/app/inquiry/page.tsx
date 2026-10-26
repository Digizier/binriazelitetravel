"use client";

import React, { useState } from "react";
import Link from "next/link";
import { createInquiry } from "@/lib/db";
import { uploadMedia } from "@/lib/image-compressor";
import { 
  FileText, 
  Send, 
  CheckCircle2, 
  Upload, 
  Camera, 
  Phone, 
  MessageCircle, 
  ShieldCheck, 
  Building2, 
  Bus, 
  MapPin, 
  Calendar,
  Sparkles,
  AlertCircle
} from "lucide-react";
import confetti from "canvas-confetti";

export default function InquiryRequirementPage() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [passportImageUrl, setPassportImageUrl] = useState("");

  // Form Fields
  const [fullName, setFullName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [passportNumber, setPassportNumber] = useState("");
  const [numTravelers, setNumTravelers] = useState(1);
  
  // Visa
  const [visaNeeded, setVisaNeeded] = useState("Yes");
  const [visaDays, setVisaDays] = useState("30");

  // Travel Plan
  const [departureCity, setDepartureCity] = useState("Islamabad");
  const [departureDate, setDepartureDate] = useState("");
  const [totalStayDays, setTotalStayDays] = useState("14");

  // Makkah
  const [makkahDays, setMakkahDays] = useState("7");
  const [makkahHotelCategory, setMakkahHotelCategory] = useState("Near Haram (حرم کے قریب)");
  const [makkahZiyarat, setMakkahZiyarat] = useState("Yes");

  // Madinah
  const [madinahDays, setMadinahDays] = useState("7");
  const [madinahHotelCategory, setMadinahHotelCategory] = useState("Near Masjid Nabawi (مسجد نبوی ﷺ کے قریب)");
  const [taifZiyarat, setTaifZiyarat] = useState("No");

  // Transport & Vehicle
  const [vehicleType, setVehicleType] = useState("Family Car (GMC / Innova)");

  // Package & Budget
  const [packageDuration, setPackageDuration] = useState("14 Days");
  const [budgetPerPerson, setBudgetPerPerson] = useState("");

  // Special Requirements
  const [wheelchair, setWheelchair] = useState("No");
  const [elderlyTravelers, setElderlyTravelers] = useState("No");
  const [childrenCount, setChildrenCount] = useState("0");
  const [notes, setNotes] = useState("");

  const handlePassportUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    setErrorMsg("");
    try {
      // Automatic client-side WebP compression and direct Supabase storage upload
      const url = await uploadMedia(file, "passports");
      setPassportImageUrl(url);
    } catch (err: any) {
      console.error("Passport upload error:", err);
      setErrorMsg("Failed to upload image. Please check connection.");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !whatsapp.trim()) {
      setErrorMsg("Please fill in Name and WhatsApp Number.");
      return;
    }

    setSubmitting(true);
    setErrorMsg("");

    const specialReqsCombined = [
      notes ? `Special Notes: ${notes}` : "",
      `Visa: ${visaNeeded} (${visaDays} Days)`,
      `Makkah: ${makkahDays} Days in ${makkahHotelCategory} (Ziyarat: ${makkahZiyarat})`,
      `Madinah: ${madinahDays} Days in ${madinahHotelCategory} (Taif Ziyarat: ${taifZiyarat})`,
      `Vehicle: ${vehicleType}`,
      `Wheelchair: ${wheelchair} | Elderly: ${elderlyTravelers} | Children: ${childrenCount}`
    ].filter(Boolean).join(" | ");

    const res = await createInquiry({
      inquiry_type: "umrah_custom",
      package_title: `Custom Requirement (${packageDuration} - ${departureCity})`,
      full_name: fullName,
      whatsapp_number: whatsapp,
      passport_number: passportNumber,
      num_travelers: Number(numTravelers),
      departure_city: departureCity,
      travel_date: departureDate,
      stay_duration: `${totalStayDays} Days`,
      makkah_hotel_pref: makkahHotelCategory,
      madinah_hotel_pref: madinahHotelCategory,
      transport_type: vehicleType,
      ziyarat_required: makkahZiyarat === "Yes",
      taif_required: taifZiyarat === "Yes",
      budget_per_person: budgetPerPerson,
      special_requirements: specialReqsCombined,
      passport_image_url: passportImageUrl,
      status: "new"
    });

    setSubmitting(false);

    if (res.success) {
      setSuccess(true);
      window.scrollTo(0, 0);
      if (document.documentElement) document.documentElement.scrollTop = 0;
      if (document.body) document.body.scrollTop = 0;
      confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
    } else {
      setErrorMsg(res.error || "Failed to submit form. Please retry.");
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfbf8] py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title with Official Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-[#d4af37]/20 border border-[#d4af37]/40 px-4 py-1.5 rounded-full mb-3 text-xs font-semibold text-[#064e3b]">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>🕋 Bin Riaz Elite Travels & Tours</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-4xl font-bold text-[#064e3b] mb-2">
            Umrah Booking Requirement Form
          </h1>
          <p className="font-serif text-sm sm:text-base text-[#996515] font-medium" dir="rtl">
            السلام علیکم ورحمۃ اللہ وبرکاتہ 🌹
          </p>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto mt-2 leading-relaxed" dir="rtl">
            محترم کسٹمر، آپ کی ضرورت کے مطابق بہترین عمرہ پیکیج، ویزا، ہوٹل اور ٹرانسپورٹ کی تفصیل دینے کے لیے براہِ کرم یہ فارم مکمل کریں۔
          </p>
        </div>

        {success ? (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl text-center max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-[#064e3b]">معلومات موصول ہو گئیں</h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
              JazakAllah Khair! ہماری ٹیم آپ کی ضرورت کے مطابق عمرہ ویزا، ہوٹل، ٹرانسپورٹ اور پیکیج کے دستیاب آپشنز تیار کرکے آپ کے واٹس ایپ پر رابطہ کرے گی۔
            </p>

            <div className="mt-6 pt-6 border-t border-slate-100 flex flex-col gap-3">
              <a
                href={`https://wa.me/923216001913?text=${encodeURIComponent(`Assalam-o-Alaikum, I just submitted the Umrah Requirement Form on your website for ${fullName} (${whatsapp}).`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 bg-[#064e3b] text-[#f7e5a9] rounded-2xl font-bold text-xs sm:text-sm shadow flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-emerald-400" />
                <span>Confirm on WhatsApp Immediately</span>
              </a>

              <button
                onClick={() => setSuccess(false)}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800"
              >
                Submit another request
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-8">
            
            {errorMsg && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* 1. PERSONAL DETAILS */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-amber-200 pb-2">
                <span className="w-7 h-7 rounded-full bg-[#064e3b] text-[#f7e5a9] text-xs font-bold flex items-center justify-center">1</span>
                <h3 className="font-serif text-base font-bold text-[#064e3b]">
                  Personal Details (ذاتی معلومات)
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Name (نام) *
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
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Mobile / WhatsApp (موبائل / واٹس ایپ) *
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

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Passport Number (پاسپورٹ نمبر)
                  </label>
                  <input
                    type="text"
                    value={passportNumber}
                    onChange={(e) => setPassportNumber(e.target.value)}
                    placeholder="e.g. AB1234567"
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#064e3b]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Number of Travelers (مسافروں کی تعداد)
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={numTravelers}
                    onChange={(e) => setNumTravelers(Number(e.target.value))}
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#064e3b]"
                  />
                </div>
              </div>
            </div>

            {/* 2. VISA REQUIREMENTS */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-amber-200 pb-2">
                <span className="w-7 h-7 rounded-full bg-[#064e3b] text-[#f7e5a9] text-xs font-bold flex items-center justify-center">2</span>
                <h3 className="font-serif text-base font-bold text-[#064e3b]">
                  Visa Requirements (ویزا معلومات)
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Do you require a visa? (ویزا چاہیے؟)
                  </label>
                  <select
                    value={visaNeeded}
                    onChange={(e) => setVisaNeeded(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#064e3b] bg-white"
                  >
                    <option value="Yes">Yes (ہاں)</option>
                    <option value="No">No, already have visa (نہیں، ویزا موجود ہے)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Visa Duration (کتنے دن کا ویزا؟)
                  </label>
                  <select
                    value={visaDays}
                    onChange={(e) => setVisaDays(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#064e3b] bg-white"
                  >
                    <option value="30">30 Days (Umrah Electronic)</option>
                    <option value="90">90 Days (Tourist Multi-Entry)</option>
                    <option value="14">14 Days Short Stay</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 3. TRAVEL PLAN */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-amber-200 pb-2">
                <span className="w-7 h-7 rounded-full bg-[#064e3b] text-[#f7e5a9] text-xs font-bold flex items-center justify-center">3</span>
                <h3 className="font-serif text-base font-bold text-[#064e3b]">
                  Travel Plan (سفر کا منصوبہ)
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Departure City (روانگی کا شہر)
                  </label>
                  <input
                    type="text"
                    value={departureCity}
                    onChange={(e) => setDepartureCity(e.target.value)}
                    placeholder="e.g. Islamabad, Lahore, Karachi"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#064e3b]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Expected Travel Date (متوقع تاریخ)
                  </label>
                  <input
                    type="date"
                    value={departureDate}
                    onChange={(e) => setDepartureDate(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#064e3b]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Total Stay Days (کل قیام)
                  </label>
                  <select
                    value={totalStayDays}
                    onChange={(e) => setTotalStayDays(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#064e3b] bg-white"
                  >
                    <option value="10">10 Days</option>
                    <option value="12">12 Days</option>
                    <option value="14">14-15 Days</option>
                    <option value="21">21 Days</option>
                    <option value="25">25 Days</option>
                    <option value="30">30 Days</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 4. MAKKAH & MADINAH HOTELS */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-amber-200 pb-2">
                <span className="w-7 h-7 rounded-full bg-[#064e3b] text-[#f7e5a9] text-xs font-bold flex items-center justify-center">4</span>
                <h3 className="font-serif text-base font-bold text-[#064e3b]">
                  Makkah & Madinah Hotels (مکہ و مدینہ ہوٹل ترجیح)
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                  <span className="font-bold text-xs text-amber-700 flex items-center gap-1.5">
                    <Building2 className="w-4 h-4" /> Makkah Hotel (مکہ ہوٹل)
                  </span>
                  <div>
                    <label className="block text-[11px] text-slate-500 mb-1">Category / Distance</label>
                    <select
                      value={makkahHotelCategory}
                      onChange={(e) => setMakkahHotelCategory(e.target.value)}
                      className="w-full text-xs p-2 rounded-lg border bg-white"
                    >
                      <option value="Near Haram (حرم کے قریب 50m-200m)">Near Haram (حرم کے قریب 50m-200m)</option>
                      <option value="Normal 4-Star (300m-500m)">Normal 4-Star (300m-500m)</option>
                      <option value="Budget with Shuttle (بجٹ فری شٹل)">Budget with Free Shuttle (بجٹ فری شٹل)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-500 mb-1">Makkah Ziyarat? (مکہ زیارات؟)</label>
                    <select
                      value={makkahZiyarat}
                      onChange={(e) => setMakkahZiyarat(e.target.value)}
                      className="w-full text-xs p-2 rounded-lg border bg-white"
                    >
                      <option value="Yes">Yes (ہاں)</option>
                      <option value="No">No (نہیں)</option>
                    </select>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                  <span className="font-bold text-xs text-emerald-700 flex items-center gap-1.5">
                    <Building2 className="w-4 h-4" /> Madinah Hotel (مدینہ ہوٹل)
                  </span>
                  <div>
                    <label className="block text-[11px] text-slate-500 mb-1">Category / Distance</label>
                    <select
                      value={madinahHotelCategory}
                      onChange={(e) => setMadinahHotelCategory(e.target.value)}
                      className="w-full text-xs p-2 rounded-lg border bg-white"
                    >
                      <option value="Near Masjid Nabawi (مسجد نبوی ﷺ کے قریب)">Near Masjid Nabawi (مسجد نبوی ﷺ کے قریب)</option>
                      <option value="Markazia 4-Star (مرکزیہ)">Markazia 4-Star (مرکزیہ 150m-300m)</option>
                      <option value="Budget Walking (بجٹ واکنگ فاصلہ)">Budget Walking (بجٹ واکنگ فاصلہ)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-500 mb-1">Taif Ziyarat? (طائف زیارات؟)</label>
                    <select
                      value={taifZiyarat}
                      onChange={(e) => setTaifZiyarat(e.target.value)}
                      className="w-full text-xs p-2 rounded-lg border bg-white"
                    >
                      <option value="No">No (نہیں)</option>
                      <option value="Yes">Yes (ہاں)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* 5. TRANSPORT & BUDGET */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-amber-200 pb-2">
                <span className="w-7 h-7 rounded-full bg-[#064e3b] text-[#f7e5a9] text-xs font-bold flex items-center justify-center">5</span>
                <h3 className="font-serif text-base font-bold text-[#064e3b]">
                  Transport & Budget (گاڑی و بجٹ)
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Transport Vehicle (گاڑی کی قسم)
                  </label>
                  <select
                    value={vehicleType}
                    onChange={(e) => setVehicleType(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white"
                  >
                    <option value="Family Private Car (GMC / Innova)">Private Family Car (GMC / Innova)</option>
                    <option value="VIP Hiace (8-12 Seater)">Private Hiace (8-12 Seater)</option>
                    <option value="Sharing Group Luxury Bus">Sharing Group Luxury Bus (شیئرنگ لگژری بس)</option>
                    <option value="Small Sedan Car">Small Car (Sedan)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Budget Per Person (فی فرد تقریباً بجٹ روپے)
                  </label>
                  <input
                    type="text"
                    value={budgetPerPerson}
                    onChange={(e) => setBudgetPerPerson(e.target.value)}
                    placeholder="e.g. 200,000 to 250,000 PKR"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#064e3b]"
                  />
                </div>
              </div>
            </div>

            {/* 6. PASSPORT ATTACHMENT WITH WEBP COMPRESSION */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-amber-200 pb-2">
                <span className="w-7 h-7 rounded-full bg-[#064e3b] text-[#f7e5a9] text-xs font-bold flex items-center justify-center">6</span>
                <h3 className="font-serif text-base font-bold text-[#064e3b]">
                  Passport / Document Photo (پاسپورٹ کی واضح تصویر)
                </h3>
              </div>

              <div className="p-5 border-2 border-dashed border-amber-300 rounded-2xl bg-amber-50/40 text-center">
                {passportImageUrl ? (
                  <div className="space-y-3">
                    <img 
                      src={passportImageUrl} 
                      alt="Passport Uploaded" 
                      className="h-28 mx-auto rounded-lg object-contain border border-slate-300 shadow" 
                    />
                    <p className="text-xs text-emerald-700 font-semibold flex items-center justify-center gap-1">
                      <CheckCircle2 className="w-4 h-4" />
                      Passport Image Attached Successfully!
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                      <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-700 text-[#f7e5a9] text-xs font-semibold rounded-lg cursor-pointer hover:bg-emerald-800 transition-colors">
                        <Camera className="w-3 h-3" />
                        <span>Camera</span>
                        <input type="file" accept="image/*" capture="environment" onChange={handlePassportUpload} className="hidden" />
                      </label>
                      <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-700 text-white text-xs font-semibold rounded-lg cursor-pointer hover:bg-slate-800 transition-colors">
                        <Upload className="w-3 h-3" />
                        <span>Gallery</span>
                        <input type="file" accept="image/*" onChange={handlePassportUpload} className="hidden" />
                      </label>
                    </div>
                  </div>
                ) : (
                  <div>
                    <Camera className="w-10 h-10 text-amber-600 mx-auto mb-2" />
                    <p className="text-xs font-bold text-slate-700">
                      پاسپورٹ یا شناختی کارڈ کی تصویر منسلک کریں
                    </p>
                    <p className="text-[11px] text-slate-500 mt-1 mb-4">
                      Choose from Photo Gallery or snap a direct picture with your phone camera. (Compressed to KBs automatically).
                    </p>
                    
                    {/* Two Clear Options for Mobile & Desktop */}
                    <div className="flex flex-wrap items-center justify-center gap-3">
                      {/* Option 1: Mobile Camera */}
                      <label className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#064e3b] text-[#f7e5a9] text-xs font-bold rounded-xl cursor-pointer hover:bg-[#022c22] transition-all shadow-sm">
                        <Camera className="w-4 h-4 text-amber-300" />
                        <span>{uploadingImage ? "Compressing..." : "📷 Take Photo (Camera)"}</span>
                        <input 
                          type="file" 
                          accept="image/*" 
                          capture="environment"
                          disabled={uploadingImage}
                          onChange={handlePassportUpload} 
                          className="hidden" 
                        />
                      </label>

                      {/* Option 2: Gallery / Files */}
                      <label className="inline-flex items-center gap-2 px-4 py-2.5 bg-amber-600 text-white text-xs font-bold rounded-xl cursor-pointer hover:bg-amber-700 transition-all shadow-sm">
                        <Upload className="w-4 h-4" />
                        <span>{uploadingImage ? "Compressing..." : "🖼️ Choose from Gallery"}</span>
                        <input 
                          type="file" 
                          accept="image/*" 
                          disabled={uploadingImage}
                          onChange={handlePassportUpload} 
                          className="hidden" 
                        />
                      </label>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 7. SPECIAL REQUIREMENTS */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Any Special Requirements / کوئی خاص ضرورت؟
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Wheelchair needed, elderly passengers, connecting rooms, special airline preference..."
                className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#064e3b]"
              />
            </div>

            <button
              type="submit"
              disabled={submitting || uploadingImage}
              className="w-full py-4 bg-[#064e3b] hover:bg-[#022c22] text-[#f7e5a9] font-bold text-sm sm:text-base rounded-2xl shadow-xl shadow-emerald-950/20 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{submitting ? "Submitting Requirement..." : "Submit Requirement Form (فارم جمع کروائیں)"}</span>
            </button>

          </form>
        )}

      </div>
    </div>
  );
}
