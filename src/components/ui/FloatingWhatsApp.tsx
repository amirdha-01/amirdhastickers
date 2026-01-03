import { useState, useEffect } from "react";
import whatsappLogo from "@/assets/whatsapp-logo.svg";

const FloatingWhatsApp = () => {
  const [isVisible, setIsVisible] = useState(false);
  const whatsappNumber = "918667423787"; // +91 8667423787
  const message = "Hello! I'm interested in your sticker products.";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  useEffect(() => {
    // Show button after a short delay for better UX
    const timer = setTimeout(() => setIsVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 bg-green-500 hover:bg-green-600 active:bg-green-700 text-white rounded-full p-3 md:p-4 shadow-lg md:shadow-2xl transition-all duration-500 hover:scale-110 active:scale-95 group ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      aria-label="Chat on WhatsApp"
    >
      <img 
        src={whatsappLogo} 
        alt="WhatsApp" 
        className="w-7 h-7 md:w-8 md:h-8 animate-pulse group-hover:animate-none"
      />
      
      {/* Ripple effect */}
      <span className="absolute inset-0 rounded-full bg-green-400 opacity-0 group-hover:opacity-30 group-hover:scale-150 transition-all duration-700" />
      
      {/* Tooltip - Hidden on mobile, visible on desktop */}
      <span className="hidden md:block absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-lg">
        Chat with us on WhatsApp
      </span>
    </a>
  );
};

export default FloatingWhatsApp;
