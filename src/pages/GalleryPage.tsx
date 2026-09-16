import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FolderOpen, ChevronRight, Camera } from 'lucide-react';
import { PublicLayout } from '@/components/public/PublicLayout';
import { Reveal } from '@/components/Reveal';
import { DecorativeBorder } from '@/components/decorations';
import { dbService as db } from '@/lib/db';
import type { Year, Album } from '@/lib/types';
import { useSeoMetadata } from '@/lib/seo';
import { useSettings } from '@/lib/settings-context';

export function GalleryPage() {
  const [years, setYears] = useState<Year[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const { settings } = useSettings();

  useSeoMetadata({
    title: 'छायाचित्र दालन | श्री धुंडिविनायक मानाचा गणपती, वाई',
    description: 'श्री धुंडिविनायक मानाचा गणपती गणेशोत्सव मंडळ, ब्राह्मणशाही, वाई यांच्या वर्षानुवर्षांच्या गणेशोत्सव छायाचित्र संग्रहाचे डिजिटल दालन.',
    keywords: 'वाई गणेशोत्सव छायाचित्रे, गणपती फोटो, ब्राह्मणशाही वाई गॅलरी, Ganpati photos Wai',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [yearsRes, albumsRes] = await Promise.all([
          db.from('years').select('*').order('year_value', { ascending: false }),
          db.from('albums').select('*').eq('published', true).order('created_at', { ascending: false }),
        ]);
        if (yearsRes.data) setYears(yearsRes.data as Year[]);
        if (albumsRes.data) setAlbums(albumsRes.data as Album[]);
      } catch (err) {
        console.error('Failed to load gallery data:', err);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!loading && window.location.hash) {
      const id = window.location.hash.replace('#', '');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    }
  }, [loading]);

  return (
    <PublicLayout>
      <div className="pt-20">
        <div className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-golden/10 to-cream">
          <div className="max-w-6xl mx-auto text-center">
            <div className="text-golden mb-2">
              <DecorativeBorder className="w-48 h-5 mx-auto" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-devanagari-serif font-black text-[#7e141c] mb-3 leading-normal py-1">
              📸 छायाचित्र संग्रह
            </h1>
            <p className="text-dark-maroon/60 font-devanagari-sans text-sm sm:text-base">
              {settings.mandal_name} — गणेशोत्सवातील अमूल्य क्षण
            </p>
          </div>
        </div>

        <div className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {loading ? (
              <div className="text-center text-dark-maroon/50 font-devanagari-sans py-12">
                माहिती लोड होत आहे...
              </div>
            ) : years.length === 0 ? (
              <div className="text-center py-12">
                <Camera className="w-12 h-12 text-golden/40 mx-auto mb-4" />
                <p className="text-dark-maroon/60 font-devanagari-sans">
                  सध्या कोणताही छायाचित्र संग्रह उपलब्ध नाही.
                </p>
              </div>
            ) : (
              <div className="space-y-12">
                {years.map((year, yi) => {
                  const yearAlbums = albums.filter((a) => String(a.year_value) === String(year.year_value));

                  return (
                    <Reveal key={year.id || year.year_value} delay={yi * 100}>
                      <div id={`year-${year.year_value}`} className="scroll-mt-28">
                        <div className="flex items-center gap-3 mb-6">
                          <h2 className="text-2xl sm:text-3xl font-devanagari-serif font-bold text-deep-red">
                            {year.display_name || `${year.year_value} उत्सव`}
                          </h2>
                          <div className="flex-1 h-px bg-gradient-to-r from-golden to-transparent" />
                        </div>

                        {yearAlbums.length === 0 ? (
                          <div className="bg-cream rounded-2xl p-6 text-center gold-border-thin card-shadow">
                            <FolderOpen className="w-8 h-8 text-golden/50 mx-auto mb-2" />
                            <p className="text-dark-maroon/60 font-devanagari-sans text-sm">
                              या वर्षाचे छायाचित्र अल्बम लवकरच जोडले जातील.
                            </p>
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                            {yearAlbums.map((album) => (
                              <Link
                                key={album.id}
                                to={`/${album.public_slug}`}
                                className="group bg-cream rounded-2xl overflow-hidden card-shadow gold-border-thin hover:card-shadow-lg hover:-translate-y-1 transition-all duration-300"
                              >
                                <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-golden/20 to-saffron/10 flex items-center justify-center">
                                  {album.cover_image ? (
                                    <img src={album.cover_image} alt={album.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                                  ) : (
                                    <FolderOpen className="w-12 h-12 text-golden/40 group-hover:text-saffron group-hover:scale-110 transition-all" />
                                  )}
                                  <div className="absolute bottom-2 right-2 w-8 h-8 rounded-full saffron-gradient flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ChevronRight className="w-4 h-4 text-cream" />
                                  </div>
                                </div>
                                <div className="p-4">
                                  <h3 className="text-base font-devanagari-serif font-semibold text-deep-red mb-1">
                                    📁 {album.title}
                                  </h3>
                                  {album.description && (
                                    <p className="text-xs text-dark-maroon/60 font-devanagari-sans line-clamp-2">
                                      {album.description}
                                    </p>
                                  )}
                                </div>
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
