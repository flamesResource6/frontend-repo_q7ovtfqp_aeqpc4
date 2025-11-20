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

// Mini visual elements (animated) for each card
function VisualPYQ() {
  return (
    <div className="relative h-12 w-12 rounded-xl bg-sky-50 ring-1 ring-white/60 shadow shadow-sky-200/70 grid place-items-center overflow-hidden">
      {/* Paper stack */}
      <div className="absolute inset-0 scale-110">
        <div className="absolute left-1 top-1 h-8 w-10 rotate-[-2deg] rounded-md bg-white/90 ring-1 ring-slate-200" />
        <div className="absolute left-2 top-2 h-8 w-10 rotate-[2deg] rounded-md bg-white/90 ring-1 ring-slate-200" />
      </div>
      {/* Animated lines + play triangle */}
      <div className="relative z-10 w-9">
        <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 1.2 }} className="h-1.5 rounded-full bg-gradient-to-r from-sky-400 to-emerald-400" />
        <motion.div initial={{ width: 0 }} animate={{ width: "70%" }} transition={{ duration: 0.8, delay: 0.2, repeat: Infinity, repeatDelay: 1.2 }} className="mt-1 h-1 rounded-full bg-slate-200" />
        <div className="mt-1.5 flex items-center gap-1">
          <div className="h-3 w-3 bg-sky-400" style={{ clipPath: "polygon(0 0, 0 100%, 100% 50%)" }} />
          <div className="h-1 w-6 rounded-full bg-slate-200" />
        </div>
      </div>
    </div>
  );
}

function VisualAnalytics() {
  const heights = [18, 26, 14, 30, 22];
  return (
    <div className="relative h-12 w-12 rounded-xl bg-emerald-50 ring-1 ring-white/60 shadow shadow-emerald-200/70 px-1.5 pb-1.5 pt-2">
      <div className="flex items-end gap-1 h-full">
        {heights.map((h, i) => (
          <motion.div
            key={i}
            initial={{ height: 4 }}
            animate={{ height: [4, h, 8, h] }}
            transition={{ duration: 2.2, delay: i * 0.08, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 rounded-sm bg-gradient-to-t from-emerald-400 to-sky-400"
            style={{ height: h }}
          />
        ))}
      </div>
      <motion.span className="absolute -top-1.5 right-1 h-2 w-2 rounded-full bg-emerald-500" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.2, repeat: Infinity }} />
    </div>
  );
}

