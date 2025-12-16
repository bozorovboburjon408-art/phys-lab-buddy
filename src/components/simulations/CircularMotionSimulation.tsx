import { useEffect, useRef } from "react";
import { SimulationParameter } from "@/types/physics";

interface Props {
  parameters: SimulationParameter[];
}

export const CircularMotionSimulation = ({ parameters }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  
  const getParam = (id: string) => parameters.find(p => p.id === id)?.value ?? 0;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const radius = getParam("radius") * 50;
    const omega = getParam("angularVelocity");
    const mass = getParam("mass");

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    let angle = 0;
    const trail: { x: number; y: number; alpha: number }[] = [];

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

      // Calculate position
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);

      // Add to trail
      trail.push({ x, y, alpha: 1 });
      if (trail.length > 50) trail.shift();

      // Draw orbit path
      ctx.strokeStyle = "hsla(222, 47%, 30%, 0.5)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.stroke();

      // Draw trail
      trail.forEach((point, i) => {
        const alpha = i / trail.length;
        ctx.fillStyle = `hsla(187, 92%, 50%, ${alpha * 0.5})`;
        ctx.beginPath();
        ctx.arc(point.x, point.y, 3, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw radius line
      ctx.strokeStyle = "hsla(210, 40%, 60%, 0.5)";
      ctx.lineWidth = 1;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw center point
      ctx.fillStyle = "hsl(262, 83%, 58%)";
      ctx.beginPath();
      ctx.arc(centerX, centerY, 6, 0, Math.PI * 2);
      ctx.fill();

      // Draw object
      ctx.shadowColor = "hsl(187, 92%, 50%)";
      ctx.shadowBlur = 20;
      ctx.fillStyle = "hsl(187, 92%, 50%)";
      ctx.beginPath();
      ctx.arc(x, y, 12 + mass * 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Draw velocity vector (tangent)
      const v = omega * radius / 50;
      const vx = -Math.sin(angle) * v * 20;
      const vy = Math.cos(angle) * v * 20;

      ctx.strokeStyle = "hsl(120, 70%, 50%)";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + vx, y + vy);
      ctx.stroke();

      // Draw centripetal acceleration (toward center)
      const ac = omega * omega * radius / 50;
      const acx = -Math.cos(angle) * ac * 5;
      const acy = -Math.sin(angle) * ac * 5;

      ctx.strokeStyle = "hsl(0, 70%, 60%)";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + acx, y + acy);
      ctx.stroke();

      // Draw legend
      ctx.fillStyle = "hsl(120, 70%, 50%)";
      ctx.fillRect(20, canvas.height - 60, 20, 3);
      ctx.fillStyle = "hsl(210, 40%, 96%)";
      ctx.font = "12px 'JetBrains Mono'";
      ctx.fillText("Tezlik (v)", 45, canvas.height - 56);

      ctx.fillStyle = "hsl(0, 70%, 60%)";
      ctx.fillRect(20, canvas.height - 40, 20, 3);
      ctx.fillStyle = "hsl(210, 40%, 96%)";
      ctx.fillText("Tezlanish (ac)", 45, canvas.height - 36);

      // Draw info
      const period = (2 * Math.PI) / omega;
      const linearVelocity = omega * (radius / 50);
      const centripetalForce = mass * omega * omega * (radius / 50);
      
      ctx.fillStyle = "hsl(210, 40%, 96%)";
      ctx.font = "14px 'JetBrains Mono', monospace";
      ctx.fillText(`ω = ${omega.toFixed(1)} rad/s`, 20, 30);
      ctx.fillText(`T = ${period.toFixed(2)} s`, 20, 50);
      ctx.fillText(`v = ${linearVelocity.toFixed(1)} m/s`, 20, 70);
      ctx.fillText(`Fc = ${centripetalForce.toFixed(1)} N`, 20, 90);

      angle += omega * 0.02;
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
