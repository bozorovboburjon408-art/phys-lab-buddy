import { useState, useRef, useEffect } from "react";
import { SimulationParameter } from "@/types/physics";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";

interface Props {
  parameter: SimulationParameter;
  onChange: (value: number) => void;
}

export const ParameterControl = ({ parameter, onChange }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(parameter.value.toString());
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setInputValue(parameter.value.toString());
  }, [parameter.value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    const newValue = parseFloat(inputValue);
    if (!isNaN(newValue)) {
      const clampedValue = Math.min(Math.max(newValue, parameter.min), parameter.max);
      onChange(clampedValue);
      setInputValue(clampedValue.toString());
    } else {
      setInputValue(parameter.value.toString());
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleInputBlur();
    } else if (e.key === "Escape") {
      setInputValue(parameter.value.toString());
      setIsEditing(false);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-foreground">
          {parameter.nameUz}
        </label>
        {isEditing ? (
          <div className="flex items-center gap-1">
            <Input
              ref={inputRef}
              type="number"
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              onKeyDown={handleKeyDown}
              step={parameter.step}
              min={parameter.min}
              max={parameter.max}
              className="w-20 h-7 text-sm font-mono text-primary text-right px-2"
            />
            <span className="text-sm font-mono text-primary">{parameter.unit}</span>
          </div>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="text-sm font-mono text-primary hover:text-primary/80 hover:underline cursor-text transition-colors"
            title="Qiymatni qo'lda yozing"
          >
            {parameter.value} {parameter.unit}
          </button>
        )}
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
