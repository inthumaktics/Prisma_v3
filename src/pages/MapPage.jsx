import { companies, zoneOf, zClr } from '../data/companies';
import { useApp } from '../context/AppContext';

const islands = [
  "M110 210 Q150 150 210 180 Q260 210 230 260 Q190 300 140 270 Q95 250 110 210Z",
  "M380 250 Q470 220 560 250 Q620 270 560 300 Q470 320 400 300 Q360 285 380 250Z",
  "M470 150 Q560 120 640 165 Q690 200 620 240 Q540 260 490 220 Q450 190 470 150Z",
  "M630 180 Q680 150 720 200 Q740 240 700 270 Q660 250 640 220 Q620 200 630 180Z",
  "M760 180 Q840 160 860 220 Q870 270 810 280 Q760 260 750 220 Q745 195 760 180Z",
];

const sorted = [...companies].sort((a, b) => b.em - a.em);

export default function MapPage() {
  const { openDrawer } = useApp();

  return (
    <div className="view">
      <div className="grid" style={{ gridTemplateColumns: '1.6fr 1fr', gap: 18 }}>
        <div className="card">
          <div className="chead">
            <div>
              <h3>Peta Emisi Fasilitas</h3>
              <div className="cap">Titik emisi terpantau satelit — sumber: Climate TRACE (ilustratif)</div>
            </div>
            <div style={{ display: 'flex', gap: 12, fontSize: 11, color: 'var(--muted)' }}>
              {[['var(--green)', 'Kredibel'], ['var(--amber)', 'Perhatian'], ['var(--red)', 'Divergen']].map(([bg, lbl]) => (
                <span key={lbl}>
                  <span style={{ display: 'inline-block', width: 9, height: 9, borderRadius: '50%', background: bg, marginRight: 5 }}/>
                  {lbl}
                </span>
              ))}
            </div>
          </div>
          <div className="mapwrap">
            <svg viewBox="0 0 900 420" style={{ width: '100%', display: 'block' }}>
              {islands.map((d, i) => (
                <path key={i} d={d} fill="#C8E0CA" stroke="#A9CDAE" strokeWidth="1.5"/>
              ))}
              {companies.map(d => {
                const z = zoneOf(d.score);
                const r = 6 + d.em * 3.2;
                return (
                  <circle
                    key={d.tk}
                    className="mapdot"
                    cx={d.mx} cy={d.my} r={r}
                    fill={zClr[z]} fillOpacity=".82"
                    stroke="#fff" strokeWidth="1.4"
                    onClick={() => openDrawer(d)}
                  >
                    <title>{d.tk} — {d.nm}</title>
                  </circle>
                );
              })}
            </svg>
          </div>
        </div>

        <div className="card">
          <div className="chead">
            <div>
              <h3>Fasilitas Terpantau</h3>
              <div className="cap">Diurutkan menurut estimasi emisi</div>
            </div>
          </div>
          <div className="maplist">
            {sorted.map(d => {
              const z = zoneOf(d.score);
              return (
                <div className="m" key={d.tk} onClick={() => openDrawer(d)}>
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: zClr[z], flex: 'none' }}/>
                  <div className="info">
                    <div className="em">{d.tk} · {d.sec}</div>
                    <div className="ee">{d.nm}</div>
                  </div>
                  <div className="val" style={{ color: zClr[z] }}>{d.em.toFixed(1)} Mt</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <p className="disc">
        Ukuran titik mencerminkan estimasi emisi; warna mencerminkan zona kredibilitas emiten.
        Divergensi antara emisi tercitra dan yang dilaporkan menaikkan <b>gap dampak</b>. Posisi geografis bersifat ilustratif.
      </p>
    </div>
  );
}
