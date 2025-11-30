"use client";

import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { sections as sectionsData, sections2 as sections2Data } from "./questions";
import SearchableDropdown from "../../components/SearchableDropdown";
import { COMPANIES } from "../../constants/companies";

// -----------------------------
// Helper Types
// -----------------------------

type LikertChoice = "SS" | "S" | "AS" | "ATS" | "TS" | "STS"; // Sangat Setuju ... Sangat Tidak Setuju

// Mapping from Likert choice to numeric value
const LIKERT_VALUES: Record<LikertChoice, number> = {
  SS: 1,
  S: 2,
  AS: 3,
  ATS: 4,
  TS: 5,
  STS: 6,
};

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
  const router = useRouter();

  // --- Configurable form schema (you can change freely) ---
  const likertChoices: { key: LikertChoice; text: string }[] = [
    { key: "SS", text: "Sangat Setuju" },
    { key: "S", text: "Setuju" },
    { key: "AS", text: "Agak Setuju" },
    { key: "ATS", text: "Agak Tidak Setuju" },
    { key: "TS", text: "Tidak Setuju" },
    { key: "STS", text: "Sangat Tidak Setuju" },
  ];

  const sections: Section[] = useMemo(
    () => sectionsData,
    []
  );

  const sections2: Section[] = useMemo(
    () => sections2Data,
    []
  );

  // Set document title - use useLayoutEffect to run synchronously before paint
  useLayoutEffect(() => {
    document.title = "Kuesioner Disertasi - Auditor Internal";
  }, []);

  // --- Form state ---
  const [showIntro, setShowIntro] = useState(true);
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
    sections2.forEach((s) => s.rows.forEach((r) => (init[r.id] = "")));
    return init;
  });

  // --- Handlers ---
  function setAnswer(rowId: string, value: LikertChoice) {
    setAnswers((prev) => ({ ...prev, [rowId]: value }));
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
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
    // Consent checkbox is optional/commented out, so skip this validation
    // if (!identity.consent) {
    //   alert("Silakan berikan persetujuan untuk melanjutkan.");
    //   return;
    // }
    if (missing.length) {
      alert(`Silakan jawab semua pertanyaan Likert. Belum dijawab: ${missing.join(", ")}`);
      return;
    }

    // Convert Likert choices to numeric values
    const numericAnswers: Record<string, number> = {};
    Object.entries(answers).forEach(([questionId, choice]) => {
      if (choice) {
        numericAnswers[questionId] = LIKERT_VALUES[choice];
      }
    });

    const payload = {
      identity,
      answers: numericAnswers,
      answersRaw: answers, // Keep original choices for reference
      openEnded,
      submittedAt: new Date().toISOString(),
    };

    // Console log all selected answers with detailed formatting
    console.group("📋 FORM SUBMISSION DATA");
    console.log("⏰ Submitted At:", payload.submittedAt);

    console.group("👤 Respondent Identity");
    console.log("Nama:", identity.nama);
    console.log("Perusahaan:", identity.perusahaan);
    console.log("Jabatan:", identity.jabatan);
    console.log("Jenis Kelamin:", identity.jenisKelamin);
    console.log("Umur:", identity.umur);
    console.log("Pendidikan:", identity.pendidikan);
    console.groupEnd();

    console.group("📊 Survey Answers (Total: " + Object.keys(numericAnswers).length + ")");
    Object.entries(answers).forEach(([questionId, answer]) => {
      if (answer) {
        console.log(`${questionId}: ${answer} (${LIKERT_VALUES[answer]})`);
      }
    });
    console.groupEnd();

    console.group("💬 Open-Ended Responses");
    console.log("Comments:", openEnded.comments || "(empty)");
    console.log("Suggestions:", openEnded.suggestions || "(empty)");
    console.groupEnd();

    console.log("📦 Full Payload (for API):");
    console.log(JSON.stringify(payload, null, 2));
    console.groupEnd();

    // Submit to backend API via Next.js API route (proxy)
    try {
      // Use relative URL - Next.js API route will proxy to backend
      const apiUrl = '/api/form3/submit';
      console.log('🌐 Submitting to:', apiUrl);
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit form');
      }

      const result = await response.json();
      console.log("✅ Server Response:", result);

      // Redirect to success page
      router.push("/formIA/success");
    } catch (error) {
      console.error("❌ Submission Error:", error);
      alert("Maaf, terjadi kesalahan saat mengirim data. Silakan coba lagi.");
    }
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
  // Introduction screen
  if (showIntro) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 relative overflow-x-hidden">
        {/* Decorative background elements */}
        <div className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(60%_60%_at_50%_20%,black,transparent)]">
          <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-blue-200/50 blur-3xl" />
          <div className="absolute top-1/3 -right-24 h-96 w-96 rounded-full bg-emerald-200/50 blur-3xl" />
        </div>

        <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-4">
          <div className="mx-auto max-w-5xl">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 text-center">Kuesioner Disertasi</h1>
          </div>
        </header>

        <main className="px-4 sm:px-6 lg:px-8 pb-12 pt-6">
          <div className="mx-auto max-w-4xl">
            <div className="rounded-2xl border border-slate-200 bg-white shadow-lg backdrop-blur overflow-hidden">
              <div className="p-6 sm:p-8 bg-gradient-to-br from-blue-50 to-slate-50">
                <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-2 text-center">Surat Pengantar Penelitian</h2>
              </div>
              <div className="p-4 sm:p-6">
                <div className="relative w-full overflow-hidden rounded-xl border border-slate-200 shadow-sm bg-white">
                  <Image
                    src="/form3-surat.png"
                    alt="Surat Pengantar Penelitian Disertasi"
                    width={800}
                    height={1100}
                    className="w-full h-auto object-contain"
                    priority
                  />
                </div>
              </div>
              <div className="p-6 sm:p-8 bg-slate-50 border-t border-slate-200">
                <p className="text-sm text-slate-700 mb-6 text-center">
                  Silakan baca surat pengantar di atas dengan seksama sebelum melanjutkan ke kuesioner.
                </p>
                <div className="flex justify-center">
                  <button
                    onClick={() => {
                      setShowIntro(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="inline-flex items-center justify-center h-12 px-8 rounded-xl bg-slate-900 text-white font-medium shadow-lg hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-300 transition-all"
                  >
                    Lanjut ke Kuesioner →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>

        <footer className="px-4 sm:px-6 lg:px-8 pb-10">
          <div className="mx-auto max-w-5xl text-xs text-slate-700 text-center">© {new Date().getFullYear()} • Kuesioner Disertasi - DiluarPersegi</div>
        </footer>
      </div>
    );
  }

  // Main form screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 relative overflow-x-hidden">
      {/* Decorative background elements */}
      <div className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(60%_60%_at_50%_20%,black,transparent)]">
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-blue-200/50 blur-3xl" />
        <div className="absolute top-1/3 -right-24 h-96 w-96 rounded-full bg-emerald-200/50 blur-3xl" />
      </div>

      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <div className="mx-auto max-w-5xl flex items-center justify-between">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">Kuesioner Disertasi</h1>
            <p className="mt-2 text-slate-800 max-w-2xl">Silakan lengkapi informasi partisipan dan berikan tanggapan terhadap pernyataan di bawah ini dengan memilih satu opsi per baris.</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => {
                setShowIntro(true);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hidden sm:inline-flex items-center justify-center h-10 px-4 rounded-lg border border-slate-300 bg-white text-slate-700 text-sm font-medium hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300"
            >
              ← Lihat Surat Pengantar
            </button>
          </div>
        </div>
      </header>

      <main className="px-4 sm:px-6 lg:px-8 pb-24">
        <div className="mx-auto max-w-[1600px] flex flex-col xl:flex-row gap-8">
          {/* Main form */}
          <div className="flex-1 min-w-0">
            <form onSubmit={onSubmit} className="space-y-8">
              {/* Card: Identity */}
              <section className="rounded-2xl border border-slate-200 bg-white/80 shadow-sm backdrop-blur p-6 sm:p-8">
                <h2 className="text-xl font-semibold text-slate-900">IDENTITAS RESPONDEN – AUDITOR INTERNAL</h2>

                <div className="mt-6 space-y-6">
                  {/* Text inputs */}
                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="nama" className="text-sm font-medium text-slate-900">Nama</label>
                      <input id="nama" required value={identity.nama} onChange={(e) => setIdentity({ ...identity, nama: e.target.value })} className="h-11 rounded-xl border border-slate-300 px-4 text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-200" placeholder="Masukkan nama Anda" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="perusahaan" className="text-sm font-medium text-slate-900">Perusahaan</label>
                      <SearchableDropdown
                        id="perusahaan"
                        required
                        value={identity.perusahaan}
                        onChange={(value) => setIdentity({ ...identity, perusahaan: value })}
                        options={COMPANIES}
                        placeholder="Pilih atau cari nama perusahaan"
                      />
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

              {/* Card: Introduction to External Auditor Questions */}
              <section className="rounded-2xl border border-blue-200 bg-blue-50/50 shadow-sm backdrop-blur p-6 sm:p-8">
                <h2 className="text-xl font-semibold text-slate-900 mb-4">Interaksi Auditor Internal dengan Komite Audit</h2>
                <div className="prose prose-slate max-w-none text-sm leading-relaxed space-y-4">
                  <p className="text-slate-800">
                    Sehubungan dengan interaksi Audit Internal dengan Komite Audit, para praktisi
                    menganggap pemanfaatan atau utilisasi Fungsi Audit Internal sebagai salah satu kegiatan
                    Komite Audit yang krusial. Bagian penting dari tanggung jawab pemantauan dan
                    pengawasan Komite Audit dapat mencakup reviu program dan ruang lingkup audit internal
                    Reviu aktif oleh Komite Audit pada proses audit internal, dalam tahap perencanaan audit
                    internal, berkontribusi pada efektivitas keseluruhan fungsi audit internal.
                  </p>
                  <p className="text-slate-800">
                    Pelaporan aktivitas audit internal melalui laporan yang disampaikan kepada Komite Audit
                    kemungkinan besar akan kredibel jika proses audit internal dapat diandalkan dan terdapat
                    interaksi aktif antara Komite Audit dan Auditor Internal. Dengan demikian ekspektasi dari
                    Komite Audit dalam hal efektivitas pengendalian internal berimplikasi pada tugas audit
                    internal untuk lebih fokus pada hal tersebut sehingga pada akhirnya dapat meningkatkan
                    interaksi antara Komite Audit dan Fungsi Audit Internal. Interaksi antara Komite Audit dan
                    fungsi audit internal penting bagi Komite Audit dalam memenuhi peran pengawasannya
                    terutama dalam pengawasan atas keandalan laporan keuangan.</p>
                  <p className="text-slate-800 font-medium">
                    Berikut ini kami sampaikan 20 (dua puluh) pertanyaan yang diharapkan dapat mewakili
                    interaksi antara Fungsi Audit Internal dalam hal ini adalah Satuan Pengawas Internal (SPI)
                    dengan Komite Audit dalam pelaksanaan kegiatan yang berkaitan dengan audit laporan
                    keuangan.</p>
                </div>
              </section>

              {/* Card: Likert Table */}
              <section className="rounded-2xl border border-blue-200 bg-blue-50/40 shadow-sm backdrop-blur p-4 sm:p-6">
                <h2 className="px-2 sm:px-3 text-xl font-semibold text-slate-900">KUESIONER INTERAKSI AUDITOR INTERNAL DENGAN KOMITE AUDIT</h2>
                <div className="mt-4 overflow-x-auto">
                  <table className="min-w-full border-separate border-spacing-y-2">
                    <thead>
                      <tr>
                        <th className="sticky left-0 z-10 bg-blue-900 backdrop-blur px-3 py-3 text-left text-sm font-semibold text-white rounded-l-xl border border-blue-800">No</th>
                        <th className="sticky left-[3.5rem] sm:left-[4rem] z-10 bg-blue-900 backdrop-blur px-3 py-3 text-left text-sm font-semibold text-white border-t border-b border-blue-800">Pertanyaan</th>
                        {likertChoices.map((c) => (
                          <th key={c.key} className="px-2 py-3 text-[10px] sm:text-xs font-semibold text-white bg-blue-900 text-center border border-blue-800 whitespace-normal leading-tight">
                            {c.text}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {sections.map((sec, secIdx) => {
                        const startNum = sections.slice(0, secIdx).reduce((acc, s) => acc + s.rows.length, 0);
                        return (
                          <React.Fragment key={sec.id}>
                            <tr>
                              <td colSpan={2 + likertChoices.length} className="px-3 py-2 text-left text-sm font-semibold text-slate-900 bg-slate-50 rounded-xl border border-slate-200">{sec.id}. {sec.title}</td>
                            </tr>
                            {sec.rows.map((row, idx) => (
                              <tr key={row.id} className="bg-white rounded-xl shadow-sm">
                                <td className="align-top px-3 py-3 text-sm text-slate-900 border border-slate-200 rounded-l-xl w-14">{startNum + idx + 1}</td>
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
                    const startNum = sections.slice(0, secIdx).reduce((acc, s) => acc + s.rows.length, 0);
                    return (
                      <div key={sec.id} className="rounded-xl border border-slate-200 p-4">
                        <p className="text-sm font-semibold text-slate-900 mb-2">{sec.id}. {sec.title}</p>
                        {sec.rows.map((row, idx) => (
                          <div key={row.id} className="rounded-lg border border-slate-200 p-3 mb-3">
                            <p className="text-[13px] text-slate-900 mb-3">{startNum + idx + 1}. {row.label}</p>
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

              {/* Card: Introduction to Internal Auditor Questions */}
              <section className="rounded-2xl border border-orange-200 bg-orange-50/50 shadow-sm backdrop-blur p-6 sm:p-8">
                <h2 className="text-xl font-semibold text-slate-900 mb-4">Interaksi Auditor Internal dengan Auditor Eksternal</h2>
                <div className="prose prose-slate max-w-none text-sm leading-relaxed space-y-4">
                  <p className="text-slate-800">
                    Dinamika lingkungan tata kelola saat ini berimplikasi pada penekanan interaksi antara
                    Auditor Internal dan Auditor Eksternal. Hal ini disebabkan keduanya merupakan sumber
                    daya yang krusial sebagai garis pertahanan organisasi dalam model tata kelola.
                    Hubungan kolaboratif atau kooperatif dalam bentuk komitmen bersama dan saling berbagi
                    informasi, akan memberikan manfaat jangka panjang bagi Perusahaan.</p>
                  <p className="text-slate-800">
                    Standar auditing dapat membantu meningkatkan hubungan tersebut agar lebih
                    bermanfaat Baik Standar Profesional Akuntan Publik (SPAP) maupun Standar Audit
                    Internal Global (Global Internal Audit Standards/GIAS), keduanya mendorong
                    dilakukannya interaksi antara Auditor Internal dan Auditor Eksternal, yaitu SA Nomor 610
                    tentang Penggunaan Pekerjaan Auditor Internal dalam SPAP, dan Standar 9.5 tentang
                    Koordinasi dan Pengandalan yang ada dalam GIAS.</p>
                  <p className="text-slate-800 font-medium">
                    Berikut ini kami sampaikan 13 (tiga belas) pertanyaan yang diharapkan dapat mewakili
                    interaksi antara dengan SPI sebagai Fungsi Audit Internal dengan Kantor Akuntan Publik
                    (“KAP”) sebagai Auditor Eksternal dalam pelaksanaan kegiatan yang berkaitan dengan
                    audit laporan keuangan.</p>
                </div>
              </section>

              <section className="rounded-2xl border border-orange-200 bg-orange-50/40 shadow-sm backdrop-blur p-4 sm:p-6">
                <h2 className="px-2 sm:px-3 text-xl font-semibold text-slate-900">KUESIONER INTERAKSI KOMITE AUDIT DENGAN AUDITOR INTERNAL</h2>
                <div className="mt-4 overflow-x-auto">
                  <table className="min-w-full border-separate border-spacing-y-2">
                    <thead>
                      <tr>
                        <th className="sticky left-0 z-10 bg-orange-800 backdrop-blur px-3 py-3 text-left text-sm font-semibold text-white rounded-l-xl border border-orange-700">No</th>
                        <th className="sticky left-[3.5rem] sm:left-[4rem] z-10 bg-orange-800 backdrop-blur px-3 py-3 text-left text-sm font-semibold text-white border-t border-b border-orange-700">Pertanyaan</th>
                        {likertChoices.map((c) => (
                          <th key={c.key} className="px-2 py-3 text-[10px] sm:text-xs font-semibold text-white bg-orange-800 text-center border border-orange-700 whitespace-normal leading-tight">
                            {c.text}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {sections2.map((sec, secIdx) => {
                        const startNum = sections2.slice(0, secIdx).reduce((acc, s) => acc + s.rows.length, 0);
                        return (
                          <React.Fragment key={sec.id}>
                            <tr>
                              <td colSpan={2 + likertChoices.length} className="px-3 py-2 text-left text-sm font-semibold text-slate-900 bg-slate-50 rounded-xl border border-slate-200">{sec.id}. {sec.title}</td>
                            </tr>
                            {sec.rows.map((row, idx) => (
                              <tr key={row.id} className="bg-white rounded-xl shadow-sm">
                                <td className="align-top px-3 py-3 text-sm text-slate-900 border border-slate-200 rounded-l-xl w-14">{startNum + idx + 1}</td>
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
                  {sections2.map((sec, secIdx) => {
                    const startNum = sections2.slice(0, secIdx).reduce((acc, s) => acc + s.rows.length, 0);
                    return (
                      <div key={sec.id} className="rounded-xl border border-slate-200 p-4">
                        <p className="text-sm font-semibold text-slate-900 mb-2">{sec.id}. {sec.title}</p>
                        {sec.rows.map((row, idx) => (
                          <div key={row.id} className="rounded-lg border border-slate-200 p-3 mb-3">
                            <p className="text-[13px] text-slate-900 mb-3">{startNum + idx + 1}. {row.label}</p>
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
        <div className="mx-auto max-w-5xl text-xs text-slate-700">© {new Date().getFullYear()} • Kuesioner Disertasi - DiluarPersegi </div>
      </footer>
    </div>
  );
}
