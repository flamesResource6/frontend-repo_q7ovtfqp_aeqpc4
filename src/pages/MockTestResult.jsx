import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ChevronLeft, BarChart2, Download } from "lucide-react";

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

export default function MockTestResult() {
  const q = useQuery();
  const navigate = useNavigate();
  const exam = q.get("exam") || "jee-main";

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50/50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate('/dashboard')} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg ring-1 ring-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-sm">
            <ChevronLeft className="h-4 w-4" /> Back to Dashboard
          </button>
          <div className="text-xs text-slate-600">Results</div>
        </div>

        <div className="mt-4 rounded-2xl bg-white ring-1 ring-slate-200 p-5">
          <div className="text-lg font-bold text-slate-900">Your performance · {exam.toUpperCase()}</div>
          <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="rounded-xl ring-1 ring-slate-200 p-3">
              <div className="text-xs text-slate-500">Score</div>
              <div className="text-2xl font-bold">178</div>
            </div>
            <div className="rounded-xl ring-1 ring-slate-200 p-3">
              <div className="text-xs text-slate-500">Accuracy</div>
              <div className="text-2xl font-bold">73%</div>
            </div>
            <div className="rounded-xl ring-1 ring-slate-200 p-3">
              <div className="text-xs text-slate-500">Percentile</div>
              <div className="text-2xl font-bold">92</div>
            </div>
          </div>

          <div className="mt-4 h-40 rounded-xl ring-1 ring-slate-200 bg-slate-50 grid place-items-center text-slate-500 text-sm">
            <BarChart2 className="h-5 w-5 text-slate-400" /> Detailed analytics coming soon
          </div>

          <div className="mt-4 flex items-center gap-2">
            <button onClick={() => navigate('/dashboard')} className="px-3 py-1.5 rounded-lg text-sm bg-slate-100 ring-1 ring-slate-200">Review later</button>
            <button className="px-3 py-1.5 rounded-lg text-sm bg-slate-900 text-white inline-flex items-center gap-2"><Download className="h-4 w-4" /> Download report</button>
          </div>
        </div>
      </div>
    </div>
  );
}
