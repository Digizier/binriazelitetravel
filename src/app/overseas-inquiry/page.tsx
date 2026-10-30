"use client";

import React, { useState } from "react";
import Link from "next/link";
import { createInquiry } from "@/lib/db";
import { uploadMedia } from "@/lib/image-compressor";
import { 
  Globe, 
  Send, 
  CheckCircle2, 
  Upload, 
  Camera, 
  Phone, 
  ShieldCheck, 
  Briefcase, 
  GraduationCap, 
  Plane, 
  MapPin, 
  Calendar,
  Sparkles,
  AlertCircle,
  FileText,
  User,
  CreditCard,
  Clock,
  Car
} from "lucide-react";
import { WhatsAppSolidIcon } from "@/components/icons/SocialIcons";
import confetti from "canvas-confetti";

export default function OverseasInquiryPage() {
  // 1. Country Selection
  const [country, setCountry] = useState("Saudi Arabia (سعودی عرب)");
  const [otherCountry, setOtherCountry] = useState("");

  // 2. Visa Category
  const [visaCategory, setVisaCategory] = useState<"Work Visa" | "Study Visa" | "Visit Visa">("Work Visa");

  // 3. Personal Details
  const [fullName, setFullName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [age, setAge] = useState("");
  const [city, setCity] = useState("");
  const [hasPassport, setHasPassport] = useState("Yes");
  const [passportExpiry, setPassportExpiry] = useState("");

  // 4. Education & Experience
  const [education, setEducation] = useState("Matric (میٹرک)");
  const [profession, setProfession] = useState("");
  const [experienceYears, setExperienceYears] = useState("3-5 Years (سال)");
  const [hasDrivingLicense, setHasDrivingLicense] = useState("No");
  const [licenseType, setLicenseType] = useState("None (کوئی نہیں)");

  // 5. Work Visa Questions
  const [desiredJob, setDesiredJob] = useState("");
  const [hasCertificate, setHasCertificate] = useState("Yes");
  const [companyEmployment, setCompanyEmployment] = useState("Yes");

  // 6. Study Visa Questions
  const [studyCountry, setStudyCountry] = useState("");
  const [lastDegree, setLastDegree] = useState("");
  const [desiredCourse, setDesiredCourse] = useState("");

  // 7. Visit Visa Questions
  const [visitReason, setVisitReason] = useState("Tourism (سیاحت)");
  const [visitDuration, setVisitDuration] = useState("30 Days (دن)");
  const [hasHostOrRelative, setHasHostOrRelative] = useState("No");

  // 8. Application & Budget
  const [departureTimeline, setDepartureTimeline] = useState("Within 1 Month (1 ماہ کے اندر)");
  const [estimatedBudget, setEstimatedBudget] = useState("");
  const [wantFeeDetails, setWantFeeDetails] = useState("Yes");

  // 9. Document / Photo Upload
  const [documentImageUrl, setDocumentImageUrl] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);

  // 10. Additional notes
  const [additionalNotes, setAdditionalNotes] = useState("");

  // Form Submission State
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const countriesList = [
    { name: "Saudi Arabia (سعودی عرب)", flag: "🇸🇦" },
    { name: "Qatar (قطر)", flag: "🇶🇦" },
    { name: "Bahrain (بحرین)", flag: "🇧🇭" },
    { name: "Oman / Muscat (عمان / مسقط)", flag: "🇴🇲" },
    { name: "UAE / Dubai (دبئی / یو اے ای)", flag: "🇦🇪" },
    { name: "Turkey (ترکی)", flag: "🇹🇷" },
    { name: "Uzbekistan (ازبکستان)", flag: "🇺🇿" },
    { name: "Kuwait (کویت)", flag: "🇰🇼" },
    { name: "Malaysia (ملائیشیا)", flag: "🇲🇾" },
    { name: "Other (دیگر ملک)", flag: "🌍" },
  ];

  const handleDocumentUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingImage(true);
      setErrorMsg("");
      const publicUrl = await uploadMedia(file, "overseas_inquiries");
      setDocumentImageUrl(publicUrl);
    } catch (err: any) {
      setErrorMsg("Failed to upload document. Please ensure file is an image.");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim() || !whatsapp.trim()) {
      setErrorMsg("Please fill in your Full Name and WhatsApp Number (براہ کرم اپنا نام اور واٹس ایپ نمبر درج کریں).");
      return;
    }

    setSubmitting(true);
    setErrorMsg("");

    const targetCountry = country === "Other (دیگر ملک)" ? `Other: ${otherCountry || "Not specified"}` : country;

    // Structured Details formatted cleanly for admin readability
    const structuredSummary = [
      `=== OVERSEAS VISA & TRAVEL APPLICATION ===`,
      `🌍 Country: ${targetCountry}`,
      `💼 Visa Category: ${visaCategory}`,
      ``,
      `👤 PERSONAL DETAILS:`,
      `• Name: ${fullName}`,
      `• WhatsApp: ${whatsapp}`,
      `• Age: ${age || "Not specified"}`,
      `• City: ${city || "Not specified"}`,
      `• Passport Available: ${hasPassport} ${passportExpiry ? `(Expiry: ${passportExpiry})` : ""}`,
      ``,
      `🎓 EDUCATION & EXPERIENCE:`,
      `• Qualification: ${education}`,
      `• Profession/Skill: ${profession || "Not specified"}`,
      `• Experience: ${experienceYears}`,
      `• Driving License: ${hasDrivingLicense} (Type: ${licenseType})`,
      ``,
      visaCategory === "Work Visa" ? [
        `💼 WORK VISA SPECIFICS:`,
        `• Desired Job: ${desiredJob || "Open to suggestions"}`,
        `• Relevant Certificate/Exp: ${hasCertificate}`,
        `• Company Employment Preferred: ${companyEmployment}`,
      ].join("\n") : "",
      visaCategory === "Study Visa" ? [
        `🎓 STUDY VISA SPECIFICS:`,
        `• Preferred Study Country: ${studyCountry || targetCountry}`,
        `• Last Completed Degree: ${lastDegree || education}`,
        `• Desired Course/Degree: ${desiredCourse || "Not specified"}`,
      ].join("\n") : "",
      visaCategory === "Visit Visa" ? [
        `🛂 VISIT VISA SPECIFICS:`,
        `• Reason for Visit: ${visitReason}`,
        `• Duration of Stay: ${visitDuration}`,
        `• Host / Relative in Country: ${hasHostOrRelative}`,
      ].join("\n") : "",
      ``,
      `💰 BUDGET & APPLICATION:`,
      `• Expected Departure: ${departureTimeline}`,
      `• Estimated Budget: ${estimatedBudget ? `${estimatedBudget} PKR` : "To be discussed"}`,
      `• Wants Complete Fee Details: ${wantFeeDetails}`,
      additionalNotes ? `\n📝 Additional Notes: ${additionalNotes}` : "",
      documentImageUrl ? `\n📎 Document Proof Uploaded: Attached` : ""
    ].filter(Boolean).join("\n");

    const res = await createInquiry({
      inquiry_type: "overseas_visa",
      package_title: `Overseas ${visaCategory} - ${targetCountry}`,
      full_name: fullName,
      whatsapp_number: whatsapp,
      passport_number: hasPassport === "Yes" ? (passportExpiry ? `Exp: ${passportExpiry}` : "Valid Passport") : "No Passport Yet",
      num_travelers: 1,
      departure_city: city,
      travel_date: departureTimeline,
      stay_duration: visaCategory === "Visit Visa" ? visitDuration : undefined,
      budget_per_person: estimatedBudget ? `${estimatedBudget} PKR` : undefined,
      special_requirements: structuredSummary,
      passport_image_url: documentImageUrl || undefined,
      status: "new"
    });

    setSubmitting(false);

    if (res.success) {
      setSuccess(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
      if (document.documentElement) document.documentElement.scrollTop = 0;
      if (document.body) document.body.scrollTop = 0;
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    } else {
      setErrorMsg(res.error || "Failed to submit form. Please retry or contact us directly on WhatsApp.");
    }
  };

  const selectedCountryName = country === "Other (دیگر ملک)" ? (otherCountry || "Other Country") : country;
  const waPrefillText = encodeURIComponent(
    `Assalam-o-Alaikum Bin Riaz Elite Travel, I just submitted the Overseas Visa & Travel Form for ${fullName} (${whatsapp}). Target: ${selectedCountryName} - ${visaCategory}. Please confirm receipt and share guidance.`
  );
  const waUrl = `https://wa.me/923216001913?text=${waPrefillText}`;

  return (
    <div className="min-h-screen bg-[#fcfbf8] py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title with Official Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-[#d4af37]/20 border border-[#d4af37]/40 px-4 py-1.5 rounded-full mb-3 text-xs font-semibold text-[#064e3b]">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>🌍 Bin Riaz Elite Travels & Tours ✈️</span>
          </div>
          
          <h1 className="font-serif text-2xl sm:text-4xl font-extrabold text-[#064e3b] tracking-tight mb-2">
            Overseas Visa & Travel Requirement Form
          </h1>
          
          <p className="font-serif text-sm sm:text-base text-[#996515] font-semibold" dir="rtl">
            السلام علیکم ورحمۃ اللہ وبرکاتہ 🌹
          </p>
          
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto mt-2 leading-relaxed" dir="rtl">
            محترم کسٹمر! بیرونِ ملک آپ کی ضرورت کے مطابق ویزا، ملازمت، تعلیم یا وزٹ کی معلومات اور اخراجات بتانے کے لیے براہِ کرم درج ذیل فارم مکمل کرکے بھیج دیں۔
          </p>
        </div>

        {/* Success Feedback View */}
        {success ? (
          <div className="bg-white p-6 sm:p-10 rounded-3xl border border-emerald-200 shadow-xl text-center space-y-6 animate-in fade-in zoom-in-95 duration-300">
            <div className="w-16 h-16 bg-emerald-100 text-[#064e3b] rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10 text-emerald-600" />
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold text-[#064e3b]">
                فارم کامیابی سے موصول ہو گیا ہے!
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-md mx-auto leading-relaxed">
                شکریہ <span className="font-bold text-slate-900">{fullName}</span>! آپ کی معلومات موصول ہو چکی ہیں۔ ہماری ٹیم آپ کی ضرورت کے مطابق ویزا اور اخراجات کی تفصیلات کے ساتھ جلد رابطہ کرے گی۔
              </p>
            </div>

            <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 text-xs text-left max-w-md mx-auto space-y-1.5">
              <p className="font-bold text-[#996515]">Application Summary:</p>
              <p className="text-slate-700"><strong>Target Country:</strong> {selectedCountryName}</p>
              <p className="text-slate-700"><strong>Visa Type:</strong> {visaCategory}</p>
              <p className="text-slate-700"><strong>WhatsApp:</strong> {whatsapp}</p>
              <p className="text-slate-700"><strong>Applicant:</strong> {fullName} ({city || "Pakistan"})</p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all"
              >
                <WhatsAppSolidIcon size={18} className="text-white" />
                <span>Confirm on WhatsApp Immediately</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  setSuccess(false);
                  setFullName("");
                  setWhatsapp("");
                  setDocumentImageUrl("");
                }}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                Submit Another Inquiry
              </button>
            </div>

            <div className="pt-4 border-t border-slate-100 text-xs text-slate-500">
              Direct Helpline: <strong>Malik Aamir Riaz</strong> (0321-6001913) | Office: 0315-7801913
            </div>
          </div>
        ) : (
          /* Main Requirement Form */
          <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-xl space-y-8">
            
            {errorMsg && (
              <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* 1. COUNTRY SELECTION */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-amber-200 pb-2">
                <span className="w-7 h-7 rounded-full bg-[#064e3b] text-[#f7e5a9] text-xs font-bold flex items-center justify-center shadow-sm">
                  1
                </span>
                <h3 className="font-serif text-base sm:text-lg font-bold text-[#064e3b] flex items-center gap-1.5">
                  <Globe className="w-4 h-4 text-amber-600" />
                  <span>Country Selection — مطلوبہ ملک</span>
                </h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
                {countriesList.map((c) => {
                  const isSelected = country === c.name;
                  return (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => setCountry(c.name)}
                      className={`p-3 rounded-2xl border text-left transition-all flex flex-col items-center justify-center gap-1 text-center ${
                        isSelected 
                          ? "bg-emerald-50/90 border-[#064e3b] text-[#064e3b] ring-2 ring-emerald-500/30 font-bold shadow-sm" 
                          : "border-slate-200 bg-white text-slate-700 hover:border-amber-400 hover:bg-slate-50"
                      }`}
                    >
                      <span className="text-2xl">{c.flag}</span>
                      <span className="text-[11px] leading-tight line-clamp-2">{c.name}</span>
                    </button>
                  );
                })}
              </div>

              {country === "Other (دیگر ملک)" && (
                <div className="pt-2 animate-in fade-in duration-200">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Please Specify Desired Country (دیگر ملک کا نام درج کریں)
                  </label>
                  <input
                    type="text"
                    value={otherCountry}
                    onChange={(e) => setOtherCountry(e.target.value)}
                    placeholder="e.g. UK, Canada, Italy, Japan..."
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#064e3b]"
                  />
                </div>
              )}
            </div>

            {/* 2. VISA CATEGORY */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-amber-200 pb-2">
                <span className="w-7 h-7 rounded-full bg-[#064e3b] text-[#f7e5a9] text-xs font-bold flex items-center justify-center shadow-sm">
                  2
                </span>
                <h3 className="font-serif text-base sm:text-lg font-bold text-[#064e3b] flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4 text-amber-600" />
                  <span>Visa Category — ویزا کی قسم</span>
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: "Work Visa", label: "Work Visa (ورک ویزا / ملازمت)", desc: "Job, company contract, professional employment", icon: Briefcase },
                  { id: "Study Visa", label: "Study Visa (اسٹڈی ویزا / تعلیم)", desc: "Colleges, Universities, diploma courses", icon: GraduationCap },
                  { id: "Visit Visa", label: "Visit Visa (وزٹ ویزا)", desc: "Tourism, family visit, business exploration", icon: Plane },
                ].map((item) => {
                  const isSelected = visaCategory === item.id;
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setVisaCategory(item.id as any)}
                      className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                        isSelected 
                          ? "bg-emerald-50 border-[#064e3b] ring-2 ring-emerald-500/30 text-[#064e3b] shadow-sm" 
                          : "border-slate-200 bg-white text-slate-700 hover:border-amber-300"
                      }`}
                    >
                      <div className="flex items-center justify-between w-full mb-2">
                        <Icon className={`w-5 h-5 ${isSelected ? "text-emerald-700" : "text-slate-400"}`} />
                        <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${isSelected ? "border-emerald-600 bg-emerald-600 text-white" : "border-slate-300"}`}>
                          {isSelected && <span className="w-1.5 h-1.5 bg-white rounded-full" />}
                        </span>
                      </div>
                      <span className="font-serif text-sm font-bold block">{item.label}</span>
                      <span className="text-[10px] text-slate-500 mt-0.5">{item.desc}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. PERSONAL DETAILS */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-amber-200 pb-2">
                <span className="w-7 h-7 rounded-full bg-[#064e3b] text-[#f7e5a9] text-xs font-bold flex items-center justify-center shadow-sm">
                  3
                </span>
                <h3 className="font-serif text-base sm:text-lg font-bold text-[#064e3b] flex items-center gap-1.5">
                  <User className="w-4 h-4 text-amber-600" />
                  <span>Personal Details — ذاتی معلومات</span>
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    1. Full Name (مکمل نام) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Muhammad Ali"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#064e3b]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    2. Mobile / WhatsApp Number (موبائل / واٹس ایپ نمبر) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="0300-1234567"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#064e3b]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    3. Age (عمر)
                  </label>
                  <input
                    type="text"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="e.g. 26 Years"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#064e3b]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    4. City / Hometown (شہر)
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Lahore, Islamabad, Multan, Karachi..."
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#064e3b]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    5. Passport Available? (پاسپورٹ موجود ہے؟)
                  </label>
                  <select
                    value={hasPassport}
                    onChange={(e) => setHasPassport(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#064e3b]"
                  >
                    <option value="Yes">Yes (ہاں موجود ہے)</option>
                    <option value="No">No (نہیں ہے / نیا بنوانا ہے)</option>
                    <option value="Under Process">Under Process (پراسیس میں ہے)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    6. Passport Expiry Date (میعاد ختم ہونے کی تاریخ)
                  </label>
                  <input
                    type="text"
                    disabled={hasPassport === "No"}
                    value={passportExpiry}
                    onChange={(e) => setPassportExpiry(e.target.value)}
                    placeholder={hasPassport === "No" ? "Not applicable" : "e.g. 15 Dec 2028"}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#064e3b] disabled:bg-slate-100 disabled:text-slate-400"
                  />
                </div>
              </div>
            </div>

            {/* 4. EDUCATION & EXPERIENCE */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-amber-200 pb-2">
                <span className="w-7 h-7 rounded-full bg-[#064e3b] text-[#f7e5a9] text-xs font-bold flex items-center justify-center shadow-sm">
                  4
                </span>
                <h3 className="font-serif text-base sm:text-lg font-bold text-[#064e3b] flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-amber-600" />
                  <span>Education & Experience — تعلیم اور تجربہ</span>
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    7. Educational Qualification (تعلیمی قابلیت)
                  </label>
                  <select
                    value={education}
                    onChange={(e) => setEducation(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#064e3b]"
                  >
                    <option value="Matric (میٹرک)">Matric (میٹرک)</option>
                    <option value="Intermediate / F.A / F.Sc (انٹرمیڈیٹ)">Intermediate / F.A / F.Sc (انٹرمیڈیٹ)</option>
                    <option value="Bachelors / Graduation (گریجویشن)">Bachelors / Graduation (گریجویشن)</option>
                    <option value="Masters / Post Graduate (ماسٹرز)">Masters / Post Graduate (ماسٹرز)</option>
                    <option value="Technical Diploma / DAE (ڈپلومہ)">Technical Diploma / DAE (ڈپلومہ)</option>
                    <option value="Middle / Primary (مڈل یا پرائمری)">Middle / Primary (مڈل یا پرائمری)</option>
                    <option value="No Formal Schooling (بغیر اسکول تعلیم)">No Formal Schooling (ہنر مند)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    8. Profession / Skill (پیشہ / ہنر)
                  </label>
                  <input
                    type="text"
                    value={profession}
                    onChange={(e) => setProfession(e.target.value)}
                    placeholder="e.g. Driver, Electrician, Plumber, Chef, Mason, IT..."
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#064e3b]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    9. Experience in Years (تجربہ کتنے سال کا ہے؟)
                  </label>
                  <select
                    value={experienceYears}
                    onChange={(e) => setExperienceYears(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#064e3b]"
                  >
                    <option value="Fresh / 0 (نیا / بغیر تجربہ)">Fresh / 0 (نیا / بغیر تجربہ)</option>
                    <option value="1-2 Years (سال)">1 to 2 Years (1 سے 2 سال)</option>
                    <option value="3-5 Years (سال)">3 to 5 Years (3 سے 5 سال)</option>
                    <option value="5-10 Years (سال)">5 to 10 Years (5 سے 10 سال)</option>
                    <option value="10+ Years (10 سال سے زائد)">10+ Years (10 سال سے زائد)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    10. Driving License Available? (ڈرائیونگ لائسنس ہے؟)
                  </label>
                  <select
                    value={hasDrivingLicense}
                    onChange={(e) => setHasDrivingLicense(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#064e3b]"
                  >
                    <option value="No">No (نہیں ہے)</option>
                    <option value="Yes - Pakistani License">Yes - Pakistani License (ہاں پاکستانی لائسنس ہے)</option>
                    <option value="Yes - Gulf/GCC License">Yes - Gulf/GCC License (خلیج کا لائسنس ہے)</option>
                    <option value="Yes - International License">Yes - International License (انٹرنیشنل)</option>
                  </select>
                </div>

                {hasDrivingLicense !== "No" && (
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      11. License Type (لائسنس کی قسم)
                    </label>
                    <input
                      type="text"
                      value={licenseType}
                      onChange={(e) => setLicenseType(e.target.value)}
                      placeholder="e.g. LTV (کار), HTV (ہیوی ٹرک / ٹریلر), Gulf/Saudi License..."
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#064e3b]"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* 5. CATEGORY SPECIFIC QUESTIONS (ADAPTIVE BASED ON SELECTION) */}
            {visaCategory === "Work Visa" && (
              <div className="space-y-4 bg-emerald-50/50 p-5 rounded-2xl border border-emerald-200">
                <div className="flex items-center gap-2 border-b border-emerald-200/80 pb-2">
                  <span className="w-7 h-7 rounded-full bg-[#064e3b] text-[#f7e5a9] text-xs font-bold flex items-center justify-center shadow-sm">
                    5
                  </span>
                  <h3 className="font-serif text-base font-bold text-[#064e3b] flex items-center gap-1.5">
                    <Briefcase className="w-4 h-4 text-emerald-700" />
                    <span>Work Visa Specifics — ورک ویزا تفصیلات</span>
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      12. Desired Job / Employment (کس قسم کی ملازمت چاہتے ہیں؟)
                    </label>
                    <input
                      type="text"
                      value={desiredJob}
                      onChange={(e) => setDesiredJob(e.target.value)}
                      placeholder="e.g. Driver, Storekeeper, Welder, Electrician, Sales..."
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#064e3b]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      13. Relevant Certificate or Diploma? (متعلقہ سرٹیفکیٹ یا تجربہ ثبوت؟)
                    </label>
                    <select
                      value={hasCertificate}
                      onChange={(e) => setHasCertificate(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white"
                    >
                      <option value="Yes">Yes (ہاں سرٹیفکیٹ یا ثبوت موجود ہے)</option>
                      <option value="No">No (صرف عملی تجربہ ہے، کاغذ نہیں)</option>
                      <option value="Can Arrange">Can Arrange (حاصل کیا جا سکتا ہے)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      14. Company Employment Preferred? (کیا کمپنی ملازمت کے لیے جانا چاہتے ہیں؟)
                    </label>
                    <select
                      value={companyEmployment}
                      onChange={(e) => setCompanyEmployment(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white"
                    >
                      <option value="Yes - Company Visa">Yes - Confirmed Company Visa (ہاں کمپنی کا ویزا)</option>
                      <option value="Free / Azad Visa">Free / Azad Visa (آزاد / سپانسر ویزا)</option>
                      <option value="Any Available">Any Available (جو بھی مناسب دستیاب ہو)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {visaCategory === "Study Visa" && (
              <div className="space-y-4 bg-blue-50/50 p-5 rounded-2xl border border-blue-200">
                <div className="flex items-center gap-2 border-b border-blue-200/80 pb-2">
                  <span className="w-7 h-7 rounded-full bg-blue-900 text-white text-xs font-bold flex items-center justify-center shadow-sm">
                    5
                  </span>
                  <h3 className="font-serif text-base font-bold text-blue-950 flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4 text-blue-700" />
                    <span>Study Visa Specifics — اسٹڈی ویزا تفصیلات</span>
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      15. Target Country for Study (کس ملک میں تعلیم حاصل کرنا چاہتے ہیں؟)
                    </label>
                    <input
                      type="text"
                      value={studyCountry}
                      onChange={(e) => setStudyCountry(e.target.value)}
                      placeholder="e.g. Turkey, Malaysia, UK, Europe..."
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      16. Last Qualification & Marks/GPA (آخری تعلیمی ڈگری و نمبر)
                    </label>
                    <input
                      type="text"
                      value={lastDegree}
                      onChange={(e) => setLastDegree(e.target.value)}
                      placeholder="e.g. F.Sc Pre-Eng (72%) or B.Com"
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      17. Desired Course or Degree (کون سا کورس یا ڈگری کرنا چاہتے ہیں؟)
                    </label>
                    <input
                      type="text"
                      value={desiredCourse}
                      onChange={(e) => setDesiredCourse(e.target.value)}
                      placeholder="e.g. BS Computer Science, Business Management, Diploma in Hospitality..."
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white"
                    />
                  </div>
                </div>
              </div>
            )}

            {visaCategory === "Visit Visa" && (
              <div className="space-y-4 bg-amber-50/50 p-5 rounded-2xl border border-amber-200">
                <div className="flex items-center gap-2 border-b border-amber-200/80 pb-2">
                  <span className="w-7 h-7 rounded-full bg-[#996515] text-white text-xs font-bold flex items-center justify-center shadow-sm">
                    5
                  </span>
                  <h3 className="font-serif text-base font-bold text-[#996515] flex items-center gap-1.5">
                    <Plane className="w-4 h-4 text-amber-700" />
                    <span>Visit Visa Specifics — وزٹ ویزا تفصیلات</span>
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      18. Reason for Visit (وزٹ کی وجہ)
                    </label>
                    <select
                      value={visitReason}
                      onChange={(e) => setVisitReason(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white"
                    >
                      <option value="Tourism (سیاحت و سیر)">Tourism (سیاحت و سیر)</option>
                      <option value="Family Visit (فیملی سے ملاقات)">Family Visit (فیملی سے ملاقات)</option>
                      <option value="Business / Meeting (کاروبار)">Business / Meeting (کاروبار)</option>
                      <option value="Other (دیگر)">Other (دیگر)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      19. Expected Stay Days (کتنے دن قیام؟)
                    </label>
                    <select
                      value={visitDuration}
                      onChange={(e) => setVisitDuration(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white"
                    >
                      <option value="14 Days (14 دن)">14 Days (14 دن)</option>
                      <option value="30 Days (1 مہینہ)">30 Days (1 مہینہ)</option>
                      <option value="60 Days (2 ماہ)">60 Days (2 ماہ)</option>
                      <option value="90 Days (3 ماہ)">90 Days (3 ماہ)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      20. Host/Relative in Country? (کوئی رشتہ دار موجود ہے؟)
                    </label>
                    <select
                      value={hasHostOrRelative}
                      onChange={(e) => setHasHostOrRelative(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white"
                    >
                      <option value="No">No (کوئی نہیں ہے)</option>
                      <option value="Yes - Close Relative">Yes - Close Relative (ہاں قریبی رشتہ دار)</option>
                      <option value="Yes - Friend/Host">Yes - Friend/Host (دوست یا میزبان)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* 6. APPLICATION & BUDGET */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-amber-200 pb-2">
                <span className="w-7 h-7 rounded-full bg-[#064e3b] text-[#f7e5a9] text-xs font-bold flex items-center justify-center shadow-sm">
                  6
                </span>
                <h3 className="font-serif text-base sm:text-lg font-bold text-[#064e3b] flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4 text-amber-600" />
                  <span>Application Timeline & Budget — فیس اور بجٹ</span>
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    21. When want to depart? (کب روانہ ہونا چاہتے ہیں؟)
                  </label>
                  <select
                    value={departureTimeline}
                    onChange={(e) => setDepartureTimeline(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#064e3b]"
                  >
                    <option value="Immediate (فوری طور پر)">Immediate (فوری طور پر)</option>
                    <option value="Within 1 Month (1 ماہ کے اندر)">Within 1 Month (1 ماہ کے اندر)</option>
                    <option value="Within 2-3 Months (2 سے 3 ماہ)">Within 2-3 Months (2 سے 3 ماہ)</option>
                    <option value="Planning / Information Only (معلومات درکار ہیں)">Planning / Info Only (معلومات درکار ہیں)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    22. Estimated Budget (اندازاً بجٹ روپے)
                  </label>
                  <input
                    type="text"
                    value={estimatedBudget}
                    onChange={(e) => setEstimatedBudget(e.target.value)}
                    placeholder="e.g. 300,000 to 500,000 PKR"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#064e3b]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    23. Want Fee & Process Details? (فیس تفصیل درکار ہے؟)
                  </label>
                  <select
                    value={wantFeeDetails}
                    onChange={(e) => setWantFeeDetails(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#064e3b]"
                  >
                    <option value="Yes">Yes (ہاں مکمل فیس و طریقہ بتائیں)</option>
                    <option value="No">No (صرف اہلیت چیک کرنی ہے)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 7. PASSPORT / DOCUMENT / CV ATTACHMENT */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-amber-200 pb-2">
                <span className="w-7 h-7 rounded-full bg-[#064e3b] text-[#f7e5a9] text-xs font-bold flex items-center justify-center shadow-sm">
                  7
                </span>
                <h3 className="font-serif text-base sm:text-lg font-bold text-[#064e3b] flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-amber-600" />
                  <span>Passport / CV / Document (پاسپورٹ یا سی وی کی تصویر)</span>
                </h3>
              </div>

              <div className="p-5 border-2 border-dashed border-amber-300 rounded-2xl bg-amber-50/40 text-center">
                {documentImageUrl ? (
                  <div className="space-y-3">
                    <img 
                      src={documentImageUrl} 
                      alt="Uploaded Document" 
                      className="h-32 mx-auto rounded-xl object-contain border border-slate-300 shadow bg-white" 
                    />
                    <p className="text-xs text-emerald-700 font-semibold flex items-center justify-center gap-1">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Document Attached & Compressed Successfully!
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                      <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-700 text-[#f7e5a9] text-xs font-semibold rounded-lg cursor-pointer hover:bg-emerald-800 transition-colors">
                        <Camera className="w-3.5 h-3.5" />
                        <span>Take Photo (Camera)</span>
                        <input type="file" accept="image/*" capture="environment" onChange={handleDocumentUpload} className="hidden" />
                      </label>
                      <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-700 text-white text-xs font-semibold rounded-lg cursor-pointer hover:bg-slate-800 transition-colors">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Change from Gallery</span>
                        <input type="file" accept="image/*" onChange={handleDocumentUpload} className="hidden" />
                      </label>
                      <button
                        type="button"
                        onClick={() => setDocumentImageUrl("")}
                        className="px-3 py-1.5 bg-red-100 text-red-700 text-xs font-semibold rounded-lg hover:bg-red-200 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <Camera className="w-10 h-10 text-amber-600 mx-auto mb-2" />
                    <p className="text-xs font-bold text-slate-800">
                      پاسپورٹ، شناختی کارڈ یا سی وی کی تصویر منسلک کریں
                    </p>
                    <p className="text-[11px] text-slate-500 mt-1 mb-4">
                      Snap a photo directly with your phone camera or select from your gallery. (Auto-compressed to light KBs).
                    </p>
                    
                    <div className="flex flex-wrap items-center justify-center gap-3">
                      <label className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#064e3b] text-[#f7e5a9] text-xs font-bold rounded-xl cursor-pointer hover:bg-[#022c22] transition-all shadow-sm">
                        <Camera className="w-4 h-4 text-amber-300" />
                        <span>{uploadingImage ? "Compressing & Uploading..." : "📷 Take Photo (Camera)"}</span>
                        <input 
                          type="file" 
                          accept="image/*" 
                          capture="environment"
                          disabled={uploadingImage}
                          onChange={handleDocumentUpload} 
                          className="hidden" 
                        />
                      </label>

                      <label className="inline-flex items-center gap-2 px-4 py-2.5 bg-amber-600 text-white text-xs font-bold rounded-xl cursor-pointer hover:bg-amber-700 transition-all shadow-sm">
                        <Upload className="w-4 h-4" />
                        <span>{uploadingImage ? "Compressing & Uploading..." : "🖼️ Choose from Gallery"}</span>
                        <input 
                          type="file" 
                          accept="image/*" 
                          disabled={uploadingImage}
                          onChange={handleDocumentUpload} 
                          className="hidden" 
                        />
                      </label>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 8. ADDITIONAL NOTES */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Any Specific Requirements / کوئی خاص بات یا تفصیل؟
              </label>
              <textarea
                rows={3}
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
                placeholder="Mention any specific company, city, trade test certificate, or family requirements..."
                className="w-full text-xs p-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#064e3b]"
              />
            </div>

            {/* IMPORTANT INSTRUCTIONS BOX (URDU & ENGLISH) */}
            <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-5 space-y-2 text-xs text-slate-700">
              <h4 className="font-serif text-sm font-bold text-[#996515] flex items-center gap-1.5" dir="rtl">
                <ShieldCheck className="w-4 h-4 text-amber-600" />
                <span>📌 اہم ہدایات و ضوابط</span>
              </h4>
              <ul className="space-y-1.5 text-[11px] leading-relaxed text-slate-700" dir="rtl">
                <li>• براہِ کرم اپنی مطلوبہ معلومات درست درج کریں۔</li>
                <li>• درخواست کی فیس اور دیگر اخراجات کی تفصیل تصدیق کے بعد بتائی جائے گی۔</li>
                <li>• پاسپورٹ کی کاپی اور دیگر حساس دستاویزات ضرورت اور طریقۂ کار کی تصدیق کے بعد طلب کی جائیں گی۔</li>
                <li>• ویزا یا ملازمت کی منظوری متعلقہ حکام اور اصل دستیابی سے مشروط ہے۔</li>
              </ul>
            </div>

            {/* SUBMIT BUTTON */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={submitting || uploadingImage}
                className="w-full py-4 bg-[#064e3b] hover:bg-[#022c22] text-[#f7e5a9] font-bold text-sm sm:text-base rounded-2xl shadow-lg shadow-emerald-950/20 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4 text-amber-400" />
                <span>{submitting ? "Submitting Requirement Form..." : "Submit Overseas Requirement (فارم جمع کروائیں)"}</span>
              </button>
            </div>

            {/* OFFICIAL CONTACT FOOTER */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-2">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-800">BIN RIAZ ELITE TRAVEL & TOURS</span>
                <span>•</span>
                <span>Malik Aamir Riaz: 0321-6001913</span>
              </div>
              <div className="text-[#064e3b] font-semibold">
                Office: 0315-7801913
              </div>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
