import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AdminNavbar from "@/components/layout/AdminNavbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ContactInfo {
  email: string;
  phone: string;
  address: string;
}

const AdminContact = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    email: "amirdhastickers@gmail.com",
    phone: "8667423787",
    address: "No 1, Duraiswamy Nagar, Goldwins, Coimbatore - 641014, Tamil Nadu",
  });

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("adminAuthenticated") === "true";
    if (!isAuthenticated) {
      navigate("/admin");
    }

    // Load contact info from localStorage
    const savedInfo = localStorage.getItem("contactInfo");
    if (savedInfo) {
      setContactInfo(JSON.parse(savedInfo));
    }
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("contactInfo", JSON.stringify(contactInfo));
    toast({
      title: "Contact information updated successfully",
      description: "The changes will be reflected on the contact page.",
    });
  };

  return (
    <>
      <Helmet>
        <title>Contact Information - Admin Panel</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-slate-50">
        <AdminNavbar />

        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Contact Information</h1>
            <p className="text-slate-600">Manage your business contact details</p>
          </div>

          <div className="max-w-3xl mx-auto">
            {/* Current Contact Info Display */}
            <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Current Information</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg">
                  <Mail className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">Email</h4>
                    <p className="text-slate-600">{contactInfo.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg">
                  <Phone className="w-5 h-5 text-green-600 mt-1" />
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">Phone</h4>
                    <p className="text-slate-600">{contactInfo.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-lg">
                  <MapPin className="w-5 h-5 text-purple-600 mt-1" />
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">Address</h4>
                    <p className="text-slate-600">{contactInfo.address}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Edit Form */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Edit Contact Information</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-blue-600" />
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={contactInfo.email}
                    onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                    placeholder="your@email.com"
                    required
                    className="text-base"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-green-600" />
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={contactInfo.phone}
                    onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                    placeholder="Enter phone number"
                    required
                    className="text-base"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-purple-600" />
                    Business Address
                  </Label>
                  <Textarea
                    id="address"
                    value={contactInfo.address}
                    onChange={(e) => setContactInfo({ ...contactInfo, address: e.target.value })}
                    placeholder="Enter full business address"
                    required
                    rows={3}
                    className="text-base"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button type="submit" className="flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    Save Changes
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      const savedInfo = localStorage.getItem("contactInfo");
                      if (savedInfo) {
                        setContactInfo(JSON.parse(savedInfo));
                      }
                      toast({ title: "Changes discarded" });
                    }}
                  >
                    Reset
                  </Button>
                </div>
              </form>
            </div>

            {/* Information Note */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> Changes made here will be reflected on the Contact page. Make sure all information is accurate and up-to-date.
              </p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default AdminContact;
