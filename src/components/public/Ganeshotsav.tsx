import { useState, useEffect } from 'react';
import { Reveal } from '@/components/Reveal';
import { DecorativeBorder } from '@/components/decorations';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Sparkles,
  Flower2,
  Flame,
  Waves,
  Calendar,
  Camera,
} from 'lucide-react';

interface StageData {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  icon: typeof Sparkles;
  description: string;
  details: string[];
  images: Array<{
    src: string;
    caption: string;
  }>;
}

const GANESHOTSAV_STAGES: StageData[] = [
  {
    id: 'aagman',
    title: 'श्री गणपती आगमन',
    subtitle: 'बाप्पांचे वाजत-गाजत मंगलमय आगमन',
    badge: 'पहिला दिवस',
    icon: Sparkles,
    description: 'ढोल-ताशांचा गजर, भगवे ध्वज आणि गुलालाच्या उधळणीत श्री धुंडिविनायक मानाच्या गणपतीचे वाई शहरात उत्साहात आगमन होते.',
    details: ['पारंपरिक वाद्यवृंद व लेझीम पथके', 'हजारो भाविकांची अलोट गर्दी', 'गुलाल व पुष्पवृष्टी'],
    images: [
      { src: '/images/aagman.jpg', caption: 'भव्य आगमन मिरवणूक व ढोल-ताशा पथक' },
      { src: '/mainimage.png', caption: 'श्री धुंडिविनायक मानाचा गणपती बाप्पा' },
      { src: '/waiganpatilogo.png', caption: 'मंडळाचे अधिकृत बोधचिन्ह' },
    ],
  },
  {
    id: 'sthapana',
    title: 'प्राणप्रतिष्ठा व स्थापना',
    subtitle: 'पारंपरिक वैदिक पद्धतीने महापूजा',
    badge: 'भाद्रपद शुद्ध चतुर्थी',
    icon: Flower2,
    description: 'भाद्रपद शुद्ध चतुर्थीच्या शुभमुहूर्तावर वेदोक्त मंत्रोच्चारात श्रींची प्रतिष्ठापना, षोडशोपचार पूजा आणि दुर्वा-मोदक अर्पण केले जातात.',
    details: ['वेदमूर्ती ब्राह्मणांकडून प्राणप्रतिष्ठा', '२१ मोदकांचा महानैवेद्य', 'अखंड दीपप्रज्वलन व समई'],
    images: [
      { src: '/images/sthapana.jpg', caption: 'पारंपरिक गणेश स्थापना व समई दीपपूजा' },
      { src: '/mainimage.png', caption: 'श्री धुंडिविनायक मनमोहक रूप' },
      { src: '/images/aarti.jpg', caption: 'स्थापनेनंतरची पहिली महाआरती' },
    ],
  },
  {
    id: 'aarti',
    title: 'महाआरती व दीपोत्सव',
    subtitle: 'नित्यनेमाने काकड आरती व संध्या आरती',
    badge: 'उत्सवाचे सर्व दिवस',
    icon: Flame,
    description: 'सकाळची काकड आरती आणि सायंकाळची भव्य महाआरती हजारो भाविकांच्या उपस्थितीत संपन्न होते. संपूर्ण मंडप भक्तिमय वातावरणाने दुमदुमतो.',
    details: ['सकाळी ६:३० काकड आरती', 'सायंकाळी ७:३० महाआरती', 'महाप्रसाद व तीर्थ वाटप'],
    images: [
      { src: '/images/aarti.jpg', caption: 'दिव्य कापूर ज्योत व महाआरती सोहळा' },
      { src: '/images/sthapana.jpg', caption: 'पुष्पहार व मोदक नैवेद्य' },
      { src: '/mainimage.png', caption: 'श्री धुंडिविनायक बाप्पा दर्शन' },
    ],
  },
  {
    id: 'visarjan',
    title: 'विसर्जन मिरवणूक',
    subtitle: 'कृष्णा नदीच्या घाटावर भावपूर्ण निरोप',
    badge: 'अनंत चतुर्दशी',
    icon: Waves,
    description: 'अनंत चतुर्दशीच्या पावन दिनी "पुढच्या वर्षी लवकर या" च्या गजरात कृष्णा नदीच्या पवित्र घाटावर श्री धुंडिविनायकांचे भावपूर्ण विसर्जन होते.',
    details: ['कृष्णा नदी घाटावर विसर्जन सोहळा', 'गुलाल व फटाक्यांची आतषबाजी', 'भाविकांचे अश्रुपूर्ण डोळ्यांनी वंदन'],
    images: [
      { src: '/images/visarjan.jpg', caption: 'कृष्णा नदी घाटावरील भव्य विसर्जन मिरवणूक' },
      { src: '/images/aagman.jpg', caption: 'मिरवणुकीतील ढोल-ताशा पथक' },
      { src: '/mainimage.png', caption: 'श्री धुंडिविनायक आशीर्वाद' },
    ],
  },
];

