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

const floaty = {
  initial: { y: 0 },
  animate: { y: [0, -6, 0], transition: { duration: 4, repeat: Infinity, ease: "easeInOut" } }
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
      {/* Background gradient wash */}
      <div className="pointer-events-none absolute inset-0 -z-20 bg-gradient-to-b from-white via-sky-50/40 to-white" />

      {/* Subtle dotted grid */}
      <div className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]">
        <svg className="absolute inset-0 h-full w-full opacity-[0.15]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dot-grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="#0ea5e9" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dot-grid)" />
        </svg>
      </div>

      {/* Floating blobs */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1 }}
        className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-emerald-300/25 blur-3xl -z-10"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1, delay: 0.1 }}
        className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-sky-300/25 blur-3xl -z-10"
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

          {/* Spark underline */}
          <motion.div
            variants={fadeUp}
            className="mx-auto mt-4 h-1.5 w-28 rounded-full bg-gradient-to-r from-sky-400 to-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.35)]"
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
              whileHover={{ y: -6, rotate: 0.2 }}
              className="group relative rounded-2xl bg-white/90 backdrop-blur ring-1 ring-slate-200 p-5 shadow-sm transition-all duration-300 hover:shadow-xl"
            >
              {/* Gradient border glow */}
              <div className={`pointer-events-none absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br ${it.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} style={{ maskImage: "radial-gradient(white, transparent 65%)" }} />

              {/* Floating accent orbs */}
              <motion.span
                {...floaty}
                className={`absolute -right-4 -top-4 h-12 w-12 rounded-full bg-gradient-to-br ${it.gradient} blur-xl opacity-40`} aria-hidden
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

              {/* Animated progress bars / accents */}
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

              {/* Corner sparkle */}
              <motion.div
                className="absolute -bottom-3 -left-3 h-8 w-8 rounded-full bg-gradient-to-tr from-white to-transparent"
                animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: idx * 0.2 }}
                aria-hidden
              />
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
