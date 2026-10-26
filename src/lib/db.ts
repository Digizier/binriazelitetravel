import { supabase } from './supabase';
import { Package, Category, Inquiry, Banner, Testimonial, SiteSettings } from '../types';

// Initial verified fallback packages matching the reference screenshot in case of cold network
export const FALLBACK_PACKAGES: Package[] = [
  {
    id: 'umrah-1',
    title: 'Premium Umrah Package',
    slug: 'premium-umrah-package',
    category: 'umrah',
    package_type: 'popular',
    duration: '12 Days / 11 Nights',
    departure_city: 'Islamabad / Lahore',
    departure_date: '25 Mar 2026',
    airline: 'Saudi Airlines',
    flight_number: 'SV-733',
    makkah_hotel: 'Swissotel Makkah (5★)',
    makkah_distance: '50m from Clock Tower / Haram',
    madinah_hotel: 'Dar Al Taqwa (5★)',
    madinah_distance: '100m from Masjid Nabawi',
    room_types: 'Quad / Triple / Double / Sharing',
    price: 245000,
    currency: 'PKR',
    cover_image: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=800&q=80',
    inclusions: ['Round Trip Flight', '5-Star Luxury Hotels', 'Saudi Umrah Visa', 'VIP Transport Bus', 'Complete Makkah & Madinah Ziyarat', 'Daily Breakfast Buffet'],
    exclusions: ['Personal Expenses', 'Room Service Extra Charges'],
    status: 'available',
    is_featured: true,
    display_order: 1,
  },
  {
    id: 'umrah-2',
    title: 'Standard Umrah Package',
    slug: 'standard-umrah-package',
    category: 'umrah',
    package_type: 'standard',
    duration: '15 Days / 14 Nights',
    departure_city: 'Islamabad / Lahore / Karachi',
    departure_date: '28 Mar 2026',
    airline: 'PIA / Flynas',
    flight_number: 'PK-741',
    makkah_hotel: 'Voco Makkah (4★)',
    makkah_distance: '300m Shuttle Service',
    madinah_hotel: 'Emaar Elite (4★)',
    madinah_distance: '250m from Markazia',
    room_types: 'Quad / Triple / Double',
    price: 185000,
    currency: 'PKR',
    cover_image: 'https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?auto=format&fit=crop&w=800&q=80',
    inclusions: ['Direct Flight Tickets', '4-Star Comfortable Hotels', 'Umrah Visa Processing', 'Complete AC Transport', 'Guided Ziyarat Tour'],
    exclusions: ['Lunch & Dinner', 'Laundry'],
    status: 'available',
    is_featured: true,
    display_order: 2,
  },
  {
    id: 'umrah-3',
    title: 'Economy Umrah Package',
    slug: 'economy-umrah-package',
    category: 'umrah',
    package_type: 'economy',
    duration: '14 Days / 13 Nights',
    departure_city: 'Lahore / Multan',
    departure_date: '28 Mar 2026',
    airline: 'Airblue / SereneAir',
    flight_number: 'PA-470',
    makkah_hotel: 'Al Kiswah Towers (3★)',
    makkah_distance: '800m 24/7 Free Shuttle',
    madinah_hotel: 'Diyar Al Habib (3★)',
    madinah_distance: '400m from Masjid Nabawi',
    room_types: 'Quad / Sharing',
    price: 150000,
    currency: 'PKR',
    cover_image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80',
    inclusions: ['Return Airfare', 'Budget Clean Hotel Stay', 'Electronic Umrah Visa', 'Intercity Group Transport', 'Ziyarat Tour'],
    exclusions: ['Food Meals', 'Personal Shopping'],
    status: 'available',
    is_featured: true,
    display_order: 3,
  },
  {
    id: 'umrah-4',
    title: 'Family Umrah Package',
    slug: 'family-umrah-package',
    category: 'umrah',
    package_type: 'family-favorite',
    duration: '14 Days / 13 Nights',
    departure_city: 'Islamabad / Lahore',
    departure_date: '10 Apr 2026',
    airline: 'Saudi Airlines',
    flight_number: 'SV-735',
    makkah_hotel: 'Movenpick Clock Tower (5★)',
    makkah_distance: 'Direct Haram Courtyard',
    madinah_hotel: 'Oberoi Madinah (5★)',
    madinah_distance: 'Front Row Ladies & Gents Gate',
    room_types: 'Family Suite / Double Connecting',
    price: 320000,
    currency: 'PKR',
    cover_image: 'https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?auto=format&fit=crop&w=800&q=80',
    inclusions: ['Direct Flights', '5-Star Haram Front Hotels', 'Private Family GMC Transport', 'VIP Fast-track Visa', 'Private Guided Ziyarat', 'Buffet Breakfast'],
    exclusions: ['Extra Baggage charges'],
    status: 'limited',
    is_featured: true,
    display_order: 4,
  },
  {
    id: 'tour-1',
    title: 'Istanbul & Cappadocia Tour',
    slug: 'istanbul-cappadocia-tour',
    category: 'international-tours',
    package_type: 'popular',
    duration: '7 Days / 6 Nights',
    departure_city: 'Islamabad / Lahore',
    airline: 'Turkish Airlines',
    makkah_hotel: 'Istanbul Central Hotel (4★)',
    makkah_distance: 'Taksim Square',
    madinah_hotel: 'Cappadocia Cave Resort',
    madinah_distance: 'Goreme Valley',
    room_types: 'Double / Twin / Single',
    price: 285000,
    currency: 'PKR',
    cover_image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=800&q=80',
    inclusions: ['International Flights', '4-Star Hotels', 'Hot Air Balloon Tour (Optional)', 'Bosphorus Cruise Dinner', 'Daily Breakfast', 'Visa Assistance'],
    exclusions: ['Personal Expenses', 'Travel Insurance'],
    status: 'available',
    is_featured: true,
    display_order: 5,
  },
  {
    id: 'tour-2',
    title: 'Kuala Lumpur & Genting Tour',
    slug: 'kuala-lumpur-genting-tour',
    category: 'international-tours',
    package_type: 'family-favorite',
    duration: '6 Days / 5 Nights',
    departure_city: 'Karachi / Lahore',
    airline: 'Batik Air / Malindo',
    makkah_hotel: 'Furama Bukit Bintang (4★)',
    makkah_distance: 'City Center KL',
    madinah_hotel: 'First World Genting',
    madinah_distance: 'Resorts World Genting',
    room_types: 'Double / Family Suite',
    price: 195000,
    currency: 'PKR',
    cover_image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=800&q=80',
    inclusions: ['Air Tickets', 'Luxury Hotel Stay', 'Batu Caves & City Tour', 'Cable Car Genting Tickets', 'Airport Transfers', 'Tourist Visa E-Visa'],
    exclusions: ['Theme park tickets outside itinerary'],
    status: 'available',
    is_featured: true,
    display_order: 6,
  },
  {
    id: 'tour-3',
    title: 'Dubai City & Desert Safari',
    slug: 'dubai-city-desert-safari',
    category: 'international-tours',
    package_type: 'best-seller',
    duration: '5 Days / 4 Nights',
    departure_city: 'Islamabad / Lahore / Karachi',
    airline: 'Emirates / Flydubai',
    makkah_hotel: 'Citymax Hotel Al Barsha (4★)',
    makkah_distance: 'Near Mall of Emirates',
    room_types: 'Double / Triple',
    price: 220000,
    currency: 'PKR',
    cover_image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
    inclusions: ['Return Airfare', '4-Star Hotel Stay', 'Desert Safari with BBQ Dinner & Dune Bashing', 'Marina Dhow Cruise', 'Dubai 30-Day Tourist Visa', 'Airport Pick & Drop'],
    exclusions: ['Tourism Dirham Fee', 'Burj Khalifa Top Tickets'],
    status: 'available',
    is_featured: true,
    display_order: 7,
  },
  {
    id: 'tour-4',
    title: 'Swiss Alps & Europe Tour',
    slug: 'swiss-alps-europe-tour',
    category: 'international-tours',
    package_type: 'luxury',
    duration: '8 Days / 7 Nights',
    departure_city: 'Islamabad',
    airline: 'Qatar Airways',
    makkah_hotel: 'Hotel Central Plaza Zurich',
    makkah_distance: 'Zurich Center',
    madinah_hotel: 'Hotel Interlaken',
    madinah_distance: 'Lucerne & Interlaken',
    room_types: 'Deluxe Twin / King',
    price: 450000,
    currency: 'PKR',
    cover_image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80',
    inclusions: ['Schengen Visa Guidance', 'Swiss Travel Pass', 'Mount Titlis Cable Car', 'Scenic Train Rides', 'Breakfast & Guided Tours'],
    exclusions: ['Visa Embassy Fees', 'Personal Shopping'],
    status: 'available',
    is_featured: true,
    display_order: 8,
  }
];

