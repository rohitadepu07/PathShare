
import { createClient } from '@supabase/supabase-js';

// The URL is derived from the project reference 'kqqoxzphsfqnqtgptcnx' provided by the user.
const supabaseUrl = process.env.SUPABASE_URL || 'https://kqqoxzphsfqnqtgptcnx.supabase.co';
// The Anon Key must be provided in the environment variables for auth to function.
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || 'placeholder-anon-key-needs-to-be-provided';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
