import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Instagram,
  Facebook,
  Youtube,
  MapPin,
  Clock,
  ArrowUp,
  Lock,
  Compass,
  Sparkles,
  Users,
} from 'lucide-react';
import { doc, onSnapshot, setDoc, increment } from 'firebase/firestore';
import { db as firestoreDb } from '@/lib/firebase';
import { useSettings } from '@/lib/settings-context';
import { useAuth } from '@/lib/auth-context';
import { OmIcon, DecorativeBorder } from '@/components/decorations';

const toDevanagariNumerals = (num: number | string) => {
  const devanagariDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
  return String(num).replace(/[0-9]/g, (w) => devanagariDigits[+w]);
};

const QUICK_LINKS = [
  { label: 'मुख्यपृष्ठ', path: '/' },
  { label: 'आमच्याविषयी', path: '/#about' },
  { label: 'इतिहास', path: '/#history' },
  { label: 'गणेशोत्सव सोहळा', path: '/#ganeshotsav' },
  { label: 'दैनिक कार्यक्रम', path: '/#events' },
  { label: 'महत्वाच्या घोषणा', path: '/#announcements' },
  { label: 'छायाचित्र दालन', path: '/gallery' },
  { label: 'संपर्क व पत्ता', path: '/#contact' },
];

export function Footer() {
  const { settings } = useSettings();
  const { user } = useAuth();
  const [visitorCount, setVisitorCount] = useState<number>(() => {
    try {
      const stored = localStorage.getItem('wai_realtime_visits');
      const val = stored ? parseInt(stored, 10) : 0;
      return !isNaN(val) && val > 0 && val < 18540 ? val : 1;
    } catch {
      return 1;
    }
  });

  useEffect(() => {
    // Check if this is the user's first visit to the website in this session
    let currentCount = visitorCount;
    const isFirstVisit = !sessionStorage.getItem('wai_session_started');

    if (isFirstVisit) {
      // Mark that user has already visited in this session
      sessionStorage.setItem('wai_session_started', 'true');

      try {
        // Get local stored count
        const stored = localStorage.getItem('wai_realtime_visits');
        const parsed = stored ? parseInt(stored, 10) : 0;
        
        // Only consider valid counts (between 1 and 18540 to avoid legacy mock values)
        if (!isNaN(parsed) && parsed > 0 && parsed < 18540) {
          currentCount = parsed + 1;
        } else {
          currentCount = 1;
        }
        
        // Save updated count to local storage
        localStorage.setItem('wai_realtime_visits', currentCount.toString());
        setVisitorCount(currentCount);
      } catch (err) {
        console.error('Local storage error:', err);
      }

      // Realtime listener & increment on Firestore document 'stats/visits' ONLY on first visit
      const statsDocRef = doc(firestoreDb, 'stats', 'visits');

      // Send increment to Firestore only on first visit
      setDoc(
        statsDocRef,
        {
          count: increment(1),
          last_visit: new Date().toISOString(),
        },
        { merge: true }
      ).catch((err) => {
        console.warn('Realtime visitor increment note:', err);
      });

      const unsubscribe = onSnapshot(
        statsDocRef,
        (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.data();
            const remoteCount = data?.count;

            // If Firestore document has legacy mock value (around 18540), reset it to our real count!
            if (typeof remoteCount === 'number' && remoteCount >= 18540 && remoteCount <= 18550) {
              setDoc(statsDocRef, { count: currentCount, reset_at: new Date().toISOString() }, { merge: true }).catch(() => {});
              setVisitorCount(currentCount);
              return;
            }

            if (typeof remoteCount === 'number' && remoteCount > 0) {
              setVisitorCount(remoteCount);
              try {
                localStorage.setItem('wai_realtime_visits', remoteCount.toString());
              } catch {
                // ignore
              }
            }
          }
        },
        (error) => {
          console.warn('Realtime visitor counter snapshot warning:', error);
        }
      );

      return () => unsubscribe();
    } else {
      // User is already in an active session - just read the current count from Firestore
      const statsDocRef = doc(firestoreDb, 'stats', 'visits');
      const unsubscribe = onSnapshot(
        statsDocRef,
        (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.data();
            const remoteCount = data?.count;

            if (typeof remoteCount === 'number' && remoteCount > 0) {
              setVisitorCount(remoteCount);
              try {
                localStorage.setItem('wai_realtime_visits', remoteCount.toString());
              } catch {
                // ignore
              }
            }
          }
        },
        (error) => {
          console.warn('Realtime visitor counter snapshot warning:', error);
        }
      );

      return () => unsubscribe();
    }
  }, []);

  const handleNavClick = (path: string) => {
    if (path === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (path.includes('#')) {
      const [, hash] = path.split('#');
      const el = document.getElementById(hash);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="maroon-gradient text-cream relative overflow-hidden border-t-2 border-golden/40">
      {/* Background patterns */}
      <div className="absolute inset-0 mandala-bg opacity-25 pointer-events-none" />
      <div
        className="absolute top-0 right-1/4 w-96 h-96 rounded-full pointer-events-none blur-3xl opacity-20"
        style={{ background: 'radial-gradient(circle, hsl(43 85% 55% / 0.3), transparent 70%)' }}
      />

      {/* Top Decorative Border */}
      <div className="relative text-golden/40 py-1">
        <DecorativeBorder className="w-full h-5" />
      </div>

      {/* Divine Sacred Chant Ribbon */}
      <div className="relative bg-black/25 border-y border-golden/20 py-2.5 px-4 text-center">
        <p className="text-xs sm:text-sm font-devanagari-serif text-golden flex items-center justify-center gap-2 flex-wrap">
          <Sparkles className="w-3.5 h-3.5 text-golden animate-pulse" />
          <span>॥ मोरया रे बाप्पा मोरया रे ॥ वाईचे आराध्य ग्रामदैवत श्री धुंडिविनायक मानाचा गणपती ॥</span>
          <Sparkles className="w-3.5 h-3.5 text-golden animate-pulse" />
        </p>
      </div>

      {/* Main Footer Body */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 mb-12">

          {/* Column 1: Mandal Crest & About */}
          <div className="space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="w-16 h-16 rounded-full bg-cream/95 p-1 gold-border shrink-0 shadow-lg flex items-center justify-center">
                <img
                  src="/waiganpatilogo.png"
                  alt="श्री धुंडिविनायक लोगो"
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
              <div>
                <div className="text-golden font-devanagari-serif text-xs tracking-wider">
                  ।। {settings.gram_daivata} ।।
                </div>
                <h3 className="text-cream font-devanagari-serif font-bold text-base sm:text-lg leading-tight">
                  {settings.mandal_name}
                </h3>
              </div>
            </div>

            <p className="text-cream/80 text-xs sm:text-sm font-devanagari-sans leading-relaxed">
              दक्षिण काशी म्हणून ओळखल्या जाणाऱ्या वाई शहरात, कृष्णा नदीच्या घाटावर सन १८९४ पासून अखंड भक्ती, संस्कृती आणि सामाजिक एकात्मतेचा वारसा जपणारे मानाचे गणेशोत्सव मंडळ.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-golden/15 border border-golden/30 text-golden text-xs font-devanagari-sans font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              स्थापना सन : १८९४ (१३०+ वर्षे)
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-golden font-devanagari-serif font-semibold text-base mb-4 flex items-center gap-2">
              <OmIcon className="w-4 h-4 text-golden" />
              महत्वाचे दुवे
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleNavClick(link.path)}
                    className="text-cream/75 hover:text-golden text-xs sm:text-sm font-devanagari-sans transition-colors flex items-center gap-1.5 group text-left"
                  >
                    <span className="text-golden/40 group-hover:text-golden text-xs">›</span>
                    <span className="group-hover:translate-x-0.5 transition-transform">{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Mandir & Darshan Timings */}
          <div>
            <h4 className="text-golden font-devanagari-serif font-semibold text-base mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-golden" />
              दर्शन व आरती वेळ
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-cream/80 font-devanagari-sans">
              <div className="bg-cream/5 border border-golden/20 rounded-xl p-3 space-y-2">
                <div className="flex items-start justify-between gap-2 border-b border-golden/10 pb-1.5">
                  <span className="text-cream/90 font-medium">काकड आरती व पूजा:</span>
                  <span className="text-golden font-semibold">सकाळी ६:३०</span>
                </div>
                <div className="flex items-start justify-between gap-2 border-b border-golden/10 pb-1.5">
                  <span className="text-cream/90 font-medium">दैनिक दर्शन:</span>
                  <span className="text-golden font-semibold">स. ७:०० ते दु. १२:३०</span>
                </div>
                <div className="flex items-start justify-between gap-2">
                  <span className="text-cream/90 font-medium">संध्याकाळची महाआरती:</span>
                  <span className="text-golden font-semibold">सायं. ७:३०</span>
                </div>
              </div>

              <div className="flex items-start gap-2 pt-1 text-xs text-cream/70">
                <MapPin className="w-4 h-4 text-golden shrink-0 mt-0.5" />
                <span>{settings.location} (कृष्णा नदी घाट परिसर)</span>
              </div>
            </div>
          </div>

          {/* Column 4: Contact & Devotee Services */}
          <div>
            <h4 className="text-golden font-devanagari-serif font-semibold text-base mb-4 flex items-center gap-2">
              <Compass className="w-4 h-4 text-golden" />
              संपर्क व सोशल मीडिया
            </h4>
            <div className="space-y-3 text-xs sm:text-sm font-devanagari-sans">
              <p className="text-cream/80 text-xs">
                गणेशोत्सवातील विविध कार्यक्रम आणि देणगी विषयक माहितीसाठी आमच्याशी संपर्क साधा.
              </p>

              {/* Contact info */}
              <p className="text-cream/70 text-xs">
                श्री धुंडिविनायक मानाचा गणपती गणेशोत्सव मंडळ, ब्राह्मणशाही, वाई.
              </p>

              {/* Social Channels */}
              <div className="flex items-center gap-2 pt-2">
                {settings.instagram_url && (
                  <a
                    href={settings.instagram_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="w-9 h-9 rounded-full bg-gradient-to-tr from-pink-500 via-purple-500 to-orange-400 flex items-center justify-center text-white hover:scale-110 transition-transform shadow-md"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                )}
                {settings.facebook_url && (
                  <a
                    href={settings.facebook_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white hover:scale-110 transition-transform shadow-md"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                )}
                {settings.youtube_url && (
                  <a
                    href={settings.youtube_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                    className="w-9 h-9 rounded-full bg-red-600 flex items-center justify-center text-white hover:scale-110 transition-transform shadow-md"
                  >
                    <Youtube className="w-4 h-4" />
                  </a>
                )}
              </div>

              {/* Discreet Admin Login / Dashboard */}
              <div className="pt-2">
                <Link
                  to={user ? '/admin' : '/admin/login'}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-cream/70 hover:text-golden text-xs transition-colors border border-golden/10"
                >
                  <Lock className="w-3 h-3 text-golden/70" />
                  <span>{user ? 'प्रशासकीय डॅशबोर्ड (Admin Dashboard)' : 'प्रशासक लॉगिन (Admin Panel)'}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Visitor Count, Copyright and Back to Top */}
        <div className="border-t border-golden/20 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p className="text-cream/60 text-xs font-devanagari-sans leading-relaxed">
            {settings.footer_text}
          </p>

          {/* Visitor Count Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cream/10 border border-golden/30 text-golden text-xs font-devanagari-sans shadow-sm">
            <span className="relative flex h-2 w-2" title="Live Realtime Counter">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span>एकूण भाविक भेट (Visits):</span>
            <span className="font-bold text-cream bg-black/40 px-2.5 py-0.5 rounded border border-golden/20 tracking-wider">
              {toDevanagariNumerals(visitorCount.toLocaleString('en-IN'))}
            </span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-golden/20 hover:bg-golden/30 border border-golden/40 text-golden hover:text-cream text-xs font-devanagari-sans transition-all hover:scale-105"
            aria-label="पृष्ठाच्या सुरुवातीस जा"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>वर जा</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
