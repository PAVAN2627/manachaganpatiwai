import { Instagram, MapPin, Phone, MessageCircle } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { DecorativeBorder, GaneshIcon } from '@/components/decorations';
import { useSettings } from '@/lib/settings-context';

export function Contact() {
  const { settings } = useSettings();

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-4xl mx-auto">
        <Reveal>
          <div className="text-center mb-12">
            <div className="text-golden mb-2">
              <DecorativeBorder className="w-48 h-5 mx-auto" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-devanagari-serif font-black text-[#7e141c] leading-normal py-1">
              संपर्क
            </h2>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className="bg-cream rounded-3xl p-8 sm:p-12 card-shadow-lg gold-border text-center">
            <div className="w-20 h-20 mx-auto rounded-full border-3 border-golden p-1 mb-6 flex items-center justify-center bg-white">
              <img
                src="/waiganpatilogo.png"
                alt="श्री धुंडिविनायक मानाचा गणपती लोगो"
                className="w-full h-full object-contain rounded-full"
              />
            </div>

            <h3 className="text-xl sm:text-2xl font-devanagari-serif font-bold text-deep-red mb-2">
              {settings.mandal_name}
            </h3>
            <p className="text-dark-maroon/70 font-devanagari-sans mb-1">
              {settings.tagline}
            </p>
            <p className="text-golden font-devanagari-sans text-sm mb-8">
              स्थापना : १८९४
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(settings.location)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-deep-red text-cream font-devanagari-sans text-sm font-medium hover:bg-dark-maroon hover:shadow-lg transition-all"
              >
                <MapPin className="w-4 h-4" />
                Google Maps
              </a>
              <a
                href={settings.instagram_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-orange-400 text-cream font-devanagari-sans text-sm font-medium hover:shadow-lg transition-all"
              >
                <Instagram className="w-4 h-4" />
                Instagram
              </a>
              {settings.whatsapp_number && (
                <a
                  href={`https://wa.me/${settings.whatsapp_number}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-green-600 text-cream font-devanagari-sans text-sm font-medium hover:bg-green-700 hover:shadow-lg transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </a>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
