import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Plus, Edit2, Trash2, X, AlertCircle, Eye } from 'lucide-react';
import { AdminLayout } from '@/pages/admin/AdminLayout';
import { dbService as db } from '@/lib/db';
import { useSeoMetadata } from '@/lib/seo';
import type { Announcement } from '@/lib/types';
import { ImageUploadField } from '@/components/admin/ImageUploadField';
import { CalendarDateField } from '@/components/admin/DateTimeLocationHelpers';

export function AdminAnnouncements() {
  const location = useLocation();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Announcement | null>(null);
  const [form, setForm] = useState({
    title: '', content: '', date: '', image_url: '', important: false, published: true,
  });

  useSeoMetadata({ title: 'घोषणा व्यवस्थापन | Admin', description: 'Announcement Management' });

  const fetchData = async () => {
    const { data } = await db.from('announcements').select('*').order('created_at', { ascending: false });
    setAnnouncements((data as Announcement[]) || []);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const resetForm = () => {
    setForm({ title: '', content: '', date: '', image_url: '', important: false, published: true });
    setEditing(null);
    setShowForm(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      await db.from('announcements').update({
        title: form.title, content: form.content, date: form.date,
        image_url: form.image_url || null, important: form.important, published: form.published,
        updated_at: new Date().toISOString(),
      }).eq('id', editing.id);
    } else {
      await db.from('announcements').insert({
        title: form.title, content: form.content, date: form.date,
        image_url: form.image_url || null, important: form.important, published: form.published,
      });
    }
    resetForm();
    fetchData();
  };

  const handleEdit = (ann: Announcement) => {
    setEditing(ann);
    setForm({
      title: ann.title, content: ann.content, date: ann.date,
      image_url: ann.image_url || '', important: ann.important, published: ann.published,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('ही घोषणा डिलीट करायची आहे का?')) return;
    await db.from('announcements').delete().eq('id', id);
    fetchData();
  };

  const togglePublished = async (ann: Announcement) => {
    await db.from('announcements').update({ published: !ann.published }).eq('id', ann.id);
    fetchData();
  };

  const toggleImportant = async (ann: Announcement) => {
    await db.from('announcements').update({ important: !ann.important }).eq('id', ann.id);
    fetchData();
  };

  return (
    <AdminLayout currentPath={location.pathname}>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-devanagari-serif font-bold text-deep-red">📢 घोषणा व्यवस्थापन</h1>
          <p className="text-sm text-dark-maroon/60 font-devanagari-sans">घोषणा जोडा, संपादित करा, प्रकाशित करा</p>
        </div>
        <button onClick={() => { resetForm(); setShowForm(true); }} className="px-4 py-2 rounded-lg saffron-gradient text-cream text-sm font-devanagari-sans font-medium hover:shadow-lg flex items-center gap-1.5">
          <Plus className="w-4 h-4" />
          नवीन घोषणा
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-dark-maroon/50 backdrop-blur-sm" onClick={resetForm}>
          <div
            className="bg-cream rounded-2xl p-5 sm:p-6 max-w-xl w-full card-shadow-lg gold-border max-h-[92vh] flex flex-col my-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-golden/20 shrink-0">
              <h3 className="text-lg font-devanagari-serif font-bold text-deep-red">{editing ? 'घोषणा संपादित करा' : 'नवीन घोषणा'}</h3>
              <button onClick={resetForm} className="text-dark-maroon/50 hover:text-deep-red p-1 rounded-lg hover:bg-black/5 transition-colors"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="overflow-y-auto flex-1 py-4 pr-1 sm:pr-2 space-y-4">
              <div>
                <label className="block text-sm font-devanagari-sans text-dark-maroon/70 mb-1 font-medium">शीर्षक</label>
                <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required className="w-full px-3 py-2 rounded-lg border border-golden/30 bg-white/50 text-dark-maroon text-sm focus:outline-none focus:border-saffron" />
              </div>
              <div>
                <label className="block text-sm font-devanagari-sans text-dark-maroon/70 mb-1 font-medium">माहिती</label>
                <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} required rows={3} className="w-full px-3 py-2 rounded-lg border border-golden/30 bg-white/50 text-dark-maroon text-sm focus:outline-none focus:border-saffron" />
              </div>
              <CalendarDateField
                label="दिनांक (Date)"
                value={form.date}
                onChange={(val) => setForm({ ...form, date: val })}
                required
              />
              <ImageUploadField
                label="घोषणा छायाचित्र (Image - optional)"
                value={form.image_url}
                onChange={(val) => setForm({ ...form, image_url: val })}
                helperText="छायाचित्र थेट Firestore मध्ये सुरक्षित साठवले जाईल (Storage ची गरज नाही)."
              />
              <div className="flex gap-6 pt-1">
                <label className="flex items-center gap-2 text-sm font-devanagari-sans text-dark-maroon/80 font-medium">
                  <input type="checkbox" checked={form.important} onChange={(e) => setForm({ ...form, important: e.target.checked })} className="w-4 h-4 rounded text-saffron focus:ring-saffron" />
                  <span>महत्वाचे</span>
                </label>
                <label className="flex items-center gap-2 text-sm font-devanagari-sans text-dark-maroon/80 font-medium">
                  <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} className="w-4 h-4 rounded text-saffron focus:ring-saffron" />
                  <span>प्रकाशित करा (Published)</span>
                </label>
              </div>
              <div className="pt-3 sticky bottom-0 bg-cream border-t border-golden/15 mt-4">
                <button type="submit" className="w-full py-2.5 rounded-lg saffron-gradient text-cream font-devanagari-sans font-medium shadow-md hover:shadow-lg transition-all">जतन करा</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-center text-dark-maroon/50 font-devanagari-sans py-8">माहिती लोड होत आहे...</div>
      ) : announcements.length === 0 ? (
        <div className="text-center py-12 bg-cream rounded-2xl card-shadow gold-border-thin">
          <p className="text-dark-maroon/60 font-devanagari-sans">कोणतीही घोषणा नाही. नवीन घोषणा जोडा.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {announcements.map((ann) => (
            <div key={ann.id} className="bg-cream rounded-2xl p-5 card-shadow gold-border-thin flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-golden/20 flex items-center justify-center shrink-0">
                {ann.important ? <AlertCircle className="w-5 h-5 text-saffron" /> : <Eye className="w-5 h-5 text-golden" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <h3 className="text-sm font-devanagari-serif font-bold text-deep-red">{ann.title}</h3>
                  {ann.important && <span className="px-2 py-0.5 rounded-full bg-saffron text-cream text-[10px] font-devanagari-sans">महत्वाचे</span>}
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-devanagari-sans ${ann.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>{ann.published ? 'प्रकाशित' : 'मसुदा'}</span>
                </div>
                <span className="text-xs text-dark-maroon/50 font-devanagari-sans">{ann.date}</span>
                <p className="text-sm text-dark-maroon/70 font-devanagari-sans mt-1 line-clamp-2">{ann.content}</p>
              </div>
              <div className="flex gap-1.5 shrink-0">
                <button onClick={() => handleEdit(ann)} className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100" title="संपादित करा"><Edit2 className="w-3.5 h-3.5" /></button>
                <button onClick={() => togglePublished(ann)} className="p-2 rounded-lg bg-green-50 text-green-600 hover:bg-green-100" title="प्रकाशन बदला"><Eye className="w-3.5 h-3.5" /></button>
                <button onClick={() => toggleImportant(ann)} className="p-2 rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-100" title="महत्वाचे चिन्हांकित करा"><AlertCircle className="w-3.5 h-3.5" /></button>
                <button onClick={() => handleDelete(ann.id)} className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100" title="हटवा"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
