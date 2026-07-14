import { useState } from 'react';
import { companies, zoneOf, zName, sColor, zClr } from '../data/companies';
import { ZonePill } from '../components/ui/Badges';

function bar(label, va, vb, max, inv) {
  const ca = inv ? (va < 20 ? zClr.g : va < 35 ? zClr.y : zClr.r) : sColor(va);
  const cb = inv ? (vb < 20 ? zClr.g : vb < 35 ? zClr.y : zClr.r) : sColor(vb);
  return (
    <div key={label} style={{ display: 'grid', gridTemplateColumns: '1fr 130px 1fr', gap: 12, alignItems: 'center', margin: '13px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'flex-end' }}>
        <span className="mono" style={{ fontSize: 12 }}>{va}</span>
        <span style={{ flex: 1, maxWidth: 150, height: 9, borderRadius: 99, background: 'var(--ring)', overflow: 'hidden', transform: 'scaleX(-1)' }}>
          <i style={{ display: 'block', height: '100%', width: `${va / max * 100}%`, background: ca }} />
        </span>
      </div>
      <div style={{ textAlign: 'center', fontSize: 11.5, color: 'var(--muted)', fontWeight: 700 }}>{label}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ flex: 1, maxWidth: 150, height: 9, borderRadius: 99, background: 'var(--ring)', overflow: 'hidden', display: 'block' }}>
          <i style={{ display: 'block', height: '100%', width: `${vb / max * 100}%`, background: cb }} />
        </span>
        <span className="mono" style={{ fontSize: 12 }}>{vb}</span>
      </div>
    </div>
  );
}

export default function Compare() {
  const [tkA, setTkA] = useState(companies[0]?.tk || '');
  const [tkB, setTkB] = useState(companies[1]?.tk || '');

  const a = companies.find(d => d.tk === tkA) || companies[0];
  const b = companies.find(d => d.tk === tkB) || companies[1];

  const Head = ({ d }) => {
    const z = zoneOf(d.score);
    return (
      <div className="cmp-card">
        <div className="logo-sq" style={{ background: d.col, width: 48, height: 48, borderRadius: 14, fontSize: 16, margin: '0 auto 10px' }}>{d.ini}</div>
        <div className="mono" style={{ fontWeight: 700 }}>{d.tk}</div>
        <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 8 }}>{d.nm}</div>
        <div className="big" style={{ color: sColor(d.score) }}>{d.score}</div>
        <div style={{ marginTop: 8 }}><ZonePill score={d.score}/></div>
        <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 8 }}>{d.sec}</div>
      </div>
    );
  };

  return (
    <div className="view">
      <div className="cmp-top">
        <div className="cmp-sel">
          <div style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 700 }}>EMITEN A</div>
          <select value={tkA} onChange={e => setTkA(e.target.value)}>
            {companies.map(d => <option key={d.tk} value={d.tk}>{d.tk} — {d.nm}</option>)}
          </select>
        </div>
        <div className="vs">VS</div>
        <div className="cmp-sel">
          <div style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 700 }}>EMITEN B</div>
          <select value={tkB} onChange={e => setTkB(e.target.value)}>
            {companies.map(d => <option key={d.tk} value={d.tk}>{d.tk} — {d.nm}</option>)}
          </select>
        </div>
      </div>

      <div className="card">
        <div className="cmp-body" style={{ marginBottom: 18 }}>
          <Head d={a} />
          <Head d={b} />
        </div>
        <div style={{ borderTop: '1px solid var(--line)', paddingTop: 16 }}>
          {bar('Skor Kredibilitas', a.score, b.score, 100, false)}
          {bar('Gap Finansial',     a.fin,   b.fin,   70,  true)}
          {bar('Gap Dampak',        a.imp,   b.imp,   70,  true)}
          {bar('Ketidakpastian ±',  a.conf,  b.conf,  20,  true)}
        </div>
        <div className="note" style={{ marginTop: 16 }}>
          Skor lebih tinggi &amp; gap lebih kecil menandakan klaim lebih kredibel. Untuk gap dampak, hijau berarti klaim dampak selaras dengan bukti satelit &amp; sanksi.
        </div>
      </div>

      <p className="disc">
        Perbandingan berdampingan membantu investor memilih di antara emiten sejenis berdasarkan <b>kredibilitas</b>, bukan sekadar kinerja yang diklaim.
      </p>
    </div>
  );
}
