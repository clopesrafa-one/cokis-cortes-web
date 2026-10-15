import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://mqecmjxcxpmsblmwzgya.supabase.co/rest/v1/'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1xZWNtanhjeHBtc2JsbXd6Z3lhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTIwMjEzMDcsImV4cCI6MjEwNzU5NzMwN30.EJZnxhF-NxZgRwkB5CYWaPC774R_Mm9SE1838uDED50'

export const supabase = createClient(supabaseUrl, supabaseKey)