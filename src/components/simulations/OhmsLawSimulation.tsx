import { useEffect, useRef } from "react";
import { SimulationParameter } from "@/types/physics";

interface Props {
  parameters: SimulationParameter[];
}

export const OhmsLawSimulation = ({ parameters }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  const getParamValue = (id: string): number => {
    const param = parameters.find(p => p.id === id);
    return param?.value ?? 0;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const voltage = getParamValue("voltage");
    const resistance = getParamValue("resistance");
    const current = voltage / resistance;
    const power = voltage * current;

    let electronOffset = 0;

    const animate = () => {
      ctx.fillStyle = "#0a0a0f";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw grid
      ctx.strokeStyle = "rgba(59, 130, 246, 0.1)";
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      const centerY = 180;

      // Draw battery (left side)
      ctx.strokeStyle = "#22c55e";
      ctx.lineWidth = 3;
      // Long plate (positive)
      ctx.beginPath();
      ctx.moveTo(60, centerY - 30);
      ctx.lineTo(60, centerY + 30);
      ctx.stroke();
      // Short plate (negative)
      ctx.beginPath();
      ctx.moveTo(80, centerY - 15);
      ctx.lineTo(80, centerY + 15);
      ctx.stroke();

      // Battery label
      ctx.fillStyle = "#22c55e";
      ctx.font = "bold 14px monospace";
      ctx.textAlign = "center";
      ctx.fillText(`${voltage.toFixed(1)} V`, 70, centerY + 55);
      ctx.fillText("+", 60, centerY - 35);
      ctx.fillText("-", 80, centerY - 35);

      // Draw wire (top)
      ctx.strokeStyle = "#f59e0b";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(60, centerY - 30);
      ctx.lineTo(60, centerY - 60);
      ctx.lineTo(440, centerY - 60);
      ctx.lineTo(440, centerY - 30);
      ctx.stroke();

      // Draw wire (bottom)
      ctx.beginPath();
      ctx.moveTo(80, centerY + 15);
      ctx.lineTo(80, centerY + 60);
      ctx.lineTo(440, centerY + 60);
      ctx.lineTo(440, centerY + 30);
      ctx.stroke();

      // Draw resistor (right side)
      ctx.strokeStyle = "#a855f7";
      ctx.lineWidth = 3;
      ctx.fillStyle = "#1e1b4b";
      ctx.fillRect(410, centerY - 30, 60, 60);
      ctx.strokeRect(410, centerY - 30, 60, 60);

      // Resistor zigzag
      ctx.beginPath();
      ctx.moveTo(420, centerY);
      for (let i = 0; i < 4; i++) {
        ctx.lineTo(425 + i * 10, centerY - 15);
        ctx.lineTo(430 + i * 10, centerY + 15);
      }
      ctx.lineTo(460, centerY);
      ctx.stroke();

      // Resistor label
      ctx.fillStyle = "#a855f7";
      ctx.fillText(`${resistance.toFixed(1)} Ω`, 440, centerY + 55);

      // Draw electrons moving
      const electronSpeed = current * 2;
      electronOffset = (electronOffset + electronSpeed) % 40;

      ctx.fillStyle = "#60a5fa";
      // Top wire electrons (moving right)
      for (let x = 60 + electronOffset; x < 440; x += 40) {
        ctx.beginPath();
        ctx.arc(x, centerY - 60, 4, 0, Math.PI * 2);
        ctx.fill();
      }
      // Bottom wire electrons (moving left)
      for (let x = 440 - electronOffset; x > 80; x -= 40) {
        ctx.beginPath();
        ctx.arc(x, centerY + 60, 4, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw current arrows
      ctx.fillStyle = "#f59e0b";
      ctx.font = "12px monospace";
      ctx.fillText("I →", 250, centerY - 70);
      ctx.fillText("← I", 250, centerY + 75);

      // Draw ammeter display
      ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
      ctx.fillRect(180, centerY - 25, 120, 50);
      ctx.strokeStyle = "#3b82f6";
      ctx.lineWidth = 2;
      ctx.strokeRect(180, centerY - 25, 120, 50);

      ctx.fillStyle = "#3b82f6";
      ctx.font = "10px monospace";
      ctx.fillText("AMPERMETR", 240, centerY - 10);
      ctx.font = "bold 18px monospace";
      ctx.fillText(`${current.toFixed(3)} A`, 240, centerY + 15);

      // Draw info panel
      ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
      ctx.fillRect(10, canvas.height - 100, 220, 90);
      ctx.strokeStyle = "rgba(59, 130, 246, 0.5)";
      ctx.strokeRect(10, canvas.height - 100, 220, 90);

      ctx.fillStyle = "#fff";
      ctx.font = "12px monospace";
      ctx.textAlign = "left";
      ctx.fillText("Om qonuni: V = I × R", 20, canvas.height - 80);
      ctx.fillText(`Kuchlanish: ${voltage.toFixed(1)} V`, 20, canvas.height - 60);
      ctx.fillText(`Tok kuchi: ${current.toFixed(3)} A`, 20, canvas.height - 40);
      ctx.fillText(`Quvvat: ${power.toFixed(2)} W`, 20, canvas.height - 20);

      // Draw formula
      ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
      ctx.fillRect(canvas.width - 160, canvas.height - 60, 150, 50);
      ctx.strokeStyle = "rgba(168, 85, 247, 0.5)";
      ctx.strokeRect(canvas.width - 160, canvas.height - 60, 150, 50);
      ctx.fillStyle = "#a855f7";
      ctx.font = "bold 14px monospace";
      ctx.textAlign = "center";
      ctx.fillText("I = V / R", canvas.width - 85, canvas.height - 30);

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [parameters]);

  return (
    <div className="relative w-full">
      <canvas
        ref={canvasRef}
        width={500}
        height={400}
        className="w-full rounded-xl border border-border"
      />
    </div>
  );
};
