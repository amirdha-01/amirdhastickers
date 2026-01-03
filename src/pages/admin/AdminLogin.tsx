import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Lock } from "lucide-react";

const ADMIN_PASSWORD = "Amirdha@01"; // Change this to your desired password

const AdminLogin = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem("adminAuthenticated", "true");
      toast({
        title: "Welcome! 🎉",
        description: "You have successfully logged in.",
      });
      navigate("/admin/dashboard");
    } else {
      toast({
        title: "Access Denied",
        description: "Incorrect password. Please try again.",
        variant: "destructive",
      });
      setPassword("");
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin Login - Amirdha Stickers</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Animated Background Shapes */}
        <div className="animated-shape animated-shape-1" />
        <div className="animated-shape animated-shape-2" />
        <div className="animated-shape animated-shape-3" />
        <div className="animated-shape animated-shape-4" />
        <div className="animated-shape animated-shape-5" />
        
        <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md relative z-10">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-bold text-3xl text-center mb-2">
              Admin Access
            </h1>
            <p className="text-slate-600 text-center">
              Enter password to access the dashboard
            </p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="rounded-xl border-2 h-12"
                autoFocus
              />
            </div>
            <Button type="submit" className="w-full h-12 bg-blue-600 hover:bg-blue-700">
              Login
            </Button>
            <Link to="/" className="block text-center">
              <Button variant="ghost" className="w-full">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Site
              </Button>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
