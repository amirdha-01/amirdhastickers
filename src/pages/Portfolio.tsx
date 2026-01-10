import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { BorderTrail } from "@/components/ui/border-trail";

// Cloudinary URLs for sample images
const adhesiveLabel = "https://res.cloudinary.com/donwqvg6t/image/upload/v1767330663/portfolio/samples/adhesive%20label.jpg";
const sample1 = "https://res.cloudinary.com/donwqvg6t/image/upload/v1767330665/portfolio/samples/WhatsApp%20Image%202025-12-21%20at%2010.01.18%20AM.jpg";
const sample2 = "https://res.cloudinary.com/donwqvg6t/image/upload/v1767330667/portfolio/samples/WhatsApp%20Image%202025-12-21%20at%2010.01.19%20AM.jpg";
const sample3 = "https://res.cloudinary.com/donwqvg6t/image/upload/v1767330669/portfolio/samples/WhatsApp%20Image%202025-12-21%20at%2010.01.20%20AM%20%281%29.jpg";
const sample4 = "https://res.cloudinary.com/donwqvg6t/image/upload/v1767330671/portfolio/samples/WhatsApp%20Image%202025-12-21%20at%2010.01.20%20AM%20%282%29.jpg";
const sample5 = "https://res.cloudinary.com/donwqvg6t/image/upload/v1767330673/portfolio/samples/WhatsApp%20Image%202025-12-21%20at%2010.01.20%20AM.jpg";
const sample6 = "https://res.cloudinary.com/donwqvg6t/image/upload/v1767330676/portfolio/samples/WhatsApp%20Image%202025-12-21%20at%2010.01.21%20AM%20%281%29.jpg";
const sample7 = "https://res.cloudinary.com/donwqvg6t/image/upload/v1767330678/portfolio/samples/WhatsApp%20Image%202025-12-21%20at%2010.01.21%20AM%20%282%29.jpg";
const sample8 = "https://res.cloudinary.com/donwqvg6t/image/upload/v1767330680/portfolio/samples/WhatsApp%20Image%202025-12-21%20at%2010.01.21%20AM.jpg";
const sample9 = "https://res.cloudinary.com/donwqvg6t/image/upload/v1767330682/portfolio/samples/WhatsApp%20Image%202025-12-21%20at%2010.08.48%20AM.jpg";
const sample10 = "https://res.cloudinary.com/donwqvg6t/image/upload/v1767330684/portfolio/samples/WhatsApp%20Image%202025-12-21%20at%2010.08.51%20AM.jpg";
const sample11 = "https://res.cloudinary.com/donwqvg6t/image/upload/v1767330686/portfolio/samples/WhatsApp%20Image%202025-12-21%20at%2010.08.53%20AM.jpg";
const sample12 = "https://res.cloudinary.com/donwqvg6t/image/upload/v1767330688/portfolio/samples/WhatsApp%20Image%202025-12-21%20at%2010.08.58%20AM.jpg";
const sample13 = "https://res.cloudinary.com/donwqvg6t/image/upload/v1767330690/portfolio/samples/WhatsApp%20Image%202025-12-21%20at%2010.09.02%20AM.jpg";
const sample14 = "https://res.cloudinary.com/donwqvg6t/image/upload/v1767330693/portfolio/samples/WhatsApp%20Image%202025-12-21%20at%2010.09.06%20AM.jpg";
const sample15 = "https://res.cloudinary.com/donwqvg6t/image/upload/v1767330695/portfolio/samples/WhatsApp%20Image%202025-12-21%20at%2010.09.12%20AM.jpg";
const sample16 = "https://res.cloudinary.com/donwqvg6t/image/upload/v1767330697/portfolio/samples/WhatsApp%20Image%202025-12-21%20at%2010.09.14%20AM.jpg";
const sample17 = "https://res.cloudinary.com/donwqvg6t/image/upload/v1767330699/portfolio/samples/WhatsApp%20Image%202025-12-21%20at%2010.09.15%20AM%20%281%29.jpg";
const sample18 = "https://res.cloudinary.com/donwqvg6t/image/upload/v1767330702/portfolio/samples/WhatsApp%20Image%202025-12-21%20at%2010.09.15%20AM%20%282%29.jpg";
const sample19 = "https://res.cloudinary.com/donwqvg6t/image/upload/v1767330704/portfolio/samples/WhatsApp%20Image%202025-12-21%20at%2010.09.16%20AM%20%281%29.jpg";
const sample20 = "https://res.cloudinary.com/donwqvg6t/image/upload/v1767330706/portfolio/samples/WhatsApp%20Image%202025-12-21%20at%2010.09.17%20AM%20%281%29.jpg";
const sample21 = "https://res.cloudinary.com/donwqvg6t/image/upload/v1767330708/portfolio/samples/WhatsApp%20Image%202025-12-21%20at%2010.09.19%20AM.jpg";

interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
}

const defaultPortfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: "Startup Brand Identity",
    description: "Complete sticker collection for a growing tech startup",
    category: "Branding",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400&h=300&fit=crop"
  },
  {
    id: 2,
    title: "Coffee Shop Campaign",
    description: "Custom vinyl stickers for a local coffee shop's marketing",
    category: "Marketing",
    image: "https://images.unsplash.com/photo-1540575467063-178f50002008?w=400&h=300&fit=crop"
  },
  {
    id: 3,
    title: "Music Festival Merch",
    description: "Special edition stickers for an international music festival",
    category: "Events",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=300&fit=crop"
  },
  {
    id: 4,
    title: "Product Packaging",
    description: "Premium label stickers for an eco-friendly product line",
    category: "Packaging",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop"
  },
  {
    id: 5,
    title: "Corporate Swag",
    description: "Team sticker packs for a multinational corporation",
    category: "Corporate",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop"
  },
  {
    id: 6,
    title: "Community Project",
    description: "Social impact sticker collection supporting local communities",
    category: "Community",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop"
  }
];

const Portfolio = () => {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);

  const loadDefaultItems = () => {
    const defaultItems: PortfolioItem[] = [
      { id: 1, title: "Adhesive Label Collection", description: "High-quality adhesive labels for various applications", category: "Labels", image: adhesiveLabel },
      { id: 2, title: "Custom Sticker Design #1", description: "Creative custom sticker designs for branding", category: "Branding", image: sample1 },
      { id: 3, title: "Custom Sticker Design #2", description: "Unique sticker designs for marketing campaigns", category: "Marketing", image: sample2 },
      { id: 4, title: "Custom Sticker Design #3", description: "Vibrant sticker collection for events", category: "Events", image: sample3 },
      { id: 5, title: "Custom Sticker Design #4", description: "Professional sticker designs for businesses", category: "Business", image: sample4 },
      { id: 6, title: "Custom Sticker Design #5", description: "Eye-catching stickers for product packaging", category: "Packaging", image: sample5 },
      { id: 7, title: "Custom Sticker Design #6", description: "Decorative stickers for personal use", category: "Personal", image: sample6 },
      { id: 8, title: "Custom Sticker Design #7", description: "Premium sticker collection for premium brands", category: "Premium", image: sample7 },
      { id: 9, title: "Custom Sticker Design #8", description: "Artistic sticker designs for creative projects", category: "Art", image: sample8 },
      { id: 10, title: "Custom Sticker Design #9", description: "Professional sticker solutions", category: "Professional", image: sample9 },
      { id: 11, title: "Custom Sticker Design #10", description: "Modern sticker designs for tech companies", category: "Technology", image: sample10 },
      { id: 12, title: "Custom Sticker Design #11", description: "Elegant stickers for luxury brands", category: "Luxury", image: sample11 },
      { id: 13, title: "Custom Sticker Design #12", description: "Fun and playful sticker collection", category: "Fun", image: sample12 },
      { id: 14, title: "Custom Sticker Design #13", description: "Corporate sticker designs", category: "Corporate", image: sample13 },
      { id: 15, title: "Custom Sticker Design #14", description: "Retail sticker solutions", category: "Retail", image: sample14 },
      { id: 16, title: "Custom Sticker Design #15", description: "Custom shapes and sizes available", category: "Custom", image: sample15 },
      { id: 17, title: "Custom Sticker Design #16", description: "Weatherproof outdoor stickers", category: "Outdoor", image: sample16 },
      { id: 18, title: "Custom Sticker Design #17", description: "Indoor decorative stickers", category: "Indoor", image: sample17 },
      { id: 19, title: "Custom Sticker Design #18", description: "Promotional sticker collection", category: "Promotional", image: sample18 },
      { id: 20, title: "Custom Sticker Design #19", description: "Special occasion stickers", category: "Occasions", image: sample19 },
      { id: 21, title: "Custom Sticker Design #20", description: "Seasonal sticker designs", category: "Seasonal", image: sample20 },
      { id: 22, title: "Custom Sticker Design #21", description: "Limited edition sticker collection", category: "Limited Edition", image: sample21 },
    ];
    setPortfolioItems(defaultItems);
    localStorage.setItem("portfolioItems", JSON.stringify(defaultItems));
  };

  // Load portfolio items from localStorage
  useEffect(() => {
    try {
      const savedItems = localStorage.getItem("portfolioItems");
      if (savedItems) {
        try {
          const parsed = JSON.parse(savedItems);
          if (Array.isArray(parsed) && parsed.length > 0) {
            // Check if items have old local paths (starting with /src/ or /assets/)
            const hasOldLocalPaths = parsed.some(item => 
              item.image && (item.image.startsWith('/src/') || item.image.includes('/assets/') || item.image.startsWith('data:'))
            );
            
            if (hasOldLocalPaths) {
              loadDefaultItems();
            } else {
              setPortfolioItems(parsed);
            }
          } else {
            loadDefaultItems();
          }
        } catch (error) {
          console.error("Error parsing portfolio items:", error);
          loadDefaultItems();
        }
      } else {
        loadDefaultItems();
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error);
      loadDefaultItems();
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>Portfolio - Amirdha Stickers</title>
        <meta 
          name="description" 
          content="See our adhesive label, sticker, and printing services projects for clients across Tamil Nadu." 
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
                  Our Portfolio
                </h1>
                <p className="text-lg text-slate-600">
                  Showcasing our best work and client projects
                </p>
              </div>
            </div>
          </section>

          {/* Disclaimer Section */}
          <section className="py-8 border-b border-slate-200/30 bg-amber-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
              <div className="max-w-4xl mx-auto bg-white border-2 border-amber-300 rounded-lg p-6 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-amber-900 mb-2">Disclaimer</h3>
                    <div className="text-sm text-slate-700 space-y-1">
                      <p>• The products shown in the sample images are for <strong>viewing purposes only</strong> and are <strong>not for sale</strong>.</p>
                      <p>• The stickers displayed are products of other companies and brands.</p>
                      <p>• Specific company names are not mentioned in these samples.</p>
                      <p>• These images are solely for displaying our printing capabilities and quality.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Portfolio Grid */}
          <section className="py-20 relative overflow-hidden bg-animated">
            <div className="animated-shape animated-shape-1" />
            <div className="animated-shape animated-shape-2" />
            <div className="animated-shape animated-shape-3" />
            <div className="animated-shape animated-shape-4" />
            <div className="animated-shape animated-shape-5" />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
              {portfolioItems.length > 0 ? (
                <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                  {portfolioItems.map((item, index) => (
                    <div key={item.id} className="group relative overflow-hidden rounded-lg border border-slate-200 bg-white inline-block w-full break-inside-avoid mb-8">
                      <BorderTrail
                        className="bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500"
                        size={90}
                        transition={{
                          duration: 6 + index,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                      <div className="overflow-hidden bg-slate-100 relative">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-auto object-contain"
                        />
                      </div>
                      <div className="p-6">
                        <p className="text-xs font-medium text-blue-600 mb-2">
                          {item.category}
                        </p>
                        <h3 className="font-bold text-lg text-slate-900 mb-2">
                          {item.title}
                        </h3>
                        <p className="text-slate-600 text-sm">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-slate-600 text-lg">No portfolio items available. Add items from the admin panel.</p>
                </div>
              )}
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 border-t border-slate-200/30 relative overflow-hidden bg-animated">
            <div className="animated-shape animated-shape-1" />
            <div className="animated-shape animated-shape-2" />
            <div className="animated-shape animated-shape-3" />
            <div className="animated-shape animated-shape-4" />
            <div className="animated-shape animated-shape-5" />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10" data-reveal="up">
              <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">
                  Ready to Start Your Project?
                </h2>
                <p className="text-lg text-slate-600 mb-8">
                  Let's create something amazing together.
                </p>
                <Link to="/contact">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                    Start Your Project
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Portfolio;
