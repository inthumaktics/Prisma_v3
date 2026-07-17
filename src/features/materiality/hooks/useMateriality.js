import { useMemo } from 'react';
import { DM_SUB } from '../constants/dmTopics';
import { dmAssess, dmBukti, calculateSummary } from '../utils/dmAssessment';
import { DM_GHI, DM_GMID } from '../constants/dmThresholds';
import { dmF } from '../utils/dmMath';

export function useMateriality(company) {
  return useMemo(() => {
    if (!company) return null;

    // Calculate assessments for all 28 sub-topics
    const assessment = {};
    Object.keys(DM_SUB).forEach(id => {
      assessment[id] = dmAssess(company, id);
    });

    const allAssessments = Object.values(assessment);
    const summary = calculateSummary(allAssessments);
    
    // Sort gap items descending
    const gapList = [...allAssessments].sort((a, b) => b.gap - a.gap);
    const topGapItem = gapList[0];
    
    let verdict = '';
    if (topGapItem) {
      const topGapSub = DM_SUB[topGapItem.id];
      const avgGap = summary.avgGap;
      
      let autoVerdict = '';
      if (avgGap >= DM_GHI) {
        autoVerdict = `Asesmen menunjukkan klaim <strong>${company.nm}</strong> menyimpang jauh dari bukti eksternal, sehingga sebagian besar dampak negatif material tercatat lebih rendah daripada kenyataan.`;
      } else if (avgGap >= DM_GMID) {
        autoVerdict = `Asesmen menunjukkan klaim <strong>${company.nm}</strong> secara umum wajar, meskipun beberapa sub-topik masih memerlukan tinjauan lebih lanjut.`;
      } else {
        autoVerdict = `Asesmen menunjukkan klaim <strong>${company.nm}</strong> selaras dengan bukti eksternal pada hampir seluruh sub-topik.`;
      }

      const proofStr = dmBukti(company);
      verdict = `<strong>Kesimpulan otomatis.</strong> ${autoVerdict} Divergensi terbesar terjadi pada sub-topik <strong>${topGapSub.n}</strong> (${topGapSub.topic.code}), dengan skor klaim ${dmF(topGapItem.imNegClaim)} berbanding hasil verifikasi ${dmF(topGapItem.imNeg)} pada sumbu dampak. ${proofStr} Rata-rata Kesenjangan Kredibilitas sebesar <strong>${dmF(avgGap)}</strong> inilah yang menempatkan ESG Credibility Score emiten pada angka <strong>${company.score}</strong>.`;
    }

    return {
      assessment,
      summary,
      gap: gapList,
      verdict,
      kpi: {
        n: summary.n,
        mat: summary.mat,
        neg: summary.neg,
        risk: summary.risk,
        avgGap: summary.avgGap
      }
    };
  }, [company]);
}
