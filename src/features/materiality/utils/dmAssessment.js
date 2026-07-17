import { DM_PROF, DM_ORDER } from '../constants/dmProfiles';
import { DM_SUB } from '../constants/dmTopics';
import { dmHash } from './dmHash';
import { dmClamp, dmR } from './dmMath';
import { DM_TH } from '../constants/dmThresholds';

export function dmW(sec, code) {
  const p = DM_PROF[sec] || [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5];
  return p[DM_ORDER.indexOf(code)];
}

export function dmAssess(d, id) {
  const w = dmW(d.sec, DM_SUB[id].topic.code);
  const j = k => dmHash(d.tk + id + k);
  
  const scale = dmR(1 + w * 4 + (j('sc') - 0.5) * 0.9);
  const scope = dmR(1 + w * 3.6 + (j('sp') - 0.5) * 0.9);
  const remed = dmR(1 + w * 3.2 + (j('rm') - 0.5) * 1.0);
  const lik = dmR(1.5 + w * 3.2 + (j('lk') - 0.5) * 0.8);
  
  const sevNeg = (scale + scope + remed) / 3;
  const imNeg = sevNeg * lik;
  
  const pScale = dmR(1 + (1 - w) * 2.6 + (d.score / 100) * 0.9 + (j('ps') - 0.5) * 1.0);
  const pScope = dmR(1 + (1 - w) * 2.3 + (d.score / 100) * 0.9 + (j('pp') - 0.5) * 1.0);
  const pLik = dmR(1.4 + (d.score / 100) * 2.1 + (j('pl') - 0.5) * 0.9);
  
  const sevPos = (pScale + pScope) / 2;
  const imPos = sevPos * pLik;
  
  const finEff = dmR(1 + w * 3.8 + (j('fe') - 0.5) * 0.9);
  const repEff = dmR(1 + w * 3.4 + (j('re') - 0.5) * 1.0);
  const likOcc = dmR(1.5 + w * 3.0 + (j('lo') - 0.5) * 0.8);
  
  const sevFin = finEff * 0.75 + repEff * 0.25;
  const fmRisk = sevFin * likOcc;
  
  const oppSev = (dmR(1 + (1 - w) * 2.5 + (d.score / 100) * 0.8 + (j('oe') - 0.5) * 1.0) * 0.75) + 
                 (dmR(1 + (1 - w) * 2.2 + (d.score / 100) * 0.8 + (j('or') - 0.5) * 1.0) * 0.25);
  const fmOpp = oppSev * dmR(1.4 + (d.score / 100) * 2.0 + (j('ol') - 0.5) * 0.9);
  
  const bias = (100 - d.score) / 100;
  const dev = 0.35 + j('dv') * 0.65;
  
  const imNegClaim = imNeg * (1 - dmClamp(bias * dev * 0.85, 0, 0.62));
  const fmRiskClaim = fmRisk * (1 - dmClamp(bias * dev * 0.7, 0, 0.55));
  
  const gap = ((imNeg - imNegClaim) + (fmRisk - fmRiskClaim)) / 2;
  
  return {
    id,
    scale,
    scope,
    remed,
    lik,
    sevNeg,
    imNeg,
    imPos,
    finEff,
    repEff,
    likOcc,
    sevFin,
    fmRisk,
    fmOpp,
    imNegClaim,
    fmRiskClaim,
    gap
  };
}

export function dmBukti(d) {
  const dv = d.claims.find(c => c[1] === "div");
  const rt = d.claims.find(c => c[1] === "ret");
  if (dv) return `Bukti eksternal menunjukkan divergensi pada klaim “${dv[0]}”, sehingga skor verifikasi berada di atas angka yang dilaporkan emiten.`;
  if (rt) return `Sebagian klaim seperti “${rt[0]}” masih bersifat rencana sehingga belum dapat diverifikasi sepenuhnya.`;
  return `Seluruh klaim utama emiten selaras dengan bukti eksternal seperti citra Climate TRACE dan rekam sanksi KLHK.`;
}

// Pure math formulas for component and sandbox reuse
export function calculateImpact(scale, scope, remed, lik) {
  const severity = (scale + scope + remed) / 3;
  const score = severity * lik;
  return { severity, score };
}

export function calculateFinancial(finEff, repEff, likOcc) {
  const severity = finEff * 0.75 + repEff * 0.25;
  const score = severity * likOcc;
  return { severity, score };
}

export function calculateGap(imNeg, imNegClaim, fmRisk, fmRiskClaim) {
  return ((imNeg - imNegClaim) + (fmRisk - fmRiskClaim)) / 2;
}

export function calculateSummary(allAssessments) {
  const n = allAssessments.length;
  const mat = allAssessments.filter(r => r.imNeg >= DM_TH || r.imPos >= DM_TH || r.fmRisk >= DM_TH || r.fmOpp >= DM_TH).length;
  const neg = allAssessments.filter(r => r.imNeg >= DM_TH).length;
  const risk = allAssessments.filter(r => r.fmRisk >= DM_TH).length;
  const avgGap = allAssessments.reduce((a, r) => a + r.gap, 0) / n;
  
  return { n, mat, neg, risk, avgGap };
}
