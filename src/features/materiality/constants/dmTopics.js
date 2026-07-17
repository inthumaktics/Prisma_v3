export const DM_TOPICS = [
  {p:'e',code:'E1',name:'Perubahan Iklim',subs:[['e1a','Adaptasi perubahan iklim'],['e1b','Mitigasi perubahan iklim'],['e1c','Energi']]},
  {p:'e',code:'E2',name:'Polusi',subs:[['e2a','Polusi udara'],['e2b','Polusi air'],['e2c','Zat yang sangat berbahaya'],['e2d','Mikroplastik']]},
  {p:'e',code:'E3',name:'Air & sumber daya laut',subs:[['e3a','Air']]},
  {p:'e',code:'E4',name:'Keanekaragaman hayati & ekosistem',subs:[['e4a','Pemicu langsung hilangnya keanekaragaman hayati'],['e4b','Dampak pada kondisi spesies'],['e4c','Dampak pada luas dan kondisi ekosistem'],['e4d','Dampak dan ketergantungan pada jasa ekosistem']]},
  {p:'e',code:'E5',name:'Ekonomi sirkular',subs:[['e5a','Aliran masuk sumber daya'],['e5b','Aliran keluar sumber daya terkait produk dan jasa'],['e5c','Limbah']]},
  {p:'s',code:'S1',name:'Tenaga kerja sendiri',subs:[['s1a','Kondisi kerja'],['s1b','Kesetaraan perlakuan dan peluang'],['s1c','Hak terkait pekerjaan lainnya']]},
  {p:'s',code:'S2',name:'Pekerja dalam rantai nilai',subs:[['s2a','Kondisi kerja'],['s2b','Kesetaraan perlakuan dan peluang'],['s2c','Hak terkait pekerjaan lainnya']]},
  {p:'s',code:'S3',name:'Masyarakat terdampak',subs:[['s3a','Spesifik entitas: kewargaan korporat']]},
  {p:'s',code:'S4',name:'Konsumen & pengguna akhir',subs:[['s4a','Keselamatan konsumen dan pengguna akhir']]},
  {p:'g',code:'G1',name:'Perilaku Bisnis',subs:[['g1a','Budaya korporat'],['g1b','Perlindungan pelapor pelanggaran'],['g1c','Keterlibatan politik'],['g1d','Pengelolaan hubungan dengan pemasok'],['g1e','Korupsi dan penyuapan']]},
];

export const DM_SUB = {};
DM_TOPICS.forEach(t => {
  t.subs.forEach(([id, n]) => {
    DM_SUB[id] = { id, n, topic: t };
  });
});
