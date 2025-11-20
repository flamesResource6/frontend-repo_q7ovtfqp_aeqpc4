export default function CTA() {
  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-sky-600 to-sky-700 text-white p-6 sm:p-8 ring-1 ring-white/20 shadow-xl overflow-hidden relative">
          <div className="absolute -right-10 -top-10 h-40 w-40 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute -left-10 -bottom-10 h-40 w-40 bg-emerald-400/10 rounded-full blur-2xl" />
          <div className="relative">
            <div className="max-w-2xl">
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">Start free — see your progress in a week.</h3>
              <p className="mt-2 text-sky-100">Login with OTP, take a mock, and get a clear study plan tailored to you.</p>
            </div>
            <div className="mt-4 flex flex-col sm:flex-row items-center gap-3">
              <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-white text-sky-700 hover:bg-sky-50 px-5 py-3 font-medium shadow-sm">
                👉 Login with OTP (Free)
              </button>
              <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-sky-500/30 hover:bg-sky-500/40 px-5 py-3 font-medium ring-1 ring-white/30">
                🔍 Browse PYQs Without Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