export const FALLBACK_CATEGORIES: Category[] = [
  { id: 'c-1', name: 'All Tours', slug: 'all-tours', type: 'tour', show_in_top_categories: true, display_order: 1 },
  { id: 'c-2', name: 'Family Tours', slug: 'family-tours', type: 'tour', show_in_top_categories: true, display_order: 2 },
  { id: 'c-3', name: 'Honeymoon Packages', slug: 'honeymoon-packages', type: 'tour', show_in_top_categories: true, display_order: 3 },
  { id: 'c-4', name: 'Group Tours', slug: 'group-tours', type: 'tour', show_in_top_categories: true, display_order: 4 },
  { id: 'c-5', name: 'Customized Tours', slug: 'customized-tours', type: 'tour', show_in_top_categories: true, display_order: 5 },
  { id: 'c-6', name: 'Holiday Packages', slug: 'holiday-packages', type: 'tour', show_in_top_categories: true, display_order: 6 },
  { id: 'c-7', name: 'Premium Umrah', slug: 'premium-umrah', type: 'umrah', show_in_top_categories: true, display_order: 7 },
  { id: 'c-8', name: 'Economy Umrah', slug: 'economy-umrah', type: 'umrah', show_in_top_categories: true, display_order: 8 },
];

export const FALLBACK_SETTINGS: SiteSettings = {
  id: 'global',
  company_name: 'Bin Riaz Elite Travels & Tours',
  tagline: 'Your Trusted Travel & Umrah Partner',
  primary_phone: '0321-6001913',
  secondary_phone: '0315-7801913',
  whatsapp_number: '03216001913',
  email: 'binriazelitetravel@gmail.com',
  office_address: 'Bin Riaz Group of Companies, Pakistan',
  tiktok_url: 'https://www.tiktok.com/@binriazgroup',
  facebook_url: 'https://www.facebook.com/profile.php?id=61592274299457',
  instagram_url: 'https://www.instagram.com/binriazgroup',
  bank_accounts: [
    {
      bank_name: 'Meezan Bank',
      account_title: 'Bin Riaz Elite Travel & Tours',
      account_number: '01020304050607',
      iban: 'PK00MEZN0001020304050607'
    },
    {
      bank_name: 'JazzCash',
      account_title: 'Malik Amir Riaz',
      account_number: '03216001913'
    },
    {
      bank_name: 'EasyPaisa',
      account_title: 'Malik Amir Riaz',
      account_number: '03157801913'
    }
  ]
};

