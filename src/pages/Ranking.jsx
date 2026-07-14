import { useState, useMemo } from 'react';
import { Eye } from 'lucide-react';
import { companies, zoneOf, zName, sColor } from '../data/companies';
import { useApp } from '../context/AppContext';
import { ZonePill } from '../components/ui/Badges';
import CompanyDetailModal from '../components/feedback/CompanyDetailModal';

const sectors = [...new Set(companies.map(d => d.sec))].sort();

export default function Ranking() {
  const [curZone, setCurZone] = useState('all');
  const [curSec,  setCurSec]  = useState('all');
  const [sortKey, setSortKey] = useState('score');
  const [sortDir, setSortDir] = useState(-1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filtered = useMemo(() => {
    let a = [...companies];
    if (curZone !== 'all') a = a.filter(d => zoneOf(d.score) === curZone);
    if (curSec  !== 'all') a = a.filter(d => d.sec === curSec);
    const q = searchQuery.trim().toLowerCase();
    if (q) a = a.filter(d => d.tk.toLowerCase().includes(q) || d.nm.toLowerCase().includes(q));
    a.sort((x, y) => {
      const vx = sortKey === 'name' ? x.nm : x[sortKey];
      const vy = sortKey === 'name' ? y.nm : y[sortKey];
      return typeof vx === 'string' ? sortDir * vx.localeCompare(vy) : sortDir * (vx - vy);
    });
    return a;
  }, [curZone, curSec, searchQuery, sortKey, sortDir]);

  const handleSort = (key) => {
    if (sortKey === key) setSortDir(d => -d);
    else { setSortKey(key); setSortDir(key === 'name' ? 1 : -1); }
  };

  const handleOpenDetail = (company) => {
    setSelectedCompany(company);
    setIsModalOpen(true);
  };

  const zoneButtons = [
    { z: 'all', label: 'Semua', cls: '' },
    { z: 'g',   label: 'Hijau 75–100', cls: ' g' },
    { z: 'y',   label: 'Kuning 50–74', cls: ' y' },
    { z: 'r',   label: 'Merah 0–49',   cls: ' r' },
  ];

  const Th = ({ col, label, num }) => (
    <th
      className={`${num ? 'num ' : ''}${sortKey === col ? 'sorted' : ''}`}
      onClick={() => handleSort(col)}
    >
      {label} <span className="ar">▲▼</span>
    </th>
  );

  return (
    <div className="view">
      <div className="toolbar">
        {zoneButtons.map(({ z, label, cls }) => (
          <button
            key={z}
            className={`chip${curZone === z ? ' on' + cls : ''}`}
            onClick={() => setCurZone(z)}
          >
            {label}
          </button>
        ))}

        <select className="sel" value={curSec} onChange={e => setCurSec(e.target.value)}>
          <option value="all">Semua sektor</option>
          {sectors.map(s => <option key={s} value={s}>{s}</option>)}
        </select>

        <div className="searchbar" style={{ flex: '0 0 220px' }}>
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
            <circle cx="7" cy="7" r="4.5"/><path d="M11 11l3 3"/>
          </svg>
          <input
            placeholder="Cari emiten…"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            aria-label="Cari emiten"
          />
        </div>

        <div className="rt">{filtered.length} emiten</div>
      </div>

      <div className="card p0">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th style={{ width: 36 }}>#</th>
                <Th col="name"  label="Emiten" />
                <th className="hide">Sektor</th>
                <Th col="score" label="Skor Kredibilitas" />
                <th>Zona</th>
                <th className="num hide">Gap Finansial <span className="ar">▲▼</span></th>
                <th className="num hide">Gap Dampak <span className="ar">▲▼</span></th>
                <Th col="trend" label="Tren" num />
                <th style={{ width: 130, textAlign: 'center' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((d, i) => {
                const tc = d.trend > 0 ? 'up' : d.trend < 0 ? 'dn' : 'fl';
                const ts = d.trend > 0 ? '▲' : d.trend < 0 ? '▼' : '—';
                return (
                  <tr key={d.tk} className="ranking-row">
                    <td className="mono" style={{ color: 'var(--faint)' }}>{String(i + 1).padStart(2, '0')}</td>
                    <td>
                      <div className="emi">
                        <div className="logo-sq" style={{ background: d.col }}>{d.ini}</div>
                        <div>
                          <div className="tk">{d.tk}</div>
                          <div className="nm">{d.nm}</div>
                        </div>
                      </div>
                    </td>
                    <td className="hide"><span className="sect">{d.sec}</span></td>
                    <td>
                      <div className="scorec">
                        <span className="v" style={{ color: sColor(d.score) }}>{d.score}</span>
                        <span className="tk"><i style={{ width: `${d.score}%`, background: sColor(d.score) }}/></span>
                      </div>
                    </td>
                    <td><ZonePill score={d.score}/></td>
                    <td className="num hide">{d.fin}</td>
                    <td className="num hide">{d.imp}</td>
                    <td className="num"><span className={`tr ${tc}`}>{ts} {Math.abs(d.trend)}</span></td>
                    <td style={{ textAlign: 'center' }}>
                      <button 
                        className="btn-action-detail"
                        onClick={() => handleOpenDetail(d)}
                        aria-label={`Lihat detail ${d.nm}`}
                      >
                        <Eye size={13} />
                        <span>View</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <p className="disc">
        Skor dari <b>Kesenjangan Kredibilitas</b> dua-sumbu, dibobot menurut 8 Prinsip Keuangan Berkelanjutan POJK 51/2017,
        diuji terhadap bukti eksternal yang di-<i>hash</i> pada <i>ledger</i>. Data ilustratif.
      </p>

      {/* Center Detail Modal */}
      <CompanyDetailModal 
        company={selectedCompany} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}
