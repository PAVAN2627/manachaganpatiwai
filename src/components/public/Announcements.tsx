import { Link } from 'react-router-dom';
import { Megaphone, AlertCircle, ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { DecorativeBorder } from '@/components/decorations';
import { dbService as db } from '@/lib/db';
import type { Announcement } from '@/lib/types';
import { useEffect, useState } from 'react';

export function Announcements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const { data } = await db
          .from('announcements')
          .select('*')
          .eq('published', true)
          .order('created_at', { ascending: false })
          .limit(3);
        if (data) {
          setAnnouncements(data as Announcement[]);
        }
      } catch (err) {
        console.error('Failed to load announcements:', err);
      }
      setLoading(false);
    };
    fetchAnnouncements();
  }, []);

  return (
    <section id="announcements" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="text-center mb-12">
            <div className="text-golden mb-2">
              <DecorativeBorder className="w-48 h-5 mx-auto" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-devanagari-serif font-black text-[#7e141c] mb-3 leading-normal py-1">
              📢 मंडळाच्या घोषणा
            </h2>
          </div>
        </Reveal>

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
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {announcements.slice(0, 3).map((ann, i) => (
                <Reveal key={ann.id} delay={i * 100}>
                  <div className={`relative bg-cream rounded-2xl p-6 card-shadow gold-border-thin hover:card-shadow-lg hover:-translate-y-1 transition-all duration-300 ${ann.important ? 'border-2 border-saffron' : ''}`}>
                    {ann.important && (
                      <div className="absolute -top-3 left-4 px-3 py-1 rounded-full saffron-gradient text-cream text-xs font-devanagari-sans font-medium flex items-center gap-1 shadow-md">
                        <AlertCircle className="w-3 h-3" />
                        महत्वाचे
                      </div>
                    )}
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-golden/20 flex items-center justify-center shrink-0">
                        <Megaphone className="w-5 h-5 text-saffron" />
                      </div>
                      <div>
                        <h3 className="text-base font-devanagari-serif font-bold text-deep-red">
                          {ann.title}
                        </h3>
                        <span className="text-xs text-dark-maroon/50 font-devanagari-sans">
                          {ann.date}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-dark-maroon/70 font-devanagari-sans leading-relaxed">
                      {ann.content}
                    </p>
                    {ann.image_url && (
                      <div className="mt-4 rounded-lg overflow-hidden">
                        <img src={ann.image_url} alt={ann.title} className="w-full h-32 object-cover" />
                      </div>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link
                to="/announcements"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-deep-red text-cream font-devanagari-sans font-medium hover:bg-dark-maroon hover:shadow-lg transition-all"
              >
                सर्व घोषणा पहा
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
