import { createClient } from '@supabase/supabase-js';

const isValidHttpUrl = (url?: string): boolean => {
  if (!url) return false;
  const cleaned = url.trim().replace(/^["']|["']$/g, '');
  return cleaned.startsWith('http://') || cleaned.startsWith('https://');
};

const getValidApiUrl = (envUrl?: string, fallbackUrl: string = 'https://abfhvkbdibeejfihrcqm.supabase.co'): string => {
  if (isValidHttpUrl(envUrl)) {
    return envUrl!.trim().replace(/^["']|["']$/g, '');
  }
  return fallbackUrl;
};

const supabaseUrl = getValidApiUrl(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  'https://abfhvkbdibeejfihrcqm.supabase.co'
);

const supabaseAnonKey = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiZmh2a2JkaWJlZWpmaWhyY3FtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI5OTc1OTQsImV4cCI6MjEwODU3MzU5NH0.9aqTsm_ZszSVTBpcHqWnM3hDECJocsT_y2hwhidvAB8').trim();

// Singleton browser client instance
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});
