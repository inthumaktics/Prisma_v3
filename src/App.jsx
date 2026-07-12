import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import TopNav  from './components/layout/TopNav';
import Drawer  from './components/feedback/Drawer';
import Modal   from './components/feedback/Modal';
import Toast   from './components/feedback/Toast';

const Landing     = lazy(() => import('./pages/Landing'));
const Dashboard   = lazy(() => import('./pages/Dashboard'));
const Ranking     = lazy(() => import('./pages/Ranking'));
const Compare     = lazy(() => import('./pages/Compare'));
const MapPage     = lazy(() => import('./pages/MapPage'));
const Carbon      = lazy(() => import('./pages/Carbon'));
const OjkPanel    = lazy(() => import('./pages/OjkPanel'));
const Literacy    = lazy(() => import('./pages/Literacy'));
const Methodology = lazy(() => import('./pages/Methodology'));

function AppShell() {
  return (
    <div className="app-v3">
      <TopNav />

      <main className="main-content">
        <Suspense fallback={<div className="loading-screen">Memuat…</div>}>
          <Routes>
            <Route path="/"           element={<Landing />} />
            <Route path="/dashboard"  element={<Dashboard />} />
            <Route path="/ranking"    element={<Ranking />} />
            <Route path="/compare"    element={<Compare />} />
            <Route path="/map"        element={<MapPage />} />
            <Route path="/carbon"     element={<Carbon />} />
            <Route path="/ojk"        element={<OjkPanel />} />
            <Route path="/literasi"   element={<Literacy />} />
            <Route path="/metodologi" element={<Methodology />} />
          </Routes>
        </Suspense>
      </main>

      <Drawer />
      <Modal />
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppShell />
      </AppProvider>
    </BrowserRouter>
  );
}
