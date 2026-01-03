import { Helmet } from "react-helmet-async";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useStickerStore } from "@/store/stickerStore";
import StickerCard from "@/components/stickers/StickerCard";
import { Button } from "@/components/ui/button";

const Products = () => {
  const stickers = useStickerStore((state) => state.stickers);

  return (
    <>
      <Helmet>
        <title>Products - Amirdha Stickers</title>
        <meta 
          name="description" 
          content="Browse our collection of adhesive labels, logo/foil stickers, barcode labels, thermal rolls, and printing services." 
        />
      </Helmet>
      
      <div className="min-h-screen relative">
        <Navbar />
        <main className="pt-20">
          {/* Hero Section */}
          <section className="py-16 border-b border-slate-200/30 relative overflow-hidden bg-animated">
            <div className="animated-shape animated-shape-1" />
            <div className="animated-shape animated-shape-2" />
            <div className="animated-shape animated-shape-3" />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10" data-reveal="down">
              <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                  Our Products & Services
                </h1>
                <p className="text-lg text-slate-600">
                  Adhesive labels, logo/foil stickers, barcode labels, thermal rolls, and printing services.
                </p>
              </div>
            </div>
          </section>

          {/* Products Grid */}
          <section className="py-20 relative overflow-hidden bg-animated">
            <div className="animated-shape animated-shape-1" />
            <div className="animated-shape animated-shape-2" />
            <div className="animated-shape animated-shape-3" />
            <div className="animated-shape animated-shape-4" />
            <div className="animated-shape animated-shape-5" />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10" data-reveal-group>
              {stickers.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {stickers.map((sticker, index) => (
                    <StickerCard key={sticker.id} sticker={sticker} colorIndex={index} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <p className="text-slate-600 text-lg mb-8">
                    No products available yet. Check back soon!
                  </p>
                  <a href="/contact">
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                      Request Custom Design
                    </Button>
                  </a>
                </div>
              )}
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 border-t border-slate-200/30 relative overflow-hidden bg-animated">
            <div className="animated-shape animated-shape-1" />
            <div className="animated-shape animated-shape-2" />
            <div className="animated-shape animated-shape-3" />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10" data-reveal="up">
              <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">
                  Need a Custom Design?
                </h2>
                <p className="text-lg text-slate-600 mb-8">
                  We offer custom design services to bring your unique ideas to life.
                </p>
                <a href="/contact">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                    Request Custom Design
                  </Button>
                </a>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Products;