// ==========================================
// Comprehensive & Lean Package Projections
// ==========================================
const PACKAGE_LIST_FIELDS = `
  id, title, slug, category, package_type, duration, departure_city, departure_date,
  airline, flight_number, makkah_hotel, makkah_distance, madinah_hotel, madinah_distance,
  room_types, price, currency, cover_image, gallery_urls, inclusions, exclusions,
  notes, description, status, is_featured, display_order, created_at, updated_at
`;

export async function adminGetPackages(): Promise<Package[]> {
  try {
    const { data, error } = await supabase
      .from('packages')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      return FALLBACK_PACKAGES;
    }
    return data as Package[];
  } catch (err) {
    console.error('adminGetPackages error:', err);
    return FALLBACK_PACKAGES;
  }
}

export async function getPackages(options?: {
  category?: string;
  featuredOnly?: boolean;
  limit?: number;
  offset?: number;
  search?: string;
}): Promise<{ packages: Package[]; totalCount: number }> {
  try {
    let query = supabase
      .from('packages')
      .select(PACKAGE_LIST_FIELDS, { count: 'exact' })
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: false });

    if (options?.category && options.category !== 'all' && options.category !== 'all-tours') {
      if (options.category === 'umrah') {
        query = query.eq('category', 'umrah');
      } else if (options.category.includes('tour')) {
        query = query.ilike('category', `%${options.category}%`);
      } else {
        query = query.eq('category', options.category);
      }
    }

    if (options?.featuredOnly) {
      query = query.eq('is_featured', true);
    }

    if (options?.search) {
      const term = options.search.trim();
      query = query.or(`title.ilike.%${term}%,departure_city.ilike.%${term}%,makkah_hotel.ilike.%${term}%`);
    }

    const limit = options?.limit ?? 8;
    const offset = options?.offset ?? 0;
    query = query.range(offset, offset + limit - 1);

    const { data, count, error } = await query;

    if (error || !data || data.length === 0) {
      // Fallback
      let filtered = [...FALLBACK_PACKAGES];
      if (options?.category && options.category !== 'all' && options.category !== 'all-tours') {
        filtered = filtered.filter(p => p.category === options.category);
      }
      if (options?.featuredOnly) {
        filtered = filtered.filter(p => p.is_featured);
      }
      return {
        packages: filtered.slice(offset, offset + limit) as Package[],
        totalCount: filtered.length
      };
    }

    return {
      packages: data as Package[],
      totalCount: count ?? data.length
    };
  } catch (err) {
    console.error('getPackages error:', err);
    return { packages: FALLBACK_PACKAGES.slice(0, options?.limit ?? 8), totalCount: FALLBACK_PACKAGES.length };
  }
}

