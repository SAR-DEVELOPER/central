"use client";

import React, { useMemo, useState } from "react";

// -----------------------------
// Helper Types
// -----------------------------

type LikertChoice = "SS" | "S" | "AS" | "ATS" | "TS" | "STS"; // Sangat Setuju ... Sangat Tidak Setuju

interface QuestionRow {
  id: string;
  label: string;
}

interface Section {
  id: string;
  title: string;
  rows: QuestionRow[];
}

// -----------------------------
// Component
// -----------------------------

export default function DissertationSurveyForm() {
  // --- Configurable form schema (you can change freely) ---
  const likertChoices: { key: LikertChoice; text: string }[] = [
    { key: "SS", text: "SS" },
    { key: "S", text: "S" },
    { key: "AS", text: "AS" },
    { key: "ATS", text: "ATS" },
    { key: "TS", text: "TS" },
    { key: "STS", text: "STS" },
  ];

  const sections: Section[] = useMemo(
    () => [
      // INTERAKSI AUDITOR INTERNAL DENGAN KOMITE AUDIT (20 items)
      {
        id: "A",
        title: "Mendiskusikan Elemen dari Perencanaan Audit Internal",
        rows: [
          { id: "A1", label: "SPI menyampaikan usulan rencana audit internal untuk mendapatkan masukan dari Komite Audit." },
          { id: "A2", label: "SPI mengkomunikasikan kepada Komite Audit terkait aspek pertimbangan risiko perusahaan dalam rencana audit internal, termasuk resiko operasional, keuangan, dan kepatuhan." },
          { id: "A3", label: "SPI mengkomunikasikan kepada Komite Audit dalam rencana auditnya mengenai rincian struktur sumber daya staf audit internal, termasuk aspek kecukupan, ketrampilan, pengalaman serta kualifikasi personil." },
          { id: "A4", label: "Komite Audit memberi masukan dan memastikan mengenai kecukupan anggaran untuk melaksanakan rencana audit internal." },
          { id: "A5", label: "SPI menginformasikan kepada Komite Audit atas setiap perubahan rencana kerja audit internal beserta penjelasan memadai terkait hal yang mendasari perubahan tersebut." },
        ],
      },
      {
        id: "B",
        title: "Menilai Independensi",
        rows: [
          { id: "B6", label: "SPI menyampaikan pernyataan independensi Fungsi Audit Internal kepada Komite Audit paling sedikit setahun sekali." },
          { id: "B7", label: "SPI dan Komite Audit secara periodik melakukan pembahasan mengenai proses dan hasil audit internal tanpa kehadiran Manajemen." },
          { id: "B8", label: "SPI melaporkan kepada Komite Audit setiap aktivitas non audit yang dilakukan oleh SPI yang berpotensi menurunkan tingkat independensinya." },
        ],
      },
      {
        id: "C",
        title: "Mengkomunikasikan Hal–Hal yang Timbul dari Hasil Audit Internal",
        rows: [
          { id: "C9", label: "SPI menyampaikan laporan kegiatan audit internal kepada Komite Audit secara berkala yang mencakup temuan signifikan yang berkaitan dengan kinerja operasional maupun pelaporan keuangan." },
          { id: "C10", label: "Laporan kegiatan SPI yang disampaikan kepada Komite Audit mencakup rekomendasi yang dapat memberikan dampak perbaikan terhadap kinerja operasional maupun pelaporan keuangan." },
          { id: "C11", label: "SPI menyampaikan kepada Komite Audit apabila terdapat perbedaan (varians) dari tujuan audit internal, jadwal kerja dan anggaran." },
          { id: "C12", label: "SPI melaporkan kepada Komite Audit setiap adanya konflik kepentingan yang teridentifikasi serta mitigasi yang dilakukan dalam rangka menjaga independensinya." },
          { id: "C13", label: "SPI memberikan saran adanya perubahan pada profil risiko entitas berdasarkan hasil audit internal, di dalam laporannya kepada Komite Audit." },
        ],
      },
      {
        id: "D",
        title: "Menyampaikan Laporan secara Berkala kepada Komite Audit",
        rows: [
          { id: "D14", label: "SPI mengkomunikasikan kepada Komite audit mengenai hasil koordinasinya dengan Auditor Eksternal selama proses audit." },
          { id: "D15", label: "SPI menyampaikan laporan tahunan terkait hasil kerjanya kepada Komite Audit, termasuk penilaian terhadap efektivitas sistem pengendalian organisasi." },
          { id: "D16", label: "SPI menyampaikan kepada Komite audit mengenai pola, tren, dan masalah sistemik yang diidentifikasi dari hasil auditnya." },
        ],
      },
      {
        id: "E",
        title: "Memfasilitasi Proses Audit Internal",
        rows: [
          { id: "E17", label: "SPI merespon pertanyaan dan komunikasi secara terbuka dengan Komite audit baik formal dan informal atas semua informasi yang mempengaruhi laporan keuangan terkait proses maupun kualitas audit yang dilakukan oleh KAP." },
          { id: "E18", label: "SPI mengkomunikasikan kepada Komite Audit adanya kesulitan signifikan yang dihadapi selama audit." },
          { id: "E19", label: "SPI mengkomunikasikan kepada Komite Audit apabila terdapat ketidaksepakatan dengan Manajemen, baik yang telah diselesaikan atau belum terselesaikan." },
          { id: "E20", label: "SPI menanggapi pertanyaan dan permintaan komunikasi dari Komite Audit secara memadai dan tepat waktu." },
        ],
      },

      // INTERAKSI AUDITOR INTERNAL DENGAN AUDITOR EKSTERNAL (14 items)
      {
        id: "A-EXT",
        title: "Penggunaan Pekerjaan Fungsi Audit Internal dalam Audit Laporan Keuangan",
        rows: [
          { id: "X1", label: "SPI dan KAP melakukan koordinasi mengenai hasil pekerjaan Fungsi Audit Internal yang dapat digunakan oleh KAP dalam mendukung perencanaan, memberikan petunjuk dalam memperoleh bukti, maupun melakukan asistensi penerapan pengendalian internal dalam rangka audit laporan keuangan." },
          { id: "X2", label: "SPI dan KAP mendiskusikan mengenai usulan mekanisme koordinasi, yang mencakup waktu pelaksanaan, PIC yang terlibat, serta agenda pembahasan, sebagai fungsi counterpart dalam rangka audit laporan keuangan." },
        ],
      },
      {
        id: "B-EXT",
        title: "Penilaian atas Obyektivitas dan Kompetensi dari Fungsi Audit Internal",
        rows: [
          { id: "X3", label: "SPI dan KAP mendiskusikan mengenai ketersediaan sumber daya dan kompetensi secara memadai dan tepat yang dimiliki oleh fungsi audit internal berdasarkan ukuran dan kompleksitas Perusahaan." },
          { id: "X4", label: "KAP mendiskusikan mengenai kerangka pelaporan keuangan Perusahaan serta memastikan SPI memiliki keahlian dan pengetahuan atas kerangka pelaporan keuangan tersebut." },
          { id: "X5", label: "SPI dan KAP mendiskusikan mengenai kecukupan pelatihan teknis dan kecakapan yang dimiliki oleh auditor internal dalam memahami komponen laporan keuangan serta risiko dan pengendalian internal yang terkait dengan laporan keuangan." },
          { id: "X7", label: "SPI memberikan penjelasan kepada KAP mengenai metodologi dan teknik yang digunakan oleh auditor internal dalam melakukan reviu pengendalian internal dalam penyusunan laporan keuangan untuk meningkatkan kepercayaan auditor eksternal terhadap hasil pekerjaan yang dilakukan oleh auditor internal." },
        ],
      },
      {
        id: "C-EXT",
        title: "Akses terhadap Laporan Hasil Audit",
        rows: [
          { id: "X8", label: "SPI memberikan akses kepada KAP atas Laporan Hasil Audit Internal yang relevan dengan proses audit laporan keuangan." },
          { id: "X9", label: "SPI menginformasikan kepada KAP tentang hal–hal signifikan yang menjadi perhatian dari auditor internal yang mungkin berpengaruh terhadap proses audit laporan keuangan." },
          { id: "X10", label: "KAP memberikan akses kepada SPI mengenai materi presentasi KAP dan management letter untuk digunakan sebagai masukan bagi auditor internal dalam menentukan fokus dalam pekerjaan audit internal di masa mendatang yang berkaitan dengan kelemahan pengendalian internal pada laporan keuangan." },
        ],
      },
      {
        id: "D-EXT",
        title: "Koordinasi antara Auditor Internal dan Auditor Eksternal",
        rows: [
          { id: "X11", label: "SPI dan KAP menjadwalkan diskusi secara rutin selama proses audit untuk memastikan koordinasi atas hasil pekerjaan audit dan penyelesaian atas kendala dalam kegiatan audit secara efektif dan efisien." },
          { id: "X12", label: "KAP memberikan informasi kepada SPI mengenai waktu audit secara keseluruhan, termasuk area berisiko tinggi yang mempengaruhi laporan keuangan." },
          { id: "X13", label: "SPI dan KAP saling berbagi atau mengintegrasikan rencana auditnya." },
          { id: "X14", label: "Terdapat dialog yang terbuka antara KAP dan SPI baik secara formal maupun informal tentang hal-hal yang mempengaruhi laporan keuangan, proses audit dan kualitas audit." },
        ],
      },
    ],
    []
  );

  // --- Form state ---
  const [identity, setIdentity] = useState({
    nama: "",
    perusahaan: "",
    jabatan: "",
    jenisKelamin: "",
    umur: "",
    pendidikan: "",
    consent: false,
  });

  const [openEnded, setOpenEnded] = useState({
    comments: "",
    suggestions: "",
  });

  // FIX: removed stray brace in generic type
  const [answers, setAnswers] = useState<Record<string, LikertChoice | "">>(() => {
    const init: Record<string, LikertChoice | ""> = {};
    sections.forEach((s) => s.rows.forEach((r) => (init[r.id] = "")));
    return init;
  });

  // --- Handlers ---
  function setAnswer(rowId: string, value: LikertChoice) {
    setAnswers((prev) => ({ ...prev, [rowId]: value }));
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Basic client-side validation
    const missing: string[] = Object.entries(answers)
      .filter(([, v]) => !v)
      .map(([k]) => k);

    if (!identity.nama || !identity.perusahaan || !identity.jabatan) {
      alert("Silakan lengkapi nama, perusahaan, dan jabatan Anda.");
      return;
    }
    if (!identity.jenisKelamin || !identity.umur || !identity.pendidikan) {
      alert("Silakan lengkapi jenis kelamin, umur, dan pendidikan terakhir Anda.");
      return;
    }
    if (!identity.consent) {
      alert("Silakan berikan persetujuan untuk melanjutkan.");
      return;
    }
    if (missing.length) {
      alert(`Silakan jawab semua pertanyaan Likert. Belum dijawab: ${missing.join(", ")}`);
      return;
    }

    const payload = {
      identity,
      answers,
      openEnded,
      submittedAt: new Date().toISOString(),
    };

    // For demo: show JSON. Replace with real API call (e.g., fetch('/api/survey', {method:'POST', body: JSON.stringify(payload)}))
    console.log(payload);
    alert("Terima kasih! Periksa console untuk melihat data yang dikirim.");
  }

  function clearForm() {
    setIdentity({ nama: "", perusahaan: "", jabatan: "", jenisKelamin: "", umur: "", pendidikan: "", consent: false });
    setOpenEnded({ comments: "", suggestions: "" });
    setAnswers((prev) => {
      const clone: Record<string, LikertChoice | ""> = { ...prev };
      Object.keys(clone).forEach((k) => (clone[k] = ""));
      return clone;
    });
  }

  // --- UI ---
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 relative overflow-x-hidden">
      {/* Decorative background elements */}
      <div className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(60%_60%_at_50%_20%,black,transparent)]">
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-blue-200/50 blur-3xl" />
        <div className="absolute top-1/3 -right-24 h-96 w-96 rounded-full bg-emerald-200/50 blur-3xl" />
      </div>

      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">Kuesioner Disertasi</h1>
          <p className="mt-2 text-slate-800 max-w-2xl">Silakan lengkapi informasi partisipan dan berikan tanggapan terhadap pernyataan di bawah ini dengan memilih satu opsi per baris.</p>
        </div>
      </header>

      <main className="px-4 sm:px-6 lg:px-8 pb-24">
        <div className="mx-auto max-w-7xl flex flex-col lg:flex-row gap-8">
          {/* Main form */}
          <div className="flex-1 min-w-0">
            <form onSubmit={onSubmit} className="space-y-8">
              {/* Card: Identity */}
              <section className="rounded-2xl border border-slate-200 bg-white/80 shadow-sm backdrop-blur p-6 sm:p-8">
                <h2 className="text-xl font-semibold text-slate-900">IDENTITAS RESPONDEN – INTERNAL AUDIT</h2>

                <div className="mt-6 space-y-6">
                  {/* Text inputs */}
                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="nama" className="text-sm font-medium text-slate-900">Nama</label>
                      <input id="nama" required value={identity.nama} onChange={(e) => setIdentity({ ...identity, nama: e.target.value })} className="h-11 rounded-xl border border-slate-300 px-4 text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-200" placeholder="Masukkan nama Anda" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="perusahaan" className="text-sm font-medium text-slate-900">Perusahaan</label>
                      <input id="perusahaan" required value={identity.perusahaan} onChange={(e) => setIdentity({ ...identity, perusahaan: e.target.value })} className="h-11 rounded-xl border border-slate-300 px-4 text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-200" placeholder="Masukkan nama perusahaan" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="jabatan" className="text-sm font-medium text-slate-900">Jabatan</label>
                      <input id="jabatan" required value={identity.jabatan} onChange={(e) => setIdentity({ ...identity, jabatan: e.target.value })} className="h-11 rounded-xl border border-slate-300 px-4 text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-200" placeholder="Masukkan jabatan Anda" />
                    </div>
                  </div>

                  {/* Jenis Kelamin */}
                  <div className="flex flex-col gap-3">
                    <label className="text-sm font-medium text-slate-900">Jenis Kelamin</label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="jenisKelamin" value="Laki-laki" checked={identity.jenisKelamin === "Laki-laki"} onChange={(e) => setIdentity({ ...identity, jenisKelamin: e.target.value })} className="h-4 w-4 accent-blue-600" />
                        <span className="text-sm text-slate-900">Laki-laki</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="jenisKelamin" value="Perempuan" checked={identity.jenisKelamin === "Perempuan"} onChange={(e) => setIdentity({ ...identity, jenisKelamin: e.target.value })} className="h-4 w-4 accent-blue-600" />
                        <span className="text-sm text-slate-900">Perempuan</span>
                      </label>
                    </div>
                  </div>

                  {/* Umur */}
                  <div className="flex flex-col gap-3">
                    <label className="text-sm font-medium text-slate-900">Umur</label>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="umur" value="< 35 tahun" checked={identity.umur === "< 35 tahun"} onChange={(e) => setIdentity({ ...identity, umur: e.target.value })} className="h-4 w-4 accent-blue-600" />
                        <span className="text-sm text-slate-900">&lt; 35 tahun</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="umur" value="35 – 45 tahun" checked={identity.umur === "35 – 45 tahun"} onChange={(e) => setIdentity({ ...identity, umur: e.target.value })} className="h-4 w-4 accent-blue-600" />
                        <span className="text-sm text-slate-900">35 – 45 tahun</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="umur" value="> 45 tahun" checked={identity.umur === "> 45 tahun"} onChange={(e) => setIdentity({ ...identity, umur: e.target.value })} className="h-4 w-4 accent-blue-600" />
                        <span className="text-sm text-slate-900">&gt; 45 tahun</span>
                      </label>
                    </div>
                  </div>

                  {/* Pendidikan Terakhir */}
                  <div className="flex flex-col gap-3">
                    <label className="text-sm font-medium text-slate-900">Pendidikan Terakhir</label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="pendidikan" value="S1" checked={identity.pendidikan === "S1"} onChange={(e) => setIdentity({ ...identity, pendidikan: e.target.value })} className="h-4 w-4 accent-blue-600" />
                        <span className="text-sm text-slate-900">S1</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="pendidikan" value="S2" checked={identity.pendidikan === "S2"} onChange={(e) => setIdentity({ ...identity, pendidikan: e.target.value })} className="h-4 w-4 accent-blue-600" />
                        <span className="text-sm text-slate-900">S2</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="pendidikan" value="S3" checked={identity.pendidikan === "S3"} onChange={(e) => setIdentity({ ...identity, pendidikan: e.target.value })} className="h-4 w-4 accent-blue-600" />
                        <span className="text-sm text-slate-900">S3</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* <div className="mt-6 flex items-start gap-3">
                  <input id="consent" type="checkbox" checked={identity.consent} onChange={(e) => setIdentity({ ...identity, consent: e.target.checked })} className="mt-1 h-5 w-5 rounded border-slate-300" />
                  <label htmlFor="consent" className="text-sm text-slate-800">Saya setuju untuk berpartisipasi dalam penelitian ini dan menyetujui penggunaan tanggapan saya secara anonim untuk tujuan penelitian.</label>
                </div> */}
              </section>

              {/* Card: Likert Table */}
              <section className="rounded-2xl border border-slate-200 bg-white/80 shadow-sm backdrop-blur p-4 sm:p-6">
                <h2 className="px-2 sm:px-3 text-xl font-semibold text-slate-900">Kuesioner (Skala Likert)</h2>
                <div className="mt-4 overflow-x-auto">
                  <table className="min-w-full border-separate border-spacing-y-2">
                    <thead>
                      <tr>
                        <th className="sticky left-0 z-10 bg-white/90 backdrop-blur px-3 py-3 text-left text-sm font-semibold text-slate-900 rounded-l-xl border border-slate-200">No</th>
                        <th className="sticky left-[3.5rem] sm:left-[4rem] z-10 bg-white/90 backdrop-blur px-3 py-3 text-left text-sm font-semibold text-slate-900 border-t border-b border-slate-200">Pertanyaan</th>
                        {likertChoices.map((c) => (
                          <th key={c.key} className="px-3 py-3 text-xs sm:text-sm font-semibold text-slate-900 text-center border border-slate-200">
                            {c.text}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {sections.map((sec) => (
                        <React.Fragment key={sec.id}>
                          <tr>
                            <td colSpan={2 + likertChoices.length} className="px-3 py-2 text-left text-sm font-semibold text-slate-900 bg-slate-50 rounded-xl border border-slate-200">{sec.id}. {sec.title}</td>
                          </tr>
                          {sec.rows.map((row, idx) => (
                            <tr key={row.id} className="bg-white rounded-xl shadow-sm">
                              <td className="align-top px-3 py-3 text-sm text-slate-900 border border-slate-200 rounded-l-xl w-14">{idx + 1}</td>
                              <td className="align-top px-3 py-3 text-sm text-slate-900 border-t border-b border-slate-200 max-w-xl">{row.label}</td>
                              {likertChoices.map((c) => (
                                <td key={c.key} className="px-3 py-3 text-center border border-slate-200">
                                  <input
                                    type="radio"
                                    name={row.id}
                                    aria-label={`${row.label} — ${c.text}`}
                                    checked={answers[row.id] === c.key}
                                    onChange={() => setAnswer(row.id, c.key)}
                                    className="h-5 w-5 accent-blue-600"
                                  />
                                </td>
                              ))}
                            </tr>
                          ))}
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile helper: stacked cards */}
                <div className="mt-6 grid gap-4 sm:hidden">
                  {sections.map((sec) => (
                    <div key={sec.id} className="rounded-xl border border-slate-200 p-4">
                      <p className="text-sm font-semibold text-slate-900 mb-2">{sec.id}. {sec.title}</p>
                      {sec.rows.map((row, idx) => (
                        <div key={row.id} className="rounded-lg border border-slate-200 p-3 mb-3">
                          <p className="text-[13px] text-slate-900 mb-3">{idx + 1}. {row.label}</p>
                          <div className="grid grid-cols-3 gap-2">
                            {likertChoices.map((c) => (
                              <label key={c.key} className={`${answers[row.id] === c.key ? "border-blue-500 ring-2 ring-blue-200" : "border-slate-200"} flex items-center gap-2 rounded-lg border px-2 py-2`}>
                                <input type="radio" name={`m-${row.id}`} checked={answers[row.id] === c.key} onChange={() => setAnswer(row.id, c.key)} className="h-4 w-4 accent-blue-600" />
                                <span className="text-xs text-slate-900">{c.text}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </section>

              

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button type="submit" className="inline-flex items-center justify-center h-11 px-6 rounded-xl bg-slate-900 text-white font-medium shadow-sm hover:opacity-95 focus:outline-none focus:ring-4 focus:ring-slate-300">Kirim</button>
                <button type="button" onClick={clearForm} className="inline-flex items-center justify-center h-11 px-6 rounded-xl border border-slate-300 bg-white text-slate-900 font-medium shadow-sm hover:bg-slate-50">Hapus</button>
                {/* <button type="button" onClick={() => window.print()} className="inline-flex items-center justify-center h-11 px-6 rounded-xl border border-slate-300 bg-white text-slate-900 font-medium shadow-sm hover:bg-slate-50">Cetak</button> */}
              </div>
            </form>
          </div>

          {/* Side card with instructions */}
          <aside className="lg:w-80 flex-shrink-0">
            <div className="sticky top-8 rounded-2xl border border-slate-200 bg-white/80 shadow-sm backdrop-blur p-6 max-h-[calc(100vh-4rem)] overflow-y-auto">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Petunjuk Pengisian</h3>
              <p className="text-sm text-slate-800 mb-6 leading-relaxed">
                Pilihlah jawaban atau pendapat yang menurut Bapak/Ibu paling sesuai dengan memberi tanda checklist (✓) pada kolom yang tersedia dengan cara mendukung pernyataan (item positif) atau tidak mendukung pernyataan (item negatif).
              </p>

              <div className="border-t border-slate-200 pt-4">
                <h4 className="text-sm font-semibold text-slate-900 mb-3">Skala Likert 1-6</h4>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-900 text-xs font-semibold flex-shrink-0">1</span>
                    <div className="text-sm text-slate-800">
                      <span className="font-medium">Sangat Setuju</span>
                      <span className="text-slate-600"> (SS)</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-900 text-xs font-semibold flex-shrink-0">2</span>
                    <div className="text-sm text-slate-800">
                      <span className="font-medium">Setuju</span>
                      <span className="text-slate-600"> (S)</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-900 text-xs font-semibold flex-shrink-0">3</span>
                    <div className="text-sm text-slate-800">
                      <span className="font-medium">Agak Setuju</span>
                      <span className="text-slate-600"> (AS)</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-orange-100 text-orange-900 text-xs font-semibold flex-shrink-0">4</span>
                    <div className="text-sm text-slate-800">
                      <span className="font-medium">Agak Tidak Setuju</span>
                      <span className="text-slate-600"> (ATS)</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-orange-100 text-orange-900 text-xs font-semibold flex-shrink-0">5</span>
                    <div className="text-sm text-slate-800">
                      <span className="font-medium">Tidak Setuju</span>
                      <span className="text-slate-600"> (TS)</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-orange-100 text-orange-900 text-xs font-semibold flex-shrink-0">6</span>
                    <div className="text-sm text-slate-800">
                      <span className="font-medium">Sangat Tidak Setuju</span>
                      <span className="text-slate-600"> (STS)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <footer className="px-4 sm:px-6 lg:px-8 pb-10">
        <div className="mx-auto max-w-5xl text-xs text-slate-700">© {new Date().getFullYear()} • Template kuesioner. Anda dapat mengubah label, bagian, dan opsi dengan aman.</div>
      </footer>
    </div>
  );
}
