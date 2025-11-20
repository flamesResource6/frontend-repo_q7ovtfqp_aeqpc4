import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-slate-50 border-t border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          <div className="max-w-2xl">
            <div className="text-2xl font-semibold tracking-tight text-slate-900">Examsaathi</div>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-600">
              Examsaathi – created by IIT Bombay & IIIT Hyderabad alumni to make exam prep simple, honest, and effective.
            </p>
          </div>
          <nav className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-600">
            <a href="#" className="hover:text-slate-900 transition-colors">About</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Contact</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Terms & Privacy</a>
          </nav>
        </div>
        <div className="mt-10 pt-6 border-t border-slate-200 text-xs sm:text-[13px] text-slate-500">
          <p>This platform is independent and not officially affiliated with any exam body.</p>
          <p className="mt-2">© {year} Examsaathi. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
