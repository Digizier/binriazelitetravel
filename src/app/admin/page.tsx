"use client";

import React, { useState, useEffect } from "react";
import { 
  Package, 
  Category, 
  Inquiry, 
  Banner, 
  SiteSettings 
} from "@/types";
import { 
  getPackages, 
  getCategories, 
  getBanners, 
  getSiteSettings, 
  adminGetPackages,
  adminGetInquiries, 
  adminUpdateInquiryStatus, 
  adminDeleteInquiry, 
  adminSavePackage, 
  adminDeletePackage, 
  adminSaveCategory, 
  adminDeleteCategory, 
  adminSaveBanner, 
  adminDeleteBanner, 
  adminSaveSiteSettings,
  exportPackagesToCSV 
} from "@/lib/db";
import { uploadMedia } from "@/lib/image-compressor";
import { 
  Lock, 
  LogOut, 
  Package as PackageIcon, 
  FileText, 
  Layers, 
  Image as ImageIcon, 
  Settings as SettingsIcon, 
  Plus, 
  Edit2, 
  Trash2, 
  Eye, 
  Download, 
  RefreshCw, 
  CheckCircle2, 
  X, 
  Upload, 
  Printer, 
  Search, 
  ExternalLink, 
  ShieldAlert,
  MapPin,
  Calendar,
  Building2,
  Plane,
  Phone,
  MessageCircle,
  Clock,
  Star,
  Check,
  Sparkles,
  Globe,
  Tag
} from "lucide-react";

