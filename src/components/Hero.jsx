import { ArrowRight, Star, PlayCircle, TrendingUp, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-b from-sky-50 via-white to-white" />

      {/* Soft grid texture */}
      <div className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]">
        <svg className="absolute inset-0 h-full w-full opacity-[0.18]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#0ea5e9" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Animated blobs */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute -top-24 -left-20 h-72 w-72 rounded-full bg-sky-300/25 blur-3xl -z-10"
      />
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.1 }}
        className="absolute -bottom-28 -right-24 h-80 w-80 rounded-full bg-emerald-300/25 blur-3xl -z-10"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 pb-12">
        {/* Top trust strip with logos - aligned left */}
        <div className="flex items-start justify-start text-left">
          <motion.div
            initial={{ y: -8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex flex-wrap items-center gap-3 rounded-full bg-white/80 backdrop-blur px-3 py-1 ring-1 ring-slate-200 shadow-sm"
          >
            <span className="text-xs sm:text-sm text-slate-700">Built by Alumni</span>
            <span className="hidden sm:inline-block h-1 w-1 rounded-full bg-slate-300" aria-hidden />
            <span className="inline-flex items-center gap-2">
              <img src="/iitr-mark.svg" alt="IIT Bombay logo" className="h-5 w-auto opacity-90" />
              <span className="text-xs sm:text-sm font-medium text-slate-700">IIT Bombay</span>
            </span>
            <span className="inline-flex items-center gap-2">
              <img src="/iiith-mark.svg" alt="IIIT Hyderabad logo" className="h-5 w-auto opacity-90" />
              <span className="text-xs sm:text-sm font-medium text-slate-700">IIIT Hyderabad</span>
            </span>
          </motion.div>
        </div>

        {/* Two-column hero: Left pitch, Right visual */}
        <div className="mt-8 grid lg:grid-cols-2 gap-10 items-center">
          {/* Left: pitch */}
          <motion.div variants={container} initial="hidden" animate="show" className="text-center lg:text-left">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 rounded-full bg-sky-100 text-sky-700 px-3 py-1 text-xs font-medium ring-1 ring-sky-200">
              <Star className="h-3.5 w-3.5 fill-sky-600 text-sky-600" />
              Your all-in-one exam companion
            </motion.div>

            <motion.h1 variants={fadeUp} className="mt-4 text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-sky-700 to-emerald-600">
                Ace JEE & Boards with Confidence
              </span>
              <span className="block text-slate-700 mt-1 text-xl sm:text-2xl font-semibold">PYQs • Mock Tests • Ranker Mentorship • College Guidance</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="mt-4 text-slate-600 text-base sm:text-lg leading-relaxed">
              Smart planning, honest guidance, and powerful practice tools—all in one clean dashboard.
            </motion.p>

            {/* Quick highlights */}
            <motion.div variants={fadeUp} className="mt-6 flex items-center justify-center lg:justify-start gap-6 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                Trusted by 1,200+ students
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <PlayCircle className="h-4 w-4 text-sky-500" />
                2 min product tour
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="mt-8 flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
              <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white px-6 py-3.5 font-semibold shadow-sm shadow-sky-200 transition">
                👉 Login with OTP (Free)
              </button>
              <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 font-semibold text-sky-700 bg-sky-50 hover:bg-sky-100 ring-1 ring-sky-200 transition">
                🔍 Browse PYQs Without Login
                <ArrowRight className="h-4 w-4" />
              </button>
            </motion.div>
          </motion.div>

          {/* Right: animated visual stack */}
          <div className="relative">
            {/* Glow halo */}
            <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-tr from-sky-200/40 via-emerald-200/30 to-transparent blur-2xl -z-10" />

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="mx-auto w-full max-w-md lg:max-w-sm"
            >
              {/* Card stack */}
              <div className="relative">
                {/* Back card */}
                <motion.div
                  initial={{ rotate: -6, y: 20, opacity: 0 }}
                  animate={{ rotate: -6, y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="absolute -top-6 -left-6 right-6 h-40 rounded-2xl bg-white/70 backdrop-blur ring-1 ring-slate-200 shadow-lg" />

                {/* Middle card */}
                <motion.div
                  initial={{ rotate: 6, y: 10, opacity: 0 }}
                  animate={{ rotate: 6, y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                  className="absolute -bottom-8 -right-4 left-4 h-40 rounded-2xl bg-gradient-to-br from-sky-50 to-emerald-50 ring-1 ring-slate-200 shadow-lg" />

                {/* Foreground dashboard mock */}
                <motion.div
                  initial={{ scale: 0.96, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.05 }}
                  className="relative rounded-2xl bg-white ring-1 ring-slate-200 shadow-xl p-5"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="h-8 w-28 rounded-md bg-slate-100" />
                    <div className="flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
                      <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
                      <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
                    </div>
                  </div>

                  {/* Content rows */}
                  <div className="mt-4 grid grid-cols-3 gap-4">
                    <div className="col-span-2 rounded-xl ring-1 ring-slate-200 p-4">
                      <div className="h-4 w-24 bg-slate-100 rounded" />
                      <div className="mt-3 flex items-end gap-1">
                        {Array.from({ length: 10 }).map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ scaleY: 0.6 }}
                            animate={{ scaleY: [0.6, 1, 0.8, 1] }}
                            transition={{ duration: 2, delay: i * 0.05, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
                            className="w-3 rounded-t bg-gradient-to-t from-sky-300 to-sky-500"
                            style={{ height: 40 + (i % 4) * 10 }}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="rounded-xl ring-1 ring-slate-200 p-4">
                      <div className="h-4 w-20 bg-slate-100 rounded" />
                      <div className="mt-3 space-y-2">
                        {[0, 1, 2].map((i) => (
                          <div key={i} className="h-3 rounded bg-gradient-to-r from-emerald-200 to-emerald-400/70" />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Footer row */}
                  <div className="mt-4 grid grid-cols-3 gap-4">
                    {[0, 1, 2].map((i) => (
                      <div key={i} className="rounded-xl ring-1 ring-slate-200 p-4">
                        <div className="h-3.5 w-16 bg-slate-100 rounded" />
                        <div className="mt-3 flex items-center gap-2">
                          <div className="h-8 w-8 rounded-md bg-sky-100" />
                          <div className="h-2.5 flex-1 rounded bg-slate-100" />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Floating badges */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: [0, -6, 0] }}
                  transition={{ duration: 2.4, delay: 0.4, repeat: Infinity, repeatType: "reverse" }}
                  className="absolute -left-4 -top-6 inline-flex items-center gap-2 rounded-full bg-white/90 backdrop-blur px-3 py-1.5 ring-1 ring-slate-200 shadow-md"
                >
                  <TrendingUp className="h-4 w-4 text-emerald-600" />
                  <span className="text-xs font-medium text-slate-700">+18% mock test scores</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: [0, -6, 0] }}
                  transition={{ duration: 2.8, delay: 0.6, repeat: Infinity, repeatType: "reverse" }}
                  className="absolute -right-3 -bottom-8 inline-flex items-center gap-2 rounded-full bg-white/90 backdrop-blur px-3 py-1.5 ring-1 ring-slate-200 shadow-md"
                >
                  <ShieldCheck className="h-4 w-4 text-sky-600" />
                  <span className="text-xs font-medium text-slate-700">Personalized plan ready</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
