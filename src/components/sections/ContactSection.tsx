import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });
  
  // Load contact info from localStorage
  const [contactInfo, setContactInfo] = useState({
    email: "amirdhastickers@gmail.com",
    phone: "8667423787",
    address: "No 1, Duraiswamy Nagar, Goldwins, Coimbatore - 641014, Tamil Nadu",
  });

  useEffect(() => {
    const savedInfo = localStorage.getItem("contactInfo");
    if (savedInfo) {
      setContactInfo(JSON.parse(savedInfo));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Use relative path for production, localhost for development
      const apiUrl = import.meta.env.VITE_API_URL || (window.location.hostname === 'localhost' ? 'http://localhost:3001' : '');
      
      const response = await fetch(`${apiUrl}/api/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        // Check if backend server is running
        if (response.status === 404) {
          throw new Error('Backend server is not running. Please start it with: npm run server');
        }
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        toast({
          title: "Message Sent Successfully! ✓",
          description: "Thank you for reaching out. We'll get back to you within 24 hours.",
        });
        setFormData({ name: "", phone: "", email: "", subject: "", message: "" });
      } else {
        throw new Error(data.message || 'Failed to send message');
      }
    } catch (error) {
      console.error('Email sending failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      toast({
        title: "Failed to Send Message",
        description: errorMessage.includes('Backend server') 
          ? "Backend server is not running. Please contact support."
          : "Please try again or contact us directly at amirdhastickers@gmail.com",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-12 md:py-16 lg:py-20 border-t border-slate-200/30 relative overflow-hidden">
      <div className="absolute top-20 right-0 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10" data-reveal-group>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 max-w-5xl mx-auto">
          {/* Contact Form */}
          <div className="bg-white rounded-lg border border-slate-200 p-4 md:p-6 lg:p-8 transition-smooth hover-lift fade-in-left delay-100 shadow-lg hover:shadow-2xl">
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 md:mb-6 animate-heading">
              Send us a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
              <div className="space-y-2 fade-in-up delay-100">
                <Label htmlFor="name" className="text-slate-700 font-medium text-sm md:text-base transition-colors duration-300">
                  Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="rounded-lg border-slate-300 h-9 md:h-10 text-sm md:text-base transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:shadow-lg"
                />
              </div>

              <div className="space-y-2 fade-in-up delay-125">
                <Label htmlFor="phone" className="text-slate-700 font-medium text-sm md:text-base transition-colors duration-300">
                  Phone Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+91 1234567890"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  className="rounded-lg border-slate-300 h-9 md:h-10 text-sm md:text-base transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:shadow-lg"
                />
              </div>

              <div className="space-y-2 fade-in-up delay-150">
                <Label htmlFor="email" className="text-slate-700 font-medium text-sm md:text-base transition-colors duration-300">
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="rounded-lg border-slate-300 h-9 md:h-10 text-sm md:text-base transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:shadow-lg"
                />
              </div>

              <div className="space-y-2 fade-in-up delay-200">
                <Label htmlFor="subject" className="text-slate-700 font-medium text-sm md:text-base transition-colors duration-300">
                  Subject <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="subject"
                  placeholder="What is this about?"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                  className="rounded-lg border-slate-300 h-9 md:h-10 text-sm md:text-base transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:shadow-lg"
                />
              </div>

              <div className="space-y-2 fade-in-up delay-250">
                <Label htmlFor="message" className="text-slate-700 font-medium text-sm md:text-base transition-colors duration-300">
                  Message <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="message"
                  placeholder="Tell us about your project..."
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  className="rounded-lg border-slate-300 text-sm md:text-base resize-none transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:shadow-lg"
                />
              </div>

              <Button 
                type="submit" 
                size="lg" 
                className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 hover:shadow-2xl fade-in-up delay-300 text-base md:text-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="inline-block animate-spin">⏳</span>
                    Sending...
                  </span>
                ) : (
                  "Send Message"
                )}
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="bg-white rounded-lg border border-slate-200 p-5 sm:p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 fade-in-right delay-100">
            <div className="mb-6 sm:mb-8">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 mb-2 sm:mb-3 md:mb-4 animate-heading">
                Contact Information
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Reach out to us through any of these channels. We're here to help with your label and printing needs!
              </p>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 bg-white rounded-lg border border-slate-200 transition-all duration-300 hover-lift hover-glow fade-in-up delay-100 group">
                <div className="flex-shrink-0 mt-1">
                  <Mail className="w-5 md:w-6 h-5 md:h-6 text-blue-600 group-hover:text-blue-700 transition-all duration-300" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-bold text-slate-900 text-sm md:text-base transition-colors duration-300 group-hover:text-blue-600">Email</h4>
                  <p className="text-slate-600 text-xs md:text-sm break-all transition-colors duration-300 group-hover:text-slate-700">{contactInfo.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 md:gap-4 p-4 md:p-5 bg-white rounded-lg border border-slate-200 transition-all duration-300 hover-lift hover-glow fade-in-up delay-150 group">
                <div className="flex-shrink-0 mt-1">
                  <Phone className="w-5 md:w-6 h-5 md:h-6 text-blue-600 group-hover:text-blue-700 transition-all duration-300" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-bold text-slate-900 text-sm md:text-base transition-colors duration-300 group-hover:text-blue-600">Phone</h4>
                  <p className="text-slate-600 text-xs md:text-sm transition-colors duration-300 group-hover:text-slate-700">{contactInfo.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 md:gap-4 p-4 md:p-5 bg-white rounded-lg border border-slate-200 transition-all duration-300 hover-lift hover-glow fade-in-up delay-200 group">
                <div className="flex-shrink-0 mt-1">
                  <MapPin className="w-5 md:w-6 h-5 md:h-6 text-blue-600 group-hover:text-blue-700 transition-all duration-300" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-bold text-slate-900 text-sm md:text-base transition-colors duration-300 group-hover:text-blue-600">Address</h4>
                  <p className="text-slate-600 text-xs md:text-sm leading-relaxed transition-colors duration-300 group-hover:text-slate-700">{contactInfo.address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
