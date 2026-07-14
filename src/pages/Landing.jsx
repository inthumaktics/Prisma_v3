import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Shield, Target, Database, Eye, TrendingUp, Users, BarChart3,
  CheckCircle2, Satellite, Link2, Cpu, AlertTriangle, Activity
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { companies } from '../data/companies';

/* ─── animated counter hook ─── */
function useCountUp(end, duration = 1400, start = 0) {
  const [value, setValue] = useState(start);
  useEffect(() => {
    let startTime = null;
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(start + (end - start) * ease));
      if (progress < 1) requestAnimationFrame(step);
    };
    const raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [end, duration, start]);
  return value;
}

/* ─── Animated SVG sparkline ─── */
function Sparkline({ color = '#1C7B72', height = 56, animate = true }) {
  const pathRef = useRef(null);
  const data = [28, 38, 32, 50, 46, 60, 54, 68, 72, 80, 76, 88];
  const w = 200, h = height;
  const min = Math.min(...data), max = Math.max(...data);
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / (max - min)) * h * 0.85 - h * 0.05;
    return `${x},${y}`;
  });
  const d = `M${pts.join(' L')}`;
  const fillPts = [`0,${h}`, ...pts, `${w},${h}`];
  const fillD = `M${fillPts.join(' L')}Z`;

  useEffect(() => {
    if (!animate || !pathRef.current) return;
    const el = pathRef.current;
    const len = el.getTotalLength();
    el.style.strokeDasharray = len;
    el.style.strokeDashoffset = len;
    el.style.transition = 'stroke-dashoffset 1.6s cubic-bezier(.4,0,.2,1) .5s';
    requestAnimationFrame(() => { el.style.strokeDashoffset = '0'; });
  }, [animate]);

  return (
    <svg viewBox={`0 0 ${w} ${h}`} fill="none" style={{ width: '100%', height }}>
      <defs>
        <linearGradient id="spark-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.18" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={fillD} fill="url(#spark-fill)" />
      <path ref={pathRef} d={d} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ─── Animated donut ring ─── */
function ScoreRing({ score = 84, size = 90 }) {
  const circRef = useRef(null);
  const r = (size - 10) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - score / 100);

  useEffect(() => {
    if (!circRef.current) return;
    const el = circRef.current;
    el.style.strokeDasharray = circ;
    el.style.strokeDashoffset = circ;
    el.style.transition = 'stroke-dashoffset 1.4s cubic-bezier(.4,0,.2,1) .3s';
    requestAnimationFrame(() => { el.style.strokeDashoffset = offset; });
  }, [circ, offset]);

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none"
        stroke="#E1EBE3" strokeWidth="8" />
      <circle
        ref={circRef}
        cx={size / 2} cy={size / 2} r={r}
        fill="none"
        stroke="#1C7B72"
        strokeWidth="8"
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text x="50%" y="44%" textAnchor="middle"
        fontSize="20" fontWeight="800" fill="#0E4443" fontFamily="'Plus Jakarta Sans', sans-serif">
        {score}
      </text>
      <text x="50%" y="68%" textAnchor="middle"
        fontSize="9" fontWeight="700" fill="#7A9A93" fontFamily="'Plus Jakarta Sans', sans-serif">
        /100
      </text>
    </svg>
  );
}

