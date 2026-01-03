import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Sparkles, Home, Info, Package, Briefcase, Mail } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { href: "/", label: "Home", icon: <Home className="w-4 h-4" /> },
    { href: "/about", label: "About Us", icon: <Info className="w-4 h-4" /> },
    { href: "/products", label: "Products", icon: <Package className="w-4 h-4" /> },
    { href: "/portfolio", label: "Portfolio", icon: <Briefcase className="w-4 h-4" /> },
    { href: "/contact", label: "Contact", icon: <Mail className="w-4 h-4" /> },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 max-w-7xl">
          <div className="flex items-center justify-between h-14 sm:h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 transition-all duration-300 hover:scale-105 flex-shrink-0 group">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300 group-hover:rotate-12 group-hover:text-blue-600" />
              <span className="font-bold text-base sm:text-lg md:text-xl text-slate-900 group-hover:text-blue-600 transition-colors duration-300 whitespace-nowrap relative">
                Amirdha Stickers
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`font-medium text-xs lg:text-sm transition-all duration-300 relative group py-1 ${
                    isActive(link.href) ? "text-blue-600" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <span className="relative z-10">{link.label}</span>
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 ${
                    isActive(link.href) 
                      ? "w-full" 
                      : "w-0 group-hover:w-full"
                  }`}></span>
                  <span className="absolute inset-0 -z-10 bg-blue-50 rounded-md scale-0 group-hover:scale-100 transition-transform duration-300 opacity-0 group-hover:opacity-100"></span>
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:flex items-center gap-4">
              <Link to="/contact" className="transition-smooth hover-lift group">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-xl text-xs lg:text-sm px-3 lg:px-4 relative overflow-hidden">
                  <span className="relative z-10 flex items-center gap-1">
                    Get in Touch
                    <Sparkles className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </span>
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent"></span>
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-1 sm:p-2 text-slate-600 hover:text-slate-900 transition-all duration-300 flex-shrink-0 hover:bg-blue-50 rounded-md relative group"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              <span className="absolute inset-0 bg-blue-100 rounded-md scale-0 group-hover:scale-100 transition-transform duration-300 opacity-0 group-hover:opacity-50"></span>
              {isOpen ? (
                <X className="w-6 h-6 transition-transform duration-300 rotate-0 hover:rotate-90" />
              ) : (
                <Menu className="w-6 h-6 transition-transform duration-300 hover:scale-110" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}>
            <div className="py-3 sm:py-4 border-t border-slate-200 bg-white">
              <div className="flex flex-col gap-3">
                {navLinks.map((link, index) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`font-medium py-2 px-3 rounded-lg transition-all duration-300 text-sm relative overflow-hidden group ${
                      isActive(link.href) 
                        ? "text-blue-600 bg-blue-50 shadow-sm" 
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                    }`}
                    style={{ 
                      animationDelay: `${index * 50}ms`,
                      transform: isOpen ? 'translateX(0)' : 'translateX(-20px)',
                      opacity: isOpen ? 1 : 0,
                      transition: `all 300ms ease ${index * 50}ms`
                    }}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {link.icon}
                      {link.label}
                      {isActive(link.href) && <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse"></span>}
                    </span>
                    <span className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-600 to-purple-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
                  </Link>
                ))}
                <div className="flex flex-col gap-2 pt-3 sm:pt-4 border-t border-slate-200">
                  <Link to="/contact" onClick={() => setIsOpen(false)} className="transition-smooth hover-lift group">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-sm relative overflow-hidden">
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        Get in Touch
                        <Sparkles className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </span>
                      <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent"></span>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
  );
};

export default Navbar;

