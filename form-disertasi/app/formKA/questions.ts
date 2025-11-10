// Question mappings for Form 1
// Shared between form and results page

export interface QuestionRow {
    id: string;
    label: string;
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

export interface Section {
    id: string;
    title: string;
    rows: QuestionRow[];
}

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
            { id: "D17", label: "KAP mengkonfirmasi independensinya kepada Komite Audit pada setiap pertemuan dengan Komite Audit." },
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

// Section 2: KOMITE AUDIT ↔ AUDITOR INTERNAL (SPI) — 20 items
export const sections2: Section[] = [
    {
        id: "A",
        title: "Mendiskusikan Elemen dari Perencanaan Audit Internal",
        rows: [
            { id: "A21", label: "SPI menyampaikan usulan rencana audit internal untuk mendapatkan masukan dari Komite Audit." },
            { id: "A22", label: "SPI mengkomunikasikan kepada Komite Audit terkait aspek pertimbangan risiko perusahaan dalam rencana audit internal, termasuk resiko operasional, keuangan, dan kepatuhan." },
            { id: "A23", label: "SPI mengkomunikasikan kepada Komite Audit dalam rencana auditnya mengenai rincian struktur sumber daya staf audit internal, termasuk aspek kecukupan, ketrampilan, pengalaman serta kualifikasi personil." },
            { id: "A24", label: "Komite Audit memberi masukan dan memastikan mengenai kecukupan anggaran untuk melaksanakan rencana audit internal." },
            { id: "A25", label: "SPI menginformasikan kepada Komite Audit atas setiap perubahan rencana kerja audit internal beserta penjelasan memadai terkait hal yang mendasari perubahan tersebut." },
        ],
    },
    {
        id: "B",
        title: "Menilai Independensi",
        rows: [
            { id: "B26", label: "SPI menyampaikan pernyataan independensi Fungsi Audit Internal kepada Komite Audit paling sedikit setahun sekali." },
            { id: "B27", label: "SPI dan Komite Audit secara periodik melakukan pembahasan mengenai proses dan hasil audit internal tanpa kehadiran Manajemen." },
            { id: "B28", label: "SPI melaporkan kepada Komite Audit setiap aktivitas non audit yang dilakukan oleh SPI yang berpotensi menurunkan tingkat independensinya." },
        ],
    },
    {
        id: "C",
        title: "Mengkomunikasikan Hal – Hal yang timbul dari Hasil Audit Internal",
        rows: [
            { id: "C29", label: "SPI menyampaikan laporan kegiatan audit internal kepada Komite Audit secara berkala yang mencakup temuan signifikan yang berkaitan dengan kinerja operasional maupun pelaporan keuangan" },
            { id: "C210", label: "Laporan kegiatan SPI yang disampaikan kepada Komite Audit mencakup rekomendasi yang dapat memberikan dampak perbaikan terhadap kinerja operasional maupun pelaporan keuangan." },
            { id: "C211", label: "SPI menyampaikan kepada Komite Audit apabila terdapat perbedaan (varians) dari tujuan audit internal, jadwal kerja dan anggaran." },
            { id: "C212", label: "SPI melaporkan kepada Komite Audit setiap adanya konflik kepentingan yang teridentifikasi serta mitigasi yang dilakukan dalam rangka menjaga independensinya." },
            { id: "C213", label: "SPI memberikan saran adanya perubahan pada profil risiko entitas berdasarkan hasil audit internal, di dalam laporannya kepada Komite Audit." },
        ],
    },
    {
        id: "D",
        title: "Menyampaikan laporan secara berkala kepada Komite Audit",
        rows: [
            { id: "D214", label: "SPI mengkomunikasikan kepada Komite audit mengenai hasil koordinasinya dengan Auditor Eksternal selama proses audit." },
            { id: "D215", label: "SPI menyampaikan laporan tahunan terkait hasil kerjanya kepada Komite Audit, termasuk penilaian terhadap efektivitas sistem pengendalian organisasi." },
            { id: "D216", label: "SPI menyampaikan kepada Komite audit mengenai pola, tren, dan masalah sistemik yang diidentifikasi dari hasil auditnya." },
        ],
    },
    {
        id: "E",
        title: "Memfasilitasi Proses Audit Internal",
        rows: [
            { id: "E217", label: "SPI merespon pertanyaan dan komunikasi secara terbuka dengan Komite audit baik formal dan informal atas semua informasi yang mempengaruhi laporan keuangan terkait proses maupun kualitas audit yang dilakukan oleh KAP." },
            { id: "E218", label: "SPI mengkomunikasikan kepada Komite Audit adanya kesulitan signifikan yang dihadapi selama audit." },
            { id: "E219", label: "SPI mengkomunikasikan kepada Komite Audit apabila terdapat ketidaksepakatan dengan Manajemen, baik yang telah diselesaikan atau belum terselesaikan." },
            { id: "E220", label: "SPI menanggapi pertanyaan dan permintaan komunikasi dari Komite Audit secara memadai dan tepat waktu." },
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

