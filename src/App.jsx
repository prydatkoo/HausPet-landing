import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { LanguageProvider } from './LanguageContext';
import MainLayout from './components/MainLayout';

const HomePage = lazy(() => import('./pages/HomePage'));
const PreOrderPage = lazy(() => import('./pages/PreOrderPage'));
const UnderDevelopment = lazy(() => import('./pages/UnderDevelopment'));
const AdminPage = lazy(() => import('./pages/AdminPage'));

function App() {
  useEffect(() => {
    // Remove any hash from URL and scroll to top
    if (window.location.hash) {
      window.history.replaceState(null, null, window.location.pathname);
    }
    window.scrollTo(0, 0);

    // Prevent zooming on mobile
    const preventZoom = (e) => {
      if (e.touches && e.touches.length > 1) {
        e.preventDefault();
      }
    };

    // Prevent double-tap zoom
    let lastTouchEnd = 0;
    const preventDoubleTapZoom = (e) => {
      const now = new Date().getTime();
      if (now - lastTouchEnd <= 300) {
        e.preventDefault();
      }
      lastTouchEnd = now;
    };

    document.addEventListener('touchstart', preventZoom, { passive: false });
    document.addEventListener('touchend', preventDoubleTapZoom, { passive: false });

    // Ensure viewport is properly set
    const setViewport = () => {
      const viewport = document.querySelector('meta[name="viewport"]');
      if (viewport) {
        viewport.setAttribute(
          'content',
          'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover'
        );
      }
    };

    setViewport();

    return () => {
      document.removeEventListener('touchstart', preventZoom);
      document.removeEventListener('touchend', preventDoubleTapZoom);
    };
  }, []);

  return (
    <LanguageProvider>
      <Router>
        <div className="min-h-screen bg-white w-full overflow-x-hidden">
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<MainLayout />}>
                <Route index element={<HomePage />} />
                <Route path="pre-order" element={<PreOrderPage />} />
                <Route path="under-development" element={<UnderDevelopment />} />
              </Route>
              <Route path="/admin" element={<AdminPage />} />
            </Routes>
          </Suspense>
        </div>
        <Analytics />
      </Router>
    </LanguageProvider>
  );
}

export default App;
