import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  LogOut,
  BookOpen,
  FileText,
  BarChart3,
  Layers,
  Home,
  Settings,
  LineChart,
  PlayCircle,
  Library,
  GraduationCap,
  Info,
  Bell,
  Trophy,
  Share2,
  User,
  Lock,
  X,
  Target,
  Award,
  Star,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Constants
const EXAMS = [
  { id: "jee-main", label: "JEE Main" },
  { id: "jee-adv", label: "JEE Advanced" },
  { id: "bitsat", label: "BITSAT" },
  { id: "cbse", label: "Board Exams" },
  { id: "eamcet", label: "EAMCET" },
  { id: "viteee", label: "VITEEE" },
];

const CLASS_LEVELS = [
  { id: "11", label: "Class 11" },
  { id: "12", label: "Class 12" },
  { id: "dropper", label: "Dropper" },
];

export default function Dashboard({ user, onLogout }) {
  const navigate = useNavigate();

  // Personalization
  const [classLevel, setClassLevel] = useState("12");
  const [preferredExams, setPreferredExams] = useState(["jee-main", "jee-adv"]);

  // Flow
  const [selectedExam, setSelectedExam] = useState(null);
  const [mode, setMode] = useState("pyq"); // "pyq" | "mock"

  // UI
  const [showExamPicker, setShowExamPicker] = useState(false);
  const [copied, setCopied] = useState(false);

  // Modal states
  const [flowModalOpen, setFlowModalOpen] = useState(false);
  const [flowType, setFlowType] = useState(/** @type {"mock"|"pyq"|null} */(null));
  const [flowStep, setFlowStep] = useState(1); // 1: years, 2: scope
  const [years, setYears] = useState(/** @type {1|3|5|10|null} */(null));
  const [selectedYear, setSelectedYear] = useState(/** @type {number|null} */(null));
  const [scope, setScope] = useState(/** @type {"full"|"math"|"physics"|"chemistry"|null} */(null));

  const [roadmapModalOpen, setRoadmapModalOpen] = useState(false);
  const [roadmapWeeks, setRoadmapWeeks] = useState(4);
  const [roadmapFocus, setRoadmapFocus] = useState({ math: true, physics: true, chemistry: true });

  // New: subject selection for quick "Start Solving PYQs" section
  const [practiceSubjects, setPracticeSubjects] = useState({ physics: false, chemistry: false, math: false });

  // Load prefs
  useEffect(() => {
    try {
      const raw = localStorage.getItem("examsaathi:prefs");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.classLevel) setClassLevel(parsed.classLevel);
        if (Array.isArray(parsed.preferredExams)) setPreferredExams(parsed.preferredExams);
      }
    } catch {}
  }, []);

  // Initialize from URL
  useEffect(() => {
    const url = new URL(window.location.href);
    const m = (url.searchParams.get("mode") || "").toLowerCase();
    if (m === "pyq" || m === "mock") setMode(m);
    const hashExam = decodeURIComponent(url.hash.replace("#", ""));
    if (hashExam && EXAMS.some((e) => e.id === hashExam)) {
      setSelectedExam(hashExam);
    } else if (!selectedExam) {
      const firstPref = preferredExams[0] || EXAMS[0].id;
      setSelectedExam(firstPref);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist prefs
  useEffect(() => {
    try {
      localStorage.setItem(
        "examsaathi:prefs",
        JSON.stringify({ classLevel, preferredExams })
      );
    } catch {}
  }, [classLevel, preferredExams]);

  // URL sync: selectedExam -> hash
  useEffect(() => {
    if (selectedExam) {
      const url = new URL(window.location.href);
      url.hash = `#${selectedExam}`;
      window.history.replaceState(null, "", url);
    }
  }, [selectedExam]);

  // URL sync: mode -> query
  useEffect(() => {
    if (!mode) return;
    const url = new URL(window.location.href);
    url.searchParams.set("mode", mode);
    window.history.replaceState(null, "", url);
  }, [mode]);

  // Listen for manual URL edits
  useEffect(() => {
    const onUrlChange = () => {
      try {
        const url = new URL(window.location.href);
        const m = (url.searchParams.get("mode") || "").toLowerCase();
        if (m === "pyq" || m === "mock") setMode(m);
        const hashExam = decodeURIComponent(url.hash.replace("#", ""));
        if (hashExam && EXAMS.some((e) => e.id === hashExam)) setSelectedExam(hashExam);
      } catch {}
    };
    window.addEventListener("popstate", onUrlChange);
    window.addEventListener("hashchange", onUrlChange);
    return () => {
      window.removeEventListener("popstate", onUrlChange);
      window.removeEventListener("hashchange", onUrlChange);
    };
  }, []);

  const examLabel = useMemo(
    () => EXAMS.find((e) => e.id === selectedExam)?.label || "",
    [selectedExam]
  );

  // Derived: last 10 years list
  const yearsList = useMemo(() => {
    const now = new Date().getFullYear();
    return Array.from({ length: 10 }, (_, i) => now - i);
  }, []);

  // Sidebar items
  const sidebarItems = [
    { id: "home", label: "Overview", icon: Home, action: () => {} },
    { id: "pyqs", label: "PYQs", icon: Library, action: () => setMode("pyq") },
    { id: "mocks", label: "Mock Tests", icon: FileText, action: () => setMode("mock") },
    { id: "mentor", label: "Mentor", icon: User, action: () => window.open("https://airtable.com", "_blank") },
    { id: "predictor", label: "Predictor", icon: BarChart3, locked: true },
    { id: "counsel", label: "Counseling", icon: GraduationCap, locked: true },
    { id: "settings", label: "Settings", icon: Settings, action: () => {} },
    { id: "logout", label: "Logout", icon: LogOut, action: () => onLogout?.() },
  ];

  // Helpers
  function openFlow(type) {
    if (!selectedExam) {
      setShowExamPicker(true);
      return;
    }
    setMode(type);
    setFlowType(type);
    setYears(null);
    setScope(null);
    setFlowStep(1);
    setFlowModalOpen(true);
  }

  // Open PYQ scope for a specific selected year only (range shortcuts removed)
  function openPyqScore() {
    if (!selectedExam) {
      setShowExamPicker(true);
      return;
    }
    if (!selectedYear) {
      // require year selection before proceeding
      return;
    }
    setMode('pyq');
    setFlowType('pyq');
    setYears(null);
    setScope(null);
    setFlowStep(2); // jump to scope selection
    setFlowModalOpen(true);
  }

  function goToSelection(selScope) {
    if (!selectedExam || !flowType) return;

    const params = new URLSearchParams({ exam: selectedExam, scope: selScope });
    if (flowType === 'pyq') {
      // require a specific year
      if (!selectedYear) return;
      params.set('year', String(selectedYear));
      navigate(`/practice?${params.toString()}`);
    } else {
      // mock flow
      if (!years) params.set('years', '1'); // default if not chosen
      navigate(`/mock/config?${params.toString()}`);
    }
    closeFlow();
  }

  function closeFlow() {
    setFlowModalOpen(false);
    setFlowType(null);
    setFlowStep(1);
    setYears(null);
    setSelectedYear(null);
    setScope(null);
  }

  function copyInvite() {
    try {
      navigator.clipboard.writeText(
        `${window.location.origin}/?ref=${encodeURIComponent(user?.phone || 'friend')}`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  }

  // Roadmap helpers
  function openRoadmap() {
    if (!selectedExam) {
      setShowExamPicker(true);
      return;
    }
    setRoadmapModalOpen(true);
  }
  function buildRoadmap() {
    const focus = Object.entries(roadmapFocus)
      .filter(([, v]) => v)
      .map(([k]) => k)
      .join(',');
    const qs = new URLSearchParams({ exam: selectedExam || '', weeks: String(roadmapWeeks), focus });
    setRoadmapModalOpen(false);
    navigate(`/roadmap?${qs.toString()}`);
  }

  // Practice section helpers
  const allSelected = practiceSubjects.physics && practiceSubjects.chemistry && practiceSubjects.math;
  function toggleSubject(key) {
    setPracticeSubjects((prev) => ({ ...prev, [key]: !prev[key] }));
  }
  function selectAllPCM(val) {
    setPracticeSubjects({ physics: val, chemistry: val, math: val });
  }
  function startPracticeFromSection() {
    if (!selectedExam) {
      setShowExamPicker(true);
      return;
    }
    const selected = Object.entries(practiceSubjects).filter(([, v]) => v).map(([k]) => k);
    const scopeParam = selected.length === 3 ? 'full' : selected.join(',');
    if (selected.length === 0) return; // require at least one
    const params = new URLSearchParams({ exam: selectedExam, scope: scopeParam });
    navigate(`/practice?${params.toString()}`);
  }

  const fadeUp = {
    hidden: { y: 10, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.35 } },
  };

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-b from-sky-50 via-white to-white" />
      <div className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]">
        <svg className="absolute inset-0 h-full w-full opacity-[0.12]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="28" height="28" patternUnits="userSpaceOnUse">
              <path d="M 28 0 L 0 0 0 28" fill="none" stroke="#0ea5e9" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Top bar */}
      <div className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/85 backdrop-blur supports-[backdrop-filter]:bg-white/70">
        <div className="relative">
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-sky-300/50 to-transparent" />
        </div>
        <div className="w-full h-14 flex items-center justify-between px-3 sm:px-4">
          <div className="flex items-center gap-3 w-full">
            <div className="relative h-8 w-8 rounded-md bg-white ring-1 ring-slate-200 grid place-items-center shadow-sm">
              <Layers className="h-4 w-4 text-sky-700" />
              <span className="pointer-events-none absolute -inset-1 rounded-md bg-sky-400/10 blur-md" />
            </div>
            <div className="text-[16px] font-semibold text-slate-900">ExamSaathi</div>
            <div className="ml-3">
              <select
                value={selectedExam || ""}
                onChange={(e) => setSelectedExam(e.target.value)}
                className="text-[13px] rounded-md ring-1 ring-slate-200 bg-white px-2.5 py-1.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-300"
              >
                {!selectedExam ? <option value="" disabled>Select exam</option> : null}
                {EXAMS.map((ex) => (
                  <option key={ex.id} value={ex.id}>{ex.label}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <button className="h-8 w-8 rounded-md bg-white ring-1 ring-slate-200 text-slate-600 hover:bg-slate-50 grid place-items-center">
              <Bell className="h-4 w-4" />
            </button>
            <div className="hidden sm:flex items-center gap-2 text-[13px] text-slate-600">
              <Info className="h-4 w-4 text-slate-500" />
              <span>Personalized for {CLASS_LEVELS.find((c) => c.id === classLevel)?.label}</span>
            </div>
            <button
              onClick={onLogout}
              className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-[13px] font-medium text-white bg-gradient-to-r from-sky-600 to-emerald-600 hover:from-sky-700 hover:to-emerald-700 shadow-sm"
            >
              <LogOut className="h-4 w-4" /> Logout
            </button>
          </div>
        </div>
      </div>

      {/* Hero and layout */}
      <div className="w-full">
        <div className="relative overflow-hidden">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-64 w-[1100px] rounded-full bg-gradient-to-r from-sky-300/30 via-emerald-300/30 to-transparent blur-3xl" />
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="w-full px-3 sm:px-4"
          >
            <div className="grid grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)_330px] gap-4 lg:gap-6 py-6 lg:py-8">
              {/* Left rail */}
              <aside className="hidden lg:block">
                <nav className="relative rounded-2xl bg-white ring-1 ring-slate-200 p-2 shadow-sm overflow-hidden">
                  <div className="pointer-events-none absolute -inset-6 bg-gradient-to-br from-sky-200/20 via-emerald-200/20 to-transparent blur-2xl" />
                  {sidebarItems.map(({ id, label, icon: Icon, locked, action }) => (
                    <button
                      key={id}
                      disabled={locked}
                      onClick={() => {
                        if (locked) return;
                        if (typeof action === "function") action();
                      }}
                      className={`relative group w-full flex items-center justify-between gap-2 rounded-xl px-3 py-2 text-[14px] transition hover:bg-sky-50/60 ${
                        locked ? "text-slate-400 cursor-not-allowed" : "text-slate-700"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <Icon className={`h-5 w-5 ${locked ? "text-slate-300" : "text-sky-600"}`} />
                        <span>{label}</span>
                      </span>
                      {!locked && (
                        <span className="opacity-0 group-hover:opacity-100 transition text-sky-700">
                          <ChevronRight className="h-5 w-5" />
                        </span>
                      )}
                      {locked ? (
                        <span className="inline-flex items-center gap-1 text-[12px] font-medium text-slate-500">
                          <Lock className="h-3.5 w-3.5" />
                        </span>
                      ) : null}
                    </button>
                  ))}
                </nav>

                {/* Invite friends moved below navbar */}
                <div className="relative rounded-2xl bg-white ring-1 ring-slate-200 p-5 shadow-sm overflow-hidden mt-4">
                  <div className="absolute -left-8 -bottom-8 h-20 w-20 bg-emerald-300/10 rounded-full blur-xl" />
                  <div className="flex items-center gap-2 text-[16px] font-semibold text-slate-900 relative z-10">
                    <Share2 className="h-5 w-5 text-sky-700" /> Invite friends
                  </div>
                  <div className="mt-2 text-[14px] text-slate-600 relative z-10">Get 7 days Pro for every friend who joins.</div>
                  <button onClick={copyInvite} className="relative z-10 mt-3 px-4 py-2 rounded-md text-[13px] font-semibold bg-gradient-to-r from-sky-600 to-emerald-600 text-white hover:from-sky-700 hover:to-emerald-700 shadow-sm">{copied ? 'Copied!' : 'Copy link'}</button>
                </div>
              </aside>

              {/* Center column */}
              <main className="space-y-6 lg:space-y-8">
                {/* Top selection card */}
                <motion.div variants={fadeUp} initial="hidden" animate="show" className="relative rounded-2xl bg-white ring-1 ring-slate-200 p-6 sm:p-7 shadow-sm overflow-hidden">
                  <div className="absolute -right-10 -top-10 h-36 w-36 bg-sky-300/10 rounded-full blur-2xl" />
                  <div className="absolute -left-10 -bottom-10 h-36 w-36 bg-emerald-300/10 rounded-full blur-2xl" />
                  <div className="relative z-10 grid grid-cols-1 gap-4">
                    <div>
                      <div className="text-[18px] sm:text-[20px] font-semibold text-slate-900">Welcome back, {"Demo Student"}</div>
                      <div className="mt-3 flex flex-col sm:flex-row sm:items-center gap-3">
                        <label className="text-[14px] text-slate-600">Select exam</label>
                        <select
                          value={selectedExam || ""}
                          onChange={(e) => setSelectedExam(e.target.value)}
                          className="text-[14px] rounded-md ring-1 ring-slate-200 bg-white px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-300 w-full sm:w-64"
                        >
                          {!selectedExam ? <option value="" disabled>Select exam</option> : null}
                          {EXAMS.map((ex) => (
                            <option key={ex.id} value={ex.id}>{ex.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Practice section */}
                <motion.div variants={fadeUp} initial="hidden" animate="show" className="relative rounded-2xl bg-white ring-1 ring-slate-200 p-6 sm:p-7 shadow-sm overflow-hidden">
                  <div className="absolute inset-0 pointer-events-none" style={{ maskImage: "radial-gradient(400px_120px_at_20%_-10%, black, transparent)" }}>
                    <div className="absolute left-0 top-0 h-40 w-64 bg-gradient-to-br from-sky-200/40 to-emerald-200/30 blur-2xl" />
                  </div>
                  <div className="flex items-center justify-between relative z-10">
                    <h2 className="text-[18px] font-semibold text-slate-900">Start Solving PYQs</h2>
                  </div>

                  {/* Subject selection chips */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      onClick={() => selectAllPCM(!allSelected)}
                      className={`px-3 py-2 rounded-md text-[13px] ring-1 transition ${allSelected ? 'bg-slate-900 text-white ring-slate-900' : 'bg-white text-slate-800 ring-slate-200 hover:bg-sky-50'}`}
                    >
                      All PCM
                    </button>
                    {[
                      { id: 'physics', label: 'Physics' },
                      { id: 'chemistry', label: 'Chemistry' },
                      { id: 'math', label: 'Maths' },
                    ].map(opt => (
                      <button
                        key={opt.id}
                        onClick={() => toggleSubject(opt.id)}
                        className={`px-3 py-2 rounded-md text-[13px] ring-1 transition ${practiceSubjects[opt.id] ? 'bg-slate-900 text-white ring-slate-900' : 'bg-white text-slate-800 ring-slate-200 hover:bg-sky-50'}`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="mt-5 flex">
                    <button onClick={startPracticeFromSection} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-gradient-to-r from-sky-600 to-emerald-600 text-white text-[14px] font-semibold shadow-sm">
                      Start Practising
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </motion.div>

                {/* Action cards row */}
                <motion.div variants={fadeUp} initial="hidden" animate="show" className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-4">
                  {/* Full-Length Mock Tests */}
                  <div className="relative rounded-2xl bg-white ring-1 ring-slate-200 p-6 sm:p-7 shadow-sm overflow-hidden">
                    <div className="absolute -right-8 -top-8 h-24 w-24 bg-sky-300/10 rounded-full blur-xl" />
                    <div className="flex items-start gap-4 relative z-10">
                      <div className="h-12 w-12 rounded-xl bg-sky-50 ring-1 ring-slate-200 grid place-items-center">
                        <FileText className="h-6 w-6 text-sky-700" />
                      </div>
                      <div className="flex-1">
                        <div className="text-[18px] font-semibold text-slate-900">Full-Length Mock Tests</div>
                        <div className="mt-1 text-[14px] text-slate-600">Auto-graded, exam-pattern based tests</div>
                        <button onClick={() => openFlow('mock')} className="mt-4 px-4 py-2 rounded-md text-[13px] font-semibold bg-gradient-to-r from-sky-600 to-emerald-600 text-white hover:from-sky-700 hover:to-emerald-700 shadow-sm">Start Test</button>
                      </div>
                    </div>
                  </div>

                  {/* Past Year Papers - updated */}
                  <div className="relative rounded-2xl bg-white ring-1 ring-slate-200 p-6 sm:p-7 shadow-sm overflow-hidden">
                    <div className="absolute -left-8 -bottom-8 h-24 w-24 bg-emerald-300/10 rounded-full blur-xl" />
                    <div className="flex items-start gap-4 relative z-10">
                      <div className="h-12 w-12 rounded-xl bg-emerald-50 ring-1 ring-slate-200 grid place-items-center">
                        <Trophy className="h-6 w-6 text-emerald-700" />
                      </div>
                      <div className="flex-1">
                        <div className="text-[18px] font-semibold text-slate-900">Appear for Real Prev. Year Papers</div>
                        <div className="mt-1 text-[14px] text-slate-600">Pick a specific year to simulate your score.</div>

                        {/* Year dropdown */}
                        <div className="mt-3 flex items-center gap-3">
                          <label className="text-[13px] text-slate-600">Year</label>
                          <select
                            value={selectedYear ?? ''}
                            onChange={(e) => setSelectedYear(Number(e.target.value))}
                            className="text-[13px] rounded-md ring-1 ring-slate-200 bg-white px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-300 w-40"
                          >
                            <option value="" disabled>Select</option>
                            {yearsList.map((y) => (
                              <option key={y} value={y}>{y}</option>
                            ))}
                          </select>
                        </div>

                        {/* CTA only (range buttons removed) */}
                        <div className="mt-4 flex items-center gap-2">
                          <button onClick={openPyqScore} className="px-4 py-2 rounded-md text-[13px] font-semibold bg-gradient-to-r from-sky-600 to-emerald-600 text-white hover:from-sky-700 hover:to-emerald-700 shadow-sm">Simulate Score</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Second row for two more cards */}
                <motion.div variants={fadeUp} initial="hidden" animate="show" className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-4">
                  {/* Chapter-wise Practice */}
                  <div className="relative rounded-2xl bg-white ring-1 ring-slate-200 p-6 sm:p-7 shadow-sm overflow-hidden">
                    <div className="absolute -left-8 -bottom-8 h-24 w-24 bg-emerald-300/10 rounded-full blur-xl" />
                    <div className="flex items-start gap-4 relative z-10">
                      <div className="h-12 w-12 rounded-xl bg-emerald-50 ring-1 ring-slate-200 grid place-items-center">
                        <PlayCircle className="h-6 w-6 text-emerald-700" />
                      </div>
                      <div className="flex-1">
                        <div className="text-[18px] font-semibold text-slate-900">Chapter-wise Practice</div>
                        <div className="mt-1 text-[14px] text-slate-600">Create focused tests by chapter</div>
                        <button onClick={() => openFlow('mock')} className="mt-4 px-4 py-2 rounded-md text-[13px] font-semibold bg-gradient-to-r from-sky-600 to-emerald-600 text-white hover:from-sky-700 hover:to-emerald-700 shadow-sm">Start Test</button>
                      </div>
                    </div>
                  </div>

                  {/* Personalised Revision Roadmap */}
                  <div className="relative rounded-2xl bg-white ring-1 ring-slate-200 p-6 sm:p-7 shadow-sm overflow-hidden">
                    <div className="absolute -right-8 -top-8 h-24 w-24 bg-sky-300/10 rounded-full blur-xl" />
                    <div className="flex items-start gap-4 relative z-10">
                      <div className="h-12 w-12 rounded-xl bg-sky-50 ring-1 ring-slate-200 grid place-items-center">
                        <Target className="h-6 w-6 text-sky-700" />
                      </div>
                      <div className="flex-1">
                        <div className="text-[18px] font-semibold text-slate-900">Personalised Revision Roadmap</div>
                        <div className="mt-1 text-[14px] text-slate-600">A step-by-step plan tailored to your weak areas.</div>
                        <button onClick={openRoadmap} className="mt-4 px-4 py-2 rounded-md text-[13px] font-semibold bg-gradient-to-r from-sky-600 to-emerald-600 text-white hover:from-sky-700 hover:to-emerald-700 shadow-sm">Build Roadmap</button>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Mentor carousel */}
                <motion.div variants={fadeUp} initial="hidden" animate="show" className="relative rounded-2xl bg-white ring-1 ring-slate-200 p-6 sm:p-7 shadow-sm overflow-hidden">
                  <div className="absolute inset-0 pointer-events-none" style={{ maskImage: "radial-gradient(380px_120px_at_90%_120%, black, transparent)" }}>
                    <div className="absolute right-0 bottom-0 h-40 w-64 bg-gradient-to-br from-emerald-200/30 to-sky-200/30 blur-2xl" />
                  </div>
                  <div className="flex items-center justify-between relative z-10">
                    <h3 className="text-[18px] font-semibold text-slate-900">Talk to a mentor 1-on-1</h3>
                    <button onClick={() => window.open('https://airtable.com','_blank')} className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-md bg-gradient-to-r from-sky-600 to-emerald-600 text-white text-[13px] font-semibold hover:from-sky-700 hover:to-emerald-700 shadow-sm">
                      Book a Mentor Session <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-4 -mx-2 overflow-x-auto">
                    <div className="px-2 flex gap-3 min-w-max">
                      {[1,2,3,4,5].map((idx) => (
                        <div key={idx} className="w-[240px] shrink-0 relative rounded-2xl ring-1 ring-slate-200 bg-white shadow-sm p-5 overflow-hidden">
                          <div className="pointer-events-none absolute -inset-8 bg-gradient-to-br from-sky-200/20 via-emerald-200/20 to-transparent blur-2xl" />
                          <div className="relative z-10 flex items-center gap-4">
                            <img src={`https://i.pravatar.cc/120?img=${5+idx}`} alt="mentor" className="h-14 w-14 rounded-full object-cover" loading="lazy" />
                            <div>
                              <div className="text-[15px] font-semibold text-slate-900">Ananya Sharma</div>
                              <div className="text-[12px] text-slate-500">AIR 142 · IIT Bombay</div>
                            </div>
                          </div>
                          <button onClick={() => window.open('https://airtable.com','_blank')} className="relative z-10 mt-4 w-full px-4 py-2 rounded-md text-[13px] font-semibold bg-gradient-to-r from-sky-600 to-emerald-600 text-white hover:from-sky-700 hover:to-emerald-700 shadow-sm">Book Session</button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <button onClick={() => window.open('https://airtable.com','_blank')} className="mt-4 sm:hidden inline-flex items-center justify-center w-full gap-2 px-4 py-2 rounded-md bg-gradient-to-r from-sky-600 to-emerald-600 text-white text-[14px] font-semibold shadow-sm">
                    Book a Mentor Session <ChevronRight className="h-4 w-4" />
                  </button>
                </motion.div>
              </main>

              {/* Right rail */}
              <aside className="hidden lg:block">
                <div className="space-y-4">
                  {/* Promo Block moved to right side */}
                  <div className="relative rounded-2xl bg-white ring-1 ring-slate-200 p-4 shadow-sm overflow-hidden">
                    <div className="pointer-events-none absolute -inset-6 bg-gradient-to-br from-sky-200/20 via-emerald-200/20 to-transparent blur-2xl" />
                    <div className="relative z-10">
                      <div className="text-[12px] font-semibold tracking-wide uppercase text-sky-700">Introducing AlgoUniversity School of CS & AI</div>
                      <div className="mt-2 text-[16px] font-bold text-slate-900 leading-snug">
                        Introducing AlgoUniversity School of CS & AI
                      </div>
                      <div className="mt-1 text-[13px] text-slate-700">
                        A next-gen B.Tech experience built by engineers from IIT Bombay & IIIT Hyderabad
                      </div>
                      <div className="my-3 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
                      <div className="text-[13px] text-slate-700">
                        Shaping future-ready software engineers with hands-on learning, paid internships, and industry mentorship.
                      </div>
                      <div className="mt-3 grid grid-cols-1 gap-2">
                        {/* Card 1 */}
                        <div className="rounded-xl ring-1 ring-slate-200 bg-white p-3">
                          <div className="flex items-start gap-2">
                            <Star className="h-4 w-4 text-amber-500 shrink-0" />
                            <div>
                              <div className="text-[13px] font-semibold text-slate-900">Learn from Top Engineers</div>
                              <div className="text-[12px] text-slate-600">Classes taught by mentors from Google, Microsoft, and top tech firms.</div>
                            </div>
                          </div>
                        </div>
                        {/* Card 2 */}
                        <div className="rounded-xl ring-1 ring-slate-200 bg-white p-3">
                          <div className="flex items-start gap-2">
                            <Star className="h-4 w-4 text-amber-500 shrink-0" />
                            <div>
                              <div className="text-[13px] font-semibold text-slate-900">Real Experience Before Graduation</div>
                              <div className="text-[12px] text-slate-600">Students complete internships & live projects during B.Tech.</div>
                            </div>
                          </div>
                        </div>
                        {/* Card 3 */}
                        <div className="rounded-xl ring-1 ring-slate-200 bg-white p-3">
                          <div className="flex items-start gap-2">
                            <Star className="h-4 w-4 text-amber-500 shrink-0" />
                            <div>
                              <div className="text-[13px] font-semibold text-slate-900">Assured Paid Internships</div>
                              <div className="text-[12px] text-slate-600">From 2nd year onwards, students earn while they learn.</div>
                            </div>
                          </div>
                        </div>
                        {/* Card 4 */}
                        <div className="rounded-xl ring-1 ring-slate-200 bg-white p-3">
                          <div className="flex items-start gap-2">
                            <Star className="h-4 w-4 text-amber-500 shrink-0" />
                            <div>
                              <div className="text-[13px] font-semibold text-slate-900">Placement-Focused Program</div>
                              <div className="text-[12px] text-slate-600">Access to AlgoUniversity’s 5000+ hiring partners & 25 LPA avg. outcomes.</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* KPI cards moved to right rail */}
                  {[
                    { title: 'Accuracy', value: '82%', sub: '+4% this week', icon: Target, tint: 'from-sky-200/30' },
                    { title: 'Avg Score', value: '178', sub: 'out of 300', icon: Award, tint: 'from-emerald-200/30' },
                    { title: 'Questions', value: '462', sub: 'this month', icon: BookOpen, tint: 'from-sky-200/30' },
                  ].map(({ title, value, sub, icon: Icon, tint }, idx) => (
                    <div key={idx} className="relative rounded-2xl bg-white ring-1 ring-slate-200 p-5 shadow-sm overflow-hidden">
                      <div className={`absolute -right-8 -top-8 h-24 w-24 bg-gradient-to-br ${tint} to-transparent blur-2xl`} />
                      <div className="relative z-10 flex items-start gap-4">
                        <div className="h-12 w-12 rounded-xl bg-white ring-1 ring-slate-200 grid place-items-center">
                          <Icon className="h-6 w-6 text-slate-800" />
                        </div>
                        <div className="flex-1">
                          <div className="text-[14px] text-slate-500">{title}</div>
                          <div className="text-[24px] font-semibold text-slate-900">{value}</div>
                          <div className="text-[12px] text-slate-500">{sub}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </aside>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mobile bottom nav */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-white/90 backdrop-blur border-t border-slate-200">
        <div className="grid grid-cols-5">
          <button onClick={() => {}} className="py-2.5 text-[12px] flex flex-col items-center text-slate-700">
            <Home className="h-5 w-5" />
            <span>Home</span>
          </button>
          <button onClick={() => openFlow('pyq')} className="py-2.5 text-[12px] flex flex-col items-center text-slate-700">
            <BookOpen className="h-5 w-5" />
            <span>PYQs</span>
          </button>
          <button onClick={() => openFlow('mock')} className="py-2.5 text-[12px] flex flex-col items-center text-slate-700">
            <FileText className="h-5 w-5" />
            <span>Tests</span>
          </button>
          <button onClick={() => window.open('https://airtable.com','_blank')} className="py-2.5 text-[12px] flex flex-col items-center text-slate-700">
            <User className="h-5 w-5" />
            <span>Mentor</span>
          </button>
          <button onClick={() => {}} className="py-2.5 text-[12px] flex flex-col items-center text-slate-700">
            <Settings className="h-5 w-5" />
            <span>Profile</span>
          </button>
        </div>
      </div>

      {/* Exam Picker Modal */}
      <AnimatePresence>
        {showExamPicker && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm grid place-items-center p-4"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-lg rounded-2xl bg-white ring-1 ring-slate-200 shadow-xl overflow-hidden"
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200">
                <div className="text-sm font-semibold text-slate-900">Choose exam to continue</div>
                <button onClick={() => setShowExamPicker(false)} className="h-8 w-8 grid place-items-center rounded-md hover:bg-slate-50">
                  <X className="h-4 w-4 text-slate-500" />
                </button>
              </div>
              <div className="p-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
                {EXAMS.map((ex) => (
                  <button key={ex.id} onClick={() => { setSelectedExam(ex.id); setShowExamPicker(false); }} className="rounded-xl bg-white ring-1 ring-slate-200 hover:bg-sky-50/70 px-3 py-3 text-left">
                    <div className="text-[14px] font-semibold text-slate-900">{ex.label}</div>
                    <div className="text-[12px] text-slate-500 mt-0.5">Select to proceed</div>
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Flow Modal: scope for selected year (ranges removed for PYQ) */}
      <AnimatePresence>
        {flowModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm grid place-items-center p-4"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-md rounded-2xl bg-white ring-1 ring-slate-200 shadow-xl overflow-hidden"
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200">
                <div className="text-sm font-semibold text-slate-900">{flowType === 'mock' ? 'Mock Papers' : 'Previous Year Questions'}</div>
                <button onClick={closeFlow} className="h-8 w-8 grid place-items-center rounded-md hover:bg-slate-50">
                  <X className="h-4 w-4 text-slate-500" />
                </button>
              </div>

              {/* Step 1 (ranges) only for mock now */}
              {flowType === 'mock' && flowStep === 1 && (
                <div className="p-4">
                  <div className="text-[14px] text-slate-700 font-medium">Select year range</div>
                  <div className="mt-3 grid grid-cols-4 gap-2">
                    {[1,3,5,10].map((y) => (
                      <button key={y} onClick={() => { setYears(y); setFlowStep(2); }} className={`px-3 py-2 rounded-lg text-[14px] ring-1 transition ${years===y? 'bg-slate-900 text-white ring-slate-900':'bg-white text-slate-800 ring-slate-200 hover:bg-sky-50'}`}>
                        {y} yr{y>1?'s':''}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: scope selection */}
              {flowStep === 2 && (
                <div className="p-4">
                  <div className="text-[14px] text-slate-700 font-medium">Choose scope</div>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {[{id:'full',label:'Full Paper'},{id:'math',label:'Maths'},{id:'physics',label:'Physics'},{id:'chemistry',label:'Chemistry'}].map((opt) => (
                      <button key={opt.id} onClick={() => goToSelection(opt.id)} className="px-3 py-2 rounded-lg text-[14px] ring-1 bg-white text-slate-800 ring-slate-200 hover:bg-sky-50">
                        {opt.label}
                      </button>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center justify-between text-[13px] text-slate-600">
                    {flowType === 'mock' && flowStep === 2 ? (
                      <button onClick={() => setFlowStep(1)} className="underline decoration-slate-300 hover:text-slate-900">Back</button>
                    ) : <span />}
                    <div className="text-slate-500">
                      {flowType === 'pyq' && selectedYear ? `Year ${selectedYear}` : flowType === 'mock' && years ? `${years} ${years>1?'years':'year'} selected` : ''}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Roadmap Modal */}
      <AnimatePresence>
        {roadmapModalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm grid place-items-center p-4">
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} transition={{ duration: 0.2 }} className="w-full max-w-md rounded-2xl bg-white ring-1 ring-slate-200 shadow-xl overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200">
                <div className="text-sm font-semibold text-slate-900">Build your revision roadmap</div>
                <button onClick={() => setRoadmapModalOpen(false)} className="h-8 w-8 grid place-items-center rounded-md hover:bg-slate-50"><X className="h-4 w-4 text-slate-500" /></button>
              </div>
              <div className="p-4 space-y-4">
                <div>
                  <label className="text-[13px] text-slate-700">Duration (weeks)</label>
                  <select value={roadmapWeeks} onChange={(e) => setRoadmapWeeks(Number(e.target.value))} className="mt-1 w-full rounded-md ring-1 ring-slate-200 px-3 py-2 text-[13px]">
                    {[2,4,6,8,12].map(w => <option key={w} value={w}>{w} weeks</option>)}
                  </select>
                </div>
                <div>
                  <div className="text-[13px] text-slate-700">Focus areas</div>
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    {[
                      { id:'math', label:'Maths' },
                      { id:'physics', label:'Physics' },
                      { id:'chemistry', label:'Chemistry' },
                    ].map(opt => (
                      <label key={opt.id} className="inline-flex items-center gap-2 text-[13px]">
                        <input type="checkbox" checked={roadmapFocus[opt.id]} onChange={(e) => setRoadmapFocus(prev => ({ ...prev, [opt.id]: e.target.checked }))} />
                        <span>{opt.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <button onClick={buildRoadmap} className="w-full px-4 py-2 rounded-md text-[13px] font-semibold bg-gradient-to-r from-sky-600 to-emerald-600 text-white hover:from-sky-700 hover:to-emerald-700 shadow-sm">Generate Roadmap</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
