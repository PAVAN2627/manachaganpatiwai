export interface User {
  id: string;
  email: string;
  role?: string;
  user_metadata?: Record<string, unknown>;
}

export interface Session {
  access_token: string;
  token_type: string;
  user: User;
}

export interface Settings {
  id: number;
  mandal_name: string;
  tagline: string;
  gram_daivata: string;
  establishment_year: string;
  location: string;
  hero_image: string | null;
  about_text: string;
  instagram_url: string;
  facebook_url: string | null;
  youtube_url: string | null;
  whatsapp_number: string | null;
  email: string | null;
  footer_text: string;
  updated_at: string;
}

export interface Year {
  id: string;
  year_value: number;
  display_name: string;
  sort_order: number;
  created_at: string;
}

export interface Album {
  id: string;
  year_id: string | null;
  year_value: number;
  title: string;
  date: string;
  description: string | null;
  drive_url: string | null;
  cover_image: string | null;
  public_slug: string;
  published: boolean;
  qr_type: 'album' | 'drive';
  created_at: string;
  updated_at: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  image_url: string | null;
  important: boolean;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  time: string | null;
  location: string | null;
  description: string | null;
  image_url: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export const DEFAULT_SETTINGS: Settings = {
  id: 1,
  mandal_name: 'श्री धुंडिविनायक मानाचा गणपती',
  tagline: 'गणेशोत्सव मंडळ, ब्राह्मणशाही, वाई',
  gram_daivata: 'वाईचे ग्रामदैवत',
  establishment_year: '1894',
  location: 'ब्राह्मणशाही, वाई',
  hero_image: '/mainimage.png',
  about_text: 'श्री धुंडिविनायक मानाचा गणपती गणेशोत्सव मंडळ, ब्राह्मणशाही, वाई हे वाईच्या धार्मिक, सांस्कृतिक आणि सामाजिक परंपरेचा अविभाज्य भाग आहे. सन 1894 पासून भक्ती, श्रद्धा आणि सामाजिक एकतेची परंपरा जपत मंडळ गणेशोत्सव साजरा करत आहे.',
  instagram_url: 'https://www.instagram.com/manacha_ganpati_wai_',
  facebook_url: null,
  youtube_url: null,
  whatsapp_number: null,
  email: null,
  footer_text: '© 2026 श्री धुंडिविनायक मानाचा गणपती गणेशोत्सव मंडळ, ब्राह्मणशाही, वाई. सर्व हक्क राखीव.',
  updated_at: new Date().toISOString(),
};
