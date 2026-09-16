import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Megaphone, Calendar, FolderOpen, CalendarDays, QrCode, TrendingUp, Eye } from 'lucide-react';
import { AdminLayout } from '@/pages/admin/AdminLayout';
import { dbService as db } from '@/lib/db';
import { useSeoMetadata } from '@/lib/seo';
import { Reveal } from '@/components/Reveal';
import type { Announcement, Album, EventItem, Year } from '@/lib/types';

export function AdminDashboard() {
  const location = useLocation();
  const [stats, setStats] = useState({ announcements: 0, events: 0, albums: 0, years: 0 });
  const [recentAnnouncements, setRecentAnnouncements] = useState<Announcement[]>([]);
  const [todayAlbums, setTodayAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);

  useSeoMetadata({ title: 'डॅशबोर्ड | Admin', description: 'Admin Dashboard' });

  useEffect(() => {
    const fetchStats = async () => {
      const [annRes, eventRes, albumRes, yearRes] = await Promise.all([
        db.from('announcements').select('*', { count: 'exact', head: true }),
        db.from('events').select('*', { count: 'exact', head: true }),
        db.from('albums').select('*', { count: 'exact', head: true }),
        db.from('years').select('*', { count: 'exact', head: true }),
      ]);

      setStats({
        announcements: annRes.count || 0,
        events: eventRes.count || 0,
        albums: albumRes.count || 0,
        years: yearRes.count || 0,
      });

      const { data: annData } = await db
        .from('announcements')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);
      setRecentAnnouncements((annData as Announcement[]) || []);

      const today = new Date().toLocaleDateString('mr-IN');
      const { data: albumData } = await db
        .from('albums')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);
      setTodayAlbums((albumData as Album[]) || []);

      setLoading(false);
    };
    fetchStats();
  }, []);

  const statCards = [
    { label: 'एकूण घोषणा', value: stats.announcements, icon: Megaphone, color: 'from-orange-400 to-red-500' },
    { label: 'एकूण कार्यक्रम', value: stats.events, icon: Calendar, color: 'from-blue-500 to-indigo-600' },
    { label: 'एकूण अल्बम', value: stats.albums, icon: FolderOpen, color: 'from-green-500 to-teal-600' },
    { label: 'एकूण वर्षे', value: stats.years, icon: CalendarDays, color: 'from-amber-400 to-yellow-600' },
  ];

  return (
    <AdminLayout currentPath={location.pathname}>
      <div className="mb-6">
        <h1 className="text-2xl font-devanagari-serif font-bold text-deep-red">डॅशबोर्ड</h1>
        <p className="text-sm text-dark-maroon/60 font-devanagari-sans">मंडळाची संपूर्ण माहिती एका ठिकाणी</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <Reveal key={card.label} delay={i * 80}>
              <div className="bg-cream rounded-2xl p-5 card-shadow gold-border-thin hover:card-shadow-lg transition-all">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-3`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="text-2xl font-devanagari-serif font-bold text-deep-red">
                  {loading ? '...' : card.value}
                </div>
                <div className="text-xs text-dark-maroon/60 font-devanagari-sans">{card.label}</div>
              </div>
            </Reveal>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Reveal>
          <div className="bg-cream rounded-2xl p-6 card-shadow gold-border-thin">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-devanagari-serif font-bold text-deep-red flex items-center gap-2">
                <Megaphone className="w-5 h-5 text-saffron" />
                अलीकडील घोषणा
              </h3>
              <Link to="/admin/announcements" className="text-xs text-saffron hover:underline font-devanagari-sans">
                सर्व पहा
              </Link>
            </div>
            {recentAnnouncements.length === 0 ? (
              <p className="text-sm text-dark-maroon/50 font-devanagari-sans py-4 text-center">
                कोणतीही घोषणा नाही
              </p>
            ) : (
              <div className="space-y-3">
                {recentAnnouncements.map((ann) => (
                  <div key={ann.id} className="flex items-start gap-3 p-3 rounded-lg bg-golden/5 hover:bg-golden/10 transition-colors">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-devanagari-sans font-medium text-dark-maroon truncate">
                          {ann.title}
                        </span>
                        {ann.important && (
                          <span className="px-1.5 py-0.5 rounded-full bg-saffron text-cream text-[10px] font-devanagari-sans">
                            महत्वाचे
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-dark-maroon/50 font-devanagari-sans">{ann.date}</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-devanagari-sans ${ann.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {ann.published ? 'प्रकाशित' : 'मसुदा'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="bg-cream rounded-2xl p-6 card-shadow gold-border-thin">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-devanagari-serif font-bold text-deep-red flex items-center gap-2">
                <FolderOpen className="w-5 h-5 text-saffron" />
                आजचे अल्बम
              </h3>
              <Link to="/admin/gallery" className="text-xs text-saffron hover:underline font-devanagari-sans">
                सर्व पहा
              </Link>
            </div>
            {todayAlbums.length === 0 ? (
              <p className="text-sm text-dark-maroon/50 font-devanagari-sans py-4 text-center">
                कोणतेही अल्बम नाही
              </p>
            ) : (
              <div className="space-y-3">
                {todayAlbums.map((album) => (
                  <div key={album.id} className="flex items-center gap-3 p-3 rounded-lg bg-golden/5 hover:bg-golden/10 transition-colors">
                    <FolderOpen className="w-5 h-5 text-golden shrink-0" />
                    <div className="flex-1 min-w-0">
                      <span className="text-sm font-devanagari-sans font-medium text-dark-maroon block truncate">
                        📁 {album.title}
                      </span>
                      <span className="text-xs text-dark-maroon/50 font-devanagari-sans">{album.year_value}</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-devanagari-sans ${album.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {album.published ? 'प्रकाशित' : 'मसुदा'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </AdminLayout>
  );
}
