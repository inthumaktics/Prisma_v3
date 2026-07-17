import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { companies, sColor } from '../data/companies';
import { ArrowDown } from 'lucide-react';
import { 
  useMateriality, 
  DM_SUB, 
  calculateImpact,
  ImpactMateriality, 
  FinancialMateriality, 
  CalculationTimeline, 
  VerificationReport, 
  MaterialityMatrix, 
  ScatterPlot, 
  EvidenceCard, 
  VerdictCard,
  CountUp 
} from '../features/materiality';

export default function Materiality() {
  const { ticker } = useParams();
  
  // Find company by ticker
  const d = companies.find(c => c.tk === ticker);

  // Load Double Materiality business logic hook
  const materialityData = useMateriality(d);

  // Active sub-topic state
  const [activeSubTopicId, setActiveSubTopicId] = useState(null);

  // Initialize active subtopic to the one with the maximum gap
  useEffect(() => {
    if (materialityData?.gap?.[0]?.id) {
      setActiveSubTopicId(materialityData.gap[0].id);
    }
  }, [materialityData]);

  // Sandbox inputs
  const [sandboxScale, setSandboxScale] = useState(4.2);
  const [sandboxScope, setSandboxScope] = useState(3.9);
  const [sandboxRemed, setSandboxRemed] = useState(3.4);
  const [sandboxLike, setSandboxLike] = useState(3.8);

  if (!d) {
    return (
      <div className="view materiality-page" style={{ textAlign: 'center', padding: '100px 20px' }}>
        <h2>Emiten tidak ditemukan</h2>
        <p style={{ color: 'var(--muted)', marginTop: 8 }}>Silakan kembali ke halaman peringkat.</p>
        <Link to="/ranking" className="btn-prisma-green" style={{ marginTop: 24 }}>
          Kembali ke Rankings
        </Link>
      </div>
    );
  }

  const c = sColor(d.score);
  const activeSubTopic = activeSubTopicId ? DM_SUB[activeSubTopicId] : null;
  const activeAssessment = activeSubTopicId ? materialityData?.assessment[activeSubTopicId] : null;

  // Sandbox calculations
  const { severity: sandboxSeverity, score: sandboxImpact } = calculateImpact(
    sandboxScale, 
    sandboxScope, 
    sandboxRemed, 
    sandboxLike
  );

  return (
    <div className="view materiality-page">
      {/* Breadcrumbs */}
      <div className="breadcrumb-v3">
        <Link to="/">Home</Link>
        <span className="separator">&gt;</span>
        <Link to="/ranking">Ranking</Link>
        <span className="separator">&gt;</span>
        <span className="active" style={{ fontFamily: 'var(--mono)' }}>{d.tk}</span>
        <span className="separator">&gt;</span>
        <span className="active">Double Materiality Assessment</span>
      </div>

      {/* Hero */}
      <div className="materiality-hero">
        <h1 className="materiality-hero-title">Double Materiality Assessment</h1>
        <p className="materiality-hero-subtitle">
          Kerangka verifikasi independen PRISMA berbasis AI dan Blockchain menggunakan pendekatan Double Materiality.
        </p>
      </div>

      {/* Company Header */}
      <div className="materiality-company-banner">
        <div className="mcb-left">
          <div className="mcb-logo" style={{ background: d.col }}>
            {d.ini}
          </div>
          <div>
            <div className="mcb-title-row">
              <span className="mcb-name">{d.nm}</span>
              <span className="mcb-ticker">{d.tk}</span>
              <span className="mcb-sector">{d.sec}</span>
            </div>
            <div className="mcb-verified">
              <span className="mcb-dot" />
              PRISMA VERIFIED · BEI RECORDED
            </div>
          </div>
        </div>
        <div className="mcb-right">
          <div className="mcb-metric">
            <span className="mcb-metric-label">ESG Score</span>
            <span className="mcb-metric-value" style={{ color: c }}>{d.score}</span>
          </div>
          <div className="mcb-metric">
            <span className="mcb-metric-label">Credibility Score</span>
            <span className="mcb-metric-value" style={{ color: c }}>{d.score}</span>
          </div>
        </div>
      </div>

      {/* Overview stats */}
      <div className="mat-overview-grid">
        <div className="mat-overview-card">
          <span className="mat-overview-label">Impact Materiality</span>
          <span className="mat-overview-val">
            <CountUp value={activeAssessment?.imNeg || 0} />
          </span>
          <span className="mat-overview-desc">Inside-out environmental and social impact severity.</span>
        </div>
        <div className="mat-overview-card">
          <span className="mat-overview-label">Financial Materiality</span>
          <span className="mat-overview-val">
            <CountUp value={activeAssessment?.fmRisk || 0} />
          </span>
          <span className="mat-overview-desc">Outside-in financial risks and transition opportunities.</span>
        </div>
        <div className="mat-overview-card">
          <span className="mat-overview-label">Credibility Gap</span>
          <span className="mat-overview-val">
            <CountUp value={activeAssessment?.gap || 0} />
          </span>
          <span className="mat-overview-desc">Variance between reported claims and external auditing.</span>
        </div>
        <div className="mat-overview-card">
          <span className="mat-overview-label">Assessment Status</span>
          <div className="mat-overview-badge-wrapper">
            <span className="mat-badge-verified">Verified</span>
          </div>
          <span className="mat-overview-desc">AI audited and recorded on decentralized blockchain ledger.</span>
        </div>
      </div>

      {/* Impact Materiality Component */}
      <ImpactMateriality
        scale={activeAssessment?.scale || 1}
        scope={activeAssessment?.scope || 1}
        remed={activeAssessment?.remed || 1}
        lik={activeAssessment?.lik || 1}
        sevNeg={activeAssessment?.sevNeg || 1}
        imNeg={activeAssessment?.imNeg || 1}
        subTopicName={activeSubTopic ? `${activeSubTopic.topic.code} · ${activeSubTopic.n}` : ''}
      />

      {/* Financial Materiality Component */}
      <FinancialMateriality
        finEff={activeAssessment?.finEff || 1}
        repEff={activeAssessment?.repEff || 1}
        likOcc={activeAssessment?.likOcc || 1}
        sevFin={activeAssessment?.sevFin || 1}
        fmRisk={activeAssessment?.fmRisk || 1}
        subTopicName={activeSubTopic ? `${activeSubTopic.topic.code} · ${activeSubTopic.n}` : ''}
      />

      {/* CalculationTimeline Component */}
      <CalculationTimeline />

      {/* Live Calculation Sandbox */}
      <div className="mat-card-dashboard mat-section-spacer">
        <h2 className="mat-card-title">Live Calculation Sandbox</h2>
        <p className="mat-card-subtitle">Uji coba simulasi perhitungan rumus Impact Materiality secara interaktif menggunakan slider.</p>
        
        <div className="mat-live-layout">
          <div className="mat-live-left">
            <div className="mat-input-group">
              <div className="mat-input-header">
                <label className="mat-input-label">Scale of Impact</label>
                <span className="mat-input-val">{sandboxScale.toFixed(1)}</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="5" 
                step="0.1" 
                value={sandboxScale} 
                onChange={(e) => setSandboxScale(parseFloat(e.target.value))} 
                className="mat-slider"
              />
            </div>
            
            <div className="mat-input-group">
              <div className="mat-input-header">
                <label className="mat-input-label">Scope of Impact</label>
                <span className="mat-input-val">{sandboxScope.toFixed(1)}</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="5" 
                step="0.1" 
                value={sandboxScope} 
                onChange={(e) => setSandboxScope(parseFloat(e.target.value))} 
                className="mat-slider"
              />
            </div>

            <div className="mat-input-group">
              <div className="mat-input-header">
                <label className="mat-input-label">Remediability</label>
                <span className="mat-input-val">{sandboxRemed.toFixed(1)}</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="5" 
                step="0.1" 
                value={sandboxRemed} 
                onChange={(e) => setSandboxRemed(parseFloat(e.target.value))} 
                className="mat-slider"
              />
            </div>

            <div className="mat-input-group">
              <div className="mat-input-header">
                <label className="mat-input-label">Likelihood</label>
                <span className="mat-input-val">{sandboxLike.toFixed(1)}</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="5" 
                step="0.1" 
                value={sandboxLike} 
                onChange={(e) => setSandboxLike(parseFloat(e.target.value))} 
                className="mat-slider"
              />
            </div>
          </div>

          <div className="mat-live-right">
            <span className="mat-formula-title" style={{ marginBottom: 16 }}>Live Calculation Output</span>
            <div className="mat-formula-steps" style={{ maxWidth: 'none' }}>
              <div className="mat-formula-step" style={{ background: '#FAFAFB' }}>
                <div className="mat-formula-step-label">Severity = (Scale + Scope + Remediability) / 3</div>
                <div className="mat-formula-step-expr" style={{ fontSize: 13 }}>
                  ({sandboxScale.toFixed(1)} + {sandboxScope.toFixed(1)} + {sandboxRemed.toFixed(1)}) ÷ 3
                </div>
                <div className="mat-formula-step-result" style={{ marginTop: 4, fontSize: 16 }}>
                  Severity = <span className="mono" style={{ fontSize: 20 }}>{sandboxSeverity.toFixed(2)}</span>
                </div>
              </div>

              <div className="mat-formula-arrow" style={{ margin: '8px 0' }}>
                <ArrowDown size={16} />
              </div>

              <div className="mat-formula-step" style={{ background: '#FAFAFB' }}>
                <div className="mat-formula-step-label">Impact Score = Severity × Likelihood</div>
                <div className="mat-formula-step-expr" style={{ fontSize: 13 }}>
                  {sandboxSeverity.toFixed(2)} × {sandboxLike.toFixed(1)}
                </div>
                <div className="mat-formula-step-result" style={{ marginTop: 4, fontSize: 16 }}>
                  Impact Score = <span className="mono" style={{ fontSize: 22, color: 'var(--green)' }}>{sandboxImpact.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MaterialityMatrix Component */}
      <MaterialityMatrix 
        assessment={materialityData?.assessment} 
        activeId={activeSubTopicId} 
        onSubTopicSelect={setActiveSubTopicId} 
      />

      {/* ScatterPlot Component */}
      <ScatterPlot 
        assessment={materialityData?.assessment} 
        onSubTopicSelect={setActiveSubTopicId} 
      />

      {/* VerdictCard Component */}
      <VerdictCard 
        gapList={materialityData?.gap} 
        verdict={materialityData?.verdict} 
        activeId={activeSubTopicId} 
        onSubTopicSelect={setActiveSubTopicId} 
      />

      {/* EvidenceCard Component */}
      <EvidenceCard />

      {/* VerificationReport Component */}
      <VerificationReport 
        company={d} 
        materialityData={materialityData} 
      />
    </div>
  );
}
