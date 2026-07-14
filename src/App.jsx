import { lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import AppLayout from './components/layout/AppLayout';

const Landing     = lazy(() => import('./pages/Landing'));
const Market      = lazy(() => import('./pages/Market'));
const Ranking     = lazy(() => import('./pages/Ranking'));
const Compare     = lazy(() => import('./pages/Compare'));
const MapPage     = lazy(() => import('./pages/MapPage'));
const Carbon      = lazy(() => import('./pages/Carbon'));
const OjkPanel    = lazy(() => import('./pages/OjkPanel'));
const Literacy    = lazy(() => import('./pages/Literacy'));
const Methodology = lazy(() => import('./pages/Methodology'));

function AppShell() {
  return (
    <Routes>
      {/* Public Pages Layout (with footer) */}
      <Route element={<AppLayout showFooter={true} />}>
        <Route path="/"           element={<Landing />} />
        <Route path="/market"     element={<Market />} />
        <Route path="/ranking"    element={<Ranking />} />
        <Route path="/compare"    element={<Compare />} />
        <Route path="/map"        element={<MapPage />} />
        <Route path="/carbon"     element={<Carbon />} />
        <Route path="/literasi"   element={<Literacy />} />
        <Route path="/metodologi" element={<Methodology />} />
      </Route>

      {/* Oversight Panel Layout (without footer) */}
      <Route element={<AppLayout showFooter={false} />}>
        <Route path="/ojk"        element={<OjkPanel />} />
      </Route>
    </Routes>
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