function StageImageSlider({
  images,
  title,
  onImageClick,
}: {
  images: Array<{ src: string; caption: string }>;
  title: string;
  onImageClick: (src: string, caption: string) => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((cur) => (cur === 0 ? images.length - 1 : cur - 1));
  };

  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((cur) => (cur === images.length - 1 ? 0 : cur + 1));
  };

  const current = images[currentIndex];

  return (
    <div className="relative rounded-2xl overflow-hidden bg-cream/60 border border-golden/30 shadow-md group select-none">
      {/* Main Image View */}
      <div
        className="relative aspect-[16/10] overflow-hidden cursor-pointer bg-dark-maroon/5"
        onClick={() => onImageClick(current.src, current.caption)}
      >
        <img
          src={current.src}
          alt={current.caption || title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/mainimage.png';
          }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 opacity-80 group-hover:opacity-90 transition-opacity" />

        {/* View Fullscreen Action Hint */}
        <div className="absolute top-3 right-3 p-1.5 rounded-full bg-black/50 text-cream backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70">
          <Maximize2 className="w-4 h-4" />
        </div>

        {/* Image Counter Badge */}
        <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-black/55 backdrop-blur-sm text-[11px] font-devanagari-sans text-cream font-medium border border-white/20">
          {currentIndex + 1} / {images.length}
        </div>

        {/* Image Caption at bottom of image */}
        <div className="absolute bottom-2 left-3 right-3 text-left">
          <p className="text-xs text-cream/95 font-devanagari-sans font-medium line-clamp-1 drop-shadow-md">
            {current.caption}
          </p>
        </div>
      </div>

      {/* Slider Controls (Prev / Next Buttons) */}
      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="मागील छायाचित्र"
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-saffron text-cream flex items-center justify-center backdrop-blur-sm transition-all shadow-md opacity-80 hover:opacity-100 active:scale-95"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="पुढील छायाचित्र"
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-saffron text-cream flex items-center justify-center backdrop-blur-sm transition-all shadow-md opacity-80 hover:opacity-100 active:scale-95"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-1 right-3 flex items-center gap-1 z-10">
            {images.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(idx);
                }}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  idx === currentIndex ? 'w-4 bg-golden' : 'bg-white/60'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export function Ganeshotsav() {
  const [lightbox, setLightbox] = useState<{ open: boolean; src: string; caption: string }>({
    open: false,
    src: '',
    caption: '',
  });

  const openLightbox = (src: string, caption: string) => {
    setLightbox({ open: true, src, caption });
  };

  const closeLightbox = () => {
    setLightbox({ open: false, src: '', caption: '' });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
    };
    if (lightbox.open) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightbox.open]);

  return (
    <section id="ganeshotsav" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-b from-cream via-[#fffbf2] to-golden/10">
      <div className="absolute inset-0 mandala-bg opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        <Reveal>
          <div className="text-center mb-14">
            <div className="text-golden mb-2">
              <DecorativeBorder className="w-52 h-5 mx-auto" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-devanagari-serif font-black text-[#7e141c] mb-3 leading-normal py-1 drop-shadow-sm">
              श्री गणेशोत्सव सोहळा
            </h2>
            <p className="text-dark-maroon/75 font-devanagari-sans text-base sm:text-lg max-w-2xl mx-auto font-medium leading-relaxed">
              भक्ती, उत्सव आणि परंपरेचा अखंड सांस्कृतिक वारसा
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-transparent via-golden to-transparent mx-auto mt-3" />
          </div>
        </Reveal>

        {/* 4 Rich Stage Cards with Image Sliders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {GANESHOTSAV_STAGES.map((stage, index) => {
            const Icon = stage.icon;
            return (
              <Reveal key={stage.id} delay={index * 120}>
                <div className="bg-cream rounded-3xl p-6 sm:p-7 card-shadow-lg gold-border hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group">
                  {/* Top Card Header */}
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl saffron-gradient flex items-center justify-center shrink-0 gold-border shadow-md group-hover:scale-105 transition-transform">
                          <Icon className="w-6 h-6 text-cream" />
                        </div>
                        <div>
                          <span className="inline-block px-2.5 py-0.5 rounded-full bg-golden/20 border border-golden/40 text-[#7e141c] font-devanagari-sans font-semibold text-xs mb-1">
                            {stage.badge}
                          </span>
                          <h3 className="text-xl sm:text-2xl font-devanagari-serif font-bold text-[#7e141c]">
                            {stage.title}
                          </h3>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm font-devanagari-serif font-semibold text-golden/90 mb-3">
                      {stage.subtitle}
                    </p>

                    {/* Image Slider for this Stage */}
                    <div className="mb-4">
                      <StageImageSlider
                        images={stage.images}
                        title={stage.title}
                        onImageClick={openLightbox}
                      />
                    </div>

                    {/* Description */}
                    <p className="text-sm text-dark-maroon/80 font-devanagari-sans leading-relaxed mb-4">
                      {stage.description}
                    </p>

                    {/* Key Highlights Bullet points */}
                    <div className="space-y-1.5 pt-2 border-t border-golden/20">
                      {stage.details.map((point) => (
                        <div key={point} className="flex items-center gap-2 text-xs font-devanagari-sans text-dark-maroon/75">
                          <div className="w-1.5 h-1.5 rounded-full bg-saffron shrink-0" />
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="mt-5 pt-3 border-t border-golden/15 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => openLightbox(stage.images[0].src, stage.images[0].caption)}
                      className="inline-flex items-center gap-1.5 text-xs text-saffron hover:text-deep-red font-devanagari-sans font-semibold hover:underline"
                    >
                      <Camera className="w-3.5 h-3.5" />
                      <span>छायाचित्रे मोठी करून पहा →</span>
                    </button>
                    <span className="text-[11px] text-dark-maroon/40 font-devanagari-sans">
                      {stage.images.length} छायाचित्रे
                    </span>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* Fullscreen Image Lightbox Modal */}
      {lightbox.open && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-cream/15 text-cream hover:bg-cream/30 transition-all z-10"
            aria-label="बंद करा"
          >
            <X className="w-6 h-6" />
          </button>

          <div
            className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="rounded-2xl overflow-hidden gold-border shadow-2xl bg-black max-h-[75vh]">
              <img
                src={lightbox.src}
                alt={lightbox.caption}
                className="w-full h-auto max-h-[75vh] object-contain"
              />
            </div>
            {lightbox.caption && (
              <div className="mt-4 px-5 py-2.5 rounded-full bg-cream/10 border border-golden/30 text-cream text-center font-devanagari-sans text-sm sm:text-base font-medium shadow-lg backdrop-blur-sm max-w-xl">
                {lightbox.caption}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
