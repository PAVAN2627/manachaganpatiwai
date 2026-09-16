import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Camera, ArrowRight, FolderOpen } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { DecorativeBorder } from '@/components/decorations';
import { dbService as db } from '@/lib/db';
import type { Year } from '@/lib/types';

const toDevanagariNumerals = (num: number | string) => {
  const devanagariDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
  return String(num).replace(/[0-9]/g, (w) => devanagariDigits[+w]);
};

export function GalleryPreview() {
  const [years, setYears] = useState<Year[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchYears = async () => {
      try {
        const res = await db.from('years').select('*').order('year_value', { ascending: false });
        if (res.data && Array.isArray(res.data)) {
          setYears(res.data as Year[]);
        }
      } catch (err) {
        console.error('Failed to load years for gallery preview:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchYears();
  }, []);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-cream to-golden/10 relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center">
        <Reveal>
          <div className="mb-6">
            <div className="text-golden mb-2">
              <DecorativeBorder className="w-48 h-5 mx-auto" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-devanagari-serif font-black text-[#7e141c] mb-4 leading-normal py-1">
              📸 डिजिटल छायाचित्र दालन
            </h2>
            <p className="text-dark-maroon/60 font-devanagari-sans text-sm sm:text-base max-w-2xl mx-auto mb-8">
              गणेशोत्सवातील अमूल्य क्षणांचा डिजिटल संग्रह. वर्षानुवर्षांची छायाचित्रे एकाच ठिकाणी.
            </p>
          </div>
        </Reveal>

        <Reveal delay={200}>
          {loading ? (
            <div className="py-8 text-center text-dark-maroon/50 font-devanagari-sans">
              वर्षे लोड होत आहेत...
            </div>
          ) : years.length === 0 ? (
            <div className="py-8 text-center text-dark-maroon/60 font-devanagari-sans">
              सध्या कोणताही छायाचित्र संग्रह जोडलेला नाही.
            </div>
          ) : (
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-8">
              {years.map((item) => (
                <Link
                  key={item.id || item.year_value}
                  to={`/gallery#year-${item.year_value}`}
                  className="w-36 sm:w-44 aspect-square rounded-2xl saffron-gradient flex flex-col items-center justify-center gold-border card-shadow hover:scale-105 hover:shadow-2xl transition-all p-3 text-center group cursor-pointer"
                  title={`${item.display_name || item.year_value} चे छायाचित्र संग्रह पहा`}
                >
                  <FolderOpen className="w-7 h-7 text-cream/85 group-hover:text-golden group-hover:scale-110 transition-all mb-1.5" />
                  <span className="text-2xl sm:text-3xl font-devanagari-serif font-bold text-cream group-hover:text-white">
                    {toDevanagariNumerals(item.year_value)}
                  </span>
                  <span className="text-xs sm:text-sm text-cream/90 font-devanagari-sans font-medium mt-1">
                    {item.display_name || `${toDevanagariNumerals(item.year_value)} उत्सव`}
                  </span>
                  <span className="text-[10px] text-golden font-devanagari-sans flex items-center gap-0.5 mt-1 group-hover:translate-x-0.5 transition-transform">
                    छायाचित्रे पहा →
                  </span>
                </Link>
              ))}
            </div>
          )}
        </Reveal>

        <Reveal delay={300}>
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full saffron-gradient text-cream font-devanagari-sans font-semibold text-base shadow-lg hover:shadow-xl hover:scale-105 transition-all gold-border"
          >
            <Camera className="w-5 h-5" />
            <span>संपूर्ण छायाचित्र संग्रह पहा</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

