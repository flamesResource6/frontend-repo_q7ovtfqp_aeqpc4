import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ChevronLeft, Clock, CheckCircle2, PauseCircle, PlayCircle } from "lucide-react";

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

export default function MockTestRunner() {
  const q = useQuery();
  const navigate = useNavigate();
  const total = parseInt(q.get("duration") || "180", 10) * 60; // seconds
  const exam = q.get("exam") || "jee-main";
  const [remaining, setRemaining] = useState(total);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => setRemaining((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(timerRef.current);
  }, [paused]);

  useEffect(() => {
    if (remaining === 0) {
      navigate(`/mock/result?exam=${encodeURIComponent(exam)}`);
    }
  }, [remaining, exam, navigate]);

  const mm = String(Math.floor(remaining / 60)).padStart(2, "0");
  const ss = String(remaining % 60).padStart(2, "0");

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50/50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg ring-1 ring-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-sm">
            <ChevronLeft className="h-4 w-4" /> Leave
          </button>
          <div className="inline-flex items-center gap-2 text-sm text-slate-700">
            <Clock className="h-4 w-4 text-sky-600" /> {mm}:{ss}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-3 rounded-2xl bg-white ring-1 ring-slate-200 p-4 min-h-[480px]">
            <div className="text-sm text-slate-600">Question 12 of 90</div>
            <div className="mt-2 h-48 rounded-xl bg-slate-50" />
            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2">
              {['A','B','C','D'].map((o) => (
                <button key={o} className="px-3 py-2 rounded-lg ring-1 ring-slate-200 bg-white text-left hover:bg-slate-50 text-sm">Option {o}</button>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-2">
              <button onClick={()=>setPaused(p=>!p)} className="px-3 py-1.5 rounded-lg text-sm bg-slate-100 ring-1 ring-slate-200 inline-flex items-center gap-2">{paused? <PlayCircle className="h-4 w-4" />: <PauseCircle className="h-4 w-4" />} {paused? 'Resume':'Pause'}</button>
              <button onClick={()=>navigate(`/mock/result?exam=${encodeURIComponent(exam)}`)} className="px-3 py-1.5 rounded-lg text-sm bg-emerald-600 text-white inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4" /> Submit Test</button>
            </div>
          </div>
          <div className="rounded-2xl bg-white ring-1 ring-slate-200 p-4">
            <div className="text-sm font-semibold text-slate-900">Palette</div>
            <div className="mt-2 grid grid-cols-5 gap-1">
              {Array.from({ length: 90 }).map((_, i) => (
                <button key={i} className="h-7 w-7 text-[11px] rounded grid place-items-center bg-slate-50 ring-1 ring-slate-200 hover:bg-slate-100">{i+1}</button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
