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
  Calendar,
  Trophy,
  Share2,
  Smartphone,
  User,
  Lock,
  X,
  Flame,
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

  // New modal state for year/scope selection
  const [flowModalOpen, setFlowModalOpen] = useState(false);
  const [flowType, setFlowType] = useState(/** @type {"mock"|"pyq"|null} */(null));
  const [flowStep, setFlowStep] = useState(1); // 1: years, 2: scope
  const [years, setYears] = useState(/** @type {1|3|5|10|null} */(null));
  const [scope, setScope] = useState(/** @type {"full"|"math"|"physics"|"chemistry"|null} */(null));

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

  function goToSelection(selScope) {
    if (!selectedExam || !flowType || !years) return;
    const q = new URLSearchParams({ exam: selectedExam, years: String(years), scope: selScope }).toString();
    if (flowType === "mock") {
      navigate(`/mock/config?${q}`);
    } else {
      navigate(`/practice?${q}`);
    }
    closeFlow();
  }

  function closeFlow() {
    setFlowModalOpen(false);
    setFlowType(null);
    setFlowStep(1);
    setYears(null);
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

  const subjectTiles = [
    { id: "all", label: "All Subjects (PCM)", icon: BookOpen },
    { id: "phy", label: "Physics", icon: LineChart },
    { id: "chem", label: "Chemistry", icon: Library },
    { id: "math", label: "Maths", icon: FileText },
  ];

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
            <div className="text-[15px] font-semibold text-slate-900">ExamSaathi</div>
            <div className="ml-3">
              <select
                value={selectedExam || ""}
                onChange={(e) => setSelectedExam(e.target.value)}
                className="text-[12px] rounded-md ring-1 ring-slate-200 bg-white px-2.5 py-1.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-300"
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
            <div className="hidden sm:flex items-center gap-2 text-[12px] text-slate-600">
              <Info className="h-4 w-4 text-slate-500" />
              <span>Personalized for {CLASS_LEVELS.find((c) => c.id === classLevel)?.label}</span>
            </div>
            <button
              onClick={onLogout}
              className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-[12px] font-medium text-white bg-gradient-to-r from-sky-600 to-emerald-600 hover:from-sky-700 hover:to-emerald-700 shadow-sm"
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
                      className={`relative group w-full flex items-center justify-between gap-2 rounded-xl px-3 py-2 text-[13px] transition hover:bg-sky-50/60 ${
                        locked ? "text-slate-400 cursor-not-allowed" : "text-slate-700"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <Icon className={`h-4 w-4 ${locked ? "text-slate-300" : "text-sky-600"}`} />
                        <span>{label}</span>
                      </span>
                      {!locked && (
                        <span className="opacity-0 group-hover:opacity-100 transition text-sky-700">
                          <ChevronRight className="h-4 w-4" />
                        </span>
                      )}
                      {locked ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500">
                          <Lock className="h-3.5 w-3.5" />
                        </span>
                      ) : null}
                    </button>
                  ))}
                </nav>
              </aside>

              {/* Center column */}
              <main className="space-y-6 lg:space-y-8">
                {/* Top selection card (no mock/PYQ buttons) */}
                <motion.div variants={fadeUp} initial="hidden" animate="show" className="relative rounded-2xl bg-white ring-1 ring-slate-200 p-5 sm:p-6 shadow-sm overflow-hidden">
                  <div className="absolute -right-10 -top-10 h-36 w-36 bg-sky-300/10 rounded-full blur-2xl" />
                  <div className="absolute -left-10 -bottom-10 h-36 w-36 bg-emerald-300/10 rounded-full blur-2xl" />
                  <div className="relative z-10 grid grid-cols-1 gap-4">
                    <div>
                      <div className="text-[14px] sm:text-[15px] font-semibold text-slate-900">Welcome back, {"Demo Student"}</div>
                      <div className="mt-2 flex flex-col sm:flex-row sm:items-center gap-2">
                        <label className="text-[12px] text-slate-600">Select exam</label>
                        <select
                          value={selectedExam || ""}
                          onChange={(e) => setSelectedExam(e.target.value)}
                          className="text-[13px] rounded-md ring-1 ring-slate-200 bg-white px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-300 w-full sm:w-56"
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

                {/* KPI row (kept compact) */}
                <motion.div variants={fadeUp} initial="hidden" animate="show" className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
                  {[
                    { title: 'Accuracy', value: '82%', sub: '+4% this week', icon: Target, tint: 'from-sky-200/30' },
                    { title: 'Avg Score', value: '178', sub: 'out of 300', icon: Award, tint: 'from-emerald-200/30' },
                    { title: 'Questions', value: '462', sub: 'this month', icon: BookOpen, tint: 'from-sky-200/30' },
                    { title: 'Streak', value: '12 days', sub: 'keep going', icon: Flame, tint: 'from-amber-200/30' },
                  ].map(({ title, value, sub, icon: Icon, tint }, idx) => (
                    <div key={idx} className="relative rounded-2xl bg-white ring-1 ring-slate-200 p-4 shadow-sm overflow-hidden">
                      <div className={`absolute -right-8 -top-8 h-24 w-24 bg-gradient-to-br ${tint} to-transparent blur-2xl`} />
                      <div className="relative z-10 flex items-start gap-3">
                        <div className="h-10 w-10 rounded-lg bg-white ring-1 ring-slate-200 grid place-items-center">
                          <Icon className="h-5 w-5 text-slate-800" />
                        </div>
                        <div className="flex-1">
                          <div className="text-[12px] text-slate-500">{title}</div>
                          <div className="text-[20px] font-semibold text-slate-900">{value}</div>
                          <div className="text-[11px] text-slate-500">{sub}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>

                {/* Practice section with subjects (remove exam tabs) */}
                <motion.div variants={fadeUp} initial="hidden" animate="show" className="relative rounded-2xl bg-white ring-1 ring-slate-200 p-5 sm:p-6 shadow-sm overflow-hidden">
                  <div className="absolute inset-0 pointer-events-none" style={{ maskImage: "radial-gradient(400px_120px_at_20%_-10%, black, transparent)" }}>
                    <div className="absolute left-0 top-0 h-40 w-64 bg-gradient-to-br from-sky-200/40 to-emerald-200/30 blur-2xl" />
                  </div>
                  <div className="flex items-center justify-between relative z-10">
                    <h2 className="text-[15px] font-semibold text-slate-900">Start Solving PYQs</h2>
                    <button onClick={() => openFlow('pyq')} className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-gradient-to-r from-sky-600 to-emerald-600 text-white text-[12px] font-medium hover:from-sky-700 hover:to-emerald-700 shadow-sm">
                      Start Practicing <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Subject tiles */}
                  <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                    {subjectTiles.map(({ id, label, icon: Icon }) => (
                      <div key={id} className="group relative rounded-2xl bg-white ring-1 ring-slate-200 shadow-sm p-4 hover:shadow transition cursor-pointer overflow-hidden">
                        <div className="pointer-events-none absolute -inset-6 bg-gradient-to-br from-sky-200/20 via-emerald-200/20 to-transparent opacity-0 group-hover:opacity-100 blur-2xl transition" />
                        <div className="relative z-10 flex items-center gap-3">
                          <div className="h-9 w-9 rounded-lg bg-sky-50 ring-1 ring-slate-200 grid place-items-center">
                            <Icon className="h-5 w-5 text-sky-700" />
                          </div>
                          <div className="text-[14px] font-medium text-slate-900">{label}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Mobile CTA */}
                  <button onClick={() => openFlow('pyq')} className="mt-4 sm:hidden inline-flex items-center justify-center w-full gap-2 px-4 py-2 rounded-md bg-gradient-to-r from-sky-600 to-emerald-600 text-white text-[13px] font-semibold shadow-sm">
                    Start Practicing
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </motion.div>

                {/* Mock tests CTA */}
                <motion.div variants={fadeUp} initial="hidden" animate="show" className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative rounded-2xl bg-white ring-1 ring-slate-200 p-5 sm:p-6 shadow-sm overflow-hidden">
                    <div className="absolute -right-8 -top-8 h-24 w-24 bg-sky-300/10 rounded-full blur-xl" />
                    <div className="flex items-start gap-3 relative z-10">
                      <div className="h-10 w-10 rounded-lg bg-sky-50 ring-1 ring-slate-200 grid place-items-center">
                        <FileText className="h-5 w-5 text-sky-700" />
                      </div>
                      <div className="flex-1">
                        <div className="text-[15px] font-semibold text-slate-900">Full-Length Mock Tests</div>
                        <div className="mt-1 text-[12px] text-slate-600">Auto-graded, exam-pattern based tests</div>
                        <button onClick={() => openFlow('mock')} className="mt-3 px-3 py-1.5 rounded-md text-[12px] font-semibold bg-gradient-to-r from-sky-600 to-emerald-600 text-white hover:from-sky-700 hover:to-emerald-700 shadow-sm">Start Test</button>
                      </div>
                    </div>
                  </div>
                  <div className="relative rounded-2xl bg-white ring-1 ring-slate-200 p-5 sm:p-6 shadow-sm overflow-hidden">
                    <div className="absolute -left-8 -bottom-8 h-24 w-24 bg-emerald-300/10 rounded-full blur-xl" />
                    <div className="flex items-start gap-3 relative z-10">
                      <div className="h-10 w-10 rounded-lg bg-emerald-50 ring-1 ring-slate-200 grid place-items-center">
                        <PlayCircle className="h-5 w-5 text-emerald-700" />
                      </div>
                      <div className="flex-1">
                        <div className="text-[15px] font-semibold text-slate-900">Chapter-wise Practice</div>
                        <div className="mt-1 text-[12px] text-slate-600">Create focused tests by chapter</div>
                        <button onClick={() => openFlow('mock')} className="mt-3 px-3 py-1.5 rounded-md text-[12px] font-semibold bg-gradient-to-r from-sky-600 to-emerald-600 text-white hover:from-sky-700 hover:to-emerald-700 shadow-sm">Start Test</button>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Mentor carousel */}
                <motion.div variants={fadeUp} initial="hidden" animate="show" className="relative rounded-2xl bg-white ring-1 ring-slate-200 p-5 sm:p-6 shadow-sm overflow-hidden">
                  <div className="absolute inset-0 pointer-events-none" style={{ maskImage: "radial-gradient(380px_120px_at_90%_120%, black, transparent)" }}>
                    <div className="absolute right-0 bottom-0 h-40 w-64 bg-gradient-to-br from-emerald-200/30 to-sky-200/30 blur-2xl" />
                  </div>
                  <div className="flex items-center justify-between relative z-10">
                    <h3 className="text-[15px] font-semibold text-slate-900">Talk to a mentor 1-on-1</h3>
                    <button onClick={() => window.open('https://airtable.com','_blank')} className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-gradient-to-r from-sky-600 to-emerald-600 text-white text-[12px] font-medium hover:from-sky-700 hover:to-emerald-700 shadow-sm">
                      Book a Mentor Session <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-4 -mx-2 overflow-x-auto">
                    <div className="px-2 flex gap-3 min-w-max">
                      {[1,2,3,4,5].map((idx) => (
                        <div key={idx} className="w-[220px] shrink-0 relative rounded-2xl ring-1 ring-slate-200 bg-white shadow-sm p-4 overflow-hidden">
                          <div className="pointer-events-none absolute -inset-8 bg-gradient-to-br from-sky-200/20 via-emerald-200/20 to-transparent blur-2xl" />
                          <div className="relative z-10 flex items-center gap-3">
                            <img src={`https://i.pravatar.cc/120?img=${5+idx}`} alt="mentor" className="h-12 w-12 rounded-full object-cover" loading="lazy" />
                            <div>
                              <div className="text-[14px] font-semibold text-slate-900">Ananya Sharma</div>
                              <div className="text-[11px] text-slate-500">AIR 142 · IIT Bombay</div>
                            </div>
                          </div>
                          <button onClick={() => window.open('https://airtable.com','_blank')} className="relative z-10 mt-3 w-full px-3 py-1.5 rounded-md text-[12px] font-semibold bg-gradient-to-r from-sky-600 to-emerald-600 text-white hover:from-sky-700 hover:to-emerald-700 shadow-sm">Book Session</button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <button onClick={() => window.open('https://airtable.com','_blank')} className="mt-4 sm:hidden inline-flex items-center justify-center w-full gap-2 px-4 py-2 rounded-md bg-gradient-to-r from-sky-600 to-emerald-600 text-white text-[13px] font-semibold shadow-sm">
                    Book a Mentor Session <ChevronRight className="h-4 w-4" />
                  </button>
                </motion.div>
              </main>

              {/* Right rail */}
              <aside className="hidden lg:block">
                <div className="space-y-4">
                  {/* Timeline */}
                  <div className="relative rounded-2xl bg-white ring-1 ring-slate-200 p-4 shadow-sm overflow-hidden">
                    <div className="absolute -right-6 -top-6 h-16 w-16 bg-sky-300/10 rounded-full blur-xl" />
                    <div className="text-[13px] font-semibold text-slate-900 relative z-10 flex items-center gap-2"><Calendar className="h-4 w-4 text-sky-700"/> Upcoming</div>
                    <div className="mt-2 space-y-3 relative z-10">
                      {[
                        { t: 'Mock 03 – JEE Main', d: 'Sun 9:00 AM', cta: 'Start Now' },
                        { t: 'Chemistry Rev Session', d: 'Mon 6:00 PM', cta: 'Join' },
                        { t: 'Streak Check-in', d: 'Daily 8:00 PM', cta: 'Open' },
                      ].map((e, i) => (
                        <div key={i} className="rounded-xl ring-1 ring-slate-200 bg-white p-3">
                          <div className="text-[13px] font-medium text-slate-900">{e.t}</div>
                          <div className="text-[11px] text-slate-500">{e.d}</div>
                          <button onClick={i===0? () => openFlow('mock') : () => {}} className="mt-2 px-3 py-1.5 rounded-md text-[12px] font-medium bg-gradient-to-r from-sky-600 to-emerald-600 text-white">{e.cta}</button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Progress snapshot */}
                  <div className="relative rounded-2xl bg-white ring-1 ring-slate-200 p-4 shadow-sm overflow-hidden">
                    <div className="absolute -left-6 -bottom-6 h-16 w-16 bg-emerald-300/10 rounded-full blur-xl" />
                    <div className="flex items-center justify-between relative z-10">
                      <div className="text-[13px] font-semibold text-slate-900">Performance snapshot</div>
                      <LineChart className="h-4 w-4 text-slate-600" />
                    </div>
                    <div className="mt-2 grid grid-cols-2 gap-3 relative z-10">
                      <div>
                        <div className="text-[11px] text-slate-500">Chapters completed</div>
                        <div className="text-[18px] font-bold text-slate-900">28</div>
                      </div>
                      <div>
                        <div className="text-[11px] text-slate-500">Tests attempted</div>
                        <div className="text-[18px] font-bold text-slate-900">14</div>
                      </div>
                    </div>
                    <div className="mt-3 h-12 w-full rounded-lg ring-1 ring-slate-200 bg-slate-50 p-2 relative z-10">
                      <svg viewBox="0 0 100 24" className="h-full w-full">
                        <polyline fill="none" stroke="#0ea5e9" strokeWidth="2" points="0,18 10,16 20,15 30,12 40,14 50,10 60,11 70,9 80,8 90,6 100,5" />
                      </svg>
                    </div>
                  </div>

                  {/* Daily goal */}
                  <div className="relative rounded-2xl bg-white ring-1 ring-slate-200 p-4 shadow-sm overflow-hidden">
                    <div className="absolute -right-8 -top-8 h-20 w-20 bg-sky-300/10 rounded-full blur-xl" />
                    <div className="flex items-center justify-between relative z-10">
                      <div className="text-[13px] font-semibold text-slate-900">Daily goal</div>
                      <Star className="h-4 w-4 text-slate-600" />
                    </div>
                    <div className="mt-2 text-[12px] text-slate-600 relative z-10">Complete 40 practice questions</div>
                    <div className="mt-2 h-2 w-full bg-slate-100 rounded-full overflow-hidden relative z-10">
                      <div className="h-full bg-gradient-to-r from-sky-600 to-emerald-600 rounded-full" style={{ width: "60%" }} />
                    </div>
                    <div className="mt-1 text-[11px] text-slate-500 relative z-10">24/40 done – keep going!</div>
                  </div>

                  {/* Invite & App */}
                  <div className="relative rounded-2xl bg-white ring-1 ring-slate-200 p-4 shadow-sm overflow-hidden">
                    <div className="absolute -left-8 -bottom-8 h-20 w-20 bg-emerald-300/10 rounded-full blur-xl" />
                    <div className="flex items-center gap-2 text-[13px] font-semibold text-slate-900 relative z-10">
                      <Share2 className="h-4 w-4 text-sky-700" /> Invite friends
                    </div>
                    <div className="mt-1 text-[12px] text-slate-600 relative z-10">Get 7 days Pro for every friend who joins.</div>
                    <button onClick={copyInvite} className="relative z-10 mt-2 px-3 py-1.5 rounded-md text-[12px] font-medium bg-gradient-to-r from-sky-600 to-emerald-600 text-white hover:from-sky-700 hover:to-emerald-700 shadow-sm">{copied ? 'Copied!' : 'Copy link'}</button>
                  </div>
                  <div className="relative rounded-2xl bg-white ring-1 ring-slate-200 p-4 shadow-sm overflow-hidden">
                    <div className="absolute -right-8 -top-8 h-20 w-20 bg-sky-300/10 rounded-full blur-xl" />
                    <div className="flex items-center gap-2 text-[13px] font-semibold text-slate-900 relative z-10">
                      <Smartphone className="h-4 w-4 text-emerald-700" /> Get the app
                    </div>
                    <div className="mt-1 text-[12px] text-slate-600 relative z-10">Install ExamSaathi on your phone for offline practice.</div>
                    <div className="mt-3 flex items-center gap-2 relative z-10">
                      <button className="px-3 py-1.5 rounded-md text-[12px] font-medium bg-slate-900 text-white">App Store</button>
                      <button className="px-3 py-1.5 rounded-md text-[12px] font-medium bg-slate-800 text-white">Play Store</button>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mobile bottom nav */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-white/90 backdrop-blur border-t border-slate-200">
        <div className="grid grid-cols-5">
          <button onClick={() => {}} className="py-2.5 text-[11px] flex flex-col items-center text-slate-700">
            <Home className="h-5 w-5" />
            <span>Home</span>
          </button>
          <button onClick={() => openFlow('pyq')} className="py-2.5 text-[11px] flex flex-col items-center text-slate-700">
            <BookOpen className="h-5 w-5" />
            <span>PYQs</span>
          </button>
          <button onClick={() => openFlow('mock')} className="py-2.5 text-[11px] flex flex-col items-center text-slate-700">
            <FileText className="h-5 w-5" />
            <span>Tests</span>
          </button>
          <button onClick={() => window.open('https://airtable.com','_blank')} className="py-2.5 text-[11px] flex flex-col items-center text-slate-700">
            <User className="h-5 w-5" />
            <span>Mentor</span>
          </button>
          <button onClick={() => {}} className="py-2.5 text-[11px] flex flex-col items-center text-slate-700">
            <Settings className="h-5 w-5" />
            <span>Profile</span>
          </button>
        </div>
      </div>

      {/* Exam Picker Modal (if exam not selected) */}
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
                    <div className="text-[13px] font-semibold text-slate-900">{ex.label}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Select to proceed</div>
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Flow Modal: step 1 (years) -> step 2 (scope) */}
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

              {/* Step content */}
              {flowStep === 1 && (
                <div className="p-4">
                  <div className="text-[13px] text-slate-700 font-medium">Select year range</div>
                  <div className="mt-3 grid grid-cols-4 gap-2">
                    {[1,3,5,10].map((y) => (
                      <button key={y} onClick={() => { setYears(y); setFlowStep(2); }} className={`px-3 py-2 rounded-lg text-[13px] ring-1 transition ${years===y? 'bg-slate-900 text-white ring-slate-900':'bg-white text-slate-800 ring-slate-200 hover:bg-sky-50'}`}>
                        {y} yr{y>1?'s':''}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {flowStep === 2 && (
                <div className="p-4">
                  <div className="text-[13px] text-slate-700 font-medium">Choose scope</div>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {[{id:'full',label:'Full Paper'},{id:'math',label:'Maths'},{id:'physics',label:'Physics'},{id:'chemistry',label:'Chemistry'}].map((opt) => (
                      <button key={opt.id} onClick={() => goToSelection(opt.id)} className="px-3 py-2 rounded-lg text-[13px] ring-1 bg-white text-slate-800 ring-slate-200 hover:bg-sky-50">
                        {opt.label}
                      </button>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center justify-between text-[12px] text-slate-600">
                    <button onClick={() => setFlowStep(1)} className="underline decoration-slate-300 hover:text-slate-900">Back</button>
                    <div className="text-slate-500">{years} yr{years && years>1?'s':''} selected</div>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
