import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Shield, AlertTriangle, EyeOff, FileQuestion, Layers, 
  Target, Award, Key, Globe, Database, Cpu, Activity,
  Users, CheckCircle, Info
} from 'lucide-react';
import { companies } from '../data/companies';

// Animated Counter component that starts counting when it enters the viewport
function AnimatedCounter({ value, duration = 1.5, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      // Extract number from value (e.g. "862+" -> 862, "15,420+" -> 15420, "98.4%" -> 98.4)
      const numString = value.toString().replace(/[^0-9.]/g, '');
      const isFloat = numString.includes('.');
      const end = parseFloat(numString);
      
      if (isNaN(end) || start === end) return;

      const totalMilliseconds = duration * 1000;
      const startTime = performance.now();

      const updateCount = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / totalMilliseconds, 1);
        
        // Easing out function
        const easeOutQuad = progress * (2 - progress);
        const currentCount = easeOutQuad * (end - start) + start;
        
        if (isFloat) {
          setCount(parseFloat(currentCount.toFixed(1)));
        } else {
          setCount(Math.floor(currentCount));
        }

        if (progress < 1) {
          requestAnimationFrame(updateCount);
        } else {
          setCount(end);
        }
      };

      requestAnimationFrame(updateCount);
    }
  }, [isInView, value, duration]);

  // Determine suffix/prefix from the original value (like "%", "+")
  const displaySuffix = suffix || value.toString().replace(/[0-9.,]/g, '');
  
  // Format counter value (keep decimal point if it is a float)
  const formattedCount = count.toLocaleString('id-ID');

  return (
    <span ref={ref} className="about-impact-number">
      {formattedCount}{displaySuffix}
    </span>
  );
}

