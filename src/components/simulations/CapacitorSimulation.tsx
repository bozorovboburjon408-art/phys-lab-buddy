import { useRef, useEffect, useState } from "react";
import { SimulationParameter } from "@/types/physics";

interface Props {
  parameters: SimulationParameter[];
}

export const CapacitorSimulation = ({ parameters }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [isCharging, setIsCharging] = useState(true);
  const chargeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const getParam = (id: string) =>
      parameters.find((p) => p.id === id)?.value ?? 0;

    const capacitance = getParam("capacitance");
    const voltage = getParam("voltage");
    const plateDistance = getParam("plateDistance");
    const plateArea = getParam("plateArea");

    const maxCharge = capacitance * voltage;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, "#0f172a");
      gradient.addColorStop(1, "#1e293b");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update charge
      if (isCharging) {
        chargeRef.current = Math.min(chargeRef.current + 0.02, 1);
      } else {
        chargeRef.current = Math.max(chargeRef.current - 0.02, 0);
      }

      const currentCharge = chargeRef.current * maxCharge;
      const chargePercent = chargeRef.current;

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Draw circuit
      ctx.strokeStyle = "#64748b";
      ctx.lineWidth = 3;
      
      // Left wire
      ctx.beginPath();
      ctx.moveTo(100, centerY);
      ctx.lineTo(centerX - 80 - plateDistance * 2, centerY);
      ctx.stroke();

      // Right wire
      ctx.beginPath();
      ctx.moveTo(centerX + 80 + plateDistance * 2, centerY);
      ctx.lineTo(canvas.width - 100, centerY);
      ctx.stroke();

      // Battery
      ctx.strokeStyle = "#22c55e";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(60, centerY - 30);
      ctx.lineTo(60, centerY + 30);
      ctx.stroke();
      
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(80, centerY - 15);
      ctx.lineTo(80, centerY + 15);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(60, centerY);
      ctx.lineTo(100, centerY);
      ctx.stroke();

      // Battery label
      ctx.fillStyle = "#22c55e";
      ctx.font = "12px Inter, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(`${voltage}V`, 70, centerY + 50);
      ctx.fillText("+", 60, centerY - 40);
      ctx.fillText("-", 80, centerY - 40);

      // Capacitor plates
      const plateHeight = 80 + plateArea * 0.5;
      const plateX1 = centerX - plateDistance * 3;
      const plateX2 = centerX + plateDistance * 3;

      // Left plate (positive)
      const positiveGradient = ctx.createLinearGradient(plateX1 - 10, 0, plateX1 + 10, 0);
      positiveGradient.addColorStop(0, "#ef4444");
      positiveGradient.addColorStop(1, `rgba(239, 68, 68, ${0.3 + chargePercent * 0.7})`);
      ctx.fillStyle = positiveGradient;
      ctx.fillRect(plateX1 - 8, centerY - plateHeight / 2, 16, plateHeight);

      // Right plate (negative)
      const negativeGradient = ctx.createLinearGradient(plateX2 - 10, 0, plateX2 + 10, 0);
      negativeGradient.addColorStop(0, `rgba(59, 130, 246, ${0.3 + chargePercent * 0.7})`);
      negativeGradient.addColorStop(1, "#3b82f6");
      ctx.fillStyle = negativeGradient;
      ctx.fillRect(plateX2 - 8, centerY - plateHeight / 2, 16, plateHeight);

      // Plate borders
      ctx.strokeStyle = "#94a3b8";
      ctx.lineWidth = 2;
      ctx.strokeRect(plateX1 - 8, centerY - plateHeight / 2, 16, plateHeight);
      ctx.strokeRect(plateX2 - 8, centerY - plateHeight / 2, 16, plateHeight);

      // Electric field lines
      const fieldStrength = chargePercent;
      ctx.strokeStyle = `rgba(251, 191, 36, ${fieldStrength * 0.6})`;
      ctx.lineWidth = 1.5;
      
      const numLines = 8;
      for (let i = 0; i < numLines; i++) {
        const y = centerY - plateHeight / 2 + 20 + (i * (plateHeight - 40)) / (numLines - 1);
        
        ctx.beginPath();
        ctx.moveTo(plateX1 + 10, y);
        ctx.lineTo(plateX2 - 10, y);
        ctx.stroke();

        // Arrow heads
        ctx.beginPath();
        ctx.moveTo(plateX2 - 20, y - 5);
        ctx.lineTo(plateX2 - 10, y);
        ctx.lineTo(plateX2 - 20, y + 5);
        ctx.stroke();
      }

      // Charge symbols on plates
      ctx.font = "bold 16px Inter, sans-serif";
      ctx.textAlign = "center";
      
      for (let i = 0; i < Math.ceil(chargePercent * 5); i++) {
        const y = centerY - plateHeight / 2 + 25 + (i * (plateHeight - 50)) / 4;
        
        ctx.fillStyle = "#ef4444";
        ctx.fillText("+", plateX1, y);
        
        ctx.fillStyle = "#3b82f6";
        ctx.fillText("-", plateX2, y);
      }

      // Electron flow animation
      if (chargeRef.current < 1 && chargeRef.current > 0) {
        const time = Date.now() / 1000;
        ctx.fillStyle = "#fbbf24";
        
        for (let i = 0; i < 5; i++) {
          const progress = ((time * 2 + i * 0.2) % 1);
          let x, direction;
          
          if (isCharging) {
            // Electrons moving to negative plate
            x = canvas.width - 100 - progress * (canvas.width - 100 - plateX2 - 20);
            direction = -1;
          } else {
            // Electrons moving away
            x = plateX2 + 20 + progress * (canvas.width - 100 - plateX2 - 20);
            direction = 1;
          }
          
          ctx.beginPath();
          ctx.arc(x, centerY + Math.sin(progress * Math.PI * 4) * 5, 4, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Calculate values
      const energy = 0.5 * capacitance * voltage * voltage * chargePercent * chargePercent;
      const electricField = voltage / (plateDistance * 0.001);

      // Info panel
      ctx.fillStyle = "rgba(30, 41, 59, 0.95)";
      ctx.fillRect(15, 15, 300, 180);
      ctx.strokeStyle = "rgba(100, 116, 139, 0.5)";
      ctx.lineWidth = 1;
      ctx.strokeRect(15, 15, 300, 180);

      ctx.fillStyle = "#e2e8f0";
      ctx.font = "bold 14px Inter, sans-serif";
      ctx.textAlign = "left";
      ctx.fillText("Yassi kondensator", 25, 40);

      ctx.font = "13px Inter, sans-serif";
      ctx.fillStyle = "#94a3b8";
      ctx.fillText(`Sig'im (C): ${capacitance.toFixed(1)} µF`, 25, 65);
      ctx.fillText(`Kuchlanish (U): ${voltage.toFixed(0)} V`, 25, 85);
      ctx.fillText(`Plastinalar oralig'i: ${plateDistance.toFixed(1)} mm`, 25, 105);

      ctx.fillStyle = "#fbbf24";
      ctx.fillText(`Zaryad (Q): ${(currentCharge * 1e6).toFixed(2)} µC`, 25, 130);
      ctx.fillText(`Energiya (W): ${(energy * 1e6).toFixed(2)} µJ`, 25, 150);
      ctx.fillText(`Maydon kuchlanganligi: ${(electricField / 1000).toFixed(1)} kV/m`, 25, 170);

      // Charge level indicator
      ctx.fillStyle = "rgba(30, 41, 59, 0.9)";
      ctx.fillRect(canvas.width - 120, 15, 105, 60);
      ctx.strokeRect(canvas.width - 120, 15, 105, 60);

      ctx.fillStyle = "#e2e8f0";
      ctx.font = "12px Inter, sans-serif";
      ctx.fillText("Zaryad darajasi", canvas.width - 110, 35);

      // Progress bar
      ctx.fillStyle = "#1e293b";
      ctx.fillRect(canvas.width - 110, 45, 85, 20);
      
      const chargeColor = chargePercent < 0.5 
        ? `rgb(${Math.floor(chargePercent * 2 * 255)}, 255, 0)`
        : `rgb(255, ${Math.floor((1 - (chargePercent - 0.5) * 2) * 255)}, 0)`;
      ctx.fillStyle = chargeColor;
      ctx.fillRect(canvas.width - 108, 47, chargePercent * 81, 16);

      ctx.fillStyle = "#fff";
      ctx.textAlign = "center";
      ctx.fillText(`${Math.floor(chargePercent * 100)}%`, canvas.width - 68, 59);

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [parameters, isCharging]);

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        width={800}
        height={450}
        className="w-full rounded-xl border border-border"
      />
      <button
        onClick={() => setIsCharging(!isCharging)}
        className="absolute bottom-4 right-4 px-4 py-2 bg-primary/80 hover:bg-primary text-primary-foreground rounded-lg transition-colors"
      >
        {isCharging ? "🔋 Razryadlash" : "⚡ Zaryadlash"}
      </button>
    </div>
  );
};