export async function getPackageBySlug(slug: string): Promise<Package | null> {
  try {
    const { data, error } = await supabase
      .from('packages')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error || !data) {
      const match = FALLBACK_PACKAGES.find(p => p.slug === slug);
      return match || null;
    }

    return data as Package;
  } catch (err) {
    console.error('getPackageBySlug error:', err);
    return FALLBACK_PACKAGES.find(p => p.slug === slug) || null;
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('id, name, slug, parent_id, type, image_url, show_in_top_categories, display_order')
      .order('display_order', { ascending: true });

    if (error || !data || data.length === 0) {
      return FALLBACK_CATEGORIES;
    }

    return data as Category[];
  } catch (err) {
    console.error('getCategories error:', err);
    return FALLBACK_CATEGORIES;
  }
}

export async function getBanners(): Promise<Banner[]> {
  try {
    const { data, error } = await supabase
      .from('banners')
      .select('id, title, subtitle, image_url, mobile_image_url, link_url, display_order, is_active')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (error || !data || data.length === 0) {
      return [
        {
          id: 'b-1',
          title: 'Sacred Journeys, Lasting Memories',
          subtitle: 'Your Trusted Partner for Umrah, Hajj & Worldwide Travel',
          image_url: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=1920&q=85',
          display_order: 1,
          is_active: true
        },
        {
          id: 'b-2',
          title: 'Explore the World in Luxury',
          subtitle: 'Handpicked International & Domestic Tour Packages',
          image_url: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1920&q=85',
          display_order: 2,
          is_active: true
        },
        {
          id: 'b-3',
          title: 'VIP Visa & Travel Assistance',
          subtitle: 'Saudi Umrah, Tourist & International Visit Visas',
          image_url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1920&q=85',
          display_order: 3,
          is_active: true
        }
      ];
    }

    return data as Banner[];
  } catch (err) {
    console.error('getBanners error:', err);
    return [];
  }
}

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const { data, error } = await supabase
      .from('testimonials')
      .select('id, customer_name, customer_city, service_used, review_text, rating, is_approved')
      .eq('is_approved', true)
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      return [
        {
          id: 't-1',
          customer_name: 'Ayesha Khan',
          customer_city: 'Karachi',
          service_used: 'Premium Umrah Package',
          review_text: 'Alhamdulillah, our Umrah journey was smooth and well organized. The Swissotel Clock Tower stay was so close to Haram, and the team was very supportive throughout.',
          rating: 5,
          is_approved: true
        },
        {
          id: 't-2',
          customer_name: 'Muhammad Ali',
          customer_city: 'Lahore',
          service_used: 'Family Umrah Package',
          review_text: 'We had a wonderful family trip to Makkah and Madinah. The hotels and guides were excellent. Highly recommended for families with elders and children!',
          rating: 5,
          is_approved: true
        },
        {
          id: 't-3',
          customer_name: 'Sana Rehman',
          customer_city: 'Islamabad',
          service_used: 'Dubai City & Desert Safari',
          review_text: 'Professional service, smooth process and great support. Will definitely travel again with Bin Riaz Elite Travels!',
          rating: 5,
          is_approved: true
        },
        {
          id: 't-4',
          customer_name: 'Fahad Ahmad',
          customer_city: 'Multan',
          service_used: 'Istanbul & Cappadocia Tour',
          review_text: 'Our Turkey trip was unforgettable. Everything was perfectly planned, from the hotels to the Bosphorus cruise dinner. Thank you Malik Amir Riaz and team!',
          rating: 5,
          is_approved: true
        }
      ];
    }

    return data as Testimonial[];
  } catch (err) {
    console.error('getTestimonials error:', err);
    return [];
  }
}

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .eq('id', 'global')
      .single();

    if (error || !data) {
      return FALLBACK_SETTINGS;
    }

    return data as SiteSettings;
  } catch (err) {
    console.error('getSiteSettings error:', err);
    return FALLBACK_SETTINGS;
  }
}

