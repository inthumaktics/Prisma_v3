import { DM_SUB } from '../constants/dmTopics';
import { DM_GHI, DM_GMID } from '../constants/dmThresholds';
import { dmF } from '../utils/dmMath';

export default function VerdictCard({ gapList, verdict, activeId, onSubTopicSelect }) {
  const getPillClass = v => (v >= DM_GHI ? 'r' : v >= DM_GMID ? 'y' : 'g');
  const getPillText = v => (v >= DM_GHI ? 'Divergen' : v >= DM_GMID ? 'Perlu tinjauan' : 'Selaras');
  const getGapColor = v => (v >= DM_GHI ? 'var(--red)' : v >= DM_GMID ? 'var(--amber)' : 'var(--green)');

  const topRows = (gapList || []).slice(0, 8);
  const maxGap = topRows[0] ? topRows[0].gap : 1;

  return (
    <div className="mat-card-dashboard mat-section-spacer">
      <h2 className="mat-card-title">Divergensi Terbesar</h2>
      <p className="mat-card-subtitle">Sub-topik dengan kesenjangan tertinggi antara klaim laporan emiten dan bukti eksternal terverifikasi.</p>

      <div className="card p0" style={{ background: 'var(--white)', overflow: 'hidden', border: '1px solid var(--line)', borderRadius: '16px', marginBottom: '24px' }}>
        <table className="mat-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--line)', background: '#FAFAFB' }}>
              <th style={{ width: '44px', padding: '12px 16px', color: 'var(--muted)', fontSize: '11px', fontWeight: '700' }}>#</th>
              <th style={{ padding: '12px 16px', color: 'var(--muted)', fontSize: '11px', fontWeight: '700' }}>Sub-topik</th>
              <th className="hide" style={{ padding: '12px 16px', color: 'var(--muted)', fontSize: '11px', fontWeight: '700' }}>Topik</th>
              <th className="num" style={{ textAlign: 'right', padding: '12px 16px', color: 'var(--muted)', fontSize: '11px', fontWeight: '700' }}>Klaim</th>
              <th className="num" style={{ textAlign: 'right', padding: '12px 16px', color: 'var(--muted)', fontSize: '11px', fontWeight: '700' }}>Verifikasi</th>
              <th style={{ padding: '12px 16px', color: 'var(--muted)', fontSize: '11px', fontWeight: '700' }}>Kesenjangan</th>
              <th style={{ padding: '12px 16px', color: 'var(--muted)', fontSize: '11px', fontWeight: '700' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {topRows.map((r, i) => {
              const s = DM_SUB[r.id];
              const cClass = getPillClass(r.gap);
              const cText = getPillText(r.gap);
              const cColor = getGapColor(r.gap);
              const isActive = r.id === activeId;

              return (
                <tr 
                  key={r.id} 
                  onClick={() => onSubTopicSelect?.(r.id)}
                  style={{ 
                    cursor: 'pointer', 
                    borderBottom: '1px solid var(--line)',
                    background: isActive ? 'rgba(47, 158, 107, 0.05)' : 'transparent' 
                  }}
                  className="mat-row-hover"
                >
                  <td className="mono" style={{ padding: '14px 16px', fontSize: '12px', color: 'var(--faint)' }}>
                    {String(i + 1).padStart(2, '0')}
                  </td>
                  <td style={{ padding: '14px 16px', fontSize: '13px', fontWeight: '600' }}>
                    {s.n}
                  </td>
                  <td className="hide" style={{ padding: '14px 16px', fontSize: '12px', color: 'var(--muted)' }}>
                    <span className="sect">{s.topic.code} {s.topic.name}</span>
                  </td>
                  <td className="num" style={{ textAlign: 'right', padding: '14px 16px', fontSize: '12px', fontFamily: 'var(--mono)' }}>
                    {dmF(r.imNegClaim)}
                  </td>
                  <td className="num" style={{ textAlign: 'right', padding: '14px 16px', fontSize: '12px', fontFamily: 'var(--mono)', fontWeight: '700' }}>
                    {dmF(r.imNeg)}
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <div className="dm-gapbar" style={{ display: 'flex', alignItems: 'center', gap: '9px', minWidth: '120px' }}>
                      <span className="tk" style={{ flex: 1, height: '6px', borderRadius: '99px', background: 'var(--ring)', overflow: 'hidden' }}>
                        <i style={{ display: 'block', height: '100%', borderRadius: '99px', width: `${Math.min(100, (r.gap / Math.max(maxGap, 1)) * 100)}%`, background: cColor }} />
                      </span>
                      <span className="mono" style={{ fontSize: '12px', fontWeight: '700', color: cColor }}>
                        +{dmF(r.gap)}
                      </span>
                    </div>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <span className={`zone ${cClass}`} style={{ fontSize: '11px' }}>
                      <span className="d" style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', background: 'currentColor', marginRight: '6px' }} />
                      {cText}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div 
        className="note" 
        style={{ 
          marginTop: '16px', 
          padding: '16px 20px', 
          background: 'rgba(247, 179, 24, 0.08)', 
          borderLeft: '4px solid var(--gold)', 
          borderRadius: '8px', 
          fontSize: '13px', 
          lineHeight: '1.7',
          color: 'var(--ink)'
        }}
        dangerouslySetInnerHTML={{ __html: verdict }}
      />
    </div>
  );
}
