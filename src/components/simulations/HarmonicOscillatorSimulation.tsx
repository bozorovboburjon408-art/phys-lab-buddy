import { useEffect, useRef } from "react";
import { SimulationParameter } from "@/types/physics";

interface Props {
  parameters: SimulationParameter[];
}

export const HarmonicOscillatorSimulation = ({ parameters }: Props) => {
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

    const amplitude = getParamValue("amplitude");
    const frequency = getParamValue("frequency");
    const phase = getParamValue("phase");
    const damping = getParamValue("damping");

    let time = 0;
    const trail: { x: number; y: number }[] = [];

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

      const centerY = 150;
      const graphCenterY = 300;
      const omega = 2 * Math.PI * frequency;

      // Calculate current position with damping
      const dampingFactor = Math.exp(-damping * time);
      const currentAmplitude = amplitude * dampingFactor;
      const displacement = currentAmplitude * Math.sin(omega * time + phase);
      const velocity = currentAmplitude * omega * Math.cos(omega * time + phase);

      // Draw equilibrium line
      ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2, 50);
      ctx.lineTo(canvas.width / 2, 250);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw wall
      ctx.fillStyle = "#4a5568";
      ctx.fillRect(40, 80, 20, 140);
      ctx.strokeStyle = "#718096";
      ctx.lineWidth = 2;
      for (let i = 0; i < 7; i++) {
        ctx.beginPath();
        ctx.moveTo(40, 90 + i * 20);
        ctx.lineTo(60, 100 + i * 20);
        ctx.stroke();
      }

      // Draw spring
      const springStartX = 60;
      const massX = canvas.width / 2 + displacement * 100;
      const springEndX = massX - 25;
      const coils = 15;
      const coilWidth = (springEndX - springStartX) / coils;

      ctx.strokeStyle = "#f59e0b";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(springStartX, centerY);
      for (let i = 0; i < coils; i++) {
        const x1 = springStartX + i * coilWidth;
        const x2 = x1 + coilWidth / 2;
        const x3 = x1 + coilWidth;
        ctx.lineTo(x2, centerY - 15);
        ctx.lineTo(x3, centerY + 15);
      }
      ctx.lineTo(springEndX, centerY);
      ctx.stroke();

      // Draw mass
      const massSize = 50;
      ctx.fillStyle = "#3b82f6";
      ctx.fillRect(massX - massSize / 2, centerY - massSize / 2, massSize, massSize);
      ctx.strokeStyle = "#60a5fa";
      ctx.lineWidth = 2;
      ctx.strokeRect(massX - massSize / 2, centerY - massSize / 2, massSize, massSize);

      // Velocity arrow
      if (Math.abs(velocity) > 0.1) {
        const arrowLength = velocity * 20;
        ctx.strokeStyle = "#22c55e";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(massX, centerY);
        ctx.lineTo(massX + arrowLength, centerY);
        ctx.stroke();

        // Arrow head
        ctx.fillStyle = "#22c55e";
        ctx.beginPath();
        const dir = velocity > 0 ? 1 : -1;
        ctx.moveTo(massX + arrowLength, centerY);
        ctx.lineTo(massX + arrowLength - 10 * dir, centerY - 5);
        ctx.lineTo(massX + arrowLength - 10 * dir, centerY + 5);
        ctx.closePath();
        ctx.fill();
      }

      // Draw x-t graph
      ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
      ctx.lineWidth = 1;
      // Axes
      ctx.beginPath();
      ctx.moveTo(50, graphCenterY);
      ctx.lineTo(450, graphCenterY);
      ctx.moveTo(50, graphCenterY - 60);
      ctx.lineTo(50, graphCenterY + 60);
      ctx.stroke();

      // Labels
      ctx.fillStyle = "#a5b4fc";
      ctx.font = "10px monospace";
      ctx.textAlign = "left";
      ctx.fillText("x", 55, graphCenterY - 50);
      ctx.fillText("t", 440, graphCenterY - 10);

      // Add current point to trail
      trail.push({ x: 50 + (time % 4) * 100, y: graphCenterY - displacement * 50 });
      if (trail.length > 400) trail.shift();

      // Draw trail
      if (trail.length > 1) {
        ctx.strokeStyle = "#3b82f6";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(trail[0].x, trail[0].y);
        for (let i = 1; i < trail.length; i++) {
          if (trail[i].x > trail[i - 1].x) {
            ctx.lineTo(trail[i].x, trail[i].y);
          } else {
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(trail[i].x, trail[i].y);
          }
        }
        ctx.stroke();
      }

      // Current point
      const currentGraphX = 50 + (time % 4) * 100;
      const currentGraphY = graphCenterY - displacement * 50;
      ctx.fillStyle = "#ef4444";
      ctx.beginPath();
      ctx.arc(currentGraphX, currentGraphY, 5, 0, Math.PI * 2);
      ctx.fill();

      // Draw info
      ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
      ctx.fillRect(canvas.width - 180, 10, 170, 100);
      ctx.strokeStyle = "rgba(59, 130, 246, 0.5)";
      ctx.strokeRect(canvas.width - 180, 10, 170, 100);

      ctx.fillStyle = "#fff";
      ctx.font = "11px monospace";
      ctx.textAlign = "left";
      ctx.fillText(`Amplituda: ${currentAmplitude.toFixed(3)} m`, canvas.width - 170, 30);
      ctx.fillText(`Chastota: ${frequency.toFixed(2)} Hz`, canvas.width - 170, 48);
      ctx.fillText(`Davr: ${(1 / frequency).toFixed(3)} s`, canvas.width - 170, 66);
      ctx.fillText(`x = ${displacement.toFixed(3)} m`, canvas.width - 170, 84);
      ctx.fillText(`v = ${velocity.toFixed(3)} m/s`, canvas.width - 170, 100);

      time += 0.016;
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
