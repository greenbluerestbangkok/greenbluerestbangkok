import { createClient } from '@supabase/supabase-js'

// Supabase Configuration
// Check for environment variables, handle empty strings, fallback to hardcoded values
const getSupabaseUrl = () => {
  const envUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  if (envUrl && envUrl.trim() && envUrl.startsWith('http')) {
    return envUrl.trim()
  }
  return 'https://gmdvkegcejrbrobtrhfm.supabase.co'
}

const getSupabaseKey = () => {
  const envKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (envKey && envKey.trim() && envKey.length > 20) {
    return envKey.trim()
  }
  return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdtZHZrZWdjZWpyYnJvYnRyaGZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYzMDUzNDIsImV4cCI6MjA0MTg4MTM0Mn0.xf2zwnE8davt7K0K3EPlYkNbiV4qKEfCYNn76xFvZQo'
}

const supabaseUrl = getSupabaseUrl()
const supabaseKey = getSupabaseKey()

export const supabase = createClient(supabaseUrl, supabaseKey)

// Helper function to create client instances
export function createSupabaseClient() {
  return createClient(supabaseUrl, supabaseKey)
}
