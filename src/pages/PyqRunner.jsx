import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ChevronLeft, Clock, CheckCircle2, Info, Grid } from "lucide-react";

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

// Dummy PYQ bank by subject (MCQ) with explanations
const BANK = {
  physics: [
    { q: "A body starts from rest with acceleration 2 m/s^2. Its speed after 5s?", options: ["2 m/s", "5 m/s", "10 m/s", "20 m/s"], ans: 2, exp: "v = u + at = 0 + 2×5 = 10 m/s." },
    { q: "Unit of power?", options: ["N", "N·m", "J/s", "kg·m/s"], ans: 2, exp: "Power is energy per unit time, SI unit is watt = J/s." },
    { q: "Light year measures?", options: ["Time", "Distance", "Mass", "Energy"], ans: 1, exp: "A light-year is the distance light travels in one year." },
  ],
  chemistry: [
    { q: "pH of neutral water at 25°C is?", options: ["0", "5", "7", "14"], ans: 2, exp: "At 25°C, [H+] = 10^-7 so pH = 7 for neutral water." },
    { q: "Avogadro number is ~?", options: ["6.022×10^23", "3.14", "9.8", "1.6×10^-19"], ans: 0, exp: "Avogadro constant NA ≈ 6.022×10^23 mol^-1." },
    { q: "Which is a strong acid?", options: ["HCl", "CH3COOH", "NH3", "H2O"], ans: 0, exp: "HCl is a strong acid (completely ionizes in water)." },
  ],
  math: [
    { q: "Derivative of sin x?", options: ["cos x", "-cos x", "sin x", "-sin x"], ans: 0, exp: "d/dx(sin x) = cos x." },
    { q: "∫ x dx = ?", options: ["x^2/2 + C", "x^2 + C", "2x + C", "ln x + C"], ans: 0, exp: "∫ x dx = x^2/2 + C by power rule." },
    { q: "If a+b=10 and ab=16, then a,b are roots of?", options: ["x^2-10x+16", "x^2+10x+16", "x^2-16x+10", "x^2+16x+10"], ans: 0, exp: "For roots a,b: x^2 - (sum)x + (product) = 0 → x^2 - 10x + 16." },
  ],
};

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function PyqRunner() {
  const q = useQuery();
  const navigate = useNavigate();
  const exam = q.get("exam") || "jee-main";
  const scope = (q.get("scope") || "full").toLowerCase(); // full | physics | chemistry | math
  const doShuffle = (q.get("shuffle") || "on").toLowerCase() !== "off"; // shuffle by default

  // Build question set based on scope
  const baseQuestions = useMemo(() => {
    if (scope === "physics" || scope === "chemistry" || scope === "math") {
      return BANK[scope] || [];
    }
    // full => mix PCM
    return [...BANK.physics, ...BANK.chemistry, ...BANK.math];
  }, [scope]);

  const questions = useMemo(() => (doShuffle ? shuffleArray(baseQuestions) : baseQuestions), [baseQuestions, doShuffle]);

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
  function jumpTo(i) {
    if (i >= 0 && i < questions.length) setIndex(i);
  }
  function submit() {
    const score = answers.reduce((s, ansIdx, i) => (ansIdx === questions[i].ans ? s + 1 : s), 0);
    navigate(`/mock/result?exam=${encodeURIComponent(exam)}&score=${score}&total=${questions.length}`);
  }

  const statusLabel = selected == null ? "Unanswered" : selected === curr?.ans ? "Correct" : "Incorrect";
  const statusColor = selected == null ? "text-slate-600" : selected === curr?.ans ? "text-emerald-600" : "text-rose-600";

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50/50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between gap-3">
          <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg ring-1 ring-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-sm">
            <ChevronLeft className="h-4 w-4" /> Leave
          </button>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-sm text-slate-700">
              <Grid className="h-4 w-4 text-slate-500" />
              <span className="hidden md:inline">Question</span>
              <strong>{index + 1}</strong>
              <span className="text-slate-400">/ {questions.length}</span>
            </div>
            <div className="inline-flex items-center gap-2 text-sm text-slate-700">
              <Clock className="h-4 w-4 text-emerald-600" /> {mm}:{ss}
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-4">
          {/* Question panel */}
          <div className="rounded-2xl bg-white ring-1 ring-slate-200 p-5 min-h-[420px]">
            <div className="text-sm text-slate-600">Question {index + 1} of {questions.length} · {scope === 'full' ? 'PCM' : scope}</div>
            <div className="mt-3 p-4 rounded-xl bg-slate-50 text-slate-900 text-base">
              {curr?.q || 'No questions available.'}
            </div>

            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2">
              {(curr?.options || []).map((opt, i) => {
                const isSelected = selected === i;
                const isCorrect = i === curr?.ans;
                const showCorrectState = selected != null && (isSelected || isCorrect);
                const stateClass = selected == null
                  ? (isSelected ? 'ring-emerald-500 bg-emerald-50' : 'ring-slate-200 bg-white hover:bg-slate-50')
                  : showCorrectState
                    ? (isCorrect ? 'ring-emerald-500 bg-emerald-50' : isSelected ? 'ring-rose-400 bg-rose-50' : 'ring-slate-200 bg-white')
                    : 'ring-slate-200 bg-white';
                return (
                  <button
                    key={i}
                    onClick={() => choose(i)}
                    className={`px-3 py-2 rounded-lg ring-2 text-left text-sm transition ${stateClass}`}
                  >
                    {String.fromCharCode(65 + i)}. {opt}
                  </button>
                );
              })}
            </div>

            {/* Explanation */}
            {curr && (
              <div className="mt-4 p-3 rounded-xl ring-1 ring-slate-200 bg-white/60">
                <div className="flex items-center justify-between">
                  <div className={`inline-flex items-center gap-2 text-sm ${statusColor}`}>
                    <Info className="h-4 w-4" /> {statusLabel}
                  </div>
                  {selected == null ? (
                    <span className="text-xs text-slate-500">Select an option to reveal explanation</span>
                  ) : null}
                </div>
                {selected != null && (
                  <div className="mt-2 text-sm text-slate-700">
                    <div className="text-slate-800 mb-1"><strong>Correct:</strong> {String.fromCharCode(65 + curr.ans)} — {curr.options[curr.ans]}</div>
                    <div className="leading-relaxed">{curr.exp}</div>
                  </div>
                )}
            </div>
            )}

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

          {/* Palette panel */}
          <div className="lg:sticky lg:top-4 h-max rounded-2xl bg-white ring-1 ring-slate-200 p-4">
            <div className="text-sm font-medium text-slate-800 mb-3">Question Palette</div>
            <div className="grid grid-cols-8 sm:grid-cols-10 lg:grid-cols-5 gap-2">
              {questions.map((_, i) => {
                const ans = answers[i];
                const isCurrent = i === index;
                const base = ans == null ? 'bg-slate-100 text-slate-600' : 'bg-emerald-100 text-emerald-700';
                const currRing = isCurrent ? 'ring-2 ring-emerald-500' : 'ring-1 ring-slate-200';
                return (
                  <button
                    key={i}
                    onClick={() => jumpTo(i)}
                    className={`h-9 rounded-md ${base} ${currRing} text-xs font-semibold grid place-items-center hover:brightness-95 transition`}
                    title={`Go to Q${i+1}`}
                  >
                    {i + 1}
                  </button>
                );
              })}
            </div>
            <div className="mt-3 text-[11px] text-slate-500">
              <span className="inline-block h-3 w-3 rounded-sm bg-emerald-100 align-middle mr-1"></span> Answered
              <span className="inline-block h-3 w-3 rounded-sm bg-slate-100 align-middle mx-2"></span> Unanswered
            </div>
            <div className="mt-4">
              <button onClick={() => jumpTo(answers.findIndex((a)=>a==null) !== -1 ? answers.findIndex((a)=>a==null) : 0)} className="w-full px-3 py-2 rounded-lg text-sm bg-slate-900 text-white hover:bg-black">
                Jump to first unanswered
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
