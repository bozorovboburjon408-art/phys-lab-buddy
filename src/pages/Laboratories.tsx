import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { LabTable } from "@/components/laboratory/LabTable";
import { laboratories as staticLaboratories } from "@/data/laboratories";
import { cn } from "@/lib/utils";
import { Target, Wrench, BookOpen, ListOrdered, Table, ArrowLeft, ChevronDown, Lock, Plus, Edit, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { LabExperiment, TableColumn } from "@/types/physics";

interface DbLaboratory {
  id: string;
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
  sort_order: number;
}

const Laboratories = () => {
  const [laboratories, setLaboratories] = useState<LabExperiment[]>(staticLaboratories);
  const [loading, setLoading] = useState(true);
  const [selectedLab, setSelectedLab] = useState<LabExperiment | null>(null);
  const [openSections, setOpenSections] = useState<string[]>(["purpose", "equipment", "theory", "procedure", "table"]);
  
  // Admin state
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingLab, setEditingLab] = useState<LabExperiment | null>(null);
  const [saving, setSaving] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    title_uz: "",
    purpose: "",
    purpose_uz: "",
    equipment: [""],
    equipment_uz: [""],
    theory: "",
    theory_uz: "",
    procedure: [""],
    procedure_uz: [""],
    table_columns: [{ id: "n", name: "№", nameUz: "№", unit: "", isInput: false }] as TableColumn[],
  });

  useEffect(() => {
    fetchLaboratories();
  }, []);

  const fetchLaboratories = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("laboratories")
        .select("*")
        .order("sort_order", { ascending: true });

      if (error) {
        console.error("Error fetching laboratories:", error);
        setLaboratories(staticLaboratories);
        return;
      }

      if (data && data.length > 0) {
        const convertedLabs: LabExperiment[] = data.map((lab: any) => ({
          id: lab.id,
          title: lab.title,
          titleUz: lab.title_uz,
          purpose: lab.purpose,
          purposeUz: lab.purpose_uz,
          equipment: lab.equipment,
          equipmentUz: lab.equipment_uz,
          theory: lab.theory,
          theoryUz: lab.theory_uz,
          procedure: lab.procedure,
          procedureUz: lab.procedure_uz,
          tableColumns: lab.table_columns as TableColumn[],
          calculations: createCalculationsFunction(lab.id),
        }));
        setLaboratories(convertedLabs);
      } else {
        setLaboratories(staticLaboratories);
      }
    } catch (err) {
      console.error("Error:", err);
      setLaboratories(staticLaboratories);
    } finally {
      setLoading(false);
    }
  };

  const createCalculationsFunction = (labId: string) => {
    const staticLab = staticLaboratories.find(l => l.id === labId);
    if (staticLab) return staticLab.calculations;
    return () => ({});
  };

  const handleAdminLogin = async () => {
    try {
      const response = await supabase.functions.invoke("lab-admin", {
        body: { action: "verify", password: adminPassword },
      });

      if (response.error) {
        toast.error("Xatolik yuz berdi");
        return;
      }

      if (!response.data?.success) {
        toast.error(response.data?.error || "Noto'g'ri parol");
        return;
      }

      setIsAdmin(true);
      setShowAdminLogin(false);
      toast.success("Admin sifatida kirdingiz");
    } catch {
      toast.error("Xatolik yuz berdi");
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      title_uz: "",
      purpose: "",
      purpose_uz: "",
      equipment: [""],
      equipment_uz: [""],
      theory: "",
      theory_uz: "",
      procedure: [""],
      procedure_uz: [""],
      table_columns: [{ id: "n", name: "№", nameUz: "№", unit: "", isInput: false }],
    });
    setEditingLab(null);
  };

  const openAddDialog = () => {
    resetForm();
    setShowAddDialog(true);
  };

  const openEditDialog = (lab: LabExperiment) => {
    setEditingLab(lab);
    setFormData({
      title: lab.title,
      title_uz: lab.titleUz,
      purpose: lab.purpose,
      purpose_uz: lab.purposeUz,
      equipment: lab.equipment.length > 0 ? lab.equipment : [""],
      equipment_uz: lab.equipmentUz.length > 0 ? lab.equipmentUz : [""],
      theory: lab.theory,
      theory_uz: lab.theoryUz,
      procedure: lab.procedure.length > 0 ? lab.procedure : [""],
      procedure_uz: lab.procedureUz.length > 0 ? lab.procedureUz : [""],
      table_columns: lab.tableColumns,
    });
    setShowAddDialog(true);
  };

  const handleSave = async () => {
    if (!formData.title_uz || !formData.purpose_uz) {
      toast.error("Sarlavha va maqsad majburiy");
      return;
    }

    setSaving(true);

    try {
      const cleanedData = {
        title: formData.title || formData.title_uz,
        title_uz: formData.title_uz,
        purpose: formData.purpose || formData.purpose_uz,
        purpose_uz: formData.purpose_uz,
        equipment: formData.equipment.filter(e => e.trim() !== ""),
        equipment_uz: formData.equipment_uz.filter(e => e.trim() !== ""),
        theory: formData.theory || formData.theory_uz,
        theory_uz: formData.theory_uz,
        procedure: formData.procedure.filter(p => p.trim() !== ""),
        procedure_uz: formData.procedure_uz.filter(p => p.trim() !== ""),
        table_columns: formData.table_columns,
      };

      const response = await supabase.functions.invoke("lab-admin", {
        body: {
          action: editingLab ? "update" : "add",
          password: adminPassword,
          id: editingLab?.id,
          ...cleanedData,
          sort_order: editingLab ? undefined : laboratories.length,
        },
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      if (!response.data?.success) {
        throw new Error(response.data?.error || "Xatolik yuz berdi");
      }

      toast.success(editingLab ? "Laboratoriya yangilandi" : "Laboratoriya qo'shildi");
      setShowAddDialog(false);
      resetForm();
      fetchLaboratories();
    } catch (error) {
      console.error("Error saving lab:", error);
      toast.error("Saqlashda xatolik");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (lab: LabExperiment) => {
    if (!confirm(`"${lab.titleUz}" laboratoriyasini o'chirmoqchimisiz?`)) return;

    try {
      const response = await supabase.functions.invoke("lab-admin", {
        body: { action: "delete", password: adminPassword, id: lab.id },
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      if (!response.data?.success) {
        throw new Error(response.data?.error || "O'chirishda xatolik");
      }

      toast.success("Laboratoriya o'chirildi");
      fetchLaboratories();
    } catch (error) {
      toast.error("O'chirishda xatolik");
    }
  };

  const addArrayItem = (field: "equipment" | "equipment_uz" | "procedure" | "procedure_uz") => {
    setFormData(prev => ({ ...prev, [field]: [...prev[field], ""] }));
  };

  const removeArrayItem = (field: "equipment" | "equipment_uz" | "procedure" | "procedure_uz", index: number) => {
    setFormData(prev => ({ ...prev, [field]: prev[field].filter((_, i) => i !== index) }));
  };

  const updateArrayItem = (field: "equipment" | "equipment_uz" | "procedure" | "procedure_uz", index: number, value: string) => {
    setFormData(prev => ({ ...prev, [field]: prev[field].map((item, i) => i === index ? value : item) }));
  };

  const addTableColumn = () => {
    const newId = `col_${Date.now()}`;
    setFormData(prev => ({
      ...prev,
      table_columns: [...prev.table_columns, { id: newId, name: "", nameUz: "", unit: "", isInput: true }],
    }));
  };

  const removeTableColumn = (index: number) => {
    setFormData(prev => ({ ...prev, table_columns: prev.table_columns.filter((_, i) => i !== index) }));
  };

  const updateTableColumn = (index: number, field: keyof TableColumn, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      table_columns: prev.table_columns.map((col, i) => i === index ? { ...col, [field]: value } : col),
    }));
  };

  const toggleSection = (section: string) => {
    setOpenSections(prev => prev.includes(section) ? prev.filter(s => s !== section) : [...prev, section]);
  };

  const isOpen = (section: string) => openSections.includes(section);

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
                  <Button onClick={openAddDialog}>
                    <Plus className="w-4 h-4 mr-2" />
                    Yangi laboratoriya
                  </Button>
                  <Button variant="outline" onClick={() => setIsAdmin(false)}>
                    Chiqish
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
                      <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEditDialog(lab)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => handleDelete(lab)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                    
                    <button onClick={() => setSelectedLab(lab)} className="w-full text-left">
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

        {/* Add/Edit Dialog */}
        <Dialog open={showAddDialog} onOpenChange={(open) => { setShowAddDialog(open); if (!open) resetForm(); }}>
          <DialogContent className="max-w-4xl max-h-[90vh] p-0">
            <DialogHeader className="px-6 pt-6">
              <DialogTitle>{editingLab ? "Laboratoriyani tahrirlash" : "Yangi laboratoriya qo'shish"}</DialogTitle>
            </DialogHeader>
            
            <ScrollArea className="max-h-[calc(90vh-8rem)] px-6">
              <div className="space-y-6 pb-6">
                {/* Title */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Nomi (EN)</Label>
                    <Input
                      value={formData.title}
                      onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Laboratory title"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Nomi (UZ) *</Label>
                    <Input
                      value={formData.title_uz}
                      onChange={e => setFormData(prev => ({ ...prev, title_uz: e.target.value }))}
                      placeholder="Laboratoriya nomi"
                      required
                    />
                  </div>
                </div>

                {/* Purpose */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Maqsad (EN)</Label>
                    <Textarea
                      value={formData.purpose}
                      onChange={e => setFormData(prev => ({ ...prev, purpose: e.target.value }))}
                      placeholder="Purpose"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Maqsad (UZ) *</Label>
                    <Textarea
                      value={formData.purpose_uz}
                      onChange={e => setFormData(prev => ({ ...prev, purpose_uz: e.target.value }))}
                      placeholder="Maqsad"
                      required
                    />
                  </div>
                </div>

                {/* Equipment */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Asboblar (EN)</Label>
                      <Button type="button" variant="ghost" size="sm" onClick={() => addArrayItem("equipment")}>
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    {formData.equipment.map((item, i) => (
                      <div key={i} className="flex gap-2">
                        <Input value={item} onChange={e => updateArrayItem("equipment", i, e.target.value)} placeholder={`Asbob ${i + 1}`} />
                        <Button type="button" variant="ghost" size="icon" onClick={() => removeArrayItem("equipment", i)}>
                          <X className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Asboblar (UZ)</Label>
                      <Button type="button" variant="ghost" size="sm" onClick={() => addArrayItem("equipment_uz")}>
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    {formData.equipment_uz.map((item, i) => (
                      <div key={i} className="flex gap-2">
                        <Input value={item} onChange={e => updateArrayItem("equipment_uz", i, e.target.value)} placeholder={`Asbob ${i + 1}`} />
                        <Button type="button" variant="ghost" size="icon" onClick={() => removeArrayItem("equipment_uz", i)}>
                          <X className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Theory */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Nazariya (EN)</Label>
                    <Textarea value={formData.theory} onChange={e => setFormData(prev => ({ ...prev, theory: e.target.value }))} placeholder="Theory" className="min-h-[150px]" />
                  </div>
                  <div className="space-y-2">
                    <Label>Nazariya (UZ)</Label>
                    <Textarea value={formData.theory_uz} onChange={e => setFormData(prev => ({ ...prev, theory_uz: e.target.value }))} placeholder="Nazariya" className="min-h-[150px]" />
                  </div>
                </div>

                {/* Procedure */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Ish tartibi (EN)</Label>
                      <Button type="button" variant="ghost" size="sm" onClick={() => addArrayItem("procedure")}>
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    {formData.procedure.map((item, i) => (
                      <div key={i} className="flex gap-2">
                        <span className="w-6 h-10 flex items-center justify-center text-sm text-muted-foreground">{i + 1}.</span>
                        <Input value={item} onChange={e => updateArrayItem("procedure", i, e.target.value)} placeholder={`Qadam ${i + 1}`} />
                        <Button type="button" variant="ghost" size="icon" onClick={() => removeArrayItem("procedure", i)}>
                          <X className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Ish tartibi (UZ)</Label>
                      <Button type="button" variant="ghost" size="sm" onClick={() => addArrayItem("procedure_uz")}>
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    {formData.procedure_uz.map((item, i) => (
                      <div key={i} className="flex gap-2">
                        <span className="w-6 h-10 flex items-center justify-center text-sm text-muted-foreground">{i + 1}.</span>
                        <Input value={item} onChange={e => updateArrayItem("procedure_uz", i, e.target.value)} placeholder={`Qadam ${i + 1}`} />
                        <Button type="button" variant="ghost" size="icon" onClick={() => removeArrayItem("procedure_uz", i)}>
                          <X className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Table Columns */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Jadval ustunlari</Label>
                    <Button type="button" variant="ghost" size="sm" onClick={addTableColumn}>
                      <Plus className="w-4 h-4 mr-1" /> Ustun qo'shish
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {formData.table_columns.map((col, i) => (
                      <div key={i} className="flex gap-2 items-center p-2 rounded-lg bg-secondary/30">
                        <Input value={col.id} onChange={e => updateTableColumn(i, "id", e.target.value)} placeholder="ID" className="w-24" />
                        <Input value={col.name} onChange={e => updateTableColumn(i, "name", e.target.value)} placeholder="Nomi (EN)" className="flex-1" />
                        <Input value={col.nameUz} onChange={e => updateTableColumn(i, "nameUz", e.target.value)} placeholder="Nomi (UZ)" className="flex-1" />
                        <Input value={col.unit} onChange={e => updateTableColumn(i, "unit", e.target.value)} placeholder="Birlik" className="w-20" />
                        <label className="flex items-center gap-1 text-sm whitespace-nowrap">
                          <input type="checkbox" checked={col.isInput} onChange={e => updateTableColumn(i, "isInput", e.target.checked)} className="rounded" />
                          Kiritish
                        </label>
                        <Button type="button" variant="ghost" size="icon" onClick={() => removeTableColumn(i)}>
                          <X className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Submit */}
                <div className="flex justify-end gap-2 pt-4 border-t">
                  <Button type="button" variant="outline" onClick={() => setShowAddDialog(false)}>
                    Bekor qilish
                  </Button>
                  <Button onClick={handleSave} disabled={saving}>
                    {saving ? "Saqlanmoqda..." : editingLab ? "Saqlash" : "Qo'shish"}
                  </Button>
                </div>
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  // Lab Detail View
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 pb-8 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-6 fade-in-up">
            <Button variant="ghost" size="sm" onClick={() => setSelectedLab(null)} className="mb-4 group">
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

          <div className="space-y-4">
            <CollapsibleSection title="Ishning maqsadi" icon={<Target className="w-5 h-5 text-primary" />} isOpen={isOpen("purpose")} onToggle={() => toggleSection("purpose")}>
              <p className="text-foreground leading-relaxed">{selectedLab.purposeUz}</p>
            </CollapsibleSection>

            <CollapsibleSection title="Kerakli asbob va uskunalar" icon={<Wrench className="w-5 h-5 text-primary" />} isOpen={isOpen("equipment")} onToggle={() => toggleSection("equipment")}>
              <div className="grid sm:grid-cols-2 gap-2">
                {selectedLab.equipmentUz.map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </CollapsibleSection>

            <CollapsibleSection title="Nazariy qism" icon={<BookOpen className="w-5 h-5 text-primary" />} isOpen={isOpen("theory")} onToggle={() => toggleSection("theory")}>
              <p className="text-foreground leading-relaxed whitespace-pre-line">{selectedLab.theoryUz}</p>
            </CollapsibleSection>

            <CollapsibleSection title="Ishni bajarish tartibi" icon={<ListOrdered className="w-5 h-5 text-primary" />} isOpen={isOpen("procedure")} onToggle={() => toggleSection("procedure")}>
              <ol className="space-y-3">
                {selectedLab.procedureUz.map((step, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="w-7 h-7 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-mono shrink-0">{i + 1}</span>
                    <span className="pt-0.5">{step}</span>
                  </li>
                ))}
              </ol>
            </CollapsibleSection>

            <CollapsibleSection title="Natijalar jadvali" icon={<Table className="w-5 h-5 text-primary" />} isOpen={isOpen("table")} onToggle={() => toggleSection("table")}>
              <p className="text-muted-foreground text-sm mb-4">
                Boshlang'ich qiymatlarni kiriting. Tizim avtomatik ravishda hisoblangan qiymatlarni to'ldiradi.
              </p>
              <div className="overflow-x-auto">
                <LabTable labId={selectedLab.id} columns={selectedLab.tableColumns} calculations={selectedLab.calculations} />
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
}: {
  title: string;
  icon: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) => (
  <div className="glass-card overflow-hidden slide-in-bottom">
    <button onClick={onToggle} className="w-full px-6 py-4 flex items-center justify-between hover:bg-secondary/30 transition-colors group">
      <div className="flex items-center gap-3">
        {icon}
        <span className="font-semibold">{title}</span>
      </div>
      <ChevronDown className={cn("w-5 h-5 text-muted-foreground transition-transform duration-300", isOpen && "rotate-180")} />
    </button>
    
    <div className={cn("overflow-hidden transition-all duration-500 ease-in-out", isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0")}>
      <div className="px-6 pb-6">{children}</div>
    </div>
  </div>
);

export default Laboratories;
