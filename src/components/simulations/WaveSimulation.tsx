import { useEffect, useRef } from "react";
import { SimulationParameter } from "@/types/physics";

interface Props {
  parameters: SimulationParameter[];
}

export const WaveSimulation = ({ parameters }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  
  const getParam = (id: string) => parameters.find(p => p.id === id)?.value ?? 0;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const amplitude = getParam("amplitude");
    const wavelength = getParam("wavelength");
    const frequency = getParam("frequency");

    let phase = 0;
    const centerY = canvas.height / 2;

    const animate = () => {
      ctx.fillStyle = "hsl(222, 47%, 9%)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw grid
      ctx.strokeStyle = "hsla(222, 47%, 18%, 0.3)";
      ctx.lineWidth = 1;
      for (let i = 0; i < canvas.width; i += 40) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
      }
      for (let i = 0; i < canvas.height; i += 40) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
      }

      // Draw center line
      ctx.strokeStyle = "hsla(210, 40%, 50%, 0.3)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, centerY);
      ctx.lineTo(canvas.width, centerY);
      ctx.stroke();

      // Draw wave with gradient
      const gradient = ctx.createLinearGradient(0, centerY - amplitude, 0, centerY + amplitude);
      gradient.addColorStop(0, "hsl(262, 83%, 58%)");
      gradient.addColorStop(0.5, "hsl(187, 92%, 50%)");
      gradient.addColorStop(1, "hsl(262, 83%, 58%)");

      ctx.strokeStyle = gradient;
      ctx.lineWidth = 4;
      ctx.beginPath();

      for (let x = 0; x < canvas.width; x++) {
        const y = centerY + amplitude * Math.sin((2 * Math.PI * x) / wavelength - phase);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Draw particles
      for (let x = 0; x < canvas.width; x += 30) {
        const y = centerY + amplitude * Math.sin((2 * Math.PI * x) / wavelength - phase);
        ctx.shadowColor = "hsl(187, 92%, 50%)";
        ctx.shadowBlur = 10;
        ctx.fillStyle = "hsl(187, 92%, 50%)";
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Draw velocity arrows
        const vy = -amplitude * (2 * Math.PI * frequency) * Math.cos((2 * Math.PI * x) / wavelength - phase);
        const arrowLength = Math.min(Math.abs(vy) * 0.5, 30);
        const direction = vy > 0 ? -1 : 1;
        
        ctx.strokeStyle = "hsla(262, 83%, 58%, 0.7)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, y + direction * arrowLength);
        ctx.stroke();
      }

      // Draw wavelength marker
      ctx.strokeStyle = "hsl(262, 83%, 58%)";
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(50, centerY + amplitude + 30);
      ctx.lineTo(50 + wavelength, centerY + amplitude + 30);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = "hsl(262, 83%, 58%)";
      ctx.font = "12px 'JetBrains Mono'";
      ctx.textAlign = "center";
      ctx.fillText("λ", 50 + wavelength / 2, centerY + amplitude + 50);
      ctx.textAlign = "left";

      // Draw info
      const speed = wavelength * frequency;
      ctx.fillStyle = "hsl(210, 40%, 96%)";
      ctx.font = "14px 'JetBrains Mono', monospace";
      ctx.fillText(`λ = ${wavelength.toFixed(0)} px`, 20, 30);
      ctx.fillText(`f = ${frequency.toFixed(1)} Hz`, 20, 50);
      ctx.fillText(`v = ${speed.toFixed(0)} px/s`, 20, 70);

      phase += frequency * 0.1;
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [parameters]);

  return (
    <canvas
      ref={canvasRef}
      width={500}
      height={400}
      className="w-full rounded-xl border border-border"
    />
  );
};
