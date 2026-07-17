import { DM_SUB } from '../constants/dmTopics';
import { DM_TH, DM_GMID } from '../constants/dmThresholds';
import { dmF } from '../utils/dmMath';

export default function ScatterPlot({ assessment, onSubTopicSelect }) {
  const W = 920;
  const H = 560;
  const L = 70;
  const R = 30;
  const T = 26;
  const B = 58;

  const px = v => L + (v / 25) * (W - L - R);
  const py = v => H - B - (v / 25) * (H - T - B);

  const col = { e: '#0F7A6E', s: '#2E9C8F', g: '#5FB6A8' };

  const gridTicks = [];
  for (let v = 0; v <= 25; v += 5) {
    gridTicks.push(v);
  }

  const items = Object.values(assessment || {});

  return (
    <div className="mat-card-dashboard mat-section-spacer">
      <h2 className="mat-card-title">Peta Materialitas</h2>
      <p className="mat-card-subtitle">Klaim emiten versus verifikasi PRISMA. Garis merah melambangkan Kesenjangan Kredibilitas.</p>
      
      <div className="card" style={{ background: 'var(--white)', padding: '20px', borderRadius: '16px' }}>
        <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', display: 'block' }} role="img" aria-label="Peta materialitas klaim versus verifikasi">
          {/* Material region on both axes */}
          <rect 
            x={px(DM_TH)} 
            y={py(25)} 
            width={px(25) - px(DM_TH)} 
            height={py(DM_TH) - py(25)} 
            fill="#E4F3EB" 
            opacity=".55" 
          />
          <text 
            x={(px(DM_TH) + px(25)) / 2} 
            y={py(23.4)} 
            textAnchor="middle" 
            fontSize="12" 
            fontWeight="700" 
            fill="#9FBBB0" 
            fontFamily="Plus Jakarta Sans"
          >
            MATERIAL PADA DUA SUMBU
          </text>

          {/* Grid lines & labels */}
          {gridTicks.map(v => (
            <g key={v}>
              <line x1={px(v)} y1={py(0)} x2={px(v)} y2={py(25)} stroke="#EEF3EE" />
              <line x1={px(0)} y1={py(v)} x2={px(25)} y2={py(v)} stroke="#EEF3EE" />
              <text x={px(v)} y={py(0) + 18} textAnchor="middle" fontSize="10" fill="#93A89F" fontFamily="IBM Plex Mono">{v}</text>
              <text x={px(0) - 10} y={py(v) + 3.5} textAnchor="end" fontSize="10" fill="#93A89F" fontFamily="IBM Plex Mono">{v}</text>
            </g>
          ))}

          {/* Threshold lines */}
          <line x1={px(DM_TH)} y1={py(0)} x2={px(DM_TH)} y2={py(25)} stroke="#F7B318" strokeWidth="1.6" stroke-dasharray="5 4" />
          <line x1={px(0)} y1={py(DM_TH)} x2={px(25)} y2={py(DM_TH)} stroke="#F7B318" strokeWidth="1.6" stroke-dasharray="5 4" />
          <text x={px(DM_TH) + 6} y={py(24.4)} fontSize="10" fontWeight="700" fill="#D9990A" fontFamily="Plus Jakarta Sans">ambang {DM_TH}</text>

          {/* Axis border lines */}
          <line x1={px(0)} y1={py(0)} x2={px(25)} y2={py(0)} stroke="#123B37" strokeWidth="1.5" />
          <line x1={px(0)} y1={py(0)} x2={px(0)} y2={py(25)} stroke="#123B37" strokeWidth="1.5" />

          {/* Axis Labels */}
          <text x={(px(0) + px(25)) / 2} y={H - 14} textAnchor="middle" fontSize="12.5" fontWeight="700" fill="#145858" fontFamily="Plus Jakarta Sans">
            MATERIALITAS FINANSIAL (outside-in)
          </text>
          <text transform={`translate(20, ${(py(0) + py(25)) / 2}) rotate(-90)`} textAnchor="middle" fontSize="12.5" fontWeight="700" fill="#145858" fontFamily="Plus Jakarta Sans">
            MATERIALITAS DAMPAK (inside-out)
          </text>

          {/* Data Points */}
          {items.map(r => {
            const s = DM_SUB[r.id];
            const c = col[s.topic.p];
            const x1 = px(r.fmRiskClaim);
            const y1 = py(r.imNegClaim);
            const x2 = px(r.fmRisk);
            const y2 = py(r.imNeg);

            return (
              <g key={r.id}>
                {r.gap >= DM_GMID && (
                  <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#D9564C" strokeWidth="1.5" opacity=".55" />
                )}
                {/* Claim circle (hollow) */}
                <circle cx={x1} cy={y1} r="4.6" fill="none" stroke={c} strokeWidth="1.8" opacity=".75" />
                {/* Verified circle (filled) */}
                <circle 
                  cx={x2} 
                  cy={y2} 
                  r="6.2" 
                  fill={c} 
                  stroke="#fff" 
                  strokeWidth="1.6" 
                  style={{ cursor: 'pointer' }}
                  onClick={() => onSubTopicSelect?.(r.id)}
                >
                  <title>
                    {`${s.topic.code} · ${s.n}\nKlaim: dampak ${dmF(r.imNegClaim)} / finansial ${dmF(r.fmRiskClaim)}\nVerifikasi: dampak ${dmF(r.imNeg)} / finansial ${dmF(r.fmRisk)}\nKesenjangan: ${dmF(r.gap)}`}
                  </title>
                </circle>
              </g>
            );
          })}
        </svg>

        {/* Legend */}
        <div className="dm-legrow" style={{ marginTop: 12 }}>
          <div className="li"><span className="dm-hollow"></span> Posisi menurut klaim emiten</div>
          <div className="li"><span className="dm-sw" style={{ background: '#0F7A6E' }}></span> Lingkungan (E)</div>
          <div className="li"><span className="dm-sw" style={{ background: '#2E9C8F' }}></span> Sosial (S)</div>
          <div className="li"><span className="dm-sw" style={{ background: '#5FB6A8' }}></span> Tata Kelola (G)</div>
          <div className="li" style={{ marginLeft: 'auto' }}>
            <span style={{ display: 'inline-block', width: '18px', height: '2px', background: '#D9564C', marginRight: '6px', verticalAlign: 'middle' }} /> 
            Kesenjangan Kredibilitas
          </div>
        </div>
      </div>
    </div>
  );
}
