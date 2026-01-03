import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, Package, Briefcase, Mail, LogOut, LayoutDashboard } from "lucide-react";

const AdminNavbar = () => {
  const location = useLocation();

  const navLinks = [
    { href: "/admin/dashboard", label: "Dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
    { href: "/admin/products", label: "Products", icon: <Package className="w-4 h-4" /> },
    { href: "/admin/portfolio", label: "Portfolio", icon: <Briefcase className="w-4 h-4" /> },
    { href: "/admin/contact", label: "Contact", icon: <Mail className="w-4 h-4" /> },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem("adminAuthenticated");
    window.location.href = "/admin";
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/admin/dashboard" className="flex items-center gap-2 transition-all duration-300 hover:scale-105 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg text-slate-900">Admin Panel</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`flex items-center gap-2 font-medium text-sm transition-all duration-300 relative group py-2 px-3 rounded-lg ${
                  isActive(link.href) 
                    ? "text-blue-600 bg-blue-50" 
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            ))}
          </nav>

          {/* Logout Button */}
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleLogout}
              className="flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex gap-2 pb-3 overflow-x-auto">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`flex items-center gap-2 font-medium text-sm transition-all duration-300 py-2 px-3 rounded-lg whitespace-nowrap ${
                isActive(link.href) 
                  ? "text-blue-600 bg-blue-50" 
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;
