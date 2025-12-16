import { useEffect, useRef } from "react";
import { SimulationParameter } from "@/types/physics";

interface Props {
  parameters: SimulationParameter[];
}

export const ElectricFieldSimulation = ({ parameters }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  const getParamValue = (id: string) => {
    const param = parameters.find(p => p.id === id);
    return param?.value ?? 0;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const charge1 = getParamValue("charge1");
    const charge2 = getParamValue("charge2");
    const distance = getParamValue("distance");

    const width = canvas.width;
    const height = canvas.height;
    const centerY = height / 2;

    const k = 8.99e9; // Coulomb constant

    // Calculate positions
    const scale = 30;
    const x1 = width / 2 - (distance * scale) / 2;
    const x2 = width / 2 + (distance * scale) / 2;

    // Calculate field lines
    const drawFieldLine = (startX: number, startY: number, q: number, isPositive: boolean) => {
      ctx.beginPath();
      ctx.moveTo(startX, startY);

      let x = startX;
      let y = startY;
      const stepSize = 3;
      const maxSteps = 200;

      for (let i = 0; i < maxSteps; i++) {
        // Calculate electric field from both charges
        let Ex = 0, Ey = 0;

        // Field from charge 1
        const r1x = x - x1;
        const r1y = y - centerY;
        const r1 = Math.sqrt(r1x * r1x + r1y * r1y);
        if (r1 > 10) {
          const E1 = charge1 / (r1 * r1);
          Ex += E1 * r1x / r1;
          Ey += E1 * r1y / r1;
        }

        // Field from charge 2
        const r2x = x - x2;
        const r2y = y - centerY;
        const r2 = Math.sqrt(r2x * r2x + r2y * r2y);
        if (r2 > 10) {
          const E2 = charge2 / (r2 * r2);
          Ex += E2 * r2x / r2;
          Ey += E2 * r2y / r2;
        }

        const E = Math.sqrt(Ex * Ex + Ey * Ey);
        if (E < 0.001) break;

        const direction = isPositive ? 1 : -1;
        x += direction * stepSize * Ex / E;
        y += direction * stepSize * Ey / E;

        if (x < 0 || x > width || y < 0 || y > height) break;

        // Stop if too close to a charge
        const distToCharge1 = Math.sqrt((x - x1) ** 2 + (y - centerY) ** 2);
        const distToCharge2 = Math.sqrt((x - x2) ** 2 + (y - centerY) ** 2);
        if (distToCharge1 < 15 || distToCharge2 < 15) break;

        ctx.lineTo(x, y);
      }

      ctx.stroke();
    };

    const draw = () => {
      ctx.fillStyle = "#0a0a0f";
      ctx.fillRect(0, 0, width, height);

      // Draw grid
      ctx.strokeStyle = "rgba(100, 100, 120, 0.1)";
      ctx.lineWidth = 1;
      for (let i = 0; i < width; i += 40) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, height);
        ctx.stroke();
      }
      for (let i = 0; i < height; i += 40) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(width, i);
        ctx.stroke();
      }

      // Draw field lines
      ctx.lineWidth = 1.5;
      const numLines = 12;

      // Lines from charge 1
      if (charge1 !== 0) {
        ctx.strokeStyle = charge1 > 0 ? "rgba(239, 68, 68, 0.6)" : "rgba(59, 130, 246, 0.6)";
        for (let i = 0; i < numLines; i++) {
          const angle = (2 * Math.PI * i) / numLines;
          const startX = x1 + 20 * Math.cos(angle);
          const startY = centerY + 20 * Math.sin(angle);
          drawFieldLine(startX, startY, charge1, charge1 > 0);
        }
      }

      // Lines from charge 2
      if (charge2 !== 0) {
        ctx.strokeStyle = charge2 > 0 ? "rgba(239, 68, 68, 0.6)" : "rgba(59, 130, 246, 0.6)";
        for (let i = 0; i < numLines; i++) {
          const angle = (2 * Math.PI * i) / numLines;
          const startX = x2 + 20 * Math.cos(angle);
          const startY = centerY + 20 * Math.sin(angle);
          drawFieldLine(startX, startY, charge2, charge2 > 0);
        }
      }

      // Draw charges
      // Charge 1
      const gradient1 = ctx.createRadialGradient(x1, centerY, 0, x1, centerY, 25);
      if (charge1 > 0) {
        gradient1.addColorStop(0, "#ef4444");
        gradient1.addColorStop(1, "#7f1d1d");
      } else {
        gradient1.addColorStop(0, "#3b82f6");
        gradient1.addColorStop(1, "#1e3a8a");
      }
      ctx.beginPath();
      ctx.arc(x1, centerY, 20 + Math.abs(charge1) * 2, 0, Math.PI * 2);
      ctx.fillStyle = gradient1;
      ctx.fill();
      ctx.strokeStyle = charge1 > 0 ? "#fca5a5" : "#93c5fd";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Charge label
      ctx.fillStyle = "#fff";
      ctx.font = "bold 16px monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(charge1 > 0 ? "+" : "−", x1, centerY);

      // Charge 2
      const gradient2 = ctx.createRadialGradient(x2, centerY, 0, x2, centerY, 25);
      if (charge2 > 0) {
        gradient2.addColorStop(0, "#ef4444");
        gradient2.addColorStop(1, "#7f1d1d");
      } else {
        gradient2.addColorStop(0, "#3b82f6");
        gradient2.addColorStop(1, "#1e3a8a");
      }
      ctx.beginPath();
      ctx.arc(x2, centerY, 20 + Math.abs(charge2) * 2, 0, Math.PI * 2);
      ctx.fillStyle = gradient2;
      ctx.fill();
      ctx.strokeStyle = charge2 > 0 ? "#fca5a5" : "#93c5fd";
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = "#fff";
      ctx.fillText(charge2 > 0 ? "+" : "−", x2, centerY);

      // Calculate force
      const F = k * Math.abs(charge1 * charge2 * 1e-12) / (distance * distance);
      const forceDirection = charge1 * charge2 > 0 ? "Itarish" : "Tortish";

      // Info panel
      ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
      ctx.fillRect(10, 10, 200, 100);
      ctx.strokeStyle = "rgba(139, 92, 246, 0.5)";
      ctx.lineWidth = 1;
      ctx.strokeRect(10, 10, 200, 100);

      ctx.fillStyle = "#a78bfa";
      ctx.font = "12px monospace";
      ctx.textAlign = "left";
      ctx.fillText(`q₁ = ${charge1} µC`, 20, 35);
      ctx.fillText(`q₂ = ${charge2} µC`, 20, 55);
      ctx.fillText(`r = ${distance.toFixed(2)} m`, 20, 75);
      ctx.fillText(`F = ${F.toExponential(2)} N (${forceDirection})`, 20, 95);
    };

    draw();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [parameters]);

  return (
    <div className="w-full">
      <canvas
        ref={canvasRef}
        width={600}
        height={400}
        className="w-full aspect-[3/2] rounded-xl border border-border"
      />
    </div>
  );
};
