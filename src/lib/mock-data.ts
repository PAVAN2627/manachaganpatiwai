import type { Announcement, EventItem, Year, Album } from '@/lib/types';

export const MOCK_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'mock-ann-1',
    title: 'महत्वाची सूचना',
    content: 'आजच्या गणेशोत्सव कार्यक्रमाची वेळ संध्याकाळी ७:०० वाजता. सर्व भक्तांनी वेळेवर हजर राहावे.',
    date: '16 सप्टेंबर 2026',
    image_url: null,
    important: true,
    published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'mock-ann-2',
    title: 'गणेश स्थापना सोहळा',
    content: 'श्री गणेश स्थापना सोहळा ब्राह्मणशाही, वाई येथे पारंपरिक पद्धतीने साजरा केला जाईल. सर्व भक्तांचे स्वागत आहे.',
    date: '16 सप्टेंबर 2026',
    image_url: null,
    important: false,
    published: true,
    created_at: new Date(Date.now() - 86400000).toISOString(),
    updated_at: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'mock-ann-3',
    title: 'सांस्कृतिक कार्यक्रम',
    content: 'गणेशोत्सवादरम्यान विविध सांस्कृतिक कार्यक्रमांचे आयोजन करण्यात आले आहे. सर्वांनी सहभागी व्हावे.',
    date: '18 सप्टेंबर 2026',
    image_url: null,
    important: false,
    published: true,
    created_at: new Date(Date.now() - 172800000).toISOString(),
    updated_at: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    id: 'mock-ann-4',
    title: 'अनंत चतुर्दशी विसर्जन',
    content: 'श्री गणेश विसर्जन सोहळा अनंत चतुर्दशी दिवशी दुपारी ३:०० वाजता वाई घाट येथून निघेल.',
    date: '20 सप्टेंबर 2026',
    image_url: null,
    important: false,
    published: true,
    created_at: new Date(Date.now() - 259200000).toISOString(),
    updated_at: new Date(Date.now() - 259200000).toISOString(),
  },
];

export const MOCK_EVENTS: EventItem[] = [
  {
    id: 'mock-event-1',
    title: 'श्री गणेश स्थापना',
    date: '16 सप्टेंबर 2026',
    time: 'सकाळी ७:००',
    location: 'ब्राह्मणशाही, वाई',
    description: 'श्री गणेश स्थापना सोहळा पारंपरिक पद्धतीने साजरा केला जाईल. मंत्रोच्चार आणि षोडशोपचार पूजेचे आयोजन.',
    image_url: null,
    published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'mock-event-2',
    title: 'महाआरती',
    date: '16 सप्टेंबर 2026',
    time: 'संध्याकाळी ७:००',
    location: 'ब्राह्मणशाही, वाई',
    description: 'भक्तांच्या उपस्थितीत महाआरतीचे आयोजन. सर्व भक्त उपस्थित राहावेत.',
    image_url: null,
    published: true,
    created_at: new Date(Date.now() - 86400000).toISOString(),
    updated_at: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'mock-event-3',
    title: 'सांस्कृतिक कार्यक्रम',
    date: '18 सप्टेंबर 2026',
    time: 'संध्याकाळी ६:३०',
    location: 'ब्राह्मणशाही, वाई',
    description: 'विविध सांस्कृतिक कार्यक्रम, नाट्य स्पर्धा आणि भजन संध्या.',
    image_url: null,
    published: true,
    created_at: new Date(Date.now() - 172800000).toISOString(),
    updated_at: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    id: 'mock-event-4',
    title: 'अनंत चतुर्दशी विसर्जन',
    date: '20 सप्टेंबर 2026',
    time: 'दुपारी ३:००',
    location: 'वाई घाट, वाई',
    description: 'श्री गणेश विसर्जन सोहळा. भव्य आणि भक्तिमय विसर्जन मिरवणूक.',
    image_url: null,
    published: true,
    created_at: new Date(Date.now() - 259200000).toISOString(),
    updated_at: new Date(Date.now() - 259200000).toISOString(),
  },
];

export const MOCK_YEARS: Year[] = [
  { id: 'mock-year-2026', year_value: 2026, display_name: '2026', sort_order: 1, created_at: new Date().toISOString() },
  { id: 'mock-year-2025', year_value: 2025, display_name: '2025', sort_order: 2, created_at: new Date().toISOString() },
  { id: 'mock-year-2024', year_value: 2024, display_name: '2024', sort_order: 3, created_at: new Date().toISOString() },
];

