import { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Search, Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PrismaLogo = () => (
  <svg className="logo-mark" viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="24" r="23" fill="#0E4443"/>
    <path d="M24 11 L36 33 H12 Z" fill="none" stroke="#C8E0CA" strokeWidth="1.6"/>
    <path d="M18 11 L24 11" stroke="#F7B318" strokeWidth="2" strokeLinecap="round"/>
    <path d="M24 11 L30 20" stroke="#fff" strokeWidth="1.4" opacity=".5"/>
    <path d="M12 33 L18 24" stroke="#F7B318" strokeWidth="1.6" opacity=".85"/>
    <circle cx="16.5" cy="35.5" r="1.7" fill="#D9564C"/>
    <circle cx="24" cy="35.5" r="1.7" fill="#F7B318"/>
    <circle cx="31.5" cy="35.5" r="1.7" fill="#2F9E6B"/>
  </svg>
);

const navItems = [
  { to: '/', label: 'Beranda' },
  { to: '/dashboard', label: 'Market' },
  { to: '/ranking', label: 'Ranking' },
  { to: '/compare', label: 'Compare' },
  { to: '/map', label: 'Map' },
  { to: '/carbon', label: 'Carbon Credit' },
  { to: '/literasi', label: 'Edukasi' },
  { to: '/metodologi', label: 'About' },
];

const importantPaths = ['/', '/dashboard', '/ranking'];

export default function TopNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.nav 
        className={`topnav ${scrolled ? 'scrolled' : ''}`}
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="topnav-container">
          <NavLink to="/" className="topnav-brand">
            <PrismaLogo />
            <div className="topnav-brand-text">
              <div className="topnav-brand-name">PRISMA</div>
              <div className="topnav-brand-tagline">Kejujuran Terverifikasi</div>
            </div>
          </NavLink>

          <div className="topnav-links">
            {navItems.map(({ to, label }) => {
              const isActive = pathname === to || (to !== '/' && pathname.startsWith(to));
              const isImportant = importantPaths.includes(to);
              return (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) => `topnav-link ${isActive ? 'active' : ''} ${isImportant ? 'nav-important' : ''}`}
                  style={{ position: 'relative' }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-indicator"
                      className="topnav-active-indicator"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="topnav-link-text">{label}</span>
                </NavLink>
              );
            })}
          </div>

          <div className="topnav-actions">
            <motion.button 
              className="topnav-icon-btn" 
              aria-label="Search"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
            >
              <Search size={18} />
            </motion.button>
            <motion.button 
              className="topnav-icon-btn" 
              aria-label="Notifications"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
            >
              <Bell size={18} />
            </motion.button>
            <motion.button 
              className="topnav-ojk-btn" 
              onClick={() => navigate('/ojk')}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Panel OJK
            </motion.button>
          </div>

          <motion.button 
            className="topnav-mobile-toggle" 
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="mobile-overlay"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%', opacity: 0.9 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0.9 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              className="mobile-drawer"
            >
              <div className="mobile-drawer-header">
                <span className="mobile-drawer-title">Navigasi</span>
                <button className="mobile-drawer-close" onClick={() => setMobileOpen(false)} aria-label="Close menu">
                  <X size={20} />
                </button>
              </div>
              <div className="mobile-drawer-links">
                {navItems.map(({ to, label }) => (
                  <NavLink
                    key={to}
                    to={to}
                    end={to === '/'}
                    className={({ isActive }) => `topnav-link ${isActive ? 'active' : ''}`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {label}
                  </NavLink>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
