import { createClient } from '@supabase/supabase-js';

const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const prodUrl = import.meta.env.VITE_SUPABASE_URL;

if (!supabaseAnonKey) {
  throw new Error('Missing environment variable VITE_SUPABASE_ANON_KEY');
}
if (!prodUrl) {
  throw new Error('Missing environment variable VITE_SUPABASE_URL');
}

// In dev use the Vite proxy at http://localhost:5173/api
// In prod use the real Supabase URL
const supabaseUrl =
  import.meta.env.DEV
    ? `${window.location.origin}/api`
    : prodUrl;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);