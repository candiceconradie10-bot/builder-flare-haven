import { createClient } from '@supabase/supabase-js'

// Replace with your actual Supabase details
const supabaseUrl = 'https://aqxgvgwdqsswuxjsujbw.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxeGd2Z3dkcXNzd3V4anN1amJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUxNjQ2MzUsImV4cCI6MjA3MDc0MDYzNX0.jEPK8DQSvbCDkFu3D6-1VnOmzzhyIJPfJy59_Zfx-Nk'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
