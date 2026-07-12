import { useNavigate } from 'react-router-dom';
import { Shield, Target, Database, Eye, TrendingUp, Users, BarChart3, Leaf } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { companies } from '../data/companies';

export default function Landing() {
  const navigate = useNavigate();
  const { showToast } = useApp();

  const avg = Math.round(companies.reduce((a, d) => a + d.score, 0) / companies.length);

  return (
    <div className="landing-v3">
      {/* Hero Section */}
      <section className="hero-v3">
        <div className="hero-v3-content">
          <div className="hero-v3-left">
            <div className="hero-v3-badge">
              <Shield size={12} />
              Berizin OJK • Terintegrasi IDX/BEI
            </div>
            <h1 className="hero-v3-title">
              Kejujuran yang Terverifikasi.
            </h1>
            <p className="hero-v3-subtitle">
              PRISMA memeringkat pasar modal Indonesia menurut kredibilitas klaim ESG-nya — memverifikasi laporan terhadap bukti eksternal, bukan sekadar narasi perusahaan.
            </p>
            <div className="hero-v3-cta">
              <button className="btn-v3 btn-v3-primary" onClick={() => navigate('/ranking')}>
                Lihat Peringkat
              </button>
              <button className="btn-v3 btn-v3-secondary" onClick={() => navigate('/metodologi')}>
                Pelajari Metodologi
              </button>
            </div>
          </div>
          <div className="hero-v3-right">
            <HeroIllustration />
          </div>
        </div>
      </section>

      {/* KPI Stats */}
      <section className="kpi-strip">
        <div className="kpi-strip-container">
          <StatCard icon={<Users />} number={companies.length} label="Emiten Terverifikasi" />
          <StatCard icon={<TrendingUp />} number={avg} label="Skor ESG Rata-rata" />
          <StatCard icon={<Shield />} number="100%" label="Blockchain-Verified" />
          <StatCard icon={<BarChart3 />} number="1.2M+" label="Data Points Analyzed" />
        </div>
      </section>

      {/* About PRISMA */}
      <section className="section-v3">
        <div className="container-v3">
          <div className="section-header-v3">
            <span className="section-label-v3">Tentang PRISMA</span>
            <h2 className="section-title-v3">Lembaga Verifikasi Kredibilitas ESG Independen</h2>
            <p className="section-desc-v3">
              Sebuah lembaga verifikasi kredibilitas ESG independen — diposisikan seperti lembaga pemeringkat efek (PEFINDO), namun yang dinilai bukan kemampuan bayar utang, melainkan kejujuran klaim keberlanjutan.
            </p>
          </div>

          <div className="values-grid">
            <ValueCard 
              icon={<Shield />}
              title="Independen"
              description="Berdiri di luar emiten, IDX, dan OJK; wajib berizin OJK. Yang menilai tidak boleh dinilai."
            />
            <ValueCard 
              icon={<Target />}
              title="Terukur"
              description={<>Menghitung <strong>Kesenjangan Kredibilitas</strong> — jarak klaim vs realitas — pada dua sumbu materialitas: finansial & dampak.</>}
            />
            <ValueCard 
              icon={<Database />}
              title="Berbasis Bukti"
              description="AI membandingkan klaim dengan citra satelit Climate TRACE & sanksi KLHK; blockchain menjamin integritas datanya."
            />
            <ValueCard 
              icon={<Eye />}
              title="Untuk Publik"
              description="Skor 0–100 tayang terbuka di sistem keterbukaan informasi BEI dan menjadi prioritas pengawasan OJK."
            />
          </div>
        </div>
      </section>

      {/* How PRISMA Works */}
      <section className="section-v3 section-v3-alt">
        <div className="container-v3">
          <div className="section-header-v3">
            <span className="section-label-v3">Cara Kerja</span>
            <h2 className="section-title-v3">Dari klaim menuju kepercayaan</h2>
          </div>

          <div className="timeline-v3">
            <TimelineStep 
              number="01"
              title="Tarik bukti eksternal"
              description="Laporan emiten + emisi satelit + rekam sanksi ditarik tanpa meminta data dari perusahaan."
            />
            <TimelineStep 
              number="02"
              title="Kunci integritas"
              description="Setiap data di-hash & di-timestamp pada ledger; tak bisa diubah, tak ada perhitungan ganda."
            />
            <TimelineStep 
              number="03"
              title="Ukur kesenjangan"
              description="AI mengukur gap finansial & gap dampak sekaligus, lengkap dengan tingkat keyakinan."
            />
            <TimelineStep 
              number="04"
              title="Terbitkan skor"
              description="ESG Credibility Score publik menggerakkan investor & pengawasan berbasis risiko OJK."
            />
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
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
              <PreviewBox 
                title="Dashboard Pasar"
                desc="KPI, tren, dan distribusi kredibilitas pasar"
                onClick={() => navigate('/dashboard')}
              />
              <PreviewBox 
                title="Peringkat Emiten"
                desc="Ranking lengkap berdasarkan skor kredibilitas"
                onClick={() => navigate('/ranking')}
              />
              <PreviewBox 
                title="Peta Emisi"
                desc="Visualisasi emisi fasilitas dari satelit"
                onClick={() => navigate('/map')}
              />
              <PreviewBox 
                title="Kredit Karbon"
                desc="Registry blockchain untuk cegah double-counting"
                onClick={() => navigate('/carbon')}
              />
            </div>
            <button className="btn-v3 btn-v3-primary" onClick={() => navigate('/dashboard')}>
              Buka Dashboard
            </button>
          </div>
        </div>
      </section>

      {/* Educational Articles Preview */}
      <section className="section-v3 section-v3-alt">
        <div className="container-v3">
          <div className="section-header-v3">
            <span className="section-label-v3">Edukasi</span>
            <h2 className="section-title-v3">Pahami ESG & kredibilitas</h2>
            <p className="section-desc-v3">
              Artikel, video, dan panduan untuk memahami verifikasi kredibilitas ESG.
            </p>
          </div>

          <div className="edu-preview-grid">
            <EduCard 
              title="Apa itu greenwashing?"
              category="Dasar"
              time="4 mnt"
            />
            <EduCard 
              title="Cara membaca skor kredibilitas"
              category="Panduan"
              time="5 mnt"
            />
            <EduCard 
              title="Double materiality dalam 5 menit"
              category="Konsep"
              time="5 mnt"
            />
          </div>

          <div style={{ textAlign: 'center', marginTop: 32 }}>
            <button className="btn-v3 btn-v3-secondary" onClick={() => navigate('/literasi')}>
              Lihat Semua Artikel
            </button>
          </div>
        </div>
      </section>

      {/* Methodology Summary */}
      <section className="section-v3">
        <div className="container-v3">
          <div className="meth-banner">
            <div>
              <span className="section-label-v3" style={{ color: 'var(--gold)' }}>Metodologi</span>
              <h2 className="section-title-v3" style={{ color: '#fff', marginTop: 12 }}>
                Empat langkah, delapan prinsip berkelanjutan
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.85)', marginTop: 12, maxWidth: '54ch' }}>
                Metodologi PRISMA mengikuti prinsip POJK 51/2017 tentang pembiayaan berkelanjutan dan standar PSPK 1 & 2.
              </p>
              <button 
                className="btn-v3 btn-v3-light" 
                style={{ marginTop: 24 }}
                onClick={() => navigate('/metodologi')}
              >
                Pelajari Metodologi Lengkap
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-v3">
        <div className="container-v3">
          <div className="contact-v3">
            <div className="contact-v3-left">
              <h3>Mari wujudkan pasar yang berintegritas.</h3>
              <p>Untuk kemitraan data, kolaborasi riset, atau pertanyaan regulator, tim kami siap membantu.</p>

              <ContactInfo />

              <div className="socials">
                <SocialLink icon={<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M6 13V8H4V6h2V4.5C6 2.8 7 2 8.6 2c.7 0 1.4.1 1.4.1V4H9c-.8 0-1 .5-1 1v1h2l-.3 2H8v5z"/></svg>} />
                <SocialLink icon={<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M13 4.3c-.4.2-.8.3-1.2.4.4-.3.8-.7.9-1.2-.4.3-.9.4-1.4.6A2.2 2.2 0 008.5 5c0 .2 0 .4.1.5-1.8-.1-3.5-1-4.6-2.4-.2.3-.3.7-.3 1.1 0 .8.4 1.4 1 1.8-.4 0-.7-.1-1-.3 0 1.1.8 2 1.8 2.2-.2.1-.4.1-.6.1h-.4c.3.9 1.1 1.5 2 1.5A4.4 4.4 0 013 11.5c1 .6 2.1 1 3.3 1 4 0 6.1-3.3 6.1-6.1v-.3c.4-.3.8-.7 1.1-1.1z"/></svg>} />
                <SocialLink icon={<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M4 6h2v7H4zM5 3a1.2 1.2 0 100 2.4A1.2 1.2 0 005 3zM8 6h2v1c.3-.6 1.1-1.1 2-1.1 2 0 2.5 1.2 2.5 3V13h-2V9.3c0-.9-.3-1.5-1.1-1.5-.6 0-1 .4-1.2.9-.1.2-.1.4-.1.6V13H8z"/></svg>} />
              </div>
            </div>

            <ContactForm onToast={showToast} />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-v3">
        <div className="container-v3">
          <p className="footer-disclaimer">
            PRISMA adalah gagasan/prototipe konsep untuk esai ilmiah. Nama, kontak, dan data emiten bersifat ilustratif.
          </p>
        </div>
      </footer>
    </div>
  );
}

// Helper Components
function HeroIllustration() {
  return (
    <div className="hero-illustration">
      <svg viewBox="0 0 400 400" fill="none">
        {/* Floating abstract shapes inspired by ESG themes */}
        <defs>
          <linearGradient id="grad1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2F9E6B" stopOpacity="0.2"/>
            <stop offset="100%" stopColor="#145858" stopOpacity="0.3"/>
          </linearGradient>
          <linearGradient id="grad2" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F7B318" stopOpacity="0.2"/>
            <stop offset="100%" stopColor="#1C7B72" stopOpacity="0.25"/>
          </linearGradient>
        </defs>
        
        {/* Circle elements */}
        <circle cx="200" cy="200" r="120" fill="url(#grad1)" className="float-1"/>
        <circle cx="280" cy="150" r="60" fill="url(#grad2)" className="float-2"/>
        <circle cx="140" cy="260" r="40" fill="var(--sage-soft)" opacity="0.6" className="float-3"/>
        
        {/* Grid pattern */}
        <g opacity="0.15" stroke="var(--teal)" strokeWidth="1">
          <line x1="80" y1="100" x2="320" y2="100"/>
          <line x1="80" y1="180" x2="320" y2="180"/>
          <line x1="80" y1="260" x2="320" y2="260"/>
          <line x1="100" y1="80" x2="100" y2="320"/>
          <line x1="180" y1="80" x2="180" y2="320"/>
          <line x1="260" y1="80" x2="260" y2="320"/>
        </g>

        {/* Data visualization elements */}
        <g opacity="0.7">
          <rect x="140" y="180" width="8" height="60" rx="4" fill="var(--green)"/>
          <rect x="160" y="150" width="8" height="90" rx="4" fill="var(--teal-l)"/>
          <rect x="180" y="130" width="8" height="110" rx="4" fill="var(--teal)"/>
          <rect x="200" y="160" width="8" height="80" rx="4" fill="var(--teal-l)"/>
          <rect x="220" y="140" width="8" height="100" rx="4" fill="var(--green)"/>
        </g>

        {/* Shield icon */}
        <g transform="translate(240, 240)">
          <path d="M0 -20l15 6v12c0 10-6 18-15 21-9-3-15-11-15-21v-12z" 
                fill="var(--gold)" opacity="0.9"/>
          <path d="M-6 -2l4 4 8-8" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round"/>
        </g>
      </svg>
    </div>
  );
}

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
      <div className="preview-box-icon">
        <BarChart3 />
      </div>
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
