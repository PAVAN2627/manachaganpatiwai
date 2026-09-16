import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Save, Check } from 'lucide-react';
import { AdminLayout } from '@/pages/admin/AdminLayout';
import { dbService as db } from '@/lib/db';
import { useSeoMetadata } from '@/lib/seo';
import { useSettings } from '@/lib/settings-context';
import type { Settings } from '@/lib/types';
import { ImageUploadField } from '@/components/admin/ImageUploadField';

export function AdminSettings() {
  const location = useLocation();
  const { settings, refresh } = useSettings();
  const [form, setForm] = useState<Settings>(settings);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useSeoMetadata({ title: 'Website Settings | Admin', description: 'Website Settings' });

  useEffect(() => {
    setForm(settings);
  }, [settings]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await db.from('settings').update({
      mandal_name: form.mandal_name,
      tagline: form.tagline,
      gram_daivata: form.gram_daivata,
      establishment_year: form.establishment_year,
      location: form.location,
      hero_image: form.hero_image || null,
      about_text: form.about_text,
      instagram_url: form.instagram_url,
      facebook_url: form.facebook_url || null,
      youtube_url: form.youtube_url || null,
      whatsapp_number: form.whatsapp_number || null,
      email: form.email || null,
      footer_text: form.footer_text,
      updated_at: new Date().toISOString(),
    }).eq('id', 1);
    await refresh();
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const field = (label: string, key: keyof Settings, type: string = 'text', full = false) => (
    <div className={full ? 'col-span-2' : ''}>
      <label className="block text-sm font-devanagari-sans text-dark-maroon/70 mb-1">{label}</label>
      {type === 'textarea' ? (
        <textarea
          value={String(form[key] || '')}
          onChange={(e) => setForm({ ...form, [key]: e.target.value })}
          rows={4}
          className="w-full px-3 py-2 rounded-lg border border-golden/30 bg-white/50 text-dark-maroon text-sm focus:outline-none focus:border-saffron"
        />
      ) : (
        <input
          type={type}
          value={String(form[key] || '')}
          onChange={(e) => setForm({ ...form, [key]: e.target.value })}
          className="w-full px-3 py-2 rounded-lg border border-golden/30 bg-white/50 text-dark-maroon text-sm focus:outline-none focus:border-saffron"
        />
      )}
    </div>
  );

  return (
    <AdminLayout currentPath={location.pathname}>
      <div className="mb-6">
        <h1 className="text-2xl font-devanagari-serif font-bold text-deep-red">⚙️ Website Settings</h1>
        <p className="text-sm text-dark-maroon/60 font-devanagari-sans">वेबसाइटची सर्व माहिती येथून बदला</p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-3xl">
        <div className="bg-cream rounded-2xl p-6 card-shadow gold-border-thin mb-6">
          <h3 className="text-base font-devanagari-serif font-bold text-deep-red mb-4">मंडळाची माहिती</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {field('मंडळाचे नाव', 'mandal_name', 'text', true)}
            {field('टॅगलाइन', 'tagline')}
            {field('ग्रामदैवत', 'gram_daivata')}
            {field('स्थापना वर्ष', 'establishment_year')}
            {field('स्थान', 'location')}
            {field('About Text', 'about_text', 'textarea', true)}
          </div>
        </div>

        <div className="bg-cream rounded-2xl p-6 card-shadow gold-border-thin mb-6">
          <h3 className="text-base font-devanagari-serif font-bold text-deep-red mb-4">व्हिज्युअल</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="col-span-2">
              <ImageUploadField
                label="मुख्य छायाचित्र (Hero Image)"
                value={form.hero_image || ''}
                onChange={(val) => setForm({ ...form, hero_image: val || null })}
                helperText="हे छायाचित्र मुख्यपृष्ठावर 'आमच्याविषयी' विभागात दिसते. थेट Firestore मध्ये साठवले जाईल."
              />
            </div>
          </div>
        </div>

        <div className="bg-cream rounded-2xl p-6 card-shadow gold-border-thin mb-6">
          <h3 className="text-base font-devanagari-serif font-bold text-deep-red mb-4">सोशल मीडिया आणि संपर्क</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {field('Instagram URL', 'instagram_url', 'url')}
            {field('Facebook URL', 'facebook_url', 'url')}
            {field('YouTube URL', 'youtube_url', 'url')}
            {field('WhatsApp Number', 'whatsapp_number')}
            {field('Email', 'email', 'email')}
          </div>
        </div>

        <div className="bg-cream rounded-2xl p-6 card-shadow gold-border-thin mb-6">
          <h3 className="text-base font-devanagari-serif font-bold text-deep-red mb-4">Footer</h3>
          {field('Footer Text', 'footer_text', 'textarea', true)}
        </div>

        <button
          type="submit"
          disabled={saving}
          className="px-6 py-3 rounded-lg saffron-gradient text-cream font-devanagari-sans font-medium flex items-center gap-2 hover:shadow-lg disabled:opacity-60 transition-all"
        >
          {saved ? <Check className="w-5 h-5" /> : <Save className="w-5 h-5" />}
          {saved ? 'जतन झाले!' : saving ? 'जतन होत आहे...' : 'जतन करा'}
        </button>
      </form>
    </AdminLayout>
  );
}
