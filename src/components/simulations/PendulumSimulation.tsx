import { useEffect, useRef, useState } from "react";
import { SimulationParameter } from "@/types/physics";

interface Props {
  parameters: SimulationParameter[];
}

export const PendulumSimulation = ({ parameters }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const [isPlaying, setIsPlaying] = useState(true);
  
  const getParam = (id: string) => parameters.find(p => p.id === id)?.value ?? 0;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const length = getParam("length") * 100;
    const gravity = getParam("gravity");
    const initialAngle = (getParam("angle") * Math.PI) / 180;
    
    let angle = initialAngle;
    let angularVelocity = 0;
    let lastTime = performance.now();

    const pivotX = canvas.width / 2;
    const pivotY = 60;

    const animate = (currentTime: number) => {
      if (!isPlaying) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      const deltaTime = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      // Physics calculation
      const angularAcceleration = (-gravity / (length / 100)) * Math.sin(angle);
      angularVelocity += angularAcceleration * deltaTime;
      angularVelocity *= 0.999; // Small damping
      angle += angularVelocity * deltaTime;

      // Clear canvas
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

      // Calculate bob position
      const bobX = pivotX + length * Math.sin(angle);
      const bobY = pivotY + length * Math.cos(angle);

      // Draw string
      ctx.strokeStyle = "hsl(210, 40%, 60%)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(pivotX, pivotY);
      ctx.lineTo(bobX, bobY);
      ctx.stroke();

      // Draw pivot
      ctx.fillStyle = "hsl(187, 92%, 50%)";
      ctx.beginPath();
      ctx.arc(pivotX, pivotY, 8, 0, Math.PI * 2);
      ctx.fill();

      // Draw bob with glow
      ctx.shadowColor = "hsl(187, 92%, 50%)";
      ctx.shadowBlur = 20;
      ctx.fillStyle = "hsl(187, 92%, 50%)";
      ctx.beginPath();
      ctx.arc(bobX, bobY, 20, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Draw trail
      ctx.strokeStyle = "hsla(187, 92%, 50%, 0.3)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(pivotX, pivotY, length, Math.PI / 2 - initialAngle, Math.PI / 2 + initialAngle);
      ctx.stroke();

      // Draw info
      const period = 2 * Math.PI * Math.sqrt((length / 100) / gravity);
      ctx.fillStyle = "hsl(210, 40%, 96%)";
      ctx.font = "14px 'JetBrains Mono', monospace";
      ctx.fillText(`T = ${period.toFixed(2)} s`, 20, 30);
      ctx.fillText(`θ = ${((angle * 180) / Math.PI).toFixed(1)}°`, 20, 50);

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
