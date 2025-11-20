import { Menu } from "lucide-react";

export default function Navbar() {
  return (
    <header className="w-full">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-white/80 backdrop-blur shadow-sm flex items-center justify-center ring-1 ring-slate-200">
            <span className="text-sky-600 font-bold text-sm">Ex</span>
          </div>
          <div className="leading-tight">
            <p className="text-slate-900 font-semibold text-base tracking-tight">Examsaathi</p>
            <p className="text-slate-500 text-[11px]">Your all-in-one exam companion</p>
          </div>
        </div>
        <button className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[13px] font-medium text-slate-700 ring-1 ring-slate-200/80 bg-white/70 hover:bg-white transition">
          <Menu className="h-4 w-4" />
          Menu
        </button>
      </div>
    </header>
  );
}
