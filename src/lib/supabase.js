import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Check your .env file.');
}

// Fallback to empty strings to prevent crash during initialization if env is missing
export const supabase = createClient(supabaseUrl || 'http://localhost:54321', supabaseAnonKey || 'dummy');