export async function createInquiry(inquiryData: Partial<Inquiry>): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    const { data, error } = await supabase
      .from('inquiries')
      .insert([{
        ...inquiryData,
        status: 'new'
      }])
      .select('id')
      .single();

    if (error) {
      throw error;
    }

    // Dispatch custom browser event for live reactive update
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('kb_inquiries_updated'));
    }

    return { success: true, id: data?.id };
  } catch (err: any) {
    console.error('createInquiry error:', err);
    return { success: false, error: err.message || 'Failed to submit inquiry' };
  }
}

// ==========================================
// Admin CRUD Operations
// ==========================================
export async function adminGetInquiries(): Promise<Inquiry[]> {
  const { data, error } = await supabase
    .from('inquiries')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('adminGetInquiries error:', error);
    return [];
  }
  return (data || []) as Inquiry[];
}

export async function adminUpdateInquiryStatus(id: string, status: Inquiry['status'], adminNotes?: string): Promise<boolean> {
  const updatePayload: any = { status, updated_at: new Date().toISOString() };
  if (adminNotes !== undefined) updatePayload.admin_notes = adminNotes;

  const { error } = await supabase
    .from('inquiries')
    .update(updatePayload)
    .eq('id', id);

  if (!error && typeof window !== 'undefined') {
    window.dispatchEvent(new Event('kb_inquiries_updated'));
  }
  return !error;
}

