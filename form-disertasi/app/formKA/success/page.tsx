"use client";

import React, { useLayoutEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function FormSubmissionSuccess() {
    const router = useRouter();

    useLayoutEffect(() => {
        document.title = "Formulir Berhasil Dikirim - Kuesioner Disertasi";
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 relative overflow-x-hidden flex items-center justify-center">
            {/* Decorative background elements */}
            <div className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(60%_60%_at_50%_20%,black,transparent)]">
                <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-blue-200/50 blur-3xl" />
                <div className="absolute top-1/3 -right-24 h-96 w-96 rounded-full bg-emerald-200/50 blur-3xl" />
            </div>

            <main className="px-4 sm:px-6 lg:px-8 py-12">
                <div className="mx-auto max-w-2xl">
                    <div className="rounded-2xl border border-slate-200 bg-white shadow-lg backdrop-blur overflow-hidden">
                        {/* Success Icon */}
                        <div className="p-8 bg-gradient-to-br from-green-50 to-emerald-50 text-center">
                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500 mb-4">
                                <svg
                                    className="w-12 h-12 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                            </div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
                                Terima Kasih!
                            </h1>
                            <p className="text-lg text-slate-700">
                                Formulir Anda berhasil dikirim
                            </p>
                        </div>

                        {/* Content */}
                        <div className="p-6 sm:p-8">
                            <div className="space-y-6">
                                <div className="text-center">
                                    <p className="text-slate-700 leading-relaxed">
                                        Data Anda telah berhasil disimpan. Kami sangat menghargai waktu dan partisipasi Anda dalam penelitian ini.
                                    </p>
                                </div>

                                <div className="border-t border-slate-200 pt-6">
                                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                        <Link
                                            href="/formKA"
                                            className="inline-flex items-center justify-center h-11 px-6 rounded-xl bg-slate-900 text-white font-medium shadow-sm hover:opacity-95 focus:outline-none focus:ring-4 focus:ring-slate-300 transition-all"
                                        >
                                            Kembali ke Formulir
                                        </Link>
                                        <button
                                            onClick={() => router.push("/")}
                                            className="inline-flex items-center justify-center h-11 px-6 rounded-xl border border-slate-300 bg-white text-slate-900 font-medium shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-300 transition-all"
                                        >
                                            Kembali ke Beranda
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-8 text-center text-xs text-slate-600">
                        © {new Date().getFullYear()} • Kuesioner Disertasi - DiluarPersegi
                    </div>
                </div>
            </main>
        </div>
    );
}

