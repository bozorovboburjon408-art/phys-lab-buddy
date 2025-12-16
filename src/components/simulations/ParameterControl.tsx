import { SimulationParameter } from "@/types/physics";
import { Slider } from "@/components/ui/slider";

interface Props {
  parameter: SimulationParameter;
  onChange: (value: number) => void;
}

export const ParameterControl = ({ parameter, onChange }: Props) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-foreground">
          {parameter.nameUz}
        </label>
        <span className="text-sm font-mono text-primary">
          {parameter.value} {parameter.unit}
        </span>
      </div>
      <Slider
        value={[parameter.value]}
        min={parameter.min}
        max={parameter.max}
        step={parameter.step}
        onValueChange={(values) => onChange(values[0])}
        className="w-full"
      />
      <div className="flex justify-between text-xs text-muted-foreground font-mono">
        <span>{parameter.min} {parameter.unit}</span>
        <span>{parameter.max} {parameter.unit}</span>
      </div>
    </div>
  );
};
