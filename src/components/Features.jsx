import { BookOpen, CalendarCheck, MessageSquare, GraduationCap, BarChart3, Sparkles } from "lucide-react";

export default function Features() {
  const items = [
    {
      icon: BookOpen,
      title: "PYQs for All Major Exams",
      desc:
        "Previous Year Questions for JEE Main, JEE Advanced, BITSAT, EAMCET, MHT CET, and Boards — all organised by chapter and difficulty.",
    },
    {
      icon: CalendarCheck,
      title: "Smart Mock Tests",
      desc:
        "Full-length and chapter-wise mock tests with detailed analysis so you know exactly where you stand and what to fix.",
    },
    {
      icon: MessageSquare,
      title: "1-on-1 Guidance from JEE Rankers",
      desc:
        "Talk directly to top JEE rankers and IIT/IIIT students for doubt clearing, strategy, and career guidance.",
    },
    {
      icon: GraduationCap,
      title: "College Counselling & Branch Guidance",
      desc:
        "Help with choosing the right college and branch based on your rank, interests, and future goals.",
    },
    {
      icon: BarChart3,
      title: "College Predictor",
      desc:
        "Use your actual or expected score to see which colleges and branches you can realistically target.",
    },
    {
      icon: Sparkles,
      title: "Boards + Entrance in One Place",
      desc:
        "Balanced support for both board exams and entrance exams, with smart planning so you don’t feel overloaded.",
    },
  ];

  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">What You Get with Examsaathi</h2>
          <p className="mt-2 text-slate-600">Simple, friendly and focused support for Classes 11–12 and droppers preparing for JEE, BITSAT and major state entrances — plus Boards.</p>
        </div>

        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {items.map((it) => (
            <div
              key={it.title}
              className="rounded-2xl bg-white ring-1 ring-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow"
            >
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
