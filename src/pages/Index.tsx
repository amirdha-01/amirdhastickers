import { Helmet } from "react-helmet-async";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import GallerySection from "@/components/sections/GallerySection";
import ContactSection from "@/components/sections/ContactSection";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Amirdha Stickers</title>
        <meta 
          name="description" 
          content="Amirdha Stickers supplies adhesive labels, logo stickers, foil stickers, barcode labels, thermal paper rolls, visiting cards, and printing services in Goldwins, Coimbatore." 
        />
        <meta name="keywords" content="adhesive labels coimbatore, logo stickers, foil stickers, barcode labels, thermal paper rolls, visiting cards, paper printing, metalized printing, amirdha stickers" />
      </Helmet>
      
      <div className="min-h-screen relative">
        <Navbar />
        <main>
          <HeroSection />
          <AboutSection />
          <GallerySection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
