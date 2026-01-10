import { Link } from "react-router-dom";
import { useStickerStore } from "@/store/stickerStore";
import StickerCard from "@/components/stickers/StickerCard";
import { Button } from "@/components/ui/button";

const GallerySection = () => {
  const stickers = useStickerStore((state) => state.stickers);
  const featuredStickers = stickers.filter((s) => s.featured).slice(0, 6);
  const displayStickers = featuredStickers.length > 0 ? featuredStickers : stickers.slice(0, 6);

  return (
    <section id="gallery" className="py-12 md:py-16 lg:py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-white/20 to-purple-50/30 z-0" />
      <div className="absolute top-10 right-10 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob" />
      <div className="absolute bottom-10 left-10 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="mb-12 md:mb-16 lg:mb-20 text-center max-w-3xl mx-auto fade-in-down px-2" data-reveal="down">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-3 md:mb-4 lg:mb-6 animate-heading">
            Featured Products & Services
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed animate-paragraph delay-100">
            Explore adhesive labels, logo stickers, foil finishes, barcode labels, thermal paper rolls,
            visiting cards, and printing services tailored for retail and branding.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 max-w-6xl mx-auto" data-reveal-group>
          {displayStickers.map((sticker, index) => (
            <div key={sticker.id} className={`fade-in-up delay-${100 * (index + 1)}`}>
              <StickerCard sticker={sticker} colorIndex={index} />
            </div>
          ))}
        </div>

        {stickers.length === 0 && (
          <div className="text-center py-12 md:py-16 lg:py-20 fade-in-up px-4">
            <p className="text-slate-600 text-base md:text-lg lg:text-xl mb-6 md:mb-8">
              No stickers available yet. Check back soon!
            </p>
          </div>
        )}

        <div className="text-center mt-10 sm:mt-12 md:mt-16 lg:mt-20 fade-in-up delay-300 px-4 sm:px-6">
          <Link to="/contact" className="transition-smooth hover-lift inline-block w-full sm:w-auto">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-2xl text-sm sm:text-base md:text-lg px-6 sm:px-7 md:px-8 w-full sm:w-auto h-12 sm:h-12 md:h-14">
              Request Custom Design
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
