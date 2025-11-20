import { ArrowRight, Star, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";

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
  const baseUrl = useMemo(() => {
    const raw = import.meta.env.VITE_BACKEND_URL || "";
    return raw ? raw.replace(/\/$/, "") : "";
  }, []);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("start"); // start | otp | success
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [demoOtp, setDemoOtp] = useState("");

  const validStart = name.trim().length >= 2 && phone.trim().length >= 8;
  const validOtp = otp.trim().length >= 4;

  async function handleStart(e) {
    e.preventDefault();
    if (!validStart || !baseUrl) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${baseUrl}/api/auth/start`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), phone: phone.trim() })
      });
      if (!res.ok) throw new Error((await res.json()).detail || "Failed to start OTP");
      const data = await res.json();
      setDemoOtp(data.demo_otp || "");
      setStep("otp");
    } catch (err) {
      setError(err?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleVerify(e) {
    e.preventDefault();
    if (!validOtp || !baseUrl) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${baseUrl}/api/auth/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: phone.trim(), otp: otp.trim() })
      });
      if (!res.ok) throw new Error((await res.json()).detail || "Invalid OTP");
      setStep("success");
    } catch (err) {
      setError(err?.message || "Verification failed. Try again.");
    } finally {
      setLoading(false);
    }
  }

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

        {/* Two-column hero: Left pitch, Right auth form */}
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
                <ShieldCheck className="h-4 w-4 text-sky-500" />
                Safe OTP login
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Auth card */}
          <div className="relative">
            <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-tr from-sky-200/40 via-emerald-200/30 to-transparent blur-2xl -z-10" />
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="mx-auto w-full max-w-md lg:max-w-sm"
            >
              <div className="relative rounded-2xl bg-white ring-1 ring-slate-200 shadow-xl p-5">
                <div className="flex items-center justify-between">
                  <div className="text-base font-semibold text-slate-900">Start free with OTP</div>
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
                    <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
                    <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
                  </div>
                </div>

                {step === "start" && (
                  <form onSubmit={handleStart} className="mt-4 space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-slate-700">Full name</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Ananya Sharma"
                        className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-slate-900 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700">Phone number</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="10-digit mobile"
                        className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-slate-900 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                    </div>

                    {error && (
                      <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{error}</div>
                    )}

                    <button
                      type="submit"
                      disabled={!validStart || loading || !baseUrl}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-sky-600 hover:bg-sky-700 disabled:bg-sky-300 text-white px-4 py-3 font-semibold shadow-sm shadow-sky-200 transition"
                    >
                      {loading ? "Sending OTP…" : "Login with OTP"}
                    </button>

                    <p className="text-xs text-slate-500 text-center">We’ll send a 6-digit code to verify your number.</p>
                  </form>
                )}

                {step === "otp" && (
                  <form onSubmit={handleVerify} className="mt-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-slate-700">Enter the OTP sent to</div>
                        <div className="text-sm font-semibold text-slate-900">{phone}</div>
                      </div>
                      {demoOtp && (
                        <span className="text-[10px] rounded-full bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 px-2 py-1">Demo OTP: {demoOtp}</span>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700">6-digit code</label>
                      <input
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={6}
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ""))}
                        placeholder="••••••"
                        className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 tracking-widest text-center text-lg text-slate-900 placeholder-slate-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                    </div>

                    {error && (
                      <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{error}</div>
                    )}

                    <button
                      type="submit"
                      disabled={!validOtp || loading || !baseUrl}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-300 text-white px-4 py-3 font-semibold shadow-sm shadow-emerald-200 transition"
                    >
                      {loading ? "Verifying…" : "Verify & Continue"}
                    </button>

                    <button
                      type="button"
                      onClick={handleStart}
                      disabled={loading || !baseUrl}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 font-medium text-sky-700 bg-sky-50 hover:bg-sky-100 ring-1 ring-sky-200 transition"
                    >
                      Resend OTP
                    </button>
                  </form>
                )}

                {step === "success" && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 text-center">
                    <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 px-3 py-1 text-sm font-semibold">
                      <ShieldCheck className="h-4 w-4" /> Phone verified
                    </div>
                    <h3 className="mt-4 text-xl font-bold text-slate-900">Welcome, {name.split(" ")[0] || "there"}! 🎉</h3>
                    <p className="mt-2 text-slate-600">Your personalized plan is ready. You can now explore PYQs, take mock tests, and connect with mentors.</p>
                    <div className="mt-6 grid grid-cols-3 gap-4 text-left">
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
                    <div className="mt-6 flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
                      <a href="#pyqs" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white px-6 py-3.5 font-semibold shadow-sm shadow-sky-200 transition">
                        👉 Start practicing PYQs
                      </a>
                      <a href="#features" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 font-semibold text-sky-700 bg-sky-50 hover:bg-sky-100 ring-1 ring-sky-200 transition">
                        Explore features
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
