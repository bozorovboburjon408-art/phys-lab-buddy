import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { laboratories as staticLaboratories } from "@/data/laboratories";
import { LabExperiment, TableColumn } from "@/types/physics";
import { toast } from "sonner";
import { Json } from "@/integrations/supabase/types";

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
  table_columns: Json;
  sort_order: number;
}

export const useLaboratories = () => {
  const [laboratories, setLaboratories] = useState<LabExperiment[]>(staticLaboratories);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLaboratories = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("laboratories")
        .select("*")
        .order("sort_order", { ascending: true });

      if (error) {
        console.error("Error fetching laboratories:", error);
        // Use static data as fallback
        setLaboratories(staticLaboratories);
        return;
      }

      if (data && data.length > 0) {
        const convertedLabs: LabExperiment[] = data.map((lab) => ({
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
          tableColumns: lab.table_columns as unknown as TableColumn[],
          calculations: createCalculationsFunction(lab.id),
        }));
        setLaboratories(convertedLabs);
      } else {
        // Use static data if database is empty
        setLaboratories(staticLaboratories);
      }
    } catch (err) {
      console.error("Error:", err);
      setLaboratories(staticLaboratories);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLaboratories();
  }, []);

  const createLaboratory = async (lab: {
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
  }) => {
    try {
      const { data: maxOrder } = await supabase
        .from("laboratories")
        .select("sort_order")
        .order("sort_order", { ascending: false })
        .limit(1)
        .single();

      const newSortOrder = (maxOrder?.sort_order ?? -1) + 1;

      const { data, error } = await supabase
        .from("laboratories")
        .insert({
          title: lab.title,
          title_uz: lab.title_uz,
          purpose: lab.purpose,
          purpose_uz: lab.purpose_uz,
          equipment: lab.equipment,
          equipment_uz: lab.equipment_uz,
          theory: lab.theory,
          theory_uz: lab.theory_uz,
          procedure: lab.procedure,
          procedure_uz: lab.procedure_uz,
          table_columns: lab.table_columns as unknown as Json,
          sort_order: newSortOrder,
        })
        .select()
        .single();

      if (error) throw error;

      toast.success("Laboratoriya muvaffaqiyatli qo'shildi");
      await fetchLaboratories();
      return data;
    } catch (err) {
      console.error("Error creating laboratory:", err);
      toast.error("Laboratoriya qo'shishda xatolik yuz berdi");
      throw err;
    }
  };

  const updateLaboratory = async (id: string, lab: Partial<{
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
  }>) => {
    try {
      const updateData: Record<string, unknown> = { ...lab };
      if (lab.table_columns) {
        updateData.table_columns = lab.table_columns as unknown as Json;
      }

      const { error } = await supabase
        .from("laboratories")
        .update(updateData)
        .eq("id", id);

      if (error) throw error;

      toast.success("Laboratoriya muvaffaqiyatli yangilandi");
      await fetchLaboratories();
    } catch (err) {
      console.error("Error updating laboratory:", err);
      toast.error("Laboratoriya yangilashda xatolik yuz berdi");
      throw err;
    }
  };

  const deleteLaboratory = async (id: string) => {
    try {
      const { error } = await supabase
        .from("laboratories")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast.success("Laboratoriya muvaffaqiyatli o'chirildi");
      await fetchLaboratories();
    } catch (err) {
      console.error("Error deleting laboratory:", err);
      toast.error("Laboratoriya o'chirishda xatolik yuz berdi");
      throw err;
    }
  };

  return {
    laboratories,
    loading,
    error,
    refetch: fetchLaboratories,
    createLaboratory,
    updateLaboratory,
    deleteLaboratory,
  };
};

// Generic calculations function - returns empty for custom labs
function createCalculationsFunction(labId: string) {
  // Check if this is a static lab with predefined calculations
  const staticLab = staticLaboratories.find(l => l.id === labId);
  if (staticLab) {
    return staticLab.calculations;
  }
  
  // Default generic calculation function
  return (inputs: Record<string, number>) => {
    return {};
  };
}
