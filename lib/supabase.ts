import { createClient, SupabaseClient } from '@supabase/supabase-js';

function getEnvVar(key: string): string {
  if (typeof import.meta !== 'undefined' && (import.meta as unknown as { env?: Record<string, string> }).env?.[key]) {
    return (import.meta as unknown as { env: Record<string, string> }).env[key];
  }
  if (typeof process !== 'undefined' && process.env?.[key]) {
    return process.env[key] as string;
  }
  return '';
}

const supabaseUrl =
  getEnvVar('NEXT_PUBLIC_SUPABASE_URL') || getEnvVar('VITE_SUPABASE_URL');
const supabaseAnonKey =
  getEnvVar('NEXT_PUBLIC_SUPABASE_ANON_KEY') || getEnvVar('VITE_SUPABASE_ANON_KEY');

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