/* ─── Hero right-side dashboard cards ─── */
function HeroDashboard() {
  const avgScore = Math.round(companies.reduce((a, d) => a + d.score, 0) / companies.length);
  const highRiskCount = companies.filter(c => c.score < 50).length;

  return (
    <div className="hero-dashboard">
      {/* Column 1 (Left) */}
      <div className="hd-column">
        {/* ESG Credibility Score Card */}
        <div className="hd-card hd-card--score">
          <div className="hd-card-label">
            <span className="hd-verified-dot" />
            PRISMA VERIFIED
          </div>
          <div className="hd-score-body">
            <div className="hd-score-info">
              <div className="hd-score-title">ESG Credibility</div>
              <div className="hd-score-sub">Verified Dec 2026</div>
            </div>
            <ScoreRing score={84} size={80} />
          </div>
        </div>

        {/* Market Snapshot */}
        <div className="hd-card hd-card--market">
          <div className="hd-market-header">MARKET SNAPSHOT</div>
          <div className="hd-market-stats">
            <MarketStat icon={<Database size={16} />} value={companies.length} label="Monitored" color="#1C7B72" />
            <MarketStat icon={<Activity size={16} />} value={avgScore} label="Avg Score" color="#1C7B72" />
            <MarketStat icon={<AlertTriangle size={16} />} value={highRiskCount} label="High Risk" color="#F7B318" highlight />
          </div>
        </div>
      </div>

      {/* Column 2 (Right) */}
      <div className="hd-column">
        {/* AI Audit Logs Card */}
        <div className="hd-card hd-card--audit">
          <div className="hd-audit-header">
            <div className="hd-audit-title">
              <Shield size={13} />
              AI AUDIT LOGS
            </div>
            <span className="hd-badge-active">Active</span>
          </div>
          <div className="hd-audit-items">
            <AuditItem label="Satellite Verified" />
            <AuditItem label="Regulatory Cross-Checked" />
            <AuditItem label="Blockchain Recorded" />
          </div>
        </div>

        {/* Verification Index */}
        <div className="hd-card hd-card--vi">
          <div className="hd-vi-header">
            <span>📈 VERIFICATION INDEX</span>
            <span className="hd-vi-delta">+14.8% <small>MoM</small></span>
          </div>
          <Sparkline color="#1C7B72" height={60} />
        </div>
      </div>
    </div>
  );
}

function AuditItem({ label }) {
  return (
    <div className="hd-audit-item">
      <span className="hd-audit-item-label">{label}</span>
      <CheckCircle2 size={16} className="hd-audit-check" />
    </div>
  );
}

function MarketStat({ icon, value, label, color, highlight }) {
  const displayed = useCountUp(typeof value === 'number' ? value : 0, 1200);
  return (
    <div className={`hd-market-stat ${highlight ? 'hd-market-stat--highlight' : ''}`}>
      <div className="hd-market-stat-icon" style={{ color }}>{icon}</div>
      <div className="hd-market-stat-value" style={{ color: highlight ? '#F7B318' : '#0E4443' }}>
        {typeof value === 'number' ? displayed : value}
      </div>
      <div className="hd-market-stat-label">{label}</div>
    </div>
  );
}

/* ─── Platform integrity badges ─── */
function IntegrityBadge({ icon, label }) {
  return (
    <span className="integrity-badge">
      {icon}
      {label}
    </span>
  );
}

