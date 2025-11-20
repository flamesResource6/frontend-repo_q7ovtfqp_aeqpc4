import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import CTA from "./components/CTA";

function App() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <Hero />
      <Features />
      <CTA />
      <footer className="py-8 border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} Examsaathi. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default App;
