import { useEffect, useRef } from "react";
import { SimulationParameter } from "@/types/physics";

interface Props {
  parameters: SimulationParameter[];
}

export const AtwoodMachineSimulation = ({ parameters }: Props) => {
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

    const mass1 = getParamValue("mass1");
    const mass2 = getParamValue("mass2");
    const gravity = getParamValue("gravity");

    let y1 = 100; // Position of mass 1
    let y2 = 200; // Position of mass 2
    let velocity = 0;
    let time = 0;

    const acceleration = ((mass2 - mass1) * gravity) / (mass1 + mass2);
    const tension = (2 * mass1 * mass2 * gravity) / (mass1 + mass2);

    const pulleyX = canvas.width / 2;
    const pulleyY = 60;
    const pulleyRadius = 30;
    const ropeLength = 300;

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

      // Draw ceiling
      ctx.fillStyle = "#4a5568";
      ctx.fillRect(pulleyX - 80, 10, 160, 20);
      ctx.fillStyle = "#718096";
      for (let i = 0; i < 8; i++) {
        ctx.beginPath();
        ctx.moveTo(pulleyX - 70 + i * 20, 10);
        ctx.lineTo(pulleyX - 60 + i * 20, 30);
        ctx.stroke();
      }

      // Draw pulley
      ctx.beginPath();
      ctx.arc(pulleyX, pulleyY, pulleyRadius, 0, Math.PI * 2);
      ctx.fillStyle = "#2d3748";
      ctx.fill();
      ctx.strokeStyle = "#718096";
      ctx.lineWidth = 3;
      ctx.stroke();

      // Pulley center
      ctx.beginPath();
      ctx.arc(pulleyX, pulleyY, 5, 0, Math.PI * 2);
      ctx.fillStyle = "#e2e8f0";
      ctx.fill();

      // Calculate positions based on physics
      const maxY = canvas.height - 100;
      const minY = pulleyY + pulleyRadius + 20;

      // Update physics
      velocity += acceleration * 0.016;
      y1 -= velocity * 0.5;  // mass1 goes up when mass2 is heavier
      y2 += velocity * 0.5;  // mass2 goes down when mass2 is heavier

      // Clamp positions
      if (y1 > maxY || y2 < minY) {
        y1 = Math.min(y1, maxY);
        y2 = Math.max(y2, minY);
        velocity = 0;
      }
      if (y2 > maxY || y1 < minY) {
        y2 = Math.min(y2, maxY);
        y1 = Math.max(y1, minY);
        velocity = 0;
      }

      // Reset if at extremes
      if ((y1 >= maxY && y2 <= minY) || (y2 >= maxY && y1 <= minY)) {
        time += 0.016;
        if (time > 2) {
          y1 = 100;
          y2 = 200;
          velocity = 0;
          time = 0;
        }
      }

      // Draw ropes
      ctx.strokeStyle = "#a0aec0";
      ctx.lineWidth = 2;

      // Left rope
      ctx.beginPath();
      ctx.moveTo(pulleyX - pulleyRadius, pulleyY);
      ctx.lineTo(pulleyX - pulleyRadius, y1);
      ctx.stroke();

      // Right rope
      ctx.beginPath();
      ctx.moveTo(pulleyX + pulleyRadius, pulleyY);
      ctx.lineTo(pulleyX + pulleyRadius, y2);
      ctx.stroke();

      // Draw masses
      const massWidth = 50;
      const mass1Height = 30 + mass1 * 8;
      const mass2Height = 30 + mass2 * 8;

      // Mass 1 (left)
      ctx.fillStyle = "#3b82f6";
      ctx.fillRect(pulleyX - pulleyRadius - massWidth / 2, y1, massWidth, mass1Height);
      ctx.strokeStyle = "#60a5fa";
      ctx.lineWidth = 2;
      ctx.strokeRect(pulleyX - pulleyRadius - massWidth / 2, y1, massWidth, mass1Height);
      ctx.fillStyle = "#fff";
      ctx.font = "bold 14px monospace";
      ctx.textAlign = "center";
      ctx.fillText(`${mass1.toFixed(1)} kg`, pulleyX - pulleyRadius, y1 + mass1Height / 2 + 5);

      // Mass 2 (right)
      ctx.fillStyle = "#ef4444";
      ctx.fillRect(pulleyX + pulleyRadius - massWidth / 2, y2, massWidth, mass2Height);
      ctx.strokeStyle = "#f87171";
      ctx.lineWidth = 2;
      ctx.strokeRect(pulleyX + pulleyRadius - massWidth / 2, y2, massWidth, mass2Height);
      ctx.fillStyle = "#fff";
      ctx.fillText(`${mass2.toFixed(1)} kg`, pulleyX + pulleyRadius, y2 + mass2Height / 2 + 5);

      // Draw info panel
      ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
      ctx.fillRect(10, canvas.height - 100, 200, 90);
      ctx.strokeStyle = "rgba(59, 130, 246, 0.5)";
      ctx.strokeRect(10, canvas.height - 100, 200, 90);

      ctx.fillStyle = "#fff";
      ctx.font = "12px monospace";
      ctx.textAlign = "left";
      ctx.fillText(`Tezlanish: ${acceleration.toFixed(3)} m/s²`, 20, canvas.height - 80);
      ctx.fillText(`Tarang kuch: ${tension.toFixed(2)} N`, 20, canvas.height - 60);
      ctx.fillText(`Tezlik: ${Math.abs(velocity).toFixed(2)} m/s`, 20, canvas.height - 40);
      ctx.fillText(`g = ${gravity.toFixed(1)} m/s²`, 20, canvas.height - 20);

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
