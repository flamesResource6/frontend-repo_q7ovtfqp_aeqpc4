import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ChevronLeft, Clock, FileText, Settings2 } from "lucide-react";

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

export default function MockTestConfig() {
  const q = useQuery();
  const navigate = useNavigate();
  const exam = q.get("exam") || "jee-main";
  const [duration, setDuration] = useState(180);
  const [sections, setSections] = useState({ physics: true, chemistry: true, maths: true });

  function startTest() {
    navigate(`/mock/start?exam=${encodeURIComponent(exam)}&duration=${duration}&s=${Object.keys(sections).filter(k=>sections[k]).join(',')}`);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50/50 to-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg ring-1 ring-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-sm">
          <ChevronLeft className="h-4 w-4" /> Back
        </button>

        <div className="mt-4 rounded-2xl bg-white ring-1 ring-slate-200 p-5">
          <div className="flex items-start gap-3">
            <div className="h-11 w-11 rounded-2xl bg-sky-100 ring-1 ring-sky-200 grid place-items-center">
              <FileText className="h-6 w-6 text-sky-700" />
            </div>
            <div>
              <div className="text-lg font-bold text-slate-900">Configure Mock Test</div>
              <div className="text-sm text-slate-600">{exam.toUpperCase()} · Full-length</div>
            </div>
          </div>

          <div className="mt-4 space-y-4">
            <div>
              <div className="text-sm font-medium text-slate-800">Duration</div>
              <div className="mt-2 flex items-center gap-2">
                <button onClick={()=>setDuration(90)} className={`px-3 py-1.5 rounded-lg text-sm ring-1 ${duration===90? 'bg-sky-600 text-white ring-sky-600':'bg-white ring-slate-200'}`}>90m</button>
                <button onClick={()=>setDuration(120)} className={`px-3 py-1.5 rounded-lg text-sm ring-1 ${duration===120? 'bg-sky-600 text-white ring-sky-600':'bg-white ring-slate-200'}`}>120m</button>
                <button onClick={()=>setDuration(180)} className={`px-3 py-1.5 rounded-lg text-sm ring-1 ${duration===180? 'bg-sky-600 text-white ring-sky-600':'bg-white ring-slate-200'}`}>180m</button>
              </div>
            </div>

            <div>
              <div className="text-sm font-medium text-slate-800">Sections</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {Object.keys(sections).map((k)=> (
                  <button key={k} onClick={()=> setSections(s=>({ ...s, [k]: !s[k] }))} className={`capitalize px-3 py-1.5 rounded-lg text-sm ring-1 ${sections[k]? 'bg-emerald-600 text-white ring-emerald-600':'bg-white ring-slate-200'}`}>{k}</button>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <button onClick={startTest} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-sm font-semibold">
                <Clock className="h-4 w-4" /> Start Test
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
