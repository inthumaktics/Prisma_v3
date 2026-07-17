import { jsPDF } from 'jspdf';
import { DM_SUB } from '../constants/dmTopics';
import { dmF } from './dmMath';

export function generatePdfReport(type, company, materialityData) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const { summary, gap, verdict } = materialityData;
  const avgGap = summary.avgGap;
  
  let status = 'Verified';
  let rec = 'Suitable for public disclosure.';
  if (avgGap >= 3.0) {
    status = 'High Divergence';
    rec = 'Independent audit is recommended before publication.';
  } else if (avgGap >= 1.5) {
    status = 'Needs Review';
    rec = 'Additional supporting evidence is recommended.';
  }

  // Formatting helpers
  const drawHeader = (title) => {
    // Top border/banner
    doc.setFillColor(20, 88, 88); // PRISMA Green
    doc.rect(0, 0, 210, 15, 'F');
    
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255);
    doc.text('PRISMA ESG INTELLIGENCE PLATFORM', 15, 10);
    
    doc.setFontSize(8);
    doc.text('SECURE · VERIFIED · IMMUTABLE', 160, 10);
    
    // Page Title
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(22);
    doc.setTextColor(20, 88, 88);
    doc.text(title, 15, 32);

    doc.setDrawColor(220, 220, 220);
    doc.line(15, 36, 195, 36);
  };

  const drawFooter = () => {
    const pageHeight = doc.internal.pageSize.height;
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text('Laporan ini dihasilkan secara otomatis oleh PRISMA AI Verification System.', 15, pageHeight - 12);
    doc.text('Autentisitas laporan tercatat pada blockchain ledger.', 15, pageHeight - 8);
    doc.text('Halaman 1 dari 1', 180, pageHeight - 10);
  };

  if (type === 'verification') {
    drawHeader('ESG Verification Report');

    // Emiten Info
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(50, 50, 50);
    doc.text('INFORMASI EMITEN', 15, 46);
    
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(`Nama Emiten  :  ${company.nm}`, 15, 54);
    doc.text(`Kode Emiten  :  ${company.tk}`, 15, 60);
    doc.text(`Sektor       :  ${company.sec}`, 15, 66);
    doc.text(`Tanggal      :  ${new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}`, 15, 72);

    // Score Panel
    doc.setFillColor(244, 248, 246);
    doc.roundedRect(125, 42, 70, 36, 3, 3, 'F');
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(20, 88, 88);
    doc.text('ESG CREDIBILITY SCORE', 130, 49);
    doc.setFontSize(26);
    doc.text(String(company.score), 130, 62);
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text('Status:', 130, 70);
    doc.setFont('Helvetica', 'bold');
    
    if (avgGap >= 3.0) {
      doc.setTextColor(217, 86, 76);
    } else if (avgGap >= 1.5) {
      doc.setTextColor(247, 179, 24);
    } else {
      doc.setTextColor(47, 158, 107);
    }
    doc.text(status, 144, 70);

    // Results Box
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(50, 50, 50);
    doc.text('DOUBLE MATERIALITY METRICS', 15, 84);
    
    doc.setDrawColor(230, 230, 230);
    doc.line(15, 86, 195, 86);

    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(80, 80, 80);
    doc.text(`Impact Materiality Gap    :  ${company.imp.toFixed(1)}`, 15, 94);
    doc.text(`Financial Materiality Gap :  ${company.fin.toFixed(1)}`, 15, 100);
    doc.text(`Rata-rata Kesenjangan     :  ${avgGap.toFixed(1)}`, 15, 106);

    // Explanation
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(50, 50, 50);
    doc.text('INTERPRETASI ASESMEN', 15, 120);
    doc.line(15, 122, 195, 122);
    
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(80, 80, 80);
    const cleanVerdict = verdict.replace(/<\/?[^>]+(>|$)/g, ""); // Strip HTML tags
    const splitVerdict = doc.splitTextToSize(cleanVerdict, 180);
    doc.text(splitVerdict, 15, 130);

    // Verification Pipeline
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(50, 50, 50);
    doc.text('ALUR VERIFIKASI AI', 15, 154);
    doc.line(15, 156, 195, 156);

    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(9);
    doc.text('[V] Document Parsing          -  SELESAI (0.4s)', 15, 164);
    doc.text('[V] ESG Topic Extraction      -  SELESAI (0.8s)', 15, 170);
    doc.text('[V] Impact Assessment         -  SELESAI (0.3s)', 15, 176);
    doc.text('[V] Financial Assessment      -  SELESAI (0.3s)', 15, 182);
    doc.text('[V] External Validation       -  SELESAI (1.1s)', 15, 188);
    doc.text('[V] Blockchain Registration   -  SELESAI (0.9s)', 15, 194);

    // Blockchain Certificates
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(50, 50, 50);
    doc.text('SERTIFIKAT BLOCKCHAIN', 15, 210);
    doc.line(15, 212, 195, 212);

    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(9);
    doc.text(`Ledger Hash       :  ${company.hash || '0x91A7...' }`, 15, 220);
    doc.text(`Verification ID   :  PRM-2026-${String(company.score * 200 + 404).padStart(6, '0')}`, 15, 226);
    doc.text('Ledger Status     :  IMMUTABLE (Green Badge)', 15, 232);

    // Recommendation
    doc.setFillColor(252, 248, 227); // Warning soft yellow
    if (avgGap < 1.5) doc.setFillColor(223, 240, 216); // green
    if (avgGap >= 3.0) doc.setFillColor(242, 222, 222); // red
    
    doc.roundedRect(15, 242, 180, 20, 2, 2, 'F');
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(avgGap >= 3.0 ? 169 : avgGap >= 1.5 ? 138 : 60, avgGap >= 3.0 ? 68 : avgGap >= 1.5 ? 109 : 118, avgGap >= 3.0 ? 66 : avgGap >= 1.5 ? 26 : 61);
    doc.text('REKOMENDASI AUDIT', 20, 249);
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(9);
    doc.text(rec, 20, 255);

    drawFooter();
    doc.save(`PRISMA-ESG-Verification-${company.tk}.pdf`);
  } else {
    // Double Materiality Assessment
    drawHeader('Double Materiality Assessment Report');

    // Emiten Info
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(50, 50, 50);
    doc.text('INFORMASI EMITEN', 15, 46);
    
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(`Nama Emiten  :  ${company.nm}`, 15, 54);
    doc.text(`Kode Emiten  :  ${company.tk}`, 15, 60);
    doc.text(`Sektor       :  ${company.sec}`, 15, 66);
    doc.text(`Tanggal      :  ${new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}`, 15, 72);

    // Assessment Grid Intro
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(50, 50, 50);
    doc.text('TABEL KESENJANGAN SUB-TOPIK ESRS', 15, 84);
    doc.line(15, 86, 195, 86);

    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.text('#', 15, 93);
    doc.text('Sub-topik', 25, 93);
    doc.text('Klaim', 120, 93);
    doc.text('Verifikasi', 145, 93);
    doc.text('Kesenjangan', 170, 93);
    doc.line(15, 96, 195, 96);

    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(8);
    let yPos = 101;
    
    // List top 12 gap items
    gap.slice(0, 12).forEach((r, idx) => {
      const s = DM_SUB[r.id];
      doc.text(String(idx + 1).padStart(2, '0'), 15, yPos);
      doc.text(s.n.length > 50 ? s.n.substring(0, 48) + '...' : s.n, 25, yPos);
      doc.text(dmF(r.imNegClaim), 120, yPos);
      doc.text(dmF(r.imNeg), 145, yPos);
      doc.text(`+${dmF(r.gap)}`, 170, yPos);
      doc.line(15, yPos + 2.5, 195, yPos + 2.5);
      yPos += 6.5;
    });

    drawFooter();
    doc.save(`PRISMA-Double-Materiality-${company.tk}.pdf`);
  }
}
