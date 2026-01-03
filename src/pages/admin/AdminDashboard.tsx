import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AdminNavbar from "@/components/layout/AdminNavbar";
import { useStickerStore } from "@/store/stickerStore";
import { Package, Briefcase, Mail, TrendingUp } from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { stickers } = useStickerStore();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("adminAuthenticated") === "true";
    if (!isAuthenticated) {
      navigate("/admin");
    }
  }, [navigate]);

  const stats = [
    {
      label: "Total Products",
      value: stickers.length,
      icon: Package,
      color: "bg-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      label: "Featured Products",
      value: stickers.filter((s) => s.featured).length,
      icon: TrendingUp,
      color: "bg-purple-500",
      bgColor: "bg-purple-50",
    },
    {
      label: "Categories",
      value: new Set(stickers.map((s) => s.category)).size,
      icon: Package,
      bgColor: "bg-green-50",
      color: "bg-green-500",
    },
    {
      label: "Portfolio Items",
      value: JSON.parse(localStorage.getItem("portfolioItems") || "[]").length,
      icon: Briefcase,
      color: "bg-orange-500",
      bgColor: "bg-orange-50",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Dashboard - Admin Panel</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-slate-50">
        <AdminNavbar />

        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Dashboard</h1>
            <p className="text-slate-600">Welcome to your admin dashboard</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className={`${stat.bgColor} rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`${stat.color} w-12 h-12 rounded-xl flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <p className="text-sm font-medium text-slate-600 mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <a
                href="/admin/products"
                className="p-4 border-2 border-slate-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-300"
              >
                <Package className="w-8 h-8 text-blue-600 mb-2" />
                <h3 className="font-bold text-slate-900">Manage Products</h3>
                <p className="text-sm text-slate-600">Add, edit, or delete products</p>
              </a>
              <a
                href="/admin/portfolio"
                className="p-4 border-2 border-slate-200 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-all duration-300"
              >
                <Briefcase className="w-8 h-8 text-purple-600 mb-2" />
                <h3 className="font-bold text-slate-900">Manage Portfolio</h3>
                <p className="text-sm text-slate-600">Update showcase items</p>
              </a>
              <a
                href="/admin/contact"
                className="p-4 border-2 border-slate-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all duration-300"
              >
                <Mail className="w-8 h-8 text-green-600 mb-2" />
                <h3 className="font-bold text-slate-900">Contact Info</h3>
                <p className="text-sm text-slate-600">Update contact details</p>
              </a>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default AdminDashboard;
