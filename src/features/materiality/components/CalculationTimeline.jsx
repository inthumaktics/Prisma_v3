import { FileText, Cpu, BarChart3, Coins, Eye, Lock, ShieldCheck } from 'lucide-react';

export default function CalculationTimeline() {
  return (
    <div className="mat-card-dashboard mat-section-spacer">
      <h2 className="mat-card-title">Calculation Breakdown</h2>
      <p className="mat-card-subtitle">Alur kerja digital auditing PRISMA dari ekstraksi laporan hingga pencatatan bukti kredibilitas.</p>
      
      <div className="mat-timeline-container">
        <div className="mat-timeline-line" />
        
        <div className="mat-timeline-item">
          <div className="mat-timeline-bullet">1</div>
          <div className="mat-timeline-content">
            <div className="mat-timeline-text">
              <h4 className="mat-timeline-title">Read Sustainability Report</h4>
              <p className="mat-timeline-desc">Melakukan parsing otomatis terhadap dokumen laporan keberlanjutan PDF emiten.</p>
            </div>
            <div className="mat-timeline-badge"><FileText size={14} /></div>
          </div>
        </div>

        <div className="mat-timeline-item">
          <div className="mat-timeline-bullet">2</div>
          <div className="mat-timeline-content">
            <div className="mat-timeline-text">
              <h4 className="mat-timeline-title">AI Extracts ESG Topics</h4>
              <p className="mat-timeline-desc">Model FinBERT-ESG mengekstrak klaim keberlanjutan dan topik utama.</p>
            </div>
            <div className="mat-timeline-badge"><Cpu size={14} /></div>
          </div>
        </div>

        <div className="mat-timeline-item">
          <div className="mat-timeline-bullet">3</div>
          <div className="mat-timeline-content">
            <div className="mat-timeline-text">
              <h4 className="mat-timeline-title">Calculate Impact Materiality</h4>
              <p className="mat-timeline-desc">Mengkalkulasi skala, cakupan, remediabilitas, dan probabilitas dampak operasi.</p>
            </div>
            <div className="mat-timeline-badge"><BarChart3 size={14} /></div>
          </div>
        </div>

        <div className="mat-timeline-item">
          <div className="mat-timeline-bullet">4</div>
          <div className="mat-timeline-content">
            <div className="mat-timeline-text">
              <h4 className="mat-timeline-title">Calculate Financial Materiality</h4>
              <p className="mat-timeline-desc">Mengevaluasi eksposur finansial emiten terhadap risiko transisi fisik dan regulatori.</p>
            </div>
            <div className="mat-timeline-badge"><Coins size={14} /></div>
          </div>
        </div>

        <div className="mat-timeline-item">
          <div className="mat-timeline-bullet">5</div>
          <div className="mat-timeline-content">
            <div className="mat-timeline-text">
              <h4 className="mat-timeline-title">Compare External Evidence</h4>
              <p className="mat-timeline-desc">Membandingkan data emiten dengan data satelit Climate TRACE dan sanksi KLHK.</p>
            </div>
            <div className="mat-timeline-badge"><Eye size={14} /></div>
          </div>
        </div>

        <div className="mat-timeline-item">
          <div className="mat-timeline-bullet">6</div>
          <div className="mat-timeline-content">
            <div className="mat-timeline-text">
              <h4 className="mat-timeline-title">Blockchain Verification</h4>
              <p className="mat-timeline-desc">Mencatatkan sidik jari digital (hash) audit laporan ke ledger terdesentralisasi.</p>
            </div>
            <div className="mat-timeline-badge"><Lock size={14} /></div>
          </div>
        </div>

        <div className="mat-timeline-item">
          <div className="mat-timeline-bullet">7</div>
          <div className="mat-timeline-content">
            <div className="mat-timeline-text">
              <h4 className="mat-timeline-title">Generate ESG Credibility Score</h4>
              <p className="mat-timeline-desc">Mempublikasikan skor final verifikasi kredibilitas yang tahan sensor (censorship-resistant).</p>
            </div>
            <div className="mat-timeline-badge"><ShieldCheck size={14} /></div>
          </div>
        </div>

      </div>
    </div>
  );
}
