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

// Section 1: AUDITOR INTERNAL ↔ KOMITE AUDIT — 20 items
export const sections: Section[] = [
    {
        id: "A",
        title: "Mendiskusikan Elemen dari Perencanaan Audit Internal",
        rows: [
            { id: "A11", label: "SPI menyampaikan usulan rencana audit internal untuk mendapatkan masukan dari Komite Audit." },
            { id: "A12", label: "SPI mengkomunikasikan kepada Komite Audit terkait aspek pertimbangan risiko perusahaan dalam rencana audit internal, termasuk resiko operasional, keuangan, dan kepatuhan." },
            { id: "A13", label: "SPI mengkomunikasikan kepada Komite Audit dalam rencana auditnya mengenai rincian struktur sumber daya staf audit internal, termasuk aspek kecukupan, ketrampilan, pengalaman serta kualifikasi personil." },
            { id: "A14", label: "Komite Audit memberi masukan dan memastikan mengenai kecukupan anggaran untuk melaksanakan rencana audit internal." },
            { id: "A15", label: "SPI menginformasikan kepada Komite Audit atas setiap perubahan rencana kerja audit internal beserta penjelasan memadai terkait hal yang mendasari perubahan tersebut." },
        ],
    },
    {
        id: "B",
        title: "Menilai Independensi",
        rows: [
            { id: "B16", label: "SPI menyampaikan pernyataan independensi Fungsi Audit Internal kepada Komite Audit paling sedikit setahun sekali." },
            { id: "B17", label: "SPI dan Komite Audit secara periodik melakukan pembahasan mengenai proses dan hasil audit internal tanpa kehadiran Manajemen." },
            { id: "B18", label: "SPI melaporkan kepada Komite Audit setiap aktivitas non audit yang dilakukan oleh SPI yang berpotensi menurunkan tingkat independensinya." },
        ],
    },
    {
        id: "C",
        title: "Mengkomunikasikan Hal – Hal yang timbul dari Hasil Audit Internal",
        rows: [
            { id: "C19", label: "SPI menyampaikan laporan kegiatan audit internal kepada Komite Audit secara berkala yang mencakup temuan signifikan yang berkaitan dengan kinerja operasional maupun pelaporan keuangan" },
            { id: "C20", label: "Laporan kegiatan SPI yang disampaikan kepada Komite Audit mencakup rekomendasi yang dapat memberikan dampak perbaikan terhadap kinerja operasional maupun pelaporan keuangan." },
            { id: "C21", label: "SPI menyampaikan kepada Komite Audit apabila terdapat perbedaan (varians) dari tujuan audit internal, jadwal kerja dan anggaran." },
            { id: "C22", label: "SPI melaporkan kepada Komite Audit setiap adanya konflik kepentingan yang teridentifikasi serta mitigasi yang dilakukan dalam rangka menjaga independensinya." },
            { id: "C23", label: "SPI memberikan saran adanya perubahan pada profil risiko entitas berdasarkan hasil audit internal, di dalam laporannya kepada Komite Audit." },
        ],
    },
    {
        id: "D",
        title: "Menyampaikan laporan secara berkala kepada Komite Audit",
        rows: [
            { id: "D24", label: "SPI mengkomunikasikan kepada Komite audit mengenai hasil koordinasinya dengan Auditor Eksternal selama proses audit." },
            { id: "D25", label: "SPI menyampaikan laporan tahunan terkait hasil kerjanya kepada Komite Audit, termasuk penilaian terhadap efektivitas sistem pengendalian organisasi." },
            { id: "D26", label: "SPI menyampaikan kepada Komite audit mengenai pola, tren, dan masalah sistemik yang diidentifikasi dari hasil auditnya." },
        ],
    },
    {
        id: "E",
        title: "Memfasilitasi Proses Audit Internal",
        rows: [
            { id: "E27", label: "SPI merespon pertanyaan dan komunikasi secara terbuka dengan Komite audit baik formal dan informal atas semua informasi yang mempengaruhi laporan keuangan terkait proses maupun kualitas audit yang dilakukan oleh KAP." },
            { id: "E28", label: "SPI mengkomunikasikan kepada Komite Audit adanya kesulitan signifikan yang dihadapi selama audit." },
            { id: "E29", label: "SPI mengkomunikasikan kepada Komite Audit apabila terdapat ketidaksepakatan dengan Manajemen, baik yang telah diselesaikan atau belum terselesaikan." },
            { id: "E210", label: "SPI menanggapi pertanyaan dan permintaan komunikasi dari Komite Audit secara memadai dan tepat waktu." },
        ],
    },
];

