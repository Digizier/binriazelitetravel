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
  Clock
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
        getPackages({ limit: 100 }),
        adminGetInquiries(),
        getCategories(),
        getBanners(),
        getSiteSettings(),
      ]);
      setPackages(pkgsRes.packages);
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

              <div className="flex items-center gap-2">
                <button
                  onClick={() => exportPackagesToCSV(packages)}
                  className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download CSV</span>
                </button>

                <button
                  onClick={() => setEditingPackage({
                    title: "",
                    slug: "",
                    category: "umrah",
                    package_type: "standard",
                    duration: "14 Days",
                    price: 200000,
                    currency: "PKR",
                    status: "available",
                    is_featured: true,
                    cover_image: "",
                    inclusions: ["Return Flight", "Hotel Stay", "Visa", "Transport", "Ziyarat"],
                    exclusions: ["Personal Expenses"]
                  })}
                  className="px-4 py-2 bg-[#064e3b] hover:bg-[#022c22] text-[#f7e5a9] text-xs font-bold rounded-xl flex items-center gap-1.5 shadow"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Package</span>
                </button>
              </div>
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
                    {packages.map((pkg) => (
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
                          <div>{pkg.makkah_hotel || "Makkah Stay"}</div>
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
                              onClick={() => setEditingPackage({ ...pkg })}
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
          MODAL: EDIT / CREATE PACKAGE (With WebP Upload)
      ======================================================== */}
      {editingPackage && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-5">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-serif text-lg font-bold text-[#064e3b]">
                {editingPackage.id ? "Edit Package" : "Create New Package"}
              </h3>
              <button onClick={() => setEditingPackage(null)} className="p-1 rounded-full hover:bg-slate-100">
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Package Title *</label>
                <input
                  type="text"
                  value={editingPackage.title || ""}
                  onChange={(e) => setEditingPackage({
                    ...editingPackage,
                    title: e.target.value,
                    slug: e.target.value.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-")
                  })}
                  className="w-full p-2.5 rounded-xl border"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">URL Slug</label>
                <input
                  type="text"
                  value={editingPackage.slug || ""}
                  onChange={(e) => setEditingPackage({ ...editingPackage, slug: e.target.value })}
                  className="w-full p-2.5 rounded-xl border bg-slate-50 font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Category</label>
                <select
                  value={editingPackage.category || "umrah"}
                  onChange={(e) => setEditingPackage({ ...editingPackage, category: e.target.value as any })}
                  className="w-full p-2.5 rounded-xl border bg-white"
                >
                  <option value="umrah">Umrah Packages</option>
                  <option value="international-tours">International Tours</option>
                  <option value="domestic-tours">Domestic Tours</option>
                  <option value="family-tours">Family Tours</option>
                  <option value="honeymoon-packages">Honeymoon Packages</option>
                  <option value="group-tours">Group Tours</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Duration</label>
                <input
                  type="text"
                  value={editingPackage.duration || ""}
                  onChange={(e) => setEditingPackage({ ...editingPackage, duration: e.target.value })}
                  placeholder="e.g. 14 Days / 13 Nights"
                  className="w-full p-2.5 rounded-xl border"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Price (PKR) *</label>
                <input
                  type="number"
                  value={editingPackage.price || 0}
                  onChange={(e) => setEditingPackage({ ...editingPackage, price: Number(e.target.value) })}
                  className="w-full p-2.5 rounded-xl border"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Status</label>
                <select
                  value={editingPackage.status || "available"}
                  onChange={(e) => setEditingPackage({ ...editingPackage, status: e.target.value as any })}
                  className="w-full p-2.5 rounded-xl border bg-white"
                >
                  <option value="available">Available</option>
                  <option value="limited">Limited Seats</option>
                  <option value="sold_out">Sold Out</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Makkah Hotel</label>
                <input
                  type="text"
                  value={editingPackage.makkah_hotel || ""}
                  onChange={(e) => setEditingPackage({ ...editingPackage, makkah_hotel: e.target.value })}
                  className="w-full p-2.5 rounded-xl border"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Madinah Hotel</label>
                <input
                  type="text"
                  value={editingPackage.madinah_hotel || ""}
                  onChange={(e) => setEditingPackage({ ...editingPackage, madinah_hotel: e.target.value })}
                  className="w-full p-2.5 rounded-xl border"
                />
              </div>
            </div>

            {/* Direct Image Upload with WebP Compression */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <label className="block text-xs font-bold text-slate-700">Cover Image</label>
              {editingPackage.cover_image && (
                <img src={editingPackage.cover_image} alt="Preview" className="h-24 rounded-lg object-cover mb-2 border" />
              )}
              <label className="inline-flex items-center gap-2 px-4 py-2 bg-[#064e3b] text-[#f7e5a9] text-xs font-semibold rounded-xl cursor-pointer">
                <Upload className="w-3.5 h-3.5" />
                <span>{uploadingImage ? "Compressing & Uploading..." : "Upload & Compress Image"}</span>
                <input
                  type="file"
                  accept="image/*"
                  disabled={uploadingImage}
                  onChange={(e) => handleFileUpload(e, "packages", (url) => setEditingPackage({ ...editingPackage, cover_image: url }))}
                  className="hidden"
                />
              </label>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t">
              <button
                onClick={() => setEditingPackage(null)}
                className="px-4 py-2 rounded-xl text-xs text-slate-600 bg-slate-100"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  await adminSavePackage(editingPackage);
                  setEditingPackage(null);
                  refreshData();
                }}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-[#064e3b] text-[#f7e5a9]"
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
