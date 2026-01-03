import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
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
  ArrowLeft,
  Plus,
  Pencil,
  Trash2,
  Sparkles,
  Search,
  Lock,
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

const ADMIN_PASSWORD = "Amirdha@01"; // Change this to your desired password

const Admin = () => {
  const { toast } = useToast();
  const { stickers, addSticker, updateSticker, deleteSticker } = useStickerStore();
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingSticker, setEditingSticker] = useState<Sticker | null>(null);
  const [stickerToDelete, setStickerToDelete] = useState<Sticker | null>(null);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [searchQuery, setSearchQuery] = useState("");
  const [imagePreview, setImagePreview] = useState<string>("");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (limit to 2MB)
      if (file.size > 2 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image smaller than 2MB.",
          variant: "destructive",
        });
        return;
      }

      // Check file type
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

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setPassword("");
      toast({
        title: "Welcome! 🎉",
        description: "You have successfully logged in.",
      });
    } else {
      toast({
        title: "Access Denied",
        description: "Incorrect password. Please try again.", 
        variant: "destructive",
      });
      setPassword("");
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
        title: "Sticker Updated! ✨",
        description: `"${formData.name}" has been updated successfully.`,
      });
    } else {
      addSticker(formData);
      toast({
        title: "Sticker Added! 🎉",
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
        title: "Sticker Deleted",
        description: `"${stickerToDelete.name}" has been removed.`,
      });
      setStickerToDelete(null);
      setIsDeleteDialogOpen(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - StickerPop</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {!isAuthenticated ? (
        <div className="min-h-screen bg-gradient-to-br from-coral-light via-teal-light to-purple-light flex items-center justify-center p-4 relative overflow-hidden">
          {/* Animated Background Shapes */}
          <div className="animated-shape animated-shape-1" />
          <div className="animated-shape animated-shape-2" />
          <div className="animated-shape animated-shape-3" />
          <div className="animated-shape animated-shape-4" />
          <div className="animated-shape animated-shape-5" />
          <div className="bg-card rounded-3xl shadow-2xl p-8 w-full max-w-md relative z-10">
            <div className="flex flex-col items-center mb-8">
              <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mb-4">
                <Lock className="w-8 h-8 text-primary-foreground" />
              </div>
              <h1 className="font-display font-bold text-3xl text-center mb-2">
                Admin Access
              </h1>
              <p className="text-muted-foreground text-center">
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
              <Button type="submit" variant="hero" className="w-full h-12">
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
      ) : (
      <div className="min-h-screen bg-muted/30 relative overflow-hidden">
        {/* Animated Background Shapes */}
        <div className="animated-shape animated-shape-1" />
        <div className="animated-shape animated-shape-2" />
        <div className="animated-shape animated-shape-3" />
        <div className="animated-shape animated-shape-4" />
        <div className="animated-shape animated-shape-5" />
        {/* Header */}
        <header className="bg-card border-b border-border sticky top-0 z-50">
          <div className="container mx-auto px-3 sm:px-4">
            <div className="flex items-center justify-between h-14 sm:h-16 gap-2">
              <div className="flex items-center gap-2 sm:gap-4 min-w-0">
                <Link to="/" className="flex-shrink-0">
                  <Button variant="ghost" size="sm" className="h-8 px-2 sm:px-3">
                    <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-2" />
                    <span className="hidden sm:inline">Back to Site</span>
                  </Button>
                </Link>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-primary-foreground" />
                  </div>
                  <span className="font-display font-bold text-sm sm:text-lg truncate">
                    <span className="hidden sm:inline">Admin Dashboard</span>
                    <span className="sm:hidden">Admin</span>
                  </span>
                </div>
              </div>
              <Button variant="hero" onClick={() => handleOpenDialog()} size="sm" className="h-8 sm:h-10 px-2 sm:px-4 flex-shrink-0">
                <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline ml-1">Add Sticker</span>
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-8">
            {[
              { label: "Total Stickers", value: stickers.length, color: "bg-coral-light" },
              { label: "Featured", value: stickers.filter((s) => s.featured).length, color: "bg-teal-light" },
              { label: "Categories", value: new Set(stickers.map((s) => s.category)).size, color: "bg-purple-light" },
            ].map((stat) => (
              <div key={stat.label} className={`${stat.color} rounded-xl sm:rounded-2xl p-3 sm:p-6`}>
                <p className="text-xs sm:text-sm font-medium text-foreground/70">{stat.label}</p>
                <p className="text-xl sm:text-2xl font-display font-bold text-foreground">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Search */}
          <div className="bg-card rounded-xl sm:rounded-2xl shadow-card p-3 sm:p-6 mb-4 sm:mb-6">
            <div className="relative">
              <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
              <Input
                placeholder="Search stickers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 sm:pl-12 h-10 sm:h-12 rounded-lg sm:rounded-xl border-2 text-sm sm:text-base"
              />
            </div>
          </div>

          {/* Table */}
          <div className="bg-card rounded-xl sm:rounded-2xl shadow-card overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="font-display font-bold text-xs sm:text-sm">Sticker</TableHead>
                    <TableHead className="font-display font-bold text-xs sm:text-sm hidden sm:table-cell">Category</TableHead>
                    <TableHead className="font-display font-bold text-xs sm:text-sm hidden md:table-cell">Featured</TableHead>
                    <TableHead className="font-display font-bold text-xs sm:text-sm text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStickers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 sm:py-12 text-muted-foreground text-sm sm:text-base">
                        No stickers found. Add your first sticker to get started!
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredStickers.map((sticker) => (
                      <TableRow key={sticker.id} className="hover:bg-muted/30">
                        <TableCell>
                          <div className="flex items-center gap-2 sm:gap-4">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-coral-light rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                              {sticker.imageUrl ? (
                                <img
                                  src={sticker.imageUrl}
                                  alt={sticker.name}
                                  className="w-full h-full object-cover rounded-lg sm:rounded-xl"
                                />
                              ) : (
                                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                              )}
                            </div>
                            <div className="min-w-0">
                              <p className="font-display font-bold text-sm sm:text-base truncate">{sticker.name}</p>
                              <p className="text-xs sm:text-sm text-muted-foreground line-clamp-1">
                                {sticker.description}
                              </p>
                              {/* Show category on mobile as badge */}
                              <div className="sm:hidden mt-1">
                                <Badge variant="secondary" className="rounded-full text-xs">
                                  {STICKER_CATEGORIES.find((c) => c.value === sticker.category)?.label}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <Badge variant="secondary" className="rounded-full text-xs sm:text-sm">
                            {STICKER_CATEGORIES.find((c) => c.value === sticker.category)?.label}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {sticker.featured ? (
                            <Badge className="gradient-primary text-primary-foreground border-0 rounded-full text-xs sm:text-sm">
                              Featured
                            </Badge>
                          ) : (
                            <span className="text-muted-foreground">—</span>
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
                            className="text-destructive hover:text-destructive"
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
        </div>
        </main>

        {/* Add/Edit Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[500px] rounded-2xl sm:rounded-3xl max-h-[90vh] overflow-y-auto mx-3">
            <DialogHeader>
              <DialogTitle className="font-display text-xl sm:text-2xl">
                {editingSticker ? "Edit Sticker" : "Add New Sticker"}
              </DialogTitle>
              <DialogDescription className="text-sm sm:text-base">
                {editingSticker
                  ? "Update the sticker details below."
                  : "Fill in the details to add a new sticker to your collection."}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm sm:text-base">Name</Label>
                <Input
                  id="name"
                  placeholder="Tropical Vibes"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="rounded-lg sm:rounded-xl border-2 h-10 sm:h-11 text-sm sm:text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm sm:text-base">Description</Label>
                <Textarea
                  id="description"
                  placeholder="A beautiful sticker design..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  className="rounded-lg sm:rounded-xl border-2 resize-none text-sm sm:text-base"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category" className="text-sm sm:text-base">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger className="rounded-lg sm:rounded-xl border-2 h-10 sm:h-11 text-sm sm:text-base">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {STICKER_CATEGORIES.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value} className="text-sm sm:text-base">
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="imageUrl" className="text-sm sm:text-base">Product Image</Label>
                <div className="space-y-3">
                  <Input
                    id="imageFile"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="rounded-lg sm:rounded-xl border-2 h-10 sm:h-11 text-sm sm:text-base cursor-pointer"
                  />
                  <p className="text-xs text-muted-foreground">
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
                  <div className="text-xs text-muted-foreground pt-2">Or enter an image URL:</div>
                  <Input
                    id="imageUrl"
                    type="url"
                    placeholder="https://example.com/image.png"
                    value={formData.imageUrl.startsWith('data:') ? '' : formData.imageUrl}
                    onChange={(e) => {
                      setFormData({ ...formData, imageUrl: e.target.value });
                      setImagePreview(e.target.value);
                    }}
                    className="rounded-lg sm:rounded-xl border-2 h-10 sm:h-11 text-sm sm:text-base"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between p-3 sm:p-4 bg-muted rounded-lg sm:rounded-xl">
                <div>
                  <Label htmlFor="featured" className="font-medium text-sm sm:text-base">Featured Sticker</Label>
                  <p className="text-xs sm:text-sm text-muted-foreground">Show this sticker in the featured section</p>
                </div>
                <Switch
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                />
              </div>

              <DialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0">
                <Button type="button" variant="outline" onClick={handleCloseDialog} className="w-full sm:w-auto">
                  Cancel
                </Button>
                <Button type="submit" variant="hero" className="w-full sm:w-auto">
                  {editingSticker ? "Save Changes" : "Add Sticker"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent className="sm:max-w-[400px] rounded-2xl sm:rounded-3xl mx-3">
            <DialogHeader>
              <DialogTitle className="font-display text-xl sm:text-2xl">Delete Sticker?</DialogTitle>
              <DialogDescription className="text-sm sm:text-base">
                Are you sure you want to delete "{stickerToDelete?.name}"? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0">
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)} className="w-full sm:w-auto">
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleConfirmDelete} className="w-full sm:w-auto">
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      )}
    </>
  );
};

export default Admin;
