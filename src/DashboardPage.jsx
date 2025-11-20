import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Dashboard from "./components/Dashboard";

export default function DashboardPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("examsaathi:user");
      if (raw) setUser(JSON.parse(raw));
      else navigate("/", { replace: true });
    } catch (e) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  function handleLogout() {
    try {
      localStorage.removeItem("examsaathi:user");
    } catch {}
    navigate("/", { replace: true });
  }

  if (!user) return null;

  return <Dashboard user={user} onLogout={handleLogout} />;
}
