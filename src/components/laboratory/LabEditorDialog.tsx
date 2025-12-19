import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Trash2 } from "lucide-react";
import { TableColumn } from "@/types/physics";

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

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: LabFormData) => void;
  initialData?: LabFormData | null;
  isEditing?: boolean;
}

const emptyFormData: LabFormData = {
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
  table_columns: [
    { id: "n", name: "№", nameUz: "№", unit: "", isInput: false }
  ],
};

export const LabEditorDialog = ({
  open,
  onOpenChange,
  onSave,
  initialData,
  isEditing = false,
}: Props) => {
  const [formData, setFormData] = useState<LabFormData>(emptyFormData);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData(emptyFormData);
    }
  }, [initialData, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      // Clean up empty strings from arrays
      const cleanedData = {
        ...formData,
        equipment: formData.equipment.filter(e => e.trim() !== ""),
        equipment_uz: formData.equipment_uz.filter(e => e.trim() !== ""),
        procedure: formData.procedure.filter(p => p.trim() !== ""),
        procedure_uz: formData.procedure_uz.filter(p => p.trim() !== ""),
      };
      await onSave(cleanedData);
      onOpenChange(false);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const addArrayItem = (field: "equipment" | "equipment_uz" | "procedure" | "procedure_uz") => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const removeArrayItem = (field: "equipment" | "equipment_uz" | "procedure" | "procedure_uz", index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const updateArrayItem = (field: "equipment" | "equipment_uz" | "procedure" | "procedure_uz", index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item),
    }));
  };

  const addTableColumn = () => {
    const newId = `col_${Date.now()}`;
    setFormData(prev => ({
      ...prev,
      table_columns: [...prev.table_columns, {
        id: newId,
        name: "",
        nameUz: "",
        unit: "",
        isInput: true,
      }],
    }));
  };

  const removeTableColumn = (index: number) => {
    setFormData(prev => ({
      ...prev,
      table_columns: prev.table_columns.filter((_, i) => i !== index),
    }));
  };

  const updateTableColumn = (index: number, field: keyof TableColumn, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      table_columns: prev.table_columns.map((col, i) => 
        i === index ? { ...col, [field]: value } : col
      ),
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle>
            {isEditing ? "Laboratoriyani tahrirlash" : "Yangi laboratoriya qo'shish"}
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="max-h-[calc(90vh-8rem)] px-6">
          <form onSubmit={handleSubmit} className="space-y-6 pb-6">
            {/* Title */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Nomi (EN)</Label>
                <Input
                  value={formData.title}
                  onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Laboratory title"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Nomi (UZ)</Label>
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
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Maqsad (UZ)</Label>
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
                    <Input
                      value={item}
                      onChange={e => updateArrayItem("equipment", i, e.target.value)}
                      placeholder={`Asbob ${i + 1}`}
                    />
                    <Button type="button" variant="ghost" size="icon" onClick={() => removeArrayItem("equipment", i)}>
                      <Trash2 className="w-4 h-4 text-destructive" />
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
                    <Input
                      value={item}
                      onChange={e => updateArrayItem("equipment_uz", i, e.target.value)}
                      placeholder={`Asbob ${i + 1}`}
                    />
                    <Button type="button" variant="ghost" size="icon" onClick={() => removeArrayItem("equipment_uz", i)}>
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Theory */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Nazariya (EN)</Label>
                <Textarea
                  value={formData.theory}
                  onChange={e => setFormData(prev => ({ ...prev, theory: e.target.value }))}
                  placeholder="Theory"
                  className="min-h-[150px]"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Nazariya (UZ)</Label>
                <Textarea
                  value={formData.theory_uz}
                  onChange={e => setFormData(prev => ({ ...prev, theory_uz: e.target.value }))}
                  placeholder="Nazariya"
                  className="min-h-[150px]"
                  required
                />
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
                    <Input
                      value={item}
                      onChange={e => updateArrayItem("procedure", i, e.target.value)}
                      placeholder={`Qadam ${i + 1}`}
                    />
                    <Button type="button" variant="ghost" size="icon" onClick={() => removeArrayItem("procedure", i)}>
                      <Trash2 className="w-4 h-4 text-destructive" />
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
                    <Input
                      value={item}
                      onChange={e => updateArrayItem("procedure_uz", i, e.target.value)}
                      placeholder={`Qadam ${i + 1}`}
                    />
                    <Button type="button" variant="ghost" size="icon" onClick={() => removeArrayItem("procedure_uz", i)}>
                      <Trash2 className="w-4 h-4 text-destructive" />
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
                    <Input
                      value={col.id}
                      onChange={e => updateTableColumn(i, "id", e.target.value)}
                      placeholder="ID"
                      className="w-24"
                    />
                    <Input
                      value={col.name}
                      onChange={e => updateTableColumn(i, "name", e.target.value)}
                      placeholder="Nomi (EN)"
                      className="flex-1"
                    />
                    <Input
                      value={col.nameUz}
                      onChange={e => updateTableColumn(i, "nameUz", e.target.value)}
                      placeholder="Nomi (UZ)"
                      className="flex-1"
                    />
                    <Input
                      value={col.unit}
                      onChange={e => updateTableColumn(i, "unit", e.target.value)}
                      placeholder="Birlik"
                      className="w-20"
                    />
                    <label className="flex items-center gap-1 text-sm whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={col.isInput}
                        onChange={e => updateTableColumn(i, "isInput", e.target.checked)}
                        className="rounded"
                      />
                      Kiritish
                    </label>
                    <Button type="button" variant="ghost" size="icon" onClick={() => removeTableColumn(i)}>
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit */}
            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Bekor qilish
              </Button>
              <Button type="submit" disabled={saving}>
                {saving ? "Saqlanmoqda..." : isEditing ? "Saqlash" : "Qo'shish"}
              </Button>
            </div>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
