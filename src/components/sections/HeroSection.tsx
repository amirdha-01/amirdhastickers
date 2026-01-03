import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="pt-20 sm:pt-24 md:pt-32 lg:pt-40 pb-12 sm:pb-16 md:pb-20 lg:pb-24 relative overflow-hidden min-h-[85vh] sm:min-h-[90vh] md:min-h-[600px] lg:min-h-screen flex items-center">
      {/* Animated Background Shapes */}
      <div className="animated-shape animated-shape-1" />
      <div className="animated-shape animated-shape-2" />
      <div className="animated-shape animated-shape-3" />
      <div className="animated-shape animated-shape-4" />
      <div className="animated-shape animated-shape-5" />

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full" data-reveal="up">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-slate-900 mb-3 sm:mb-4 md:mb-6 lg:mb-8 leading-tight animate-heading px-2 sm:px-0">
            <span className="inline-block animate-slide-letters">Amirdha</span>{" "}
            <span className="inline-block animate-slide-letters" style={{animationDelay: '0.1s'}}>Stickers</span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-slate-600 mb-5 sm:mb-6 md:mb-8 lg:mb-10 leading-relaxed max-w-3xl mx-auto fade-in-up delay-100 px-4 sm:px-6">
            Retailer and supplier for adhesive labels, logo stickers, foil stickers, barcode labels,
            thermal paper rolls, and custom paper/metalized printing services.
            <span className="block mt-2 md:mt-3 text-slate-700 font-semibold">In Goldwins, Coimbatore</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mb-8 sm:mb-10 md:mb-12 lg:mb-16 fade-in-up delay-200 px-4 sm:px-6">
            <Link to="/products" className="w-full sm:w-auto transition-smooth hover-lift">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto text-sm sm:text-base md:text-lg transition-all duration-300 shadow-lg hover:shadow-2xl h-12 md:h-14">
                View Products & Services
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/contact" className="w-full sm:w-auto transition-smooth hover-lift">
              <Button variant="outline" size="lg" className="w-full sm:w-auto text-sm sm:text-base md:text-lg transition-all duration-300 border-2 hover:bg-slate-50 h-12 md:h-14">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
