import { Coins, Shield, TrendingUp } from 'lucide-react';
import FormulaCard from './FormulaCard';
import { dmF } from '../utils/dmMath';

export default function FinancialMateriality({
  finEff,
  repEff,
  likOcc,
  sevFin,
  fmRisk,
  subTopicName
}) {
  const steps = [
    {
      label: 'Severity Calculation',
      expression: 'Severity = (Financial × 0.75) + (Reputation × 0.25)',
      resultLabel: 'Severity',
      resultValue: dmF(sevFin)
    },
    {
      label: 'Final Financial Score',
      expression: 'Financial Score = Severity × Likelihood',
      resultLabel: 'Financial Score (Verifikasi)',
      resultValue: dmF(fmRisk)
    }
  ];

  return (
    <div className="mat-card-dashboard mat-section-spacer">
      <h2 className="mat-card-title">Financial Materiality {subTopicName && `— ${subTopicName}`}</h2>
      <p className="mat-card-subtitle">Outside-In Assessment — Mengukur risiko eksternal dan peluang ESG yang berdampak pada kinerja finansial perusahaan.</p>
      
      <div className="mat-metrics-grid mat-metrics-3col">
        <div className="mat-metric-detail-card">
          <div className="mat-metric-icon"><Coins size={20} /></div>
          <div className="mat-metric-info">
            <div className="mat-metric-label">Financial Effect</div>
            <div className="mat-metric-score">{dmF(finEff)}</div>
            <div className="mat-metric-desc">Potensi kerugian finansial langsung akibat regulasi/perubahan iklim.</div>
          </div>
        </div>
        <div className="mat-metric-detail-card">
          <div className="mat-metric-icon"><Shield size={20} /></div>
          <div className="mat-metric-info">
            <div className="mat-metric-label">Reputation Effect</div>
            <div className="mat-metric-score">{dmF(repEff)}</div>
            <div className="mat-metric-desc">Kerugian tidak langsung akibat perubahan persepsi investor/konsumen.</div>
          </div>
        </div>
        <div className="mat-metric-detail-card">
          <div className="mat-metric-icon"><TrendingUp size={20} /></div>
          <div className="mat-metric-info">
            <div className="mat-metric-label">Likelihood</div>
            <div className="mat-metric-score">{dmF(likOcc)}</div>
            <div className="mat-metric-desc">Peluang terjadinya risiko finansial tersebut.</div>
          </div>
        </div>
      </div>

      <FormulaCard title="Financial Materiality Formula" steps={steps} />
    </div>
  );
}
