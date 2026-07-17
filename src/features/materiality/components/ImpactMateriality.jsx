import { Expand, Users, RotateCcw, TrendingUp } from 'lucide-react';
import FormulaCard from './FormulaCard';
import { dmF } from '../utils/dmMath';

export default function ImpactMateriality({
  scale,
  scope,
  remed,
  lik,
  sevNeg,
  imNeg,
  subTopicName
}) {
  const steps = [
    {
      label: 'Severity Calculation',
      expression: 'Severity = (Scale + Scope + Remediability) / 3',
      resultLabel: 'Severity',
      resultValue: dmF(sevNeg)
    },
    {
      label: 'Final Impact Score',
      expression: 'Impact Score = Severity × Likelihood',
      resultLabel: 'Impact Score (Verifikasi)',
      resultValue: dmF(imNeg)
    }
  ];

  return (
    <div className="mat-card-dashboard mat-section-spacer">
      <h2 className="mat-card-title">Impact Materiality {subTopicName && `— ${subTopicName}`}</h2>
      <p className="mat-card-subtitle">Inside-Out Assessment — Mengukur dampak operasi bisnis terhadap lingkungan dan masyarakat luas.</p>
      
      <div className="mat-metrics-grid mat-metrics-4col">
        <div className="mat-metric-detail-card">
          <div className="mat-metric-icon"><Expand size={20} /></div>
          <div className="mat-metric-info">
            <div className="mat-metric-label">Scale of Impact</div>
            <div className="mat-metric-score">{dmF(scale)}</div>
            <div className="mat-metric-desc">Tingkat keparahan atau signifikansi dampak negatif/positif.</div>
          </div>
        </div>
        <div className="mat-metric-detail-card">
          <div className="mat-metric-icon"><Users size={20} /></div>
          <div className="mat-metric-info">
            <div className="mat-metric-label">Scope of Impact</div>
            <div className="mat-metric-score">{dmF(scope)}</div>
            <div className="mat-metric-desc">Luas penyebaran atau jumlah populasi terdampak.</div>
          </div>
        </div>
        <div className="mat-metric-detail-card">
          <div className="mat-metric-icon"><RotateCcw size={20} /></div>
          <div className="mat-metric-info">
            <div className="mat-metric-label">Remediability</div>
            <div className="mat-metric-score">{dmF(remed)}</div>
            <div className="mat-metric-desc">Kemudahan memulihkan ekosistem atau komunitas yang terdampak.</div>
          </div>
        </div>
        <div className="mat-metric-detail-card">
          <div className="mat-metric-icon"><TrendingUp size={20} /></div>
          <div className="mat-metric-info">
            <div className="mat-metric-label">Likelihood</div>
            <div className="mat-metric-score">{dmF(lik)}</div>
            <div className="mat-metric-desc">Probabilitas terjadinya dampak di masa depan.</div>
          </div>
        </div>
      </div>

      <FormulaCard title="Impact Materiality Formula" steps={steps} />
    </div>
  );
}
