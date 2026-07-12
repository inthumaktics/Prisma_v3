import { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Search, Bell } from 'lucide-react';

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
  { to: '/dashboard', label: 'Pasar' },
  { to: '/ranking', label: 'Peringkat' },
  { to: '/compare', label: 'Bandingkan Emiten' },
  { to: '/map', label: 'Peta Emisi' },
  { to: '/carbon', label: 'Kredit Karbon' },
  { to: '/literasi', label: 'Edukasi' },
  { to: '/metodologi', label: 'Tentang' },
];

export default function TopNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isHome = pathname === '/';

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
      <nav className={`topnav ${scrolled ? 'scrolled' : ''} ${isHome ? 'home' : ''}`}>
        <div className="topnav-container">
          <NavLink to="/" className="topnav-brand">
            <PrismaLogo />
            <div className="topnav-brand-text">
              <div className="topnav-brand-name">PRISMA</div>
              <div className="topnav-brand-tagline">Kejujuran Terverifikasi</div>
            </div>
          </NavLink>

          <div className={`topnav-links ${mobileOpen ? 'mobile-open' : ''}`}>
            {navItems.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) => `topnav-link ${isActive ? 'active' : ''}`}
              >
                {label}
              </NavLink>
            ))}
          </div>

          <div className="topnav-actions">
            <button className="topnav-icon-btn" aria-label="Search">
              <Search size={18} />
            </button>
            <button className="topnav-icon-btn" aria-label="Notifications">
              <Bell size={18} />
            </button>
            <button className="topnav-ojk-btn" onClick={() => navigate('/ojk')}>
              Panel OJK
            </button>
          </div>

          <button 
            className="topnav-mobile-toggle" 
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>
      {mobileOpen && <div className="mobile-overlay" onClick={() => setMobileOpen(false)} />}
    </>
  );
}
