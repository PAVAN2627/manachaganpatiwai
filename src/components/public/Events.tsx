import { useEffect, useState } from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { DecorativeBorder } from '@/components/decorations';
import { dbService as db } from '@/lib/db';
import type { EventItem } from '@/lib/types';
export function Events() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await db
          .from('events')
          .select('*')
          .eq('published', true)
          .order('created_at', { ascending: false });
        if (data) {
          setEvents(data as EventItem[]);
        }
      } catch (err) {
        console.error('Failed to load events:', err);
      }
      setLoading(false);
    };
    fetchEvents();
  }, []);

  return (
    <section id="events" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-golden/5 to-cream">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="text-center mb-12">
            <div className="text-golden mb-2">
              <DecorativeBorder className="w-48 h-5 mx-auto" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-devanagari-serif font-black text-[#7e141c] leading-normal py-1">
              कार्यक्रम
            </h2>
          </div>
        </Reveal>

        {loading ? (
          <div className="text-center text-dark-maroon/50 font-devanagari-sans py-8">
            माहिती लोड होत आहे...
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-cream rounded-2xl p-8 card-shadow gold-border-thin max-w-md mx-auto">
              <Calendar className="w-12 h-12 text-golden/40 mx-auto mb-4" />
              <p className="text-dark-maroon/60 font-devanagari-sans">
                सध्या कोणतेही आगामी कार्यक्रम उपलब्ध नाहीत.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event, i) => (
              <Reveal key={event.id} delay={i * 100}>
                <div className="bg-cream rounded-2xl overflow-hidden card-shadow gold-border-thin hover:card-shadow-lg hover:-translate-y-1 transition-all duration-300">
                  {event.image_url && (
                    <div className="aspect-video overflow-hidden">
                      <img src={event.image_url} alt={event.title} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-lg font-devanagari-serif font-bold text-deep-red mb-4">
                      {event.title}
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-dark-maroon/70 font-devanagari-sans">
                        <Calendar className="w-4 h-4 text-saffron shrink-0" />
                        {event.date}
                      </div>
                      {event.time && (
                        <div className="flex items-center gap-2 text-sm text-dark-maroon/70 font-devanagari-sans">
                          <Clock className="w-4 h-4 text-saffron shrink-0" />
                          {event.time}
                        </div>
                      )}
                      {event.location && (
                        <div className="flex items-center gap-2 text-sm text-dark-maroon/70 font-devanagari-sans">
                          <MapPin className="w-4 h-4 text-saffron shrink-0" />
                          {event.location}
                        </div>
                      )}
                    </div>
                    {event.description && (
                      <p className="mt-4 text-sm text-dark-maroon/60 font-devanagari-sans">
                        {event.description}
                      </p>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
