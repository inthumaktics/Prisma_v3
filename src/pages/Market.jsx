import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { companies, zoneOf, zName, zClr, sColor } from '../data/companies';
import { marketTrend } from '../data/dashboard';
import { useApp } from '../context/AppContext';
import { ZonePill } from '../components/ui/Badges';

export default function Dashboard() {
  const navigate = useNavigate();
  const { openDrawer } = useApp();

  const n = companies.length;
  const avg = Math.round(companies.reduce((a, d) => a + d.score, 0) / n);
  const red = companies.filter(d => zoneOf(d.score) === 'r').length;

  const zoneCounts = useMemo(() => {
    const cnt = { g: 0, y: 0, r: 0 };
    companies.forEach(d => cnt[zoneOf(d.score)]++);
    return cnt;
  }, []);

  const donutData = [
    { name: 'Hijau',  value: zoneCounts.g, color: zClr.g },
    { name: 'Kuning', value: zoneCounts.y, color: zClr.y },
    { name: 'Merah',  value: zoneCounts.r, color: zClr.r },
  ];

  const sectorData = useMemo(() => {
    const bySec = {};
    companies.forEach(d => {
      (bySec[d.sec] = bySec[d.sec] || []).push(d.score);
    });
    return Object.entries(bySec)
      .map(([s, v]) => [s, Math.round(v.reduce((a, b) => a + b) / v.length)])
      .sort((a, b) => b[1] - a[1])
      .slice(0, 7);
  }, []);

  const movers = useMemo(() =>
    [...companies].sort((a, b) => Math.abs(b.trend) - Math.abs(a.trend)).slice(0, 5), []);

  const topFive = useMemo(() =>
    [...companies].sort((a, b) => b.score - a.score).slice(0, 5), []);

  const ringColor = sColor(avg);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload?.length) {
      return (
        <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 10, padding: '8px 14px', fontSize: 12 }}>
          <strong>{label}</strong>: {payload[0].value}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="view">
      {/* KPI Cards */}
      <div className="grid g4" style={{ marginBottom: 18 }}>
        <div className="card kpi">
          <div className="ico" style={{ background: 'var(--sage-soft)' }}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="#145858" strokeWidth="1.7">
              <path d="M4 18V9M11 18V4M18 18v-6"/>
            </svg>
          </div>
          <div>
            <div className="lbl">Emiten dinilai</div>
            <div className="big">{n}</div>
            <div className="delta up">tercatat di BEI</div>
          </div>
        </div>

        <div className="card kpi">
          <div className="ringwrap">
            <svg width="56" height="56" viewBox="0 0 42 42">
              <circle cx="21" cy="21" r="15.9" fill="none" stroke="var(--ring)" strokeWidth="5"/>
              <circle cx="21" cy="21" r="15.9" fill="none" stroke={ringColor} strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray={`${avg} ${100 - avg}`}
                strokeDashoffset="25"
                transform="rotate(-90 21 21)"
              />
            </svg>
            <div className="rv">{avg}</div>
          </div>
          <div>
            <div className="lbl">Skor rata-rata</div>
            <div className="big">{avg}<small>/100</small></div>
            <div className="delta up">▲ 2 vs lalu</div>
          </div>
        </div>

        <div className="card kpi">
          <div className="ico" style={{ background: 'var(--red-soft)' }}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="#b23d34" strokeWidth="1.7">
              <path d="M11 3l7 3v5c0 4.2-3 7.8-7 9-4-1.2-7-4.8-7-9V6z"/>
            </svg>
          </div>
          <div>
            <div className="lbl">Zona merah</div>
            <div className="big" style={{ color: 'var(--red)' }}>{red}</div>
            <div className="delta dn">prioritas OJK</div>
          </div>
        </div>

        <div className="card kpi">
          <div className="ico" style={{ background: 'var(--gold-soft)' }}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="#a8790d" strokeWidth="1.7">
              <path d="M11 2l7 3v5c0 4-3 7.6-7 9-4-1.4-7-5-7-9V5z"/>
              <path d="M8 11l2 2 4-4"/>
            </svg>
          </div>
          <div>
            <div className="lbl">Terverifikasi</div>
            <div className="big" style={{ color: 'var(--gold-d)' }}>100<small>%</small></div>
            <div className="delta up">rantai bukti immutable</div>
          </div>
        </div>
      </div>

      {/* Trend + Donut Row */}
      <div className="grid g-main" style={{ marginBottom: 18 }}>
        <div className="card">
          <div className="chead">
            <div>
              <h3>Tren Kredibilitas Pasar</h3>
              <div className="cap">Skor rata-rata tertimbang, 12 periode</div>
            </div>
            <span className="pillbtn">2025–2026</span>
          </div>
          <ResponsiveContainer width="100%" height={190}>
            <AreaChart data={marketTrend} margin={{ top: 4, right: 0, bottom: 0, left: -20 }}>
              <defs>
                <linearGradient id="trendGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2F9E6B" stopOpacity={0.22}/>
                  <stop offset="100%" stopColor="#2F9E6B" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{ fontSize: 10, fontFamily: 'var(--mono)', fill: 'var(--faint)' }} axisLine={false} tickLine={false}/>
              <YAxis domain={['auto', 'auto']} tick={{ fontSize: 10, fontFamily: 'var(--mono)', fill: 'var(--faint)' }} axisLine={false} tickLine={false}/>
              <Tooltip content={<CustomTooltip />}/>
              <Area type="monotone" dataKey="value" stroke="#2F9E6B" strokeWidth={2.6} fill="url(#trendGrad)" dot={false} activeDot={{ r: 4, fill: '#145858', stroke: '#fff', strokeWidth: 2 }}/>
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <div className="chead">
            <div>
              <h3>Distribusi Zona</h3>
              <div className="cap">Proporsi emiten per tingkat kredibilitas</div>
            </div>
          </div>
          <div className="donut-wrap">
            <ResponsiveContainer width={150} height={150}>
              <PieChart>
                <Pie data={donutData} cx="50%" cy="50%" innerRadius={45} outerRadius={63} dataKey="value" strokeWidth={0}>
                  {donutData.map((entry, i) => <Cell key={i} fill={entry.color}/>)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="leg">
              {donutData.map(({ name, value, color }) => (
                <div className="it" key={name}>
                  <span className="sw" style={{ background: color }}/>
                  {name} <b style={{ marginLeft: 2 }}>{value}</b>
                  <span className="pc">{Math.round(value / n * 100)}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sector / Movers / Top */}
      <div className="grid g3">
        <div className="card">
          <div className="chead">
            <div>
              <h3>Rata-rata per Sektor</h3>
              <div className="cap">Sektor padat emisi cenderung lebih rendah</div>
            </div>
          </div>
          {sectorData.map(([sec, val]) => (
            <div className="sbar" key={sec}>
              <span className="nm">{sec}</span>
              <span className="tk"><i style={{ width: `${val}%`, background: sColor(val) }}/></span>
              <span className="v">{val}</span>
            </div>
          ))}
        </div>

        <div className="card">
          <div className="chead">
            <div>
              <h3>Pergerakan Terbesar</h3>
              <div className="cap">Perubahan skor periode ini</div>
            </div>
          </div>
          {movers.map(d => {
            const cls = d.trend > 0 ? 'up' : d.trend < 0 ? 'dn' : 'fl';
            const sym = d.trend > 0 ? '▲' : d.trend < 0 ? '▼' : '—';
            return (
              <div className="mv" key={d.tk} onClick={() => openDrawer(d)}>
                <div className="logo-sq" style={{ background: d.col }}>{d.ini}</div>
                <div className="info">
                  <div className="tk">{d.tk}</div>
                  <div className="nm">{d.nm}</div>
                </div>
                <div className={`d ${cls}`}>{sym} {Math.abs(d.trend)}</div>
              </div>
            );
          })}
        </div>

        <div className="card">
          <div className="chead">
            <div>
              <h3>Peringkat Teratas</h3>
              <div className="cap">Kredibilitas tertinggi</div>
            </div>
            <span className="pillbtn" onClick={() => navigate('/ranking')}>Semua</span>
          </div>
          {topFive.map(d => {
            const z = zoneOf(d.score);
            return (
              <div className="mv" key={d.tk} onClick={() => openDrawer(d)}>
                <div className="logo-sq" style={{ background: d.col }}>{d.ini}</div>
                <div className="info">
                  <div className="tk">{d.tk}</div>
                  <div className="nm">{d.sec}</div>
                </div>
                <ZonePill score={d.score} style={{ fontSize: 11 }}/>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
