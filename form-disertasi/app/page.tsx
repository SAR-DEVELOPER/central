import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Central Hub",
  description: "Your centralized hub for all miscellaneous information and resources",
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-8">
      <div className="max-w-2xl text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-5xl font-bold tracking-tight">Central Hub</h1>
          <p className="text-xl text-slate-300">Your Centralized Information Portal</p>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent" />

        <p className="text-lg text-slate-400 leading-relaxed">
          A unified platform for all your miscellaneous resources and centralized information.
          Coming soon.
        </p>

        <div className="pt-8">
          <div className="inline-block px-6 py-3 bg-slate-800 rounded-lg border border-slate-700">
            <p className="text-sm text-slate-500">Under Construction</p>
          </div>
        </div>

        <div className="pt-12 space-y-2 text-sm text-slate-500">
          <p>Designed by <span className="text-slate-300">Wilson Nathanael</span></p>
          <p>Operated under <span className="text-slate-300 font-semibold">DiluarPersegi</span></p>
        </div>
      </div>
    </div>
  );
}