import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Book, Search, FileText, Video, Download, ExternalLink, Plus, Trash2, Lock, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface LibraryItem {
  id: string;
  title: string;
  description: string | null;
  type: string;
  category: string;
  file_url: string | null;
  external_url: string | null;
  created_at: string;
}

const getTypeIcon = (type: string) => {
  switch (type) {
    case "book":
      return Book;
    case "article":
      return FileText;
    case "video":
      return Video;
    case "document":
      return FileText;
    default:
      return Book;
  }
};

const getTypeLabel = (type: string) => {
  switch (type) {
    case "book":
      return "Kitob";
    case "article":
      return "Maqola";
    case "video":
      return "Video";
    case "document":
      return "Hujjat";
    default:
      return "Kitob";
  }
};

const Library = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [libraryItems, setLibraryItems] = useState<LibraryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  
  // Form state
  const [newItem, setNewItem] = useState({
    title: "",
    description: "",
    type: "book",
    category: "",
    external_url: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchLibraryItems();
  }, []);

  const fetchLibraryItems = async () => {
    try {
      const { data, error } = await supabase
        .from("library_items")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setLibraryItems(data || []);
    } catch (error) {
      console.error("Error fetching library items:", error);
      toast.error("Kutubxona ma'lumotlarini yuklashda xatolik");
    } finally {
      setLoading(false);
    }
  };

  const handleAdminLogin = async () => {
    try {
      const response = await supabase.functions.invoke("library-admin", {
        body: { action: "verify", password: adminPassword },
      });

      if (response.error) {
        toast.error("Noto'g'ri parol");
        return;
      }

      setIsAdmin(true);
      setShowAdminLogin(false);
      toast.success("Admin sifatida kirdingiz");
    } catch (error) {
      toast.error("Xatolik yuz berdi");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleAddItem = async () => {
    if (!newItem.title || !newItem.category) {
      toast.error("Sarlavha va kategoriya majburiy");
      return;
    }

    setUploading(true);
    let fileUrl = null;

    try {
      // Upload file directly to Supabase Storage
      if (selectedFile) {
        const fileName = `${Date.now()}-${selectedFile.name}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("library-files")
          .upload(fileName, selectedFile, {
            cacheControl: "3600",
            upsert: true,
          });

        if (uploadError) {
          throw new Error(uploadError.message);
        }

        const { data: publicUrlData } = supabase.storage
          .from("library-files")
          .getPublicUrl(fileName);

        fileUrl = publicUrlData.publicUrl;
      }

      // Add item to database
      const response = await supabase.functions.invoke("library-admin", {
        body: {
          action: "add",
          password: adminPassword,
          title: newItem.title,
          description: newItem.description || null,
          type: newItem.type,
          category: newItem.category,
          file_url: fileUrl,
          external_url: newItem.external_url || null,
        },
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      toast.success("Material muvaffaqiyatli qo'shildi");
      setShowAddDialog(false);
      setNewItem({ title: "", description: "", type: "book", category: "", external_url: "" });
      setSelectedFile(null);
      fetchLibraryItems();
    } catch (error) {
      console.error("Error adding item:", error);
      toast.error("Material qo'shishda xatolik");
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteItem = async (id: string) => {
    if (!confirm("Bu materialni o'chirmoqchimisiz?")) return;

    try {
      const response = await supabase.functions.invoke("library-admin", {
        body: { action: "delete", password: adminPassword, id },
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      toast.success("Material o'chirildi");
      fetchLibraryItems();
    } catch (error) {
      toast.error("O'chirishda xatolik");
    }
  };

  const categories = [...new Set(libraryItems.map((item) => item.category))];

  const filteredItems = libraryItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = !selectedCategory || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
            <Book className="w-4 h-4" />
            <span className="text-sm font-medium">Fizika kutubxonasi</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Kutubxona</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Fizika faniga oid kitoblar, maqolalar va o'quv materiallari to'plami
          </p>
        </div>

        {/* Admin Controls */}
        <div className="flex justify-end mb-4">
          {!isAdmin ? (
            <Dialog open={showAdminLogin} onOpenChange={setShowAdminLogin}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Lock className="w-4 h-4 mr-2" />
                  Admin
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Admin kirish</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div>
                    <Label>Parol</Label>
                    <Input
                      type="password"
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      placeholder="Admin parolini kiriting"
                      onKeyDown={(e) => e.key === "Enter" && handleAdminLogin()}
                    />
                  </div>
                  <Button onClick={handleAdminLogin} className="w-full">
                    Kirish
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          ) : (
            <div className="flex gap-2">
              <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Yangi material
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Yangi material qo'shish</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 pt-4">
                    <div>
                      <Label>Sarlavha *</Label>
                      <Input
                        value={newItem.title}
                        onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                        placeholder="Material nomi"
                      />
                    </div>
                    <div>
                      <Label>Tavsif</Label>
                      <Textarea
                        value={newItem.description}
                        onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                        placeholder="Qisqacha tavsif"
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label>Turi</Label>
                      <Select value={newItem.type} onValueChange={(v) => setNewItem({ ...newItem, type: v })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="book">Kitob</SelectItem>
                          <SelectItem value="article">Maqola</SelectItem>
                          <SelectItem value="video">Video</SelectItem>
                          <SelectItem value="document">Hujjat</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Kategoriya *</Label>
                      <Input
                        value={newItem.category}
                        onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                        placeholder="Masalan: Mexanika"
                      />
                    </div>
                    <div>
                      <Label>Fayl yuklash</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          type="file"
                          onChange={handleFileChange}
                          accept=".pdf,.doc,.docx,.epub"
                          className="flex-1"
                        />
                        {selectedFile && (
                          <Button variant="ghost" size="icon" onClick={() => setSelectedFile(null)}>
                            <X className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                      {selectedFile && (
                        <p className="text-sm text-muted-foreground mt-1">{selectedFile.name}</p>
                      )}
                    </div>
                    <div>
                      <Label>Tashqi havola (ixtiyoriy)</Label>
                      <Input
                        value={newItem.external_url}
                        onChange={(e) => setNewItem({ ...newItem, external_url: e.target.value })}
                        placeholder="https://..."
                      />
                    </div>
                    <Button onClick={handleAddItem} className="w-full" disabled={uploading}>
                      {uploading ? (
                        <>
                          <Upload className="w-4 h-4 mr-2 animate-spin" />
                          Yuklanmoqda...
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4 mr-2" />
                          Qo'shish
                        </>
                      )}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
              <Button variant="outline" onClick={() => setIsAdmin(false)}>
                Chiqish
              </Button>
            </div>
          )}
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Qidirish..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(null)}
            >
              Barchasi
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Yuklanmoqda...</p>
          </div>
        ) : (
          <>
            {/* Library Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => {
                const Icon = getTypeIcon(item.type);
                return (
                  <Card
                    key={item.id}
                    className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50 bg-card/50 backdrop-blur-sm"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground">
                            {getTypeLabel(item.type)}
                          </span>
                          {isAdmin && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-destructive hover:text-destructive"
                              onClick={() => handleDeleteItem(item.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                      <CardTitle className="mt-4 group-hover:text-primary transition-colors">
                        {item.title}
                      </CardTitle>
                      <CardDescription>{item.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{item.category}</span>
                        <div className="flex gap-2">
                          {item.file_url && (
                            <Button variant="ghost" size="icon" asChild>
                              <a href={item.file_url} download target="_blank" rel="noopener noreferrer">
                                <Download className="w-4 h-4" />
                              </a>
                            </Button>
                          )}
                          {item.external_url && (
                            <Button variant="ghost" size="icon" asChild>
                              <a href={item.external_url} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {filteredItems.length === 0 && (
              <div className="text-center py-12">
                <Book className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  {libraryItems.length === 0
                    ? "Kutubxona hozircha bo'sh"
                    : "Hech narsa topilmadi"}
                </p>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default Library;
