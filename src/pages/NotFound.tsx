import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center relative overflow-hidden bg-animated">
      <div className="animated-shape animated-shape-1" />
      <div className="animated-shape animated-shape-2" />
      <div className="animated-shape animated-shape-3" />
      <div className="animated-shape animated-shape-4" />
      <div className="animated-shape animated-shape-5" />
      <div className="text-center relative z-10">
        <h1 className="mb-4 text-6xl md:text-8xl font-bold text-slate-900 animate-bounce">404</h1>
        <p className="mb-4 text-xl md:text-2xl text-slate-600 animate-fade-in-up">Oops! Page not found</p>
        <a href="/" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 hover:shadow-lg no-underline">
          ← Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
