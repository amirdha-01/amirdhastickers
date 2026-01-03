import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from "lucide-react";
import whatsappLogo from "@/assets/whatsapp-logo.svg";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-12 md:py-16 lg:py-20 border-t border-slate-800 transition-all duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2 fade-in-up">
            <Link to="/" className="flex items-center gap-2 mb-4 md:mb-6 transition-smooth hover:scale-105 inline-block">
              <span className="font-bold text-lg md:text-xl hover:text-blue-500 transition-colors duration-300">
                Amirdha Stickers
              </span>
            </Link>
            <p className="text-slate-400 max-w-md mb-4 md:mb-6 text-sm md:text-base leading-relaxed">
              Retailer and supplier of adhesive labels, logo stickers, foil stickers, barcode labels,
              thermal paper rolls, and paper/metalized printing services based in
              Goldwins, Coimbatore.
            </p>
            <div className="flex gap-4 md:gap-5">
              <a 
                href="https://wa.me/918667423787" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-green-500 transition-all duration-300 hover:scale-125 hover:-translate-y-1 inline-block p-1"
                aria-label="WhatsApp"
              >
                <img src={whatsappLogo} alt="WhatsApp" className="w-5 h-5" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-blue-600 transition-all duration-300 hover:scale-125 hover:-translate-y-1 inline-block p-1"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-sky-500 transition-all duration-300 hover:scale-125 hover:-translate-y-1 inline-block p-1"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-pink-500 transition-all duration-300 hover:scale-125 hover:-translate-y-1 inline-block p-1"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="fade-in-up delay-100">
            <h4 className="font-bold text-base md:text-lg mb-3 md:mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2 md:space-y-3">
              <li>
                <Link to="/about" className="text-slate-400 hover:text-white transition-all duration-300 inline-block hover:translate-x-1 text-sm md:text-base">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-slate-400 hover:text-white transition-all duration-300 inline-block hover:translate-x-1 text-sm md:text-base">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="text-slate-400 hover:text-white transition-all duration-300 inline-block hover:translate-x-1 text-sm md:text-base">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-400 hover:text-white transition-all duration-300 inline-block hover:translate-x-1 text-sm md:text-base">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="fade-in-up delay-200">
            <h4 className="font-bold text-base md:text-lg mb-3 md:mb-4 text-white">Contact</h4>
            <ul className="space-y-2 md:space-y-3">
              <li className="flex items-start gap-2 md:gap-3 text-slate-400 transition-all duration-300 hover:text-white hover:translate-x-1 text-xs md:text-sm group">
                <Mail className="w-4 md:w-5 h-4 md:h-5 text-blue-500 flex-shrink-0 mt-0.5 transition-transform duration-300 group-hover:rotate-12" />
                <span className="break-all">amirdhastickers@gmail.com</span>
              </li>
              <li className="flex items-start gap-2 md:gap-3 text-slate-400 transition-all duration-300 hover:text-white hover:translate-x-1 text-xs md:text-sm group">
                <Phone className="w-4 md:w-5 h-4 md:h-5 text-blue-500 flex-shrink-0 mt-0.5 transition-transform duration-300 group-hover:rotate-12" />
                8667423787
              </li>
              <li className="flex items-start gap-2 md:gap-3 text-slate-400 transition-all duration-300 hover:text-white hover:translate-x-1 text-xs md:text-sm group">
                <MapPin className="w-4 md:w-5 h-4 md:h-5 text-blue-500 flex-shrink-0 mt-0.5 transition-transform duration-300 group-hover:rotate-12" />
                <span className="leading-snug">No 1, Duraiswamy Nagar, Goldwins, Coimbatore - 641014, TN</span>
              </li>
              <li className="flex items-start gap-2 md:gap-3 text-slate-400 transition-all duration-300 hover:text-white hover:translate-x-1 text-xs md:text-sm group">
                <MapPin className="w-4 md:w-5 h-4 md:h-5 text-blue-500 flex-shrink-0 mt-0.5 transition-transform duration-300 group-hover:rotate-12" />
                GST: 33FJIPK0171A1ZS
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 md:mt-12 lg:mt-16 pt-6 md:pt-8 text-center text-slate-500 fade-in-up delay-300 text-xs md:text-sm">
          <p>&copy; {new Date().getFullYear()} Amirdha Stickers. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
