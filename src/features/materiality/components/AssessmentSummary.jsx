import CountUp from './CountUp';
import { sColor } from '../../../data/companies';

export default function AssessmentSummary({ company, summary }) {
  const scoreColor = company ? sColor(company.score) : 'var(--green)';

  return (
    <div className="mat-card-dashboard">
      <h2 className="mat-card-title" style={{ textAlign: 'center', marginBottom: 28 }}>Assessment Summary</h2>
      <div className="mat-summary-layout">
        <div className="mat-summary-circle-container">
          <div className="mat-summary-circle">
            <span className="mat-summary-circle-val">
              <CountUp value={company?.score || 0} decimals={0} />
            </span>
            <span className="mat-summary-circle-badge">Verified</span>
          </div>
        </div>
        
        <div className="mat-summary-metrics-row">
          <div className="mat-summary-metric-col">
            <span className="mat-summary-metric-lbl">Impact Materiality Gap</span>
            <span className="mat-summary-metric-val">
              <CountUp value={company?.imp || 0} decimals={1} />
            </span>
          </div>
          <div className="mat-summary-metric-col">
            <span className="mat-summary-metric-lbl">Financial Materiality Gap</span>
            <span className="mat-summary-metric-val">
              <CountUp value={company?.fin || 0} decimals={1} />
            </span>
          </div>
          <div className="mat-summary-metric-col">
            <span className="mat-summary-metric-lbl">Credibility Gap</span>
            <span className="mat-summary-metric-val">
              <CountUp value={summary?.avgGap || 0} decimals={1} />
            </span>
          </div>
          <div className="mat-summary-metric-col">
            <span className="mat-summary-metric-lbl">Status</span>
            <span className="mat-summary-metric-val" style={{ color: scoreColor, fontSize: 14 }}>Verified</span>
          </div>
        </div>

        <p className="mat-summary-explanation">
          Berdasarkan verifikasi AI dan bukti yang didukung oleh blockchain ledger, laporan keberlanjutan emiten ini dinilai memiliki tingkat kredibilitas terverifikasi dengan rata-rata Kesenjangan Kredibilitas sebesar <span className="mono">{summary?.avgGap.toFixed(1)}</span>.
        </p>
      </div>
    </div>
  );
}
