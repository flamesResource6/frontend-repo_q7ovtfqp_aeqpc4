import { ArrowRight, Star, PlayCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-sky-50 via-white to-white" />
      {/* softened background accents */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-56 w-56 rounded-full bg-sky-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-56 w-56 rounded-full bg-emerald-200/30 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 pb-10">
        {/* Top trust strip with logos */}
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <div className="inline-flex items-center gap-3 rounded-full bg-white/80 backdrop-blur px-3 py-1 ring-1 ring-slate-200 shadow-sm">
            <img src="/iitr-mark.svg" alt="IIT Bombay" className="h-5 w-auto opacity-90" />
            <span className="text-xs sm:text-sm text-slate-700">Built by IIT Bombay & IIIT Hyderabad Alumni</span>
            <img src="/iiith-mark.svg" alt="IIIT Hyderabad" className="h-5 w-auto opacity-90" />
          </div>
        </div>

        {/* Two-column hero: Left pitch, Right CTA */}
        <div className="mt-8 grid lg:grid-cols-2 gap-10 items-center">
          {/* Left: pitch */}
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

              {/* Social proof mini */}
              <div className="mt-6 flex items-center justify-center lg:justify-start gap-6 text-sm text-slate-500">
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

          {/* Right: focused CTA card (no mockup for a clean two-part hero) */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="mx-auto w-full max-w-md lg:max-w-sm"
            >
              <div className="rounded-2xl bg-white ring-1 ring-slate-200 shadow-xl p-6">
                <p className="text-slate-900 text-lg font-semibold">Start free with OTP</p>
                <p className="text-xs text-slate-500 mt-0.5">No password required</p>
                <div className="mt-5 flex flex-col gap-3">
                  <button className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-sky-600 hover:bg-sky-700 text-white px-5 py-3 font-medium shadow-sm">
                    👉 Login with OTP (Free)
                  </button>
                  <button className="w-full inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 font-medium text-sky-700 bg-sky-50 hover:bg-sky-100 ring-1 ring-sky-200">
                    🔍 Browse PYQs Without Login
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>

                {/* tiny reassurance */}
                <p className="mt-3 text-[11px] text-slate-500 text-center">
                  We’ll only use your number to send the OTP.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
