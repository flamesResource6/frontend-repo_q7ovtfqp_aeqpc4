import { BookOpen, CalendarCheck, MessageSquare, GraduationCap, BarChart3, Sparkles } from "lucide-react";

export default function Features() {
  const items = [
    {
      icon: BookOpen,
      title: "PYQs & Smart Solutions",
      desc: "Topic-tagged questions with step-by-step hints and solution videos.",
    },
    {
      icon: CalendarCheck,
      title: "Mock Tests & Analytics",
      desc: "JEE pattern tests with detailed strengths, weaknesses and time analysis.",
    },
    {
      icon: MessageSquare,
      title: "Ranker Mentorship",
      desc: "1:1 guidance from top rankers to fix strategy and clear doubts.",
    },
    {
      icon: GraduationCap,
      title: "Boards + Entrance Ready",
      desc: "CBSE + JEE/BITSAT alignment so you don’t study twice.",
    },
    {
      icon: BarChart3,
      title: "College Predictor",
      desc: "Realistic admits based on rank, category and preferences.",
    },
    {
      icon: Sparkles,
      title: "Study Planner",
      desc: "Daily goals auto-adjusted to your progress and exams calendar.",
    },
  ];

  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Everything you need. In one place.</h2>
          <p className="mt-2 text-slate-600">Built for Classes 11–12 and droppers preparing for JEE Main, Advanced, BITSAT, EAMCET, MHT CET and Boards.</p>
        </div>

        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {items.map((it) => (
            <div key={it.title} className="rounded-2xl bg-white ring-1 ring-slate-200 p-5 shadow-sm">
              <div className="h-10 w-10 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center">
                <it.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-3 font-semibold text-slate-900">{it.title}</h3>
              <p className="mt-1 text-sm text-slate-600">{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
