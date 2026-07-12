import { NavLink } from 'react-router-dom';

const PrismaLogo = () => (
  <svg width="32" height="32" viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="24" r="23" fill="#0E4443"/>
    <path d="M24 11 L36 33 H12 Z" fill="none" stroke="#C8E0CA" strokeWidth="1.6"/>
    <path d="M18 11 L24 11" stroke="#F7B318" strokeWidth="2" strokeLinecap="round"/>
    <path d="M12 33 L18 24" stroke="#F7B318" strokeWidth="1.6" opacity=".85"/>
    <circle cx="16.5" cy="35.5" r="1.7" fill="#D9564C"/>
    <circle cx="24" cy="35.5" r="1.7" fill="#F7B318"/>
    <circle cx="31.5" cy="35.5" r="1.7" fill="#2F9E6B"/>
  </svg>
);

const footerLinks = [
  { heading: 'Platform', links: [
    { to: '/dashboard',  label: 'Ringkasan Pasar' },
    { to: '/ranking',    label: 'Peringkat Kredibilitas' },
    { to: '/compare',    label: 'Bandingkan Emiten' },
    { to: '/map',        label: 'Peta Emisi' },
  ]},
  { heading: 'Pengawasan', links: [
    { to: '/carbon',     label: 'Kredit Karbon' },
    { to: '/ojk',        label: 'Panel OJK' },
  ]},
  { heading: 'Edukasi', links: [
    { to: '/literasi',   label: 'Ruang Literasi' },
    { to: '/metodologi', label: 'Metodologi' },
  ]},
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="footer-brand-logo">
            <PrismaLogo />
            <div>
              <div className="footer-brand-name">PRISMA</div>
              <div className="footer-brand-tag">Kejujuran yang Terverifikasi</div>
            </div>
          </div>
          <p className="footer-desc">
            Lembaga verifikasi kredibilitas ESG independen untuk pasar modal Indonesia.
            Diposisikan seperti lembaga pemeringkat efek — namun yang dinilai adalah kejujuran klaim keberlanjutan.
          </p>
          <div className="footer-badges">
            <span className="footer-badge">Berizin OJK</span>
            <span className="footer-badge">Terintegrasi IDX/BEI</span>
            <span className="footer-badge">Blockchain-verified</span>
          </div>
        </div>

        <div className="footer-links">
          {footerLinks.map(({ heading, links }) => (
            <div key={heading} className="footer-col">
              <div className="footer-col-heading">{heading}</div>
              {links.map(({ to, label }) => (
                <NavLink key={to} to={to} className="footer-link">{label}</NavLink>
              ))}
            </div>
          ))}

          <div className="footer-col">
            <div className="footer-col-heading">Kontak</div>
            <a href="mailto:halo@prisma.id" className="footer-link">halo@prisma.id</a>
            <a href="tel:+622150088880" className="footer-link">+62 21 500 8888</a>
            <div className="footer-link" style={{ cursor: 'default' }}>Kawasan BEI, Jakarta</div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <span>© 2026 PRISMA. Prototipe konsep untuk esai ilmiah. Data emiten bersifat ilustratif.</span>
          <div className="footer-socials">
            {[
              <path d="M6 13V8H4V6h2V4.5C6 2.8 7 2 8.6 2c.7 0 1.4.1 1.4.1V4H9c-.8 0-1 .5-1 1v1h2l-.3 2H8v5z"/>,
              <path d="M13 4.3c-.4.2-.8.3-1.2.4.4-.3.8-.7.9-1.2-.4.3-.9.4-1.4.6A2.2 2.2 0 008.5 5c0 .2 0 .4.1.5-1.8-.1-3.5-1-4.6-2.4-.2.3-.3.7-.3 1.1 0 .8.4 1.4 1 1.8-.4 0-.7-.1-1-.3 0 1.1.8 2 1.8 2.2-.2.1-.4.1-.6.1h-.4c.3.9 1.1 1.5 2 1.5A4.4 4.4 0 013 11.5c1 .6 2.1 1 3.3 1 4 0 6.1-3.3 6.1-6.1v-.3c.4-.3.8-.7 1.1-1.1z"/>,
              <path d="M4 6h2v7H4zM5 3a1.2 1.2 0 100 2.4A1.2 1.2 0 005 3zM8 6h2v1c.3-.6 1.1-1.1 2-1.1 2 0 2.5 1.2 2.5 3V13h-2V9.3c0-.9-.3-1.5-1.1-1.5-.6 0-1 .4-1.2.9-.1.2-.1.4-.1.6V13H8z"/>,
            ].map((icon, i) => (
              <a key={i} href="#" onClick={e => e.preventDefault()} className="footer-social-btn" aria-label="Social link">
                <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor">{icon}</svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
