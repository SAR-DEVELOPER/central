// Question mappings for Form 2
// Shared between form and results page

export interface QuestionRow {
  id: string;
  label: string;
}

export interface Section {
  id: string;
  title: string;
  rows: QuestionRow[];
}

// Likert scale label mappings
export const LIKERT_LABELS: Record<string, string> = {
  SS: "Sangat Setuju",
  S: "Setuju",
  AS: "Agak Setuju",
  ATS: "Agak Tidak Setuju",
  TS: "Tidak Setuju",
  STS: "Sangat Tidak Setuju",
};

// Section 1: KOMITE AUDIT ↔ AUDITOR EKSTERNAL (KAP) — 28 items
export const sections: Section[] = [
  {
    id: "A",
    title: "Merekomendasikan penunjukan Akuntan Publik kepada Pemegang Saham",
    rows: [
      { id: "A11", label: "Komite Audit bersama dengan Manajemen menyampaikan dan menyepakati Kerangka Acuan Kerja (KAK) pekerjaan audit laporan keuangan kepada KAP untuk didiskusikan." },
      { id: "A12", label: "Komite Audit memberikan saran dan rekomendasi yang berkaitan dengan kriteria, kualifikasi serta aspek teknis kepada KAP yang dituangkan dalam KAK." },
    ],
  },
  {
    id: "B",
    title: "Merekomendasikan penunjukan Akuntan Publik kepada Pemegang Saham",
    rows: [
      { id: "B13", label: "Komite Audit dan Manajemen melakukan diskusi dengan KAP terkait usulan imbalan jasa dengan mempertimbangkan KAK dan kewajaran imbalan jasa audit." },
      { id: "B14", label: "Komite Audit dan Manajemen bersama dengan KAP menyepakati penetapan usulan imbalan jasa." },
    ],
  },
  {
    id: "C",
    title: "Menyetujui Ketentuan Perikatan Audit",
    rows: [
      { id: "C15", label: "Komite Audit, Manajemen dan KAP melakukan pembahasan dan menyepakati ketentuan perikatan audit yang akan dituangkan dalam surat perikatan audit (engagement letter)." },
      { id: "C16", label: "Apabila terdapat perubahan atas ketentuan perikatan audit seperti perubahan ruang lingkup, maka Komite Audit, Manajemen dan KAP melakukan pembahasan terlebih dahulu sebelum menyepakati perubahan tersebut." },
    ],
  },
  {
    id: "D",
    title: "Menilai Independensi Auditor",
    rows: [
      { id: "D17", label: "KAP mengkonfirmasi independensinya dalam bentuk pernyataan tertulis kepada Komite Audit pada setiap pertemuan dengan Komite Audit." },
      { id: "D18", label: "KAP mengkomunikasikan kepada Komite Audit atas hal yang mungkin berdampak terhadap independensi KAP, seperti contoh adanya pemberian jasa non-asurans kepada Perusahaan, tenggat waktu yang ketat, pemberian fasilitas kepada auditor di lapangan, hubungan pribadi auditor dengan manajemen serta potensi employment offering." },
      { id: "D19", label: "KAP meminta persetujuan kepada Komite Audit apabila terdapat jasa non assurans (nonaudit) yang diberikan oleh KAP kepada Perusahaan atau Group Perusahaan." },
    ],
  },
  {
    id: "E",
    title: "Membahas Unsur Perencanaan Audit",
    rows: [
      { id: "E110", label: "KAP melakukan pembahasan dengan Komite Audit mengenai metodologi audit, susunan tim, ruang lingkup, rencana komunikasi, tenggat waktu, termasuk penetapan sampling, materialitas, area berisiko tinggi, transaksi signifikan selama tahun berjalan dan potensi fraud yang mempengaruhi laporan keuangan." },
      { id: "E111", label: "Komite Audit membahas dengan KAP terkait usulan mekanisme koordinasi dengan fungsi audit internal sebagai fungsi counterpart dalam audit laporan keuangan." },
      { id: "E112", label: "KAP menyampaikan kepada Komite Audit potensi Hal Audit Utama (Key Audit Matters/KAM) yang akan dicantumkan dalam opini auditor." },
      { id: "E113", label: "KAP berkomunikasi dengan Komite Audit mengenai sifat, luas dan alasan bisnis dari hubungan dan transaksi pihak berelasi yang signifikan serta kecukupan pengungkapan transaksi tersebut di dalam laporan keuangan." },
    ],
  },
  {
    id: "F",
    title: "Membahas tentang Kecurangan (Fraud)",
    rows: [
      { id: "F114", label: "KAP membahas dengan Komite Audit dan pihak lain (termasuk manajemen) mengenai pelaksanaan pengawasan terhadap proses manajemen dalam mengidentifikasi dan merespons risiko fraud dan pengendalian internal yang telah dilakukan manajemen untuk memitigasi risiko tersebut." },
      { id: "F115", label: "KAP menanyakan kepada Komite Audit dan pihak lain (termasuk manajemen dan audit internal), apakah Komite Audit mengetahui adanya kecurangan yang sebenarnya, dugaan, atau dugaan kecurangan yang berdampak pada Perusahaan." },
      { id: "F116", label: "KAP menyampaikan kepada Komite Audit mengenai rencana dan strategi audit untuk mengidentifikasi fraud atas laporan keuangan yang mungkin dilakukan oleh Manajemen." },
    ],
  },
  {
    id: "G",
    title: "Mengkomunikasikan Temuan Signifikan dari Audit",
    rows: [
      { id: "G117", label: "KAP mengkomunikasikan KAM kepada Komite Audit (sebagai pihak yang bertanggung jawab atas tata kelola), termasuk bagaimana luas pengungkapan hal tersebut dalam laporan audit." },
      { id: "G118", label: "KAP mengkomunikasikan pandangannya kepada Komite Audit tentang aspek kualitatif signifikan dari praktik akuntansi Perusahaan, termasuk kebijakan akuntansi, estimasi akuntansi, dan pengungkapan laporan keuangan." },
      { id: "G119", label: "KAP mengkomunikasikan kepada Komite Audit tentang adanya defisiensi signifikan dalam pengendalian internal, yang diidentifikasi selama audit." },
      { id: "G120", label: "KAP mengkomunikasikan kepada Komite Audit mengenai fraud yang teridentifikasi, informasi yang mengindikasikan kemungkinan adanya fraud, atau kelemahan dalam desain atau implementasi pengendalian internal untuk mencegah, mendeteksi dan melaporkan fraud." },
      { id: "G121", label: "KAP mengkomunikasikan kepada Komite Audit mengenai permasalahan signifikan yang terkait ketidakpatuhan terhadap peraturan perundang-undangan serta upaya penyelesaian yang tepat." },
      { id: "G122", label: "KAP mengkomunikasikan salah saji yang tidak dikoreksi (uncorrected misstatement) yang diidentifikasi oleh auditor disertai penjelasan mengapa salah saji tersebut tidak diperbaiki oleh Manajemen." },
      { id: "G123", label: "Sebelum laporan keuangan (audited) diterbitkan, konsep atas laporan tersebut beserta jurnal koreksi audit disampaikan terlebih dahulu kepada Komite Audit untuk dilakukan penelaahan." },
      { id: "G124", label: "KAP mengkomunikasikan kepada Komite Audit tentang peristiwa atau kondisi yang diidentifikasi oleh auditor yang dapat menimbulkan keraguan terhadap kemampuan Perusahaan untuk mempertahankan kelangsungan usahanya." },
    ],
  },
  {
    id: "H",
    title: "Memfasilitasi Proses Audit",
    rows: [
      { id: "H125", label: "Terdapat dialog yang terbuka antara Komite Audit dan KAP baik secara formal maupun informal tentang hal-hal yang mempengaruhi laporan keuangan, proses audit dan kualitas audit." },
      { id: "H126", label: "KAP mengkomunikasikan kepada Komite Audit adanya kesulitan signifikan yang dihadapi selama audit." },
      { id: "H127", label: "Selama proses audit laporan keuangan, KAP mengkomunikasikan kepada Komite Audit apabila terdapat ketidaksepakatan dengan Manajemen, baik yang telah diselesaikan atau belum terselesaikan." },
      { id: "H128", label: "KAP menanggapi pertanyaan dan permintaan komunikasi dari Komite Audit secara memadai dan tepat waktu." },
    ],
  },
];

