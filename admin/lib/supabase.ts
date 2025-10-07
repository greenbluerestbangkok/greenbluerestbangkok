import { createClient } from '@supabase/supabase-js'

// Supabase Configuration
// Uses environment variables if available, otherwise uses hardcoded values
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://gmdvkegcejrbrobtrhfm.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdtZHZrZWdjZWpyYnJvYnRyaGZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYzMDUzNDIsImV4cCI6MjA0MTg4MTM0Mn0.xf2zwnE8davt7K0K3EPlYkNbiV4qKEfCYNn76xFvZQo'

export const supabase = createClient(supabaseUrl, supabaseKey)

// Helper function to create client instances
export function createSupabaseClient() {
  return createClient(supabaseUrl, supabaseKey)
}