export const MOCK_ALBUMS: Album[] = [
  // 2026
  { id: 'mock-album-1', year_id: 'mock-year-2026', year_value: 2026, title: '16 सप्टेंबर 2026', date: '16 सप्टेंबर 2026', description: 'आजचे गणेशोत्सवातील छायाचित्रे — गणेश स्थापना सोहळा', drive_url: 'https://drive.google.com/drive/folders/PLACEHOLDER_16SEP2026', cover_image: null, public_slug: 'gallery/2026/16-september-2026', published: true, qr_type: 'album', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 'mock-album-2', year_id: 'mock-year-2026', year_value: 2026, title: '17 सप्टेंबर 2026', date: '17 सप्टेंबर 2026', description: 'गणेशोत्सव दुसऱ्या दिवसाची छायाचित्रे — महाआरती', drive_url: 'https://drive.google.com/drive/folders/PLACEHOLDER_17SEP2026', cover_image: null, public_slug: 'gallery/2026/17-september-2026', published: true, qr_type: 'album', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 'mock-album-3', year_id: 'mock-year-2026', year_value: 2026, title: '18 सप्टेंबर 2026', date: '18 सप्टेंबर 2026', description: 'गणेशोत्सव तिसऱ्या दिवसाची छायाचित्रे — सांस्कृतिक कार्यक्रम', drive_url: 'https://drive.google.com/drive/folders/PLACEHOLDER_18SEP2026', cover_image: null, public_slug: 'gallery/2026/18-september-2026', published: true, qr_type: 'album', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 'mock-album-4', year_id: 'mock-year-2026', year_value: 2026, title: '19 सप्टेंबर 2026', date: '19 सप्टेंबर 2026', description: 'गणेशोत्सव चौथ्या दिवसाची छायाचित्रे', drive_url: 'https://drive.google.com/drive/folders/PLACEHOLDER_19SEP2026', cover_image: null, public_slug: 'gallery/2026/19-september-2026', published: true, qr_type: 'album', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 'mock-album-5', year_id: 'mock-year-2026', year_value: 2026, title: '20 सप्टेंबर 2026', date: '20 सप्टेंबर 2026', description: 'गणेशोत्सव पाचव्या दिवसाची छायाचित्रे', drive_url: 'https://drive.google.com/drive/folders/PLACEHOLDER_20SEP2026', cover_image: null, public_slug: 'gallery/2026/20-september-2026', published: true, qr_type: 'album', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 'mock-album-6', year_id: 'mock-year-2026', year_value: 2026, title: 'अनंत चतुर्दशी', date: 'अनंत चतुर्दशी 2026', description: 'अनंत चतुर्दशी विसर्जन सोहळ्याची छायाचित्रे — भव्य मिरवणूक', drive_url: 'https://drive.google.com/drive/folders/PLACEHOLDER_ANANT2026', cover_image: null, public_slug: 'gallery/2026/anant-chaturdashi-2026', published: true, qr_type: 'album', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  // 2025
  { id: 'mock-album-7', year_id: 'mock-year-2025', year_value: 2025, title: 'गणेश स्थापना', date: 'गणेश स्थापना 2025', description: 'गणेश स्थापना सोहळ्याची छायाचित्रे', drive_url: 'https://drive.google.com/drive/folders/PLACEHOLDER_STHAPANA2025', cover_image: null, public_slug: 'gallery/2025/ganesh-sthapana-2025', published: true, qr_type: 'album', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 'mock-album-8', year_id: 'mock-year-2025', year_value: 2025, title: 'आरती', date: 'आरती 2025', description: 'महाआरतीची छायाचित्रे', drive_url: 'https://drive.google.com/drive/folders/PLACEHOLDER_AARTI2025', cover_image: null, public_slug: 'gallery/2025/aarti-2025', published: true, qr_type: 'album', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 'mock-album-9', year_id: 'mock-year-2025', year_value: 2025, title: 'सांस्कृतिक कार्यक्रम', date: 'सांस्कृतिक कार्यक्रम 2025', description: 'सांस्कृतिक कार्यक्रमाची छायाचित्रे', drive_url: 'https://drive.google.com/drive/folders/PLACEHOLDER_SANSKRUTIK2025', cover_image: null, public_slug: 'gallery/2025/sanskrutik-karyakram-2025', published: true, qr_type: 'album', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 'mock-album-10', year_id: 'mock-year-2025', year_value: 2025, title: 'विसर्जन', date: 'विसर्जन 2025', description: 'विसर्जन सोहळ्याची छायाचित्रे', drive_url: 'https://drive.google.com/drive/folders/PLACEHOLDER_VISARJAN2025', cover_image: null, public_slug: 'gallery/2025/visarjan-2025', published: true, qr_type: 'album', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  // 2024
  { id: 'mock-album-11', year_id: 'mock-year-2024', year_value: 2024, title: 'गणेशोत्सव संग्रह', date: 'गणेशोत्सव 2024', description: '2024 चा संपूर्ण गणेशोत्सव संग्रह', drive_url: 'https://drive.google.com/drive/folders/PLACEHOLDER_2024', cover_image: null, public_slug: 'gallery/2024/ganeshotsav-sangraha-2024', published: true, qr_type: 'album', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
];