// Section 2: AUDITOR INTERNAL ↔ AUDITOR EKSTERNAL — 20 items
export const sections2: Section[] = [
    {
        id: "A",
        title: "Penggunaan Fungsi Audit Internal sebagai Fungsi Counterpart dalam Audit Laporan Keuangan",
        rows: [
            { id: "A21", label: "SPI dan KAP melakukan koordinasi mengenai hasil pekerjaan Fungsi Audit Internal yang dapat digunakan oleh KAP dalam mendukung perencanaan, memberikan petunjuk dalam memperoleh bukti, maupun melakukan asistensi penerapan pengendalian internal dalam rangka audit laporan keuangan." },
            { id: "A22", label: "SPI dan KAP mendiskusikan mengenai usulan mekanisme koordinasi, yang mencakup waktu pelaksanaan, PIC yang terlibat, serta agenda pembahasan, sebagai fungsi counterpart dalam rangka audit laporan keuangan." },
        ],
    },
    {
        id: "B",
        title: "Penilaian atas Obyektivitas dan Kompetensi dari Fungsi Audit Internal",
        rows: [
            { id: "B23", label: "SPI dan KAP mendiskusikan mengenai ketersediaan sumber daya dan kompetensi secara memadai dan tepat yang dimiliki oleh fungsi audit internal berdasarkan ukuran dan kompleksitas Perusahaan." },
            { id: "B24", label: "KAP mendiskusikan mengenai kerangka pelaporan keuangan Perusahaan serta memastikan SPI memiliki keahlian dan pengetahuan atas kerangka pelaporan keuangan tersebut." },
            { id: "B25", label: "SPI dan KAP mendiskusikan mengenai kecukupan pelatihan teknis dan kecakapan yang dimiliki oleh auditor internal dalam memahami komponen laporan keuangan serta risiko dan pengendalian internal yang terkait dengan laporan keuangan. Sebagai contoh, auditor internal memilik pengalaman dan kualifikasi profesional yang relevan terkait penyusunan dan pemeriksaan laporan keuangan." },
            { id: "B26", label: "SPI memberikan penjelasan kepada KAP mengenai metodologi dan teknik yang digunakan oleh auditor internal dalam melakukan reviu pengendalian internal dalam penyusunan laporan keuangan untuk meningkatkan kepercayaan auditor eksternal terhadap hasil pekerjaan yang dilakukan oleh auditor internal." },
        ],
    },
    {
        id: "C",
        title: "Akses terhadap Laporan Hasil Audit",
        rows: [
            { id: "C27", label: "SPI memberikan akses kepada KAP atas Laporan Hasil Audit Internal yang relevan dengan proses audit laporan keuangan." },
            { id: "C28", label: "SPI menginformasikan kepada KAP tentang hal–hal signifikan yang menjadi perhatian dari auditor internal yang mungkin berpengaruh terhadap proses audit laporan keuangan." },
            { id: "C29", label: "KAP memberikan akses kepada SPI mengenai materi presentasi KAP dan management letter untuk digunakan sebagai masukan bagi auditor internal dalam menentukan fokus dalam pekerjaan audit internal di masa mendatang yang berkaitan dengan kelemahan pengendalian internal pada laporan keuangan." },
        ],
    },
    {
        id: "D",
        title: "Koordinasi antara Auditor Internal dan Auditor Eksternal",
        rows: [
            { id: "D21", label: "SPI dan KAP menjadwalkan diskusi secara rutin selama proses audit untuk memastikan koordinasi atas hasil pekerjaan audit dan penyelesaian atas kendala dalam kegiatan audit secara efektif dan efisien." },
            { id: "D22", label: "KAP memberikan informasi kepada SPI mengenai waktu audit secara keseluruhan, termasuk area berisiko tinggi yang mempengaruhi laporan keuangan." },
            { id: "D23", label: "SPI dan KAP saling berbagi atau mengintegrasikan rencana auditnya." },
            { id: "D30", label: "Terdapat dialog yang terbuka antara KAP dan SPI baik secara formal maupun informal tentang hal-hal yang mempengaruhi laporan keuangan, proses audit dan kualitas audit." },
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

