import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import TopNav from './TopNav';
import Footer from './Footer';
import Drawer from '../feedback/Drawer';
import Modal from '../feedback/Modal';
import Toast from '../feedback/Toast';

export default function AppLayout({ showFooter = true }) {
  return (
    <div className="app-v3">
      <TopNav />

      <main className="main-content">
        <Suspense fallback={<div className="loading-screen">Memuat…</div>}>
          <Outlet />
        </Suspense>
      </main>

      {showFooter && <Footer />}

      <Drawer />
      <Modal />
      <Toast />
    </div>
  );
}
