import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://okquvjjndbrehdqewawj.supabase.co'

const supabaseKey = 'sb_publishable_lFNNfTMWOSHnt3wUOfG0aw_iEer0Y44'

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
)