/* ─── Main Landing Component ─── */
export default function Landing() {
  const navigate = useNavigate();
  const { showToast } = useApp();
  const avg = Math.round(companies.reduce((a, d) => a + d.score, 0) / companies.length);

  return (
    <div className="landing-v3">

      {/* ====== HERO ====== */}
      <section className="hero-v3 hero-v3--redesign">
        <div className="hero-v3-content hero-v3-content--redesign">

          {/* Left column */}
          <div className="hero-v3-left">
            <div className="hero-v3-badge hero-v3-badge--redesign">
              <Cpu size={13} />
              AI-Powered ESG Credibility Intelligence
            </div>

            <h1 className="hero-v3-title hero-v3-title--redesign">
              Trust ESG<br />
              with <span className="hero-highlight">Evidence</span>,<br />
              not Claims.
            </h1>

            <p className="hero-v3-subtitle hero-v3-subtitle--redesign">
              PRISMA evaluates corporate sustainability claims in real-time. By cross-referencing
              disclosures with independent satellite feeds, public registries, and AI auditing,
              we establish trust you can invest in.
            </p>

            <div className="hero-v3-cta">
              <button className="btn-v3 btn-v3-primary" onClick={() => navigate('/ranking')}>
                Explore ESG Rankings
              </button>
              <button className="btn-v3 btn-v3-secondary" onClick={() => navigate('/metodologi')}>
                Learn How It Works →
              </button>
            </div>

            {/* Platform integrity strip */}
            <div className="hero-integrity-strip">
              <div className="hero-integrity-label">PLATFORM INTEGRITY STANDARDS</div>
              <div className="hero-integrity-badges">
                <IntegrityBadge icon={<CheckCircle2 size={14} />} label="AI Verified" />
                <IntegrityBadge icon={<Link2 size={14} />} label="Blockchain Sec" />
                <IntegrityBadge icon={<Database size={14} />} label="Raw Evidence" />
                <IntegrityBadge icon={<Shield size={14} />} label="Regulator Ready" />
              </div>
            </div>
          </div>

          {/* Right column – dashboard cards */}
          <div className="hero-v3-right">
            <HeroDashboard />
          </div>
        </div>
      </section>

      {/* ====== KPI Stats ====== */}
      <section className="kpi-strip">
        <div className="kpi-strip-container">
          <StatCard icon={<Users />} number={companies.length} label="Emiten Terverifikasi" />
          <StatCard icon={<TrendingUp />} number={avg} label="Skor ESG Rata-rata" />
          <StatCard icon={<Shield />} number="100%" label="Blockchain-Verified" />
          <StatCard icon={<BarChart3 />} number="1.2M+" label="Data Points Analyzed" />
        </div>
      </section>

      {/* ====== About PRISMA ====== */}
      <section className="section-v3">
        <div className="container-v3">
          <div className="section-header-v3">
            <span className="section-label-v3">Tentang PRISMA</span>
            <h2 className="section-title-v3">Lembaga Verifikasi Kredibilitas ESG Independen</h2>
            <p className="section-desc-v3">
              Sebuah lembaga verifikasi kredibilitas ESG independen — diposisikan seperti lembaga
              pemeringkat efek (PEFINDO), namun yang dinilai bukan kemampuan bayar utang, melainkan
              kejujuran klaim keberlanjutan.
            </p>
          </div>
          <div className="values-grid">
            <ValueCard icon={<Shield />} title="Independen"
              description="Berdiri di luar emiten, IDX, dan OJK; wajib berizin OJK. Yang menilai tidak boleh dinilai." />
            <ValueCard icon={<Target />} title="Terukur"
              description={<>Menghitung <strong>Kesenjangan Kredibilitas</strong> — jarak klaim vs realitas — pada dua sumbu materialitas: finansial &amp; dampak.</>} />
            <ValueCard icon={<Database />} title="Berbasis Bukti"
              description="AI membandingkan klaim dengan citra satelit Climate TRACE & sanksi KLHK; blockchain menjamin integritas datanya." />
            <ValueCard icon={<Eye />} title="Untuk Publik"
              description="Skor 0–100 tayang terbuka di sistem keterbukaan informasi BEI dan menjadi prioritas pengawasan OJK." />
          </div>
        </div>
      </section>

      {/* ====== How PRISMA Works ====== */}
      <section className="section-v3 section-v3-alt">
        <div className="container-v3">
          <div className="section-header-v3">
            <span className="section-label-v3">Cara Kerja</span>
            <h2 className="section-title-v3">Dari klaim menuju kepercayaan</h2>
          </div>
          <div className="timeline-v3">
            <TimelineStep number="01" title="Tarik bukti eksternal"
              description="Laporan emiten + emisi satelit + rekam sanksi ditarik tanpa meminta data dari perusahaan." />
            <TimelineStep number="02" title="Kunci integritas"
              description="Setiap data di-hash & di-timestamp pada ledger; tak bisa diubah, tak ada perhitungan ganda." />
            <TimelineStep number="03" title="Ukur kesenjangan"
              description="AI mengukur gap finansial & gap dampak sekaligus, lengkap dengan tingkat keyakinan." />
            <TimelineStep number="04" title="Terbitkan skor"
              description="ESG Credibility Score publik menggerakkan investor & pengawasan berbasis risiko OJK." />
          </div>
        </div>
      </section>

      {/* ====== Dashboard Preview ====== */}
      <section className="section-v3">
        <div className="container-v3">
          <div className="section-header-v3">
            <span className="section-label-v3">Platform</span>
            <h2 className="section-title-v3">Kredibilitas ESG dalam satu dashboard</h2>
            <p className="section-desc-v3">
              Akses real-time ke skor kredibilitas, analisis kesenjangan, peta emisi, dan ranking emiten BEI.
            </p>
          </div>
          <div className="preview-card">
            <div className="preview-grid">
              <PreviewBox title="Dashboard Pasar" desc="KPI, tren, dan distribusi kredibilitas pasar" onClick={() => navigate('/dashboard')} />
              <PreviewBox title="Peringkat Emiten" desc="Ranking lengkap berdasarkan skor kredibilitas" onClick={() => navigate('/ranking')} />
              <PreviewBox title="Peta Emisi" desc="Visualisasi emisi fasilitas dari satelit" onClick={() => navigate('/map')} />
              <PreviewBox title="Kredit Karbon" desc="Registry blockchain untuk cegah double-counting" onClick={() => navigate('/carbon')} />
            </div>
            <button className="btn-v3 btn-v3-primary" onClick={() => navigate('/dashboard')}>
              View Market
            </button>
          </div>
        </div>
      </section>

      {/* ====== Educational Articles ====== */}
      <section className="section-v3 section-v3-alt">
        <div className="container-v3">
          <div className="section-header-v3">
            <span className="section-label-v3">Edukasi</span>
            <h2 className="section-title-v3">Pahami ESG &amp; kredibilitas</h2>
            <p className="section-desc-v3">
              Artikel, video, dan panduan untuk memahami verifikasi kredibilitas ESG.
            </p>
          </div>
          <div className="edu-preview-grid">
            <EduCard title="Apa itu greenwashing?" category="Dasar" time="4 mnt" />
            <EduCard title="Cara membaca skor kredibilitas" category="Panduan" time="5 mnt" />
            <EduCard title="Double materiality dalam 5 menit" category="Konsep" time="5 mnt" />
          </div>
          <div style={{ textAlign: 'center', marginTop: 32 }}>
            <button className="btn-v3 btn-v3-secondary" onClick={() => navigate('/literasi')}>
              Lihat Semua Artikel
            </button>
          </div>
        </div>
      </section>

      {/* ====== Methodology Banner ====== */}
      <section className="section-v3">
        <div className="container-v3">
          <div className="meth-banner">
            <div>
              <span className="section-label-v3" style={{ color: 'var(--gold)' }}>Metodologi</span>
              <h2 className="section-title-v3" style={{ color: '#fff', marginTop: 12 }}>
                Empat langkah, delapan prinsip berkelanjutan
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.85)', marginTop: 12, maxWidth: '54ch' }}>
                Metodologi PRISMA mengikuti prinsip POJK 51/2017 tentang pembiayaan berkelanjutan
                dan standar PSPK 1 &amp; 2.
              </p>
              <button className="btn-v3 btn-v3-light" style={{ marginTop: 24 }} onClick={() => navigate('/metodologi')}>
                Pelajari Metodologi Lengkap
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ====== Contact ====== */}
      <section className="section-v3">
        <div className="container-v3">
          <div className="contact-v3">
            <div className="contact-v3-left">
              <h3>Mari wujudkan pasar yang berintegritas.</h3>
              <p>Untuk kemitraan data, kolaborasi riset, atau pertanyaan regulator, tim kami siap membantu.</p>
              <ContactInfo />
              <div className="socials">
                <SocialLink icon={<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M6 13V8H4V6h2V4.5C6 2.8 7 2 8.6 2c.7 0 1.4.1 1.4.1V4H9c-.8 0-1 .5-1 1v1h2l-.3 2H8v5z" /></svg>} />
                <SocialLink icon={<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M13 4.3c-.4.2-.8.3-1.2.4.4-.3.8-.7.9-1.2-.4.3-.9.4-1.4.6A2.2 2.2 0 008.5 5c0 .2 0 .4.1.5-1.8-.1-3.5-1-4.6-2.4-.2.3-.3.7-.3 1.1 0 .8.4 1.4 1 1.8-.4 0-.7-.1-1-.3 0 1.1.8 2 1.8 2.2-.2.1-.4.1-.6.1h-.4c.3.9 1.1 1.5 2 1.5A4.4 4.4 0 013 11.5c1 .6 2.1 1 3.3 1 4 0 6.1-3.3 6.1-6.1v-.3c.4-.3.8-.7 1.1-1.1z" /></svg>} />
                <SocialLink icon={<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M4 6h2v7H4zM5 3a1.2 1.2 0 100 2.4A1.2 1.2 0 005 3zM8 6h2v1c.3-.6 1.1-1.1 2-1.1 2 0 2.5 1.2 2.5 3V13h-2V9.3c0-.9-.3-1.5-1.1-1.5-.6 0-1 .4-1.2.9-.1.2-.1.4-.1.6V13H8z" /></svg>} />
              </div>
            </div>
            <ContactForm onToast={showToast} />
          </div>
        </div>
      </section>
    </div>
  );
}

/* ─── Reused helper components ─── */
function StatCard({ icon, number, label }) {
  return (
    <div className="stat-card">
      <div className="stat-card-icon">{icon}</div>
      <div className="stat-card-number">{number}</div>
      <div className="stat-card-label">{label}</div>
    </div>
  );
}

function ValueCard({ icon, title, description }) {
  return (
    <div className="value-card">
      <div className="value-card-icon">{icon}</div>
      <h3 className="value-card-title">{title}</h3>
      <p className="value-card-desc">{description}</p>
    </div>
  );
}

function TimelineStep({ number, title, description }) {
  return (
    <div className="timeline-step">
      <div className="timeline-step-number">{number}</div>
      <h4 className="timeline-step-title">{title}</h4>
      <p className="timeline-step-desc">{description}</p>
    </div>
  );
}

function PreviewBox({ title, desc, onClick }) {
  return (
    <div className="preview-box" onClick={onClick}>
      <div className="preview-box-icon"><BarChart3 /></div>
      <h4>{title}</h4>
      <p>{desc}</p>
    </div>
  );
}

function EduCard({ title, category, time }) {
  return (
    <div className="edu-card">
      <div className="edu-card-header">
        <span className="edu-card-category">{category}</span>
        <span className="edu-card-time">{time}</span>
      </div>
      <h4 className="edu-card-title">{title}</h4>
    </div>
  );
}

function ContactInfo() {
  return (
    <div className="contact-info">
      <div className="contact-item">
        <span className="contact-icon">@</span>
        <div>
          <div className="contact-label">Surel</div>
          <div className="contact-value">halo@prisma.id</div>
        </div>
      </div>
      <div className="contact-item">
        <span className="contact-icon">📞</span>
        <div>
          <div className="contact-label">Telepon</div>
          <div className="contact-value">+62 21 500 8888</div>
        </div>
      </div>
      <div className="contact-item">
        <span className="contact-icon">📍</span>
        <div>
          <div className="contact-label">Kantor</div>
          <div className="contact-value">Kawasan Bursa Efek Indonesia, Jakarta</div>
        </div>
      </div>
    </div>
  );
}

function SocialLink({ icon }) {
  return (
    <a href="#" className="social-link" onClick={e => e.preventDefault()}>
      {icon}
    </a>
  );
}

function ContactForm({ onToast }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onToast('Terima kasih! Pesan Anda terkirim (prototipe).');
    e.target.reset();
  };
  return (
    <form className="contact-form-v3" onSubmit={handleSubmit}>
      <label htmlFor="cf-name">Nama</label>
      <input id="cf-name" placeholder="Nama Anda" required />
      <label htmlFor="cf-email">Surel</label>
      <input id="cf-email" type="email" placeholder="nama@surel.com" required />
      <label htmlFor="cf-msg">Pesan</label>
      <textarea id="cf-msg" rows="4" placeholder="Tulis pesan Anda…" required />
      <button type="submit" className="btn-v3 btn-v3-primary" style={{ width: '100%' }}>
        Kirim Pesan
      </button>
    </form>
  );
}
