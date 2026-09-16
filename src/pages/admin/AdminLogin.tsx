import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, Eye, EyeOff, Home, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { useSettings } from '@/lib/settings-context';
import { DecorativeBorder } from '@/components/decorations';
import { useSeoMetadata } from '@/lib/seo';

export function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { settings } = useSettings();

  // If already logged in, redirect directly to admin dashboard
  useEffect(() => {
    if (!authLoading && user) {
      navigate('/admin', { replace: true });
    }
  }, [user, authLoading, navigate]);


  useSeoMetadata({
    title: 'Admin Login | श्री धुंडिविनायक मानाचा गणपती',
    description: 'Admin login page',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { error: signInError } = await signIn(email, password);
    if (signInError) {
      setError(signInError);
      setLoading(false);
    } else {
      navigate('/admin');
    }
  };

  if (authLoading || user) {
    return (
      <div className="min-h-screen flex items-center justify-center maroon-gradient">
        <div className="text-center p-6 bg-cream/10 rounded-2xl border border-golden/30 backdrop-blur-sm">
          <div className="w-10 h-10 border-3 border-golden/30 border-t-golden rounded-full animate-spin mx-auto mb-3" />
          <p className="text-cream font-devanagari-sans text-sm">प्रशासकीय कक्ष उघडत आहे...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center maroon-gradient relative overflow-hidden py-8">
      <div className="absolute inset-0 mandala-bg opacity-20" />

      <div className="relative w-full max-w-md mx-4">
        {/* Back to Home Button */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cream/15 hover:bg-cream/25 text-cream hover:text-golden text-sm font-devanagari-sans font-semibold transition-all border border-golden/30 shadow-sm"
          >
            <Home className="w-4 h-4 text-golden" />
            <span>मुख्यपृष्ठावर परत (Back to Home)</span>
          </button>
        </div>

        <div className="bg-cream rounded-3xl p-8 card-shadow-lg gold-border">
          <div className="text-center mb-6">
            <div className="text-golden mb-2">
              <DecorativeBorder className="w-32 h-4 mx-auto" />
            </div>
            <div className="w-20 h-20 mx-auto rounded-full bg-cream/90 p-1 flex items-center justify-center gold-border mb-3 shadow-md overflow-hidden">
              <img
                src="/waiganpatilogo.png"
                alt="श्री धुंडिविनायक लोगो"
                className="w-full h-full object-contain rounded-full"
              />
            </div>
            <h1 className="text-xl font-devanagari-serif font-bold text-deep-red">
              {settings.mandal_name}
            </h1>
            <p className="text-sm text-dark-maroon/60 font-devanagari-sans mt-0.5">
              प्रशासकीय कक्ष (Admin Panel)
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-devanagari-sans text-dark-maroon/70 mb-1.5">
                ईमेल
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-maroon/40" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-golden/30 bg-white/50 text-dark-maroon text-sm focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron transition-colors"
                  placeholder="admin@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-devanagari-sans text-dark-maroon/70 mb-1.5">
                पासवर्ड
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-maroon/40" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-golden/30 bg-white/50 text-dark-maroon text-sm focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron transition-colors"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-maroon/40 hover:text-dark-maroon"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="text-sm text-red-600 font-devanagari-sans bg-red-50 rounded-lg p-3">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg saffron-gradient text-cream font-devanagari-sans font-semibold shadow-lg hover:shadow-xl disabled:opacity-60 transition-all gold-border"
            >
              {loading ? 'लॉगिन होत आहे...' : 'लॉगिन करा'}
            </button>
          </form>


          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-1.5 text-xs text-dark-maroon/70 hover:text-deep-red font-devanagari-sans font-medium hover:underline"
            >
              <Home className="w-3.5 h-3.5 text-golden" />
              <span>← मुख्यपृष्ठावर परत जा (Back to Home)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
