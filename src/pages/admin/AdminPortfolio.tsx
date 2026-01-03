import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AdminNavbar from "@/components/layout/AdminNavbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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

const AdminPortfolio = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    image: "",
  });
  const [imagePreview, setImagePreview] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);

  const persistPortfolioItems = (items: PortfolioItem[]) => {
    try {
      localStorage.setItem("portfolioItems", JSON.stringify(items));
      return true;
    } catch (error) {
      console.error("Failed to save portfolio items", error);
      toast({
        title: "Storage is full",
        description: "Cannot save more images. Remove some items or upload smaller files.",
        variant: "destructive",
      });
      return false;
    }
  };

  const resizeImageToBase64 = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          const maxSize = 1200;
          let { width, height } = img;

          if (width > height && width > maxSize) {
            height = (height * maxSize) / width;
            width = maxSize;
          } else if (height > maxSize) {
            width = (width * maxSize) / height;
            height = maxSize;
          }

          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            reject(new Error("Canvas not supported"));
            return;
          }
          ctx.drawImage(img, 0, 0, width, height);
          const mime = file.type.includes("png") ? "image/png" : "image/jpeg";
          const quality = 0.8;
          resolve(canvas.toDataURL(mime, quality));
        };
        img.onerror = () => reject(new Error("Image load failed"));
        img.src = reader.result as string;
      };
      reader.onerror = () => reject(new Error("File read failed"));
      reader.readAsDataURL(file);
    });

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("adminAuthenticated") === "true";
    if (!isAuthenticated) {
      navigate("/admin");
    }

    // Load portfolio items from localStorage
    const savedItems = localStorage.getItem("portfolioItems");
    if (savedItems) {
      const parsed = JSON.parse(savedItems);
      // Check if items have old local paths
      const hasOldLocalPaths = parsed.some((item: PortfolioItem) => 
        item.image && (item.image.startsWith('/src/') || item.image.includes('/assets/') || item.image.startsWith('data:'))
      );
      
      if (hasOldLocalPaths) {
        console.log("Detected old local paths in admin, loading Cloudinary defaults...");
        // Initialize with default items from Cloudinary
        const defaultItems: PortfolioItem[] = [
        {
          id: 1,
          title: "Adhesive Label Collection",
          description: "High-quality adhesive labels for various applications",
          category: "Labels",
          image: adhesiveLabel
        },
        {
          id: 2,
          title: "Custom Sticker Design #1",
          description: "Creative custom sticker designs for branding",
          category: "Branding",
          image: sample1
        },
        {
          id: 3,
          title: "Custom Sticker Design #2",
          description: "Unique sticker designs for marketing campaigns",
          category: "Marketing",
          image: sample2
        },
        {
          id: 4,
          title: "Custom Sticker Design #3",
          description: "Vibrant sticker collection for events",
          category: "Events",
          image: sample3
        },
        {
          id: 5,
          title: "Custom Sticker Design #4",
          description: "Professional sticker designs for businesses",
          category: "Business",
          image: sample4
        },
        {
          id: 6,
          title: "Custom Sticker Design #5",
          description: "Eye-catching stickers for product packaging",
          category: "Packaging",
          image: sample5
        },
        {
          id: 7,
          title: "Custom Sticker Design #6",
          description: "Decorative stickers for personal use",
          category: "Personal",
          image: sample6
        },
        {
          id: 8,
          title: "Custom Sticker Design #7",
          description: "Premium sticker collection for premium brands",
          category: "Premium",
          image: sample7
        },
        {
          id: 9,
          title: "Custom Sticker Design #8",
          description: "Artistic sticker designs for creative projects",
          category: "Art",
          image: sample8
        },
        {
          id: 10,
          title: "Custom Sticker Design #9",
          description: "Professional sticker solutions",
          category: "Professional",
          image: sample9
        },
        {
          id: 11,
          title: "Custom Sticker Design #10",
          description: "Modern sticker designs for tech companies",
          category: "Technology",
          image: sample10
        },
        {
          id: 12,
          title: "Custom Sticker Design #11",
          description: "Elegant stickers for luxury brands",
          category: "Luxury",
          image: sample11
        },
        {
          id: 13,
          title: "Custom Sticker Design #12",
          description: "Fun and playful sticker collection",
          category: "Fun",
          image: sample12
        },
        {
          id: 14,
          title: "Custom Sticker Design #13",
          description: "Corporate sticker designs",
          category: "Corporate",
          image: sample13
        },
        {
          id: 15,
          title: "Custom Sticker Design #14",
          description: "Retail sticker solutions",
          category: "Retail",
          image: sample14
        },
        {
          id: 16,
          title: "Custom Sticker Design #15",
          description: "Custom shapes and sizes available",
          category: "Custom",
          image: sample15
        },
        {
          id: 17,
          title: "Custom Sticker Design #16",
          description: "Weatherproof outdoor stickers",
          category: "Outdoor",
          image: sample16
        },
        {
          id: 18,
          title: "Custom Sticker Design #17",
          description: "Indoor decorative stickers",
          category: "Indoor",
          image: sample17
        },
        {
          id: 19,
          title: "Custom Sticker Design #18",
          description: "Promotional sticker collection",
          category: "Promotional",
          image: sample18
        },
        {
          id: 20,
          title: "Custom Sticker Design #19",
          description: "Special occasion stickers",
          category: "Occasions",
          image: sample19
        },
        {
          id: 21,
          title: "Custom Sticker Design #20",
          description: "Seasonal sticker designs",
          category: "Seasonal",
          image: sample20
        },
        {
          id: 22,
          title: "Custom Sticker Design #21",
          description: "Limited edition sticker collection",
          category: "Limited Edition",
          image: sample21
        },
      ];
      setPortfolioItems(defaultItems);
      localStorage.setItem("portfolioItems", JSON.stringify(defaultItems));
      } else {
        setPortfolioItems(parsed);
      }
    } else {
      // Initialize with default items from Cloudinary
      const defaultItems: PortfolioItem[] = [
        {
          id: 1,
          title: "Adhesive Label Collection",
          description: "High-quality adhesive labels for various applications",
          category: "Labels",
          image: adhesiveLabel
        },
        {
          id: 2,
          title: "Custom Sticker Design #1",
          description: "Creative custom sticker designs for branding",
          category: "Branding",
          image: sample1
        },
        {
          id: 3,
          title: "Custom Sticker Design #2",
          description: "Unique sticker designs for marketing campaigns",
          category: "Marketing",
          image: sample2
        },
        {
          id: 4,
          title: "Custom Sticker Design #3",
          description: "Vibrant sticker collection for events",
          category: "Events",
          image: sample3
        },
        {
          id: 5,
          title: "Custom Sticker Design #4",
          description: "Professional sticker designs for businesses",
          category: "Business",
          image: sample4
        },
        {
          id: 6,
          title: "Custom Sticker Design #5",
          description: "Eye-catching stickers for product packaging",
          category: "Packaging",
          image: sample5
        },
        {
          id: 7,
          title: "Custom Sticker Design #6",
          description: "Decorative stickers for personal use",
          category: "Personal",
          image: sample6
        },
        {
          id: 8,
          title: "Custom Sticker Design #7",
          description: "Premium sticker collection for premium brands",
          category: "Premium",
          image: sample7
        },
        {
          id: 9,
          title: "Custom Sticker Design #8",
          description: "Artistic sticker designs for creative projects",
          category: "Art",
          image: sample8
        },
        {
          id: 10,
          title: "Custom Sticker Design #9",
          description: "Professional sticker solutions",
          category: "Professional",
          image: sample9
        },
        {
          id: 11,
          title: "Custom Sticker Design #10",
          description: "Modern sticker designs for tech companies",
          category: "Technology",
          image: sample10
        },
        {
          id: 12,
          title: "Custom Sticker Design #11",
          description: "Elegant stickers for luxury brands",
          category: "Luxury",
          image: sample11
        },
        {
          id: 13,
          title: "Custom Sticker Design #12",
          description: "Fun and playful sticker collection",
          category: "Fun",
          image: sample12
        },
        {
          id: 14,
          title: "Custom Sticker Design #13",
          description: "Corporate sticker designs",
          category: "Corporate",
          image: sample13
        },
        {
          id: 15,
          title: "Custom Sticker Design #14",
          description: "Retail sticker solutions",
          category: "Retail",
          image: sample14
        },
        {
          id: 16,
          title: "Custom Sticker Design #15",
          description: "Custom shapes and sizes available",
          category: "Custom",
          image: sample15
        },
        {
          id: 17,
          title: "Custom Sticker Design #16",
          description: "Weatherproof outdoor stickers",
          category: "Outdoor",
          image: sample16
        },
        {
          id: 18,
          title: "Custom Sticker Design #17",
          description: "Indoor decorative stickers",
          category: "Indoor",
          image: sample17
        },
        {
          id: 19,
          title: "Custom Sticker Design #18",
          description: "Promotional sticker collection",
          category: "Promotional",
          image: sample18
        },
        {
          id: 20,
          title: "Custom Sticker Design #19",
          description: "Special occasion stickers",
          category: "Occasions",
          image: sample19
        },
        {
          id: 21,
          title: "Custom Sticker Design #20",
          description: "Seasonal sticker designs",
          category: "Seasonal",
          image: sample20
        },
        {
          id: 22,
          title: "Custom Sticker Design #21",
          description: "Limited edition sticker collection",
          category: "Limited Edition",
          image: sample21
        },
      ];
      setPortfolioItems(defaultItems);
      localStorage.setItem("portfolioItems", JSON.stringify(defaultItems));
    }
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate that an image has been selected
    if (!formData.image) {
      toast({ 
        title: "Image required", 
        description: "Please select an image",
        variant: "destructive" 
      });
      return;
    }

    if (editingItem) {
      const updatedItems = portfolioItems.map((item) =>
        item.id === editingItem.id ? { ...editingItem, ...formData } : item
      );
      const saved = persistPortfolioItems(updatedItems);
      if (!saved) return;
      setPortfolioItems(updatedItems);
      toast({ title: "Portfolio item updated successfully" });
    } else {
      const newItem: PortfolioItem = {
        id: Date.now(),
        ...formData,
      };
      const updatedItems = [...portfolioItems, newItem];
      const saved = persistPortfolioItems(updatedItems);
      if (!saved) return;
      setPortfolioItems(updatedItems);
      toast({ title: "Portfolio item added successfully" });
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const handleEdit = (item: PortfolioItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description,
      category: item.category,
      image: item.image,
    });
    setImagePreview(item.image);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    const updatedItems = portfolioItems.filter((item) => item.id !== id);
    setPortfolioItems(updatedItems);
    localStorage.setItem("portfolioItems", JSON.stringify(updatedItems));
    toast({ title: "Portfolio item deleted successfully" });
  };

  const resetForm = () => {
    setFormData({ title: "", description: "", category: "", image: "" });
    setImagePreview("");
    setEditingItem(null);
  };

  const handleDialogChange = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) {
      resetForm();
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file",
        variant: "destructive",
      });
      return;
    }

    const maxUploadSize = 10 * 1024 * 1024; // 10MB for Cloudinary
    if (file.size > maxUploadSize) {
      toast({
        title: "File too large",
        description: "Please select an image under 10MB",
        variant: "destructive",
      });
      return;
    }

    // Show preview immediately
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload to Cloudinary
    setIsUploading(true);
    try {
      const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
      const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

      if (!cloudName || !uploadPreset) {
        toast({
          title: "Configuration Error",
          description: "Cloudinary credentials not configured. Please add them to .env file.",
          variant: "destructive",
        });
        setIsUploading(false);
        return;
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);
      formData.append("folder", "portfolio");

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      setFormData((prev) => ({ ...prev, image: data.secure_url }));
      
      toast({
        title: "Image uploaded successfully",
        description: "Your image is ready to use",
      });
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      toast({
        title: "Upload failed",
        description: "Failed to upload image to Cloudinary. Please try again.",
        variant: "destructive",
      });
      setImagePreview("");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Portfolio Management - Admin Panel</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-slate-50">
        <AdminNavbar />

        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 text-center md:text-left">
            <div className="mb-4 md:mb-0">
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Portfolio Management</h1>
              <p className="text-slate-600">Manage your portfolio showcase items</p>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={handleDialogChange}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Add Portfolio Item
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingItem ? "Edit Portfolio Item" : "Add New Portfolio Item"}
                  </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description (Optional)</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="category">Category (Optional)</Label>
                    <Input
                      id="category"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      placeholder="e.g., Branding, Marketing, Events"
                    />
                  </div>

                  <div>
                    <Label htmlFor="image">Upload Image to Cloudinary</Label>
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="cursor-pointer"
                      disabled={isUploading}
                    />
                    <p className="text-xs text-slate-500 mt-1">
                      {isUploading ? "Uploading to Cloudinary..." : "Select an image from your computer (Max 10MB)"}
                    </p>
                    
                    {imagePreview && (
                      <div className="mt-3 relative">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-48 object-cover rounded-lg border border-slate-200"
                        />
                        {!isUploading && (
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="absolute top-2 right-2"
                            onClick={() => {
                              setFormData({ ...formData, image: "" });
                              setImagePreview("");
                            }}
                          >
                            Remove
                          </Button>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button type="submit" className="flex-1" disabled={isUploading || !formData.image}>
                      {editingItem ? "Update Item" : "Add Item"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleDialogChange(false)}
                      disabled={isUploading}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Portfolio Items Grid */}
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolioItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <div className="aspect-video bg-slate-100 relative overflow-hidden">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageIcon className="w-12 h-12 text-slate-300" />
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-bold text-slate-900 mb-1">{item.title}</h3>
                      <p className="text-xs text-blue-600 font-medium">{item.category}</p>
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 mb-4 line-clamp-2">{item.description}</p>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      onClick={() => handleEdit(item)}
                    >
                      <Pencil className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(item.id)}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            </div>
          </div>

          {portfolioItems.length === 0 && (
            <div className="text-center py-12 flex flex-col items-center justify-center">
              <ImageIcon className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-600">No portfolio items yet. Add your first item!</p>
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default AdminPortfolio;
