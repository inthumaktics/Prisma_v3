import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, Cpu, Sparkles, Scale, Search, ShieldAlert, 
  Database, Building2, Globe, CheckCircle2, ChevronDown, ChevronUp, Clock, Check 
} from 'lucide-react';
import CountUp from './CountUp';
import { dmF } from '../utils/dmMath';

export default function VerificationTimeline({ company, materialityData }) {
  const [expandedSteps, setExpandedSteps] = useState({});

  if (!company || !materialityData) return null;

  const { summary } = materialityData;
  const avgGap = summary.avgGap;

  const toggleStep = (stepIndex) => {
    setExpandedSteps(prev => ({
      ...prev,
      [stepIndex]: !prev[stepIndex]
    }));
  };

  const steps = [
    {
      title: 'Sustainability Report Submitted',
      icon: <FileText size={20} />,
      desc: 'Perusahaan mengunggah Sustainability Report sebagai dokumen utama penilaian.',
      timestamp: '15 Jul 2026 · 08:10 WIB',
      expandedContent: 'Dokumen laporan keberlanjutan setebal 184 halaman diunggah oleh emiten. Checksum MD5 dan SHA-256 direkam untuk mencocokkan integritas file asli sebelum proses ekstraksi dimulai.',
      stats: [
        { label: 'File Type', value: 'PDF Document' },
        { label: 'File Size', value: '14.2 MB' },
        { label: 'Integrity Check', value: 'SHA-256 Passed' }
      ]
    },
    {
      title: 'AI Document Parsing',
      icon: <Cpu size={20} />,
      desc: 'AI mengekstraksi seluruh indikator ESG, angka emisi, kebijakan sosial, serta tata kelola perusahaan dari dokumen.',
      timestamp: '15 Jul 2026 · 08:11 WIB',
      expandedContent: 'Sistem NLP menganalisis seluruh teks, tabel, dan diagram. Ekstraksi otomatis mendeteksi klaim emisi CO2e Scope 1, Scope 2, dan Scope 3, tingkat keberagaman karyawan, rasio kompensasi, serta struktur komite audit.',
      stats: [
        { label: 'Pages Parsed', value: '184 Pages' },
        { label: 'Indicators Found', value: '326 ESG Indicators' },
        { label: 'Confidence', value: '98.6%' }
      ]
    },
    {
      title: 'AI ESG Topic Classification',
      icon: <Sparkles size={20} />,
      desc: 'AI mengelompokkan informasi ke dalam kategori Environmental, Social, dan Governance berdasarkan kerangka Double Materiality.',
      timestamp: '15 Jul 2026 · 08:11 WIB',
      expandedContent: 'Klaim diklasifikasikan menggunakan model FinBERT-ESG ke dalam sub-topik ESRS (E1-E5, S1-S4, G1) untuk memastikan pemetaan yang komprehensif sesuai standar keberlanjutan Eropa.',
      stats: [
        { label: 'Environmental', value: '42 Topics' },
        { label: 'Social', value: '31 Topics' },
        { label: 'Governance', value: '18 Topics' }
      ]
    },
    {
      title: 'Double Materiality Assessment',
      icon: <Scale size={20} />,
      desc: 'Perhitungan Materialitas Dampak (Inside-Out) dan Materialitas Finansial (Outside-In).',
      timestamp: '15 Jul 2026 · 08:12 WIB',
      expandedContent: 'Melakukan perhitungan dual-perspektif: dampak inside-out terhadap bumi dan risiko outside-in terhadap nilai korporat. Seluruh perhitungan menggunakan matriks pembobotan sektoral.',
      stats: [
        { label: 'Impact Materiality', value: company.imp.toFixed(1) },
        { label: 'Financial Materiality', value: company.fin.toFixed(1) },
        { label: 'Credibility Gap', value: avgGap.toFixed(1) }
      ]
    },
    {
      title: 'External Evidence Verification',
      icon: <Search size={20} />,
      desc: 'PRISMA membandingkan laporan perusahaan dengan data eksternal.',
      timestamp: '15 Jul 2026 · 08:12 WIB',
      expandedContent: 'PRISMA melakukan cross-audit real-time menggunakan satelit dan data instansi publik untuk memverifikasi klaim emisi dan sanksi administratif KLHK.',
      evidence: [
        { name: 'Climate TRACE', status: 'Verified' },
        { name: 'KLHK Registry', status: avgGap >= 3 ? 'Partial' : 'Verified' },
        { name: 'OJK Signal', status: 'Verified' },
        { name: 'IDX Compliance', status: 'Verified' },
        { name: 'News Monitoring', status: 'Verified' },
        { name: 'Satellite Observation', status: 'Verified' }
      ]
    },
    {
      title: 'AI Greenwashing Detection',
      icon: <ShieldAlert size={20} />,
      desc: 'AI menganalisis apakah terdapat indikasi Greenwashing melalui perbandingan antara klaim perusahaan dan bukti eksternal.',
      timestamp: '15 Jul 2026 · 08:12 WIB',
      expandedContent: 'Menganalisis klaim berlebihan atau bias informasi. Algoritma A3CG menandai 9 temuan dengan kesenjangan tinggi antara fakta lapangan dan laporan korporasi.',
      stats: [
        { label: 'Claims Analysed', value: '127 Claims' },
        { label: 'Verified Claims', value: '118 Verified' },
        { label: 'Potential Greenwashing Findings', value: avgGap >= 3 ? '12 Findings' : '9 Findings' }
      ]
    },
    {
      title: 'Blockchain Verification',
      icon: <Database size={20} />,
      desc: 'Seluruh hasil asesmen dikunci menggunakan Blockchain agar tidak dapat dimanipulasi.',
      timestamp: '15 Jul 2026 · 08:13 WIB',
      expandedContent: 'Hasil verifikasi di-hash dan di-anchor ke jaringan Blockchain Hyperledger PRISMA. Struktur block yang immutable memastikan hasil audit ini tidak dapat diubah oleh pihak mana pun.',
      stats: [
        { label: 'Ledger Hash', value: company.hash ? company.hash.substring(0, 10) + '...' : '0x91A7...' },
        { label: 'Block Number', value: '#1,892,182' },
        { label: 'Network', value: 'PRISMA Private Ledger' }
      ]
    },
    {
      title: 'Regulatory Synchronization',
      icon: <Building2 size={20} />,
      desc: 'Hasil verifikasi disiapkan untuk regulator.',
      timestamp: '15 Jul 2026 · 08:13 WIB',
      expandedContent: 'Mengirimkan data hasil verifikasi ke sistem regulator secara aman menggunakan REST API terenkripsi mTLS untuk kepatuhan pelaporan emiten.',
      stats: [
        { label: 'OJK Sync', value: 'Ready', color: 'var(--green)' },
        { label: 'BEI Sync', value: 'Ready', color: 'var(--green)' },
        { label: 'PRISMA Registry', value: 'Synced', color: 'var(--green)' }
      ]
    },
    {
      title: 'Published',
      icon: <Globe size={20} />,
      desc: 'Laporan resmi dipublikasikan ke Dashboard PRISMA sehingga dapat diakses investor dan masyarakat.',
      timestamp: '15 Jul 2026 · 08:13 WIB',
      expandedContent: 'Hasil verifikasi dipublikasikan secara publik ke Dashboard PRISMA ESG. Investor, perbankan, dan masyarakat kini dapat mengakses profil kredibilitas emiten ini secara terbuka.',
      stats: [
        { label: 'Publication Date', value: '15 Jul 2026' },
        { label: 'Public Visibility', value: 'Public (All Users)' },
        { label: 'Credibility Score', value: company.score }
      ]
    }
  ];

  return (
    <div className="mat-timeline-wrapper mat-section-spacer">
      <style>{`
        .mat-timeline-container {
          max-width: 900px;
          margin: 0 auto;
          position: relative;
          padding: 24px 16px;
        }
        .mat-timeline-line {
          position: absolute;
          left: 36px;
          top: 80px;
          bottom: 240px;
          width: 3px;
          background: var(--line);
          z-index: 1;
        }
        .mat-timeline-line-fill {
          height: 100%;
          background: var(--green);
          width: 100%;
          transform-origin: top;
        }
        .mat-timeline-step-row {
          display: flex;
          gap: 24px;
          margin-bottom: 32px;
          position: relative;
          z-index: 2;
        }
        .mat-timeline-badge {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: var(--green);
          color: var(--white);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 10px rgba(47, 158, 107, 0.2);
          border: 4px solid var(--white);
          flex-shrink: 0;
          z-index: 3;
        }
        .mat-timeline-card {
          flex: 1;
          background: var(--white);
          border: 1px solid var(--line);
          border-radius: 16px;
          padding: 20px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .mat-timeline-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
          border-color: rgba(47, 158, 107, 0.3);
        }
        .mat-timeline-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 16px;
        }
        .mat-timeline-card-title {
          font-size: 15px;
          font-weight: 700;
          color: var(--ink);
        }
        .mat-timeline-card-desc {
          font-size: 13px;
          color: var(--muted);
          margin-top: 6px;
          line-height: 1.5;
        }
        .mat-timeline-card-time {
          font-size: 11px;
          color: var(--faint);
          font-family: var(--mono);
          margin-top: 8px;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .mat-timeline-grid-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
          gap: 12px;
          margin-top: 16px;
          padding-top: 16px;
          border-top: 1px dashed var(--line);
        }
        .mat-timeline-stat-box {
          background: #FAFAFB;
          border: 1px solid var(--line);
          border-radius: 8px;
          padding: 10px;
          font-size: 12px;
        }
        .mat-timeline-stat-lbl {
          color: var(--muted);
          font-size: 10px;
          margin-bottom: 4px;
        }
        .mat-timeline-stat-val {
          font-weight: 700;
          color: var(--ink);
        }
        @media (max-width: 768px) {
          .mat-timeline-container {
            padding: 16px 8px;
          }
          .mat-timeline-badge {
            width: 36px;
            height: 36px;
          }
          .mat-timeline-line {
            left: 32px;
          }
        }
      `}</style>

      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <h2 className="mat-card-title" style={{ textAlign: 'center', marginBottom: '8px' }}>Verification Timeline</h2>
        <p className="mat-card-subtitle" style={{ textAlign: 'center', marginBottom: '32px' }}>
          Visualisasi proses verifikasi Sustainability Report menggunakan Artificial Intelligence, Blockchain, serta validasi terhadap regulator sebelum dipublikasikan ke Dashboard PRISMA.
        </p>

        {/* TOP SUMMARY CARD */}
        <div 
          className="mat-overview-card"
          style={{ 
            maxWidth: '900px', 
            margin: '0 auto 40px auto', 
            padding: '20px 24px', 
            background: 'var(--white)', 
            border: '1px solid var(--line)', 
            borderRadius: '16px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '24px',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <div>
            <div style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Verification Progress</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
              <span className="mono" style={{ fontSize: '24px', fontWeight: '800', color: 'var(--green)' }}>100%</span>
              <span className="zone g" style={{ fontSize: '10px', padding: '2px 6px', borderRadius: '4px' }}>Completed</span>
            </div>
          </div>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Verification Time</div>
            <div className="mono" style={{ fontSize: '18px', fontWeight: '700', color: 'var(--ink)', marginTop: '8px' }}>2m 31s</div>
          </div>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>AI Confidence</div>
            <div className="mono" style={{ fontSize: '18px', fontWeight: '700', color: 'var(--ink)', marginTop: '8px' }}>98.6%</div>
          </div>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Blockchain Status</div>
            <span className="zone g" style={{ fontSize: '11px', fontWeight: '700', display: 'inline-block', marginTop: '8px', color: 'var(--green)', background: 'rgba(47, 158, 107, 0.1)', padding: '2px 8px', borderRadius: '4px' }}>
              Immutable
            </span>
          </div>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Published</div>
            <div style={{ fontSize: '15px', fontWeight: '700', color: 'var(--green)', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '8px' }}>
              <CheckCircle2 size={16} /> Yes
            </div>
          </div>
        </div>

        {/* TIMELINE CONTAINER */}
        <div className="mat-timeline-container">
          <div className="mat-timeline-line">
            <motion.div 
              className="mat-timeline-line-fill"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            />
          </div>

          {steps.map((step, idx) => {
            const isExpanded = !!expandedSteps[idx];
            return (
              <div key={idx} className="mat-timeline-step-row">
                <div className="mat-timeline-badge">
                  {step.icon}
                </div>

                <div 
                  className="mat-timeline-card"
                  onClick={() => toggleStep(idx)}
                >
                  <div className="mat-timeline-card-header">
                    <div style={{ flex: 1 }}>
                      <span className="mat-timeline-card-title">{step.title}</span>
                      <p className="mat-timeline-card-desc">{step.desc}</p>
                      <div className="mat-timeline-card-time">
                        <Clock size={12} />
                        {step.timestamp}
                      </div>
                    </div>
                    <div style={{ color: 'var(--muted)', display: 'flex', padding: '4px' }}>
                      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>
                  </div>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{ overflow: 'hidden' }}
                      >
                        <p style={{ fontSize: '13px', color: 'var(--ink)', lineHeight: '1.6', marginTop: '16px', background: '#FAFAFB', padding: '12px 16px', borderRadius: '8px', borderLeft: '3px solid var(--green)' }}>
                          {step.expandedContent}
                        </p>

                        {/* RENDER STATS GRID */}
                        {step.stats && (
                          <div className="mat-timeline-grid-stats">
                            {step.stats.map((s, sIdx) => (
                              <div key={sIdx} className="mat-timeline-stat-box">
                                <div className="mat-timeline-stat-lbl">{s.label}</div>
                                <div className="mat-timeline-stat-val" style={s.color ? { color: s.color } : {}}>{s.value}</div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* RENDER EVIDENCE SOURCES GRID FOR STEP 5 */}
                        {step.evidence && (
                          <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px dashed var(--line)' }}>
                            <div style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: '700', marginBottom: '8px' }}>Audited Sources</div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '8px' }}>
                              {step.evidence.map((ev, eIdx) => (
                                <div key={eIdx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', background: '#FAFAFB', border: '1px solid var(--line)', borderRadius: '6px', fontSize: '12px' }}>
                                  <span style={{ fontWeight: '600' }}>{ev.name}</span>
                                  <span className="zone g" style={{ fontSize: '9px', padding: '2px 4px', borderRadius: '3px', background: 'rgba(47, 158, 107, 0.1)', color: 'var(--green)' }}>{ev.status}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>

        {/* BOTTOM SUCCESS BANNER */}
        <div 
          className="mat-card-dashboard mat-section-spacer"
          style={{ 
            maxWidth: '600px', 
            margin: '40px auto 0 auto', 
            textAlign: 'center', 
            padding: '32px 24px', 
            background: 'rgba(47, 158, 107, 0.05)', 
            border: '1px solid rgba(47, 158, 107, 0.2)', 
            borderRadius: '24px' 
          }}
        >
          <div style={{ display: 'inline-flex', padding: '12px', borderRadius: '50%', background: 'rgba(47, 158, 107, 0.1)', color: 'var(--green)', marginBottom: '16px' }}>
            <CheckCircle2 size={48} />
          </div>
          <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--ink)', marginBottom: '8px' }}>Verification Completed</h3>
          <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: '1.6' }}>
            This Sustainability Report has successfully completed the PRISMA AI & Blockchain Verification Pipeline.
          </p>
        </div>
      </div>
    </div>
  );
}
