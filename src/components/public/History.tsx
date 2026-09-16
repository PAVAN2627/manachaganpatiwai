import { Reveal } from '@/components/Reveal';
import { DecorativeBorder } from '@/components/decorations';

const TIMELINE = [
  {
    year: '१८९४',
    title: 'मंडळाची स्थापना',
    text: 'परंपरेची सुरुवात आणि वाईच्या ग्रामदैवताच्या भक्तीचा प्रवास.',
  },
  {
    year: 'त्यानंतर',
    title: 'परंपरेची अखंड वाटचाल',
    text: 'वर्षानुवर्षे भक्ती, संस्कृती आणि सामाजिक सहभागाची परंपरा पुढे नेण्यात आली.',
  },
  {
    year: 'आज',
    title: 'डिजिटल युगातील परंपरा',
    text: 'परंपरेचा वारसा जपत आधुनिक डिजिटल माध्यमातून भक्तांपर्यंत माहिती आणि छायाचित्रे पोहोचविण्याचा प्रयत्न.',
  },
];

export function History() {
  return (
    <section id="history" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-b from-cream to-golden/5">

      <div className="max-w-5xl mx-auto relative">
        <Reveal>
          <div className="text-center mb-16">
            <div className="text-golden mb-2">
              <DecorativeBorder className="w-48 h-5 mx-auto" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-devanagari-serif font-black text-[#7e141c] leading-normal py-1">
              ऐतिहासिक वारसा
            </h2>
          </div>
        </Reveal>

        <div className="relative">
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-golden via-saffron to-golden sm:-translate-x-1/2" />

          {TIMELINE.map((item, i) => (
            <Reveal key={i} delay={i * 150}>
              <div className={`relative flex items-center mb-12 last:mb-0 ${i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}>
                <div className="hidden sm:block sm:w-1/2" />
                <div className="absolute left-4 sm:left-1/2 w-8 h-8 rounded-full saffron-gradient flex items-center justify-center gold-border shadow-lg sm:-translate-x-1/2 z-10">
                  <div className="w-3 h-3 rounded-full bg-cream" />
                </div>
                <div className={`ml-16 sm:ml-0 sm:w-1/2 ${i % 2 === 0 ? 'sm:pr-12 sm:text-right' : 'sm:pl-12'}`}>
                  <div className="bg-cream rounded-2xl p-6 card-shadow gold-border-thin hover:card-shadow-lg transition-all">
                    <div className="text-2xl sm:text-3xl font-devanagari-serif font-bold text-saffron mb-2">
                      {item.year}
                    </div>
                    <h3 className="text-lg font-devanagari-serif font-semibold text-deep-red mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-dark-maroon/70 font-devanagari-sans">
                      {item.text}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
