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
  Sparkles,
  Bell,
  Calendar,
  Trophy,
  Share2,
  Smartphone,
  User,
  Lock,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Clean, minimal exam + class constants
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

  // Personalization state (persisted)
  const [classLevel, setClassLevel] = useState("12");
  const [preferredExams, setPreferredExams] = useState(["jee-main", "jee-adv"]);

  // Flow state
  const [selectedExam, setSelectedExam] = useState(null);
  const [mode, setMode] = useState("pyq"); // "pyq" | "mock"

  // UI state
  const [showExamPicker, setShowExamPicker] = useState(false);
  const [nextActionMode, setNextActionMode] = useState(null);
  const [copied, setCopied] = useState(false);

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

  // Initialize mode and exam from URL
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

  // Listen for navigation / manual edits
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

  // Sidebar items (minimal)
  const sidebarItems = [
    { id: "home", label: "Dashboard", icon: Home, action: () => {} },
    { id: "pyqs", label: "PYQs", icon: Library, action: () => setMode("pyq") },
    { id: "mocks", label: "Mock Tests", icon: FileText, action: () => setMode("mock") },
    { id: "mentor", label: "Mentor Connect", icon: User, action: () => window.open("https://airtable.com", "_blank") },
    { id: "predictor", label: "College Predictor", icon: BarChart3, locked: true },
    { id: "counsel", label: "College Counseling", icon: GraduationCap, locked: true },
    { id: "settings", label: "Settings", icon: Settings, action: () => {} },
    { id: "logout", label: "Logout", icon: LogOut, action: () => onLogout?.() },
  ];

  // Actions
  function startPractice() {
    if (!selectedExam) {
      setNextActionMode("pyq");
      setShowExamPicker(true);
      return;
    }
    navigate(`/practice?exam=${encodeURIComponent(selectedExam)}`);
  }

  function startMockConfig() {
    if (!selectedExam) {
      setNextActionMode("mock");
      setShowExamPicker(true);
      return;
    }
    navigate(`/mock/config?exam=${encodeURIComponent(selectedExam)}`);
  }

  function onExamPickAndProceed(examId) {
    setSelectedExam(examId);
    setShowExamPicker(false);
    if (nextActionMode === "pyq") navigate(`/practice?exam=${encodeURIComponent(examId)}`);
    if (nextActionMode === "mock") navigate(`/mock/config?exam=${encodeURIComponent(examId)}`);
    setNextActionMode(null);
  }

  function openMentorForm() {
    window.open("https://airtable.com", "_blank");
  }

  function openASCA() {
    window.open("https://asca.examsaathi.com", "_blank");
  }
  function openSEAT() {
    window.open("https://seat.examsaathi.com", "_blank");
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

  // Subject tiles under PYQs
  const subjectTiles = [
    { id: "all", label: "All Subjects (PCM)", icon: BookOpen },
    { id: "phy", label: "Physics", icon: LineChart },
    { id: "chem", label: "Chemistry", icon: Library },
    { id: "math", label: "Maths", icon: FileText },
  ];

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background: soft gradient + grid to match landing */}
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

      {/* Top bar - clean with subtle glow */}
      <div className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/85 backdrop-blur supports-[backdrop-filter]:bg-white/70">
        <div className="relative">
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-sky-300/50 to-transparent" />
        </div>
        <div className="w-full h-14 flex items-center justify-between">
          <div className="flex items-center gap-3 w-full">
            <div className="relative h-8 w-8 rounded-md bg-white ring-1 ring-slate-200 grid place-items-center shadow-sm">
              <Layers className="h-4 w-4 text-sky-700" />
              <span className="pointer-events-none absolute -inset-1 rounded-md bg-sky-400/10 blur-md" />
            </div>
            <div className="text-[15px] font-semibold text-slate-900">ExamSaathi</div>
            {/* Exam dropdown in navbar */}
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

      <div className="w-full py-6 lg:py-8 grid grid-cols-1 lg:grid-cols-[220px_minmax(0,1fr)_300px] gap-4 lg:gap-6">
        {/* Left Sidebar (minimal) */}
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

        {/* Main Content */}
        <main className="space-y-6 lg:space-y-8">
          {/* A) Header Welcome Block */}
          <div className="relative rounded-2xl bg-white ring-1 ring-slate-200 p-5 sm:p-6 shadow-sm overflow-hidden">
            <div className="absolute -right-10 -top-10 h-36 w-36 bg-sky-300/10 rounded-full blur-2xl" />
            <div className="absolute -left-10 -bottom-10 h-36 w-36 bg-emerald-300/10 rounded-full blur-2xl" />
            <div className="flex items-center justify-between relative z-10">
              <div>
                <div className="text-[14px] sm:text-[15px] font-semibold text-slate-900">Welcome back, {user?.name || "Student"}</div>
                <div className="mt-0.5 text-[12px] text-slate-500">Personalized for {CLASS_LEVELS.find((c) => c.id === classLevel)?.label}</div>
              </div>
              <div className="hidden sm:flex items-center gap-2 text-[12px] text-slate-600">
                <Sparkles className="h-4 w-4 text-emerald-600" />
                <span>Deep-linked to {examLabel || "your exam"}</span>
              </div>
            </div>
          </div>

          {/* B) PYQs Section */}
          <section className="relative rounded-2xl bg-white ring-1 ring-slate-200 p-5 sm:p-6 shadow-sm overflow-hidden">
            <div className="absolute inset-0 pointer-events-none" style={{ maskImage: "radial-gradient(400px_120px_at_20%_-10%, black, transparent)" }}>
              <div className="absolute left-0 top-0 h-40 w-64 bg-gradient-to-br from-sky-200/40 to-emerald-200/30 blur-2xl" />
            </div>
            <div className="flex items-center justify-between relative z-10">
              <h2 className="text-[15px] font-semibold text-slate-900">Start Solving PYQs</h2>
              <button onClick={startPractice} className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-gradient-to-r from-sky-600 to-emerald-600 text-white text-[12px] font-medium hover:from-sky-700 hover:to-emerald-700 shadow-sm">
                Start Practicing <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            {/* Horizontal exam tabs */}
            <div className="mt-4 overflow-x-auto -mx-2 px-2">
              <div className="flex gap-2 min-w-max">
                {EXAMS.map((ex) => {
                  const active = selectedExam === ex.id;
                  return (
                    <button
                      key={ex.id}
                      onClick={() => setSelectedExam(ex.id)}
                      className={`px-3 py-1.5 rounded-full text-[12px] ring-1 transition ${
                        active
                          ? "bg-slate-900 text-white ring-slate-900"
                          : "bg-white text-slate-700 ring-slate-200 hover:bg-sky-50"
                      }`}
                    >
                      {ex.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Subject tiles */}
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
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
            <button onClick={startPractice} className="mt-4 sm:hidden inline-flex items-center justify-center w-full gap-2 px-4 py-2 rounded-md bg-gradient-to-r from-sky-600 to-emerald-600 text-white text-[13px] font-semibold shadow-sm">
              Start Practicing
              <ChevronRight className="h-4 w-4" />
            </button>
          </section>

          {/* C) Mock Tests Section */}
          <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="relative rounded-2xl bg-white ring-1 ring-slate-200 p-5 sm:p-6 shadow-sm overflow-hidden">
              <div className="absolute -right-8 -top-8 h-24 w-24 bg-sky-300/10 rounded-full blur-xl" />
              <div className="flex items-start gap-3 relative z-10">
                <div className="h-10 w-10 rounded-lg bg-sky-50 ring-1 ring-slate-200 grid place-items-center">
                  <FileText className="h-5 w-5 text-sky-700" />
                </div>
                <div className="flex-1">
                  <div className="text-[15px] font-semibold text-slate-900">Full-Length Mock Tests</div>
                  <div className="mt-1 text-[12px] text-slate-600">Auto-graded, exam-pattern based tests</div>
                  <button onClick={startMockConfig} className="mt-3 px-3 py-1.5 rounded-md text-[12px] font-semibold bg-gradient-to-r from-sky-600 to-emerald-600 text-white hover:from-sky-700 hover:to-emerald-700 shadow-sm">Start Test</button>
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
                  <div className="text-[15px] font-semibold text-slate-900">Chapter-wise Practice Tests</div>
                  <div className="mt-1 text-[12px] text-slate-600">Create focused tests by chapter</div>
                  <button onClick={startMockConfig} className="mt-3 px-3 py-1.5 rounded-md text-[12px] font-semibold bg-gradient-to-r from-sky-600 to-emerald-600 text-white hover:from-sky-700 hover:to-emerald-700 shadow-sm">Start Test</button>
                </div>
              </div>
            </div>
          </section>

          {/* D) Mentor Connect Section */}
          <section className="relative rounded-2xl bg-white ring-1 ring-slate-200 p-5 sm:p-6 shadow-sm overflow-hidden">
            <div className="absolute inset-0 pointer-events-none" style={{ maskImage: "radial-gradient(380px_120px_at_90%_120%, black, transparent)" }}>
              <div className="absolute right-0 bottom-0 h-40 w-64 bg-gradient-to-br from-emerald-200/30 to-sky-200/30 blur-2xl" />
            </div>
            <div className="flex items-center justify-between relative z-10">
              <h3 className="text-[15px] font-semibold text-slate-900">Talk to a mentor 1-on-1</h3>
              <button
                onClick={openMentorForm}
                className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-gradient-to-r from-sky-600 to-emerald-600 text-white text-[12px] font-medium hover:from-sky-700 hover:to-emerald-700 shadow-sm"
              >
                Book a Mentor Session <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 -mx-2 overflow-x-auto">
              <div className="px-2 flex gap-3 min-w-max">
                {[1,2,3,4,5].map((idx) => (
                  <div key={idx} className="w-[220px] shrink-0 relative rounded-2xl ring-1 ring-slate-200 bg-white shadow-sm p-4 overflow-hidden">
                    <div className="pointer-events-none absolute -inset-8 bg-gradient-to-br from-sky-200/20 via-emerald-200/20 to-transparent blur-2xl" />
                    <div className="relative z-10 flex items-center gap-3">
                      <img
                        src={`https://i.pravatar.cc/120?img=${5+idx}`}
                        alt="mentor"
                        className="h-12 w-12 rounded-full object-cover"
                        loading="lazy"
                      />
                      <div>
                        <div className="text-[14px] font-semibold text-slate-900">Ananya Sharma</div>
                        <div className="text-[11px] text-slate-500">AIR 142 · IIT Bombay</div>
                      </div>
                    </div>
                    <button onClick={openMentorForm} className="relative z-10 mt-3 w-full px-3 py-1.5 rounded-md text-[12px] font-semibold bg-gradient-to-r from-sky-600 to-emerald-600 text-white hover:from-sky-700 hover:to-emerald-700 shadow-sm">Book Session</button>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={openMentorForm}
              className="mt-4 sm:hidden inline-flex items-center justify-center w-full gap-2 px-4 py-2 rounded-md bg-gradient-to-r from-sky-600 to-emerald-600 text-white text-[13px] font-semibold shadow-sm"
            >
              Book a Mentor Session <ChevronRight className="h-4 w-4" />
            </button>
          </section>
        </main>

        {/* Right Panel (compact & clean) */}
        <aside className="hidden lg:block">
          <div className="space-y-4">
            {/* Upcoming Mock */}
            <div className="relative rounded-2xl bg-white ring-1 ring-slate-200 p-4 shadow-sm overflow-hidden">
              <div className="absolute -right-6 -top-6 h-16 w-16 bg-sky-300/10 rounded-full blur-xl" />
              <div className="flex items-start gap-3 relative z-10">
                <div className="h-8 w-8 rounded-md bg-sky-50 ring-1 ring-slate-200 grid place-items-center">
                  <Calendar className="h-4 w-4 text-sky-700" />
                </div>
                <div className="flex-1">
                  <div className="text-[12px] text-slate-500">Upcoming Mock Test</div>
                  <div className="text-[14px] font-semibold text-slate-900">JEE Main Mock 03</div>
                  <button onClick={startMockConfig} className="mt-3 px-3 py-1.5 rounded-md text-[12px] font-medium bg-gradient-to-r from-sky-600 to-emerald-600 text-white hover:from-sky-700 hover:to-emerald-700 shadow-sm">Start Now</button>
                </div>
              </div>
            </div>

            {/* Performance Snapshot */}
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

            {/* ASCA Promo */}
            <div className="relative rounded-2xl bg-white ring-1 ring-slate-200 p-4 shadow-sm overflow-hidden">
              <div className="absolute -right-8 -top-8 h-20 w-20 bg-sky-300/10 rounded-full blur-xl" />
              <div className="text-[13px] font-semibold text-slate-900 relative z-10">ASCA · CS & AI Potential</div>
              <div className="mt-1 text-[12px] text-slate-600 relative z-10">Curious about CS & AI? Know where you stand.</div>
              <button onClick={openSEAT} className="relative z-10 mt-3 px-3 py-1.5 rounded-md text-[12px] font-semibold bg-gradient-to-r from-sky-600 to-emerald-600 text-white hover:from-sky-700 hover:to-emerald-700 shadow-sm">Take SEAT Exam</button>
            </div>

            {/* Continue card */}
            <div className="relative rounded-2xl bg-white ring-1 ring-slate-200 p-4 shadow-sm overflow-hidden">
              <div className="absolute -left-8 -bottom-8 h-20 w-20 bg-emerald-300/10 rounded-full blur-xl" />
              <div className="flex items-start gap-3 relative z-10">
                <div className="h-8 w-8 rounded-md bg-sky-50 ring-1 ring-slate-200 grid place-items-center">
                  <PlayCircle className="h-4 w-4 text-sky-700" />
                </div>
                <div className="flex-1">
                  <div className="text-[12px] text-slate-500">Continue where you left</div>
                  <div className="text-[14px] font-semibold text-slate-900">Limits & Continuity – PYQs</div>
                  <div className="mt-2 flex items-center gap-2">
                    <button onClick={() => navigate(`/practice?exam=${encodeURIComponent(selectedExam || 'jee-main')}&chapter=${encodeURIComponent('Limits & Continuity')}`)} className="px-3 py-1.5 rounded-md text-[12px] font-medium bg-gradient-to-r from-sky-600 to-emerald-600 text-white hover:from-sky-700 hover:to-emerald-700 shadow-sm">Resume</button>
                    <button onClick={startPractice} className="px-3 py-1.5 rounded-md text-[12px] font-medium bg-slate-100 ring-1 ring-slate-200 hover:bg-slate-50">Change</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Daily goal */}
            <div className="relative rounded-2xl bg-white ring-1 ring-slate-200 p-4 shadow-sm overflow-hidden">
              <div className="absolute -right-8 -top-8 h-20 w-20 bg-sky-300/10 rounded-full blur-xl" />
              <div className="flex items-center justify-between relative z-10">
                <div className="text-[13px] font-semibold text-slate-900">Daily goal</div>
                <Trophy className="h-4 w-4 text-slate-600" />
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

      {/* Sticky bottom nav (mobile) */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-white/90 backdrop-blur border-t border-slate-200">
        <div className="mx-auto max-w-7xl grid grid-cols-5">
          <button onClick={() => {}} className="py-2.5 text-[11px] flex flex-col items-center text-slate-700">
            <Home className="h-5 w-5" />
            <span>Home</span>
          </button>
          <button onClick={() => setMode('pyq')} className="py-2.5 text-[11px] flex flex-col items-center text-slate-700">
            <BookOpen className="h-5 w-5" />
            <span>PYQs</span>
          </button>
          <button onClick={() => setMode('mock')} className="py-2.5 text-[11px] flex flex-col items-center text-slate-700">
            <FileText className="h-5 w-5" />
            <span>Tests</span>
          </button>
          <button onClick={openMentorForm} className="py-2.5 text-[11px] flex flex-col items-center text-slate-700">
            <User className="h-5 w-5" />
            <span>Mentor</span>
          </button>
          <button onClick={() => {}} className="py-2.5 text-[11px] flex flex-col items-center text-slate-700">
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
                  <button key={ex.id} onClick={() => onExamPickAndProceed(ex.id)} className="rounded-xl bg-white ring-1 ring-slate-200 hover:bg-sky-50/70 px-3 py-3 text-left">
                    <div className="text-[13px] font-semibold text-slate-900">{ex.label}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{nextActionMode === 'pyq' ? 'PYQ practice' : 'Mock config'}</div>
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
