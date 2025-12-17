import { useState, useMemo } from "react";
import { Header } from "@/components/layout/Header";
import { formulas, formulaCategories, getFormulasByCategory, searchFormulas, Formula, FormulaCategory } from "@/data/formulas";
import { Search, X, ChevronRight, Cog, MoveRight, Zap, Battery, Activity, Waves, Thermometer, Plug, Sun, Atom } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";

const iconMap: Record<string, React.ElementType> = {
  Cog,
  MoveRight,
  Zap,
  Battery,
  Activity,
  Waves,
  Thermometer,
  Plug,
  Magnet: Zap,
  Sun,
  Atom,
};

const FormulaCard = ({ formula, onClick }: { formula: Formula; onClick: () => void }) => {
  const category = formulaCategories.find((c) => c.id === formula.category);

  return (
    <Card
      className="group cursor-pointer hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1 border-border/50 hover:border-primary/30 bg-card/50 backdrop-blur-sm"
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
            {formula.name}
          </CardTitle>
          {category && (
            <Badge variant="secondary" className="text-xs shrink-0" style={{ backgroundColor: `${category.color}20`, color: category.color }}>
              {category.name}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="p-3 rounded-lg bg-secondary/30 border border-border/30 flex items-center justify-center min-h-[60px]">
          <BlockMath math={formula.formula} />
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">{formula.description}</p>
        <div className="flex items-center justify-end text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">
          <span>Batafsil</span>
          <ChevronRight className="w-4 h-4" />
        </div>
      </CardContent>
    </Card>
  );
};

const FormulaDetailModal = ({ formula, open, onOpenChange }: { formula: Formula | null; open: boolean; onOpenChange: (open: boolean) => void }) => {
  if (!formula) return null;
  
  const category = formulaCategories.find((c) => c.id === formula.category);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <DialogTitle className="text-xl">{formula.name}</DialogTitle>
              {category && (
                <Badge variant="secondary" style={{ backgroundColor: `${category.color}20`, color: category.color }}>
                  {category.name}
                </Badge>
              )}
            </div>
          </div>
        </DialogHeader>
        
        <div className="space-y-6 pt-4">
          <div className="p-6 rounded-xl bg-secondary/30 border border-border/30 flex items-center justify-center">
            <div className="text-2xl">
              <BlockMath math={formula.formula} />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-2">Ta'rif</h3>
            <p className="text-muted-foreground">{formula.description}</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">O'zgaruvchilar</h3>
            <div className="space-y-2">
              {formula.variables.map((variable, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-secondary/20 border border-border/30"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <InlineMath math={variable.symbol} />
                    </div>
                    <span className="font-medium">{variable.name}</span>
                  </div>
                  <Badge variant="outline" className="font-mono">
                    {variable.unit}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const CategoryCard = ({ category, count, isActive, onClick }: { category: FormulaCategory; count: number; isActive: boolean; onClick: () => void }) => {
  const Icon = iconMap[category.icon] || Atom;

  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 p-3 rounded-xl border transition-all duration-300 text-left w-full",
        isActive
          ? "bg-primary/10 border-primary/50 shadow-lg shadow-primary/10"
          : "bg-card/50 border-border/50 hover:bg-secondary/50 hover:border-border"
      )}
    >
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
        style={{ backgroundColor: `${category.color}20` }}
      >
        <Icon className="w-5 h-5" style={{ color: category.color }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className={cn("font-medium truncate", isActive ? "text-primary" : "text-foreground")}>{category.name}</p>
        <p className="text-xs text-muted-foreground">{count} formula</p>
      </div>
    </button>
  );
};

const Formulas = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedFormula, setSelectedFormula] = useState<Formula | null>(null);

  const filteredFormulas = useMemo(() => {
    if (searchQuery) {
      return searchFormulas(searchQuery);
    }
    if (selectedCategory) {
      return getFormulasByCategory(selectedCategory);
    }
    return formulas;
  }, [searchQuery, selectedCategory]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    formulaCategories.forEach((cat) => {
      counts[cat.id] = formulas.filter((f) => f.category === cat.id).length;
    });
    return counts;
  }, []);

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(selectedCategory === categoryId ? null : categoryId);
    setSearchQuery("");
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Hero Section */}
        <div className="text-center mb-10 space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold gradient-text">Formulalar to'plami</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Fizikaning barcha bo'limlari bo'yicha formulalar, ularning ta'riflari va o'zgaruvchilari
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Formula yoki mavzu bo'yicha qidiring..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSelectedCategory(null);
              }}
              className="pl-12 pr-12 h-12 text-base rounded-xl bg-secondary/30 border-border/50 focus:border-primary/50"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2"
                onClick={clearSearch}
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Categories Sidebar */}
          <aside className="lg:w-72 shrink-0">
            <div className="sticky top-24 space-y-2">
              <h2 className="text-sm font-semibold text-muted-foreground mb-3 px-1">Kategoriyalar</h2>
              <div className="space-y-2">
                {formulaCategories.map((category) => (
                  <CategoryCard
                    key={category.id}
                    category={category}
                    count={categoryCounts[category.id]}
                    isActive={selectedCategory === category.id}
                    onClick={() => handleCategoryClick(category.id)}
                  />
                ))}
              </div>
              {selectedCategory && (
                <Button variant="ghost" size="sm" className="w-full mt-4" onClick={() => setSelectedCategory(null)}>
                  <X className="w-4 h-4 mr-2" />
                  Filterni tozalash
                </Button>
              )}
            </div>
          </aside>

          {/* Formulas Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">
                {searchQuery
                  ? `Qidiruv natijalari: "${searchQuery}"`
                  : selectedCategory
                  ? formulaCategories.find((c) => c.id === selectedCategory)?.name
                  : "Barcha formulalar"}
              </h2>
              <Badge variant="secondary">{filteredFormulas.length} ta formula</Badge>
            </div>

            {filteredFormulas.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">Hech qanday formula topilmadi</p>
                <p className="text-sm text-muted-foreground mt-2">Boshqa kalit so'z bilan qidirib ko'ring</p>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {filteredFormulas.map((formula) => (
                  <FormulaCard key={formula.id} formula={formula} onClick={() => setSelectedFormula(formula)} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Formula Detail Modal */}
      <FormulaDetailModal 
        formula={selectedFormula} 
        open={selectedFormula !== null} 
        onOpenChange={(open) => !open && setSelectedFormula(null)} 
      />
    </div>
  );
};

export default Formulas;
