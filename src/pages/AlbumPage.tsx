import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ExternalLink, Share2, Copy, ChevronLeft, FolderOpen, MessageCircle, Facebook, Instagram, Camera, Check, Calendar } from 'lucide-react';
import { PublicLayout } from '@/components/public/PublicLayout';
import { Reveal } from '@/components/Reveal';
import { DecorativeBorder } from '@/components/decorations';
import { dbService as db } from '@/lib/db';
import type { Album } from '@/lib/types';
import { useSeoMetadata } from '@/lib/seo';
import { useSettings } from '@/lib/settings-context';
import { copyToClipboard, shareUrl } from '@/lib/helpers';

export function AlbumPage() {
  const { year, slug } = useParams<{ year: string; slug: string }>();
  const [album, setAlbum] = useState<Album | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [copied, setCopied] = useState(false);
  const { settings } = useSettings();

  const fullSlug = `gallery/${year}/${slug}`;
  const albumUrl = `${window.location.origin}/${fullSlug}`;

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        const { data } = await db
          .from('albums')
          .select('*')
          .eq('public_slug', fullSlug)
          .eq('published', true)
          .maybeSingle();
        if (data) {
          setAlbum(data as Album);
        } else {
          setNotFound(true);
        }
      } catch (err) {
        console.error('Failed to load album:', err);
        setNotFound(true);
      }
      setLoading(false);
    };
    fetchAlbum();
  }, [fullSlug]);

  useSeoMetadata({
    title: album
      ? `${album.title} चे गणेशोत्सव छायाचित्रे | श्री धुंडिविनायक मानाचा गणपती, वाई`
      : 'छायाचित्र अल्बम | श्री धुंडिविनायक मानाचा गणपती, वाई',
    description: album?.description || 'गणेशोत्सव छायाचित्र संग्रह — श्री धुंडिविनायक मानाचा गणपती, ब्राह्मणशाही, वाई',
    keywords: `वाई गणेशोत्सव छायाचित्रे, ${album?.title}, ${album?.year_value}, Ganpati photos Wai`,
    ogTitle: album ? `${album.title} — ${album.year_value}` : undefined,
    ogDescription: album?.description || undefined,
  });

  const handleShare = async () => {
    const shareText = `📸 श्री धुंडिविनायक मानाचा गणपती — ${album?.title} चे छायाचित्रे\n\nछायाचित्रे पाहण्यासाठी लिंक उघडा 👇\n${albumUrl}`;
    try {
      await shareUrl(albumUrl, 'श्री धुंडिविनायक मानाचा गणपती', shareText);
    } catch {
      // user cancelled
    }
  };

  const handleWhatsApp = () => {
    const text = `📸 श्री धुंडिविनायक मानाचा गणपती — ${album?.title} चे छायाचित्रे\n\nछायाचित्रे पाहण्यासाठी लिंक उघडा 👇\n${albumUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(albumUrl)}`, '_blank');
  };

  const handleCopyLink = async () => {
    await copyToClipboard(albumUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <PublicLayout>
        <div className="pt-32 pb-20 text-center">
          <p className="text-dark-maroon/50 font-devanagari-sans">माहिती लोड होत आहे...</p>
        </div>
      </PublicLayout>
    );
  }

  if (notFound || !album) {
    return (
      <PublicLayout>
        <div className="pt-32 pb-20 text-center max-w-md mx-auto px-4">
          <Camera className="w-12 h-12 text-golden/40 mx-auto mb-4" />
          <p className="text-dark-maroon/60 font-devanagari-sans mb-4">
            हा अल्बम आढळला नाही.
          </p>
          <Link to="/gallery" className="text-saffron font-devanagari-sans font-medium hover:underline">
            छायाचित्र दालनाकडे परत
          </Link>
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <div className="pt-20">
        {/* Header banner */}
        <div className="py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-golden/10 to-cream">
          <div className="max-w-4xl mx-auto">
            <Link
              to="/gallery"
              className="inline-flex items-center gap-1 text-sm text-dark-maroon/60 hover:text-saffron font-devanagari-sans mb-4 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              छायाचित्र दालनाकडे परत
            </Link>
            <div className="text-center">
              <div className="text-golden mb-2">
                <DecorativeBorder className="w-48 h-5 mx-auto" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-devanagari-serif font-bold text-gradient-maroon-gold mb-2">
                📸 {album.title}
              </h1>
              <div className="flex items-center justify-center gap-4 text-dark-maroon/60 font-devanagari-sans text-sm flex-wrap">
                <span>गणेशोत्सव छायाचित्र संग्रह — {album.year_value}</span>
                {album.date && (
                  <span className="flex items-center gap-1 text-xs bg-golden/15 px-2.5 py-0.5 rounded-full border border-golden/20">
                    <Calendar className="w-3 h-3 text-golden" />
                    {album.date}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="py-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto space-y-8">
            {album.description && (
              <Reveal>
                <div className="bg-cream rounded-2xl p-6 card-shadow gold-border-thin text-center">
                  <p className="text-dark-maroon/80 font-devanagari-sans text-base leading-relaxed">
                    {album.description}
                  </p>
                </div>
              </Reveal>
            )}

            {/* Album Cover Photo if available */}
            {album.cover_image && (
              <Reveal delay={100}>
                <div className="bg-cream rounded-2xl overflow-hidden card-shadow gold-border p-3">
                  <div className="rounded-xl overflow-hidden shadow-inner max-h-[500px] flex items-center justify-center bg-black/5">
                    <img
                      src={album.cover_image}
                      alt={album.title}
                      className="w-full h-auto object-contain max-h-[500px] rounded-lg"
                    />
                  </div>
                </div>
              </Reveal>
            )}

            {/* Google Drive Link if present */}
            {album.drive_url && (
              <Reveal delay={150}>
                <div className="bg-cream rounded-2xl p-6 sm:p-8 card-shadow gold-border-thin text-center">
                  <h3 className="text-lg font-devanagari-serif font-bold text-deep-red mb-2">
                    📂 संपूर्ण फोटो अल्बम पहा
                  </h3>
                  <p className="text-sm text-dark-maroon/60 font-devanagari-sans mb-5">
                    या अल्बमचे सर्व उच्च दर्जाचे फोटो पाहण्यासाठी खालील बटणावर क्लिक करा.
                  </p>
                  <a
                    href={album.drive_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl saffron-gradient text-cream font-devanagari-sans font-semibold text-base shadow-lg hover:shadow-xl hover:scale-105 transition-all gold-border"
                  >
                    <FolderOpen className="w-5 h-5" />
                    <span>फोटो संग्रह उघडा</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </Reveal>
            )}

            {/* Devotee Share Section */}
            <Reveal delay={200}>
              <div className="bg-cream rounded-2xl p-6 sm:p-8 card-shadow gold-border-thin">
                <h3 className="text-lg font-devanagari-serif font-bold text-deep-red mb-2 text-center">
                  🔗 हा अल्बम भाविकांसोबत शेअर करा
                </h3>
                <p className="text-xs sm:text-sm text-dark-maroon/60 font-devanagari-sans text-center mb-6">
                  इतर भाविकांना श्री धुंडिविनायक मानाचा गणपतीच्या या अमूल्य क्षणांचे दर्शन घडवण्यासाठी लिंक शेअर करा.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={handleWhatsApp}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-green-600 text-cream text-sm font-devanagari-sans font-medium hover:bg-green-700 transition-all hover:scale-105 shadow-sm"
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp
                  </button>

                  <button
                    onClick={handleFacebook}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 text-cream text-sm font-devanagari-sans font-medium hover:bg-blue-700 transition-all hover:scale-105 shadow-sm"
                  >
                    <Facebook className="w-4 h-4" />
                    Facebook
                  </button>

                  {settings.instagram_url && (
                    <a
                      href={settings.instagram_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-orange-400 text-cream text-sm font-devanagari-sans font-medium hover:shadow-lg transition-all hover:scale-105 shadow-sm"
                    >
                      <Instagram className="w-4 h-4" />
                      Instagram
                    </a>
                  )}

                  <button
                    onClick={handleCopyLink}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-golden/20 text-deep-red text-sm font-devanagari-sans font-medium hover:bg-golden/30 transition-all hover:scale-105 border border-golden/30"
                  >
                    {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                    {copied ? 'लिंक कॉपी झाली!' : 'लिंक कॉपी करा'}
                  </button>

                  <button
                    onClick={handleShare}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-deep-red text-cream text-sm font-devanagari-sans font-medium hover:bg-dark-maroon transition-all hover:scale-105 shadow-sm"
                  >
                    <Share2 className="w-4 h-4" />
                    शेअर करा
                  </button>
                </div>
              </div>
            </Reveal>

            {/* Back to Gallery */}
            <div className="text-center pt-4">
              <Link
                to="/gallery"
                className="inline-flex items-center gap-2 text-sm text-dark-maroon/70 hover:text-saffron font-devanagari-sans transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>सर्व वर्षांचे छायाचित्र दालन पहा</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}


