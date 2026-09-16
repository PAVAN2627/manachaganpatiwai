import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Plus, Edit2, Trash2, X, Eye } from 'lucide-react';
import { AdminLayout } from '@/pages/admin/AdminLayout';
import { dbService as db } from '@/lib/db';
import { useSeoMetadata } from '@/lib/seo';
import type { EventItem } from '@/lib/types';
import { ImageUploadField } from '@/components/admin/ImageUploadField';
import { CalendarDateField, TimePickerField, LocationField } from '@/components/admin/DateTimeLocationHelpers';

export function AdminEvents() {
  const location = useLocation();
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<EventItem | null>(null);
  const [form, setForm] = useState({
    title: '', date: '', time: '', location: '', description: '', image_url: '', published: true,
  });

  useSeoMetadata({ title: 'कार्यक्रम व्यवस्थापन | Admin', description: 'Event Management' });

  const fetchData = async () => {
    const { data } = await db.from('events').select('*').order('created_at', { ascending: false });
    setEvents((data as EventItem[]) || []);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const resetForm = () => {
    setForm({ title: '', date: '', time: '', location: '', description: '', image_url: '', published: true });
    setEditing(null);
    setShowForm(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      await db.from('events').update({
        title: form.title, date: form.date, time: form.time || null, location: form.location || null,
        description: form.description || null, image_url: form.image_url || null, published: form.published,
        updated_at: new Date().toISOString(),
      }).eq('id', editing.id);
    } else {
      await db.from('events').insert({
        title: form.title, date: form.date, time: form.time || null, location: form.location || null,
        description: form.description || null, image_url: form.image_url || null, published: form.published,
      });
    }
    resetForm();
    fetchData();
  };

  const handleEdit = (event: EventItem) => {
    setEditing(event);
    setForm({
      title: event.title, date: event.date, time: event.time || '', location: event.location || '',
      description: event.description || '', image_url: event.image_url || '', published: event.published,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('हा कार्यक्रम डिलीट करायचा आहे का?')) return;
    await db.from('events').delete().eq('id', id);
    fetchData();
  };

  return (
    <AdminLayout currentPath={location.pathname}>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-devanagari-serif font-bold text-deep-red">📅 कार्यक्रम व्यवस्थापन</h1>
          <p className="text-sm text-dark-maroon/60 font-devanagari-sans">कार्यक्रम जोडा, संपादित करा</p>
        </div>
        <button onClick={() => { resetForm(); setShowForm(true); }} className="px-4 py-2 rounded-lg saffron-gradient text-cream text-sm font-devanagari-sans font-medium hover:shadow-lg flex items-center gap-1.5">
          <Plus className="w-4 h-4" />
          नवीन कार्यक्रम
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-dark-maroon/50 backdrop-blur-sm" onClick={resetForm}>
          <div
            className="bg-cream rounded-2xl p-5 sm:p-6 max-w-xl w-full card-shadow-lg gold-border max-h-[92vh] flex flex-col my-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-golden/20 shrink-0">
              <h3 className="text-lg font-devanagari-serif font-bold text-deep-red">
                {editing ? 'कार्यक्रम संपादित करा' : 'नवीन कार्यक्रम'}
              </h3>
              <button
                onClick={resetForm}
                className="text-dark-maroon/50 hover:text-deep-red p-1 rounded-lg hover:bg-black/5 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Form Body */}
            <form onSubmit={handleSubmit} className="overflow-y-auto flex-1 py-4 pr-1 sm:pr-2 space-y-4">
              <div>
                <label className="block text-sm font-devanagari-sans text-dark-maroon/70 mb-1 font-medium">कार्यक्रमाचे नाव</label>
                <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required className="w-full px-3 py-2 rounded-lg border border-golden/30 bg-white/50 text-dark-maroon text-sm focus:outline-none focus:border-saffron" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <CalendarDateField
                  label="तारीख (Date)"
                  value={form.date}
                  onChange={(val) => setForm({ ...form, date: val })}
                  required
                />
                <TimePickerField
                  label="वेळ (Time)"
                  value={form.time}
                  onChange={(val) => setForm({ ...form, time: val })}
                />
              </div>
              <LocationField
                label="ठिकाण / पत्ता (Location)"
                value={form.location}
                onChange={(val) => setForm({ ...form, location: val })}
              />
              <div>
                <label className="block text-sm font-devanagari-sans text-dark-maroon/70 mb-1 font-medium">माहिती</label>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="w-full px-3 py-2 rounded-lg border border-golden/30 bg-white/50 text-dark-maroon text-sm focus:outline-none focus:border-saffron" />
              </div>
              <ImageUploadField
                label="कार्यक्रम छायाचित्र (Image - optional)"
                value={form.image_url}
                onChange={(val) => setForm({ ...form, image_url: val })}
                helperText="छायाचित्र थेट Firestore मध्ये सुरक्षित साठवले जाईल (Storage ची गरज नाही)."
              />
              <label className="flex items-center gap-2 text-sm font-devanagari-sans text-dark-maroon/80 font-medium pt-1">
                <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} className="w-4 h-4 rounded text-saffron focus:ring-saffron" />
                <span>प्रकाशित करा (Published)</span>
              </label>

              {/* Submit button inside sticky footer area */}
              <div className="pt-3 sticky bottom-0 bg-cream border-t border-golden/15 mt-4">
                <button type="submit" className="w-full py-2.5 rounded-lg saffron-gradient text-cream font-devanagari-sans font-medium shadow-md hover:shadow-lg transition-all">
                  जतन करा
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-center text-dark-maroon/50 font-devanagari-sans py-8">माहिती लोड होत आहे...</div>
      ) : events.length === 0 ? (
        <div className="text-center py-12 bg-cream rounded-2xl card-shadow gold-border-thin">
          <p className="text-dark-maroon/60 font-devanagari-sans">कोणताही कार्यक्रम नाही. नवीन कार्यक्रम जोडा.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map((event) => (
            <div key={event.id} className="bg-cream rounded-2xl p-5 card-shadow gold-border-thin">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-sm font-devanagari-serif font-bold text-deep-red">{event.title}</h3>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-devanagari-sans ${event.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>{event.published ? 'प्रकाशित' : 'मसुदा'}</span>
              </div>
              <div className="text-xs text-dark-maroon/50 font-devanagari-sans space-y-0.5 mb-3">
                <div>📅 {event.date}</div>
                {event.time && <div>⏰ {event.time}</div>}
                {event.location && <div>📍 {event.location}</div>}
              </div>
              <div className="flex gap-1.5">
                <button onClick={() => handleEdit(event)} className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100"><Edit2 className="w-3.5 h-3.5" /></button>
                <button onClick={() => handleDelete(event.id)} className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
