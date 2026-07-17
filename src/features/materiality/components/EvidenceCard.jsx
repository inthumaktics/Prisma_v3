import { Eye, Shield, TrendingUp, FileText } from 'lucide-react';

export default function EvidenceCard() {
  return (
    <div className="mat-card-dashboard mat-section-spacer">
      <h2 className="mat-card-title">Sumber Bukti Eksternal</h2>
      <p className="mat-card-subtitle">Verifikasi kredibilitas didasarkan pada audit silang otomatis terhadap empat pilar data independen.</p>
      
      <div className="evg">
        <div className="ev">
          <div className="en">
            <span className="ic"><Eye size={16} /></span>
            Climate TRACE
          </div>
          <div className="ed">Emisi satelit resolusi fasilitas, independen.</div>
        </div>
        <div className="ev">
          <div className="en">
            <span className="ic"><Shield size={16} /></span>
            Sanksi KLHK
          </div>
          <div className="ed">Rekam jejak sanksi lingkungan resmi.</div>
        </div>
        <div className="ev">
          <div className="en">
            <span className="ic"><TrendingUp size={16} /></span>
            Sinyal IDX/OJK
          </div>
          <div className="ed">Data pasar & status kepatuhan.</div>
        </div>
        <div className="ev">
          <div className="en">
            <span className="ic"><FileText size={16} /></span>
            Teks Laporan
          </div>
          <div className="ed">Klaim diklasifikasi FinBERT-ESG + A3CG.</div>
        </div>
      </div>
    </div>
  );
}
