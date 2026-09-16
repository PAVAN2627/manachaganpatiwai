import { Calendar, MapPin, Crown, Heart } from 'lucide-react';
import { useSettings } from '@/lib/settings-context';
import { Reveal } from '@/components/Reveal';

export function QuickInfo() {
  const { settings } = useSettings();

  const cards = [
    { icon: Calendar, label: 'स्थापना', value: settings.establishment_year },
    { icon: MapPin, label: 'स्थान', value: settings.location },
    { icon: Crown, label: 'ओळख', value: settings.gram_daivata },
    { icon: Heart, label: 'परंपरा', value: 'मानाचा गणपती' },
  ];

  return (
    <section className="relative -mt-8 z-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {cards.map((card, i) => {
          const Icon = card.icon;
          return (
            <Reveal key={card.label} delay={i * 100}>
              <div className="bg-cream rounded-2xl p-5 sm:p-6 card-shadow gold-border-thin text-center hover:card-shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto rounded-full saffron-gradient flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-cream" />
                </div>
                <div className="text-xs sm:text-sm text-dark-maroon/60 font-devanagari-sans mb-1">
                  {card.label}
                </div>
                <div className="text-base sm:text-lg font-devanagari-serif font-bold text-deep-red">
                  {card.value}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
