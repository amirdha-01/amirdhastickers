import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "@/components/layout/AdminNavbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useStickerStore } from "@/store/stickerStore";
import { Sticker, STICKER_CATEGORIES } from "@/types/sticker";
import { useToast } from "@/hooks/use-toast";
import {
  Plus,
  Pencil,
  Trash2,
  Sparkles,
  Search,
} from "lucide-react";

type FormData = Omit<Sticker, "id" | "createdAt">;

const initialFormData: FormData = {
  name: "",
  description: "",
  category: "adhesive-labels",
  imageUrl: "",
  price: 0,
  featured: false,
};

const AdminProducts = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { stickers, addSticker, updateSticker, deleteSticker } = useStickerStore();
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingSticker, setEditingSticker] = useState<Sticker | null>(null);
  const [stickerToDelete, setStickerToDelete] = useState<Sticker | null>(null);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [searchQuery, setSearchQuery] = useState("");
  const [imagePreview, setImagePreview] = useState<string>("");

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("adminAuthenticated") === "true";
    if (!isAuthenticated) {
      navigate("/admin");
    }
  }, [navigate]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image smaller than 2MB.",
          variant: "destructive",
        });
        return;
      }

      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: "Please select an image file.",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setFormData({ ...formData, imageUrl: base64String });
        setImagePreview(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const filteredStickers = stickers.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenDialog = (sticker?: Sticker) => {
    if (sticker) {
      setEditingSticker(sticker);
      setFormData({
        name: sticker.name,
        description: sticker.description,
        category: sticker.category,
        imageUrl: sticker.imageUrl,
        price: sticker.price,
        featured: sticker.featured,
      });
      setImagePreview(sticker.imageUrl);
    } else {
      setEditingSticker(null);
      setFormData(initialFormData);
      setImagePreview("");
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingSticker(null);
    setFormData(initialFormData);
    setImagePreview("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingSticker) {
      updateSticker(editingSticker.id, formData);
      toast({
        title: "Product Updated! ✨",
        description: `"${formData.name}" has been updated successfully.`,
      });
    } else {
      addSticker(formData);
      toast({
        title: "Product Added! 🎉",
        description: `"${formData.name}" has been added to your collection.`,
      });
    }
    
    handleCloseDialog();
  };

  const handleDeleteClick = (sticker: Sticker) => {
    setStickerToDelete(sticker);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (stickerToDelete) {
      deleteSticker(stickerToDelete.id);
      toast({
        title: "Product Deleted",
        description: `"${stickerToDelete.name}" has been removed.`,
      });
      setStickerToDelete(null);
      setIsDeleteDialogOpen(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Products - Admin Panel</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-slate-50">
        <AdminNavbar />

        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Products</h1>
              <p className="text-slate-600">Manage your product inventory</p>
            </div>
            <Button onClick={() => handleOpenDialog()} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          </div>

          {/* Search */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 rounded-lg border-2"
              />
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead className="font-bold">Product</TableHead>
                  <TableHead className="font-bold hidden sm:table-cell">Category</TableHead>
                  <TableHead className="font-bold hidden md:table-cell">Featured</TableHead>
                  <TableHead className="font-bold text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStickers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-12 text-slate-500">
                      No products found. Add your first product to get started!
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredStickers.map((sticker) => (
                    <TableRow key={sticker.id} className="hover:bg-slate-50">
                      <TableCell>
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                            {sticker.imageUrl ? (
                              <img
                                src={sticker.imageUrl}
                                alt={sticker.name}
                                className="w-full h-full object-cover rounded-xl"
                              />
                            ) : (
                              <Sparkles className="w-5 h-5 text-blue-600" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="font-bold text-sm truncate">{sticker.name}</p>
                            <p className="text-sm text-slate-600 line-clamp-1">
                              {sticker.description}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Badge variant="secondary" className="rounded-full">
                          {STICKER_CATEGORIES.find((c) => c.value === sticker.category)?.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {sticker.featured ? (
                          <Badge className="bg-blue-600 text-white rounded-full">
                            Featured
                          </Badge>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleOpenDialog(sticker)}
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteClick(sticker)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </main>

        {/* Add/Edit Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[500px] rounded-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl">
                {editingSticker ? "Edit Product" : "Add New Product"}
              </DialogTitle>
              <DialogDescription>
                {editingSticker
                  ? "Update the product details below."
                  : "Fill in the details to add a new product."}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Product name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="rounded-xl border-2 h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Product description..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  className="rounded-xl border-2 resize-none"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger className="rounded-xl border-2 h-11">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {STICKER_CATEGORIES.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="imageUrl">Product Image</Label>
                <div className="space-y-3">
                  <Input
                    id="imageFile"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="rounded-xl border-2 h-11 cursor-pointer"
                  />
                  <p className="text-xs text-slate-500">
                    Upload an image from your computer (max 2MB)
                  </p>
                  {imagePreview && (
                    <div className="mt-3">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-lg border-2"
                      />
                    </div>
                  )}
                  <div className="text-xs text-slate-500 pt-2">Or enter an image URL:</div>
                  <Input
                    id="imageUrl"
                    type="url"
                    placeholder="https://example.com/image.png"
                    value={formData.imageUrl.startsWith('data:') ? '' : formData.imageUrl}
                    onChange={(e) => {
                      setFormData({ ...formData, imageUrl: e.target.value });
                      setImagePreview(e.target.value);
                    }}
                    className="rounded-xl border-2 h-11"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                <div>
                  <Label htmlFor="featured" className="font-medium">Featured Product</Label>
                  <p className="text-sm text-slate-600">Show this product in the featured section</p>
                </div>
                <Switch
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                />
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={handleCloseDialog}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  {editingSticker ? "Save Changes" : "Add Product"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent className="sm:max-w-[400px] rounded-2xl">
            <DialogHeader>
              <DialogTitle>Delete Product?</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete "{stickerToDelete?.name}"? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleConfirmDelete}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default AdminProducts;
