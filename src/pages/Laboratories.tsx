import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { LabTable } from "@/components/laboratory/LabTable";
import { LabEditorDialog } from "@/components/laboratory/LabEditorDialog";
import { useLaboratories } from "@/hooks/useLaboratories";
import { useAdmin } from "@/hooks/useAdmin";
import { cn } from "@/lib/utils";
import { Target, Wrench, BookOpen, ListOrdered, Table, ArrowLeft, ChevronDown, Plus, Edit, Trash2, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { LabExperiment, TableColumn } from "@/types/physics";

interface LabFormData {
  title: string;
  title_uz: string;
  purpose: string;
  purpose_uz: string;
  equipment: string[];
  equipment_uz: string[];
  theory: string;
  theory_uz: string;
  procedure: string[];
  procedure_uz: string[];
  table_columns: TableColumn[];
}

const Laboratories = () => {
  const { laboratories, loading, createLaboratory, updateLaboratory, deleteLaboratory } = useLaboratories();
  const { isAdmin } = useAdmin();
  const [selectedLab, setSelectedLab] = useState<LabExperiment | null>(null);
  const [openSections, setOpenSections] = useState<string[]>(["purpose", "equipment", "theory", "procedure", "table"]);
  
  // Admin state
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingLab, setEditingLab] = useState<LabExperiment | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [labToDelete, setLabToDelete] = useState<LabExperiment | null>(null);

  const toggleSection = (section: string) => {
    setOpenSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const isOpen = (section: string) => openSections.includes(section);

  const handleAddNew = () => {
    setEditingLab(null);
    setEditorOpen(true);
  };

  const handleEdit = (lab: LabExperiment, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingLab(lab);
    setEditorOpen(true);
  };

  const handleDelete = (lab: LabExperiment, e: React.MouseEvent) => {
    e.stopPropagation();
    setLabToDelete(lab);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (labToDelete) {
      await deleteLaboratory(labToDelete.id);
      setLabToDelete(null);
      setDeleteDialogOpen(false);
    }
  };

  const handleSave = async (data: LabFormData) => {
    if (editingLab) {
      await updateLaboratory(editingLab.id, data);
    } else {
      await createLaboratory(data);
    }
  };

  const convertLabToFormData = (lab: LabExperiment): LabFormData => ({
    title: lab.title,
    title_uz: lab.titleUz,
    purpose: lab.purpose,
    purpose_uz: lab.purposeUz,
    equipment: lab.equipment,
    equipment_uz: lab.equipmentUz,
    theory: lab.theory,
    theory_uz: lab.theoryUz,
    procedure: lab.procedure,
    procedure_uz: lab.procedureUz,
    table_columns: lab.tableColumns,
  });

  // Lab List View
  if (!selectedLab) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-20 pb-8 px-4">
          <div className="container mx-auto">
            {/* Header */}
            <div className="mb-8 fade-in-up text-center">
              <h1 className="text-3xl font-bold mb-2">Laboratoriya ishlari</h1>
              <p className="text-muted-foreground">
                Laboratoriyani tanlang va tajribani boshlang
              </p>
              
              {isAdmin && (
                <div className="mt-4 flex items-center justify-center gap-2">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                    <Shield className="w-4 h-4" />
                    Admin rejimi
                  </span>
                  <Button onClick={handleAddNew} size="sm" className="gap-1">
                    <Plus className="w-4 h-4" />
                    Yangi qo'shish
                  </Button>
                </div>
              )}
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
              </div>
            ) : (
              /* Lab Grid */
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {laboratories.map((lab, index) => (
                  <div
                    key={lab.id}
                    className="glass-card p-6 text-left hover:glow-border transition-all duration-300 group hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 fade-in-up relative"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    {isAdmin && (
                      <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={(e) => handleEdit(lab, e)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:text-destructive"
                          onClick={(e) => handleDelete(lab, e)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                    
                    <button
                      onClick={() => setSelectedLab(lab)}
                      className="w-full text-left"
                    >
                      <div className="flex items-start gap-4">
                        <span className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-lg font-bold shrink-0 group-hover:bg-primary/20 group-hover:scale-110 transition-all">
                          {index + 1}
                        </span>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
                            {lab.titleUz}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {lab.purposeUz}
                          </p>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          {lab.equipmentUz.length} ta asbob
                        </span>
                        <span className="text-xs text-primary group-hover:translate-x-1 transition-transform">
                          Boshlash →
                        </span>
                      </div>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>

        {/* Editor Dialog */}
        <LabEditorDialog
          open={editorOpen}
          onOpenChange={setEditorOpen}
          onSave={handleSave}
          initialData={editingLab ? convertLabToFormData(editingLab) : null}
          isEditing={!!editingLab}
        />

        {/* Delete Confirmation */}
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Laboratoriyani o'chirish</AlertDialogTitle>
              <AlertDialogDescription>
                "{labToDelete?.titleUz}" laboratoriyasini o'chirishni xohlaysizmi? Bu amalni qaytarib bo'lmaydi.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Bekor qilish</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                O'chirish
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    );
  }

  // Lab Detail View (Full Screen)
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 pb-8 px-4">
        <div className="container mx-auto max-w-5xl">
          {/* Back Button & Title */}
          <div className="mb-6 fade-in-up">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setSelectedLab(null)}
              className="mb-4 group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Barcha laboratoriyalar
            </Button>
            
            <div className="glass-card p-6 glow-border">
              <div className="flex items-center gap-4">
                <span className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-xl font-bold">
                  {laboratories.findIndex(l => l.id === selectedLab.id) + 1}
                </span>
                <h1 className="text-2xl font-bold">{selectedLab.titleUz}</h1>
              </div>
            </div>
          </div>

          {/* Content Sections */}
          <div className="space-y-4">
            {/* Purpose */}
            <CollapsibleSection
              title="Ishning maqsadi"
              icon={<Target className="w-5 h-5 text-primary" />}
              isOpen={isOpen("purpose")}
              onToggle={() => toggleSection("purpose")}
            >
              <p className="text-foreground leading-relaxed">{selectedLab.purposeUz}</p>
            </CollapsibleSection>

            {/* Equipment */}
            <CollapsibleSection
              title="Kerakli asbob va uskunalar"
              icon={<Wrench className="w-5 h-5 text-primary" />}
              isOpen={isOpen("equipment")}
              onToggle={() => toggleSection("equipment")}
            >
              <div className="grid sm:grid-cols-2 gap-2">
                {selectedLab.equipmentUz.map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </CollapsibleSection>

            {/* Theory */}
            <CollapsibleSection
              title="Nazariy qism"
              icon={<BookOpen className="w-5 h-5 text-primary" />}
              isOpen={isOpen("theory")}
              onToggle={() => toggleSection("theory")}
            >
              <p className="text-foreground leading-relaxed whitespace-pre-line">{selectedLab.theoryUz}</p>
            </CollapsibleSection>

            {/* Procedure */}
            <CollapsibleSection
              title="Ishni bajarish tartibi"
              icon={<ListOrdered className="w-5 h-5 text-primary" />}
              isOpen={isOpen("procedure")}
              onToggle={() => toggleSection("procedure")}
            >
              <ol className="space-y-3">
                {selectedLab.procedureUz.map((step, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="w-7 h-7 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-mono shrink-0">
                      {i + 1}
                    </span>
                    <span className="pt-0.5">{step}</span>
                  </li>
                ))}
              </ol>
            </CollapsibleSection>

            {/* Table */}
            <CollapsibleSection
              title="Natijalar jadvali"
              icon={<Table className="w-5 h-5 text-primary" />}
              isOpen={isOpen("table")}
              onToggle={() => toggleSection("table")}
              defaultOpen
            >
              <p className="text-muted-foreground text-sm mb-4">
                Boshlang'ich qiymatlarni kiriting. Tizim avtomatik ravishda hisoblangan qiymatlarni to'ldiradi.
              </p>
              <div className="overflow-x-auto">
                <LabTable
                  labId={selectedLab.id}
                  columns={selectedLab.tableColumns}
                  calculations={selectedLab.calculations}
                />
              </div>
            </CollapsibleSection>
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
  children,
  defaultOpen
}: {
  title: string;
  icon: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) => (
  <div className="glass-card overflow-hidden slide-in-bottom">
    <button
      onClick={onToggle}
      className="w-full px-6 py-4 flex items-center justify-between hover:bg-secondary/30 transition-colors group"
    >
      <div className="flex items-center gap-3">
        {icon}
        <span className="font-semibold">{title}</span>
      </div>
      <ChevronDown className={cn(
        "w-5 h-5 text-muted-foreground transition-transform duration-300",
        isOpen && "rotate-180"
      )} />
    </button>
    
    <div className={cn(
      "overflow-hidden transition-all duration-500 ease-in-out",
      isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
    )}>
      <div className="px-6 pb-6">
        {children}
      </div>
    </div>
  </div>
);

export default Laboratories;