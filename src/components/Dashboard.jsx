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
} from "lucide-react";

const EXAMS = [
  { id: "jee-main", label: "JEE Main" },
  { id: "jee-adv", label: "JEE Advanced" },
  { id: "bitsat", label: "BITSAT" },
  { id: "eamcet", label: "EAMCET" },
  { id: "viteee", label: "VITEEE" },
  { id: "mht-cet", label: "MHT CET" },
  { id: "cbse", label: "Boards (CBSE)" },
  { id: "isc", label: "Boards (ISC)" },
  { id: "icse", label: "Boards (ICSE)" },
];

const CLASS_LEVELS = [
  { id: "11", label: "Class 11" },
  { id: "12", label: "Class 12" },
  { id: "dropper", label: "Dropper" },
];

export default function Dashboard({ user, onLogout }) {
  // Personalization state (persisted)
  const [classLevel, setClassLevel] = useState("12");
  const [preferredExams, setPreferredExams] = useState(["jee-main", "jee-adv"]);

  // Flow state
  const [selectedExam, setSelectedExam] = useState(null);
  const [mode, setMode] = useState(null); // "pyq" | "mock"

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

  // Persist prefs
  useEffect(() => {
    try {
      localStorage.setItem(
        "examsaathi:prefs",
        JSON.stringify({ classLevel, preferredExams })
      );
    } catch {}
  }, [classLevel, preferredExams]);

  // Handle hash -> selected exam
  useEffect(() => {
    const hashExam = decodeURIComponent(window.location.hash.replace("#", ""));
    if (hashExam && EXAMS.some((e) => e.id === hashExam)) {
      setSelectedExam(hashExam);
    }
  }, []);

  useEffect(() => {
    if (selectedExam) window.location.hash = selectedExam;
  }, [selectedExam]);

  const examLabel = useMemo(
    () => EXAMS.find((e) => e.id === selectedExam)?.label || "",
    [selectedExam]
  );

  const sidebarItems = [
    { id: "home", label: "Dashboard", icon: Home, action: () => { setSelectedExam(null); setMode(null); } },
    { id: "pyqs", label: "PYQs", icon: Library, action: () => setMode("pyq") },
    { id: "mocks", label: "Mock Tests", icon: FileText, action: () => setMode("mock") },
    { id: "mentor", label: "Mentor Connect", icon: User, action: () => window.open("https://airtable.com", "_blank") },
    { id: "predictor", label: "College Predictor", icon: BarChart3, locked: true },
    { id: "counsel", label: "College Counseling", icon: GraduationCap, locked: true },
    { id: "settings", label: "Settings", icon: Settings, action: () => {} },
    { id: "logout", label: "Logout", icon: LogOut, action: () => onLogout?.() },
  ];

  const selectedExamsList = useMemo(
    () => EXAMS.filter((e) => preferredExams.includes(e.id)),
    [preferredExams]
  );

  function togglePreferredExam(id) {
    setPreferredExams((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  function goToBuilder(targetMode) {
    setMode(targetMode);
    // Smooth scroll to the builder/stepper area
    const el = document.getElementById("builder-stepper");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // Mentors data for slider
  const mentors = [
    {
      id: 1,
      name: "Ananya Sharma",
      tag: "AIR 142 · IIT Bombay",
      avatar: "https://i.pravatar.cc/160?img=5",
      specialty: "Chemistry · Strategy",
    },
    {
      id: 2,
      name: "Rohit Verma",
      tag: "AIR 321 · IIIT Hyderabad",
      avatar: "https://i.pravatar.cc/160?img=12",
      specialty: "Maths · Time Mgmt",
    },
    {
      id: 3,
      name: "Sana Iqbal",
      tag: "AIR 89 · IIT Delhi",
      avatar: "https://i.pravatar.cc/160?img=32",
      specialty: "Physics · PYQ tactics",
    },
    {
      id: 4,
      name: "Aditya Rao",
      tag: "AIR 510 · IIIT Hyderabad",
      avatar: "https://i.pravatar.cc/160?img=22",
      specialty: "Maths · Mock review",
    },
    {
      id: 5,
      name: "Meera Joshi",
      tag: "AIR 230 · IIT Kharagpur",
      avatar: "https://i.pravatar.cc/160?img=47",
      specialty: "Chem · Doubt clearing",
    },
  ];

  function openMentorForm() {
    // Redirect to Airtable form (placeholder URL; replace with actual form link if available)
    window.open("https://airtable.com", "_blank");
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-white via-sky-50/40 to-white">
      {/* Top bar */}
      <div className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-sky-100 ring-1 ring-sky-200 flex items-center justify-center">
              <Layers className="h-4 w-4 text-sky-700" />
            </div>
            <div className="text-[15px] font-semibold text-slate-900">ExamSaathi</div>
            <div className="hidden sm:block text-[12px] text-slate-500">| Built by IIT Bombay & IIIT Hyderabad alumni</div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative h-8 w-8 rounded-lg bg-white ring-1 ring-slate-200 text-slate-600 hover:bg-slate-50 grid place-items-center">
              <Bell className="h-4 w-4" />
            </button>
            <div className="hidden sm:flex items-center gap-2 text-[12px] text-slate-600">
              <GraduationCap className="h-4 w-4 text-sky-600" />
              <span>
                {CLASS_LEVELS.find((c) => c.id === classLevel)?.label} · {selectedExamsList.map((e) => e.label).join(", ") || "Select exams"}
              </span>
            </div>
            <button
              onClick={onLogout}
              className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-[12px] font-medium text-slate-700 bg-white ring-1 ring-slate-200 hover:bg-slate-50"
            >
              <LogOut className="h-4 w-4" /> Logout
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5 grid grid-cols-1 lg:grid-cols-[240px_minmax(0,1fr)_300px] gap-4">
        {/* Left Sidebar */}
        <aside className="hidden lg:block">
          <nav className="rounded-2xl bg-white ring-1 ring-slate-200 p-2">
            {sidebarItems.map(({ id, label, icon: Icon, locked, action }) => (
              <button
                key={id}
                disabled={locked}
                onClick={() => {
                  if (locked) return;
                  if (typeof action === "function") action();
                }}
                className={`group w-full flex items-center justify-between gap-2 rounded-xl px-3 py-2 text-[13px] transition ring-1 ring-transparent hover:ring-sky-200 hover:bg-sky-50/40 hover:shadow-[0_0_0_3px_rgba(56,189,248,0.15)] ${
                  locked ? "text-slate-400 cursor-not-allowed" : "text-slate-700"
                }`}
              >
                <span className="flex items-center gap-2">
                  <Icon className={`h-4 w-4 ${locked ? "text-slate-300" : "text-slate-500"}`} />
                  <span>{label}</span>
                </span>
                {locked ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500">
                    <Lock className="h-3.5 w-3.5" /> Coming Soon
                  </span>
                ) : null}
              </button>
            ))}
          </nav>

          {/* Personalize card */}
          <div className="mt-3 rounded-2xl bg-gradient-to-br from-sky-50 to-white ring-1 ring-sky-100 p-3">
            <div className="text-[12px] font-semibold text-slate-800">Personalize</div>
            <div className="mt-2">
              <div className="text-[11px] text-slate-600 mb-1">Class</div>
              <div className="flex flex-wrap gap-2">
                {CLASS_LEVELS.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setClassLevel(c.id)}
                    className={`px-2.5 py-1.5 rounded-lg text-[12px] ring-1 transition ${
                      classLevel === c.id
                        ? "bg-sky-600 text-white ring-sky-600"
                        : "bg-white text-slate-700 ring-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-3">
              <div className="text-[11px] text-slate-600 mb-1">Your Exams</div>
              <div className="flex flex-wrap gap-2">
                {EXAMS.map((ex) => (
                  <button
                    key={ex.id}
                    onClick={() => togglePreferredExam(ex.id)}
                    className={`px-2.5 py-1.5 rounded-lg text-[12px] ring-1 transition ${
                      preferredExams.includes(ex.id)
                        ? "bg-emerald-600 text-white ring-emerald-600"
                        : "bg-white text-slate-700 ring-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    {ex.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main>
          {/* Welcome strip */}
          <div className="rounded-2xl bg-white ring-1 ring-slate-200 p-4 mb-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-[12px] text-slate-600">Welcome back</div>
                <div className="text-[16px] font-semibold text-slate-900">
                  {user?.name || "Student"}
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-2 text-[12px] text-slate-600">
                <Info className="h-4 w-4 text-sky-600" />
                <span>Personalized for {CLASS_LEVELS.find((c) => c.id === classLevel)?.label}</span>
              </div>
            </div>
          </div>

          {/* PYQs Module - Hero */}
          <div className="rounded-2xl bg-gradient-to-br from-emerald-50 via-white to-white ring-1 ring-emerald-100 p-5 mb-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="h-11 w-11 rounded-2xl bg-emerald-100 ring-1 ring-emerald-200 grid place-items-center">
                  <BookOpen className="h-6 w-6 text-emerald-700" />
                </div>
                <div>
                  <div className="text-[18px] sm:text-[20px] font-bold text-slate-900">Access Past Year Questions for all exams</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {["JEE Main","JEE Advanced","BITSAT","Board Exams","EAMCET","VITEEE"].map((label) => (
                      <span key={label} className="text-[11px] px-2 py-1 rounded-full bg-white ring-1 ring-slate-200 text-slate-700">{label}</span>
                    ))}
                  </div>
                </div>
              </div>
              <button onClick={() => goToBuilder("pyq")} className="shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-[13px] font-semibold shadow-sm shadow-emerald-200">
                Start Practicing
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Mock Test Module - Two Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
            <div className="rounded-2xl bg-white ring-1 ring-slate-200 p-4">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-xl bg-sky-100 ring-1 ring-sky-200 grid place-items-center">
                  <FileText className="h-5 w-5 text-sky-700" />
                </div>
                <div className="flex-1">
                  <div className="text-[15px] font-semibold text-slate-900">Full Length Mock Tests</div>
                  <div className="mt-1 text-[12px] text-slate-600">Auto-graded, exam-pattern based tests</div>
                  <button onClick={() => goToBuilder("mock")} className="mt-3 px-3 py-1.5 rounded-lg text-[12px] font-semibold bg-sky-600 text-white hover:bg-sky-700">Start Test</button>
                </div>
              </div>
            </div>
            <div className="rounded-2xl bg-white ring-1 ring-slate-200 p-4">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-xl bg-violet-100 ring-1 ring-violet-200 grid place-items-center">
                  <PlayCircle className="h-5 w-5 text-violet-700" />
                </div>
                <div className="flex-1">
                  <div className="text-[15px] font-semibold text-slate-900">Chapter-wise Practice Tests</div>
                  <div className="mt-1 text-[12px] text-slate-600">Auto-graded, exam-pattern based tests</div>
                  <button onClick={() => goToBuilder("mock")} className="mt-3 px-3 py-1.5 rounded-lg text-[12px] font-semibold bg-violet-600 text-white hover:bg-violet-700">Start Test</button>
                </div>
              </div>
            </div>
          </div>

          {/* Mentor Connect Module */}
          <div className="rounded-2xl bg-white ring-1 ring-slate-200 p-5 mb-5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <div className="text-[16px] font-bold text-slate-900">Talk to a Mentor 1-on-1</div>
                <div className="text-[12px] text-slate-600 mt-0.5">Book a call with IIT & IIIT Hyderabad rankers</div>
              </div>
              <button
                onClick={openMentorForm}
                className="shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-black text-white text-[13px] font-semibold"
              >
                Book a Mentor Session
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            {/* Slider */}
            <div className="mt-4 -mx-2 overflow-x-auto">
              <div className="px-2 flex gap-3 min-w-max">
                {mentors.map((m) => (
                  <div key={m.id} className="group w-[240px] shrink-0 rounded-2xl ring-1 ring-slate-200 bg-gradient-to-b from-slate-50 to-white hover:ring-sky-200 hover:shadow-[0_0_0_3px_rgba(56,189,248,0.08)] transition">
                    <div className="relative h-36 w-full overflow-hidden rounded-t-2xl">
                      <img
                        src={m.avatar}
                        alt={m.name}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute top-2 left-2 text-[10px] px-2 py-0.5 rounded-full bg-emerald-600 text-white ring-1 ring-emerald-500/80">
                        Mentor
                      </div>
                    </div>
                    <div className="p-3">
                      <div className="text-[14px] font-semibold text-slate-900 line-clamp-1">{m.name}</div>
                      <div className="text-[11px] text-slate-600">{m.tag}</div>
                      <div className="mt-2 text-[11px] text-slate-500">{m.specialty}</div>
                      <button
                        onClick={openMentorForm}
                        className="mt-3 w-full px-3 py-1.5 rounded-lg text-[12px] font-semibold bg-sky-600 text-white hover:bg-sky-700"
                      >
                        Book Session
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Builder / Stepper anchor */}
          <div id="builder-stepper" />

          {/* Stepper */}
          <div className="mb-4 flex items-center gap-2 text-[12px] text-slate-600">
            <span className={`px-2 py-1 rounded-full ring-1 ${
              !selectedExam ? "ring-sky-300 bg-sky-50 text-sky-700" : "ring-slate-200"
            }`}>1. Select exam</span>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
            <span className={`px-2 py-1 rounded-full ring-1 ${
              selectedExam && !mode ? "ring-emerald-300 bg-emerald-50 text-emerald-700" : "ring-slate-200"
            }`}>2. Choose mode</span>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
            <span className={`px-2 py-1 rounded-full ring-1 ${
              mode ? "ring-slate-300 bg-white text-slate-700" : "ring-slate-200"
            }`}>3. Start</span>
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
                className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3"
              >
                {EXAMS.map((ex) => (
                  <button
                    key={ex.id}
                    onClick={() => setSelectedExam(ex.id)}
                    className="group rounded-xl bg-white ring-1 ring-slate-200 hover:ring-sky-300 shadow-sm px-3 py-3 text-left transition"
                  >
                    <div className="flex items-center gap-2">
                      <div className="h-7 w-7 rounded-lg bg-sky-100 ring-1 ring-sky-200 flex items-center justify-center">
                        <BarChart3 className="h-4 w-4 text-sky-600" />
                      </div>
                      <div className="text-[13px] font-semibold text-slate-900 leading-snug">
                        {ex.label}
                      </div>
                    </div>
                    <div className="mt-1 text-[11px] text-slate-500">
                      PYQs, mocks, and chapter-wise practice
                    </div>
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
                      <div className="text-[15px] font-bold text-slate-900">
                        Previous Year Questions (PYQ)
                      </div>
                      <div className="text-[12px] text-slate-600">
                        Topic-wise practice with solutions
                      </div>
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
                      <div className="text-[12px] text-slate-600">
                        Timed full-length tests with analytics
                      </div>
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
                      <div className="text-[15px] font-semibold text-slate-900">
                        {examLabel} · {mode === "pyq" ? "PYQ" : "Mock Papers"}
                      </div>
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
        </main>

        {/* Right Panel */}
        <aside className="hidden lg:block">
          <div className="space-y-3">
            {/* Continue card */}
            <div className="rounded-2xl bg-white ring-1 ring-slate-200 p-4">
              <div className="flex items-start gap-3">
                <div className="h-9 w-9 rounded-xl bg-violet-100 ring-1 ring-violet-200 grid place-items-center">
                  <PlayCircle className="h-5 w-5 text-violet-700" />
                </div>
                <div className="flex-1">
                  <div className="text-[12px] text-slate-600">Continue where you left</div>
                  <div className="text-[14px] font-semibold text-slate-900">Limits & Continuity – PYQs</div>
                  <div className="mt-2 flex items-center gap-2">
                    <button className="px-3 py-1.5 rounded-lg text-[12px] font-medium bg-violet-600 text-white hover:bg-violet-700">Resume</button>
                    <button className="px-3 py-1.5 rounded-lg text-[12px] font-medium bg-slate-50 ring-1 ring-slate-200 hover:bg-slate-100">Change</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Daily goal */}
            <div className="rounded-2xl bg-gradient-to-br from-emerald-50 to-white ring-1 ring-emerald-100 p-4">
              <div className="flex items-center justify-between">
                <div className="text-[13px] font-semibold text-slate-900">Daily goal</div>
                <Trophy className="h-4 w-4 text-emerald-600" />
              </div>
              <div className="mt-2 text-[12px] text-slate-600">Complete 40 practice questions</div>
              <div className="mt-3 h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: "60%" }} />
              </div>
              <div className="mt-2 text-[11px] text-slate-500">24/40 done – keep going!</div>
            </div>

            {/* Upcoming */}
            <div className="rounded-2xl bg-white ring-1 ring-slate-200 p-4">
              <div className="flex items-center gap-2 text-[13px] font-semibold text-slate-900">
                <Calendar className="h-4 w-4 text-sky-600" /> Upcoming
              </div>
              <div className="mt-2 space-y-2">
                <div className="flex items-center justify-between text-[12px]">
                  <span className="text-slate-600">JEE Main Mock 03</span>
                  <span className="px-2 py-0.5 rounded bg-sky-50 text-sky-700 ring-1 ring-sky-200">Sat, 7 PM</span>
                </div>
                <div className="flex items-center justify-between text-[12px]">
                  <span className="text-slate-600">BITSAT Full Test</span>
                  <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-700 ring-1 ring-amber-200">Sun, 10 AM</span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="rounded-2xl bg-gradient-to-br from-sky-50 via-white to-white ring-1 ring-sky-100 p-4">
              <div className="flex items-start gap-3">
                <div className="h-9 w-9 rounded-xl bg-sky-100 ring-1 ring-sky-200 grid place-items-center">
                  <Sparkles className="h-5 w-5 text-sky-700" />
                </div>
                <div>
                  <div className="text-[14px] font-semibold text-slate-900">Unlock advanced analytics</div>
                  <div className="mt-1 text-[12px] text-slate-600">Accuracy by topic, time insights, and rank prediction</div>
                  <button className="mt-3 px-3 py-1.5 rounded-lg text-[12px] font-semibold bg-sky-600 text-white hover:bg-sky-700">Upgrade</button>
                </div>
              </div>
            </div>

            {/* Social & App */}
            <div className="rounded-2xl bg-white ring-1 ring-slate-200 p-4">
              <div className="flex items-center gap-2 text-[13px] font-semibold text-slate-900">
                <Share2 className="h-4 w-4 text-pink-600" /> Invite friends
              </div>
              <div className="mt-1 text-[12px] text-slate-600">Get 7 days Pro for every friend who joins.</div>
              <button className="mt-2 px-3 py-1.5 rounded-lg text-[12px] font-medium bg-pink-600 text-white hover:bg-pink-700">Copy link</button>
            </div>

            <div className="rounded-2xl bg-white ring-1 ring-slate-200 p-4">
              <div className="flex items-center gap-2 text-[13px] font-semibold text-slate-900">
                <Smartphone className="h-4 w-4 text-slate-700" /> Get the app
              </div>
              <div className="mt-1 text-[12px] text-slate-600">Install ExamSaathi on your phone for offline practice.</div>
              <div className="mt-3 flex items-center gap-2">
                <button className="px-3 py-1.5 rounded-lg text-[12px] font-medium bg-black text-white">App Store</button>
                <button className="px-3 py-1.5 rounded-lg text-[12px] font-medium bg-slate-900 text-white">Play Store</button>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
