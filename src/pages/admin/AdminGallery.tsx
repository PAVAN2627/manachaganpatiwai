import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Plus, Edit2, Trash2, Eye, QrCode, Copy, Share2, ExternalLink, FolderOpen, Check, X } from 'lucide-react';
import { AdminLayout } from '@/pages/admin/AdminLayout';
import { dbService as db } from '@/lib/db';
import { useSeoMetadata } from '@/lib/seo';
import { generateAlbumSlug } from '@/lib/helpers';
import { copyToClipboard, shareUrl } from '@/lib/helpers';
import { generateQRCodeCanvas } from '@/lib/qr';
import type { Album, Year } from '@/lib/types';
import { ImageUploadField } from '@/components/admin/ImageUploadField';
import { CalendarDateField } from '@/components/admin/DateTimeLocationHelpers';

export function AdminGallery() {
  const location = useLocation();
  const [albums, setAlbums] = useState<Album[]>([]);
  const [years, setYears] = useState<Year[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showYearForm, setShowYearForm] = useState(false);
  const [editing, setEditing] = useState<Album | null>(null);
  const [qrAlbum, setQrAlbum] = useState<Album | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [form, setForm] = useState({
    year_value: 2026,
    title: '',
    date: '',
    description: '',
    drive_url: '',
    cover_image: '',
    published: true,
  });

  const [yearForm, setYearForm] = useState({ year_value: 2026, display_name: '' });

  useSeoMetadata({ title: 'Gallery व्यवस्थापन | Admin', description: 'Gallery Management' });

  const fetchData = async () => {
    const [albumRes, yearRes] = await Promise.all([
      db.from('albums').select('*').order('created_at', { ascending: false }),
      db.from('years').select('*').order('year_value', { ascending: false }),
    ]);
    setAlbums((albumRes.data as Album[]) || []);
    setYears((yearRes.data as Year[]) || []);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const resetForm = () => {
    setForm({
      year_value: 2026,
      title: '',
      date: '',
      description: '',
      drive_url: '',
      cover_image: '',
      published: true,
    });
    setEditing(null);
    setShowForm(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      await db.from('albums').update({
        year_value: form.year_value,
        title: form.title,
        date: form.date || form.title,
        description: form.description || null,
        drive_url: form.drive_url || null,
        cover_image: form.cover_image || null,
        published: form.published,
        qr_type: 'album',
        updated_at: new Date().toISOString(),
      }).eq('id', editing.id);
    } else {
      const slug = generateAlbumSlug(form.year_value, form.title);
      const yearRecord = years.find((y) => y.year_value === Number(form.year_value));
      await db.from('albums').insert({
        year_id: yearRecord?.id || null,
        year_value: Number(form.year_value),
        title: form.title,
        date: form.date || form.title,
        description: form.description || null,
        drive_url: form.drive_url || null,
        cover_image: form.cover_image || null,
        public_slug: slug,
        published: form.published,
        qr_type: 'album',
      });
    }
    resetForm();
    fetchData();
  };

  const handleEdit = (album: Album) => {
    setEditing(album);
    setForm({
      year_value: album.year_value,
      title: album.title,
      date: album.date,
      description: album.description || '',
      drive_url: album.drive_url || '',
      cover_image: album.cover_image || '',
      published: album.published,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('हे अल्बम डिलीट करायचे आहे का?')) return;
    await db.from('albums').delete().eq('id', id);
    fetchData();
  };

  const handleAddYear = async (e: React.FormEvent) => {
    e.preventDefault();
    const yv = Number(yearForm.year_value);
    const existing = years.find((y) => y.year_value === yv);
    if (existing) { setShowYearForm(false); return; }
    const maxSort = Math.max(0, ...years.map((y) => y.sort_order));
    await db.from('years').insert({
      year_value: yv,
      display_name: yearForm.display_name || String(yv),
      sort_order: maxSort + 1,
    });
    setYearForm({ year_value: 2026, display_name: '' });
    setShowYearForm(false);
    fetchData();
  };

  const handleCopyLink = async (album: Album) => {
    const url = `${window.location.origin}/${album.public_slug}`;
    await copyToClipboard(url);
    setCopiedId(album.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleShare = async (album: Album) => {
    const url = `${window.location.origin}/${album.public_slug}`;
    await shareUrl(url, album.title, `📸 ${album.title} — छायाचित्रे पाहण्यासाठी ${url}`);
  };

  return (
    <AdminLayout currentPath={location.pathname}>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-devanagari-serif font-bold text-deep-red">📸 Gallery व्यवस्थापन</h1>
          <p className="text-sm text-dark-maroon/60 font-devanagari-sans">अल्बम आणि वर्ष व्यवस्थापन</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowYearForm(true)}
            className="px-4 py-2 rounded-lg bg-golden/20 text-deep-red text-sm font-devanagari-sans font-medium hover:bg-golden/30 transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            नवीन वर्ष
          </button>
          <button
            onClick={() => { resetForm(); setShowForm(true); }}
            className="px-4 py-2 rounded-lg saffron-gradient text-cream text-sm font-devanagari-sans font-medium hover:shadow-lg transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            नवीन अल्बम
          </button>
        </div>
      </div>

      {showYearForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-maroon/40 backdrop-blur-sm" onClick={() => setShowYearForm(false)}>
          <div className="bg-cream rounded-2xl p-6 max-w-md w-full card-shadow-lg gold-border" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-devanagari-serif font-bold text-deep-red">नवीन वर्ष</h3>
              <button onClick={() => setShowYearForm(false)} className="text-dark-maroon/40 hover:text-dark-maroon"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleAddYear} className="space-y-4">
              <div>
                <label className="block text-sm font-devanagari-sans text-dark-maroon/70 mb-1">वर्ष</label>
                <input type="number" value={yearForm.year_value} onChange={(e) => setYearForm({ ...yearForm, year_value: Number(e.target.value) })} required className="w-full px-3 py-2 rounded-lg border border-golden/30 bg-white/50 text-dark-maroon text-sm focus:outline-none focus:border-saffron" />
              </div>
              <div>
                <label className="block text-sm font-devanagari-sans text-dark-maroon/70 mb-1">Display Name</label>
                <input type="text" value={yearForm.display_name} onChange={(e) => setYearForm({ ...yearForm, display_name: e.target.value })} placeholder="2026" className="w-full px-3 py-2 rounded-lg border border-golden/30 bg-white/50 text-dark-maroon text-sm focus:outline-none focus:border-saffron" />
              </div>
              <button type="submit" className="w-full py-2.5 rounded-lg saffron-gradient text-cream font-devanagari-sans font-medium">जतन करा</button>
            </form>
          </div>
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-dark-maroon/50 backdrop-blur-sm" onClick={resetForm}>
          <div
            className="bg-cream rounded-2xl p-5 sm:p-6 max-w-xl w-full card-shadow-lg gold-border max-h-[92vh] flex flex-col my-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-golden/20 shrink-0">
              <h3 className="text-lg font-devanagari-serif font-bold text-deep-red">{editing ? 'अल्बम संपादित करा' : 'नवीन अल्बम'}</h3>
              <button onClick={resetForm} className="text-dark-maroon/50 hover:text-deep-red p-1 rounded-lg hover:bg-black/5 transition-colors"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="overflow-y-auto flex-1 py-4 pr-1 sm:pr-2 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-devanagari-sans text-dark-maroon/70 mb-1 font-medium">वर्ष</label>
                  <select value={form.year_value} onChange={(e) => setForm({ ...form, year_value: Number(e.target.value) })} className="w-full px-3 py-2 rounded-lg border border-golden/30 bg-white/50 text-dark-maroon text-sm focus:outline-none focus:border-saffron">
                    {years.map((y) => <option key={y.id} value={y.year_value}>{y.display_name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-devanagari-sans text-dark-maroon/70 mb-1 font-medium">अल्बम नाव</label>
                  <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required placeholder="16 सप्टेंबर 2026" className="w-full px-3 py-2 rounded-lg border border-golden/30 bg-white/50 text-dark-maroon text-sm focus:outline-none focus:border-saffron" />
                </div>
              </div>
              <CalendarDateField
                label="दिनांक (Date)"
                value={form.date}
                onChange={(val) => setForm({ ...form, date: val })}
              />
              <div>
                <label className="block text-sm font-devanagari-sans text-dark-maroon/70 mb-1 font-medium">वर्णन</label>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2} className="w-full px-3 py-2 rounded-lg border border-golden/30 bg-white/50 text-dark-maroon text-sm focus:outline-none focus:border-saffron" />
              </div>
              <div>
                <label className="block text-sm font-devanagari-sans text-dark-maroon/70 mb-1 font-medium">
                  🔗 Google Drive किंवा फोटो लिंक (Drive / Photos Link)
                </label>
                <input
                  type="url"
                  value={form.drive_url}
                  onChange={(e) => setForm({ ...form, drive_url: e.target.value })}
                  placeholder="https://drive.google.com/drive/folders/... किंवा फोटो पाहण्यासाठीची लिंक"
                  className="w-full px-3 py-2 rounded-lg border border-golden/30 bg-white/50 text-dark-maroon text-sm focus:outline-none focus:border-saffron"
                />
                <p className="text-[11px] text-dark-maroon/60 font-devanagari-sans mt-1">
                  भाविकांना अल्बम पेजवर ही लिंक दिसेल, ज्यावर क्लिक करून ते सर्व छायाचित्रे पाहू शकतील. (QR कोड मात्र संकेतस्थळाच्या अल्बम पेजवरच आणेल).
                </p>
              </div>
              <ImageUploadField
                label="कव्हर छायाचित्र (Cover Image - ऐच्छिक / Optional)"
                value={form.cover_image}
                onChange={(val) => setForm({ ...form, cover_image: val })}
                helperText="ऐच्छिक (Optional). मुख्य दर्शनी फोटो न जोडल्यास डीफॉल्ट डिझाइन दिसेल."
              />
              <div className="pt-1">
                <label className="flex items-center gap-2 text-sm font-devanagari-sans text-dark-maroon/80 font-medium">
                  <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} className="w-4 h-4 rounded text-saffron focus:ring-saffron" />
                  <span>प्रकाशित करा (Published - भाविकांना दिसण्यासाठी)</span>
                </label>
              </div>
              <div className="pt-3 sticky bottom-0 bg-cream border-t border-golden/15 mt-4">
                <button type="submit" className="w-full py-2.5 rounded-lg saffron-gradient text-cream font-devanagari-sans font-medium shadow-md hover:shadow-lg transition-all">जतन करा</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {qrAlbum && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-maroon/40 backdrop-blur-sm" onClick={() => setQrAlbum(null)}>
          <div className="bg-cream rounded-2xl p-6 max-w-sm w-full card-shadow-lg gold-border text-center" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-devanagari-serif font-bold text-deep-red mb-2">{qrAlbum.title}</h3>
            <QRCodeCanvas key={qrAlbum.id} album={qrAlbum} />
            <button onClick={() => setQrAlbum(null)} className="mt-4 px-4 py-2 rounded-lg bg-golden/20 text-deep-red text-sm font-devanagari-sans">बंद करा</button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-center text-dark-maroon/50 font-devanagari-sans py-8">माहिती लोड होत आहे...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {albums.map((album) => (
            <div key={album.id} className="bg-cream rounded-2xl p-5 card-shadow gold-border-thin hover:card-shadow-lg transition-all">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <FolderOpen className="w-5 h-5 text-golden" />
                  <span className="text-sm font-devanagari-serif font-bold text-deep-red">📁 {album.title}</span>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-devanagari-sans ${album.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                  {album.published ? '🟢 प्रकाशित' : 'मसुदा'}
                </span>
              </div>
              <div className="text-xs text-dark-maroon/50 font-devanagari-sans mb-3">
                {album.year_value} • {album.date}
              </div>
              <div className="flex flex-wrap gap-1.5">
                <button onClick={() => handleEdit(album)} className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors" title="संपादित करा">
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => handleDelete(album.id)} className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors" title="हटवा">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
                <a href={`/${album.public_slug}`} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition-colors" title="Preview">
                  <Eye className="w-3.5 h-3.5" />
                </a>
                <button onClick={() => setQrAlbum(album)} className="p-2 rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-100 transition-colors" title="QR Code">
                  <QrCode className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => handleCopyLink(album)} className="p-2 rounded-lg bg-purple-50 text-purple-600 hover:bg-purple-100 transition-colors" title="Copy Link">
                  {copiedId === album.id ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
                <button onClick={() => handleShare(album)} className="p-2 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors" title="Share">
                  <Share2 className="w-3.5 h-3.5" />
                </button>
                {album.drive_url && (
                  <a href={album.drive_url} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-orange-50 text-orange-600 hover:bg-orange-100 transition-colors" title="Open Drive">
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}

function QRCodeCanvas({ album }: { album: Album }) {
  return (
    <div className="flex flex-col items-center">
      <canvas id={`qr-${album.id}`} className="rounded-lg border border-golden/30" ref={(canvas) => {
        if (canvas) {
          const url = album.qr_type === 'drive' && album.drive_url ? album.drive_url : `${window.location.origin}/${album.public_slug}`;
          generateQRCodeCanvas(canvas, url, { width: 200, margin: 1 }).catch(console.error);
        }
      }} />
      <p className="text-xs text-dark-maroon/50 font-devanagari-sans mt-2">छायाचित्रे पाहण्यासाठी स्कॅन करा</p>
    </div>
  );
}
