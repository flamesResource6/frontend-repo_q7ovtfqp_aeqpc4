import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Riya",
    meta: "Class 12, JEE Aspirant",
    quote:
      "Examsaathi helped me understand where I stood and which chapters to focus on. The JEE ranker session cleared all my confusion.",
  },
  {
    name: "Arjun",
    meta: "Class 11, CBSE + JEE",
    quote:
      "I was stressed between boards and JEE. The plan I got from my mentor made everything manageable.",
  },
  {
    name: "Sneha",
    meta: "Dropper, JEE + MHT CET",
    quote:
      "The college predictor gave my parents clarity on realistic options based on my mock scores.",
  },
  {
    name: "Kabir",
    meta: "Class 12, BITSAT + Boards",
    quote:
      "Mock test analytics showed me exactly where I was losing marks. Small tweaks improved my scores in two weeks.",
  },
];

function TestimonialCard({ name, meta, quote }) {
  return (
    <div className="group relative rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md">
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-sky-50/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none" />
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-100 text-sky-700 font-semibold">
          {name.charAt(0)}
        </div>
        <div>
          <div className="font-semibold text-slate-900 text-[15px]">{name}</div>
          <div className="text-[12px] text-slate-500">{meta}</div>
        </div>
        <div className="ml-auto flex items-center gap-0.5 text-amber-500" aria-hidden>
          <Star size={14} fill="currentColor" />
          <Star size={14} fill="currentColor" />
          <Star size={14} fill="currentColor" />
          <Star size={14} fill="currentColor" />
          <Star size={14} />
        </div>
      </div>
      <p className="mt-3 text-[13px] leading-relaxed text-slate-700">
        “{quote}”
      </p>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="py-14 sm:py-16 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            What Students Say About Their Saathi
          </h2>
          <p className="mt-2.5 text-slate-600 text-[13px] sm:text-[14px]">
            Real stories from 11–12 and dropper students who used Examsaathi to
            balance boards and entrances with clarity and confidence.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} {...t} />
          ))}
        </div>
      </div>
    </section>
  );
}
