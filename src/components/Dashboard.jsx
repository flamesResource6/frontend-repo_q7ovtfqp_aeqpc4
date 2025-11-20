import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, LogOut, BookOpen, FileText, BarChart3, Layers } from "lucide-react";

const exams = [
  { id: "jee-main", label: "JEE Main" },
  { id: "jee-adv", label: "JEE Advanced" },
  { id: "bitsat", label: "BITSAT" },
  { id: "eamcet", label: "EAMCET" },
  { id: "mht-cet", label: "MHT CET" },
  { id: "cbse", label: "CBSE" },
  { id: "isc", label: "ISC" },
  { id: "icse", label: "ICSE" },
];

export default function Dashboard({ user, onLogout }) {
  const [selectedExam, setSelectedExam] = useState(null);
  const [mode, setMode] = useState(null); // "pyq" | "mock"

  useEffect(() => {
    const hashExam = decodeURIComponent(window.location.hash.replace("#", ""));
    if (hashExam && exams.some((e) => e.id === hashExam)) {
      setSelectedExam(hashExam);
    }
  }, []);

  useEffect(() => {
    if (selectedExam) window.location.hash = selectedExam;
  }, [selectedExam]);

  const examLabel = useMemo(() => exams.find((e) => e.id === selectedExam)?.label || "", [selectedExam]);

  return (
    <section className="min-h-[80vh] bg-gradient-to-b from-sky-50/60 via-white to-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-6">
        {/* Header row */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-sky-100 ring-1 ring-sky-200 flex items-center justify-center">
              <Layers className="h-4 w-4 text-sky-600" />
            </div>
            <div>
              <div className="text-sm text-slate-600">Welcome back</div>
              <div className="text-[15px] font-semibold text-slate-900">{user?.name || "Student"}</div>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-[13px] font-medium text-slate-700 bg-white ring-1 ring-slate-200 hover:bg-slate-50"
          >
            <LogOut className="h-4 w-4" /> Logout
          </button>
        </div>

        {/* Stepper */}
        <div className="mb-5 flex items-center gap-2 text-[12px] text-slate-600">
          <span className={`px-2 py-1 rounded-full ring-1 ${!selectedExam ? "ring-sky-300 bg-sky-50 text-sky-700" : "ring-slate-200"}`}>1. Select exam</span>
          <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
          <span className={`px-2 py-1 rounded-full ring-1 ${selectedExam && !mode ? "ring-emerald-300 bg-emerald-50 text-emerald-700" : "ring-slate-200"}`}>2. Choose mode</span>
          <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
          <span className={`px-2 py-1 rounded-full ring-1 ${mode ? "ring-slate-300 bg-white text-slate-700" : "ring-slate-200"}`}>3. Start</span>
        </div>

        {/* Exam selector */}
        <AnimatePresence mode="wait">
          {!selectedExam && (
            <motion.div
              key="exam-select"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3"
            >
              {exams.map((ex) => (
                <button
                  key={ex.id}
                  onClick={() => setSelectedExam(ex.id)}
                  className="group rounded-xl bg-white ring-1 ring-slate-200 hover:ring-sky-300 shadow-sm px-3 py-3 text-left transition"
                >
                  <div className="flex items-center gap-2">
                    <div className="h-7 w-7 rounded-lg bg-sky-100 ring-1 ring-sky-200 flex items-center justify-center">
                      <BarChart3 className="h-4 w-4 text-sky-600" />
                    </div>
                    <div className="text-[13px] font-semibold text-slate-900 leading-snug">{ex.label}</div>
                  </div>
                  <div className="mt-1 text-[11px] text-slate-500">PYQs, mocks, and chapter-wise practice</div>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mode picker */}
        <AnimatePresence mode="wait">
          {selectedExam && !mode && (
            <motion.div
              key="mode-select"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-3"
            >
              <button
                onClick={() => setMode("pyq")}
                className="group rounded-2xl bg-white ring-1 ring-slate-200 hover:ring-emerald-300 shadow-sm p-4 text-left transition"
              >
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-emerald-100 ring-1 ring-emerald-200 flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-emerald-700" />
                  </div>
                  <div>
                    <div className="text-[15px] font-bold text-slate-900">Previous Year Questions (PYQ)</div>
                    <div className="text-[12px] text-slate-600">Topic-wise practice with solutions</div>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setMode("mock")}
                className="group rounded-2xl bg-white ring-1 ring-slate-200 hover:ring-sky-300 shadow-sm p-4 text-left transition"
              >
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-sky-100 ring-1 ring-sky-200 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-sky-700" />
                  </div>
                  <div>
                    <div className="text-[15px] font-bold text-slate-900">Mock Papers</div>
                    <div className="text-[12px] text-slate-600">Timed full-length tests with analytics</div>
                  </div>
                </div>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Selected summary and start */}
        <AnimatePresence mode="wait">
          {selectedExam && mode && (
            <motion.div
              key="summary"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="mt-3"
            >
              <div className="rounded-2xl bg-white ring-1 ring-slate-200 shadow-sm p-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <div className="text-[12px] text-slate-600">You selected</div>
                    <div className="text-[15px] font-semibold text-slate-900">{examLabel} · {mode === "pyq" ? "PYQ" : "Mock Papers"}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setMode(null)}
                      className="px-3 py-2 rounded-lg text-[13px] font-medium bg-slate-50 hover:bg-slate-100 ring-1 ring-slate-200"
                    >
                      Change mode
                    </button>
                    <button
                      onClick={() => setSelectedExam(null)}
                      className="px-3 py-2 rounded-lg text-[13px] font-medium bg-slate-50 hover:bg-slate-100 ring-1 ring-slate-200"
                    >
                      Change exam
                    </button>
                    <a
                      href="#"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-[13px] font-semibold shadow-sm shadow-emerald-200"
                    >
                      Start now
                      <ChevronRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Quick tips */}
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {["Adaptive practice", "Smart time targets", "Honest analytics"].map((tip, idx) => (
                  <div key={idx} className="rounded-xl bg-white ring-1 ring-slate-200 p-3">
                    <div className="h-2 w-16 rounded bg-slate-100" />
                    <div className="mt-2 text-[12px] text-slate-600">{tip}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
