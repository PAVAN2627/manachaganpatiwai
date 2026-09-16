import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { LayoutDashboard, FolderOpen, Megaphone, Calendar, QrCode, Settings, LogOut, Menu, X, Home } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { useSettings } from '@/lib/settings-context';
import { GaneshIcon } from '@/components/decorations';
import { cn } from '@/lib/utils';

const NAV = [
  { label: 'डॅशबोर्ड', path: '/admin', icon: LayoutDashboard },
  { label: 'छायाचित्र दालन व्यवस्थापन', path: '/admin/gallery', icon: FolderOpen },
  { label: 'घोषणा व्यवस्थापन', path: '/admin/announcements', icon: Megaphone },
  { label: 'कार्यक्रम व्यवस्थापन', path: '/admin/events', icon: Calendar },
  { label: 'क्युआर (QR) कोड केंद्र', path: '/admin/qr-codes', icon: QrCode },
];

export function AdminLayout({ children, currentPath }: { children: React.ReactNode; currentPath: string }) {
  const { user, signOut } = useAuth();
  const { settings } = useSettings();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!user) return <Navigate to="/admin/login" replace />;

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream to-golden/10 flex">
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 lg:hidden" onClick={() => setSidebarOpen(false)}>
          <div className="absolute inset-0 bg-dark-maroon/40" />
        </div>
      )}

      <aside className={cn(
        'fixed lg:sticky top-0 left-0 h-screen z-40 w-64 maroon-gradient text-cream flex flex-col transition-transform duration-300',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      )}>
        <div className="p-4 border-b border-golden/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-cream/95 p-0.5 flex items-center justify-center gold-border shrink-0 shadow-md overflow-hidden">
              <img src="/waiganpatilogo.png" alt="श्री धुंडिविनायक लोगो" className="w-full h-full object-contain rounded-full" />
            </div>
            <div className="min-w-0">
              <div className="text-sm font-devanagari-serif font-bold text-golden truncate">
                श्री धुंडिविनायक
              </div>
              <div className="text-xs text-cream/70 truncate">प्रशासकीय कक्ष (Admin)</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {NAV.map((item) => {
            const Icon = item.icon;
            const active = currentPath === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-devanagari-sans transition-colors',
                  active
                    ? 'saffron-gradient text-cream shadow-lg'
                    : 'text-cream/70 hover:bg-cream/10 hover:text-golden'
                )}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-golden/20 space-y-1">
          <Link
            to="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-devanagari-sans text-cream/70 hover:bg-cream/10 hover:text-golden transition-colors"
          >
            <Home className="w-4 h-4" />
            वेबसाइट
          </Link>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-devanagari-sans text-cream/70 hover:bg-red-600/30 hover:text-cream transition-colors"
          >
            <LogOut className="w-4 h-4" />
            लॉगआउट
          </button>
        </div>
      </aside>

      <div className="flex-1 min-w-0 flex flex-col">
        <header className="sticky top-0 z-20 bg-cream/95 backdrop-blur-md border-b border-golden/20 px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-lg text-dark-maroon hover:bg-golden/10"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div className="text-sm text-dark-maroon/60 font-devanagari-sans truncate">
            {settings.mandal_name}
          </div>
          <div className="text-xs text-dark-maroon/50 font-devanagari-sans hidden sm:block">
            {user.email}
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
