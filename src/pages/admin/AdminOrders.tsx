import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AdminNavbar from "@/components/layout/AdminNavbar";
import { ShoppingCart } from "lucide-react";

const AdminOrders = () => {
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
        <title>Orders - Admin Panel</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-slate-50">
        <AdminNavbar />

        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Orders</h1>
            <p className="text-slate-600">View and manage customer orders</p>
          </div>

          {/* Placeholder Content */}
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <ShoppingCart className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-slate-900 mb-2">No Orders Yet</h2>
            <p className="text-slate-600">
              Orders from customers will appear here once they start placing orders.
            </p>
          </div>
        </main>
      </div>
    </>
  );
};

export default AdminOrders;
