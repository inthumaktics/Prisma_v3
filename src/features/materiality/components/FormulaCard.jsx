import { ArrowDown } from 'lucide-react';

export default function FormulaCard({ title, steps }) {
  return (
    <div className="mat-formula-card">
      <span className="mat-formula-title">{title}</span>
      <div className="mat-formula-steps">
        {steps.map((step, idx) => (
          <div key={idx} style={{ width: '100%' }}>
            {idx > 0 && (
              <div className="mat-formula-arrow">
                <ArrowDown size={20} />
              </div>
            )}
            <div className="mat-formula-step">
              <div className="mat-formula-step-label">{step.label}</div>
              <div className="mat-formula-step-expr">{step.expression}</div>
              <div className="mat-formula-step-result">
                {step.resultLabel} = <span className="mono">{step.resultValue}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
