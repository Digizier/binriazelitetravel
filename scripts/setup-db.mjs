import pg from 'pg';
const { Client } = pg;

async function setupDatabase() {
  const client = new Client({
    host: 'aws-0-ap-southeast-1.pooler.supabase.com',
    port: 6543,
    user: 'postgres.abfhvkbdibeejfihrcqm',
    password: 'Kwanz8cNgYz.?R',
    database: 'postgres',
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();
    console.log('✅ Connected to Supabase Pooler (ap-southeast-1:6543)!');

    const sql = `
      -- 1. Create packages table
      CREATE TABLE IF NOT EXISTS public.packages (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        category TEXT NOT NULL DEFAULT 'umrah', -- 'umrah', 'international-tours', 'domestic-tours', 'family-tours', 'honeymoon-packages', 'group-tours'
        package_type TEXT DEFAULT 'standard', -- 'popular', 'family-favorite', 'best-seller', 'luxury', 'economy'
        duration TEXT NOT NULL, -- e.g. '12 Days / 11 Nights'
        departure_city TEXT DEFAULT 'Islamabad / Lahore',
        departure_date TEXT,
        return_date TEXT,
        airline TEXT DEFAULT 'Saudi Airlines',
        flight_number TEXT,
        makkah_hotel TEXT,
        makkah_distance TEXT,
        madinah_hotel TEXT,
        madinah_distance TEXT,
        room_types TEXT DEFAULT 'Quad / Triple / Double',
        price NUMERIC NOT NULL DEFAULT 0,
        currency TEXT DEFAULT 'PKR',
        cover_image TEXT,
        gallery_urls JSONB DEFAULT '[]'::jsonb,
        inclusions TEXT[] DEFAULT ARRAY[]::TEXT[],
        exclusions TEXT[] DEFAULT ARRAY[]::TEXT[],
        itinerary JSONB DEFAULT '[]'::jsonb,
        notes TEXT,
        status TEXT DEFAULT 'available', -- 'available', 'sold_out', 'limited'
        is_featured BOOLEAN DEFAULT true,
        display_order INT DEFAULT 0,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );

      -- 2. Create categories table
      CREATE TABLE IF NOT EXISTS public.categories (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        parent_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
        type TEXT DEFAULT 'umrah', -- 'umrah', 'tour', 'service'
        image_url TEXT,
        show_in_top_categories BOOLEAN DEFAULT true,
        display_order INT DEFAULT 0,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );

      -- 3. Create inquiries table (Support passport & payment screenshot attachment)
      CREATE TABLE IF NOT EXISTS public.inquiries (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        inquiry_type TEXT NOT NULL DEFAULT 'general', -- 'umrah_custom', 'package_booking', 'flight', 'hotel', 'visa', 'transport', 'general'
        package_id UUID REFERENCES public.packages(id) ON DELETE SET NULL,
        package_title TEXT,
        full_name TEXT NOT NULL,
        whatsapp_number TEXT NOT NULL,
        phone_number TEXT,
        email TEXT,
        passport_number TEXT,
        num_travelers INT DEFAULT 1,
        departure_city TEXT,
        travel_date TEXT,
        return_date TEXT,
        stay_duration TEXT,
        makkah_hotel_pref TEXT,
        madinah_hotel_pref TEXT,
        transport_type TEXT,
        ziyarat_required BOOLEAN DEFAULT false,
        taif_required BOOLEAN DEFAULT false,
        budget_per_person TEXT,
        special_requirements TEXT,
        passport_image_url TEXT,
        status TEXT DEFAULT 'new', -- 'new', 'contacted', 'in_progress', 'converted', 'closed'
        admin_notes TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );

      -- 4. Create banners table (Hero Banners Hub)
      CREATE TABLE IF NOT EXISTS public.banners (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title TEXT,
        subtitle TEXT,
        image_url TEXT NOT NULL,
        mobile_image_url TEXT,
        link_url TEXT,
        display_order INT DEFAULT 0,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );

      -- 5. Create testimonials table
      CREATE TABLE IF NOT EXISTS public.testimonials (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        customer_name TEXT NOT NULL,
        customer_city TEXT DEFAULT 'Pakistan',
        service_used TEXT DEFAULT 'Umrah Package',
        review_text TEXT NOT NULL,
        rating INT DEFAULT 5,
        is_approved BOOLEAN DEFAULT true,
        display_order INT DEFAULT 0,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );

      -- 6. Create site_settings table
      CREATE TABLE IF NOT EXISTS public.site_settings (
        id TEXT PRIMARY KEY DEFAULT 'global',
        company_name TEXT DEFAULT 'Bin Riaz Elite Travels & Tours',
        tagline TEXT DEFAULT 'Your Trusted Travel & Umrah Partner',
        primary_phone TEXT DEFAULT '0321-6001913',
        secondary_phone TEXT DEFAULT '0315-7801913',
        whatsapp_number TEXT DEFAULT '0321-6001913',
        email TEXT DEFAULT 'info@binriazelitetravel.com',
        office_address TEXT DEFAULT 'Bin Riaz Group, Pakistan',
        tiktok_url TEXT DEFAULT 'https://www.tiktok.com/@binriazgroup',
        facebook_url TEXT DEFAULT 'https://www.facebook.com/profile.php?id=61592274299457',
        instagram_url TEXT DEFAULT 'https://www.instagram.com/binriazgroup',
        bank_accounts JSONB DEFAULT '[
          {
            "bank_name": "Meezan Bank",
            "account_title": "Bin Riaz Elite Travel & Tours",
            "account_number": "01020304050607",
            "iban": "PK00MEZN0001020304050607"
          },
          {
            "bank_name": "JazzCash",
            "account_title": "Malik Amir Riaz",
            "account_number": "03216001913"
          },
          {
            "bank_name": "EasyPaisa",
            "account_title": "Malik Amir Riaz",
            "account_number": "03157801913"
          }
        ]'::jsonb,
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );

      -- Enable RLS on all tables
      ALTER TABLE public.packages ENABLE ROW LEVEL SECURITY;
      ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
      ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
      ALTER TABLE public.banners ENABLE ROW LEVEL SECURITY;
      ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
      ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

      -- Post-October 30 Grants
      GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
      GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon, authenticated, service_role;
      GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated, service_role;
      
      -- Public visitor permissions:
      GRANT INSERT ON public.inquiries TO anon;
      
      DROP POLICY IF EXISTS "Public can view active packages" ON public.packages;
      CREATE POLICY "Public can view active packages" ON public.packages FOR SELECT USING (true);
      
      DROP POLICY IF EXISTS "Admin full access on packages" ON public.packages;
      CREATE POLICY "Admin full access on packages" ON public.packages FOR ALL USING (true) WITH CHECK (true);

      DROP POLICY IF EXISTS "Public can view categories" ON public.categories;
      CREATE POLICY "Public can view categories" ON public.categories FOR SELECT USING (true);

      DROP POLICY IF EXISTS "Admin full access on categories" ON public.categories;
      CREATE POLICY "Admin full access on categories" ON public.categories FOR ALL USING (true) WITH CHECK (true);

      DROP POLICY IF EXISTS "Public can create inquiries" ON public.inquiries;
      CREATE POLICY "Public can create inquiries" ON public.inquiries FOR INSERT WITH CHECK (true);

      DROP POLICY IF EXISTS "Admin full access on inquiries" ON public.inquiries;
      CREATE POLICY "Admin full access on inquiries" ON public.inquiries FOR ALL USING (true) WITH CHECK (true);

      DROP POLICY IF EXISTS "Public can view banners" ON public.banners;
      CREATE POLICY "Public can view banners" ON public.banners FOR SELECT USING (true);

      DROP POLICY IF EXISTS "Admin full access on banners" ON public.banners;
      CREATE POLICY "Admin full access on banners" ON public.banners FOR ALL USING (true) WITH CHECK (true);

      DROP POLICY IF EXISTS "Public can view testimonials" ON public.testimonials;
      CREATE POLICY "Public can view testimonials" ON public.testimonials FOR SELECT USING (true);

      DROP POLICY IF EXISTS "Admin full access on testimonials" ON public.testimonials;
      CREATE POLICY "Admin full access on testimonials" ON public.testimonials FOR ALL USING (true) WITH CHECK (true);

      DROP POLICY IF EXISTS "Public can view site settings" ON public.site_settings;
      CREATE POLICY "Public can view site settings" ON public.site_settings FOR SELECT USING (true);

      DROP POLICY IF EXISTS "Admin full access on site settings" ON public.site_settings;
      CREATE POLICY "Admin full access on site settings" ON public.site_settings FOR ALL USING (true) WITH CHECK (true);

      -- Storage Bucket Setup for 'media'
      INSERT INTO storage.buckets (id, name, public) 
      VALUES ('media', 'media', true)
      ON CONFLICT (id) DO UPDATE SET public = true;

      -- Storage policies for media
      DROP POLICY IF EXISTS "Public Media Read" ON storage.objects;
      CREATE POLICY "Public Media Read" ON storage.objects FOR SELECT USING (bucket_id = 'media');

      DROP POLICY IF EXISTS "Public Media Insert" ON storage.objects;
      CREATE POLICY "Public Media Insert" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'media');

      DROP POLICY IF EXISTS "Admin Media All" ON storage.objects;
      CREATE POLICY "Admin Media All" ON storage.objects FOR ALL USING (bucket_id = 'media') WITH CHECK (bucket_id = 'media');
    `;

    await client.query(sql);
    console.log('✅ Tables, Grants, RLS Policies, and Storage Bucket verified!');

    // Check count of packages
    const countRes = await client.query('SELECT count(*) FROM public.packages');
    const count = parseInt(countRes.rows[0].count, 10);
    console.log('Current package count in DB:', count);

    if (count === 0) {
      console.log('Seeding initial verified packages based on user reference mockups...');
      
      // Seed Initial Umrah Packages (matching the exact reference screenshot)
      const initialPackages = [
        {
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
          cover_image: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=800&q=80',
          inclusions: ['Round Trip Flight', '5-Star Luxury Hotels', 'Saudi Umrah Visa', 'VIP Transport Bus', 'Complete Makkah & Madinah Ziyarat', 'Daily Breakfast Buffet'],
          exclusions: ['Personal Expenses', 'Room Service Extra Charges'],
          status: 'available',
          is_featured: true,
          display_order: 1
        },
        {
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
          cover_image: 'https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?auto=format&fit=crop&w=800&q=80',
          inclusions: ['Direct Flight Tickets', '4-Star Comfortable Hotels', 'Umrah Visa Processing', 'Complete AC Transport', 'Guided Ziyarat Tour'],
          exclusions: ['Lunch & Dinner', 'Laundry'],
          status: 'available',
          is_featured: true,
          display_order: 2
        },
        {
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
          cover_image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80',
          inclusions: ['Return Airfare', 'Budget Clean Hotel Stay', 'Electronic Umrah Visa', 'Intercity Group Transport', 'Ziyarat Tour'],
          exclusions: ['Food Meals', 'Personal Shopping'],
          status: 'available',
          is_featured: true,
          display_order: 3
        },
        {
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
          cover_image: 'https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?auto=format&fit=crop&w=800&q=80',
          inclusions: ['Direct Flights', '5-Star Haram Front Hotels', 'Private Family GMC Transport', 'VIP Fast-track Visa', 'Private Guided Ziyarat', 'Buffet Breakfast'],
          exclusions: ['Extra Baggage charges'],
          status: 'limited',
          is_featured: true,
          display_order: 4
        },
        // Seed International Tours (matching Reference Image 1)
        {
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
          cover_image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=800&q=80',
          inclusions: ['International Flights', '4-Star Hotels', 'Hot Air Balloon Tour (Optional)', 'Bosphorus Cruise Dinner', 'Daily Breakfast', 'Visa Assistance'],
          exclusions: ['Personal Expenses', 'Travel Insurance'],
          status: 'available',
          is_featured: true,
          display_order: 5
        },
        {
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
          cover_image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=800&q=80',
          inclusions: ['Air Tickets', 'Luxury Hotel Stay', 'Batu Caves & City Tour', 'Cable Car Genting Tickets', 'Airport Transfers', 'Tourist Visa E-Visa'],
          exclusions: ['Theme park tickets outside itinerary'],
          status: 'available',
          is_featured: true,
          display_order: 6
        },
        {
          title: 'Dubai City & Desert Safari',
          slug: 'dubai-city-desert-safari',
          category: 'international-tours',
          package_type: 'best-seller',
          duration: '5 Days / 4 Nights',
          departure_city: 'Islamabad / Lahore / Karachi',
          airline: 'Emirates / Flydubai',
          makkah_hotel: 'Citymax Hotel Al Barsha (4★)',
          makkah_distance: 'Near Mall of Emirates',
          madinah_hotel: '',
          madinah_distance: '',
          room_types: 'Double / Triple',
          price: 220000,
          cover_image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
          inclusions: ['Return Airfare', '4-Star Hotel Stay', 'Desert Safari with BBQ Dinner & Dune Bashing', 'Marina Dhow Cruise', 'Dubai 30-Day Tourist Visa', 'Airport Pick & Drop'],
          exclusions: ['Tourism Dirham Fee', 'Burj Khalifa Top Tickets'],
          status: 'available',
          is_featured: true,
          display_order: 7
        },
        {
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
          cover_image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80',
          inclusions: ['Schengen Visa Guidance', 'Swiss Travel Pass', 'Mount Titlis Cable Car', 'Scenic Train Rides', 'Breakfast & Guided Tours'],
          exclusions: ['Visa Embassy Fees', 'Personal Shopping'],
          status: 'available',
          is_featured: true,
          display_order: 8
        },
        {
          title: 'Baku Discovery Tour',
          slug: 'baku-discovery-tour',
          category: 'international-tours',
          package_type: 'popular',
          duration: '6 Days / 5 Nights',
          departure_city: 'Islamabad / Lahore',
          airline: 'Azerbaijan Airlines (AZAL)',
          makkah_hotel: 'Winter Park Hotel Baku (4★)',
          makkah_distance: 'Nizami Street Walking Distance',
          madinah_hotel: '',
          madinah_distance: '',
          room_types: 'Double / Triple',
          price: 180000,
          cover_image: 'https://images.unsplash.com/photo-1594007654729-407eedc4be65?auto=format&fit=crop&w=800&q=80',
          inclusions: ['Direct Flights', '4-Star City Center Hotel', 'Old City & Flame Towers Tour', 'Ateshgah Fire Temple & Yanardag', 'Gabala Mountain Day Trip', 'E-Visa'],
          exclusions: ['Lunches & Dinners'],
          status: 'available',
          is_featured: true,
          display_order: 9
        },
        {
          title: 'Maldives Beach Getaway',
          slug: 'maldives-beach-getaway',
          category: 'international-tours',
          package_type: 'honeymoon-packages',
          duration: '5 Days / 4 Nights',
          departure_city: 'Karachi / Lahore / Islamabad',
          airline: 'SriLankan Airlines',
          makkah_hotel: 'Paradise Island Resort & Spa',
          makkah_distance: 'Water Villa Overwater Bungalow',
          madinah_hotel: '',
          madinah_distance: '',
          room_types: 'Water Villa / Beach Bungalow',
          price: 320000,
          cover_image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80',
          inclusions: ['Speedboat Transfers', 'Overwater Villa Stay', 'All-Inclusive Meals (Breakfast, Lunch, Dinner)', 'Snorkeling & Coral Reef Tour', 'On-Arrival Visa'],
          exclusions: ['Scuba Diving certification'],
          status: 'available',
          is_featured: true,
          display_order: 10
        }
      ];

      for (const pkg of initialPackages) {
        await client.query(`
          INSERT INTO public.packages (
            title, slug, category, package_type, duration, departure_city, departure_date,
            airline, flight_number, makkah_hotel, makkah_distance, madinah_hotel, madinah_distance,
            room_types, price, cover_image, inclusions, exclusions, status, is_featured, display_order
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21)
          ON CONFLICT (slug) DO UPDATE SET price = EXCLUDED.price;
        `, [
          pkg.title, pkg.slug, pkg.category, pkg.package_type, pkg.duration, pkg.departure_city, pkg.departure_date,
          pkg.airline, pkg.flight_number, pkg.makkah_hotel, pkg.makkah_distance, pkg.madinah_hotel, pkg.madinah_distance,
          pkg.room_types, pkg.price, pkg.cover_image, pkg.inclusions, pkg.exclusions, pkg.status, pkg.is_featured, pkg.display_order
        ]);
      }
      console.log('✅ Seeded 10 verified packages (Umrah + Tours).');

      // Seed Categories matching the reference tabs & structure
      const categories = [
        { name: 'All Tours', slug: 'all-tours', type: 'tour', order: 1 },
        { name: 'Family Tours', slug: 'family-tours', type: 'tour', order: 2 },
        { name: 'Honeymoon Packages', slug: 'honeymoon-packages', type: 'tour', order: 3 },
        { name: 'Group Tours', slug: 'group-tours', type: 'tour', order: 4 },
        { name: 'Customized Tours', slug: 'customized-tours', type: 'tour', order: 5 },
        { name: 'Holiday Packages', slug: 'holiday-packages', type: 'tour', order: 6 },
        { name: 'Premium Umrah', slug: 'premium-umrah', type: 'umrah', order: 7 },
        { name: 'Economy Umrah', slug: 'economy-umrah', type: 'umrah', order: 8 },
        { name: 'Ramadan Umrah', slug: 'ramadan-umrah', type: 'umrah', order: 9 },
      ];

      for (const cat of categories) {
        await client.query(`
          INSERT INTO public.categories (name, slug, type, display_order, show_in_top_categories)
          VALUES ($1, $2, $3, $4, true)
          ON CONFLICT (slug) DO NOTHING;
        `, [cat.name, cat.slug, cat.type, cat.order]);
      }
      console.log('✅ Seeded categories.');

      // Seed verified customer reviews (matching the reference screenshot)
      const reviews = [
        {
          customer_name: 'Ayesha Khan',
          customer_city: 'Karachi',
          service_used: 'Premium Umrah Package',
          review_text: 'Alhamdulillah, our Umrah journey was smooth and well organized. The Swissotel Clock Tower stay was so close to Haram, and the team was very supportive throughout.',
          rating: 5
        },
        {
          customer_name: 'Muhammad Ali',
          customer_city: 'Lahore',
          service_used: 'Family Umrah Package',
          review_text: 'We had a wonderful family trip to Makkah and Madinah. The hotels and guides were excellent. Highly recommended for families with elders and children!',
          rating: 5
        },
        {
          customer_name: 'Sana Rehman',
          customer_city: 'Islamabad',
          service_used: 'Dubai City & Desert Safari',
          review_text: 'Professional service, smooth process and great support. Will definitely travel again with Bin Riaz Elite Travels!',
          rating: 5
        },
        {
          customer_name: 'Fahad Ahmad',
          customer_city: 'Multan',
          service_used: 'Istanbul & Cappadocia Tour',
          review_text: 'Our Turkey trip was unforgettable. Everything was perfectly planned, from the hotels to the Bosphorus cruise dinner. Thank you Malik Amir Riaz and team!',
          rating: 5
        }
      ];

      for (const rev of reviews) {
        await client.query(`
          INSERT INTO public.testimonials (customer_name, customer_city, service_used, review_text, rating)
          VALUES ($1, $2, $3, $4, $5);
        `, [rev.customer_name, rev.customer_city, rev.service_used, rev.review_text, rev.rating]);
      }
      console.log('✅ Seeded customer testimonials.');

      // Seed Hero Banners (matching the user request for 3 clean banners)
      const banners = [
        {
          title: 'Sacred Journeys, Lasting Memories',
          subtitle: 'Your Trusted Partner for Umrah, Hajj & Worldwide Travel',
          image_url: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=1920&q=85',
          display_order: 1
        },
        {
          title: 'Explore the World in Luxury',
          subtitle: 'Handpicked International & Domestic Tour Packages',
          image_url: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1920&q=85',
          display_order: 2
        },
        {
          title: 'VIP Visa & Travel Assistance',
          subtitle: 'Saudi Umrah, Tourist & International Visit Visas',
          image_url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1920&q=85',
          display_order: 3
        }
      ];

      for (const b of banners) {
        await client.query(`
          INSERT INTO public.banners (title, subtitle, image_url, display_order)
          VALUES ($1, $2, $3, $4);
        `, [b.title, b.subtitle, b.image_url, b.display_order]);
      }
      console.log('✅ Seeded 3 initial clean banners.');
    }

  } catch (err) {
    console.error('Setup error:', err);
  } finally {
    await client.end();
  }
}

setupDatabase();
