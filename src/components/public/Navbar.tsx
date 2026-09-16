import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Menu, X, Instagram, Lock } from 'lucide-react';
import { useSettings } from '@/lib/settings-context';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { label: 'मुख्यपृष्ठ', path: '/' },
  { label: 'आमच्याविषयी', path: '/#about' },
  { label: 'इतिहास', path: '/#history' },
  { label: 'गणेशोत्सव', path: '/#ganeshotsav' },
  { label: 'कार्यक्रम', path: '/#events' },
  { label: 'घोषणा', path: '/#announcements' },
  { label: 'छायाचित्र दालन', path: '/gallery' },
  { label: 'संपर्क', path: '/#contact' },
];

export function Navbar() {
  const { settings } = useSettings();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location]);

  const handleNavClick = (path: string) => {
    setOpen(false);
    if (path === '/') {
      navigate('/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (path.includes('#')) {
      const [route, hash] = path.split('#');
      if (route === '/' && location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      } else {
        const el = document.getElementById(hash);
        el?.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(path);
    }
  };

  const isLinkActive = (path: string) => {
    if (path === '/' && location.pathname === '/' && !location.hash) return true;
    if (path.startsWith('/#') && location.hash === path.substring(1)) return true;
    if (!path.includes('#') && path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-[#fffcf4]/95 backdrop-blur-md shadow-md border-b border-golden/30'
            : 'bg-[#fffdf8]/90 backdrop-blur-sm border-b border-golden/15'
        )}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 sm:h-24">

            {/* Left Brand Identity matching reference */}
            <Link
              to="/"
              className="flex items-center gap-2.5 sm:gap-3 group shrink-0 py-1"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-cream flex items-center justify-center gold-border shrink-0 group-hover:scale-105 transition-transform overflow-hidden p-1 shadow-sm">
                <img
                  src="/waiganpatilogo.png"
                  alt="श्री धुंडिविनायक लोगो"
                  className="w-full h-full object-contain rounded-full"
                />
              </div>

              <div className="flex flex-col justify-center">
                <span className="text-[10px] sm:text-[11px] font-devanagari-serif text-golden font-bold leading-none tracking-wider">
                  ।। {settings.gram_daivata} ।।
                </span>
                <span className="font-devanagari-serif font-extrabold text-base sm:text-lg lg:text-xl text-[#7e141c] leading-snug tracking-tight">
                  {settings.mandal_name}
                </span>
                <span className="font-devanagari-sans text-[10px] sm:text-xs text-dark-maroon/75 leading-tight font-medium">
                  {settings.tagline}
                </span>
                <span className="text-[9px] sm:text-[10px] font-devanagari-sans text-golden/90 leading-none mt-0.5">
                  — स्थापना : {settings.establishment_year} —
                </span>
              </div>
            </Link>

            {/* Center Navigation in Pure Marathi */}
            <nav className="hidden xl:flex items-center gap-1.5 lg:gap-2">
              {NAV_LINKS.map((link) => {
                const active = isLinkActive(link.path);
                return (
                  <button
                    key={link.label}
                    onClick={() => handleNavClick(link.path)}
                    className={cn(
                      'px-2.5 py-1.5 text-sm font-devanagari-sans font-medium transition-colors relative',
                      active
                        ? 'text-[#7e141c] font-bold'
                        : 'text-dark-maroon/80 hover:text-[#7e141c]'
                    )}
                  >
                    {link.label}
                    {active && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-[2px] bg-[#7e141c] rounded-full flex items-center justify-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#7e141c] -mt-1" />
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Right Button: "आम्हाला Follow करा" (Instagram) & Admin Icon */}
            <div className="flex items-center gap-2 sm:gap-3">
              <a
                href={settings.instagram_url}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#7e141c] hover:bg-[#600f15] text-cream text-xs sm:text-sm font-devanagari-sans font-semibold shadow-md hover:shadow-lg transition-all hover:scale-105"
              >
                <Instagram className="w-4 h-4 text-cream" />
                <span>आम्हाला Follow करा</span>
              </a>

              <Link
                to="/admin/login"
                aria-label="प्रशासक लॉगिन"
                title="प्रशासक कक्ष"
                className="hidden sm:flex items-center justify-center w-9 h-9 rounded-full bg-golden/15 hover:bg-golden/30 text-[#7e141c] transition-all border border-golden/30"
              >
                <Lock className="w-4 h-4" />
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setOpen(!open)}
                className="xl:hidden p-2 rounded-lg text-dark-maroon hover:bg-golden/15 transition-colors"
                aria-label="मेनू"
              >
                {open ? <X className="w-6 h-6 text-[#7e141c]" /> : <Menu className="w-6 h-6 text-[#7e141c]" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {open && (
        <div className="fixed inset-0 z-40 xl:hidden">
          <div className="absolute inset-0 bg-dark-maroon/50 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="absolute top-20 sm:top-24 left-0 right-0 bg-[#fffcf5] border-t-2 border-golden/30 shadow-2xl animate-fade-in-up">
            <nav className="flex flex-col py-4 px-4 max-w-7xl mx-auto space-y-1">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.path)}
                  className="px-4 py-3 text-left font-devanagari-sans font-semibold text-dark-maroon hover:bg-golden/15 hover:text-[#7e141c] rounded-xl transition-colors border-b border-golden/10 last:border-0 text-sm"
                >
                  {link.label}
                </button>
              ))}

              <div className="pt-3 pb-2 flex flex-col gap-2">
                <a
                  href={settings.instagram_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-full bg-[#7e141c] text-cream text-sm font-devanagari-sans font-semibold shadow-md"
                >
                  <Instagram className="w-4 h-4" />
                  <span>आम्हाला Follow करा</span>
                </a>

                <Link
                  to="/admin/login"
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-full bg-golden/15 text-[#7e141c] text-xs font-devanagari-sans font-semibold border border-golden/30"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>प्रशासकीय लॉगिन (Admin)</span>
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
