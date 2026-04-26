import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const looksLikePlaceholder =
  !supabaseUrl ||
  !supabaseAnonKey ||
  String(supabaseUrl).includes("your-project.supabase.co") ||
  String(supabaseAnonKey).includes("your-supabase-anon-key");

export const supabaseConfigError = looksLikePlaceholder
  ? "VITE_SUPABASE_URL hoac VITE_SUPABASE_ANON_KEY chua duoc cau hinh bang gia tri that."
  : null;

export const supabase = supabaseConfigError
  ? (null as unknown as ReturnType<typeof createClient>)
  : createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    });
