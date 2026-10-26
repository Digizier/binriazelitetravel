export interface Package {
  id: string;
  title: string;
  slug: string;
  category: 'umrah' | 'international-tours' | 'domestic-tours' | 'family-tours' | 'honeymoon-packages' | 'group-tours' | 'customized-tours' | 'holiday-packages';
  package_type?: 'popular' | 'family-favorite' | 'best-seller' | 'luxury' | 'economy' | 'standard';
  duration: string; // e.g. '12 Days / 11 Nights'
  departure_city?: string;
  departure_date?: string;
  return_date?: string;
  airline?: string;
  flight_number?: string;
  makkah_hotel?: string;
  makkah_distance?: string;
  madinah_hotel?: string;
  madinah_distance?: string;
  room_types?: string;
  price: number;
  currency: string;
  cover_image: string;
  gallery_urls?: string[];
  inclusions?: string[];
  exclusions?: string[];
  itinerary?: { day: number; title: string; desc: string }[];
  notes?: string;
  status: 'available' | 'sold_out' | 'limited';
  is_featured: boolean;
  display_order: number;
  created_at?: string;
  updated_at?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  parent_id?: string | null;
  type: 'umrah' | 'tour' | 'service';
  image_url?: string;
  show_in_top_categories: boolean;
  display_order: number;
  created_at?: string;
}

export interface Inquiry {
  id: string;
  inquiry_type: 'umrah_custom' | 'package_booking' | 'flight' | 'hotel' | 'visa' | 'transport' | 'general';
  package_id?: string | null;
  package_title?: string;
  full_name: string;
  whatsapp_number: string;
  phone_number?: string;
  email?: string;
  passport_number?: string;
  num_travelers: number;
  departure_city?: string;
  travel_date?: string;
  return_date?: string;
  stay_duration?: string;
  makkah_hotel_pref?: string;
  madinah_hotel_pref?: string;
  transport_type?: string;
  ziyarat_required?: boolean;
  taif_required?: boolean;
  budget_per_person?: string;
  special_requirements?: string;
  passport_image_url?: string;
  status: 'new' | 'contacted' | 'in_progress' | 'converted' | 'closed';
  admin_notes?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Banner {
  id: string;
  title?: string;
  subtitle?: string;
  image_url: string;
  mobile_image_url?: string;
  link_url?: string;
  display_order: number;
  is_active: boolean;
  created_at?: string;
}

export interface Testimonial {
  id: string;
  customer_name: string;
  customer_city: string;
  service_used: string;
  review_text: string;
  rating: number;
  is_approved: boolean;
  display_order?: number;
  created_at?: string;
}

export interface BankAccount {
  bank_name: string;
  account_title: string;
  account_number: string;
  iban?: string;
}

export interface SiteSettings {
  id: string;
  company_name: string;
  tagline: string;
  primary_phone: string;
  secondary_phone: string;
  whatsapp_number: string;
  email: string;
  office_address: string;
  tiktok_url: string;
  facebook_url: string;
  instagram_url: string;
  bank_accounts: BankAccount[];
  updated_at?: string;
}
