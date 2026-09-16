import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyAHyWAoffh4prAT1p5OBFFBG1kHuRoJJCI',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'waimanachaganpati-35890.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'waimanachaganpati-35890',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'waimanachaganpati-35890.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '557559583859',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:557559583859:web:1da2807a07554e411c8606',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || 'G-S47CGSL197',
};

export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);

// Initialize analytics safely if in browser
export let analytics: ReturnType<typeof getAnalytics> | null = null;
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  }).catch(() => {
    // Ignore analytics init failure
  });
}

export const isFirebaseConfigured = Boolean(
  import.meta.env.VITE_FIREBASE_API_KEY && import.meta.env.VITE_FIREBASE_PROJECT_ID
);
