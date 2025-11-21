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

// Expanded: upcoming entrance deadlines (dummy data)
const DEADLINES = [
  { name: "IIT JEE Main (Session 2)", date: "Mar 12, 2025", url: "https://jeemain.nta.nic.in/" },
  { name: "EAMCET", date: "Apr 03, 2025", url: "https://eamcet.tsche.ac.in/" },
  { name: "BITSAT", date: "Mar 29, 2025", url: "https://www.bitsadmission.com/" },
  { name: "VITEEE", date: "Mar 15, 2025", url: "https://viteee.vit.ac.in/" },
  { name: "WBJEE", date: "Feb 28, 2025", url: "https://wbjeeb.nic.in/" },
  { name: "MHT-CET", date: "Mar 20, 2025", url: "https://cetcell.mahacet.org/" },
  { name: "SRMJEEE", date: "Mar 18, 2025", url: "https://applications.srmist.edu.in/btech" },
  { name: "KIITEE", date: "Mar 22, 2025", url: "https://kiitee.kiit.ac.in/" },
  { name: "Manipal MET", date: "Apr 10, 2025", url: "https://manipal.edu/mu/admissions.html" },
  { name: "AMUEEE", date: "Mar 30, 2025", url: "https://www.amucontrollerexams.com/" },
  { name: "COMEDK UGET", date: "Apr 05, 2025", url: "https://www.comedk.org/" },
  { name: "AP EAPCET", date: "Apr 08, 2025", url: "https://cets.apsche.ap.gov.in/" },
  { name: "CUSAT CAT", date: "Mar 25, 2025", url: "https://admissions.cusat.ac.in/" },
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

  // Sort deadlines by nearest upcoming date
  const sortedDeadlines = useMemo(() => {
    const today = new Date();
    const parsed = DEADLINES.map(d => ({
      ...d,
      ts: new Date(d.date).getTime(),
    }));
    const upcoming = parsed.filter(d => !Number.isNaN(d.ts) ? d.ts >= new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime() : true);
    upcoming.sort((a, b) => {
      const at = Number.isNaN(a.ts) ? Infinity : a.ts;
      const bt = Number.isNaN(b.ts) ? Infinity : b.ts;
      return at - bt;
    });
    return upcoming.map(({ ts, ...rest }) => rest);
  }, []);

  const fadeUp = {
    hidden: { y: 10, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.35 } },
  };

  function startPyqScope(scopeId) {
    if (!selectedExam) {
      setShowExamPicker(true);
      return;
    }
    const qs = new URLSearchParams({ exam: selectedExam, scope: scopeId });
    navigate(`/pyq/start?${qs.toString()}`);
  }

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
        <div className="w-full h-12 flex items-center justify-between px-3 sm:px-4">
          <div className="flex items-center gap-3 w-full">
            <div className="relative h-8 w-8 rounded-md bg-white ring-1 ring-slate-200 grid place-items-center shadow-sm">
              <Layers className="h-4 w-4 text-sky-700" />
              <span className="pointer-events-none absolute -inset-1 rounded-md bg-sky-400/10 blur-md" />
            </div>
            <div className="text-[15px] font-semibold text-slate-900">ExamSaathi</div>
            <div className="ml-2">
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
          <div className="hidden md:flex items-center gap-2.5">
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
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-56 w-[1100px] rounded-full bg-gradient-to-r from-sky-300/30 via-emerald-300/30 to-transparent blur-3xl" />
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="w-full px-3 sm:px-4"
          >
            <div className="grid grid-cols-1 lg:grid-cols-[250px_minmax(0,1fr)_320px] gap-3 lg:gap-5 py-5 lg:py-7">
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
                      className={`relative group w-full flex items-center justify-between gap-2 rounded-xl px-3 py-1.5 text-[13px] transition hover:bg-sky-50/60 ${
                        locked ? "text-slate-400 cursor-not-allowed" : "text-slate-700"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <Icon className={`h-5 w-5 ${locked ? "text-slate-300" : "text-sky-600"}`} />
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

                {/* Invite friends */}
                <div className="relative rounded-2xl bg-white ring-1 ring-slate-200 p-4 shadow-sm overflow-hidden mt-3">
                  <div className="absolute -left-8 -bottom-8 h-20 w-20 bg-emerald-300/10 rounded-full blur-xl" />
                  <div className="flex items-center gap-2 text-[15px] font-semibold text-slate-900 relative z-10">
                    <Share2 className="h-5 w-5 text-sky-700" /> Invite friends
                  </div>
                  <div className="mt-1.5 text-[13px] text-slate-600 relative z-10">Get 7 days Pro for every friend who joins.</div>
                  <button onClick={copyInvite} className="relative z-10 mt-2.5 px-3.5 py-2 rounded-md text-[12px] font-semibold bg-gradient-to-r from-sky-600 to-emerald-600 text-white hover:from-sky-700 hover:to-emerald-700 shadow-sm">{copied ? 'Copied!' : 'Copy link'}</button>
                </div>

                {/* Upcoming entrance deadlines */}
                <div className="relative rounded-2xl bg-white ring-1 ring-slate-200 p-4 shadow-sm overflow-hidden mt-3">
                  <div className="absolute -right-10 -top-10 h-16 w-16 bg-sky-300/10 rounded-full blur-2xl" />
                  <div className="relative z-10">
                    <div className="flex items-center justify-between">
                      <div className="text-[12px] font-semibold tracking-wide uppercase text-slate-700">Upcoming entrance deadlines</div>
                      <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-[11px] text-sky-700 underline decoration-sky-200">View all</button>
                    </div>
                    <ul className="mt-2 divide-y divide-slate-200 max-h-72 overflow-auto pr-1">
                      {sortedDeadlines.slice(0, 10).map((item, idx) => (
                        <li key={idx} className="flex items-center justify-between py-2">
                          <div>
                            <div className="text-[13px] font-medium text-slate-900 leading-tight">{item.name}</div>
                            <div className="text-[11px] text-slate-500">Deadline: {item.date}</div>
                          </div>
                          <button
                            onClick={() => window.open(item.url, '_blank')}
                            className="ml-3 inline-flex items-center justify-center h-8 w-8 rounded-md ring-1 ring-slate-200 text-slate-700 hover:bg-sky-50"
                            aria-label={`Apply for ${item.name}`}
                          >
                            <ChevronRight className="h-4 w-4" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </aside>

              {/* Center column (updated) */}
              <main className="space-y-5 lg:space-y-6">
                {/* Welcome + inline stats */}
                <motion.div variants={fadeUp} initial="hidden" animate="show" className="relative rounded-2xl bg-white ring-1 ring-slate-200 p-5 sm:p-6 shadow-sm overflow-hidden">
                  <div className="absolute -right-10 -top-10 h-32 w-32 bg-sky-300/10 rounded-full blur-2xl" />
                  <div className="absolute -left-10 -bottom-10 h-32 w-32 bg-emerald-300/10 rounded-full blur-2xl" />
                  <div className="relative z-10 grid grid-cols-1 gap-3">
                    <div>
                      <div className="text-[17px] sm:text-[19px] font-semibold text-slate-900">Welcome back, {"Demo Student"}</div>
                      <div className="mt-2.5 flex flex-col sm:flex-row sm:items-center gap-3">
                        <label className="text-[13px] text-slate-600">Select exam</label>
                        <select
                          value={selectedExam || ""}
                          onChange={(e) => setSelectedExam(e.target.value)}
                          className="text-[13px] rounded-md ring-1 ring-slate-200 bg-white px-3 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-300 w-full sm:w-64"
                        >
                          {!selectedExam ? <option value="" disabled>Select exam</option> : null}
                          {EXAMS.map((ex) => (
                            <option key={ex.id} value={ex.id}>{ex.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Compact inline stats */}
                    <div className="mt-1 grid grid-cols-3 gap-2.5">
                      {[
                        { title: 'Accuracy', value: '82%' },
                        { title: 'Avg Score', value: '178' },
                        { title: 'Questions', value: '462' },
                      ].map((kpi, idx) => (
                        <div key={idx} className="relative rounded-xl bg-white ring-1 ring-slate-200 p-3 shadow-sm overflow-hidden">
                          <div className="absolute -right-6 -top-6 h-14 w-14 bg-sky-200/20 rounded-full blur-xl" />
                          <div className="relative z-10">
                            <div className="text-[11px] text-slate-500">{kpi.title}</div>
                            <div className="text-[18px] font-semibold text-slate-900">{kpi.value}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Dedicated: Solve PYQs card */}
                <motion.div variants={fadeUp} initial="hidden" animate="show" className="relative rounded-2xl bg-white ring-1 ring-slate-200 p-5 shadow-sm overflow-hidden">
                  <div className="absolute -right-10 -bottom-10 h-24 w-24 bg-sky-300/20 rounded-full blur-2xl" />
                  <div className="relative z-10">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-9 w-9 rounded-xl bg-sky-100 ring-1 ring-sky-200 grid place-items-center">
                          <BookOpen className="h-5 w-5 text-sky-700" />
                        </div>
                        <h3 className="text-[16px] font-semibold text-slate-900">Solve Previous Year Questions</h3>
                      </div>
                    </div>
                    <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      <button onClick={() => startPyqScope('full')} className="px-3 py-2 rounded-xl ring-1 ring-slate-200 bg-white hover:bg-sky-50 text-[13px] font-medium text-slate-800">All subjects (PCM)</button>
                      <button onClick={() => startPyqScope('physics')} className="px-3 py-2 rounded-xl ring-1 ring-slate-200 bg-white hover:bg-sky-50 text-[13px] font-medium text-slate-800">Physics</button>
                      <button onClick={() => startPyqScope('chemistry')} className="px-3 py-2 rounded-xl ring-1 ring-slate-200 bg-white hover:bg-sky-50 text-[13px] font-medium text-slate-800">Chemistry</button>
                      <button onClick={() => startPyqScope('math')} className="px-3 py-2 rounded-xl ring-1 ring-slate-200 bg-white hover:bg-sky-50 text-[13px] font-medium text-slate-800">Maths</button>
                    </div>
                  </div>
                </motion.div>

                {/* Quick Actions grid */}
                <motion.div variants={fadeUp} initial="hidden" animate="show" className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
                  {[{
                    title: 'Start PYQs', icon: BookOpen, action: () => startPyqScope('full'), tint: 'from-sky-200/40'
                  },{
                    title: 'Full Mock', icon: FileText, action: () => openFlow('mock'), tint: 'from-emerald-200/40'
                  },{
                    title: 'Chapter Practice', icon: PlayCircle, action: () => openFlow('mock'), tint: 'from-sky-200/40'
                  },{
                    title: 'Build Roadmap', icon: Target, action: () => openRoadmap(), tint: 'from-emerald-200/40'
                  }].map((q, idx) => (
                    <button key={idx} onClick={q.action} className="relative rounded-2xl bg-white ring-1 ring-slate-200 p-4 shadow-sm overflow-hidden text-left group">
                      <div className={`absolute -inset-8 bg-gradient-to-br ${q.tint} to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition`} />
                      <div className="relative z-10 flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-white ring-1 ring-slate-200 grid place-items-center">
                          <q.icon className="h-5 w-5 text-slate-800" />
                        </div>
                        <div className="text-[14px] font-semibold text-slate-900">{q.title}</div>
                      </div>
                    </button>
                  ))}
                </motion.div>

                {/* Mentor carousel remains */}
                <motion.div variants={fadeUp} initial="hidden" animate="show" className="relative rounded-2xl bg-white ring-1 ring-slate-200 p-5 sm:p-6 shadow-sm overflow-hidden">
                  <div className="absolute inset-0 pointer-events-none" style={{ maskImage: "radial-gradient(380px_120px_at_90%_120%, black, transparent)" }}>
                    <div className="absolute right-0 bottom-0 h-36 w-60 bg-gradient-to-br from-emerald-200/30 to-sky-200/30 blur-2xl" />
                  </div>
                  <div className="flex items-center justify-between relative z-10">
                    <h3 className="text-[17px] font-semibold text-slate-900">Talk to a mentor 1-on-1</h3>
                    <button onClick={() => window.open('https://airtable.com','_blank')} className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-md bg-gradient-to-r from-sky-600 to-emerald-600 text-white text-[12px] font-semibold hover:from-sky-700 hover:to-emerald-700 shadow-sm">
                      Book a Mentor Session <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-3.5 -mx-2 overflow-x-auto">
                    <div className="px-2 flex gap-3 min-w-max">
                      {[1,2,3,4,5].map((idx) => (
                        <div key={idx} className="w-[240px] shrink-0 relative rounded-2xl ring-1 ring-slate-200 bg-white shadow-sm p-4 overflow-hidden">
                          <div className="pointer-events-none absolute -inset-8 bg-gradient-to-br from-sky-200/20 via-emerald-200/20 to-transparent blur-2xl" />
                          <div className="relative z-10 flex items-center gap-4">
                            <img src={`https://i.pravatar.cc/120?img=${5+idx}`} alt="mentor" className="h-14 w-14 rounded-full object-cover" loading="lazy" />
                            <div>
                              <div className="text-[14px] font-semibold text-slate-900">Ananya Sharma</div>
                              <div className="text-[12px] text-slate-500">AIR 142 · IIT Bombay</div>
                            </div>
                          </div>
                          <button onClick={() => window.open('https://airtable.com','_blank')} className="relative z-10 mt-3 w-full px-3.5 py-2 rounded-md text-[12px] font-semibold bg-gradient-to-r from-sky-600 to-emerald-600 text-white hover:from-sky-700 hover:to-emerald-700 shadow-sm">Book Session</button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <button onClick={() => window.open('https://airtable.com','_blank')} className="mt-3.5 sm:hidden inline-flex items-center justify-center w-full gap-2 px-3.5 py-2 rounded-md bg-gradient-to-r from-sky-600 to-emerald-600 text-white text-[13px] font-semibold shadow-sm">
                    Book a Mentor Session <ChevronRight className="h-4 w-4" />
                  </button>
                </motion.div>
              </main>

              {/* Right rail */}
              <aside className="hidden lg:block">
                <div className="space-y-3.5">
                  {/* Promo Block */}
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
                        <div className="rounded-xl ring-1 ring-1 ring-slate-200 bg-white p-3">
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
          <button onClick={() => startPyqScope('full')} className="py-2.5 text-[12px] flex flex-col items-center text-slate-700">
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

      {/* Flow Modal (Mock) */}
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
                <div className="text-sm font-semibold text-slate-900">Mock Papers</div>
                <button onClick={() => { setFlowModalOpen(false); setFlowType(null); }} className="h-8 w-8 grid place-items-center rounded-md hover:bg-slate-50">
                  <X className="h-4 w-4 text-slate-500" />
                </button>
              </div>

              {/* Step 1 (ranges) */}
              <div className="p-4">
                <div className="text-[14px] text-slate-700 font-medium">Select year range</div>
                <div className="mt-3 grid grid-cols-4 gap-2">
                  {[1,3,5,10].map((y) => (
                    <button key={y} onClick={() => { setYears(y); }} className={`px-3 py-2 rounded-lg text-[14px] ring-1 transition ${years===y? 'bg-slate-900 text-white ring-slate-900':'bg-white text-slate-800 ring-slate-200 hover:bg-sky-50'}`}>
                      {y} yr{y>1?'s':''}
                    </button>
                  ))}
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {[{id:'full',label:'Full Paper'},{id:'math',label:'Maths'},{id:'physics',label:'Physics'},{id:'chemistry',label:'Chemistry'}].map((opt) => (
                    <button key={opt.id} onClick={() => {
                      const params = new URLSearchParams({ exam: selectedExam || '', scope: opt.id });
                      if (years) params.set('years', String(years));
                      if (!selectedExam) { setShowExamPicker(true); return; }
                      navigate(`/mock/config?${params.toString()}`);
                      setFlowModalOpen(false);
                    }} className="px-3 py-2 rounded-lg text-[14px] ring-1 bg-white text-slate-800 ring-slate-200 hover:bg-sky-50">
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
