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
      // ===============================
      // INTERAKSI KOMITE AUDIT DENGAN AUDITOR EKSTERNAL (28 items)
      // ===============================
      {
        id: "A",
        title: "Merekomendasikan penunjukan Akuntan Publik kepada Pemegang Saham",
        rows: [
          { id: "A1", label: "Komite Audit bersama dengan Manajemen menyampaikan dan menyepakati Kerangka Acuan Kerja (KAK) pekerjaan audit laporan keuangan kepada KAP untuk didiskusikan." },
          { id: "A2", label: "Komite Audit memberikan saran dan rekomendasi yang berkaitan dengan kriteria, kualifikasi serta aspek teknis kepada KAP yang dituangkan dalam KAK." },
        ],
      },
      {
        id: "B",
        title: "Merekomendasikan penunjukan Akuntan Publik kepada Pemegang Saham",
        rows: [
          { id: "B3", label: "Komite Audit dan Manajemen melakukan diskusi dengan KAP terkait usulan imbalan jasa dengan mempertimbangkan KAK dan kewajaran imbalan jasa audit." },
          { id: "B4", label: "Komite Audit dan Manajemen bersama dengan KAP menyepakati penetapan usulan imbalan jasa." },
        ],
      },
      {
        id: "C",
        title: "Menyetujui Ketentuan Perikatan Audit",
        rows: [
          { id: "C5", label: "Komite Audit, Manajemen dan KAP melakukan pembahasan dan menyepakati ketentuan perikatan audit yang akan dituangkan dalam surat perikatan audit (engagement letter)." },
          { id: "C6", label: "Apabila terdapat perubahan atas ketentuan perikatan audit seperti perubahan ruang lingkup, maka Komite Audit, Manajemen dan KAP melakukan pembahasan terlebih dahulu sebelum menyepakati perubahan tersebut." },
        ],
      },
      {
        id: "D",
        title: "Menilai Independensi Auditor",
        rows: [
          { id: "D7", label: "KAP mengkonfirmasi independensinya dalam bentuk pernyataan tertulis kepada Komite Audit pada setiap pertemuan dengan Komite Audit." },
          { id: "D8", label: "KAP mengkomunikasikan kepada Komite Audit atas hal yang mungkin berdampak terhadap independensi KAP, seperti contoh adanya pemberian jasa non-asurans kepada Perusahaan, tenggat waktu yang ketat, pemberian fasilitas kepada auditor di lapangan, hubungan pribadi auditor dengan manajemen serta potensi employment offering." },
          { id: "D9", label: "KAP meminta persetujuan kepada Komite Audit apabila terdapat jasa non assurans (nonaudit) yang diberikan oleh KAP kepada Perusahaan atau Group Perusahaan." },
        ],
      },
      {
        id: "E",
        title: "Membahas Unsur Perencanaan Audit",
        rows: [
          { id: "E10", label: "KAP melakukan pembahasan dengan Komite Audit mengenai metodologi audit, susunan tim, ruang lingkup, rencana komunikasi, tenggat waktu, termasuk penetapan sampling, materialitas, area berisiko tinggi, transaksi signifikan selama tahun berjalan dan potensi fraud yang mempengaruhi laporan keuangan." },
          { id: "E11", label: "Komite Audit membahas dengan KAP terkait usulan mekanisme koordinasi dengan fungsi audit internal sebagai fungsi counterpart dalam audit laporan keuangan." },
          { id: "E12", label: "KAP menyampaikan kepada Komite Audit potensi Hal Audit Utama (Key Audit Matters/KAM) yang akan dicantumkan dalam opini auditor." },
          { id: "E13", label: "KAP berkomunikasi dengan Komite Audit mengenai sifat, luas dan alasan bisnis dari hubungan dan transaksi pihak berelasi yang signifikan serta kecukupan pengungkapan transaksi tersebut di dalam laporan keuangan." },
        ],
      },
      {
        id: "F",
        title: "Membahas tentang Kecurangan (Fraud)",
        rows: [
          { id: "F14", label: "KAP membahas dengan Komite Audit dan pihak lain (termasuk manajemen) mengenai pelaksanaan pengawasan terhadap proses manajemen dalam mengidentifikasi dan merespons risiko fraud dan pengendalian internal yang telah dilakukan manajemen untuk memitigasi risiko tersebut." },
          { id: "F15", label: "KAP menanyakan kepada Komite Audit dan pihak lain (termasuk manajemen dan audit internal), apakah Komite Audit mengetahui adanya kecurangan yang sebenarnya, dugaan, atau dugaan kecurangan yang berdampak pada Perusahaan." },
          { id: "F16", label: "KAP menyampaikan kepada Komite Audit mengenai rencana dan strategi audit untuk mengidentifikasi fraud atas laporan keuangan yang mungkin dilakukan oleh Manajemen." },
        ],
      },
      {
        id: "G",
        title: "Mengkomunikasikan Temuan Signifikan dari Audit",
        rows: [
          { id: "G17", label: "KAP mengkomunikasikan KAM kepada Komite Audit (sebagai pihak yang bertanggung jawab atas tata kelola), termasuk bagaimana luas pengungkapan hal tersebut dalam laporan audit." },
          { id: "G18", label: "KAP mengkomunikasikan pandangannya kepada Komite Audit tentang aspek kualitatif signifikan dari praktik akuntansi Perusahaan, termasuk kebijakan akuntansi, estimasi akuntansi, dan pengungkapan laporan keuangan." },
          { id: "G19", label: "KAP mengkomunikasikan kepada Komite Audit tentang adanya defisiensi signifikan dalam pengendalian internal, yang diidentifikasi selama audit." },
          { id: "G20", label: "KAP mengkomunikasikan kepada Komite Audit mengenai fraud yang teridentifikasi, informasi yang mengindikasikan kemungkinan adanya fraud, atau kelemahan dalam desain atau implementasi pengendalian internal untuk mencegah, mendeteksi dan melaporkan fraud." },
          { id: "G21", label: "KAP mengkomunikasikan kepada Komite Audit mengenai permasalahan signifikan yang terkait ketidakpatuhan terhadap peraturan perundang-undangan serta upaya penyelesaian yang tepat." },
          { id: "G22", label: "KAP mengkomunikasikan salah saji yang tidak dikoreksi (uncorrected misstatement) yang diidentifikasi oleh auditor disertai penjelasan mengapa salah saji tersebut tidak diperbaiki oleh Manajemen." },
          { id: "G23", label: "Sebelum laporan keuangan (audited) diterbitkan, konsep atas laporan tersebut beserta jurnal koreksi audit disampaikan terlebih dahulu kepada Komite Audit untuk dilakukan penelaahan." },
          { id: "G24", label: "KAP mengkomunikasikan kepada Komite Audit tentang peristiwa atau kondisi yang diidentifikasi oleh auditor yang dapat menimbulkan keraguan terhadap kemampuan Perusahaan untuk mempertahankan kelangsungan usahanya." },
        ],
      },
      {
        id: "H",
        title: "Memfasilitasi Proses Audit",
        rows: [
          { id: "H25", label: "Terdapat dialog yang terbuka antara Komite Audit dan KAP baik secara formal maupun informal tentang hal-hal yang mempengaruhi laporan keuangan, proses audit dan kualitas audit." },
          { id: "H26", label: "KAP mengkomunikasikan kepada Komite Audit adanya kesulitan signifikan yang dihadapi selama audit." },
          { id: "H27", label: "Selama proses audit laporan keuangan, KAP mengkomunikasikan kepada Komite Audit apabila terdapat ketidaksepakatan dengan Manajemen, baik yang telah diselesaikan atau belum terselesaikan." },
          { id: "H28", label: "KAP menanggapi pertanyaan dan permintaan komunikasi dari Komite Audit secara memadai dan tepat waktu." },
        ],
      },
    ],
    []
  );

  // --- Form state ---
  const [identity, setIdentity] = useState({
    nama: "",
    KAP: "",
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
    setIdentity({ nama: "", KAP: "", perusahaan: "", jabatan: "", jenisKelamin: "", umur: "", pendidikan: "", consent: false });
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
                <h2 className="text-xl font-semibold text-slate-900">IDENTITAS RESPONDEN – AUDITOR EKSTERNAL</h2>

                <div className="mt-6 space-y-6">
                  {/* Text inputs */}
                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="nama" className="text-sm font-medium text-slate-900">Nama</label>
                      <input id="nama" required value={identity.nama} onChange={(e) => setIdentity({ ...identity, nama: e.target.value })} className="h-11 rounded-xl border border-slate-300 px-4 text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-200" placeholder="Masukkan nama Anda" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="KAP" className="text-sm font-medium text-slate-900">Nama Kantor Akuntan Publik (KAP)</label>
                      <input id="KAP" required value={identity.KAP} onChange={(e) => setIdentity({ ...identity, KAP: e.target.value })} className="h-11 rounded-xl border border-slate-300 px-4 text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-200" placeholder="Masukkan nama KAP" />
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
              </section>

              {/* Card: Likert Table */}
              <section className="rounded-2xl border border-slate-200 bg-white/80 shadow-sm backdrop-blur p-4 sm:p-6">
                <h2 className="px-2 sm:px-3 text-xl font-semibold text-slate-900">KUESIONER INTERAKSI KOMITE AUDIT DENGAN AUDITOR EKSTERNAL</h2>
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
                      {sections.map((sec, secIdx) => {
                        const prevRowCount = sections.slice(0, secIdx).reduce((sum, s) => sum + s.rows.length, 0);
                        return (
                          <React.Fragment key={sec.id}>
                            <tr>
                              <td colSpan={2 + likertChoices.length} className="px-3 py-2 text-left text-sm font-semibold text-slate-900 bg-slate-50 rounded-xl border border-slate-200">{sec.id}. {sec.title}</td>
                            </tr>
                            {sec.rows.map((row, idx) => (
                              <tr key={row.id} className="bg-white rounded-xl shadow-sm">
                                <td className="align-top px-3 py-3 text-sm text-slate-900 border border-slate-200 rounded-l-xl w-14">{prevRowCount + idx + 1}</td>
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
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Mobile helper: stacked cards */}
                <div className="mt-6 grid gap-4 sm:hidden">
                  {sections.map((sec, secIdx) => {
                    const prevRowCount = sections.slice(0, secIdx).reduce((sum, s) => sum + s.rows.length, 0);
                    return (
                      <div key={sec.id} className="rounded-xl border border-slate-200 p-4">
                        <p className="text-sm font-semibold text-slate-900 mb-2">{sec.id}. {sec.title}</p>
                        {sec.rows.map((row, idx) => (
                          <div key={row.id} className="rounded-lg border border-slate-200 p-3 mb-3">
                            <p className="text-[13px] text-slate-900 mb-3">{prevRowCount + idx + 1}. {row.label}</p>
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
                    );
                  })}
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
