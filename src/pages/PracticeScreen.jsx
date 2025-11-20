import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ChevronLeft, BookOpen, TimerReset, CheckCircle2 } from "lucide-react";

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

export default function PracticeScreen() {
  const q = useQuery();
  const navigate = useNavigate();
  const exam = q.get("exam") || "jee-main";
  const chapter = q.get("chapter") || "Limits & Continuity";
  const difficulty = q.get("difficulty") || "Mixed";

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50/50 to-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg ring-1 ring-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-sm">
            <ChevronLeft className="h-4 w-4" /> Back
          </button>
          <div className="text-xs text-slate-600">Practice Mode</div>
        </div>

        <div className="mt-4 rounded-2xl bg-white ring-1 ring-slate-200 p-5">
          <div className="flex items-start gap-3">
            <div className="h-11 w-11 rounded-2xl bg-emerald-100 ring-1 ring-emerald-200 grid place-items-center">
              <BookOpen className="h-6 w-6 text-emerald-700" />
            </div>
            <div>
              <div className="text-lg font-bold text-slate-900">{chapter} · PYQs</div>
              <div className="text-sm text-slate-600">{exam.toUpperCase()} · Difficulty: {difficulty}</div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
            {[1,2,3,4,5,6,7,8,9,10].map((i) => (
              <div key={i} className="rounded-xl ring-1 ring-slate-200 p-3">
                <div className="text-xs text-slate-500">Question {i}</div>
                <div className="mt-1 h-10 rounded bg-slate-50" />
                <button className="mt-2 inline-flex items-center gap-1 text-xs px-2 py-1 rounded bg-emerald-600 text-white">Attempt</button>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="inline-flex items-center gap-2 text-xs text-slate-600">
              <TimerReset className="h-4 w-4 text-emerald-600" />
              Adaptive practice enabled
            </div>
            <button onClick={() => navigate("/dashboard")} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold">
              <CheckCircle2 className="h-4 w-4" /> Finish Session
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
