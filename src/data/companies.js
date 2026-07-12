const LOGO_COLORS = ["#2F9E6B","#2E8B7E","#145858","#7A5EA8","#C88A2A","#5B8C3A","#B0553F","#417C86","#8A6A22","#A0475F","#4C6EAD","#1C7B72"];

const RAW = [
  ["GTEN","Geotermal Energi Tbk","Energi Panas Bumi",91,7,9,5,3,[["Penurunan intensitas emisi 12% (2024)","ok"],["Target netral karbon 2035 berpeta jalan","ok"],["Restorasi lahan pascabor terverifikasi satelit","ok"]],700,150,1.1],
  ["ESBR","Energi Surya Baru Tbk","Energi Terbarukan",88,9,11,6,2,[["Kapasitas PLTS sesuai laporan","ok"],["Kerja lokal terverifikasi","ok"],["Efisiensi air masih rencana","ret"]],250,250,1.3],
  ["BHSN","Bank Hijau Sentosa Tbk","Perbankan",83,11,14,7,1,[["Pembiayaan hijau 24% sesuai RAKB","ok"],["KUR inklusif terverifikasi","ok"],["Scope 3 pembiayaan belum penuh","ret"]],430,260,0.8],
  ["KSHT","Konsumer Sehat Tbk","Barang Konsumsi",79,14,16,8,0,[["Kemasan daur ulang 60% sesuai","ok"],["Pengurangan air sebagian","ret"],["Rantai pasok bebas deforestasi belum terbukti","div"]],470,255,1.0],
  ["TDNU","Telekom Digital Nusantara Tbk","Telekomunikasi",77,13,19,7,2,[["Efisiensi pusat data sesuai","ok"],["Jangkauan digital inklusif terverifikasi","ok"],["Limbah elektronik minim data","ret"]],455,250,0.9],
  ["FRSH","Farmasi Sehat Tbk","Farmasi",74,16,22,9,-1,[["Limbah B3 sesuai klaim","ok"],["Uji etis terverifikasi","ok"],["Emisi produksi lebih tinggi","div"]],445,248,1.0],
  ["AGPN","Agri Pangan Tbk","Agrikultur",71,18,24,10,1,[["Pertanian regeneratif berjalan","ok"],["Pupuk berkelanjutan sebagian","ret"],["Konversi lahan tak sesuai satelit","div"]],540,210,1.6],
  ["RMBS","Ritel Maju Bersama Tbk","Ritel",68,19,27,9,-2,[["Toko hemat energi sebagian","ret"],["Pengurangan plastik berjalan","ok"],["Rantai pasok minim bukti","div"]],460,258,0.9],
  ["PHAB","Properti Hijau Abadi Tbk","Properti",64,22,30,11,0,[["Sertifikasi bangunan hijau valid","ok"],["Efisiensi energi dilebihkan","div"],["Dampak konstruksi minim ungkap","ret"]],452,252,1.1],
  ["TXWN","Tekstil Warna Tbk","Tekstil",58,26,38,12,-3,[["Air limbah tak sesuai sanksi KLHK","div"],["Daur ulang serat terbatas","ret"],["Pewarna ramah lingkungan belum terbukti","div"]],448,250,1.4],
  ["PTAG","Petrokimia Anugerah Tbk","Kimia",52,30,44,13,-2,[["Penurunan emisi bertentangan satelit","div"],["Teknologi bersih masih rencana","ret"],["Insiden pencemaran tak diungkap","div"]],435,247,1.8],
  ["BUPD","Baja Utama Persada Tbk","Logam & Baja",47,34,50,14,-1,[["Emisi Scope 1 di atas dilaporkan","div"],["Efisiensi tungku tak terverifikasi","div"],["Rehabilitasi hanya naratif","ret"]],520,205,2.1],
  ["KRJY","Kertas Rimba Jaya Tbk","Kertas & Pulp",41,38,57,15,-4,[["Nol deforestasi dibantah satelit","div"],["Sanksi KLHK tak diungkap","div"],["Sertifikasi lestari kedaluwarsa","div"]],210,240,2.4],
  ["NTMK","Nikel Tambang Makmur Tbk","Pertambangan Nikel",37,41,60,14,-3,[["Deforestasi melebihi laporan","div"],["Tailing bertentangan sanksi","div"],["Reklamasi tak terverifikasi","div"]],640,215,2.6],
  ["BEPR","Bara Energi Prima Tbk","Pertambangan Batubara",31,45,66,13,-5,[["Transisi energi tanpa anggaran","div"],["Emisi melampaui narasi","div"],["Kredit karbon terindikasi ganda","div"]],560,230,3.0],
  ["SLNU","Sawit Lestari Nusantara Tbk","Perkebunan (CPO)",28,47,69,12,-2,[["Bebas deforestasi dibantah satelit","div"],["Kebakaran lahan tak diungkap","div"],["Sertifikasi tak mencakup seluruh kebun","div"]],240,235,2.9],
];

const HASH_CHARS = "0123456789abcdef";

export const companies = RAW.map((r, i) => {
  const tk = r[0], nm = r[1], sec = r[2], score = r[3], fin = r[4],
        imp = r[5], conf = r[6], trend = r[7], claims = r[8],
        mx = r[9], my = r[10], em = r[11];
  const ini = tk.slice(0, 2);
  const col = LOGO_COLORS[i % LOGO_COLORS.length];
  let hash = "0x";
  for (let j = 0; j < 40; j++) hash += HASH_CHARS[(i * 7 + j * 13) % 16];
  const ts = `2026-06-${String(9 + (i % 19)).padStart(2,"0")}T0${i % 9}:${String(10 + i).slice(-2)}:00Z`;
  const hist = [
    score - trend * 3,
    score - 5 + (i % 3),
    score - 2,
    score - 1,
    score - (trend < 0 ? 1 : -1),
    score
  ];
  return { tk, nm, sec, score, fin, imp, conf, trend, claims, mx, my, em, ini, col, hash, ts, hist };
});

export const zoneOf = s => s >= 75 ? "g" : s >= 50 ? "y" : "r";
export const zName = { g: "Hijau", y: "Kuning", r: "Merah" };
export const zClr  = { g: "#2F9E6B", y: "#F7B318", r: "#D9564C" };
export const sColor = s => s >= 75 ? "var(--green)" : s >= 50 ? "var(--amber)" : "var(--red)";
