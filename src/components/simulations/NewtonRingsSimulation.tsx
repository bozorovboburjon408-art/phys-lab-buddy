import { useEffect, useRef } from "react";
import { SimulationParameter } from "@/types/physics";

interface Props {
  parameters: SimulationParameter[];
}

export const NewtonRingsSimulation = ({ parameters }: Props) => {
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

    const wavelength = getParamValue("wavelength");
    const radius = getParamValue("radius");
    const refractiveIndex = getParamValue("refractiveIndex");

    const centerX = canvas.width / 2;
    const centerY = 180;

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

      // Convert wavelength from nm to display scale
      const lambda = wavelength * 1e-9;
      const R = radius; // meters

      // Draw Newton's rings pattern
      const maxRadius = 150;
      
      for (let r = 0; r <= maxRadius; r++) {
        // Calculate ring number from radius
        const rMeters = (r / maxRadius) * 0.01; // Scale to ~1cm
        const rSquared = rMeters * rMeters;
        const m = (rSquared * refractiveIndex) / (R * lambda);
        
        // Intensity based on interference
        const intensity = Math.cos(m * Math.PI) * 0.5 + 0.5;
        
        // Color based on wavelength
        let red = 0, green = 0, blue = 0;
        if (wavelength < 490) {
          blue = intensity * 255;
          green = intensity * (wavelength - 400) / 90 * 100;
        } else if (wavelength < 560) {
          green = intensity * 255;
          blue = intensity * (560 - wavelength) / 70 * 255;
        } else if (wavelength < 590) {
          red = intensity * 255;
          green = intensity * 255;
        } else {
          red = intensity * 255;
          green = intensity * Math.max(0, (700 - wavelength) / 110 * 150);
        }

        ctx.strokeStyle = `rgb(${red}, ${green}, ${blue})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Draw central dark spot
      ctx.fillStyle = "#000";
      ctx.beginPath();
      ctx.arc(centerX, centerY, 3, 0, Math.PI * 2);
      ctx.fill();

      // Draw lens diagram on the side
      ctx.strokeStyle = "#60a5fa";
      ctx.lineWidth = 2;
      
      // Flat glass plate
      ctx.fillStyle = "rgba(59, 130, 246, 0.2)";
      ctx.fillRect(350, 280, 120, 15);
      ctx.strokeRect(350, 280, 120, 15);
      
      // Curved lens
      ctx.beginPath();
      ctx.arc(410, 280 - radius * 50 + 50, radius * 50, 0.8, Math.PI - 0.8);
      ctx.stroke();
      
      // Air gap indication
      ctx.strokeStyle = "#f59e0b";
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(380, 280);
      ctx.lineTo(380, 265);
      ctx.stroke();
      ctx.setLineDash([]);
      
      ctx.fillStyle = "#f59e0b";
      ctx.font = "10px monospace";
      ctx.textAlign = "center";
      ctx.fillText("havo", 380, 260);

      // Labels
      ctx.fillStyle = "#60a5fa";
      ctx.font = "11px monospace";
      ctx.fillText("Linza", 410, 240);
      ctx.fillText("Tekis shisha", 410, 310);

      // Draw info panel
      ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
      ctx.fillRect(10, canvas.height - 120, 240, 110);
      ctx.strokeStyle = "rgba(59, 130, 246, 0.5)";
      ctx.strokeRect(10, canvas.height - 120, 240, 110);

      ctx.fillStyle = "#fff";
      ctx.font = "12px monospace";
      ctx.textAlign = "left";
      ctx.fillText("Nyuton halqalari", 20, canvas.height - 100);
      ctx.fillText(`To'lqin uzunligi: ${wavelength} nm`, 20, canvas.height - 80);
      ctx.fillText(`Linza radiusi: ${radius.toFixed(2)} m`, 20, canvas.height - 60);
      ctx.fillText(`Sindirish ko'rsatkichi: ${refractiveIndex.toFixed(2)}`, 20, canvas.height - 40);
      
      // Ring radius formula
      const r1 = Math.sqrt(1 * wavelength * 1e-9 * radius) * 1000;
      ctx.fillText(`r₁ = ${r1.toFixed(3)} mm`, 20, canvas.height - 20);

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
