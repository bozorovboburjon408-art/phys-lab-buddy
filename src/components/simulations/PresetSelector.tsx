import { SimulationPreset } from "@/types/physics";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

interface Props {
  presets: SimulationPreset[];
  onSelect: (preset: SimulationPreset) => void;
}

export const PresetSelector = ({ presets, onSelect }: Props) => {
  if (!presets || presets.length === 0) return null;

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
        <Sparkles className="w-4 h-4" />
        <span>Tayyor presetlar</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {presets.map((preset) => (
          <button
            key={preset.id}
            onClick={() => onSelect(preset)}
            className={cn(
              "px-3 py-1.5 text-xs rounded-full border border-border/50",
              "bg-secondary/50 hover:bg-primary/20 hover:border-primary/50",
              "transition-all duration-200 hover:scale-105",
              "flex items-center gap-1.5"
            )}
            title={preset.description}
          >
            <span>{preset.nameUz}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