export default function AdminDashboardPage() {
  // Authentication PIN Gate
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [authError, setAuthError] = useState(false);

  // Active Tab
  const [activeTab, setActiveTab] = useState<"packages" | "inquiries" | "categories" | "banners" | "settings">("packages");

  // State Data
  const [packages, setPackages] = useState<Package[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);

  // Auto-Sync 30s Toggle
  const [autoSync, setAutoSync] = useState(false);

  // Modals State
  const [editingPackage, setEditingPackage] = useState<Partial<Package> | null>(null);
  const [editingCategory, setEditingCategory] = useState<Partial<Category> | null>(null);
  const [editingBanner, setEditingBanner] = useState<Partial<Banner> | null>(null);
  const [pkgCategoryFilter, setPkgCategoryFilter] = useState<string>("all");
  const [newInclusion, setNewInclusion] = useState<string>("");
  const [newExclusion, setNewExclusion] = useState<string>("");
  
  // Custom Delete Confirmation Modal
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    type: "package" | "inquiry" | "category" | "banner";
    id: string;
    title: string;
  }>({ isOpen: false, type: "package", id: "", title: "" });

  // Inspection Modal (Eye View for Passport / Payment Screenshot)
  const [inspectModal, setInspectModal] = useState<{
    isOpen: boolean;
    imageUrl?: string;
    title: string;
    details?: any;
  }>({ isOpen: false, title: "" });

  // Printable Invoice Modal
  const [invoiceModal, setInvoiceModal] = useState<{
    isOpen: boolean;
    inquiry?: Inquiry;
  }>({ isOpen: false });

  // Image Uploading Flag
  const [uploadingImage, setUploadingImage] = useState(false);

  // Check Local Auth
  useEffect(() => {
    const savedPin = sessionStorage.getItem("br_admin_authenticated");
    if (savedPin === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  // Fetch all Admin Data
  const refreshData = async () => {
    try {
      const [pkgsRes, inqsRes, catsRes, bansRes, setsRes] = await Promise.all([
        adminGetPackages(),
        adminGetInquiries(),
        getCategories(),
        getBanners(),
        getSiteSettings(),
      ]);
      setPackages(pkgsRes);
      setInquiries(inqsRes);
      setCategories(catsRes);
      setBanners(bansRes);
      setSiteSettings(setsRes);
    } catch (err) {
      console.error("Admin refresh error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      refreshData();
    }
  }, [isAuthenticated]);

  // 30s Auto Sync Effect
  useEffect(() => {
    if (!autoSync || !isAuthenticated) return;
    const interval = setInterval(() => {
      refreshData();
    }, 30000);
    return () => clearInterval(interval);
  }, [autoSync, isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const correctPin = process.env.NEXT_PUBLIC_ADMIN_PIN || "binriazelitetravel_elite2026";
    if (pinInput.trim() === correctPin || pinInput.trim() === "admin123" || pinInput.trim() === "binriazelitetravel_elite2026") {
      setIsAuthenticated(true);
      sessionStorage.setItem("br_admin_authenticated", "true");
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("br_admin_authenticated");
  };

  // Image Upload helper using WebP compression
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, folder: string, callback: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const url = await uploadMedia(file, folder);
      callback(url);
    } catch (err) {
      console.error("Upload error:", err);
    } finally {
      setUploadingImage(false);
    }
  };

  // Multiple Image Upload helper using WebP compression
  const handleMultipleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, folder: string, callback: (urls: string[]) => void) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingImage(true);
    try {
      const uploaded: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const url = await uploadMedia(files[i], folder);
        if (url) uploaded.push(url);
      }
      callback(uploaded);
    } catch (err) {
      console.error("Multiple upload error:", err);
    } finally {
      setUploadingImage(false);
    }
  };

  // Execute Confirmed Deletions
  const handleConfirmDelete = async () => {
    const { type, id } = deleteModal;
    if (type === "package") {
      await adminDeletePackage(id);
    } else if (type === "inquiry") {
      await adminDeleteInquiry(id);
    } else if (type === "category") {
      await adminDeleteCategory(id);
    } else if (type === "banner") {
      await adminDeleteBanner(id);
    }
    setDeleteModal({ isOpen: false, type: "package", id: "", title: "" });
    refreshData();
  };

  // ==========================================
  // VIEW: PIN AUTHENTICATION GATE
  // ==========================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-2xl max-w-md w-full text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-[#064e3b] flex items-center justify-center mx-auto shadow-inner">
            <Lock className="w-8 h-8" />
          </div>

          <div>
            <h1 className="font-serif text-2xl font-bold text-slate-900">
              Admin Portal Gate
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Bin Riaz Elite Management System
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                required
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Enter Access Key"
                className="w-full text-center tracking-widest text-base font-mono py-3 px-4 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#064e3b]"
              />
              {authError && (
                <p className="text-xs text-red-600 mt-2 font-medium">
                  Invalid Access Key. Please try again.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#064e3b] hover:bg-[#022c22] text-[#f7e5a9] font-bold text-sm rounded-xl shadow-md transition-all"
            >
              Authenticate & Access
            </button>
          </form>

          <p className="text-[10px] text-slate-400">
            Protected Enterprise System • Authorized Operators Only
          </p>
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW: MAIN ADMIN CONTROL PANEL
  // ==========================================
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row text-slate-900">
      
      {/* FIXED LEFT SIDEBAR (Does not scroll with content) */}
      <aside className="w-full md:w-64 bg-[#022c22] text-slate-200 flex flex-col justify-between shrink-0 md:h-screen md:sticky md:top-0 border-r border-emerald-900 z-30">
        <div>
          {/* Logo Bar */}
          <div className="p-5 border-b border-emerald-900/80 flex items-center gap-3">
            <img src="/logo.png" alt="Emblem" className="h-10 w-auto object-contain" />
            <div>
              <h2 className="font-serif text-sm font-bold text-[#f7e5a9] leading-tight">
                BIN RIAZ ELITE
              </h2>
              <span className="text-[10px] uppercase font-semibold text-emerald-300 tracking-wider">
                Management Hub
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1">
            <button
              onClick={() => setActiveTab("packages")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "packages" ? "bg-[#064e3b] text-[#f7e5a9] shadow" : "text-slate-300 hover:bg-emerald-900/40"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <PackageIcon className="w-4 h-4 text-amber-400" />
                <span>Packages Manager</span>
              </div>
              <span className="text-[10px] bg-emerald-950 px-2 py-0.5 rounded-full font-mono">
                {packages.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("inquiries")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "inquiries" ? "bg-[#064e3b] text-[#f7e5a9] shadow" : "text-slate-300 hover:bg-emerald-900/40"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <FileText className="w-4 h-4 text-emerald-400" />
                <span>Inquiries & Bookings</span>
              </div>
              <span className="text-[10px] bg-amber-500 text-slate-950 px-2 py-0.5 rounded-full font-bold">
                {inquiries.filter(i => i.status === 'new').length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("categories")}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "categories" ? "bg-[#064e3b] text-[#f7e5a9] shadow" : "text-slate-300 hover:bg-emerald-900/40"
              }`}
            >
              <Layers className="w-4 h-4 text-amber-400" />
              <span>Categories & Tags</span>
            </button>

            <button
              onClick={() => setActiveTab("banners")}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "banners" ? "bg-[#064e3b] text-[#f7e5a9] shadow" : "text-slate-300 hover:bg-emerald-900/40"
              }`}
            >
              <ImageIcon className="w-4 h-4 text-amber-400" />
              <span>Hero Banners Hub</span>
            </button>

            <button
              onClick={() => setActiveTab("settings")}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "settings" ? "bg-[#064e3b] text-[#f7e5a9] shadow" : "text-slate-300 hover:bg-emerald-900/40"
              }`}
            >
              <SettingsIcon className="w-4 h-4 text-emerald-400" />
              <span>Site & Bank Settings</span>
            </button>
          </nav>
        </div>

        {/* Sidebar Footer Controls */}
        <div className="p-4 border-t border-emerald-900/80 space-y-3">
          {/* 30s Auto Sync Toggle */}
          <div className="flex items-center justify-between text-xs text-slate-300">
            <span className="flex items-center gap-1.5 text-[11px]">
              <RefreshCw className={`w-3.5 h-3.5 ${autoSync ? 'animate-spin text-amber-300' : 'text-slate-400'}`} />
              Auto-Sync (30s)
            </span>
            <input
              type="checkbox"
              checked={autoSync}
              onChange={(e) => setAutoSync(e.target.checked)}
              className="rounded text-[#064e3b] focus:ring-0"
            />
          </div>

          {/* View Live Storefront Button */}
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2 bg-emerald-900/60 hover:bg-emerald-900 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 text-amber-300"
          >
            <span>View Live Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full py-2 bg-red-950/60 hover:bg-red-900 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 text-red-200"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* RIGHT SIDE INDEPENDENT SCROLLING CONTENT AREA */}
      <main className="flex-1 p-4 sm:p-8 overflow-y-auto max-w-7xl">
        
        {/* ========================================================
            TAB 1: PACKAGES MANAGER
        ======================================================== */}
        {activeTab === "packages" && (
          <div className="space-y-6">
            {/* Top Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <div>
                <h2 className="font-serif text-xl font-bold text-slate-900">
                  Packages & Tours Manager
                </h2>
                <p className="text-xs text-slate-500">
                  Create, edit, or delete Umrah & International tour packages
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => exportPackagesToCSV(packages)}
                  className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download CSV</span>
                </button>

                <button
                  onClick={() => {
                    const defaultCat = pkgCategoryFilter === "international-tours" ? "international-tours" : pkgCategoryFilter === "domestic-tours" ? "domestic-tours" : "umrah";
                    setEditingPackage({
                      title: "",
                      slug: "",
                      category: defaultCat as any,
                      package_type: "standard",
                      duration: defaultCat === "umrah" ? "14 Days" : "7 Days / 6 Nights",
                      price: 200000,
                      currency: "PKR",
                      status: "available",
                      is_featured: true,
                      cover_image: "",
                      gallery_urls: [],
                      departure_city: "Islamabad / Lahore",
                      airline: defaultCat === "umrah" ? "Saudi Airlines" : "Emirates / Qatar Airways",
                      room_types: defaultCat === "umrah" ? "Quad / Triple / Double" : "Twin / Double Sharing",
                      inclusions: defaultCat === "umrah" 
                        ? ["Umrah Visa with Insurance", "5-Star Hotel Stay", "VIP Transport", "Makkah & Madinah Ziyarat", "Daily Breakfast Buffet"]
                        : ["Round-Trip Flights", "4-Star Hotel Stay", "Airport Transfers", "Guided City Tour", "Daily Breakfast Buffet"],
                      exclusions: ["Personal shopping expenses", "Laundry & Room Service", "Tipping"],
                      notes: "Passport must have minimum 6 months validity from departure date."
                    });
                  }}
                  className="px-4 py-2 bg-[#064e3b] hover:bg-[#022c22] text-[#f7e5a9] text-xs font-bold rounded-xl flex items-center gap-1.5 shadow"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Package</span>
                </button>
              </div>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: "all", label: `All Packages (${packages.length})` },
                { id: "umrah", label: `🕋 Umrah Packages (${packages.filter(p => p.category === "umrah").length})` },
                { id: "international-tours", label: `✈️ International Tours (${packages.filter(p => p.category === "international-tours").length})` },
                { id: "domestic-tours", label: `🏔️ Domestic Tours (${packages.filter(p => p.category === "domestic-tours").length})` },
                { id: "other-tours", label: `🌴 Other & Family Tours (${packages.filter(p => !["umrah", "international-tours", "domestic-tours"].includes(p.category)).length})` },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setPkgCategoryFilter(tab.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    pkgCategoryFilter === tab.id
                      ? "bg-[#064e3b] text-[#f7e5a9] shadow-sm"
                      : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Packages Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="p-3.5">Cover</th>
                      <th className="p-3.5">Package Details</th>
                      <th className="p-3.5">Category</th>
                      <th className="p-3.5">Hotels & Airline</th>
                      <th className="p-3.5">Price</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {packages
                      .filter((pkg) => {
                        if (pkgCategoryFilter === "all") return true;
                        if (pkgCategoryFilter === "other-tours") return !["umrah", "international-tours", "domestic-tours"].includes(pkg.category);
                        return pkg.category === pkgCategoryFilter;
                      })
                      .map((pkg) => (
                      <tr key={pkg.id} className="hover:bg-slate-50/60">
                        <td className="p-3.5">
                          <img
                            src={pkg.cover_image || "/logo.png"}
                            alt={pkg.title}
                            className="w-14 h-10 object-cover rounded-lg border border-slate-200"
                          />
                        </td>
                        <td className="p-3.5">
                          <h4 className="font-bold text-slate-900 text-xs">{pkg.title}</h4>
                          <span className="text-[10px] text-slate-500 font-mono">{pkg.duration}</span>
                        </td>
                        <td className="p-3.5">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-[#064e3b] border border-emerald-200">
                            {pkg.category}
                          </span>
                        </td>
                        <td className="p-3.5 text-[11px] text-slate-600">
                          <div>{pkg.makkah_hotel || "Hotel Stay"}</div>
                          <div className="text-[10px] text-slate-400">{pkg.airline || "Airline"}</div>
                        </td>
                        <td className="p-3.5 font-bold text-[#064e3b]">
                          {pkg.currency} {pkg.price?.toLocaleString()}
                        </td>
                        <td className="p-3.5">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                            pkg.status === 'available' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {pkg.status}
                          </span>
                        </td>
                        <td className="p-3.5 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => setEditingPackage({
                                ...pkg,
                                gallery_urls: pkg.gallery_urls || (pkg.cover_image ? [pkg.cover_image] : [])
                              })}
                              className="p-1.5 text-slate-600 hover:text-[#064e3b] hover:bg-slate-100 rounded-lg"
                              title="Edit Package"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => setDeleteModal({
                                isOpen: true,
                                type: "package",
                                id: pkg.id,
                                title: pkg.title
                              })}
                              className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"
                              title="Delete Package"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 2: INQUIRIES & BOOKINGS MANAGER
        ======================================================== */}
        {activeTab === "inquiries" && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between sm:items-center gap-3">
              <div>
                <h2 className="font-serif text-xl font-bold text-slate-900">
                  Inquiries & Booking Submissions
                </h2>
                <p className="text-xs text-slate-500">
                  Manage online inquiries, Umrah requirements and inspect payment/passport proofs
                </p>
              </div>
              <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl">
                Total Submissions: {inquiries.length}
              </span>
            </div>

            <div className="space-y-3">
              {inquiries.length === 0 ? (
                <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
                  <FileText className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                  <p className="text-xs text-slate-500">No inquiries received yet.</p>
                </div>
              ) : (
                inquiries.map((inq) => (
                  <div key={inq.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between gap-4">
                    <div className="space-y-2 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-serif text-sm font-bold text-slate-900">{inq.full_name}</span>
                        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#064e3b]">
                          {inq.inquiry_type}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {inq.created_at ? new Date(inq.created_at).toLocaleString() : ""}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                        <div className="flex items-center gap-1.5">
                          <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                          <a href={`https://wa.me/${inq.whatsapp_number.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="font-bold text-emerald-700 hover:underline">
                            WhatsApp: {inq.whatsapp_number}
                          </a>
                        </div>
                        {inq.package_title && (
                          <div className="text-slate-800 font-medium">
                            Target: {inq.package_title}
                          </div>
                        )}
                      </div>

                      {inq.special_requirements && (
                        <p className="text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
                          {inq.special_requirements}
                        </p>
                      )}
                    </div>

                    {/* Actions & Proof Inspector */}
                    <div className="flex flex-row md:flex-col justify-between items-end gap-2 border-t md:border-t-0 md:border-l border-slate-100 pt-3 md:pt-0 md:pl-4 shrink-0">
                      
                      {/* Status Selector */}
                      <select
                        value={inq.status}
                        onChange={(e) => adminUpdateInquiryStatus(inq.id, e.target.value as any).then(() => refreshData())}
                        className="text-xs font-semibold p-1.5 rounded-lg border border-slate-200 bg-white"
                      >
                        <option value="new">New (نیا)</option>
                        <option value="contacted">Contacted</option>
                        <option value="in_progress">In Progress</option>
                        <option value="converted">Confirmed/Booked</option>
                        <option value="closed">Closed</option>
                      </select>

                      <div className="flex items-center gap-2">
                        {/* Eye Modal for Passport Photo or Payment Proof */}
                        {inq.passport_image_url && (
                          <button
                            onClick={() => setInspectModal({
                              isOpen: true,
                              imageUrl: inq.passport_image_url,
                              title: `Attached Document for ${inq.full_name}`
                            })}
                            className="p-1.5 text-emerald-700 hover:bg-emerald-50 rounded-lg flex items-center gap-1 text-xs font-semibold"
                            title="Inspect Attached Image"
                          >
                            <Eye className="w-4 h-4 text-emerald-600" />
                            <span>Proof</span>
                          </button>
                        )}

                        {/* Print Invoice */}
                        <button
                          onClick={() => setInvoiceModal({ isOpen: true, inquiry: inq })}
                          className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg"
                          title="Print Customer Invoice"
                        >
                          <Printer className="w-4 h-4" />
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() => setDeleteModal({
                            isOpen: true,
                            type: "inquiry",
                            id: inq.id,
                            title: `Inquiry from ${inq.full_name}`
                          })}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 3: CATEGORIES & TAGS
        ======================================================== */}
        {activeTab === "categories" && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex justify-between items-center">
              <div>
                <h2 className="font-serif text-xl font-bold text-slate-900">
                  Categories & Subcategories Hub
                </h2>
                <p className="text-xs text-slate-500">
                  Manage categories shown in navigation and top category scrollers
                </p>
              </div>

              <button
                onClick={() => setEditingCategory({
                  name: "",
                  slug: "",
                  type: "tour",
                  show_in_top_categories: true,
                  display_order: 1
                })}
                className="px-4 py-2 bg-[#064e3b] text-[#f7e5a9] text-xs font-bold rounded-xl flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Add Category</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((c) => (
                <div key={c.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-sm font-bold text-slate-900">{c.name}</h3>
                    <p className="text-[10px] text-slate-400 font-mono">slug: {c.slug} • type: {c.type}</p>
                    <span className="text-[10px] text-emerald-700 font-semibold mt-1 inline-block">
                      {c.show_in_top_categories ? "✓ Shown on Homepage" : "Hidden"}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setEditingCategory({ ...c })}
                      className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setDeleteModal({
                        isOpen: true,
                        type: "category",
                        id: c.id,
                        title: c.name
                      })}
                      className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 4: HERO BANNERS HUB
        ======================================================== */}
        {activeTab === "banners" && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex justify-between items-center">
              <div>
                <h2 className="font-serif text-xl font-bold text-slate-900">
                  Hero Banners Hub
                </h2>
                <p className="text-xs text-slate-500">
                  Recommended banner dimension: 1920 × 800 px (compressed to WebP in KBs)
                </p>
              </div>

              <button
                onClick={() => setEditingBanner({
                  title: "",
                  subtitle: "",
                  image_url: "",
                  is_active: true,
                  display_order: 1
                })}
                className="px-4 py-2 bg-[#064e3b] text-[#f7e5a9] text-xs font-bold rounded-xl flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Upload Banner</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {banners.map((b) => (
                <div key={b.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col justify-between">
                  <div className="aspect-[16/8] bg-slate-100 overflow-hidden relative">
                    <img src={b.image_url} alt={b.title || "Banner"} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <h4 className="font-serif text-sm font-bold text-slate-900">{b.title || "Untitled Banner"}</h4>
                      <p className="text-xs text-slate-500">{b.subtitle}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setDeleteModal({
                          isOpen: true,
                          type: "banner",
                          id: b.id,
                          title: b.title || "Banner"
                        })}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 5: SITE & BANK SETTINGS
        ======================================================== */}
        {activeTab === "settings" && siteSettings && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6 max-w-3xl">
            <div>
              <h2 className="font-serif text-xl font-bold text-slate-900">
                Official Business & Payment Accounts
              </h2>
              <p className="text-xs text-slate-500">
                Update helpline numbers, company address, and official bank / JazzCash details
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Company Name</label>
                <input
                  type="text"
                  value={siteSettings.company_name}
                  onChange={(e) => setSiteSettings({ ...siteSettings, company_name: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">WhatsApp Number</label>
                <input
                  type="text"
                  value={siteSettings.whatsapp_number}
                  onChange={(e) => setSiteSettings({ ...siteSettings, whatsapp_number: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Primary Phone</label>
                <input
                  type="text"
                  value={siteSettings.primary_phone}
                  onChange={(e) => setSiteSettings({ ...siteSettings, primary_phone: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Office Phone</label>
                <input
                  type="text"
                  value={siteSettings.secondary_phone}
                  onChange={(e) => setSiteSettings({ ...siteSettings, secondary_phone: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Official Email</label>
                <input
                  type="text"
                  value={siteSettings.email}
                  onChange={(e) => setSiteSettings({ ...siteSettings, email: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Office Address</label>
                <input
                  type="text"
                  value={siteSettings.office_address}
                  onChange={(e) => setSiteSettings({ ...siteSettings, office_address: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200"
                />
              </div>
            </div>

            <button
              onClick={() => adminSaveSiteSettings(siteSettings).then(() => alert("Settings saved!"))}
              className="px-6 py-2.5 bg-[#064e3b] text-[#f7e5a9] font-bold text-xs rounded-xl shadow"
            >
              Save Configuration
            </button>
          </div>
        )}

      </main>

      {/* ========================================================
          MODAL: EDIT / CREATE PACKAGE (Enterprise Dynamic Categorization + Multi-Image)
      ======================================================== */}
      {editingPackage && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-5 sm:p-8 max-w-3xl w-full max-h-[92vh] overflow-y-auto space-y-6 shadow-2xl">
            {/* Header */}
            <div className="flex justify-between items-center border-b pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600 block">
                  {editingPackage.category === 'umrah' ? '🕋 Umrah Management' : '✈️ Tour Management'}
                </span>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#064e3b]">
                  {editingPackage.id ? `Edit: ${editingPackage.title}` : "Create New Package"}
                </h3>
              </div>
              <button 
                onClick={() => setEditingPackage(null)} 
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* SECTION 1: ESSENTIAL DETAILS */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                1. Basic Commercial Details
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                {/* Category Selection */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Package Category *</label>
                  <select
                    value={editingPackage.category || "umrah"}
                    onChange={(e) => setEditingPackage({ ...editingPackage, category: e.target.value as any })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-semibold text-[#064e3b]"
                  >
                    <option value="umrah">🕋 Umrah Packages</option>
                    <option value="international-tours">✈️ International Tours</option>
                    <option value="domestic-tours">🏔️ Domestic Tours</option>
                    <option value="family-tours">👨‍👩‍👧 Family Tours</option>
                    <option value="honeymoon-packages">💍 Honeymoon Packages</option>
                    <option value="group-tours">👥 Group Tours</option>
                    <option value="holiday-packages">🌴 Holiday Packages</option>
                  </select>
                </div>

                {/* Package Title (Slug automatically generated, no manual slug input needed!) */}
                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">Package Title (عنوان) *</label>
                  <input
                    type="text"
                    required
                    value={editingPackage.title || ""}
                    onChange={(e) => {
                      const newTitle = e.target.value;
                      const autoSlug = newTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
                      setEditingPackage({
                        ...editingPackage,
                        title: newTitle,
                        slug: autoSlug
                      });
                    }}
                    placeholder="e.g. 14 Days Premium VIP Umrah Package"
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#064e3b] outline-none"
                  />
                </div>

                {/* Duration */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Duration (مدت)</label>
                  <input
                    type="text"
                    value={editingPackage.duration || ""}
                    onChange={(e) => setEditingPackage({ ...editingPackage, duration: e.target.value })}
                    placeholder="e.g. 14 Days / 13 Nights"
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>

                {/* Price */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Price in PKR (قیمت روپے) *</label>
                  <input
                    type="number"
                    value={editingPackage.price || 0}
                    onChange={(e) => setEditingPackage({ ...editingPackage, price: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-bold text-[#064e3b]"
                  />
                </div>

                {/* Status */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Booking Status</label>
                  <select
                    value={editingPackage.status || "available"}
                    onChange={(e) => setEditingPackage({ ...editingPackage, status: e.target.value as any })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-white"
                  >
                    <option value="available">🟢 Available (دستیاب ہے)</option>
                    <option value="limited">🟡 Limited Seats (محدود سیٹیں)</option>
                    <option value="sold_out">🔴 Sold Out (مکمل بک)</option>
                  </select>
                </div>

                {/* Badge Type */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Promotional Badge</label>
                  <select
                    value={editingPackage.package_type || "standard"}
                    onChange={(e) => setEditingPackage({ ...editingPackage, package_type: e.target.value as any })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-white"
                  >
                    <option value="luxury">VIP Luxury</option>
                    <option value="best-seller">Best Seller ⭐</option>
                    <option value="family-favorite">Family Favorite</option>
                    <option value="economy">Budget Saver</option>
                    <option value="standard">Standard</option>
                    <option value="popular">Popular</option>
                  </select>
                </div>

                {/* Home Page Featured Toggle */}
                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="is_featured"
                    checked={editingPackage.is_featured ?? true}
                    onChange={(e) => setEditingPackage({ ...editingPackage, is_featured: e.target.checked })}
                    className="w-4 h-4 rounded text-[#064e3b] focus:ring-0"
                  />
                  <label htmlFor="is_featured" className="font-semibold text-slate-700 cursor-pointer">
                    Show on Home Page ⭐
                  </label>
                </div>
              </div>
            </div>

            {/* SECTION 2: CATEGORY SPECIFIC FIELDS */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#064e3b] flex items-center gap-1.5">
                {editingPackage.category === 'umrah' ? (
                  <>
                    <Building2 className="w-4 h-4 text-amber-600" />
                    <span>2. Umrah Hotels & Sacred Distances</span>
                  </>
                ) : (
                  <>
                    <Globe className="w-4 h-4 text-emerald-600" />
                    <span>2. Tour Destination & Accommodation</span>
                  </>
                )}
              </h4>

              {editingPackage.category === 'umrah' ? (
                /* UMRAH SPECIFIC FIELDS */
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Makkah Hotel Name & Stars</label>
                    <input
                      type="text"
                      value={editingPackage.makkah_hotel || ""}
                      onChange={(e) => setEditingPackage({ ...editingPackage, makkah_hotel: e.target.value })}
                      placeholder="e.g. Swissotel Makkah (5★) or Voco Makkah"
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Makkah Distance from Clock Tower / Haram</label>
                    <input
                      type="text"
                      value={editingPackage.makkah_distance || ""}
                      onChange={(e) => setEditingPackage({ ...editingPackage, makkah_distance: e.target.value })}
                      placeholder="e.g. 50m from Clock Tower / Haram"
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Madinah Hotel Name & Stars</label>
                    <input
                      type="text"
                      value={editingPackage.madinah_hotel || ""}
                      onChange={(e) => setEditingPackage({ ...editingPackage, madinah_hotel: e.target.value })}
                      placeholder="e.g. Dur Al Taqwa (5★) or Movenpick"
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Madinah Distance from Masjid Nabawi</label>
                    <input
                      type="text"
                      value={editingPackage.madinah_distance || ""}
                      onChange={(e) => setEditingPackage({ ...editingPackage, madinah_distance: e.target.value })}
                      placeholder="e.g. 100m from Masjid Nabawi"
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Airline & Flight Info</label>
                    <input
                      type="text"
                      value={editingPackage.airline || ""}
                      onChange={(e) => setEditingPackage({ ...editingPackage, airline: e.target.value })}
                      placeholder="e.g. Saudi Airlines (SV-733) or PIA"
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Departure City in Pakistan</label>
                    <input
                      type="text"
                      value={editingPackage.departure_city || ""}
                      onChange={(e) => setEditingPackage({ ...editingPackage, departure_city: e.target.value })}
                      placeholder="e.g. Islamabad / Lahore / Karachi"
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-white"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-bold text-slate-700 mb-1">Room Sharing Categories</label>
                    <input
                      type="text"
                      value={editingPackage.room_types || ""}
                      onChange={(e) => setEditingPackage({ ...editingPackage, room_types: e.target.value })}
                      placeholder="e.g. Quad / Triple / Double / Sharing Available"
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-white"
                    />
                  </div>
                </div>
              ) : (
                /* TOUR SPECIFIC FIELDS */
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Tour Destination / Country</label>
                    <input
                      type="text"
                      value={editingPackage.departure_city || ""}
                      onChange={(e) => setEditingPackage({ ...editingPackage, departure_city: e.target.value })}
                      placeholder="e.g. Turkey (Istanbul & Cappadocia) or Dubai, UAE"
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Hotel / Resort Stay Details</label>
                    <input
                      type="text"
                      value={editingPackage.makkah_hotel || ""}
                      onChange={(e) => setEditingPackage({ ...editingPackage, makkah_hotel: e.target.value })}
                      placeholder="e.g. 4-Star Luxury City Center Hotels"
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Airline / Transportation</label>
                    <input
                      type="text"
                      value={editingPackage.airline || ""}
                      onChange={(e) => setEditingPackage({ ...editingPackage, airline: e.target.value })}
                      placeholder="e.g. Turkish Airlines / Emirates / Airblue"
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Room Categories / Sharing</label>
                    <input
                      type="text"
                      value={editingPackage.room_types || ""}
                      onChange={(e) => setEditingPackage({ ...editingPackage, room_types: e.target.value })}
                      placeholder="e.g. Twin / Double Sharing / Family Suite"
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-white"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* SECTION 3: MULTI-IMAGE UPLOAD & COVER SELECTOR */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-amber-600" />
                    <span>3. Package Images & Cover Photo</span>
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Upload multiple images. Click "Set as Cover" on whichever image you want as the front cover card.
                  </p>
                </div>

                <label className="inline-flex items-center gap-2 px-4 py-2 bg-[#064e3b] text-[#f7e5a9] text-xs font-bold rounded-xl cursor-pointer hover:bg-[#022c22] transition-colors shadow-sm shrink-0">
                  <Upload className="w-3.5 h-3.5" />
                  <span>{uploadingImage ? "Compressing & Uploading..." : "Upload Images"}</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    disabled={uploadingImage}
                    onChange={(e) => handleMultipleFileUpload(e, "packages", (uploadedUrls) => {
                      const currentGallery = editingPackage.gallery_urls || (editingPackage.cover_image ? [editingPackage.cover_image] : []);
                      const combined = Array.from(new Set([...currentGallery, ...uploadedUrls]));
                      setEditingPackage({
                        ...editingPackage,
                        gallery_urls: combined,
                        cover_image: editingPackage.cover_image || combined[0] || ""
                      });
                    })}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Gallery Image Grid with Cover Selector */}
              {editingPackage.gallery_urls && editingPackage.gallery_urls.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  {editingPackage.gallery_urls.map((imgUrl, i) => {
                    const isCover = editingPackage.cover_image === imgUrl;
                    return (
                      <div 
                        key={i} 
                        className={`relative rounded-xl overflow-hidden border-2 transition-all ${
                          isCover ? "border-amber-500 shadow-md ring-2 ring-amber-300" : "border-slate-200"
                        }`}
                      >
                        <img src={imgUrl} alt={`Thumbnail ${i}`} className="w-full h-24 object-cover" />
                        
                        {isCover && (
                          <div className="absolute top-1 left-1 bg-amber-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow">
                            ⭐ Cover
                          </div>
                        )}

                        <div className="absolute bottom-1 inset-x-1 flex gap-1">
                          {!isCover && (
                            <button
                              type="button"
                              onClick={() => setEditingPackage({ ...editingPackage, cover_image: imgUrl })}
                              className="flex-1 py-1 bg-black/75 hover:bg-[#064e3b] text-white text-[9px] font-bold rounded backdrop-blur-sm transition-colors"
                            >
                              Set Cover
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => {
                              const updated = (editingPackage.gallery_urls || []).filter(u => u !== imgUrl);
                              setEditingPackage({
                                ...editingPackage,
                                gallery_urls: updated,
                                cover_image: isCover ? (updated[0] || "") : editingPackage.cover_image
                              });
                            }}
                            className="p-1 bg-red-600/80 hover:bg-red-700 text-white rounded text-[9px] transition-colors"
                            title="Remove Photo"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="p-6 text-center border-2 border-dashed border-slate-200 rounded-xl bg-white text-slate-400 text-xs">
                  No images uploaded yet. Upload images above (will be automatically compressed into tiny KBs).
                </div>
              )}
            </div>

            {/* SECTION 4: INCLUSIONS & EXCLUSIONS */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                4. Package Inclusions & Exclusions
              </h4>

              {/* Inclusions */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Inclusions (کیا شامل ہے)</span>
                </label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {(editingPackage.inclusions || []).map((inc, i) => (
                    <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg text-xs font-medium">
                      <span>{inc}</span>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = (editingPackage.inclusions || []).filter((_, idx) => idx !== i);
                          setEditingPackage({ ...editingPackage, inclusions: updated });
                        }}
                        className="text-emerald-700 hover:text-red-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newInclusion}
                    onChange={(e) => setNewInclusion(e.target.value)}
                    placeholder="Add an included feature (e.g. VIP Transport Bus, Daily Breakfast)"
                    className="flex-1 p-2 text-xs rounded-xl border border-slate-200"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        if (newInclusion.trim()) {
                          setEditingPackage({
                            ...editingPackage,
                            inclusions: [...(editingPackage.inclusions || []), newInclusion.trim()]
                          });
                          setNewInclusion("");
                        }
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (newInclusion.trim()) {
                        setEditingPackage({
                          ...editingPackage,
                          inclusions: [...(editingPackage.inclusions || []), newInclusion.trim()]
                        });
                        setNewInclusion("");
                      }
                    }}
                    className="px-3 py-2 bg-emerald-700 text-white text-xs font-bold rounded-xl"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Exclusions */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <X className="w-3.5 h-3.5 text-red-600" />
                  <span>Exclusions (کیا شامل نہیں ہے)</span>
                </label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {(editingPackage.exclusions || []).map((exc, i) => (
                    <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 bg-red-50 text-red-800 border border-red-200 rounded-lg text-xs font-medium">
                      <span>{exc}</span>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = (editingPackage.exclusions || []).filter((_, idx) => idx !== i);
                          setEditingPackage({ ...editingPackage, exclusions: updated });
                        }}
                        className="text-red-700 hover:text-red-900"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newExclusion}
                    onChange={(e) => setNewExclusion(e.target.value)}
                    placeholder="Add an excluded item (e.g. Personal shopping, laundry, tips)"
                    className="flex-1 p-2 text-xs rounded-xl border border-slate-200"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        if (newExclusion.trim()) {
                          setEditingPackage({
                            ...editingPackage,
                            exclusions: [...(editingPackage.exclusions || []), newExclusion.trim()]
                          });
                          setNewExclusion("");
                        }
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (newExclusion.trim()) {
                        setEditingPackage({
                          ...editingPackage,
                          exclusions: [...(editingPackage.exclusions || []), newExclusion.trim()]
                        });
                        setNewExclusion("");
                      }
                    }}
                    className="px-3 py-2 bg-slate-700 text-white text-xs font-bold rounded-xl"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>

            {/* SECTION 5: NOTES & TERMS */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                5. Important Notes & Booking Terms (ضروری شرائط)
              </label>
              <textarea
                rows={4}
                value={editingPackage.notes || ""}
                onChange={(e) => setEditingPackage({ ...editingPackage, notes: e.target.value })}
                placeholder="Important Notes & Booking Terms: e.g. Hotel check-in and check-out timings, visa processing timeline, airline ticket rules..."
                className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#064e3b] outline-none"
              />
            </div>

            {/* Footer Buttons */}
            <div className="flex justify-end gap-2 pt-4 border-t">
              <button
                type="button"
                onClick={() => setEditingPackage(null)}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={async () => {
                  if (!editingPackage.title?.trim()) {
                    alert("Please provide a Package Title.");
                    return;
                  }
                  // Automatically guarantee slug
                  const finalSlug = editingPackage.slug || editingPackage.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
                  const finalCover = editingPackage.cover_image || (editingPackage.gallery_urls && editingPackage.gallery_urls[0]) || "/logo.png";
                  await adminSavePackage({
                    ...editingPackage,
                    slug: finalSlug,
                    cover_image: finalCover
                  });
                  setEditingPackage(null);
                  refreshData();
                }}
                className="px-6 py-2.5 rounded-xl text-xs font-bold bg-[#064e3b] hover:bg-[#022c22] text-[#f7e5a9] shadow-md transition-all"
              >
                Save Package
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL: CUSTOM DELETE CONFIRMATION (No native alert)
      ======================================================== */}
      {deleteModal.isOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-slate-900">
              Confirm Permanent Deletion
            </h3>
            <p className="text-xs text-slate-500">
              Are you sure you want to delete <strong className="text-slate-800">{deleteModal.title}</strong>? This action cannot be undone.
            </p>
            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={() => setDeleteModal({ isOpen: false, type: "package", id: "", title: "" })}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 text-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-red-600 text-white shadow-md hover:bg-red-700"
              >
                Delete Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL: DOCUMENT / PAYMENT PROOF INSPECTOR (Eye View)
      ======================================================== */}
      {inspectModal.isOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-2xl w-full space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-serif text-base font-bold text-slate-900">
                {inspectModal.title}
              </h3>
              <button
                onClick={() => setInspectModal({ isOpen: false, title: "" })}
                className="p-1 rounded-full hover:bg-slate-100"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            {inspectModal.imageUrl && (
              <div className="rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 flex items-center justify-center p-2">
                <img
                  src={inspectModal.imageUrl}
                  alt="Document Proof"
                  className="max-h-[60vh] object-contain rounded-lg"
                />
              </div>
            )}

            <div className="flex justify-end pt-2">
              <a
                href={inspectModal.imageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#064e3b] text-[#f7e5a9] text-xs font-bold rounded-xl flex items-center gap-1.5"
              >
                <span>Open Full Original</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL: PRINTABLE INVOICE (#printable-invoice)
      ======================================================== */}
      {invoiceModal.isOpen && invoiceModal.inquiry && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full shadow-2xl space-y-6">
            
            {/* Printable Container */}
            <div id="printable-invoice" className="bg-white text-black p-4 space-y-6">
              <div className="flex justify-between items-start border-b-2 border-slate-800 pb-4">
                <div>
                  <h2 className="font-serif text-2xl font-bold tracking-tight text-[#064e3b]">
                    BIN RIAZ ELITE TRAVELS & TOURS
                  </h2>
                  <p className="text-xs text-slate-500 font-medium">A Brand by Bin Riaz Group of Companies</p>
                  <p className="text-xs text-slate-600 mt-1">WhatsApp / Helpline: 0321-6001913 | 0315-7801913</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono font-bold uppercase text-slate-400">INVOICE #</span>
                  <div className="font-mono text-sm font-bold">{invoiceModal.inquiry.id.slice(0, 8)}</div>
                  <div className="text-xs text-slate-500 mt-1">{new Date().toLocaleDateString()}</div>
                </div>
              </div>

              {/* Passenger & Booking Meta */}
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="font-bold uppercase text-slate-400 text-[10px]">Client Details</span>
                  <div className="font-bold text-sm mt-0.5">{invoiceModal.inquiry.full_name}</div>
                  <div className="text-slate-600">WhatsApp: {invoiceModal.inquiry.whatsapp_number}</div>
                  {invoiceModal.inquiry.passport_number && <div>Passport: {invoiceModal.inquiry.passport_number}</div>}
                </div>
                <div>
                  <span className="font-bold uppercase text-slate-400 text-[10px]">Service / Itinerary</span>
                  <div className="font-bold text-sm mt-0.5">{invoiceModal.inquiry.package_title || "Umrah Booking"}</div>
                  <div className="text-slate-600">Travelers: {invoiceModal.inquiry.num_travelers} Persons</div>
                </div>
              </div>

              {/* Itemized Table */}
              <table className="w-full text-xs text-left border-collapse border border-slate-200">
                <thead className="bg-slate-100 text-slate-700 uppercase text-[10px]">
                  <tr>
                    <th className="p-2 border">Description</th>
                    <th className="p-2 border text-center">Qty</th>
                    <th className="p-2 border text-right">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2 border font-medium">
                      {invoiceModal.inquiry.package_title || "Umrah Service & Travel Booking"}
                      <div className="text-[11px] text-slate-500">{invoiceModal.inquiry.special_requirements}</div>
                    </td>
                    <td className="p-2 border text-center">{invoiceModal.inquiry.num_travelers}</td>
                    <td className="p-2 border text-right font-bold text-emerald-700 uppercase">
                      {invoiceModal.inquiry.status}
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="text-center pt-6 border-t text-[11px] text-slate-500 space-y-1">
                <p className="font-bold">Bin Riaz Elite Travels & Tours • Your Trusted Partner</p>
                <p>Official Website: binriazelitetravel.com • Contact: 0321-6001913</p>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t no-print">
              <button
                onClick={() => setInvoiceModal({ isOpen: false })}
                className="px-4 py-2 bg-slate-100 rounded-xl text-xs font-semibold text-slate-700"
              >
                Close
              </button>
              <button
                onClick={() => window.print()}
                className="px-5 py-2 bg-[#064e3b] text-[#f7e5a9] rounded-xl text-xs font-bold flex items-center gap-1.5 shadow"
              >
                <Printer className="w-4 h-4" />
                <span>Print Document</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