function VisualMentor() {
  return (
    <div className="relative h-12 w-12 rounded-xl bg-cyan-50 ring-1 ring-white/60 shadow shadow-cyan-200/70 p-1.5">
      {/* Chat bubbles */}
      <div className="relative h-full">
        <motion.div
          initial={{ x: -6, opacity: 0.8 }}
          animate={{ x: [-6, 0, -2, 0], opacity: [0.8, 1, 1, 1] }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
          className="max-w-[80%] rounded-md bg-white ring-1 ring-slate-200 px-1.5 py-1 text-[9px] text-slate-700 shadow-sm"
        >
          Got stuck at KCL…
        </motion.div>
        <motion.div
          initial={{ x: 6, opacity: 0.8 }}
          animate={{ x: [6, 0, 2, 0], opacity: [0.8, 1, 1, 1] }}
          transition={{ duration: 2, delay: 0.4, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
          className="mt-1 ml-auto max-w-[80%] rounded-md bg-sky-100 text-sky-800 ring-1 ring-white px-1.5 py-1 text-[9px] shadow-sm"
        >
          Try nodal method →
        </motion.div>
        {/* Typing dots */}
        <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 flex gap-1">
          {[0, 1, 2].map((i) => (
            <motion.span key={i} className="h-1 w-1 rounded-full bg-sky-400" animate={{ y: [0, -2, 0] }} transition={{ duration: 0.8, delay: i * 0.12, repeat: Infinity }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function VisualBoardsEntrance() {
  return (
    <div className="relative h-12 w-12 rounded-xl bg-indigo-50 ring-1 ring-white/60 shadow shadow-indigo-200/70 p-1.5">
      <div className="text-[8px] text-slate-600">Boards</div>
      <motion.div initial={{ width: 0 }} animate={{ width: ["20%", "85%", "80%"] }} transition={{ duration: 2, repeat: Infinity }} className="mt-0.5 h-1 rounded-full bg-gradient-to-r from-indigo-400 to-sky-400" />
      <div className="mt-1 text-[8px] text-slate-600">Entrance</div>
      <motion.div initial={{ width: 0 }} animate={{ width: ["15%", "75%", "72%"] }} transition={{ duration: 2, delay: 0.2, repeat: Infinity }} className="mt-0.5 h-1 rounded-full bg-gradient-to-r from-sky-400 to-emerald-400" />
      <motion.div className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-indigo-500" animate={{ y: [0, -2, 0] }} transition={{ duration: 1.4, repeat: Infinity }} />
    </div>
  );
}

function VisualPredictor() {
  return (
    <div className="relative h-12 w-12 rounded-xl bg-amber-50 ring-1 ring-white/60 shadow shadow-amber-200/70 p-1.5 overflow-hidden">
      {/* Histogram */}
      <div className="absolute bottom-1 left-1 right-1 flex items-end gap-0.5">
        {[8, 12, 6, 16, 10, 7, 13].map((h, i) => (
          <div key={i} className="w-1 bg-amber-300/70 rounded-sm" style={{ height: h }} />
        ))}
      </div>
      {/* Moving marker */}
      <motion.div className="absolute bottom-3 left-1 right-1 h-0.5 bg-amber-400/70" />
      <motion.div className="absolute -bottom-0.5 h-3 w-3 rounded-full bg-amber-500 shadow" animate={{ x: [2, 34, 20, 40, 10, 30, 6] }} transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }} />
      <div className="absolute top-0.5 right-0.5 text-[8px] text-amber-700/80 bg-white/70 rounded px-0.5">Predict</div>
    </div>
  );
}

function VisualPlanner() {
  return (
    <div className="relative h-12 w-12 rounded-xl bg-fuchsia-50 ring-1 ring-white/60 shadow shadow-fuchsia-200/70 p-1.5">
      {/* Calendar grid */}
      <div className="grid grid-cols-4 gap-0.5">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="h-2.5 w-2.5 rounded-[3px] bg-white ring-1 ring-slate-200" />)
        )}
      </div>
      {/* Highlighted day */}
      <motion.div className="absolute left-2 top-2 h-2.5 w-2.5 rounded-[3px] bg-gradient-to-br from-fuchsia-400 to-pink-400" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.4, repeat: Infinity }} />
      {/* Sweeping progress bar */}
      <motion.div className="absolute bottom-1 left-1 right-1 h-1 rounded-full bg-gradient-to-r from-fuchsia-400 to-pink-400/80" initial={{ width: 0 }} animate={{ width: "90%" }} transition={{ duration: 1.6, repeat: Infinity }} />
    </div>
  );
}

export default function Features() {
  const items = [
    {
      visual: VisualPYQ,
      title: "PYQs & Smart Solutions",
      desc: "Topic-tagged questions with step-by-step hints and solution videos.",
      gradient: "from-sky-500 to-emerald-500",
    },
    {
      visual: VisualAnalytics,
      title: "Mock Tests & Analytics",
      desc: "JEE pattern tests with detailed strengths, weaknesses and time analysis.",
      gradient: "from-emerald-500 to-sky-500",
    },
    {
      visual: VisualMentor,
      title: "Ranker Mentorship",
      desc: "1:1 guidance from top rankers to fix strategy and clear doubts.",
      gradient: "from-sky-500 to-cyan-500",
    },
    {
      visual: VisualBoardsEntrance,
      title: "Boards + Entrance Ready",
      desc: "CBSE + JEE/BITSAT alignment so you don’t study twice.",
      gradient: "from-indigo-500 to-sky-500",
    },
    {
      visual: VisualPredictor,
      title: "College Predictor",
      desc: "Realistic admits based on rank, category and preferences.",
      gradient: "from-amber-500 to-orange-500",
    },
    {
      visual: VisualPlanner,
      title: "Study Planner",
      desc: "Daily goals auto-adjusted to your progress and exams calendar.",
      gradient: "from-fuchsia-500 to-pink-500",
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
          {items.map((it, idx) => {
            const Visual = it.visual;
            return (
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

                {/* Animated visual (replaces icons) */}
                <Visual />

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
            );
          })}
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
