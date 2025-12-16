import { useEffect, useRef } from "react";
import { SimulationParameter } from "@/types/physics";

interface Props {
  parameters: SimulationParameter[];
}

export const MagneticInductionSimulation = ({ parameters }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const timeRef = useRef(0);

  const getParamValue = (id: string) => {
    const param = parameters.find(p => p.id === id);
    return param?.value ?? 0;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const current = getParamValue("current");
    const coilTurns = getParamValue("coilTurns");
    const velocity = getParamValue("velocity");

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;

    const mu0 = 4 * Math.PI * 1e-7; // Permeability of free space

    const animate = () => {
      timeRef.current += 0.016;
      const t = timeRef.current;

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

      // Draw solenoid coils
      const coilWidth = 200;
      const coilHeight = 80;
      const startX = centerX - coilWidth / 2;
      const spacing = coilWidth / coilTurns;

      // Draw coil turns
      for (let i = 0; i < coilTurns; i++) {
        const x = startX + i * spacing;
        
        // Coil ellipse
        ctx.beginPath();
        ctx.strokeStyle = current > 0 ? "#f97316" : "#64748b";
        ctx.lineWidth = 3;
        ctx.ellipse(x, centerY, 10, coilHeight / 2, 0, 0, Math.PI * 2);
        ctx.stroke();

        // Current direction indicator (dots and crosses)
        ctx.fillStyle = current > 0 ? "#fbbf24" : "#94a3b8";
        
        // Top (coming out - dot)
        ctx.beginPath();
        ctx.arc(x, centerY - coilHeight / 2 - 5, 4, 0, Math.PI * 2);
        ctx.fill();

        // Bottom (going in - cross)
        ctx.beginPath();
        ctx.moveTo(x - 3, centerY + coilHeight / 2 + 2);
        ctx.lineTo(x + 3, centerY + coilHeight / 2 + 8);
        ctx.moveTo(x + 3, centerY + coilHeight / 2 + 2);
        ctx.lineTo(x - 3, centerY + coilHeight / 2 + 8);
        ctx.stroke();
      }

      // Draw magnetic field lines inside solenoid
      const B = mu0 * coilTurns * current / (coilWidth / 1000); // B field strength
      
      ctx.strokeStyle = "rgba(139, 92, 246, 0.8)";
      ctx.lineWidth = 2;
      
      const numFieldLines = 5;
      for (let i = 0; i < numFieldLines; i++) {
        const yOffset = (i - (numFieldLines - 1) / 2) * 20;
        
        // Inside field lines (straight, uniform)
        ctx.beginPath();
        ctx.moveTo(startX - 50, centerY + yOffset);
        ctx.lineTo(startX + coilWidth + 50, centerY + yOffset);
        ctx.stroke();

        // Arrow heads
        const arrowX = startX + coilWidth / 2 + Math.sin(t * velocity) * 30;
        ctx.beginPath();
        ctx.moveTo(arrowX, centerY + yOffset);
        ctx.lineTo(arrowX - 8, centerY + yOffset - 5);
        ctx.moveTo(arrowX, centerY + yOffset);
        ctx.lineTo(arrowX - 8, centerY + yOffset + 5);
        ctx.stroke();
      }

      // Draw external field lines (curved)
      ctx.strokeStyle = "rgba(139, 92, 246, 0.4)";
      ctx.lineWidth = 1.5;
      
      // Left side curves
      for (let i = 0; i < 3; i++) {
        const yStart = centerY + (i - 1) * 30;
        ctx.beginPath();
        ctx.moveTo(startX - 50, yStart);
        ctx.quadraticCurveTo(
          startX - 100 - i * 20,
          centerY,
          startX - 50,
          centerY - (yStart - centerY)
        );
        ctx.stroke();
      }

      // Right side curves
      for (let i = 0; i < 3; i++) {
        const yStart = centerY + (i - 1) * 30;
        ctx.beginPath();
        ctx.moveTo(startX + coilWidth + 50, yStart);
        ctx.quadraticCurveTo(
          startX + coilWidth + 100 + i * 20,
          centerY,
          startX + coilWidth + 50,
          centerY - (yStart - centerY)
        );
        ctx.stroke();
      }

      // Draw moving electrons if current > 0
      if (current > 0) {
        ctx.fillStyle = "#22d3ee";
        for (let i = 0; i < 10; i++) {
          const phase = (t * velocity + i * 0.3) % 1;
          const x = startX + phase * coilWidth;
          const y = centerY + Math.sin(phase * Math.PI * 2 * coilTurns) * (coilHeight / 2 - 10);
          
          ctx.beginPath();
          ctx.arc(x, y, 3, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Info panel
      ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
      ctx.fillRect(10, 10, 220, 120);
      ctx.strokeStyle = "rgba(139, 92, 246, 0.5)";
      ctx.lineWidth = 1;
      ctx.strokeRect(10, 10, 220, 120);

      ctx.fillStyle = "#a78bfa";
      ctx.font = "12px monospace";
      ctx.textAlign = "left";
      ctx.fillText(`Tok kuchi I = ${current.toFixed(1)} A`, 20, 35);
      ctx.fillText(`O'ramlar soni N = ${coilTurns}`, 20, 55);
      ctx.fillText(`B = μ₀nI`, 20, 75);
      ctx.fillText(`B = ${(B * 1000).toFixed(3)} mT`, 20, 95);
      ctx.fillText(`Φ = B·S (magnit oqimi)`, 20, 115);

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
