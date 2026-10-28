import { createClient, SupabaseClient } from '@supabase/supabase-js';

export const DEFAULT_SUPABASE_URL = 'https://jpqvkqyntasjhuabxdpr.supabase.co';
export const DEFAULT_SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpwcXZrcXludGFzamh1YWJ4ZHByIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI1MDMxNTMsImV4cCI6MjEwODA3OTE1M30.7w6qOnlXnkdjPLoACzuk1viPsGVg_445E9UUkn3VaPc';

function getEnvVar(key: string): string {
  if (
    typeof import.meta !== 'undefined' &&
    (import.meta as unknown as { env?: Record<string, string> }).env?.[key]
  ) {
    return (import.meta as unknown as { env: Record<string, string> }).env[key];
  }
  if (typeof process !== 'undefined' && process.env?.[key]) {
    return process.env[key] as string;
  }
  return '';
}

const supabaseUrl =
  getEnvVar('NEXT_PUBLIC_SUPABASE_URL') ||
  getEnvVar('VITE_SUPABASE_URL') ||
  DEFAULT_SUPABASE_URL;

const supabaseAnonKey =
  getEnvVar('NEXT_PUBLIC_SUPABASE_ANON_KEY') ||
  getEnvVar('VITE_SUPABASE_ANON_KEY') ||
  DEFAULT_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);
