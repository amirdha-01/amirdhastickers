import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from "lucide-react";
import whatsappLogo from "@/assets/whatsapp-logo.svg";
import { motion } from "framer-motion";

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <footer className="bg-slate-900 text-white py-12 md:py-16 lg:py-20 border-t border-slate-800 transition-all duration-300 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 lg:gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Brand */}
          <motion.div 
            className="col-span-1 md:col-span-2 bg-slate-800/30 p-6 rounded-lg border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300"
            variants={itemVariants}
            whileHover={{ scale: 1.02, boxShadow: "0 10px 30px -10px rgba(59, 130, 246, 0.3)" }}
          >
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
              <motion.a 
                href="https://wa.me/918667423787" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-green-500 transition-colors duration-300 inline-block p-1"
                aria-label="WhatsApp"
                whileHover={{ scale: 1.3, rotate: 360 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <img src={whatsappLogo} alt="WhatsApp" className="w-5 h-5" />
              </motion.a>
              <motion.a 
                href="https://facebook.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-blue-600 transition-colors duration-300 inline-block p-1"
                aria-label="Facebook"
                whileHover={{ scale: 1.3, rotate: 360 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Facebook className="w-5 h-5" />
              </motion.a>
              <motion.a 
                href="https://twitter.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-sky-500 transition-colors duration-300 inline-block p-1"
                aria-label="Twitter"
                whileHover={{ scale: 1.3, rotate: 360 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Twitter className="w-5 h-5" />
              </motion.a>
              <motion.a 
                href="https://instagram.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-pink-500 transition-colors duration-300 inline-block p-1"
                aria-label="Instagram"
                whileHover={{ scale: 1.3, rotate: 360 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div 
            className="bg-slate-800/30 p-6 rounded-lg border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300"
            variants={itemVariants}
            whileHover={{ scale: 1.02, boxShadow: "0 10px 30px -10px rgba(59, 130, 246, 0.3)" }}
          >
            <h4 className="font-bold text-base md:text-lg mb-3 md:mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2 md:space-y-3">
              <motion.li whileHover={{ x: 10 }} transition={{ type: "spring", stiffness: 300 }}>
                <Link to="/about" className="text-slate-400 hover:text-white transition-all duration-300 inline-block text-sm md:text-base">
                  About Us
                </Link>
              </motion.li>
              <motion.li whileHover={{ x: 10 }} transition={{ type: "spring", stiffness: 300 }}>
                <Link to="/products" className="text-slate-400 hover:text-white transition-all duration-300 inline-block text-sm md:text-base">
                  Products
                </Link>
              </motion.li>
              <motion.li whileHover={{ x: 10 }} transition={{ type: "spring", stiffness: 300 }}>
                <Link to="/portfolio" className="text-slate-400 hover:text-white transition-all duration-300 inline-block text-sm md:text-base">
                  Portfolio
                </Link>
              </motion.li>
              <motion.li whileHover={{ x: 10 }} transition={{ type: "spring", stiffness: 300 }}>
                <Link to="/contact" className="text-slate-400 hover:text-white transition-all duration-300 inline-block text-sm md:text-base">
                  Contact
                </Link>
              </motion.li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div 
            className="bg-slate-800/30 p-6 rounded-lg border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 flex flex-col"
            variants={itemVariants}
            whileHover={{ scale: 1.02, boxShadow: "0 10px 30px -10px rgba(59, 130, 246, 0.3)" }}
          >
            <h4 className="font-bold text-base md:text-lg mb-4 md:mb-5 text-white">Contact</h4>
            <ul className="space-y-3 md:space-y-4">
              <motion.li 
                className="flex items-center gap-3 text-slate-400 transition-colors duration-300 hover:text-white text-sm group"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Phone className="w-5 h-5 text-blue-500 flex-shrink-0 transition-transform duration-300 group-hover:rotate-12" />
                <span>8667423787 / 9894659664</span>
              </motion.li>
              <motion.li 
                className="flex items-center gap-3 text-slate-400 transition-colors duration-300 hover:text-white text-sm group"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Mail className="w-5 h-5 text-blue-500 flex-shrink-0 transition-transform duration-300 group-hover:rotate-12" />
                <span className="break-all">amirdhastickers@gmail.com</span>
              </motion.li>
              <motion.li 
                className="flex items-start gap-3 text-slate-400 transition-colors duration-300 hover:text-white text-sm group"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <MapPin className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5 transition-transform duration-300 group-hover:rotate-12" />
                <span className="leading-relaxed">No 1, Duraiswamy Nagar, Goldwins, Coimbatore - 641014, TN</span>
              </motion.li>
              <motion.li 
                className="flex items-start gap-3 text-slate-400 transition-colors duration-300 hover:text-white text-sm pt-2"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="font-semibold text-white">GSTIN:</span> 
                <span className="break-all">33FJIPK0171A1ZS</span>
              </motion.li>
            </ul>
          </motion.div>
        </motion.div>

        <motion.div 
          className="border-t border-slate-800 mt-8 md:mt-12 lg:mt-16 pt-6 md:pt-8 text-center text-slate-500 text-xs md:text-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <p>&copy; {new Date().getFullYear()} Amirdha Stickers. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