export default function Methodology() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  return (
    <div className="about-page">
      {/* 1. Hero Section */}
      <motion.section 
        className="about-hero"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
      >
        <div className="about-hero-badge">
          <Shield size={14} />
          ESG Intelligence Platform
        </div>
        <h1 className="about-hero-title">
          Building Trust Through<br />ESG Intelligence
        </h1>
        <p className="about-hero-desc">
          PRISMA hadir untuk mendefinisikan ulang pengawasan ESG di Indonesia. 
          Kami menganalisis, memverifikasi, dan memberikan penilaian kredibilitas keberlanjutan 
          secara independen berbasis kecerdasan buatan, blockchain, dan satelit real-time.
        </p>
        <Link to="/ranking" className="about-hero-cta">
          Explore Rankings
          <ArrowRight size={18} />
        </Link>
      </motion.section>

      {/* 2. Why PRISMA Exists */}
      <motion.section 
        className="about-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
      >
        <div className="about-why-layout">
          {/* Problems */}
          <div className="about-problems-grid">
            <div className="about-problem-card">
              <div className="about-problem-icon">
                <AlertTriangle size={20} />
              </div>
              <h4 className="about-problem-title">Greenwashing</h4>
              <p className="about-problem-desc">
                Banyak perusahaan mempercantik laporan ESG tanpa bukti nyata dari aktivitas keberlanjutannya.
              </p>
            </div>

            <div className="about-problem-card">
              <div className="about-problem-icon">
                <EyeOff size={20} />
              </div>
              <h4 className="about-problem-title">Lack of Transparency</h4>
              <p className="about-problem-desc">
                Metodologi penilaian tertutup menyulitkan publik memverifikasi kebenaran penilaian ESG.
              </p>
            </div>

            <div className="about-problem-card">
              <div className="about-problem-icon">
                <FileQuestion size={20} />
              </div>
              <h4 className="about-problem-title">Difficult Evaluation</h4>
              <p className="about-problem-desc">
                Perbedaan standar ESG yang kompleks membingungkan pelaku pasar dalam menilai keberlanjutan.
              </p>
            </div>

            <div className="about-problem-card">
              <div className="about-problem-icon">
                <Layers size={20} />
              </div>
              <h4 className="about-problem-title">Information Fragmentation</h4>
              <p className="about-problem-desc">
                Data emisi dan klaim sosial tersebar di ratusan kanal publik tanpa validasi terintegrasi.
              </p>
            </div>
          </div>

          {/* Solution Description */}
          <div className="about-why-solution">
            <div className="about-solution-tag">The Solution</div>
            <h3>Bagaimana PRISMA Menjawab Tantangan Ini</h3>
            <p>
              PRISMA hadir bukan untuk menggantikan proses rating konvensional, melainkan 
              mengaudit **kejujuran dan kredibilitas** setiap klaim keberlanjutan. Kami menyatukan 
              potongan data yang berserakan menjadi satu skor transparansi terpercaya.
            </p>
            <div className="about-solution-bullets">
              <div className="about-solution-bullet">
                <CheckCircle size={18} className="about-solution-bullet-check" />
                <div>
                  <div className="about-solution-bullet-text">Audit Independen Berbasis Bukti</div>
                  <div className="about-solution-bullet-desc">Menarik emisi satelit dan sanksi KLHK secara otomatis tanpa mengandalkan data internal emiten saja.</div>
                </div>
              </div>
              <div className="about-solution-bullet">
                <CheckCircle size={18} className="about-solution-bullet-check" />
                <div>
                  <div className="about-solution-bullet-text">Metodologi Terbuka Penuh</div>
                  <div className="about-solution-bullet-desc">Seluruh kriteria penilaian dapat diakses oleh publik untuk memastikan keadilan prosedural.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 3. Vision & Mission */}
      <motion.section 
        className="about-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="about-section-header">
          <h2 className="about-section-title">Visi & Misi Kami</h2>
          <p className="about-section-subtitle">
            Arah dan komitmen kami dalam membangun pasar modal Indonesia yang lebih transparan dan bertanggung jawab.
          </p>
        </div>
        <div className="about-vm-grid">
          <motion.div className="about-glass-card about-vm-card" variants={fadeInUp}>
            <div className="about-vm-header">
              <div className="about-vm-icon">
                <Target size={24} />
              </div>
              <h3 className="about-vm-title">Visi</h3>
            </div>
            <p className="about-vm-desc">
              Menjadi pilar utama transparansi ESG di Asia Tenggara, menciptakan ekosistem pasar modal 
              di mana setiap klaim hijau didasari oleh integritas ilmiah dan dapat dipertanggungjawabkan sepenuhnya.
            </p>
          </motion.div>

          <motion.div className="about-glass-card about-vm-card" variants={fadeInUp}>
            <div className="about-vm-header">
              <div className="about-vm-icon">
                <Award size={24} />
              </div>
              <h3 className="about-vm-title">Misi</h3>
            </div>
            <p className="about-vm-desc">
              Menyediakan platform pemantauan ESG yang objektif dengan memanfaatkan teknologi AI, satelit, 
              dan blockchain guna membantu investor meminimalkan risiko greenwashing serta memacu korporasi 
              menjalankan aksi keberlanjutan yang sesungguhnya.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* 4. Core Values */}
      <motion.section 
        className="about-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="about-section-header">
          <h2 className="about-section-title">Nilai-Nilai Utama</h2>
          <p className="about-section-subtitle">
            Nilai fundamental yang mendasari setiap proses verifikasi, audit, dan publikasi di platform PRISMA.
          </p>
        </div>
        <div className="about-values-grid">
          <motion.div className="about-glass-card about-value-card" variants={fadeInUp}>
            <div className="about-value-icon">
              <Shield size={24} />
            </div>
            <h4 className="about-value-title">Transparency</h4>
            <p className="about-value-desc">
              Membuka metodologi pengujian, sumber data, dan pembobotan secara penuh bagi publik.
            </p>
          </motion.div>

          <motion.div className="about-glass-card about-value-card" variants={fadeInUp}>
            <div className="about-value-icon">
              <CheckCircle size={24} />
            </div>
            <h4 className="about-value-title">Integrity</h4>
            <p className="about-value-desc">
              Bekerja secara independen sebagai auditor kredibilitas, bebas dari intervensi emiten maupun pihak ketiga.
            </p>
          </motion.div>

          <motion.div className="about-glass-card about-value-card" variants={fadeInUp}>
            <div className="about-value-icon">
              <Cpu size={24} />
            </div>
            <h4 className="about-value-title">Innovation</h4>
            <p className="about-value-desc">
              Terus mengembangkan model FinBERT-ESG, cross-check blockchain, dan audit satelit termutakhir.
            </p>
          </motion.div>

          <motion.div className="about-glass-card about-value-card" variants={fadeInUp}>
            <div className="about-value-icon">
              <Users size={24} />
            </div>
            <h4 className="about-value-title">Collaboration</h4>
            <p className="about-value-desc">
              Menghubungkan OJK, IDX/BEI, emiten, dan publik demi mempercepat transisi net-zero nasional.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* 5. How PRISMA Works */}
      <motion.section 
        className="about-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
      >
        <div className="about-section-header">
          <h2 className="about-section-title">Bagaimana PRISMA Bekerja</h2>
          <p className="about-section-subtitle">
            Alur verifikasi otomatis berstandar tinggi untuk menghasilkan skor kredibilitas ESG emiten.
          </p>
        </div>
        <div className="about-flow-container">
          <div className="about-flow-line" />
          
          <div className="about-flow-step">
            <div className="about-flow-number">1</div>
            <h4 className="about-flow-title">Collect ESG Reports</h4>
            <p className="about-flow-desc">
              Mengumpulkan laporan keberlanjutan tahunan emiten secara real-time langsung dari IDX/BEI.
            </p>
          </div>

          <div className="about-flow-step">
            <div className="about-flow-number">2</div>
            <h4 className="about-flow-title">AI Analysis</h4>
            <p className="about-flow-desc">
              Model FinBERT-ESG memindai teks, sentimen klaim, serta mendeteksi potensi assurance-washing.
            </p>
          </div>

          <div className="about-flow-step">
            <div className="about-flow-number">3</div>
            <h4 className="about-flow-title">Evidence Verification</h4>
            <p className="about-flow-desc">
              Cross-check data emisi satelit (Climate TRACE) dan histori sanksi hukum dari regulator lingkungan.
            </p>
          </div>

          <div className="about-flow-step">
            <div className="about-flow-number">4</div>
            <h4 className="about-flow-title">Credibility Score</h4>
            <p className="about-flow-desc">
              Penerbitan skor kejujuran klaim (0–100) dan pencatatan hash data pada ledger blockchain.
            </p>
          </div>
        </div>
      </motion.section>

      {/* 6. Technology Highlights */}
      <motion.section 
        className="about-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="about-section-header">
          <h2 className="about-section-title">Sorotan Teknologi</h2>
          <p className="about-section-subtitle">
            Infrastruktur teknologi canggih yang menjamin objektivitas dan kekuatan analisis platform kami.
          </p>
        </div>
        <div className="about-tech-grid">
          <motion.div className="about-glass-card about-tech-card" variants={fadeInUp}>
            <div className="about-tech-icon">
              <Cpu size={22} />
            </div>
            <h4 className="about-tech-title">Artificial Intelligence</h4>
            <p className="about-tech-desc">
              Menggunakan FinBERT-ESG dan Retrieval-Augmented Generation (RAG) untuk membandingkan komitmen tertulis dengan realisasi finansial emiten.
            </p>
          </motion.div>

          <motion.div className="about-glass-card about-tech-card" variants={fadeInUp}>
            <div className="about-tech-icon">
              <Key size={22} />
            </div>
            <h4 className="about-tech-title">Blockchain</h4>
            <p className="about-tech-desc">
              Mengamankan integritas data dengan hashing proof-of-state di ledger terdistribusi, memastikan catatan historis emisi tidak dapat dimanipulasi secara retroaktif.
            </p>
          </motion.div>

          <motion.div className="about-glass-card about-tech-card" variants={fadeInUp}>
            <div className="about-tech-icon">
              <Globe size={22} />
            </div>
            <h4 className="about-tech-title">Satellite Intelligence</h4>
            <p className="about-tech-desc">
              Integrasi sensor satelit multispektral Climate TRACE untuk mendeteksi anomali karbon dan emisi gas rumah kaca langsung dari fasilitas pabrik emiten.
            </p>
          </motion.div>

          <motion.div className="about-glass-card about-tech-card" variants={fadeInUp}>
            <div className="about-tech-icon">
              <Database size={22} />
            </div>
            <h4 className="about-tech-title">Market Intelligence</h4>
            <p className="about-tech-desc">
              Menghubungkan indikator risiko pasar modal, likuiditas hijau, dan bobot POJK 51/2017 secara real-time ke dalam sistem scoring.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* 7. Impact Statistics */}
      <motion.section 
        className="about-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="about-section-header">
          <h2 className="about-section-title">Dampak & Jangkauan Platform</h2>
          <p className="about-section-subtitle">
            Skala pemantauan independen kami untuk mendorong transparansi pasar modal Indonesia.
          </p>
        </div>
        <div className="about-impact-grid">
          <motion.div className="about-glass-card about-impact-card" variants={fadeInUp}>
            <AnimatedCounter value={`${companies.length}+`} />
            <div className="about-impact-label">Companies Covered</div>
          </motion.div>

          <motion.div className="about-glass-card about-impact-card" variants={fadeInUp}>
            <AnimatedCounter value="15,420+" />
            <div className="about-impact-label">ESG Reports Audited</div>
          </motion.div>

          <motion.div className="about-glass-card about-impact-card" variants={fadeInUp}>
            <AnimatedCounter value="98.4%" />
            <div className="about-impact-label">Verified Claims</div>
          </motion.div>

          <motion.div className="about-glass-card about-impact-card" variants={fadeInUp}>
            <AnimatedCounter value="24" suffix="/7" />
            <div className="about-impact-label">Data Sources Active</div>
          </motion.div>
        </div>
      </motion.section>

      {/* 8. Call To Action (CTA) */}
      <motion.section 
        className="about-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
      >
        <div className="about-cta-banner">
          <h2 className="about-cta-title">Together We Build Sustainable Transparency</h2>
          <p className="about-cta-desc">
            Mari dukung ekosistem investasi yang bebas greenwashing. Telusuri papan peringkat emiten 
            atau saksikan peta persebaran kredibilitas industri di Indonesia.
          </p>
          <div className="about-cta-buttons">
            <Link to="/ranking" className="about-btn-primary">
              View Rankings
              <ArrowRight size={16} />
            </Link>
            <Link to="/map" className="about-btn-secondary">
              Explore Map
              <Globe size={16} />
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
