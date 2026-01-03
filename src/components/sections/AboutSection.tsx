import { Heart, Palette, Truck, Leaf } from "lucide-react";
import { BorderTrail } from "@/components/ui/border-trail";

const features = [
  {
    icon: Heart,
    title: "Adhesive Labels",
    description: "Retail-ready adhesive and barcode labels with crisp print",
  },
  {
    icon: Palette,
    title: "Logo & Foil",
    description: "Logo and foil stickers that elevate brand presence and packaging",
  },
  {
    icon: Truck,
    title: "Thermal & Paper",
    description: "Thermal paper rolls plus paper printing for inserts and collateral",
  },
  {
    icon: Leaf,
    title: "Metalized Printing",
    description: "Specialized metalized printing and visiting cards produced with care",
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-12 md:py-16 lg:py-20 border-y border-slate-200/30 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-40 h-40 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
      <div className="absolute top-0 right-0 w-40 h-40 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-8 left-20 w-40 h-40 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="mb-12 md:mb-16 lg:mb-20 text-center max-w-3xl mx-auto fade-in-down px-2" data-reveal="down">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-3 md:mb-4 lg:mb-6 animate-heading">
            Why Choose Amirdha Stickers?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed animate-paragraph delay-100">
            Coimbatore-based retailer and supplier delivering adhesive labels, logo and foil stickers,
            barcode labels, thermal paper rolls, visiting cards, and paper/metalized printing services
            with attentive turnaround.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 max-w-6xl mx-auto" data-reveal-group>
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`relative p-5 sm:p-6 md:p-7 lg:p-8 bg-white rounded-lg border border-slate-200 transition-smooth hover-lift hover-glow fade-in-up delay-${100 * (index + 1)} group overflow-hidden`}
            >
              <BorderTrail
                className="bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500"
                size={80}
                transition={{
                  duration: 6 + index,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              <div className="w-12 sm:w-13 md:w-14 h-12 sm:h-13 md:h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-3 sm:mb-4 transition-all duration-300 group-hover:bg-blue-200 group-hover:scale-110">
                <feature.icon className="w-6 sm:w-6 md:w-7 h-6 sm:h-6 md:h-7 text-blue-600 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-125" />
              </div>
              <h3 className="font-bold text-base sm:text-lg md:text-xl text-slate-900 mb-2 sm:mb-3 transition-colors duration-300 group-hover:text-blue-600">
                {feature.title}
              </h3>
              <p className="text-slate-600 text-sm sm:text-sm md:text-base leading-relaxed transition-colors duration-300 group-hover:text-slate-700">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
