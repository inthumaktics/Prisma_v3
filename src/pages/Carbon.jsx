import { carbonCredits } from '../data/carbon';
import { CstTag } from '../components/ui/Badges';

const tot = carbonCredits.reduce((a, c) => a + c.volume, 0);
const ok  = carbonCredits.filter(c => c.status === 'ok').reduce((a, c) => a + c.volume, 0);
const dup = carbonCredits.filter(c => c.status !== 'ok').length;

const kpis = [
  { label: 'Volume tercatat', value: `${(tot / 1000).toFixed(0)}`, unit: 'k tCO₂e', delta: 'kumulatif 2025–2026', cls: 'up', iconStroke: '#145858', iconBg: 'var(--sage-soft)',
    icon: <path d="M11 3C8 7 14 9 11 13M11 3C14 7 8 9 11 13M11 13v5"/> },
  { label: 'Nilai transaksi', value: 'Rp 91,9', unit: 'M', delta: 'per Feb 2026', cls: 'up', iconStroke: '#a8790d', iconBg: 'var(--gold-soft)',
    icon: <path d="M11 2v18M6 6h8M6 16h8"/> },
  { label: 'Terverifikasi', value: `${Math.round(ok / tot * 100)}`, unit: '%', delta: 'integritas terjaga', cls: 'up', iconStroke: '#2f9e6b', iconBg: 'var(--sage-soft)',
    icon: <path d="M4 11l4 4 10-10"/>, valueColor: '#1c7a51' },
  { label: 'Ditandai bermasalah', value: `${dup}`, unit: '', delta: 'ganda / kualitas rendah', cls: 'dn', iconStroke: '#b23d34', iconBg: 'var(--red-soft)',
    icon: <><circle cx="11" cy="11" r="8"/><path d="M11 7v5M11 15v.5"/></>, valueColor: 'var(--red)' },
];

export default function Carbon() {
  return (
    <div className="view">
      <div className="grid g4" style={{ marginBottom: 18 }}>
        {kpis.map(({ label, value, unit, delta, cls, iconStroke, iconBg, icon, valueColor }) => (
          <div className="card kpi" key={label}>
            <div className="ico" style={{ background: iconBg }}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke={iconStroke} strokeWidth="1.7">{icon}</svg>
            </div>
            <div>
              <div className="lbl">{label}</div>
              <div className="big" style={valueColor ? { color: valueColor } : {}}>
                {value}<small>{unit}</small>
              </div>
              <div className={`delta ${cls}`}>{delta}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="card p0">
        <div style={{ padding: '18px 20px', borderBottom: '1px solid var(--line)' }}>
          <h3 style={{ fontSize: 15, fontWeight: 800 }}>Registri Kredit Karbon Terverifikasi — IDXCarbon</h3>
          <div className="cap" style={{ marginTop: 3 }}>
            Setiap unit di-<i>hash</i> pada <i>ledger</i>; duplikasi otomatis ditandai (pendekatan <i>nesting</i>, Perpres 110/2025).
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Proyek</th>
              <th className="hide">Jenis</th>
              <th className="num">Volume (tCO₂e)</th>
              <th className="num hide">Harga</th>
              <th>Status</th>
              <th className="hide">Hash</th>
            </tr>
          </thead>
          <tbody>
            {carbonCredits.map((c, i) => {
              const h = '0x' + Array.from({ length: 8 }, (_, j) => '0123456789abcdef'[(i * 7 + 3) % 16]).join('');
              return (
                <tr key={c.project}>
                  <td style={{ fontWeight: 600 }}>{c.project}</td>
                  <td className="hide"><span className="sect">{c.type}</span></td>
                  <td className="num">{c.volume.toLocaleString('id-ID')}</td>
                  <td className="num hide">{c.price}</td>
                  <td><CstTag status={c.status}/></td>
                  <td className="hide mono" style={{ fontSize: 11, color: 'var(--faint)' }}>{h}…</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="note" style={{ marginTop: 16 }}>
        <b>Mengapa penting.</b> Semakin besar pasar karbon yang dibangun di atas data emisi yang dilaporkan sendiri, semakin tinggi risiko sistemik bila data tak kredibel. Blockchain PRISMA mencegah satu kredit dihitung dua kali di dua sistem berbeda.
      </div>
    </div>
  );
}
