import { Hero } from '@/components/public/Hero';
import { About } from '@/components/public/About';
import { History } from '@/components/public/History';
import { Ganeshotsav } from '@/components/public/Ganeshotsav';
import { Events } from '@/components/public/Events';
import { Announcements } from '@/components/public/Announcements';
import { GalleryPreview } from '@/components/public/GalleryPreview';
import { Contact } from '@/components/public/Contact';
import { PublicLayout } from '@/components/public/PublicLayout';
import { useSeoMetadata } from '@/lib/seo';

export function HomePage() {
  useSeoMetadata({
    title: 'वाईचे ग्रामदैवत श्री धुंडिविनायक मानाचा गणपती | ब्राह्मणशाही, वाई',
    description: 'वाईचे ग्रामदैवत श्री धुंडिविनायक मानाचा गणपती, ब्राह्मणशाही, वाई — स्थापना 1894. गणेशोत्सव कार्यक्रम, गणपती दर्शन, घोषणा आणि 2026 चे छायाचित्र संग्रह येथे पहा.',
    keywords: 'वाईचे ग्रामदैवत, श्री धुंडिविनायक मानाचा गणपती, धुंडिविनायक गणपती वाई, मानाचा गणपती वाई, वाई गणपती, वाई गणेशोत्सव, ब्राह्मणशाही गणपती, ब्राह्मणशाही वाई गणपती, वाई गणपती मंडळ, वाई गणेशोत्सव मंडळ, धुंडिविनायक गणेशोत्सव मंडळ, वाई गणपती दर्शन, वाई गणपती फोटो, वाई गणेशोत्सव फोटो, मानाचा गणपती वाई फोटो, Dhundivinayak Ganpati Wai, Manacha Ganpati Wai, Wai Ganpati, Wai Ganeshotsav, Wai Ganpati Photos 2026, 1894 Ganpati Wai, Ganpati in Wai Satara',
    ogTitle: 'वाईचे ग्रामदैवत श्री धुंडिविनायक मानाचा गणपती | ब्राह्मणशाही, वाई',
    ogDescription: 'वाईचे ग्रामदैवत श्री धुंडिविनायक मानाचा गणपती, ब्राह्मणशाही, वाई — स्थापना 1894. गणेशोत्सव कार्यक्रम, गणपती दर्शन, घोषणा आणि 2026 चे छायाचित्र संग्रह येथे पहा.',
  });

  return (
    <PublicLayout>
      <Hero />
      <About />
      <History />
      <Ganeshotsav />
      <Events />
      <Announcements />
      <GalleryPreview />
      <Contact />
    </PublicLayout>
  );
}
