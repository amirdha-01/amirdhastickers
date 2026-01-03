import { Helmet } from "react-helmet-async";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactSection from "@/components/sections/ContactSection";

const ContactPage = () => {
  return (
    <>
      <Helmet>
        <title>Contact Us - Amirdha Stickers</title>
        <meta 
          name="description" 
          content="Reach Amirdha Stickers for adhesive labels, stickers, thermal rolls, and printing services in Coimbatore." 
        />
      </Helmet>
      
      <div className="min-h-screen relative">
        <Navbar />
        <main className="pt-16 md:pt-20">
          {/* Hero Section */}
          <section className="py-12 md:py-16 lg:py-20 border-b border-slate-200/30 relative overflow-hidden bg-animated">
            <div className="animated-shape animated-shape-1" />
            <div className="animated-shape animated-shape-2" />
            <div className="animated-shape animated-shape-3" />
            <div className="animated-shape animated-shape-4" />
            <div className="animated-shape animated-shape-5" />
            <div className="absolute inset-0 bg-gradient-to-b from-blue-50/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10" data-reveal="down">
              <div className="max-w-3xl mx-auto fade-in-down">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 lg:mb-6 animate-heading leading-tight">
                  Get in Touch
                </h1>
                <p className="text-base sm:text-lg lg:text-xl text-slate-600 leading-relaxed animate-paragraph delay-100 max-w-2xl">
                  Reach Amirdha Stickers for adhesive labels, logo/foil stickers, barcode labels,
                  thermal paper rolls, visiting cards, and printing services. We'll respond quickly.
                </p>
                <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mt-6 animate-underline-expand" />
              </div>
            </div>
          </section>

          {/* Contact Form Section */}
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default ContactPage;