// Section 2: AUDITOR EKSTERNAL ↔ AUDITOR INTERNAL (SPI) — 14 items
export const sections2: Section[] = [
  {
    id: "A",
    title: "Penggunaan Pekerjaan Fungsi Audit Internal dalam Audit Laporan Keuangan",
    rows: [
      { id: "X1", label: "SPI dan KAP melakukan koordinasi mengenai hasil pekerjaan Fungsi Audit Internal yang dapat digunakan oleh KAP dalam mendukung perencanaan, memberikan petunjuk dalam memperoleh bukti, maupun melakukan asistensi penerapan pengendalian internal dalam rangka audit laporan keuangan." },
      { id: "X2", label: "SPI dan KAP mendiskusikan mengenai usulan mekanisme koordinasi, yang mencakup waktu pelaksanaan, PIC yang terlibat, serta agenda pembahasan, sebagai fungsi counterpart dalam rangka audit laporan keuangan." },
    ],
  },
  {
    id: "B",
    title: "Penilaian atas Obyektivitas dan Kompetensi dari Fungsi Audit Internal",
    rows: [
      { id: "X3", label: "SPI dan KAP mendiskusikan mengenai ketersediaan sumber daya dan kompetensi secara memadai dan tepat yang dimiliki oleh fungsi audit internal berdasarkan ukuran dan kompleksitas Perusahaan." },
      { id: "X4", label: "KAP mendiskusikan mengenai kerangka pelaporan keuangan Perusahaan serta memastikan SPI memiliki keahlian dan pengetahuan atas kerangka pelaporan keuangan tersebut." },
      { id: "X5", label: "SPI dan KAP mendiskusikan mengenai kecukupan pelatihan teknis dan kecakapan yang dimiliki oleh auditor internal dalam memahami komponen laporan keuangan serta risiko dan pengendalian internal yang terkait dengan laporan keuangan. Sebagai Contoh, auditor internal memilik pengalaman dan kualifikasi profesional yang relevan terkait penyusunan dan pemeriksaan laporan keuangan." },
      { id: "X6", label: "SPI memberikan penjelasan kepada KAP mengenai metodologi dan teknik yang digunakan oleh auditor internal dalam melakukan reviu pengendalian internal dalam penyusunan laporan keuangan untuk meningkatkan kepercayaan auditor eksternal terhadap hasil pekerjaan yang dilakukan oleh auditor internal." },
    ],  
  },
  {
    id: "C",
    title: "Akses terhadap Laporan Hasil Audit",
    rows: [
      { id: "X7", label: "SPI memberikan akses kepada KAP atas Laporan Hasil Audit Internal yang relevan dengan proses audit laporan keuangan." },
      { id: "X8", label: "SPI menginformasikan kepada KAP tentang hal–hal signifikan yang menjadi perhatian dari auditor internal yang mungkin berpengaruh terhadap proses audit laporan keuangan." },
      { id: "X9", label: "KAP memberikan akses kepada SPI mengenai materi presentasi KAP dan management letter untuk digunakan sebagai masukan bagi auditor internal dalam menentukan fokus dalam pekerjaan audit internal di masa mendatang yang berkaitan dengan kelemahan pengendalian internal pada laporan keuangan." },
    ],
  },
  {
    id: "D",
    title: "Koordinasi antara Auditor Internal dan Auditor Eksternal",
    rows: [
      { id: "X10", label: "SPI dan KAP menjadwalkan diskusi secara rutin selama proses audit untuk memastikan koordinasi atas hasil pekerjaan audit dan penyelesaian atas kendala dalam kegiatan audit secara efektif dan efisien." },
      { id: "X11", label: "KAP memberikan informasi kepada SPI mengenai waktu audit secara keseluruhan, termasuk area berisiko tinggi yang mempengaruhi laporan keuangan." },
      { id: "X12", label: "SPI dan KAP saling berbagi atau mengintegrasikan rencana auditnya." },
      { id: "X13", label: "Terdapat dialog yang terbuka antara KAP dan SPI baik secara formal maupun informal tentang hal-hal yang mempengaruhi laporan keuangan, proses audit dan kualitas audit." },
    ],
  },
];

// Create a map of question ID to question text for easy lookup
export const questionMap: Record<string, string> = {};
export const sectionMap: Record<string, { sectionTitle: string; questionNumber: number }> = {};

// Build the maps
let questionNumber = 1;
sections.forEach((section) => {
  section.rows.forEach((row) => {
    questionMap[row.id] = row.label;
    sectionMap[row.id] = {
      sectionTitle: section.title,
      questionNumber: questionNumber++,
    };
  });
});

sections2.forEach((section) => {
  section.rows.forEach((row) => {
    questionMap[row.id] = row.label;
    sectionMap[row.id] = {
      sectionTitle: section.title,
      questionNumber: questionNumber++,
    };
  });
});

