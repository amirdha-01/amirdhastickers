import { Helmet } from "react-helmet-async";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";

const AboutUs = () => {
  return (
    <>
      <Helmet>
        <title>About Us - Amirdha Stickers</title>
        <meta 
          name="description" 
          content="Learn about Amirdha Stickers' mission to deliver quality adhesive labels, stickers, and printing services in Coimbatore." 
        />
      </Helmet>
      
      <div className="min-h-screen relative">
        <Navbar />
        <main className="pt-20">
          {/* Hero Section */}
          <section className="py-16 border-b border-slate-200/30 relative overflow-hidden bg-animated">
            {/* Animated Background Shapes */}
            <div className="animated-shape animated-shape-1" />
            <div className="animated-shape animated-shape-2" />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10" data-reveal="down">
              <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                  About Amirdha Stickers
                </h1>
                <p className="text-lg text-slate-600">
                  Delivering quality adhesive labels, logo & foil stickers, barcode labels, thermal paper,
                  visiting cards, and printing services in Coimbatore since 2018.
                </p>
              </div>
            </div>
          </section>

          {/* Company Stats Section */}
          <section className="py-12 bg-white border-b border-slate-200/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
              <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {/* Since 2018 */}
                <div className="bg-blue-50/50 border border-slate-200/50 rounded-3xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Since 2018</h3>
                  <p className="text-sm text-slate-600 font-medium">GST: 33FJIPK0171A1ZS</p>
                </div>

                {/* Team Members */}
                <div className="bg-purple-50/50 border border-slate-200/50 rounded-3xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Upto 10</h3>
                  <p className="text-sm text-slate-600 font-medium">Team Members</p>
                </div>

                {/* Location */}
                <div className="bg-green-50/50 border border-slate-200/50 rounded-3xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Goldwins</h3>
                  <p className="text-sm text-slate-600 font-medium">Coimbatore, TN</p>
                </div>
              </div>
            </div>
          </section>

          {/* Mission Section */}
          <section className="py-20 relative overflow-hidden">
            <div className="animated-shape animated-shape-3" />
            <div className="animated-shape animated-shape-4" />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10" data-reveal="up">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-slate-900 mb-6">
                  Our Mission
                </h2>
                <p className="text-lg text-slate-700 mb-4 leading-relaxed">
                  At Amirdha Stickers, we supply adhesive labels, logo stickers, foil stickers, barcode labels,
                  thermal paper rolls, visiting cards, and paper/metalized printing services to help businesses
                  strengthen their brand presence. We believe in delivering quality products with responsive service.
                </p>
                <p className="text-lg text-slate-700 leading-relaxed">
                  Led by CEO Krishnamoorthy, our team serves Coimbatore and Tamil Nadu with attentive care.
                </p>
              </div>
            </div>
          </section>

          {/* Values Section */}
          <section className="py-20 border-y border-slate-200/30 relative overflow-hidden">
            <div className="animated-shape animated-shape-5" />
            <div className="animated-shape animated-shape-1" />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10" data-reveal-group>
              <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
                Our Values
              </h2>
              <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div className="bg-white p-8 rounded-lg border border-slate-200">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    Quality Products
                  </h3>
                  <p className="text-slate-700">
                    We deliver crisp adhesive labels, foil stickers, barcode labels, and thermal rolls with reliable performance.
                  </p>
                </div>
                <div className="bg-white p-8 rounded-lg border border-slate-200">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    Printing Services
                  </h3>
                  <p className="text-slate-700">
                    Paper printing and metalized printing capabilities for visiting cards, inserts, and custom materials.
                  </p>
                </div>
                <div className="bg-white p-8 rounded-lg border border-slate-200">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    Local Expertise
                  </h3>
                  <p className="text-slate-700">
                    In Goldwins, Coimbatore, we understand Tamil Nadu businesses and offer attentive support.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 relative overflow-hidden bg-animated">
            <div className="animated-shape animated-shape-2" />
            <div className="animated-shape animated-shape-3" />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10" data-reveal="up">
              <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">
                  Ready to Get Started?
                </h2>
                <p className="text-lg text-slate-600 mb-8">
                  Explore our product collection or create your custom design today.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href="/products">
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                      Shop Products
                    </Button>
                  </a>
                  <a href="/contact">
                    <Button variant="outline" size="lg">
                      Contact Us
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default AboutUs;
