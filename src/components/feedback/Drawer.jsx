import { useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { zoneOf, zName, sColor } from '../../data/companies';

export default function Drawer() {
  const { drawerCompany: d, closeDrawer } = useApp();
  const isOpen = !!d;

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') closeDrawer(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [closeDrawer]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!d) return (
    <>
      <div className="scrim" id="scrim" />
      <aside className="drawer" id="drawer" />
    </>
  );

  const z = zoneOf(d.score);
  const c = sColor(d.score);
  const W = 460, H = 54;
  const mn = Math.min(...d.hist) - 3;
  const mx = Math.max(...d.hist) + 3;
  const sp = d.hist.map((v, i) =>
    `${(i / (d.hist.length - 1)) * W},${H - ((v - mn) / (mx - mn)) * H}`
  ).join(' ');

  const claimStatus = { ok: ['Terverifikasi', 'ok'], div: ['Divergen', 'div'], ret: ['Retoris', 'ret'] };
  const gc = v => v < 20 ? 'var(--green)' : v < 35 ? 'var(--amber)' : 'var(--red)';

  return (
    <>
      <div className={`scrim${isOpen ? ' on' : ''}`} onClick={closeDrawer} />
      <aside className={`drawer${isOpen ? ' on' : ''}`} aria-label="Detail emiten" role="dialog">
        {/* Header */}
        <div className="dh">
          <button className="close" onClick={closeDrawer} aria-label="Tutup">
            <svg width="15" height="15" viewBox="0 0 14 14" stroke="currentColor" strokeWidth="1.8" fill="none">
              <path d="M2 2l10 10M12 2L2 12"/>
            </svg>
          </button>
          <div className="row1">
            <div className="logo-sq" style={{ background: d.col, width: 44, height: 44, borderRadius: 12, fontSize: 15 }}>{d.ini}</div>
            <div>
              <div className="tk">{d.tk}</div>
              <h2>{d.nm}</h2>
              <div className="meta">{d.sec} · Tercatat di BEI</div>
            </div>
          </div>
        </div>

        <div className="db">
          {/* ESG Score */}
          <div className="dsec">
            <div className="st">ESG Credibility Score</div>
            <div className="scorecard">
              <div className="top">
                <div className="sv" style={{ color: c }}>{d.score}<small>/100</small></div>
                <span className={`zone ${z}`}><span className="d" />{`Zona ${zName[z]}`}</span>
              </div>
              <div className="gsc">
                <div className="spectrum" />
                <div className="mk" style={{ left: `${d.score}%` }} />
                <div className="tk2"><span>0</span><span>50</span><span>75</span><span>100</span></div>
              </div>
            </div>
          </div>

          {/* Credibility Gaps */}
          <div className="dsec">
            <div className="st">Kesenjangan Kredibilitas — Double Materiality</div>
            <div className="gap">
              <div className="gl">
                <b>Gap Materialitas Finansial <span className="ax">· outside-in</span></b>
                <span className="gv">{d.fin} ±{d.conf}</span>
              </div>
              <div className="gt">
                <i style={{ width: `${d.fin}%`, background: gc(d.fin) }} />
                <span className="ci" style={{ left: `${Math.max(0, d.fin - d.conf)}%`, width: `${d.conf * 2}%` }} />
              </div>
              <div className="hint">Klaim risiko/peluang finansial vs realitas — diuji thd sinyal pasar & kepatuhan IDX/OJK.</div>
            </div>
            <div className="gap">
              <div className="gl">
                <b>Gap Materialitas Dampak <span className="ax">· inside-out</span></b>
                <span className="gv">{d.imp} ±{d.conf}</span>
              </div>
              <div className="gt">
                <i style={{ width: `${d.imp}%`, background: gc(d.imp) }} />
                <span className="ci" style={{ left: `${Math.max(0, d.imp - d.conf)}%`, width: `${d.conf * 2}%` }} />
              </div>
              <div className="hint">Klaim dampak lingkungan/sosial vs realitas — diuji thd satelit Climate TRACE & sanksi KLHK.</div>
            </div>
          </div>

          {/* Evidence Sources */}
          <div className="dsec">
            <div className="st">Sumber Bukti Eksternal</div>
            <div className="evg">
              {[
                ['Climate TRACE', 'Emisi satelit resolusi fasilitas, independen.', <><circle cx="8" cy="8" r="2"/><path d="M8 1v2M8 13v2M1 8h2M13 8h2"/></>],
                ['Sanksi KLHK', 'Rekam jejak sanksi lingkungan resmi.', <path d="M8 1.5l5 2v4c0 3-2 5.5-5 6.5-3-1-5-3.5-5-6.5v-4z"/>],
                ['Sinyal IDX/OJK', 'Data pasar & status kepatuhan.', <path d="M2 13V9M6 13V4M10 13V7M14 13v-3"/>],
                ['Teks Laporan', 'Klaim diklasifikasi FinBERT-ESG + A3CG.', <path d="M8 1v14M3 4l5-3 5 3"/>],
              ].map(([name, desc, icon]) => (
                <div className="ev" key={name}>
                  <div className="en">
                    <span className="ic">
                      <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="#145858" strokeWidth="1.5">{icon}</svg>
                    </span>
                    {name}
                  </div>
                  <div className="ed">{desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Claims Verification */}
          <div className="dsec">
            <div className="st">Verifikasi Klaim Utama</div>
            {d.claims.map(([text, st], i) => (
              <div className="claim" key={i}>
                <div className="ct">{text}</div>
                <span className={`cst ${claimStatus[st][1]}`}>{claimStatus[st][0]}</span>
              </div>
            ))}
          </div>

          {/* Score History Sparkline */}
          <div className="dsec">
            <div className="st">Riwayat Skor</div>
            <div className="sparkc">
              <svg width="100%" height="54" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
                <polyline points={sp} fill="none" stroke={c} strokeWidth="2.6" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          {/* Blockchain Provenance */}
          <div className="dsec">
            <div className="st">Jejak Blockchain (Provenance)</div>
            <div className="ledger">
              <div className="r"><span className="k">Ledger</span><span className="v">PRISMA Consortium</span></div>
              <div className="r"><span className="k">Hash</span><span className="v">{d.hash}</span></div>
              <div className="r"><span className="k">Timestamp</span><span className="v">{d.ts}</span></div>
              <div className="r"><span className="k">Status</span><span className="v">Immutable · audit real-time OJK</span></div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
