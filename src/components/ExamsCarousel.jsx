import { useMemo } from "react";

export default function ExamsCarousel() {
  const exams = useMemo(
    () => [
      "JEE Main",
      "JEE Advanced",
      "BITSAT",
      "VITEEE",
      "SRMJEEE",
      "WBJEE",
      "MHT CET",
      "COMEDK",
      "KEAM",
      "KCET",
      "EAMCET",
      "AP EAMCET",
      "TS EAMCET",
      "CUSAT CAT",
      "AMUEEE",
      "GUJCET",
      "CBSE",
      "ISC",
      "ICSE",
    ],
    []
  );

  const renderRow = (keyPrefix = "a") => (
    <div className="flex items-center gap-2.5 pr-2.5" aria-hidden>
      {exams.map((name, i) => (
        <div
          key={`${keyPrefix}-${name}-${i}`}
          className="inline-flex items-center gap-2 rounded-xl bg-white ring-1 ring-slate-200 px-2.5 py-1.5 shadow-sm hover:shadow transition-shadow"
        >
          <span
            className="h-6 w-6 shrink-0 rounded-full bg-gradient-to-br from-sky-400 to-emerald-400 text-white text-[10px] font-bold flex items-center justify-center"
            aria-hidden
          >
            {name
              .replace(/[^A-Za-z ]/g, "")
              .split(" ")
              .slice(0, 2)
              .map((s) => s[0])
              .join("")}
          </span>
          <span className="text-[13px] text-slate-700 whitespace-nowrap">{name}</span>
        </div>
      ))}
    </div>
  );

  return (
    <section className="py-5 border-t border-slate-200/70 bg-white/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <p className="text-[12px] sm:text-[13px] text-slate-500">Covers all major boards and engineering entrance exams</p>
        </div>

        <div className="mt-3 relative overflow-hidden group">
          <style>{`
            @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .marquee-track { display: flex; width: max-content; animation: marquee 26s linear infinite; }
            .group:hover .marquee-track { animation-play-state: paused; }
          `}</style>
          <div className="marquee-track">
            {renderRow("row1")}
            {renderRow("row2")}
          </div>
        </div>
      </div>
    </section>
  );
}
