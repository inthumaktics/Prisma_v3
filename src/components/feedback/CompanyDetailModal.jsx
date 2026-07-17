import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Shield, AlertTriangle, HelpCircle, X, Download, Eye, FileText, Database, Activity, Globe, Award, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { zoneOf, zName, sColor } from '../../data/companies';
import { useApp } from '../../context/AppContext';

const AI_SUMMARIES = {
  GTEN: "GTEN menunjukkan integritas data ESG yang sangat kuat. Verifikasi satelit mengonfirmasi penurunan intensitas emisi sebesar 12% pada tahun 2024 dan kelanjutan program restorasi lahan pasca-pemboran secara patuh.",
  ESBR: "ESBR secara konsisten memperluas kapasitas PLTS miliknya sesuai laporan publik. Penggunaan tenaga kerja lokal terbukti penuh, namun rencana efisiensi konsumsi air masih berada dalam tahap retoris awal.",
  BHSN: "BHSN berhasil mengintegrasikan pembiayaan sektor hijau sebesar 24% sesuai target Rencana Aksi Keuangan Berkelanjutan (RAKB). Meskipun demikian, perhitungan emisi Scope 3 portofolio pembiayaan belum terungkap sepenuhnya.",
  KSHT: "KSHT menunjukkan komitmen kemasan daur ulang 60%, namun audit menemukan adanya klaim pengurangan konsumsi air yang belum terbukti secara penuh. Investigasi rantai pasokan bebas deforestasi masih berstatus divergen.",
  TDNU: "TDNU secara efektif merealisasikan program efisiensi energi di pusat data utama serta memperluas jangkauan digital inklusif. Namun, transparansi penanganan limbah elektronik masih minim data pendukung.",
  FRSH: "FRSH menunjukkan pengelolaan limbah B3 yang aman dan prosedur uji etis laboratorium yang memadai. Sayangnya, data satelit mendeteksi kenaikan emisi karbon operasional di atas batas yang dilaporkan.",
  AGPN: "AGPN memiliki inisiatif pertanian regeneratif yang baik di beberapa wilayah binaan. Namun, pemantauan satelit mendeteksi adanya aktivitas konversi lahan hutan yang bertentangan dengan kebijakan nol-deforestasi perusahaan.",
  RMBS: "RMBS telah mengimplementasikan pengurangan plastik sekali pakai secara efektif di jaringan ritelnya. Meskipun demikian, bukti audit untuk rantai pasokan hijau masih sangat terbatas dan belum terverifikasi pihak ketiga.",
  PHAB: "PHAB berhasil memperoleh sertifikasi bangunan hijau untuk sebagian besar proyek barunya. Namun, efisiensi konsumsi energi bangunan terindikasi dilebihkan dari kenyataan sebenarnya di lapangan.",
  TXWN: "TXWN memiliki masalah kepatuhan serius terkait pengolahan air limbah tekstil berdasarkan catatan sanksi KLHK terbaru. Pengurangan penggunaan zat pewarna kimia berbahaya juga belum terbukti.",
  PTAG: "PTAG menghadapi tantangan kredibilitas setelah data satelit menunjukkan tingkat emisi yang bertolak belakang dengan klaim penurunan. Selain itu, rencana implementasi teknologi bersih belum didukung anggaran yang konkret.",
  BUPD: "BUPD mencatatkan emisi gas rumah kaca Scope 1 yang berada signifikan di atas laporan keberlanjutan mereka. Program rehabilitasi lingkungan tambang terbukti masih berupa klaim naratif tanpa bukti lapangan.",
  KRJY: "KRJY terdeteksi melakukan aktivitas penebangan hutan di wilayah lindung yang dibantah oleh citra satelit independen. Sanksi administrasi dari KLHK sebelumnya juga sengaja tidak diungkapkan kepada publik.",
  NTMK: "NTMK memiliki gap kepatuhan yang besar terkait pembuangan tailing tambang nikel yang melanggar ketentuan KLHK. Reklamasi lahan bekas tambang juga belum menunjukkan bukti fisik yang terverifikasi.",
  BEPR: "BEPR mengklaim komitmen transisi energi tanpa alokasi anggaran modal yang jelas. Audit mendeteksi adanya indikasi klaim ganda atas unit kredit karbon yang mereka perdagangkan.",
  SLNU: "SLNU teridentifikasi memiliki titik api kebakaran lahan di konsesi perkebunan kelapa sawit mereka berdasarkan pemantauan satelit real-time. Sertifikasi ISPO/RSPO juga belum mencakup keseluruhan wilayah operasional."
};

