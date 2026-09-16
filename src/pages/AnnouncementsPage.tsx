import { useEffect, useState } from 'react';
import { Megaphone, AlertCircle } from 'lucide-react';
import { PublicLayout } from '@/components/public/PublicLayout';
import { Reveal } from '@/components/Reveal';
import { DecorativeBorder } from '@/components/decorations';
import { dbService as db } from '@/lib/db';
import type { Announcement } from '@/lib/types';
import { useSeoMetadata } from '@/lib/seo';
export function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useSeoMetadata({
    title: 'घोषणा | श्री धुंडिविनायक मानाचा गणपती, वाई',
    description: 'श्री धुंडिविनायक मानाचा गणपती गणेशोत्सव मंडळ, ब्राह्मणशाही, वाई यांच्या सर्व अधिकृत घोषणा.',
  });

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const { data } = await db
          .from('announcements')
          .select('*')
          .eq('published', true)
          .order('created_at', { ascending: false });
        if (data) setAnnouncements(data as Announcement[]);
      } catch (err) {
        console.error('Failed to load announcements:', err);
      }
      setLoading(false);
    };
    fetchAll();
  }, []);

  return (
    <PublicLayout>
      <div className="pt-20">
        <div className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-golden/10 to-cream">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-golden mb-2">
              <DecorativeBorder className="w-48 h-5 mx-auto" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-devanagari-serif font-black text-[#7e141c] mb-3 leading-normal py-1">
              📢 सर्व घोषणा
            </h1>
          </div>
        </div>

        <div className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            {loading ? (
              <div className="text-center text-dark-maroon/50 font-devanagari-sans py-8">
                माहिती लोड होत आहे...
              </div>
            ) : announcements.length === 0 ? (
              <div className="text-center py-12">
                <div className="bg-cream rounded-2xl p-8 card-shadow gold-border-thin max-w-md mx-auto">
                  <Megaphone className="w-12 h-12 text-golden/40 mx-auto mb-4" />
                  <p className="text-dark-maroon/60 font-devanagari-sans">
                    सध्या कोणतीही नवीन घोषणा उपलब्ध नाही.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {announcements.map((ann, i) => (
                  <Reveal key={ann.id} delay={i * 80}>
                    <div className={`bg-cream rounded-2xl p-6 card-shadow gold-border-thin ${ann.important ? 'border-2 border-saffron' : ''}`}>
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-golden/20 flex items-center justify-center shrink-0">
                          <Megaphone className="w-6 h-6 text-saffron" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <h3 className="text-lg font-devanagari-serif font-bold text-deep-red">
                              {ann.title}
                            </h3>
                            {ann.important && (
                              <span className="px-2 py-0.5 rounded-full saffron-gradient text-cream text-xs font-devanagari-sans flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" />
                                महत्वाचे
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-dark-maroon/50 font-devanagari-sans">
                            {ann.date}
                          </span>
                          <p className="mt-3 text-sm sm:text-base text-dark-maroon/70 font-devanagari-sans leading-relaxed">
                            {ann.content}
                          </p>
                          {ann.image_url && (
                            <div className="mt-4 rounded-lg overflow-hidden">
                              <img src={ann.image_url} alt={ann.title} className="w-full max-h-64 object-cover" />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
