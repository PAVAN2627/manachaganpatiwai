import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Download, Printer, Copy, Share2, Check, Filter } from 'lucide-react';
import { AdminLayout } from '@/pages/admin/AdminLayout';
import { dbService as db } from '@/lib/db';
import { useSeoMetadata } from '@/lib/seo';
import { useSettings } from '@/lib/settings-context';
import { generateQRCodeCanvas } from '@/lib/qr';
import { copyToClipboard, shareUrl, downloadCanvasAsPng } from '@/lib/helpers';
import type { Album, Year } from '@/lib/types';

export function AdminQRCodes() {
  const location = useLocation();
  const { settings } = useSettings();
  const [albums, setAlbums] = useState<Album[]>([]);
  const [years, setYears] = useState<Year[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterYear, setFilterYear] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const canvasRefs = useRef<Record<string, HTMLCanvasElement | null>>({});
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useSeoMetadata({ title: 'QR Code Center | Admin', description: 'QR Code Management' });

  useEffect(() => {
    const fetchData = async () => {
      const [albumRes, yearRes] = await Promise.all([
        db.from('albums').select('*').order('created_at', { ascending: false }),
        db.from('years').select('*').order('year_value', { ascending: false }),
      ]);
      setAlbums((albumRes.data as Album[]) || []);
      setYears((yearRes.data as Year[]) || []);
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    albums.forEach((album) => {
      const canvas = canvasRefs.current[album.id];
      if (canvas) {
        const url = `${window.location.origin}/${album.public_slug}`;
        generateQRCodeCanvas(canvas, url, { width: 180, margin: 1 }).catch(console.error);
      }
    });
  }, [albums]);

  const filteredAlbums = filterYear === 'all'
    ? albums
    : albums.filter((a) => String(a.year_value) === filterYear);

  const handleDownload = (album: Album) => {
    const card = cardRefs.current[album.id];
    if (card) {
      import('html2canvas').then(({ default: html2canvas }) => {
        html2canvas(card, { background: '#fffbf0' }).then((canvas: HTMLCanvasElement) => {
          const link = document.createElement('a');
          link.download = `QR-${album.title}.png`;
          link.href = canvas.toDataURL('image/png');
          link.click();
        });
      }).catch(() => {
        const c = canvasRefs.current[album.id];
        if (c) downloadCanvasAsPng(c, `QR-${album.title}.png`);
      });
    }
  };

  const handlePrint = (album: Album) => {
    const card = cardRefs.current[album.id];
    if (!card) return;
    const pw = window.open('', '_blank');
    if (!pw) return;
    pw.document.write(`<html><head><title>QR - ${album.title}</title><style>body{font-family:sans-serif;display:flex;align-items:center;justify-content:center;padding:40px;background:#fff}.card{text-align:center;padding:24px;border:2px solid #c8962e;border-radius:16px;max-width:320px}canvas,img{margin:12px auto}.t{font-size:13px;color:#c8962e}.n{font-size:15px;font-weight:bold;color:#7a1a1a}.d{font-size:14px;color:#333}.h{font-size:12px;color:#555;margin-top:8px}</style></head><body><div class="card">${card.innerHTML}</div></body></html>`);
    pw.document.close();
    setTimeout(() => pw.print(), 500);
  };

  const handleCopyUrl = async (album: Album) => {
    const url = `${window.location.origin}/${album.public_slug}`;
    await copyToClipboard(url);
    setCopiedId(album.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleShare = async (album: Album) => {
    const url = `${window.location.origin}/${album.public_slug}`;
    await shareUrl(url, album.title, `📸 ${album.title} — छायाचित्रे ${url}`);
  };

  return (
    <AdminLayout currentPath={location.pathname}>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-devanagari-serif font-bold text-deep-red">📱 QR Code Center</h1>
          <p className="text-sm text-dark-maroon/60 font-devanagari-sans">सर्व अल्बमचे QR Codes एका ठिकाणी</p>
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-dark-maroon/40" />
          <select
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value)}
            className="px-3 py-2 rounded-lg border border-golden/30 bg-white/50 text-dark-maroon text-sm focus:outline-none focus:border-saffron"
          >
            <option value="all">सर्व वर्ष</option>
            {years.map((y) => (
              <option key={y.id} value={String(y.year_value)}>{y.display_name}</option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center text-dark-maroon/50 font-devanagari-sans py-8">माहिती लोड होत आहे...</div>
      ) : filteredAlbums.length === 0 ? (
        <div className="text-center py-12 bg-cream rounded-2xl card-shadow gold-border-thin">
          <p className="text-dark-maroon/60 font-devanagari-sans">कोणतेही अल्बम नाही.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredAlbums.map((album) => (
            <div key={album.id} className="bg-cream rounded-2xl p-5 card-shadow gold-border-thin">
              <div
                ref={(el) => { cardRefs.current[album.id] = el; }}
                className="flex flex-col items-center text-center mb-4"
              >
                <p className="text-xs text-golden font-devanagari-serif">।। {settings.gram_daivata} ।।</p>
                <p className="text-sm text-deep-red font-devanagari-serif font-semibold leading-tight">{settings.mandal_name}</p>
                <p className="text-xs text-dark-maroon/60 font-devanagari-sans mt-1">📸 {album.title}</p>
                <canvas
                  ref={(el) => { canvasRefs.current[album.id] = el; }}
                  className="rounded-lg border border-golden/30 mt-2"
                />
                <p className="text-[10px] text-dark-maroon/50 font-devanagari-sans mt-1">छायाचित्रे पाहण्यासाठी स्कॅन करा</p>
              </div>
              <div className="flex flex-wrap gap-1.5 justify-center">
                <button onClick={() => handleDownload(album)} className="p-2 rounded-lg bg-deep-red text-cream hover:bg-dark-maroon transition-colors" title="Download PNG"><Download className="w-3.5 h-3.5" /></button>
                <button onClick={() => handlePrint(album)} className="p-2 rounded-lg bg-golden/20 text-deep-red hover:bg-golden/30 transition-colors" title="Print"><Printer className="w-3.5 h-3.5" /></button>
                <button onClick={() => handleCopyUrl(album)} className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors" title="Copy URL">{copiedId === album.id ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}</button>
                <button onClick={() => handleShare(album)} className="p-2 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors" title="Share"><Share2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
