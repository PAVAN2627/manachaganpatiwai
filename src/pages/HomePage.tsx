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
    title: 'श्री धुंडिविनायक मानाचा गणपती | ब्राह्मणशाही, वाई',
    description: 'वाईचे ग्रामदैवत श्री धुंडिविनायक मानाचा गणपती गणेशोत्सव मंडळ, ब्राह्मणशाही, वाई. स्थापना 1894. गणेशोत्सव, कार्यक्रम, घोषणा आणि डिजिटल छायाचित्र संग्रह.',
    keywords: 'वाईचे ग्रामदैवत, मानाचा गणपती वाई, धुंडिविनायक गणपती, ब्राह्मणशाही गणपती, वाई गणेशोत्सव, Wai Ganpati, Manacha Ganpati Wai, Dhundivinayak Ganpati, Ganesh Mandal Wai, Wai Ganeshotsav, 1894 Ganpati Wai',
    ogTitle: 'श्री धुंडिविनायक मानाचा गणपती | ब्राह्मणशाही, वाई',
    ogDescription: 'वाईचे ग्रामदैवत श्री धुंडिविनायक मानाचा गणपती गणेशोत्सव मंडळ, ब्राह्मणशाही, वाई. स्थापना 1894.',
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
