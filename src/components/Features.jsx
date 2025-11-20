import { BookOpen, CalendarCheck, MessageSquare, GraduationCap, BarChart3, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } }
};

export default function Features() {
  const items = [
    {
      icon: BookOpen,
      title: "PYQs & Smart Solutions",
      desc: "Topic-tagged questions with step-by-step hints and solution videos.",
      gradient: "from-sky-500 to-emerald-500",
      tint: "bg-sky-100 text-sky-700",
      glow: "shadow-sky-200/70"
    },
    {
      icon: CalendarCheck,
      title: "Mock Tests & Analytics",
      desc: "JEE pattern tests with detailed strengths, weaknesses and time analysis.",
      gradient: "from-emerald-500 to-sky-500",
      tint: "bg-emerald-100 text-emerald-700",
      glow: "shadow-emerald-200/70"
    },
    {
      icon: MessageSquare,
      title: "Ranker Mentorship",
      desc: "1:1 guidance from top rankers to fix strategy and clear doubts.",
      gradient: "from-sky-500 to-cyan-500",
      tint: "bg-cyan-100 text-cyan-700",
      glow: "shadow-cyan-200/70"
    },
    {
      icon: GraduationCap,
      title: "Boards + Entrance Ready",
      desc: "CBSE + JEE/BITSAT alignment so you don’t study twice.",
      gradient: "from-indigo-500 to-sky-500",
      tint: "bg-indigo-100 text-indigo-700",
      glow: "shadow-indigo-200/70"
    },
    {
      icon: BarChart3,
      title: "College Predictor",
      desc: "Realistic admits based on rank, category and preferences.",
      gradient: "from-amber-500 to-orange-500",
      tint: "bg-amber-100 text-amber-700",
      glow: "shadow-amber-200/70"
    },
    {
      icon: Sparkles,
      title: "Study Planner",
      desc: "Daily goals auto-adjusted to your progress and exams calendar.",
      gradient: "from-fuchsia-500 to-pink-500",
      tint: "bg-fuchsia-100 text-fuchsia-700",
      glow: "shadow-fuchsia-200/70"
    },
  ];

  return (
    <section className="relative py-14 sm:py-20 overflow-hidden">
      {/* Premium backdrop: soft radial base + aurora ribbons + subtle vignette */}
      <div className="pointer-events-none absolute inset-0 -z-30 bg-gradient-to-b from-white via-slate-50 to-white" />

      {/* Aurora ribbons (clean, premium, non-spray) */}
      <div
        aria-hidden
        className="absolute -top-28 right-1/2 h-80 w-[120%] -translate-x-1/3 rotate-[-8deg] blur-2xl opacity-[0.35] -z-20"
        style={{
          backgroundImage:
            "conic-gradient(from 210deg at 30% 50%, rgba(14,165,233,0.35), rgba(16,185,129,0.28), rgba(14,165,233,0.35))"
        }}
      />
      <div
        aria-hidden
        className="absolute -bottom-40 left-1/2 h-96 w-[120%] -translate-x-1/2 rotate-[10deg] blur-2xl opacity-[0.28] -z-20"
        style={{
          backgroundImage:
            "conic-gradient(from 40deg at 70% 50%, rgba(99,102,241,0.30), rgba(14,165,233,0.25), rgba(99,102,241,0.30))"
        }}
      />

      {/* Vignette to focus content */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          maskImage: "radial-gradient(ellipse at center, black 60%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 60%, transparent 100%)",
          background:
            "radial-gradient(1200px 400px at 50% -10%, rgba(2,6,23,0.06), transparent), radial-gradient(800px 600px at 50% 110%, rgba(2,6,23,0.06), transparent)"
        }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="text-center max-w-3xl mx-auto"
        >
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-sky-700 to-emerald-600">Everything you need. In one place.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-2 text-slate-600">
            Built for Classes 11–12 and droppers preparing for JEE Main, Advanced, BITSAT, EAMCET, MHT CET and Boards.
          </motion.p>
          {/* understated accent line */}
          <motion.div
            variants={fadeUp}
            className="mx-auto mt-4 h-[5px] w-28 rounded-full bg-gradient-to-r from-sky-400 to-emerald-400 shadow-[0_0_18px_rgba(16,185,129,0.28)]"
          />
        </motion.div>

        {/* Feature grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          {items.map((it, idx) => (
            <motion.div
              key={it.title}
              variants={fadeUp}
              whileHover={{ y: -3 }}
              className="group relative rounded-2xl bg-white ring-1 ring-slate-100 p-5 shadow-sm transition-all duration-300 hover:shadow-md"
            >
              {/* Minimal gradient hairline border on hover */}
              <div
                className={`pointer-events-none absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br ${it.gradient} opacity-0 group-hover:opacity-60 transition-opacity duration-300`}
                style={{ maskImage: "linear-gradient(white 0, white calc(100% - 1px), transparent calc(100% - 1px))" }}
              />

              {/* Icon */}
              <div className={`h-12 w-12 rounded-xl ${it.tint} flex items-center justify-center shadow ${it.glow} ring-1 ring-white/60`}>
                <it.icon className="h-6 w-6" />
              </div>

              {/* Title */}
              <h3 className="mt-4 font-semibold text-slate-900 text-lg">
                {it.title}
              </h3>

              {/* Description */}
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                {it.desc}
              </p>

              {/* Subtle progress accents */}
              <div className="mt-4 space-y-2">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "90%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.05 * (idx + 1) }}
                  className={`h-1.5 rounded-full bg-gradient-to-r ${it.gradient}`}
                />
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "70%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.08 * (idx + 1) }}
                  className={`h-1 rounded-full bg-gradient-to-r ${it.gradient} opacity-70`}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA strip under grid */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-10 flex flex-col items-center justify-center"
        >
          <div className="relative inline-flex items-center gap-3 rounded-2xl bg-white/80 px-4 py-2 ring-1 ring-slate-200 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-sm text-slate-700">New features land every week • Roadmap driven by students</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
