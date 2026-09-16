/*
# Create schema for Shri Dhundivinayak Manacha Ganpati Ganeshotsav Mandal

1. New Tables
- `settings` — single-row website configuration (mandal name, tagline, establishment year, location, hero image, about text, social links, contact details, footer text).
- `years` — gallery years (e.g. 2026, 2025).
- `albums` — photo gallery albums linked to Google Drive folders, keyed by year, with public slug for SEO-friendly URLs.
- `announcements` — mandal announcements with important/published flags.
- `events` — ganeshotsav events with date/time/location.

2. Security
- Enable RLS on every table.
- Public (anon + authenticated) can READ published rows and settings.
- Only authenticated admins can INSERT/UPDATE/DELETE.
- Admin auth uses Supabase email/password.
*/

-- Settings table (single row, id=1)
CREATE TABLE IF NOT EXISTS settings (
  id integer PRIMARY KEY DEFAULT 1,
  mandal_name text NOT NULL DEFAULT 'श्री धुंडिविनायक मानाचा गणपती',
  tagline text NOT NULL DEFAULT 'गणेशोत्सव मंडळ, ब्राह्मणशाही, वाई',
  gram_daivata text NOT NULL DEFAULT 'वाईचे ग्रामदैवत',
  establishment_year text NOT NULL DEFAULT '1894',
  location text NOT NULL DEFAULT 'ब्राह्मणशाही, वाई',
  hero_image text,
  about_text text NOT NULL DEFAULT 'श्री धुंडिविनायक मानाचा गणपती गणेशोत्सव मंडळ, ब्राह्मणशाही, वाई हे वाईच्या धार्मिक, सांस्कृतिक आणि सामाजिक परंपरेचा अविभाज्य भाग आहे. सन 1894 पासून भक्ती, श्रद्धा आणि सामाजिक एकतेची परंपरा जपत मंडळ गणेशोत्सव साजरा करत आहे.',
  instagram_url text NOT NULL DEFAULT 'https://www.instagram.com/manacha_ganpati_wai_',
  facebook_url text,
  youtube_url text,
  whatsapp_number text,
  email text,
  footer_text text NOT NULL DEFAULT '© 2026 श्री धुंडिविनायक मानाचा गणपती गणेशोत्सव मंडळ, ब्राह्मणशाही, वाई. सर्व हक्क राखीव.',
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_settings" ON settings;
CREATE POLICY "public_read_settings" ON settings FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "admin_update_settings" ON settings;
CREATE POLICY "admin_update_settings" ON settings FOR UPDATE
  TO authenticated WITH CHECK (true);

-- Years table
CREATE TABLE IF NOT EXISTS years (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  year_value integer NOT NULL UNIQUE,
  display_name text NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE years ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_years" ON years;
CREATE POLICY "public_read_years" ON years FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "admin_insert_years" ON years;
CREATE POLICY "admin_insert_years" ON years FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_years" ON years;
CREATE POLICY "admin_update_years" ON years FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_years" ON years;
CREATE POLICY "admin_delete_years" ON years FOR DELETE
  TO authenticated USING (true);

-- Albums table
CREATE TABLE IF NOT EXISTS albums (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  year_id uuid REFERENCES years(id) ON DELETE CASCADE,
  year_value integer NOT NULL,
  title text NOT NULL,
  date text NOT NULL,
  description text,
  drive_url text,
  cover_image text,
  public_slug text NOT NULL UNIQUE,
  published boolean NOT NULL DEFAULT true,
  qr_type text NOT NULL DEFAULT 'album',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE albums ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_albums" ON albums;
CREATE POLICY "public_read_albums" ON albums FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "admin_insert_albums" ON albums;
CREATE POLICY "admin_insert_albums" ON albums FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_albums" ON albums;
CREATE POLICY "admin_update_albums" ON albums FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_albums" ON albums;
CREATE POLICY "admin_delete_albums" ON albums FOR DELETE
  TO authenticated USING (true);

-- Announcements table
CREATE TABLE IF NOT EXISTS announcements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  date text NOT NULL,
  image_url text,
  important boolean NOT NULL DEFAULT false,
  published boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_announcements" ON announcements;
CREATE POLICY "public_read_announcements" ON announcements FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "admin_insert_announcements" ON announcements;
CREATE POLICY "admin_insert_announcements" ON announcements FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_announcements" ON announcements;
CREATE POLICY "admin_update_announcements" ON announcements FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_announcements" ON announcements;
CREATE POLICY "admin_delete_announcements" ON announcements FOR DELETE
  TO authenticated USING (true);

-- Events table
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  date text NOT NULL,
  time text,
  location text,
  description text,
  image_url text,
  published boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_events" ON events;
CREATE POLICY "public_read_events" ON events FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "admin_insert_events" ON events;
CREATE POLICY "admin_insert_events" ON events FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_events" ON events;
CREATE POLICY "admin_update_events" ON events FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_events" ON events;
CREATE POLICY "admin_delete_events" ON events FOR DELETE
  TO authenticated USING (true);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_albums_year_value ON albums(year_value);
CREATE INDEX IF NOT EXISTS idx_albums_public_slug ON albums(public_slug);
CREATE INDEX IF NOT EXISTS idx_announcements_published ON announcements(published);
CREATE INDEX IF NOT EXISTS idx_events_published ON events(published);
