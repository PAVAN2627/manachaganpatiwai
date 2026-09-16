import { ArrowRight } from 'lucide-react';
import { useSettings } from '@/lib/settings-context';
import { Reveal } from '@/components/Reveal';
import { GaneshIcon, DecorativeBorder } from '@/components/decorations';

export function About() {
  const { settings } = useSettings();

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 temple-pattern" />
      <div className="max-w-6xl mx-auto relative">
        <Reveal>
          <div className="text-center mb-12">
            <div className="text-golden mb-2">
              <DecorativeBorder className="w-48 h-5 mx-auto" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-devanagari-serif font-black text-[#7e141c] mb-3 leading-normal py-1">
              आमच्याविषयी
            </h2>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
          <Reveal>
            <div className="relative group max-w-md mx-auto">
              <div className="rounded-3xl overflow-hidden card-shadow-lg gold-border bg-gradient-to-b from-[#fffef7] via-[#fffbf0] to-[#f9f0d9] p-3 flex items-center justify-center">
                <img
                  src={settings.hero_image || '/mainimage.png'}
                  alt="श्री धुंडिविनायक मानाचा गणपती, वाई"
                  className="w-full max-h-[380px] sm:max-h-[420px] object-contain rounded-2xl group-hover:scale-[1.03] transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/mainimage.png';
                  }}
                />
              </div>
              <div className="absolute -bottom-3 -right-3 w-20 h-20 sm:w-22 sm:h-22 rounded-full saffron-gradient flex items-center justify-center gold-border shadow-xl">
                <div className="text-center text-cream">
                  <div className="text-xl sm:text-2xl font-devanagari-serif font-bold">{settings.establishment_year}</div>
                  <div className="text-[11px] font-devanagari-sans">स्थापना</div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div>
              <p className="text-base sm:text-lg text-dark-maroon/80 font-devanagari-sans leading-relaxed mb-6">
                {settings.about_text}
              </p>
              <div className="space-y-3 mb-8">
                {[
                  'वाईच्या धार्मिक आणि सांस्कृतिक परंपरेचा अविभाज्य भाग',
                  'भक्ती, श्रद्धा आणि सामाजिक एकतेची परंपरा',
                  'सन 1894 पासून अखंड गणेशोत्सवाची वाटचाल',
                ].map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-golden/20 flex items-center justify-center shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-saffron" />
                    </div>
                    <p className="text-sm sm:text-base text-dark-maroon/70 font-devanagari-sans">{point}</p>
                  </div>
                ))}
              </div>
              <button
                onClick={() => document.getElementById('history')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-deep-red text-cream font-devanagari-sans font-medium hover:bg-dark-maroon hover:shadow-lg transition-all"
              >
                अधिक जाणून घ्या
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
