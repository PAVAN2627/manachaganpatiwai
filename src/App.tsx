import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/lib/auth-context';
import { SettingsProvider } from '@/lib/settings-context';
import { HomePage } from '@/pages/HomePage';
import { GalleryPage } from '@/pages/GalleryPage';
import { AlbumPage } from '@/pages/AlbumPage';
import { AnnouncementsPage } from '@/pages/AnnouncementsPage';
import { AdminLogin } from '@/pages/admin/AdminLogin';
import { AdminDashboard } from '@/pages/admin/AdminDashboard';
import { AdminGallery } from '@/pages/admin/AdminGallery';
import { AdminAnnouncements } from '@/pages/admin/AdminAnnouncements';
import { AdminEvents } from '@/pages/admin/AdminEvents';
import { AdminQRCodes } from '@/pages/admin/AdminQRCodes';
import { AdminSettings } from '@/pages/admin/AdminSettings';
import { ScrollToTop } from '@/components/ScrollToTop';
import type { ReactNode } from 'react';

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <p className="text-dark-maroon/50 font-devanagari-sans">लोड होत आहे...</p>
      </div>
    );
  }
  if (!user) return <Navigate to="/admin/login" replace />;
  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/gallery" element={<GalleryPage />} />
      <Route path="/announcements" element={<AnnouncementsPage />} />
      <Route path="/gallery/:year/:slug" element={<AlbumPage />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/gallery" element={<ProtectedRoute><AdminGallery /></ProtectedRoute>} />
      <Route path="/admin/announcements" element={<ProtectedRoute><AdminAnnouncements /></ProtectedRoute>} />
      <Route path="/admin/events" element={<ProtectedRoute><AdminEvents /></ProtectedRoute>} />
      <Route path="/admin/qr-codes" element={<ProtectedRoute><AdminQRCodes /></ProtectedRoute>} />
      <Route path="/admin/settings" element={<ProtectedRoute><AdminSettings /></ProtectedRoute>} />
      {/* Friendly deep link redirects */}
      <Route path="/events" element={<Navigate to="/#events" replace />} />
      <Route path="/about" element={<Navigate to="/#about" replace />} />
      <Route path="/contact" element={<Navigate to="/#contact" replace />} />
      <Route path="/history" element={<Navigate to="/#history" replace />} />
      <Route path="/ganeshotsav" element={<Navigate to="/#ganeshotsav" replace />} />
      {/* Fallback for any unknown route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
export default function App() {
  return (
    <AuthProvider>
      <SettingsProvider>
        <BrowserRouter>
          <ScrollToTop />
          <AppRoutes />
        </BrowserRouter>
      </SettingsProvider>
    </AuthProvider>
  );
}
