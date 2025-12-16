import { useEffect, useRef, useState } from "react";
import { SimulationParameter } from "@/types/physics";

interface Props {
  parameters: SimulationParameter[];
}

export const SpringSimulation = ({ parameters }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const [isPlaying, setIsPlaying] = useState(true);
  
  const getParam = (id: string) => parameters.find(p => p.id === id)?.value ?? 0;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const springConstant = getParam("springConstant");
    const mass = getParam("mass");
    const amplitude = getParam("amplitude") * 300;
    const damping = getParam("damping");

    const omega = Math.sqrt(springConstant / mass);
    let time = 0;
    const equilibriumY = canvas.height / 2;

    const drawSpring = (startY: number, endY: number) => {
      const coils = 12;
      const springWidth = 30;
      const length = endY - startY;
      const coilHeight = length / coils;

      ctx.strokeStyle = "hsl(187, 92%, 50%)";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2, startY);
      
      for (let i = 0; i < coils; i++) {
        const y = startY + i * coilHeight;
        const direction = i % 2 === 0 ? 1 : -1;
        ctx.quadraticCurveTo(
          canvas.width / 2 + direction * springWidth,
          y + coilHeight / 2,
          canvas.width / 2,
          y + coilHeight
        );
      }
      ctx.stroke();
    };

    const animate = () => {
      if (!isPlaying) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

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

      // Calculate displacement with damping
      const dampedAmplitude = amplitude * Math.exp(-damping * time);
      const displacement = dampedAmplitude * Math.cos(omega * time);
      const massY = equilibriumY + displacement;

      // Draw ceiling
      ctx.fillStyle = "hsl(222, 47%, 15%)";
      ctx.fillRect(0, 0, canvas.width, 40);

      // Draw equilibrium line
      ctx.strokeStyle = "hsla(262, 83%, 58%, 0.5)";
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(100, equilibriumY);
      ctx.lineTo(canvas.width - 100, equilibriumY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw spring
      drawSpring(40, massY - 25);

      // Draw mass with glow
      ctx.shadowColor = "hsl(187, 92%, 50%)";
      ctx.shadowBlur = 20;
      ctx.fillStyle = "hsl(187, 92%, 50%)";
      ctx.fillRect(canvas.width / 2 - 25, massY - 25, 50, 50);
      ctx.shadowBlur = 0;

      // Draw mass label
      ctx.fillStyle = "hsl(222, 47%, 6%)";
      ctx.font = "bold 14px 'JetBrains Mono'";
      ctx.textAlign = "center";
      ctx.fillText(`${mass} kg`, canvas.width / 2, massY + 5);
      ctx.textAlign = "left";

      // Draw displacement marker
      ctx.strokeStyle = "hsl(262, 83%, 58%)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2 + 40, equilibriumY);
      ctx.lineTo(canvas.width / 2 + 40, massY);
      ctx.stroke();

      // Draw info
      const period = (2 * Math.PI) / omega;
      const frequency = omega / (2 * Math.PI);
      
      ctx.fillStyle = "hsl(210, 40%, 96%)";
      ctx.font = "14px 'JetBrains Mono', monospace";
      ctx.fillText(`T = ${period.toFixed(2)} s`, 20, 70);
      ctx.fillText(`f = ${frequency.toFixed(2)} Hz`, 20, 90);
      ctx.fillText(`x = ${(displacement / 300).toFixed(3)} m`, 20, 110);

      time += 0.02;
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [parameters, isPlaying]);

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        width={500}
        height={400}
        className="w-full rounded-xl border border-border"
      />
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="absolute bottom-4 right-4 px-4 py-2 bg-primary/20 hover:bg-primary/30 text-primary rounded-lg transition-colors font-mono text-sm"
      >
        {isPlaying ? "⏸ To'xtatish" : "▶ Davom"}
      </button>
    </div>
  );
};
