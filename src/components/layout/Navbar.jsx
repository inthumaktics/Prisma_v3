import { useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

const pageMeta = {
  '/':           ['Beranda',                   'Lembaga Verifikasi Kredibilitas ESG Independen'],
  '/dashboard':  ['Ringkasan Pasar',            'Potret kredibilitas pengungkapan ESG emiten BEI'],
  '/ranking':    ['Peringkat Kredibilitas',      'Pasar diperingkat menurut kejujuran klaim'],
  '/compare':    ['Bandingkan Emiten',           'Sandingkan kredibilitas dua emiten'],
  '/map':        ['Peta Emisi',                  'Bukti emisi fasilitas dari citra satelit'],
  '/carbon':     ['Kredit Karbon',               'Registri terverifikasi & pencegahan perhitungan ganda'],
  '/ojk':        ['Panel Pengawasan OJK',        'Antrean prioritas pemeriksaan berbasis risiko'],
  '/literasi':   ['Ruang Literasi',              'Pahami ESG & kredibilitas untuk semua'],
  '/metodologi': ['Metodologi & Bukti',          'Cara penghitungan & mekanisme keberatan'],
};

export default function Navbar({ onMenuToggle, searchQuery, onSearchChange }) {
  const { pathname } = useLocation();
  const [title, subtitle] = pageMeta[pathname] || ['PRISMA', ''];

  return (
    <div className="top">
      <button className="menu-btn iconbtn" onClick={onMenuToggle} aria-label="Buka menu">
        <svg width="18" height="18" viewBox="0 0 18 18" stroke="currentColor" strokeWidth="1.7" fill="none">
          <path d="M3 5h12M3 9h12M3 13h12"/>
        </svg>
      </button>

      <div className="ttl">
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>

      <div className="sp" />

      <div className="searchbar">
        <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
          <circle cx="7" cy="7" r="4.5"/>
          <path d="M11 11l3 3"/>
        </svg>
        <input
          id="q"
          placeholder="Cari emiten…"
          value={searchQuery}
          onChange={e => onSearchChange(e.target.value)}
          aria-label="Cari emiten"
        />
      </div>

      <button className="iconbtn" aria-label="Notifikasi">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M9 2a4 4 0 014 4c0 4 2 5 2 5H3s2-1 2-5a4 4 0 014-4zM7.5 15a1.5 1.5 0 003 0"/>
        </svg>
      </button>

      <div className="user">
        <div className="av">AJ</div>
        <div>
          <div className="un">Analis OJK</div>
          <div className="ur">Pengawasan</div>
        </div>
      </div>
    </div>
  );
}
