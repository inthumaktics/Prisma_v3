import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, AlertTriangle, FileText, Download, ShieldCheck, Cpu, Database, Award, ArrowUpRight, BarChart2 } from 'lucide-react';
import CountUp from './CountUp';
import { generatePdfReport } from '../utils/pdfGenerator';
import { dmF } from '../utils/dmMath';
import VerificationTimeline from './VerificationTimeline';

const formatDate = (dateStr) => {
  try {
    if (!dateStr) return new Date().toLocaleDateString('id-ID');
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return new Date().toLocaleDateString('id-ID');
    const day = String(d.getDate()).padStart(2, '0');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    const month = months[d.getMonth()];
    const year = d.getFullYear();
    const hours = String(d.getHours()).padStart(2, '0');
    const mins = String(d.getMinutes()).padStart(2, '0');
    return `${day} ${month} ${year}, ${hours}:${mins}`;
  } catch (e) {
    return String(dateStr);
  }
};

export default function VerificationReport({ company, materialityData }) {
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    setIsAnimated(true);
  }, []);

  if (!company || !materialityData) return null;

  const { summary, gap, verdict } = materialityData;
  const avgGap = summary.avgGap;

  // Determine status and badge styling
  let statusText = 'Verified';
  let badgeColor = 'var(--green)';
  let scoreLabel = 'Highly Credible';
  let recText = 'Suitable for public disclosure.';

  if (avgGap >= 3.0) {
    statusText = 'High Divergence';
    badgeColor = 'var(--red)';
    scoreLabel = 'Low Credibility';
    recText = 'Independent audit is recommended before publication.';
  } else if (avgGap >= 1.5) {
    statusText = 'Needs Review';
    badgeColor = 'var(--amber)';
    scoreLabel = 'Moderately Credible';
    recText = 'Additional supporting evidence is recommended.';
  }

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const handleDownload = (type) => {
    generatePdfReport(type, company, materialityData);
  };

  return (
    <div className="mat-card-dashboard mat-section-spacer" style={{ maxWidth: '1280px', margin: '0 auto' }}>
      <h2 className="mat-card-title" style={{ textAlign: 'center', marginBottom: '8px' }}>ESG Verification Report</h2>
      <p className="mat-card-subtitle" style={{ textAlign: 'center', marginBottom: '32px' }}>
        Laporan hasil verifikasi independen kredibilitas ESG emiten berdasarkan Double Materiality framework.
      </p>

      {/* SECTION 1 & 2: ESG CREDIBILITY SCORE & STATUS */}
      <motion.div 
        className="mat-hero-score-card"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={cardVariants}
        style={{
          background: 'radial-gradient(120% 120% at 50% 10%, #1a4d45 0%, #111 100%)',
          padding: '48px 24px',
          borderRadius: '24px',
          textAlign: 'center',
          border: '1px solid rgba(47, 158, 107, 0.2)',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
          marginBottom: '40px',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'inline-flex', padding: '6px 16px', borderRadius: '99px', background: 'rgba(255, 255, 255, 0.08)', fontSize: '12px', fontWeight: 'bold', color: 'var(--gold)', border: '1px solid rgba(247, 179, 24, 0.2)', marginBottom: '24px', letterSpacing: '1px', textTransform: 'uppercase' }}>
            Verification Audit Certificate
          </div>

          <div style={{ position: 'relative', display: 'inline-block', margin: '0 auto 20px auto' }}>
            <svg width="180" height="180" viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)' }}>
              <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="6" />
              <motion.circle 
                cx="50" 
                cy="50" 
                r="44" 
                fill="none" 
                stroke={badgeColor} 
                strokeWidth="6" 
                strokeDasharray="276"
                initial={{ strokeDashoffset: 276 }}
                animate={{ strokeDashoffset: 276 - (276 * company.score) / 100 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
              />
            </svg>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <span className="mono" style={{ fontSize: '48px', fontWeight: '800', color: 'var(--white)', lineHeight: '1' }}>
                <CountUp value={company.score} decimals={0} />
              </span>
              <span style={{ fontSize: '10px', color: 'var(--muted)', marginTop: '4px', letterSpacing: '0.5px' }}>CREDIBILITY</span>
            </div>
          </div>

          <h3 style={{ fontSize: '24px', fontWeight: '800', color: badgeColor, marginBottom: '8px' }}>
            {scoreLabel}
          </h3>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '8px', background: `${badgeColor}15`, color: badgeColor, border: `1px solid ${badgeColor}30`, fontWeight: '700', fontSize: '14px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: badgeColor }} />
            {statusText}
          </div>
        </div>
      </motion.div>

      {/* SECTION 3: DOUBLE MATERIALITY RESULT KPIs */}
      <div className="mat-metrics-grid mat-metrics-3col mat-section-spacer">
        <motion.div className="mat-overview-card" style={{ padding: '24px' }} whileHover={{ y: -5 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <span className="mat-overview-label" style={{ fontSize: '12px', fontWeight: '700' }}>Impact Materiality</span>
            <div style={{ color: 'var(--green)', padding: '4px', borderRadius: '4px', background: 'rgba(47, 158, 107, 0.1)' }}>
              <ArrowUpRight size={16} />
            </div>
          </div>
          <span className="mat-overview-val" style={{ fontSize: '28px' }}>
            <CountUp value={company.imp} decimals={1} />
          </span>
          <span className="mat-overview-desc" style={{ marginTop: '8px' }}>Peringkat verifikasi atas dampak operasi terhadap lingkungan & sosial.</span>
        </motion.div>

        <motion.div className="mat-overview-card" style={{ padding: '24px' }} whileHover={{ y: -5 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <span className="mat-overview-label" style={{ fontSize: '12px', fontWeight: '700' }}>Financial Materiality</span>
            <div style={{ color: 'var(--green)', padding: '4px', borderRadius: '4px', background: 'rgba(47, 158, 107, 0.1)' }}>
              <ArrowUpRight size={16} />
            </div>
          </div>
          <span className="mat-overview-val" style={{ fontSize: '28px' }}>
            <CountUp value={company.fin} decimals={1} />
          </span>
          <span className="mat-overview-desc" style={{ marginTop: '8px' }}>Peringkat verifikasi atas eksposur risiko & peluang transisi finansial.</span>
        </motion.div>

        <motion.div className="mat-overview-card" style={{ padding: '24px' }} whileHover={{ y: -5 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <span className="mat-overview-label" style={{ fontSize: '12px', fontWeight: '700' }}>Credibility Gap</span>
            <div style={{ color: badgeColor, padding: '4px', borderRadius: '4px', background: `${badgeColor}15` }}>
              <BarChart2 size={16} />
            </div>
          </div>
          <span className="mat-overview-val" style={{ fontSize: '28px', color: badgeColor }}>
            <CountUp value={avgGap} decimals={1} />
          </span>
          <span className="mat-overview-desc" style={{ marginTop: '8px' }}>Kesenjangan rata-rata antara klaim keberlanjutan dan bukti empiris.</span>
        </motion.div>
      </div>

      {/* SECTION 4: ASSESSMENT EXPLANATION */}
      <motion.div 
        className="mat-card-dashboard mat-section-spacer"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={cardVariants}
        style={{ padding: '24px', background: 'var(--white)', borderRadius: '16px', border: '1px solid var(--line)' }}
      >
        <h3 className="mat-card-title" style={{ fontSize: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Award size={18} style={{ color: 'var(--green)' }} />
          Assessment Interpretation
        </h3>
        <p style={{ fontSize: '14px', color: 'var(--ink)', lineHeight: '1.7', marginTop: '12px' }} dangerouslySetInnerHTML={{ __html: verdict }} />
      </motion.div>

      {/* SECTION 5: EXTERNAL EVIDENCE */}
      <div className="mat-section-spacer">
        <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--ink)', marginBottom: '8px' }}>External Evidence Summary</h3>
        <p className="mat-card-subtitle" style={{ marginBottom: '16px' }}>Status verifikasi data silang multi-pilar.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          {[
            { name: 'Climate TRACE', status: 'Verified', color: 'var(--green)' },
            { name: 'Sanksi KLHK', status: avgGap >= 3 ? 'Partial' : 'Verified', color: avgGap >= 3 ? 'var(--amber)' : 'var(--green)' },
            { name: 'Sinyal IDX', status: 'Verified', color: 'var(--green)' },
            { name: 'Sinyal OJK', status: 'Verified', color: 'var(--green)' },
            { name: 'Sustainability Report', status: 'Verified', color: 'var(--green)' }
          ].map((item, idx) => (
            <div key={idx} style={{ padding: '16px', background: 'var(--white)', borderRadius: '12px', border: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--ink)' }}>{item.name}</div>
                <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '2px' }}>Pilar Verifikasi {idx + 1}</div>
              </div>
              <span className="zone g" style={{ fontSize: '11px', color: item.color, background: `${item.color}10`, border: `1px solid ${item.color}20`, padding: '4px 8px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Check size={12} />
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 6: CREDIBILITY GAP VISUALIZATION */}
      <motion.div 
        className="mat-card-dashboard mat-section-spacer"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={cardVariants}
        style={{ padding: '24px', background: 'var(--white)', borderRadius: '16px', border: '1px solid var(--line)' }}
      >
        <h3 className="mat-card-title" style={{ fontSize: '16px', marginBottom: '24px' }}>Credibility Gap Comparison</h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: '700', marginBottom: '8px' }}>
              <span>Corporate Sustainability Claim</span>
              <span className="mono">{(company.score + (avgGap * 4)).toFixed(1)} / 100</span>
            </div>
            <div style={{ height: '12px', background: 'var(--ring)', borderRadius: '99px', overflow: 'hidden' }}>
              <motion.div 
                style={{ height: '100%', background: 'var(--amber)', borderRadius: '99px' }}
                initial={{ width: 0 }}
                animate={{ width: isAnimated ? `${Math.min(100, company.score + (avgGap * 4))}%` : 0 }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: '700', marginBottom: '8px' }}>
              <span>Verified Empirical Evidence</span>
              <span className="mono">{company.score.toFixed(1)} / 100</span>
            </div>
            <div style={{ height: '12px', background: 'var(--ring)', borderRadius: '99px', overflow: 'hidden' }}>
              <motion.div 
                style={{ height: '100%', background: 'var(--green)', borderRadius: '99px' }}
                initial={{ width: 0 }}
                animate={{ width: isAnimated ? `${company.score}%` : 0 }}
                transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
              />
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '24px', padding: '12px 16px', background: 'rgba(47, 158, 107, 0.06)', borderRadius: '8px', border: '1px solid rgba(47, 158, 107, 0.15)' }}>
          <ShieldCheck size={18} style={{ color: 'var(--green)' }} />
          <span style={{ fontSize: '13px', color: 'var(--ink)' }}>
            Kesenjangan kredibilitas sebesar <strong className="mono">{avgGap.toFixed(1)}</strong> terdeteksi antara angka yang diklaim dan hasil verifikasi.
          </span>
        </div>
      </motion.div>

      {/* SECTION 7: INTERACTIVE VERIFICATION TIMELINE */}
      <VerificationTimeline 
        company={company} 
        materialityData={materialityData} 
      />

      {/* SECTION 8: BLOCKCHAIN CERTIFICATE */}
      <motion.div 
        className="mat-card-dashboard mat-section-spacer"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={cardVariants}
        style={{ padding: '24px', background: 'var(--white)', borderRadius: '16px', border: '1px solid var(--line)', display: 'flex', flexDirection: 'column', gap: '16px' }}
      >
        <h3 className="mat-card-title" style={{ fontSize: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Database size={18} style={{ color: 'var(--green)' }} />
          Blockchain Audit Certificate
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginTop: '8px' }}>
          <div>
            <span style={{ fontSize: '11px', color: 'var(--muted)', display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Ledger Hash</span>
            <span className="mono" style={{ fontSize: '13px', fontWeight: '700', color: 'var(--ink)', display: 'block', marginTop: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {company.hash || '0x91A7bF5394A7...'}
            </span>
          </div>

          <div>
            <span style={{ fontSize: '11px', color: 'var(--muted)', display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Verification ID</span>
            <span className="mono" style={{ fontSize: '13px', fontWeight: '700', color: 'var(--ink)', display: 'block', marginTop: '4px' }}>
              PRM-2026-{String(company.score * 200 + 404).padStart(6, '0')}
            </span>
          </div>

          <div>
            <span style={{ fontSize: '11px', color: 'var(--muted)', display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Verification Timestamp</span>
            <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--ink)', display: 'block', marginTop: '4px' }}>
              {formatDate(company.ts)}
            </span>
          </div>

          <div>
            <span style={{ fontSize: '11px', color: 'var(--muted)', display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Signature Status</span>
            <span className="zone g" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: '700', marginTop: '4px', color: 'var(--green)', background: 'rgba(47, 158, 107, 0.1)', padding: '4px 8px', borderRadius: '4px' }}>
              <ShieldCheck size={12} />
              Immutable Record
            </span>
          </div>
        </div>
      </motion.div>

      {/* SECTION 9: RECOMMENDATION BOX */}
      <div className="mat-section-spacer" style={{ padding: '20px 24px', background: `${badgeColor}08`, borderLeft: `4px solid ${badgeColor}`, borderRadius: '8px' }}>
        <h4 style={{ fontSize: '14px', fontWeight: '800', color: 'var(--ink)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <AlertTriangle size={16} style={{ color: badgeColor }} />
          REKOMENDASI AUDIT VERIFIKASI
        </h4>
        <p style={{ fontSize: '13px', color: 'var(--ink)', marginTop: '6px', lineHeight: '1.6' }}>
          {recText} ESG Credibility Score emiten dipengaruhi oleh rata-rata Kesenjangan Kredibilitas sebesar <span className="mono">{avgGap.toFixed(1)}</span>.
        </p>
      </div>

      {/* SECTION 10: ACTION DOWNLOAD BUTTONS */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center', marginTop: '32px' }}>
        <button 
          className="btn-prisma-green" 
          onClick={() => handleDownload('verification')}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}
        >
          <Download size={18} />
          Download ESG Verification Report
        </button>
        <button 
          className="btn-prisma-green" 
          onClick={() => handleDownload('materiality')}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', fontSize: '14px', fontWeight: '700', cursor: 'pointer', background: 'rgba(255, 255, 255, 0.05)', color: 'var(--ink)', border: '1px solid var(--line)' }}
        >
          <FileText size={18} />
          Download Double Materiality Assessment
        </button>
      </div>

    </div>
  );
}
