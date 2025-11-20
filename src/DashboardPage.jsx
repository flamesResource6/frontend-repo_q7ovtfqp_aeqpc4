import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Dashboard from "./components/Dashboard";

export default function DashboardPage() {
  const navigate = useNavigate();
  // Unlock dashboard: provide a default demo user if none is stored
  const [user, setUser] = useState({ name: "Demo Student", phone: "0000000000" });

  useEffect(() => {
    try {
      const raw = localStorage.getItem("examsaathi:user");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === "object") setUser(parsed);
      }
    } catch {}
  }, []);

  function handleLogout() {
    try {
      localStorage.removeItem("examsaathi:user");
    } catch {}
    navigate("/", { replace: true });
  }

  return <Dashboard user={user} onLogout={handleLogout} />;
}
