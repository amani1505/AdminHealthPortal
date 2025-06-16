
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to dashboard on load
    navigate("/dashboard");
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-slate-900 mb-2">HealthNexus</h1>
        <p className="text-slate-600">Redirecting to dashboard...</p>
      </div>
    </div>
  );
};

export default Index;
