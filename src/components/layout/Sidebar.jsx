import { NavLink } from 'react-router-dom';

const PrismaLogo = () => (
  <svg className="mk" viewBox="0 0 48 48" fill="none">
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
  { group: 'Utama', items: [
    { to: '/',          label: 'Beranda',            icon: <path d="M2.5 8L9 2.5 15.5 8M4 7v8h10V7"/> },
  ]},
  { group: 'Pasar', items: [
    { to: '/dashboard', label: 'Ringkasan Pasar',    icon: <path d="M3 15V8M9 15V3M15 15v-5"/> },
    { to: '/ranking',   label: 'Peringkat Kredibilitas', icon: <path d="M3 4h12M3 9h9M3 14h6"/> },
    { to: '/compare',   label: 'Bandingkan Emiten',  icon: <path d="M9 2v14M5 6L2 9l3 3M13 6l3 3-3 3"/> },
  ]},
  { group: 'Bukti & Pengawasan', items: [
    { to: '/map',       label: 'Peta Emisi',         icon: <><path d="M9 16s6-5.2 6-9.5A6 6 0 003 6.5C3 10.8 9 16 9 16z"/><circle cx="9" cy="6.5" r="2"/></> },
    { to: '/carbon',    label: 'Kredit Karbon',      icon: <path d="M9 2C6 6 12 8 9 12M9 2C12 6 6 8 9 12M9 12v4"/> },
    { to: '/ojk',       label: 'Panel OJK',          icon: <path d="M9 2l5.5 2.2v4c0 3.4-2.3 6.3-5.5 7.4C5.8 14.5 3.5 11.6 3.5 8.2v-4z"/> },
  ]},
  { group: 'Edukasi', items: [
    { to: '/literasi',  label: 'Ruang Literasi',     icon: <path d="M9 4C7 2.5 4 2.5 2.5 3.5v10C4 12.5 7 12.5 9 14M9 4c2-1.5 5-1.5 6.5-.5v10C14 12.5 11 12.5 9 14M9 4v10"/> },
    { to: '/metodologi',label: 'Metodologi',         icon: <><circle cx="9" cy="9" r="6.5"/><path d="M9 6v.01M9 8.5v3.5"/></> },
  ]},
];

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {isOpen && <div className="scrim on" onClick={onClose} style={{ zIndex: 49 }} />}
      <aside className={`side${isOpen ? ' open' : ''}`} id="side">
        <div className="brand">
          <PrismaLogo />
          <div>
            <div className="nm">PRISMA</div>
            <div className="sl">Kejujuran yang Terverifikasi</div>
          </div>
        </div>

        {navItems.map(({ group, items }) => (
          <div key={group}>
            <div className="navlab">{group}</div>
            <nav className="nav">
              {items.map(({ to, label, icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) => isActive ? 'on' : ''}
                  onClick={onClose}
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6">
                    {icon}
                  </svg>
                  {label}
                </NavLink>
              ))}
            </nav>
          </div>
        ))}

        <div className="foot">
          Prototipe konsep · Berizin OJK · Terintegrasi IDX/BEI<br />
          Data emiten bersifat ilustratif.
        </div>
      </aside>
    </>
  );
}