export async function adminDeleteInquiry(id: string): Promise<boolean> {
  const { error } = await supabase.from('inquiries').delete().eq('id', id);
  if (!error && typeof window !== 'undefined') {
    window.dispatchEvent(new Event('kb_inquiries_updated'));
  }
  return !error;
}

export async function adminSavePackage(pkg: Partial<Package>): Promise<{ success: boolean; error?: string }> {
  try {
    if (pkg.id && pkg.id.length > 10 && !pkg.id.startsWith('umrah-') && !pkg.id.startsWith('tour-')) {
      // Update
      const { error } = await supabase
        .from('packages')
        .update({ ...pkg, updated_at: new Date().toISOString() })
        .eq('id', pkg.id);
      if (error) throw error;
    } else {
      // Create
      const newPkg = { ...pkg };
      delete (newPkg as any).id;
      const { error } = await supabase
        .from('packages')
        .insert([newPkg]);
      if (error) throw error;
    }

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('kb_packages_updated'));
    }
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'Error saving package' };
  }
}

export async function adminDeletePackage(id: string): Promise<boolean> {
  const { error } = await supabase.from('packages').delete().eq('id', id);
  if (!error && typeof window !== 'undefined') {
    window.dispatchEvent(new Event('kb_packages_updated'));
  }
  return !error;
}

export async function adminSaveCategory(category: Partial<Category>): Promise<{ success: boolean; error?: string }> {
  try {
    if (category.id && category.id.length > 10 && !category.id.startsWith('c-')) {
      const { error } = await supabase.from('categories').update(category).eq('id', category.id);
      if (error) throw error;
    } else {
      const newCat = { ...category };
      delete (newCat as any).id;
      const { error } = await supabase.from('categories').insert([newCat]);
      if (error) throw error;
    }
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('kb_categories_updated'));
    }
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function adminDeleteCategory(id: string): Promise<boolean> {
  const { error } = await supabase.from('categories').delete().eq('id', id);
  if (!error && typeof window !== 'undefined') {
    window.dispatchEvent(new Event('kb_categories_updated'));
  }
  return !error;
}

export async function adminSaveBanner(banner: Partial<Banner>): Promise<{ success: boolean; error?: string }> {
  try {
    if (banner.id && banner.id.length > 10 && !banner.id.startsWith('b-')) {
      const { error } = await supabase.from('banners').update(banner).eq('id', banner.id);
      if (error) throw error;
    } else {
      const newB = { ...banner };
      delete (newB as any).id;
      const { error } = await supabase.from('banners').insert([newB]);
      if (error) throw error;
    }
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('kb_banners_updated'));
    }
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function adminDeleteBanner(id: string): Promise<boolean> {
  const { error } = await supabase.from('banners').delete().eq('id', id);
  if (!error && typeof window !== 'undefined') {
    window.dispatchEvent(new Event('kb_banners_updated'));
  }
  return !error;
}

export async function adminSaveSiteSettings(settings: Partial<SiteSettings>): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from('site_settings')
      .upsert({
        id: 'global',
        ...settings,
        updated_at: new Date().toISOString()
      });

    if (error) throw error;
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('kb_settings_updated'));
    }
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

/**
 * Export Packages as CSV format
 */
export function exportPackagesToCSV(packages: Package[]): void {
  const headers = ['ID', 'Title', 'Slug', 'Category', 'Duration', 'Price', 'Airline', 'Makkah Hotel', 'Madinah Hotel', 'Status', 'Cover Image'];
  const rows = packages.map(p => [
    p.id,
    `"${(p.title || '').replace(/"/g, '""')}"`,
    p.slug,
    p.category,
    p.duration,
    p.price,
    `"${(p.airline || '').replace(/"/g, '""')}"`,
    `"${(p.makkah_hotel || '').replace(/"/g, '""')}"`,
    `"${(p.madinah_hotel || '').replace(/"/g, '""')}"`,
    p.status,
    p.cover_image
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `bin_riaz_packages_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
