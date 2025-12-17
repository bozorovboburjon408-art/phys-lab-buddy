import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Book, Search, FileText, Video, Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LibraryItem {
  id: string;
  title: string;
  description: string;
  type: "book" | "article" | "video" | "document";
  category: string;
  downloadUrl?: string;
  externalUrl?: string;
}

const libraryItems: LibraryItem[] = [
  {
    id: "1",
    title: "Mexanika asoslari",
    description: "Klassik mexanikaning asosiy qonunlari va tamoyillari haqida to'liq qo'llanma",
    type: "book",
    category: "Mexanika",
  },
  {
    id: "2",
    title: "Termodinamika va issiqlik",
    description: "Termodinamikaning asosiy qonunlari va issiqlik jarayonlari",
    type: "book",
    category: "Termodinamika",
  },
  {
    id: "3",
    title: "Elektr va magnetizm",
    description: "Elektromagnit maydon nazariyasi va amaliy qo'llanmalar",
    type: "book",
    category: "Elektrodinamika",
  },
  {
    id: "4",
    title: "Optika va yorug'lik",
    description: "Geometrik va to'lqin optikasi asoslari",
    type: "book",
    category: "Optika",
  },
  {
    id: "5",
    title: "Atom fizikasi",
    description: "Atom tuzilishi va kvant mexanikasi asoslari",
    type: "book",
    category: "Atom fizikasi",
  },
  {
    id: "6",
    title: "Laboratoriya ishlari to'plami",
    description: "Fizika bo'yicha laboratoriya ishlarining to'liq to'plami",
    type: "document",
    category: "Laboratoriya",
  },
];

const getTypeIcon = (type: LibraryItem["type"]) => {
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

const getTypeLabel = (type: LibraryItem["type"]) => {
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

  const categories = [...new Set(libraryItems.map((item) => item.category))];

  const filteredItems = libraryItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
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
                    <span className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground">
                      {getTypeLabel(item.type)}
                    </span>
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
                      {item.downloadUrl && (
                        <Button variant="ghost" size="icon" asChild>
                          <a href={item.downloadUrl} download>
                            <Download className="w-4 h-4" />
                          </a>
                        </Button>
                      )}
                      {item.externalUrl && (
                        <Button variant="ghost" size="icon" asChild>
                          <a href={item.externalUrl} target="_blank" rel="noopener noreferrer">
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
            <p className="text-muted-foreground">Hech narsa topilmadi</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Library;
