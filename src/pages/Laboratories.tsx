import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { LabTable } from "@/components/laboratory/LabTable";
import { laboratories } from "@/data/laboratories";
import { cn } from "@/lib/utils";
import { Target, Wrench, BookOpen, ListOrdered, Table, ChevronDown } from "lucide-react";

const Laboratories = () => {
  const [selectedLab, setSelectedLab] = useState(laboratories[0]);
  const [openSections, setOpenSections] = useState<string[]>(["table"]);

  const toggleSection = (section: string) => {
    setOpenSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const isOpen = (section: string) => openSections.includes(section);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 pb-8 px-4">
        <div className="container mx-auto">
          {/* Header */}
          <div className="mb-6 fade-in-up">
            <h1 className="text-2xl font-bold mb-1">Laboratoriya ishlari</h1>
            <p className="text-muted-foreground text-sm">
              Tajribani tanlang, nazariyani o'qing va jadvalga qiymatlarni kiritib natijalarni kuzating
            </p>
          </div>

          <div className="grid lg:grid-cols-[240px_1fr] gap-4">
            {/* Sidebar - Lab List */}
            <div className="slide-in-left">
              <h2 className="text-xs font-medium text-muted-foreground mb-3 px-2">
                LABORATORIYALAR ({laboratories.length})
              </h2>
              <div className="space-y-1 max-h-[calc(100vh-180px)] overflow-y-auto pr-1">
                {laboratories.map((lab, index) => (
                  <button
                    key={lab.id}
                    onClick={() => setSelectedLab(lab)}
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-lg transition-all duration-300",
                      "hover:bg-secondary/80 hover:translate-x-1",
                      selectedLab.id === lab.id
                        ? "bg-primary/10 border border-primary/30 text-primary"
                        : "bg-card/50 border border-transparent text-foreground"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-secondary flex items-center justify-center text-[10px] font-mono shrink-0">
                        {index + 1}
                      </span>
                      <span className="text-xs font-medium line-clamp-2">{lab.titleUz}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Main Content */}
            <div className="space-y-4" key={selectedLab.id}>
              {/* Lab Header + Table Row */}
              <div className="grid xl:grid-cols-[1fr_400px] gap-4">
                {/* Left Column - Info Sections */}
                <div className="space-y-3">
                  {/* Lab Title */}
                  <div className="glass-card p-4 glow-border scale-in">
                    <h2 className="text-lg font-bold">{selectedLab.titleUz}</h2>
                  </div>

                  {/* Purpose & Equipment Row */}
                  <div className="grid md:grid-cols-2 gap-3">
                    {/* Purpose */}
                    <CollapsibleSection
                      title="Ishning maqsadi"
                      icon={<Target className="w-4 h-4 text-primary" />}
                      isOpen={isOpen("purpose")}
                      onToggle={() => toggleSection("purpose")}
                    >
                      <p className="text-sm text-foreground">{selectedLab.purposeUz}</p>
                    </CollapsibleSection>

                    {/* Equipment */}
                    <CollapsibleSection
                      title="Asbob va uskunalar"
                      icon={<Wrench className="w-4 h-4 text-primary" />}
                      isOpen={isOpen("equipment")}
                      onToggle={() => toggleSection("equipment")}
                    >
                      <ul className="space-y-1">
                        {selectedLab.equipmentUz.map((item, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CollapsibleSection>
                  </div>

                  {/* Theory & Procedure Row */}
                  <div className="grid md:grid-cols-2 gap-3">
                    {/* Theory */}
                    <CollapsibleSection
                      title="Nazariy qism"
                      icon={<BookOpen className="w-4 h-4 text-primary" />}
                      isOpen={isOpen("theory")}
                      onToggle={() => toggleSection("theory")}
                    >
                      <div className="max-h-[200px] overflow-y-auto">
                        <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">{selectedLab.theoryUz}</p>
                      </div>
                    </CollapsibleSection>

                    {/* Procedure */}
                    <CollapsibleSection
                      title="Bajarish tartibi"
                      icon={<ListOrdered className="w-4 h-4 text-primary" />}
                      isOpen={isOpen("procedure")}
                      onToggle={() => toggleSection("procedure")}
                    >
                      <div className="max-h-[200px] overflow-y-auto">
                        <ol className="space-y-2">
                          {selectedLab.procedureUz.map((step, i) => (
                            <li key={i} className="flex gap-2 text-sm">
                              <span className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-mono shrink-0">
                                {i + 1}
                              </span>
                              <span>{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    </CollapsibleSection>
                  </div>
                </div>

                {/* Right Column - Table */}
                <div className="glass-card p-4 slide-in-right h-fit">
                  <div className="flex items-center gap-2 mb-3">
                    <Table className="w-4 h-4 text-primary" />
                    <h3 className="text-sm font-semibold">Natijalar jadvali</h3>
                  </div>
                  <p className="text-muted-foreground text-xs mb-3">
                    Qiymatlarni kiriting, tizim avtomatik hisoblaydi.
                  </p>
                  <LabTable
                    labId={selectedLab.id}
                    columns={selectedLab.tableColumns}
                    calculations={selectedLab.calculations}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const CollapsibleSection = ({
  title,
  icon,
  isOpen,
  onToggle,
  children
}: {
  title: string;
  icon: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) => (
  <div className="glass-card overflow-hidden">
    <button
      onClick={onToggle}
      className="w-full px-4 py-3 flex items-center justify-between hover:bg-secondary/30 transition-colors"
    >
      <div className="flex items-center gap-2">
        {icon}
        <span className="font-semibold text-sm">{title}</span>
      </div>
      <ChevronDown className={cn("w-4 h-4 text-muted-foreground transition-transform duration-300", isOpen && "rotate-180")} />
    </button>
    
    <div className={cn(
      "overflow-hidden transition-all duration-300",
      isOpen ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
    )}>
      <div className="px-4 pb-4">
        {children}
      </div>
    </div>
  </div>
);

export default Laboratories;