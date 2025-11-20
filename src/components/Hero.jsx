import { ArrowRight, Star, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export default function Hero() {
  const baseUrl = useMemo(() => {
    const raw = import.meta.env.VITE_BACKEND_URL || "";
    return raw ? raw.replace(/\/$/, "") : "";
  }, []);

  const navigate = useNavigate();

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
      // Persist lightweight session and go to dashboard
      try {
        localStorage.setItem(
          "examsaathi:user",
          JSON.stringify({ name: name.trim(), phone: phone.trim(), createdAt: Date.now() })
        );
      } catch {}
      navigate("/dashboard");
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
        <svg className="absolute inset-0 h-full w-full opacity-[0.14]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="28" height="28" patternUnits="userSpaceOnUse">
              <path d="M 28 0 L 0 0 0 28" fill="none" stroke="#0ea5e9" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 pb-10">
        {/* Top trust strip */}
        <div className="flex items-start justify-start text-left">
          <motion.div
            initial={{ y: -8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.45 }}
            className="inline-flex flex-wrap items-center gap-3 rounded-full bg-white/80 backdrop-blur px-3 py-1 ring-1 ring-slate-200 shadow-sm"
          >
            <span className="text-xs text-slate-700">Built by Alumni</span>
            <span className="hidden sm:inline-block h-1 w-1 rounded-full bg-slate-300" aria-hidden />
            <span className="inline-flex items-center gap-2">
              <img src="/iitr-mark.svg" alt="IIT Bombay logo" className="h-4 w-auto opacity-90" />
              <span className="text-xs font-medium text-slate-700">IIT Bombay</span>
            </span>
            <span className="inline-flex items-center gap-2">
              <img src="/iiith-mark.svg" alt="IIIT Hyderabad logo" className="h-4 w-auto opacity-90" />
              <span className="text-xs font-medium text-slate-700">IIIT Hyderabad</span>
            </span>
          </motion.div>
        </div>

        {/* Two-column hero: Left pitch, Right auth form */}
        <div className="mt-6 grid lg:grid-cols-2 gap-8 items-center">
          {/* Left: pitch */}
          <motion.div variants={container} initial="hidden" animate="show" className="text-center lg:text-left">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 rounded-full bg-sky-100 text-sky-700 px-2.5 py-1 text-[12px] font-medium ring-1 ring-sky-200">
              <Star className="h-3 w-3 fill-sky-600 text-sky-600" />
              Your all-in-one exam companion
            </motion.div>

            <motion.h1 variants={fadeUp} className="mt-3 text-[28px] sm:text-[38px] lg:text-[44px] font-extrabold tracking-tight text-slate-900 leading-[1.05]">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-sky-700 to-emerald-600">
                Ace JEE & Boards with Confidence
              </span>
            </motion.h1>

            <motion.p variants={fadeUp} className="mt-3 text-slate-600 text-[15px] sm:text-[16px] leading-relaxed">
              Smart planning, honest guidance, and powerful practice tools — all in one clean dashboard.
            </motion.p>

            {/* Quick highlights */}
            <motion.div variants={fadeUp} className="mt-5 flex items-center justify-center lg:justify-start gap-5 text-[13px] text-slate-500">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
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
            <div className="absolute -inset-5 rounded-2xl bg-gradient-to-tr from-sky-200/40 via-emerald-200/30 to-transparent blur-2xl -z-10" />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mx-auto w-full max-w-md lg:max-w-sm"
            >
              <div className="relative rounded-2xl bg-white ring-1 ring-slate-200 shadow-xl p-4">
                <div className="flex items-center justify-between">
                  <div className="text-[15px] font-semibold text-slate-900">Start free with OTP</div>
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-slate-200" />
                    <span className="h-2 w-2 rounded-full bg-slate-200" />
                    <span className="h-2 w-2 rounded-full bg-slate-200" />
                  </div>
                </div>

                {step === "start" && (
                  <form onSubmit={handleStart} className="mt-3 space-y-2.5">
                    <div>
                      <label className="block text-[13px] font-medium text-slate-700">Full name</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Ananya Sharma"
                        className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[13px] font-medium text-slate-700">Phone number</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="10-digit mobile"
                        className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                    </div>

                    {error && (
                      <div className="text-[13px] text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{error}</div>
                    )}

                    <button
                      type="submit"
                      disabled={!validStart || loading || !baseUrl}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-sky-600 hover:bg-sky-700 disabled:bg-sky-300 text-white px-4 py-2.5 font-semibold shadow-sm shadow-sky-200 transition"
                    >
                      {loading ? "Sending OTP…" : "Login with OTP"}
                    </button>

                    <p className="text-[11px] text-slate-500 text-center">We’ll send a 6-digit code to verify your number.</p>
                  </form>
                )}

                {step === "otp" && (
                  <form onSubmit={handleVerify} className="mt-3 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-[13px] text-slate-700">Enter the OTP sent to</div>
                        <div className="text-sm font-semibold text-slate-900">{phone}</div>
                      </div>
                      {demoOtp && (
                        <span className="text-[10px] rounded-full bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 px-2 py-1">Demo OTP: {demoOtp}</span>
                      )}
                    </div>
                    <div>
                      <label className="block text-[13px] font-medium text-slate-700">6-digit code</label>
                      <input
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={6}
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ""))}
                        placeholder="••••••"
                        className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 tracking-widest text-center text-lg text-slate-900 placeholder-slate-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                    </div>

                    {error && (
                      <div className="text-[13px] text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{error}</div>
                    )}

                    <button
                      type="submit"
                      disabled={!validOtp || loading || !baseUrl}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-300 text-white px-4 py-2.5 font-semibold shadow-sm shadow-emerald-200 transition"
                    >
                      {loading ? "Verifying…" : "Verify & Continue"}
                    </button>

                    <button
                      type="button"
                      onClick={handleStart}
                      disabled={loading || !baseUrl}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 font-medium text-sky-700 bg-sky-50 hover:bg-sky-100 ring-1 ring-sky-200 transition"
                    >
                      Resend OTP
                    </button>
                  </form>
                )}

                {step === "success" && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-5 text-center">
                    <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 px-3 py-1 text-sm font-semibold">
                      <ShieldCheck className="h-4 w-4" /> Phone verified
                    </div>
                    <h3 className="mt-3 text-lg font-bold text-slate-900">Welcome, {name.split(" ")[0] || "there"}! 🎉</h3>
                    <p className="mt-2 text-slate-600 text-[15px]">Redirecting to your dashboard…</p>
                    <div className="mt-4">
                      <button onClick={() => navigate('/dashboard')} className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white px-5 py-3 font-semibold shadow-sm shadow-sky-200 transition">
                        Go now
                        <ArrowRight className="h-4 w-4" />
                      </button>
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
