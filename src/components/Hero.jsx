import { ArrowRight, Star, BadgeCheck, PlayCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-sky-50 via-white to-white" />
      {/* decorative blobs (softened for less clutter) */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-56 w-56 rounded-full bg-sky-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-56 w-56 rounded-full bg-emerald-200/30 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 pb-8">
        {/* Two-column layout with CTAs moved to the right for desktop */}
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Left: Copy-only to reduce clutter */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-sky-100 text-sky-700 px-3 py-1 text-xs font-medium ring-1 ring-sky-200">
                <Star className="h-3.5 w-3.5 fill-sky-600 text-sky-600" />
                Your all-in-one exam companion
              </div>

              <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
                🔥 Your All-in-One Exam Companion for JEE & Boards.
              </h1>

              <p className="mt-4 text-slate-600 text-base sm:text-lg">
                Instant access to PYQs, mock tests, ranker mentorship, and college guidance — everything you need in one place.
              </p>

              {/* Trust badge - compact */}
              <div className="mt-5 inline-flex items-center gap-3 rounded-xl bg-white/80 backdrop-blur px-3 py-2 ring-1 ring-slate-200 shadow-sm">
                <BadgeCheck className="h-4 w-4 text-emerald-600" />
                <span className="text-sm text-slate-700">Built by IIT Bombay & IIIT Hyderabad Alumni</span>
                <img src="/iitr-mark.svg" alt="IIT Bombay" className="h-5 opacity-80" />
                <img src="/iiith-mark.svg" alt="IIIT Hyderabad" className="h-5 opacity-80" />
              </div>

              {/* Social proof simplified */}
              <div className="mt-6 flex items-center justify-center lg:justify-start gap-3 text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  Trusted by 1,200+ students
                </div>
                <div className="hidden sm:flex items-center gap-2">
                  <PlayCircle className="h-4 w-4 text-sky-500" />
                  2 min product tour
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: CTA card on top, mockup below (stacks on mobile) */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="mx-auto w-full max-w-md lg:max-w-none"
            >
              {/* CTA Card */}
              <div className="mb-5 rounded-2xl bg-white ring-1 ring-slate-200 shadow-lg p-4">
                <p className="text-slate-800 font-semibold">Get started free</p>
                <p className="text-xs text-slate-500 mt-0.5">No password required</p>
                <div className="mt-4 flex flex-col sm:flex-row gap-3">
                  <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-sky-600 hover:bg-sky-700 text-white px-5 py-3 font-medium shadow-sm">
                    👉 Login with OTP (Free)
                  </button>
                  <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 font-medium text-sky-700 bg-sky-50 hover:bg-sky-100 ring-1 ring-sky-200">
                    🔍 Browse PYQs Without Login
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Dashboard mockup */}
              <div className="relative rounded-2xl bg-white p-4 ring-1 ring-slate-200 shadow-xl">
                {/* browser bar */}
                <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                  <div className="h-2.5 w-2.5 rounded-full bg-slate-200" />
                  <div className="h-2.5 w-2.5 rounded-full bg-slate-200" />
                  <div className="h-2.5 w-2.5 rounded-full bg-slate-200" />
                </div>
                {/* dashboard mock */}
                <div className="grid sm:grid-cols-2 gap-4 pt-4">
                  {/* PYQ progress */}
                  <div className="rounded-xl ring-1 ring-slate-200 p-4 bg-gradient-to-br from-sky-50 to-white">
                    <p className="text-xs text-slate-600">PYQ Progress</p>
                    <p className="text-2xl font-bold text-slate-900 mt-1">68%</p>
                    <div className="mt-3 h-2 w-full rounded-full bg-slate-100">
                      <div className="h-2 rounded-full bg-sky-500" style={{ width: "68%" }} />
                    </div>
                    <p className="mt-2 text-xs text-slate-500">120 of 176 attempted</p>
                  </div>

                  {/* Mentorship */}
                  <div className="rounded-xl ring-1 ring-slate-200 p-4 bg-gradient-to-br from-emerald-50 to-white">
                    <p className="text-xs text-slate-600">JEE Ranker Mentorship</p>
                    <div className="mt-2 flex items-center gap-3">
                      <img src="https://i.pravatar.cc/48?img=12" alt="mentor" className="h-10 w-10 rounded-full ring-2 ring-white shadow" />
                      <div>
                        <p className="text-sm font-medium text-slate-800">Session with Ananya</p>
                        <p className="text-xs text-slate-500">AIR 142 • Physics focus</p>
                      </div>
                    </div>
                    <button className="mt-3 inline-flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1.5 rounded-md ring-1 ring-emerald-200">
                      Book slot
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  {/* Mock test */}
                  <div className="rounded-xl ring-1 ring-slate-200 p-4 bg-gradient-to-br from-orange-50 to-white">
                    <p className="text-xs text-slate-600">Upcoming Mock Test</p>
                    <p className="mt-1 text-slate-800 text-sm">Full Syllabus JEE Main</p>
                    <div className="mt-2 grid grid-cols-3 gap-2 text-center">
                      {[
                        { k: "Date", v: "Sun, 10 AM" },
                        { k: "Duration", v: "3 hrs" },
                        { k: "Marks", v: "300" },
                      ].map((i) => (
                        <div key={i.k} className="rounded-lg bg-white ring-1 ring-slate-200 py-2">
                          <p className="text-[10px] text-slate-500">{i.k}</p>
                          <p className="text-sm font-medium text-slate-800">{i.v}</p>
                        </div>
                      ))}
                    </div>
                    <button className="mt-3 text-xs text-orange-700 bg-orange-50 px-2.5 py-1.5 rounded-md ring-1 ring-orange-200 inline-flex items-center gap-1.5">
                      Start mock
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  {/* College predictor */}
                  <div className="rounded-xl ring-1 ring-slate-200 p-4 bg-gradient-to-br from-violet-50 to-white">
                    <p className="text-xs text-slate-600">College Predictor</p>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      {[
                        { college: "IIT Hyderabad", prob: 72 },
                        { college: "NIT Trichy", prob: 86 },
                        { college: "IIIT Hyderabad", prob: 58 },
                        { college: "VJTI Mumbai", prob: 65 },
                      ].map((c) => (
                        <div key={c.college} className="rounded-lg bg-white ring-1 ring-slate-200 p-2">
                          <p className="text-[11px] text-slate-600 truncate">{c.college}</p>
                          <div className="mt-1 h-1.5 w-full bg-slate-100 rounded-full">
                            <div className="h-1.5 bg-violet-500 rounded-full" style={{ width: `${c.prob}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
