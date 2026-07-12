import { companies, zoneOf, zName, zClr } from '../data/companies';
import { useApp } from '../context/AppContext';

const redZone = [...companies]
  .filter(d => zoneOf(d.score) === 'r')
  .sort((a, b) => a.score - b.score);

export default function OjkPanel() {
  const { openDrawer } = useApp();

  return (
    <div className="view">
      <div className="card" style={{ marginBottom: 18, display: 'flex', gap: 16, alignItems: 'center' }}>
        <div style={{ width: 46, height: 46, borderRadius: 14, background: 'var(--red-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="#b23d34" strokeWidth="1.7">
            <path d="M11 3l7 3v5c0 4.2-3 7.8-7 9-4-1.2-7-4.8-7-9V6z"/>
            <path d="M11 8v4M11 14.5v.5"/>
          </svg>
        </div>
        <div>
          <h3 style={{ fontSize: 15.5 }}>Antrean Prioritas Pemeriksaan — Pengawasan Berbasis Risiko</h3>
          <p className="cap" style={{ marginTop: 4 }}>
            Emiten zona merah mengalir otomatis ke daftar prioritas OJK (POJK 12/2025), diurutkan menurut risiko divergensi.
          </p>
        </div>
      </div>

      <div id="flags">
        {redZone.map((d, i) => {
          const worst = d.claims.find(c => c[1] === 'div');
          return (
            <div className="flag" key={d.tk} onClick={() => openDrawer(d)}>
              <div className="pr">PRIORITAS<br />#{i + 1}</div>
              <div className="logo-sq" style={{ background: d.col }}>{d.ini}</div>
              <div className="bd">
                <div className="t">
                  <span className="mono" style={{ fontWeight: 700 }}>{d.tk}</span>
                  <span className="sect">{d.sec}</span>
                  <span className="zone r" style={{ fontSize: 11 }}>
                    <span className="d"/>Gap dampak {d.imp}
                  </span>
                </div>
                <div className="rs">{worst ? worst[0] : 'Divergensi signifikan klaim vs bukti.'}</div>
              </div>
              <div className="sc">{d.score}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
