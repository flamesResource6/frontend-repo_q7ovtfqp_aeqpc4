import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ChevronLeft, Clock, CheckCircle2 } from "lucide-react";

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

// Dummy PYQ bank by subject (MCQ)
const BANK = {
  physics: [
    { q: "A body starts from rest with acceleration 2 m/s^2. Its speed after 5s?", options: ["2 m/s", "5 m/s", "10 m/s", "20 m/s"], ans: 2 },
    { q: "Unit of power?", options: ["N", "N·m", "J/s", "kg·m/s"], ans: 2 },
    { q: "Light year measures?", options: ["Time", "Distance", "Mass", "Energy"], ans: 1 },
  ],
  chemistry: [
    { q: "pH of neutral water at 25°C is?", options: ["0", "5", "7", "14"], ans: 2 },
    { q: "Avogadro number is ~?", options: ["6.022×10^23", "3.14", "9.8", "1.6×10^-19"], ans: 0 },
    { q: "Which is a strong acid?", options: ["HCl", "CH3COOH", "NH3", "H2O"], ans: 0 },
  ],
  math: [
    { q: "Derivative of sin x?", options: ["cos x", "-cos x", "sin x", "-sin x"], ans: 0 },
    { q: "∫ x dx = ?", options: ["x^2/2 + C", "x^2 + C", "2x + C", "ln x + C"], ans: 0 },
    { q: "If a+b=10 and ab=16, then a,b are roots of?", options: ["x^2-10x+16", "x^2+10x+16", "x^2-16x+10", "x^2+16x+10"], ans: 0 },
  ],
};

export default function PyqRunner() {
  const q = useQuery();
  const navigate = useNavigate();
  const exam = q.get("exam") || "jee-main";
  const scope = (q.get("scope") || "full").toLowerCase(); // full | physics | chemistry | math

  // Build question set based on scope
  const questions = useMemo(() => {
    if (scope === "physics" || scope === "chemistry" || scope === "math") {
      return BANK[scope] || [];
    }
    // full => mix PCM
    return [...BANK.physics, ...BANK.chemistry, ...BANK.math];
  }, [scope]);

  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState(() => Array(questions.length).fill(null));
  const [time, setTime] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTime((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    setAnswers(Array(questions.length).fill(null));
    setIndex(0);
  }, [questions.length]);

  const mm = String(Math.floor(time / 60)).padStart(2, "0");
  const ss = String(time % 60).padStart(2, "0");

  const curr = questions[index];
  const selected = answers[index];

  function choose(optIdx) {
    setAnswers((a) => {
      const copy = [...a];
      copy[index] = optIdx;
      return copy;
    });
  }

  function next() {
    if (index < questions.length - 1) setIndex((i) => i + 1);
  }
  function prev() {
    if (index > 0) setIndex((i) => i - 1);
  }
  function submit() {
    const score = answers.reduce((s, ansIdx, i) => (ansIdx === questions[i].ans ? s + 1 : s), 0);
    navigate(`/mock/result?exam=${encodeURIComponent(exam)}&score=${score}&total=${questions.length}`);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50/50 to-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg ring-1 ring-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-sm">
            <ChevronLeft className="h-4 w-4" /> Leave
          </button>
          <div className="inline-flex items-center gap-2 text-sm text-slate-700">
            <Clock className="h-4 w-4 text-emerald-600" /> {mm}:{ss}
          </div>
        </div>

        <div className="mt-4 rounded-2xl bg-white ring-1 ring-slate-200 p-5 min-h-[420px]">
          <div className="text-sm text-slate-600">Question {index + 1} of {questions.length} · {scope === 'full' ? 'PCM' : scope}</div>
          <div className="mt-3 p-4 rounded-xl bg-slate-50 text-slate-900 text-base">
            {curr?.q || 'No questions available.'}
          </div>
          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2">
            {(curr?.options || []).map((opt, i) => (
              <button
                key={i}
                onClick={() => choose(i)}
                className={`px-3 py-2 rounded-lg ring-2 text-left text-sm transition ${selected===i? 'ring-emerald-500 bg-emerald-50':'ring-slate-200 bg-white hover:bg-slate-50'}`}
              >
                {String.fromCharCode(65 + i)}. {opt}
              </button>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between">
            <button onClick={prev} disabled={index===0} className="px-3 py-2 rounded-lg text-sm bg-slate-100 ring-1 ring-slate-200 disabled:opacity-50">Previous</button>
            {index < questions.length - 1 ? (
              <button onClick={next} className="px-3 py-2 rounded-lg text-sm bg-emerald-600 hover:bg-emerald-700 text-white">Next</button>
            ) : (
              <button onClick={submit} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold">
                <CheckCircle2 className="h-4 w-4" /> Submit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