const claimStatus = { 
  ok: ['Terverifikasi', 'ok'], 
  div: ['Divergen', 'div'], 
  ret: ['Retoris', 'ret'] 
};

export default function CompanyDetailModal({ company: d, isOpen, onClose }) {
  const modalRef = useRef(null);
  const { showToast } = useApp();
  const navigate = useNavigate();

  // Prevent scroll on body
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Focus trap
  useEffect(() => {
    if (!isOpen || !modalRef.current) return;
    const focusable = modalRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    const handleTab = (e) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          last.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === last) {
          first.focus();
          e.preventDefault();
        }
      }
    };

    first.focus();
    window.addEventListener('keydown', handleTab);
    return () => window.removeEventListener('keydown', handleTab);
  }, [isOpen]);

  if (!d) return null;

  const z = zoneOf(d.score);
  const c = sColor(d.score);
  const aiSummary = AI_SUMMARIES[d.tk] || "Data analitik AI PRISMA sedang diproses untuk emiten ini.";

  const EXISTING_REPORTS = ['GTEN', 'ESBR', 'BHSN', 'KSHT'];
  const hasSpecificReport = EXISTING_REPORTS.includes(d.tk);
  const downloadUrl = hasSpecificReport 
    ? `/reports/${d.tk.toLowerCase()}-report.pdf` 
    : '/reports/default-report.pdf';
  const downloadName = `${d.tk}-Sustainability-Report-2024.pdf`;

  const handleDownloadClick = () => {
    if (!hasSpecificReport) {
      showToast("Sample sustainability report downloaded.");
    }
  };

  const getMetricIcon = (label) => {
    if (label.includes('Emisi')) return <Globe size={15} />;
    if (label.includes('Kepatuhan')) return <Award size={15} />;
    return <Activity size={15} />;
  };

  const gc = v => v < 20 ? 'var(--green)' : v < 35 ? 'var(--amber)' : 'var(--red)';

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="cd-modal-wrapper" role="dialog" aria-modal="true" aria-labelledby="cd-modal-title">
          {/* Backdrop Blur Overlay */}
          <motion.div 
            className="cd-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div 
            className="cd-modal-container"
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          >
            {/* Close Button */}
            <button className="cd-modal-close" onClick={onClose} aria-label="Tutup Dialog">
              <X size={18} />
            </button>

            {/* HEADER */}
            <div className="cd-modal-header">
              <div className="cd-header-left">
                <div className="logo-sq cd-logo" style={{ background: d.col }}>
                  {d.ini}
                </div>
                <div className="cd-header-info">
                  <div className="cd-tk-row">
                    <span className="cd-ticker">{d.tk}</span>
                    <span className="cd-sector-badge">{d.sec}</span>
                  </div>
                  <h2 id="cd-modal-title" className="cd-title">{d.nm}</h2>
                  <div className="cd-verification-status">
                    <span className="cd-verified-dot" />
                    PRISMA VERIFIED · BEI RECORDED
                  </div>
                </div>
              </div>
              <div className="cd-header-right">
                <div className="cd-score-display">
                  <div className="cd-score-val" style={{ color: c }}>{d.score}</div>
                  <div className="cd-score-max">/100</div>
                </div>
                <span className={`zone ${z} cd-zone-pill`}>
                  <span className="d" />
                  Zona {zName[z]}
                </span>
              </div>
            </div>

            {/* BODY */}
            <div className="cd-modal-body">
              {/* Left Column: Materiality & Gaps */}
              <div className="cd-body-left">
                {/* ESG Gaps */}
                <div className="cd-section">
                  <h3 className="cd-section-title">Kesenjangan Kredibilitas (Double Materiality)</h3>
                  <div className="cd-gap-box">
                    {/* Financial Gap */}
                    <div className="cd-gap-item">
                      <div className="cd-gap-label-row">
                        <span className="cd-gap-name">Gap Materialitas Finansial <small>(outside-in)</small></span>
                        <span className="cd-gap-value" style={{ color: gc(d.fin) }}>{d.fin}% ±{d.conf}%</span>
                      </div>
                      <div className="cd-gap-bar-container">
                        <div className="cd-gap-bar" style={{ width: `${d.fin}%`, background: gc(d.fin) }} />
                        <span className="cd-gap-ci" style={{ left: `${Math.max(0, d.fin - d.conf)}%`, width: `${d.conf * 2}%` }} />
                      </div>
                      <p className="cd-gap-desc">Klaim risiko/peluang finansial vs realitas — diuji thd sinyal pasar & kepatuhan IDX/OJK.</p>
                    </div>

                    {/* Impact Gap */}
                    <div className="cd-gap-item">
                      <div className="cd-gap-label-row">
                        <span className="cd-gap-name">Gap Materialitas Dampak <small>(inside-out)</small></span>
                        <span className="cd-gap-value" style={{ color: gc(d.imp) }}>{d.imp}% ±{d.conf}%</span>
                      </div>
                      <div className="cd-gap-bar-container">
                        <div className="cd-gap-bar" style={{ width: `${d.imp}%`, background: gc(d.imp) }} />
                        <span className="cd-gap-ci" style={{ left: `${Math.max(0, d.imp - d.conf)}%`, width: `${d.conf * 2}%` }} />
                      </div>
                      <p className="cd-gap-desc">Klaim dampak lingkungan/sosial vs realitas — diuji thd satelit Climate TRACE & sanksi KLHK.</p>
                    </div>
                  </div>
                </div>

                {/* AI Summary */}
                <div className="cd-section">
                  <h3 className="cd-section-title">Ringkasan AI Auditing</h3>
                  <div className="cd-ai-box">
                    <Shield size={16} className="cd-ai-icon" />
                    <p className="cd-ai-text">{aiSummary}</p>
                  </div>
                </div>

                {/* External Evidence Sources */}
                <div className="cd-section">
                  <h3 className="cd-section-title">Sumber Bukti Eksternal</h3>
                  <div className="cd-evidence-grid">
                    {[
                      ['Climate TRACE', 'Emisi satelit resolusi fasilitas, independen.', <><circle cx="8" cy="8" r="2" key="1" /><path d="M8 1v2M8 13v2M1 8h2M13 8h2" key="2" /></>],
                      ['Sanksi KLHK', 'Rekam jejak sanksi lingkungan resmi.', <path d="M8 1.5l5 2v4c0 3-2 5.5-5 6.5-3-1-5-3.5-5-6.5v-4z" key="1" />],
                      ['Sinyal IDX/OJK', 'Data pasar & status kepatuhan.', <path d="M2 13V9M6 13V4M10 13V7M14 13v-3" key="1" />],
                      ['Teks Laporan', 'Klaim diklasifikasi FinBERT-ESG + A3CG.', <path d="M8 1v14M3 4l5-3 5 3" key="1" />],
                    ].map(([name, desc, icon]) => (
                      <div className="cd-evidence-card" key={name}>
                        <div className="cd-evidence-header">
                          <span className="cd-evidence-icon">
                            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="var(--teal)" strokeWidth="1.6">{icon}</svg>
                          </span>
                          <span className="cd-evidence-name">{name}</span>
                        </div>
                        <p className="cd-evidence-desc">{desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Claims & Metrics */}
              <div className="cd-body-right">
                {/* Verified Claims */}
                <div className="cd-section">
                  <h3 className="cd-section-title">Verifikasi Klaim Utama</h3>
                  <div className="cd-claims-list">
                    {d.claims.map(([text, st], i) => (
                      <div className="cd-claim-card" key={i}>
                        <p className="cd-claim-text">"{text}"</p>
                        <span className={`cst ${claimStatus[st][1]} cd-claim-status`}>
                          {claimStatus[st][0]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key ESG Metrics */}
                <div className="cd-section">
                  <h3 className="cd-section-title">Metrik Utama ESG</h3>
                  <div className="cd-metrics-box">
                    {[
                      { label: 'Emisi Karbon Operasional', value: `${(d.em || 1.1).toFixed(1)}M tCO2e`, desc: 'Jumlah total emisi karbon setahun' },
                      { label: 'Indeks Kepatuhan Lingkungan', value: `${100 - d.imp}%`, desc: 'Kesesuaian dengan regulasi KLHK' },
                      { label: 'Rasio Keuangan Berkelanjutan', value: `${d.fin > 30 ? '34.8%' : '65.2%'}`, desc: 'Alokasi portofolio pembiayaan hijau' }
                    ].map((m) => (
                      <div className="cd-metric-row" key={m.label}>
                        <div className="cd-metric-icon-wrapper">
                          {getMetricIcon(m.label)}
                        </div>
                        <div className="cd-metric-info">
                          <div className="cd-metric-label-row">
                            <span className="cd-metric-label">{m.label}</span>
                            <span className="cd-metric-value">{m.value}</span>
                          </div>
                          <span className="cd-metric-desc">{m.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* DOUBLE MATERIALITY ASSESSMENT SECTION */}
            <div className="cd-assessment-section">
              <div className="cd-assessment-card">
                <h3 className="cd-assessment-title">Double Materiality Assessment</h3>
                <p className="cd-assessment-subtitle">
                  Penilaian dua arah berdasarkan kerangka Double Materiality untuk memverifikasi kredibilitas Sustainability Report perusahaan.
                </p>
                <div className="cd-assessment-grid">
                  <div className="cd-summary-card">
                    <span className="cd-summary-label">Impact Materiality</span>
                    <span className="cd-summary-val">--</span>
                    <span className="cd-summary-desc">Inside-Out Assessment</span>
                  </div>
                  <div className="cd-summary-card">
                    <span className="cd-summary-label">Financial Materiality</span>
                    <span className="cd-summary-val">--</span>
                    <span className="cd-summary-desc">Outside-In Assessment</span>
                  </div>
                  <div className="cd-summary-card">
                    <span className="cd-summary-label">Credibility Gap</span>
                    <span className="cd-summary-val">--</span>
                    <span className="cd-summary-desc">Waiting for Assessment</span>
                  </div>
                  <div className="cd-summary-card">
                    <span className="cd-summary-label">Assessment Status</span>
                    <div className="cd-summary-badge-wrapper">
                      <span className="cd-badge-gray">Not Calculated</span>
                    </div>
                    <span className="cd-summary-desc">Waiting for Assessment</span>
                  </div>
                </div>
                <div className="cd-assessment-btn-wrapper">
                  <button 
                    onClick={() => {
                      navigate(`/company/${d.tk}/materiality`);
                      onClose();
                    }} 
                    className="btn-prisma-green"
                  >
                    <BarChart3 size={16} />
                    <span>Open Double Materiality Assessment</span>
                  </button>
                </div>
              </div>
            </div>

            {/* DOWNLOAD SECTION (HIGHLIGHTED) */}
            <div className="cd-download-section">
              <div className="cd-download-info">
                <FileText className="cd-download-icon" />
                <div>
                  <h4 className="cd-download-title">Laporan Keberlanjutan</h4>
                  <p className="cd-download-desc">Unduh laporan keberlanjutan resmi perusahaan yang telah terindeks secara lengkap di platform PRISMA (simulasi).</p>
                </div>
              </div>
              <a 
                href={downloadUrl} 
                download={downloadName} 
                onClick={handleDownloadClick} 
                className="cd-download-btn"
              >
                <Download size={15} />
                <span>Download Laporan Keberlanjutan</span>
              </a>
            </div>

            {/* FOOTER */}
            <div className="cd-modal-footer">
              <button className="cd-btn-secondary" onClick={onClose}>
                Tutup
              </button>
              <a 
                href={downloadUrl} 
                download={downloadName} 
                onClick={handleDownloadClick} 
                className="cd-btn-primary"
              >
                <Download size={14} />
                <span>Download Laporan</span>
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
