"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import * as XLSX from "xlsx";
import { questionMap, sectionMap, sections, sections2, LIKERT_LABELS } from "../questions";

// Likert scale numeric values mapping
const LIKERT_VALUES: Record<string, number> = {
    SS: 1,
    S: 2,
    AS: 3,
    ATS: 4,
    TS: 5,
    STS: 6,
};

interface Form1Response {
    id: string;
    nama: string;
    perusahaan: string;
    jabatan: string;
    jenisKelamin: string;
    umur: string;
    pendidikan: string;
    consent: boolean;
    answers: Record<string, number>;
    answersRaw: Record<string, string>;
    openEnded?: {
        comments?: string;
        suggestions?: string;
    };
    submittedAt: string;
    createdAt: string;
    updatedAt: string;
    ipAddress?: string;
    userAgent?: string;
}

// Component for displaying question summary statistics
function QuestionSummaryView({ responses }: { responses: Form1Response[] }) {
    const likertOptions = ['SS', 'S', 'AS', 'ATS', 'TS', 'STS'];
    const stats: Record<string, Record<string, number>> = {};

    // Initialize all questions with zero counts
    [...sections, ...sections2].forEach((section) => {
        section.rows.forEach((row) => {
            stats[row.id] = {};
            likertOptions.forEach((option) => {
                stats[row.id][option] = 0;
            });
        });
    });

    // Count answers from all responses
    responses.forEach((response) => {
        Object.entries(response.answersRaw).forEach(([questionId, answer]) => {
            if (stats[questionId] && stats[questionId][answer] !== undefined) {
                stats[questionId][answer] = (stats[questionId][answer] || 0) + 1;
            }
        });
    });

    function getQuestionTotalCount(questionId: string): number {
        if (!stats[questionId]) return 0;
        return Object.values(stats[questionId]).reduce((sum, count) => sum + count, 0);
    }

    function getPercentage(count: number, total: number): number {
        if (total === 0) return 0;
        return Math.round((count / total) * 100);
    }

    let questionNumber = 1;

    return (
        <div className="space-y-6">
            {/* Section 1: Auditor Eksternal */}
            <div className="rounded-2xl border border-blue-200 bg-white/80 shadow-sm backdrop-blur p-6">
                <h3 className="text-xl font-semibold text-blue-900 mb-4 pb-2 border-b border-blue-200">
                    Interaksi Komite Audit dengan Auditor Eksternal
                </h3>
                <div className="space-y-6">
                    {sections.map((section) => (
                        <div key={section.id} className="space-y-4">
                            <h4 className="text-sm font-semibold text-slate-800">
                                {section.id}. {section.title}
                            </h4>
                            {section.rows.map((row) => {
                                const total = getQuestionTotalCount(row.id);
                                const questionNum = questionNumber++;
                                return (
                                    <div
                                        key={row.id}
                                        className="bg-slate-50 rounded-lg border border-slate-200 p-4"
                                    >
                                        <div className="mb-3">
                                            <div className="flex items-start gap-2 mb-1">
                                                <span className="font-mono text-xs font-semibold text-blue-600">
                                                    {row.id}
                                                </span>
                                                <span className="text-xs text-slate-500">(Question {questionNum})</span>
                                            </div>
                                            <p className="text-sm text-slate-700 leading-relaxed">{row.label}</p>
                                            <p className="text-xs text-slate-500 mt-1">
                                                Total responses: <strong>{total}</strong>
                                            </p>
                                        </div>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                                            {likertOptions.map((option) => {
                                                const count = stats[row.id]?.[option] || 0;
                                                const percentage = getPercentage(count, total);
                                                return (
                                                    <div
                                                        key={option}
                                                        className="bg-white rounded border border-slate-200 p-2 text-center"
                                                    >
                                                        <div className="text-xs font-semibold text-slate-900 mb-1">
                                                            {LIKERT_LABELS[option]}
                                                        </div>
                                                        <div className="text-lg font-bold text-blue-600">{count}</div>
                                                        {total > 0 && (
                                                            <div className="text-[10px] text-slate-500">{percentage}%</div>
                                                        )}
                                                        {total > 0 && (
                                                            <div className="mt-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                                                <div
                                                                    className="h-full bg-blue-500 transition-all"
                                                                    style={{ width: `${percentage}%` }}
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>

            {/* Section 2: Auditor Internal */}
            <div className="rounded-2xl border border-orange-200 bg-white/80 shadow-sm backdrop-blur p-6">
                <h3 className="text-xl font-semibold text-orange-900 mb-4 pb-2 border-b border-orange-200">
                    Interaksi Komite Audit dengan Auditor Internal
                </h3>
                <div className="space-y-6">
                    {sections2.map((section) => (
                        <div key={section.id} className="space-y-4">
                            <h4 className="text-sm font-semibold text-slate-800">
                                {section.id}. {section.title}
                            </h4>
                            {section.rows.map((row) => {
                                const total = getQuestionTotalCount(row.id);
                                const questionNum = questionNumber++;
                                return (
                                    <div
                                        key={row.id}
                                        className="bg-slate-50 rounded-lg border border-slate-200 p-4"
                                    >
                                        <div className="mb-3">
                                            <div className="flex items-start gap-2 mb-1">
                                                <span className="font-mono text-xs font-semibold text-orange-600">
                                                    {row.id}
                                                </span>
                                                <span className="text-xs text-slate-500">(Question {questionNum})</span>
                                            </div>
                                            <p className="text-sm text-slate-700 leading-relaxed">{row.label}</p>
                                            <p className="text-xs text-slate-500 mt-1">
                                                Total responses: <strong>{total}</strong>
                                            </p>
                                        </div>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                                            {likertOptions.map((option) => {
                                                const count = stats[row.id]?.[option] || 0;
                                                const percentage = getPercentage(count, total);
                                                return (
                                                    <div
                                                        key={option}
                                                        className="bg-white rounded border border-slate-200 p-2 text-center"
                                                    >
                                                        <div className="text-xs font-semibold text-slate-900 mb-1">
                                                            {LIKERT_LABELS[option]}
                                                        </div>
                                                        <div className="text-lg font-bold text-orange-600">{count}</div>
                                                        {total > 0 && (
                                                            <div className="text-[10px] text-slate-500">{percentage}%</div>
                                                        )}
                                                        {total > 0 && (
                                                            <div className="mt-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                                                <div
                                                                    className="h-full bg-orange-500 transition-all"
                                                                    style={{ width: `${percentage}%` }}
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function Form1ResultsPage() {
    const [responses, setResponses] = useState<Form1Response[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [showSummary, setShowSummary] = useState(false);

    useEffect(() => {
        fetchResponses();
    }, []);

    async function fetchResponses() {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch('/api/form1/responses');

            if (!response.ok) {
                throw new Error('Failed to fetch responses');
            }

            const result = await response.json();
            if (result.success) {
                setResponses(result.data || []);
            } else {
                throw new Error(result.message || 'Failed to fetch responses');
            }
        } catch (err) {
            console.error('Error fetching responses:', err);
            setError(err instanceof Error ? err.message : 'Failed to load responses');
        } finally {
            setLoading(false);
        }
    }

    function formatDate(dateString: string) {
        const date = new Date(dateString);
        return date.toLocaleString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    }

    function getAnswerSummary(answersRaw: Record<string, string>) {
        const counts: Record<string, number> = {};
        Object.values(answersRaw).forEach((answer) => {
            counts[answer] = (counts[answer] || 0) + 1;
        });
        return counts;
    }

    // Export individual responses to Excel
    function exportIndividualResponses() {
        // Get all question IDs in order
        const allQuestionIds: string[] = [];
        sections.forEach((section) => {
            section.rows.forEach((row) => {
                allQuestionIds.push(row.id);
            });
        });
        sections2.forEach((section) => {
            section.rows.forEach((row) => {
                allQuestionIds.push(row.id);
            });
        });

        // Create worksheet data
        const worksheetData = responses.map((response) => {
            const row: Record<string, any> = {
                'ID': response.id,
                'Nama': response.nama,
                'Perusahaan': response.perusahaan,
                'Jabatan': response.jabatan,
                'Jenis Kelamin': response.jenisKelamin,
                'Umur': response.umur,
                'Pendidikan': response.pendidikan,
                'Consent': response.consent ? 'Yes' : 'No',
                'Submitted At': new Date(response.submittedAt).toISOString(),
                'Created At': new Date(response.createdAt).toISOString(),
            };

            // Add question columns with numeric values
            allQuestionIds.forEach((questionId) => {
                const answer = response.answersRaw[questionId];
                row[questionId] = answer ? LIKERT_VALUES[answer] || 0 : '';
            });

            // Add open-ended responses
            if (response.openEnded?.comments) {
                row['Comments'] = response.openEnded.comments;
            }
            if (response.openEnded?.suggestions) {
                row['Suggestions'] = response.openEnded.suggestions;
            }

            return row;
        });

        // Create workbook and worksheet
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(worksheetData);

        // Set column widths
        const colWidths = [
            { wch: 36 }, // ID
            { wch: 20 }, // Nama
            { wch: 25 }, // Perusahaan
            { wch: 25 }, // Jabatan
            { wch: 15 }, // Jenis Kelamin
            { wch: 15 }, // Umur
            { wch: 12 }, // Pendidikan
            { wch: 10 }, // Consent
            { wch: 20 }, // Submitted At
            { wch: 20 }, // Created At
            ...allQuestionIds.map(() => ({ wch: 8 })), // Question columns
            { wch: 30 }, // Comments
            { wch: 30 }, // Suggestions
        ];
        ws['!cols'] = colWidths;

        XLSX.utils.book_append_sheet(wb, ws, 'Individual Responses');

        // Download file
        const fileName = `form1_individual_responses_${new Date().toISOString().split('T')[0]}.xlsx`;
        XLSX.writeFile(wb, fileName);
    }

    // Export question summary to Excel
    function exportQuestionSummary() {
        const likertOptions = ['SS', 'S', 'AS', 'ATS', 'TS', 'STS'];
        const stats: Record<string, Record<string, number>> = {};

        // Initialize all questions with zero counts
        [...sections, ...sections2].forEach((section) => {
            section.rows.forEach((row) => {
                stats[row.id] = {};
                likertOptions.forEach((option) => {
                    stats[row.id][option] = 0;
                });
            });
        });

        // Count answers from all responses
        responses.forEach((response) => {
            Object.entries(response.answersRaw).forEach(([questionId, answer]) => {
                if (stats[questionId] && stats[questionId][answer] !== undefined) {
                    stats[questionId][answer] = (stats[questionId][answer] || 0) + 1;
                }
            });
        });

        // Create worksheet data
        const worksheetData: any[] = [];
        let questionNumber = 1;

        // Add header row
        worksheetData.push({
            'Question #': 'Question #',
            'Question ID': 'Question ID',
            'Question Text': 'Question Text',
            'Section': 'Section',
            'SS': 'Sangat Setuju',
            'S': 'Setuju',
            'AS': 'Agak Setuju',
            'ATS': 'Agak Tidak Setuju',
            'TS': 'Tidak Setuju',
            'STS': 'Sangat Tidak Setuju',
            'Total': 'Total',
        });

        // Add Section 1: Auditor Eksternal
        sections.forEach((section) => {
            section.rows.forEach((row) => {
                const total = Object.values(stats[row.id] || {}).reduce((sum, count) => sum + count, 0);
                worksheetData.push({
                    'Question #': questionNumber++,
                    'Question ID': row.id,
                    'Question Text': row.label,
                    'Section': `Eksternal - ${section.id}. ${section.title}`,
                    'SS': stats[row.id]?.['SS'] || 0,
                    'S': stats[row.id]?.['S'] || 0,
                    'AS': stats[row.id]?.['AS'] || 0,
                    'ATS': stats[row.id]?.['ATS'] || 0,
                    'TS': stats[row.id]?.['TS'] || 0,
                    'STS': stats[row.id]?.['STS'] || 0,
                    'Total': total,
                });
            });
        });

        // Add Section 2: Auditor Internal
        sections2.forEach((section) => {
            section.rows.forEach((row) => {
                const total = Object.values(stats[row.id] || {}).reduce((sum, count) => sum + count, 0);
                worksheetData.push({
                    'Question #': questionNumber++,
                    'Question ID': row.id,
                    'Question Text': row.label,
                    'Section': `Internal - ${section.id}. ${section.title}`,
                    'SS': stats[row.id]?.['SS'] || 0,
                    'S': stats[row.id]?.['S'] || 0,
                    'AS': stats[row.id]?.['AS'] || 0,
                    'ATS': stats[row.id]?.['ATS'] || 0,
                    'TS': stats[row.id]?.['TS'] || 0,
                    'STS': stats[row.id]?.['STS'] || 0,
                    'Total': total,
                });
            });
        });

        // Create workbook and worksheet
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(worksheetData);

        // Set column widths
        ws['!cols'] = [
            { wch: 12 }, // Question #
            { wch: 10 }, // Question ID
            { wch: 80 }, // Question Text
            { wch: 40 }, // Section
            { wch: 8 },  // SS
            { wch: 8 },  // S
            { wch: 8 },  // AS
            { wch: 8 },  // ATS
            { wch: 8 },  // TS
            { wch: 8 },  // STS
            { wch: 8 },  // Total
        ];

        XLSX.utils.book_append_sheet(wb, ws, 'Question Summary');

        // Download file
        const fileName = `form1_question_summary_${new Date().toISOString().split('T')[0]}.xlsx`;
        XLSX.writeFile(wb, fileName);
    }


    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 relative overflow-x-hidden">
            {/* Decorative background elements */}
            <div className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(60%_60%_at_50%_20%,black,transparent)]">
                <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-blue-200/50 blur-3xl" />
                <div className="absolute top-1/3 -right-24 h-96 w-96 rounded-full bg-emerald-200/50 blur-3xl" />
            </div>

            <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-4">
                <div className="mx-auto max-w-7xl flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
                            Form 1 Results
                        </h1>
                        <p className="mt-2 text-slate-800 max-w-2xl">
                            View all submitted responses from Form 1 (Komite Audit Survey)
                        </p>
                    </div>
                    <div className="flex gap-3 flex-wrap">
                        <Link
                            href="/form1"
                            className="inline-flex items-center justify-center h-10 px-4 rounded-lg border border-slate-300 bg-white text-slate-700 text-sm font-medium hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300"
                        >
                            ← Back to Form
                        </Link>
                        <button
                            onClick={fetchResponses}
                            disabled={loading}
                            className="inline-flex items-center justify-center h-10 px-4 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "Loading..." : "🔄 Refresh"}
                        </button>
                        {responses.length > 0 && !loading && (
                            <>
                                {!showSummary && (
                                    <button
                                        onClick={exportIndividualResponses}
                                        className="inline-flex items-center justify-center h-10 px-4 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300"
                                    >
                                        📥 Export Individual (Excel)
                                    </button>
                                )}
                                {showSummary && (
                                    <button
                                        onClick={exportQuestionSummary}
                                        className="inline-flex items-center justify-center h-10 px-4 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300"
                                    >
                                        📥 Export Summary (Excel)
                                    </button>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </header>

            <main className="px-4 sm:px-6 lg:px-8 pb-24">
                <div className="mx-auto max-w-7xl">
                    {/* Summary Card */}
                    <div className="mb-6 rounded-2xl border border-slate-200 bg-white/80 shadow-sm backdrop-blur p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-semibold text-slate-900">Total Responses</h2>
                                <p className="text-3xl font-bold text-blue-600 mt-2">{responses.length}</p>
                            </div>
                            {loading && (
                                <div className="text-sm text-slate-600">Loading...</div>
                            )}
                        </div>
                    </div>

                    {/* Toggle between individual responses and summary */}
                    {responses.length > 0 && !loading && (
                        <div className="mb-6 flex gap-2">
                            <button
                                onClick={() => setShowSummary(false)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${!showSummary
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
                                    }`}
                            >
                                👤 Individual Responses
                            </button>
                            <button
                                onClick={() => setShowSummary(true)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${showSummary
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
                                    }`}
                            >
                                📊 Question Summary
                            </button>
                        </div>
                    )}

                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4">
                            <p className="text-red-800">❌ {error}</p>
                        </div>
                    )}

                    {/* Question Summary View */}
                    {showSummary && responses.length > 0 && (
                        <QuestionSummaryView responses={responses} />
                    )}

                    {/* Responses List */}
                    {!showSummary && (
                        <>
                            {loading && responses.length === 0 ? (
                                <div className="text-center py-12">
                                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                                    <p className="mt-4 text-slate-600">Loading responses...</p>
                                </div>
                            ) : responses.length === 0 ? (
                                <div className="text-center py-12 rounded-2xl border border-slate-200 bg-white/80 shadow-sm backdrop-blur">
                                    <p className="text-slate-600 text-lg">No responses found.</p>
                                    <Link
                                        href="/form1"
                                        className="mt-4 inline-flex items-center justify-center h-10 px-4 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700"
                                    >
                                        Submit First Response
                                    </Link>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {responses.map((response) => (
                                        <div
                                            key={response.id}
                                            className="rounded-2xl border border-slate-200 bg-white/80 shadow-sm backdrop-blur overflow-hidden"
                                        >
                                            {/* Response Header */}
                                            <div
                                                className="p-6 cursor-pointer hover:bg-slate-50 transition-colors"
                                                onClick={() => setExpandedId(expandedId === response.id ? null : response.id)}
                                            >
                                                <div className="flex items-start justify-between">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-3 mb-2">
                                                            <h3 className="text-lg font-semibold text-slate-900">
                                                                {response.nama}
                                                            </h3>
                                                            <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                                                                {response.perusahaan}
                                                            </span>
                                                        </div>
                                                        <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                                                            <span>
                                                                <strong>Jabatan:</strong> {response.jabatan}
                                                            </span>
                                                            <span>
                                                                <strong>Jenis Kelamin:</strong> {response.jenisKelamin}
                                                            </span>
                                                            <span>
                                                                <strong>Umur:</strong> {response.umur}
                                                            </span>
                                                            <span>
                                                                <strong>Pendidikan:</strong> {response.pendidikan}
                                                            </span>
                                                        </div>
                                                        <p className="text-xs text-slate-500 mt-2">
                                                            Submitted: {formatDate(response.submittedAt)}
                                                        </p>
                                                    </div>
                                                    <div className="ml-4">
                                                        <button className="text-slate-400 hover:text-slate-600">
                                                            {expandedId === response.id ? "▼" : "▶"}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Expanded Details */}
                                            {expandedId === response.id && (
                                                <div className="border-t border-slate-200 bg-slate-50/50 p-6">
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                        {/* Answer Summary */}
                                                        <div>
                                                            <h4 className="font-semibold text-slate-900 mb-3">Answer Summary</h4>
                                                            <div className="space-y-2">
                                                                {Object.entries(getAnswerSummary(response.answersRaw)).map(
                                                                    ([answer, count]) => (
                                                                        <div key={answer} className="flex items-center justify-between text-sm">
                                                                            <span className="text-slate-700">{LIKERT_LABELS[answer] || answer}:</span>
                                                                            <span className="font-medium text-slate-900">{count}</span>
                                                                        </div>
                                                                    )
                                                                )}
                                                            </div>
                                                            <div className="mt-4 pt-4 border-t border-slate-200">
                                                                <p className="text-sm text-slate-600">
                                                                    <strong>Total Questions:</strong> {Object.keys(response.answers).length}
                                                                </p>
                                                            </div>
                                                        </div>

                                                        {/* Open-ended Responses */}
                                                        {response.openEnded && (
                                                            <div>
                                                                <h4 className="font-semibold text-slate-900 mb-3">Open-ended Responses</h4>
                                                                {response.openEnded.comments && (
                                                                    <div className="mb-3">
                                                                        <p className="text-xs font-medium text-slate-700 mb-1">Comments:</p>
                                                                        <p className="text-sm text-slate-600 bg-white p-3 rounded-lg border border-slate-200">
                                                                            {response.openEnded.comments}
                                                                        </p>
                                                                    </div>
                                                                )}
                                                                {response.openEnded.suggestions && (
                                                                    <div>
                                                                        <p className="text-xs font-medium text-slate-700 mb-1">Suggestions:</p>
                                                                        <p className="text-sm text-slate-600 bg-white p-3 rounded-lg border border-slate-200">
                                                                            {response.openEnded.suggestions}
                                                                        </p>
                                                                    </div>
                                                                )}
                                                                {!response.openEnded.comments && !response.openEnded.suggestions && (
                                                                    <p className="text-sm text-slate-500 italic">No open-ended responses</p>
                                                                )}
                                                            </div>
                                                        )}

                                                        {/* All Answers (Collapsible) */}
                                                        <div className="md:col-span-2">
                                                            <details className="mt-4">
                                                                <summary className="cursor-pointer text-sm font-semibold text-slate-700 hover:text-slate-900">
                                                                    View All Answers ({Object.keys(response.answers).length} questions)
                                                                </summary>
                                                                <div className="mt-3 bg-white rounded-lg border border-slate-200 p-4 max-h-96 overflow-y-auto">
                                                                    <div className="space-y-6">
                                                                        {/* Section 1: Auditor Eksternal */}
                                                                        <div>
                                                                            <h5 className="text-sm font-semibold text-blue-700 mb-3 pb-2 border-b border-blue-200">
                                                                                Interaksi Komite Audit dengan Auditor Eksternal
                                                                            </h5>
                                                                            <div className="space-y-3">
                                                                                {sections.map((section) => (
                                                                                    <div key={section.id} className="space-y-2">
                                                                                        <p className="text-xs font-semibold text-slate-700 mt-3">
                                                                                            {section.id}. {section.title}
                                                                                        </p>
                                                                                        {section.rows.map((row) => {
                                                                                            const answer = response.answersRaw[row.id];
                                                                                            if (!answer) return null;
                                                                                            return (
                                                                                                <div
                                                                                                    key={row.id}
                                                                                                    className="pl-4 pr-2 py-2 rounded bg-slate-50 border border-slate-200"
                                                                                                >
                                                                                                    <div className="flex items-start justify-between gap-3">
                                                                                                        <div className="flex-1 min-w-0">
                                                                                                            <div className="flex items-center gap-2 mb-1">
                                                                                                                <span className="font-mono text-xs font-semibold text-blue-600">
                                                                                                                    {row.id}
                                                                                                                </span>
                                                                                                                <span className="text-xs font-semibold text-slate-900 px-2 py-0.5 rounded bg-blue-100">
                                                                                                                    {LIKERT_LABELS[answer] || answer}
                                                                                                                </span>
                                                                                                            </div>
                                                                                                            <p className="text-xs text-slate-700 leading-relaxed">
                                                                                                                {row.label}
                                                                                                            </p>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            );
                                                                                        })}
                                                                                    </div>
                                                                                ))}
                                                                            </div>
                                                                        </div>

                                                                        {/* Section 2: Auditor Internal */}
                                                                        <div>
                                                                            <h5 className="text-sm font-semibold text-orange-700 mb-3 pb-2 border-b border-orange-200">
                                                                                Interaksi Komite Audit dengan Auditor Internal
                                                                            </h5>
                                                                            <div className="space-y-3">
                                                                                {sections2.map((section) => (
                                                                                    <div key={section.id} className="space-y-2">
                                                                                        <p className="text-xs font-semibold text-slate-700 mt-3">
                                                                                            {section.id}. {section.title}
                                                                                        </p>
                                                                                        {section.rows.map((row) => {
                                                                                            const answer = response.answersRaw[row.id];
                                                                                            if (!answer) return null;
                                                                                            return (
                                                                                                <div
                                                                                                    key={row.id}
                                                                                                    className="pl-4 pr-2 py-2 rounded bg-slate-50 border border-slate-200"
                                                                                                >
                                                                                                    <div className="flex items-start justify-between gap-3">
                                                                                                        <div className="flex-1 min-w-0">
                                                                                                            <div className="flex items-center gap-2 mb-1">
                                                                                                                <span className="font-mono text-xs font-semibold text-orange-600">
                                                                                                                    {row.id}
                                                                                                                </span>
                                                                                                                <span className="text-xs font-semibold text-slate-900 px-2 py-0.5 rounded bg-orange-100">
                                                                                                                    {LIKERT_LABELS[answer] || answer}
                                                                                                                </span>
                                                                                                            </div>
                                                                                                            <p className="text-xs text-slate-700 leading-relaxed">
                                                                                                                {row.label}
                                                                                                            </p>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            );
                                                                                        })}
                                                                                    </div>
                                                                                ))}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </details>
                                                        </div>

                                                        {/* Metadata */}
                                                        <div className="md:col-span-2 pt-4 border-t border-slate-200">
                                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-slate-500">
                                                                <div>
                                                                    <strong>Response ID:</strong>
                                                                    <p className="font-mono mt-1 break-all">{response.id}</p>
                                                                </div>
                                                                <div>
                                                                    <strong>Created:</strong>
                                                                    <p className="mt-1">{formatDate(response.createdAt)}</p>
                                                                </div>
                                                                <div>
                                                                    <strong>Updated:</strong>
                                                                    <p className="mt-1">{formatDate(response.updatedAt)}</p>
                                                                </div>
                                                                <div>
                                                                    <strong>Consent:</strong>
                                                                    <p className="mt-1">{response.consent ? "✓ Yes" : "✗ No"}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </main>

            <footer className="px-4 sm:px-6 lg:px-8 pb-10">
                <div className="mx-auto max-w-7xl text-xs text-slate-700 text-center">
                    © {new Date().getFullYear()} • Form 1 Results - DiluarPersegi
                </div>
            </footer>
        </div>
    );
}

