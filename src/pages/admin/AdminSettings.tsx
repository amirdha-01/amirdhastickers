import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AdminNavbar from "@/components/layout/AdminNavbar";
import { Settings } from "lucide-react";

const AdminSettings = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("adminAuthenticated") === "true";
    if (!isAuthenticated) {
      navigate("/admin");
    }
  }, [navigate]);

  return (
    <>
      <Helmet>
        <title>Settings - Admin Panel</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-slate-50">
        <AdminNavbar />

        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Settings</h1>
            <p className="text-slate-600">Configure your store settings</p>
          </div>

          {/* Placeholder Content */}
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <Settings className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-slate-900 mb-2">Settings Coming Soon</h2>
            <p className="text-slate-600">
              Store configuration options will be available here.
            </p>
          </div>
        </main>
      </div>
    </>
  );
};

export default AdminSettings;
