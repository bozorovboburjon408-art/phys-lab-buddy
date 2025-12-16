import { useEffect, useRef, useState } from "react";
import { SimulationParameter } from "@/types/physics";

interface Props {
  parameters: SimulationParameter[];
}

export const ProjectileSimulation = ({ parameters }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const [trail, setTrail] = useState<{ x: number; y: number }[]>([]);
  
  const getParam = (id: string) => parameters.find(p => p.id === id)?.value ?? 0;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const velocity = getParam("velocity");
    const launchAngle = (getParam("angle") * Math.PI) / 180;
    const gravity = getParam("gravity");
    const initialHeight = getParam("height");

    const vx = velocity * Math.cos(launchAngle);
    const vy = velocity * Math.sin(launchAngle);
    
    const scale = 3;
    let time = 0;
    const trailPoints: { x: number; y: number }[] = [];

    const groundY = canvas.height - 40;
    const startX = 60;
    const startY = groundY - initialHeight * scale;

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

      // Draw ground
      ctx.fillStyle = "hsl(222, 47%, 15%)";
      ctx.fillRect(0, groundY, canvas.width, canvas.height - groundY);

      // Calculate position
      const x = startX + vx * time * scale;
      const y = startY - (vy * time - 0.5 * gravity * time * time) * scale;

      // Add to trail
      if (y <= groundY) {
        trailPoints.push({ x, y });
        if (trailPoints.length > 200) trailPoints.shift();
      }

      // Draw trajectory path (predicted)
      ctx.strokeStyle = "hsla(262, 83%, 58%, 0.3)";
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      let predTime = 0;
      let predY = startY;
      ctx.moveTo(startX, startY);
      while (predY <= groundY && predTime < 20) {
        const px = startX + vx * predTime * scale;
        const py = startY - (vy * predTime - 0.5 * gravity * predTime * predTime) * scale;
        if (py <= groundY) {
          ctx.lineTo(px, py);
          predY = py;
        }
        predTime += 0.05;
      }
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw trail
      ctx.strokeStyle = "hsla(187, 92%, 50%, 0.6)";
      ctx.lineWidth = 3;
      ctx.beginPath();
      trailPoints.forEach((point, i) => {
        if (i === 0) ctx.moveTo(point.x, point.y);
        else ctx.lineTo(point.x, point.y);
      });
      ctx.stroke();

      // Draw launch platform
      ctx.fillStyle = "hsl(187, 92%, 40%)";
      ctx.fillRect(startX - 20, startY, 40, groundY - startY);

      // Draw projectile
      if (y <= groundY) {
        ctx.shadowColor = "hsl(187, 92%, 50%)";
        ctx.shadowBlur = 15;
        ctx.fillStyle = "hsl(187, 92%, 50%)";
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        time += 0.02;
      }

      // Draw info
      const maxHeight = (vy * vy) / (2 * gravity) + initialHeight;
      const flightTime = (vy + Math.sqrt(vy * vy + 2 * gravity * initialHeight)) / gravity;
      const range = vx * flightTime;
      
      ctx.fillStyle = "hsl(210, 40%, 96%)";
      ctx.font = "14px 'JetBrains Mono', monospace";
      ctx.fillText(`Hmax = ${maxHeight.toFixed(1)} m`, 20, 30);
      ctx.fillText(`R = ${range.toFixed(1)} m`, 20, 50);
      ctx.fillText(`t = ${time.toFixed(2)} s`, 20, 70);

      // Reset if projectile hits ground
      if (y > groundY) {
        time = 0;
        trailPoints.length = 0;
      }

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
