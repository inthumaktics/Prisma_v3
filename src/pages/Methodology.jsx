const principles = [
  'Investasi bertanggung jawab',
  'Strategi & praktik bisnis berkelanjutan',
  'Pengelolaan risiko sosial & lingkungan',
  'Tata kelola',
  'Komunikasi yang informatif',
  'Inklusif',
  'Pengembangan sektor unggulan prioritas',
  'Koordinasi & kolaborasi',
];

export default function Methodology() {
  return (
    <div className="view">
      <div className="steps" style={{ marginBottom: 18 }}>
        {[
          ['01', 'Menarik bukti eksternal', 'Teks laporan, emisi satelit Climate TRACE, dan rekam sanksi KLHK ditarik tanpa meminta data tambahan dari emiten.'],
          ['02', 'Mengunci integritas data', 'Setiap titik data di-hash & di-timestamp pada ledger, mencegah edit retroaktif & perhitungan ganda kredit karbon.'],
          ['03', 'Mengukur Kesenjangan Kredibilitas', 'AI (FinBERT-ESG + A3CG, diperkuat RAG) mengukur gap finansial & gap dampak simultan + confidence score.'],
          ['04', 'Menerbitkan skor publik', 'Skor 0–100 tayang di keterbukaan informasi BEI; zona merah jadi prioritas pengawasan OJK.'],
        ].map(([n, h, p]) => (
          <div className="stp" key={n}>
            <div className="n">{n}</div>
            <h4>{h}</h4>
            <p>{p}</p>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="chead">
          <div>
            <h3>Delapan Prinsip Keuangan Berkelanjutan yang Diverifikasi</h3>
            <div className="cap">Bobot mengikuti POJK 51/2017 &amp; SEOJK 16/2021 — diuji terhadap bukti, bukan sekadar keberadaan pengungkapan</div>
          </div>
        </div>
        <div className="prin">
          {principles.map((p, i) => (
            <div className="p" key={i}>
              <span className="c">{i + 1}</span>
              {p}
            </div>
          ))}
        </div>
        <div className="note">
          <b>Keadilan prosedural.</b> Metodologi dibuka penuh &amp; setiap emiten berskor merah berhak mengajukan keberatan sebelum publikasi final — pengaman terhadap <i>assurance-washing</i>. PRISMA menilai <b>kredibilitas klaim</b>, bukan kinerja; ia melengkapi, bukan menggantikan, rating seperti MSCI atau Sustainalytics.
        </div>
      </div>
    </div>
  );
}
