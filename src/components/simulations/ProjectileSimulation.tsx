import { useEffect, useRef, useState } from "react";
import { SimulationParameter } from "@/types/physics";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

interface Props {
  parameters: SimulationParameter[];
}

export const ProjectileSimulation = ({ parameters }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const [isFinished, setIsFinished] = useState(false);
  const [finalValues, setFinalValues] = useState({ range: 0, maxHeight: 0, flightTime: 0 });
  const stateRef = useRef({ time: 0, trailPoints: [] as { x: number; y: number }[] });
  
  const getParam = (id: string) => parameters.find(p => p.id === id)?.value ?? 0;

  const resetSimulation = () => {
    stateRef.current = { time: 0, trailPoints: [] };
    setIsFinished(false);
  };

  useEffect(() => {
    resetSimulation();
  }, [parameters]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const velocity = getParam("velocity");
    const launchAngle = (getParam("angle") * Math.PI) / 180;
    const gravity = getParam("gravity");
    const initialHeight = getParam("height");
    const mass = getParam("mass");
    const airResistance = getParam("airResistance");

    const vx0 = velocity * Math.cos(launchAngle);
    const vy0 = velocity * Math.sin(launchAngle);
    
    const scale = 3;
    const groundY = canvas.height - 40;
    const startX = 60;
    const startY = groundY - initialHeight * scale;

    // Calculate theoretical values (without air resistance for reference)
    const maxHeight = (vy0 * vy0) / (2 * gravity) + initialHeight;
    const flightTime = (vy0 + Math.sqrt(vy0 * vy0 + 2 * gravity * initialHeight)) / gravity;
    const range = vx0 * flightTime;

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

      const { time, trailPoints } = stateRef.current;

      // Calculate position with air resistance
      let posX, posY;
      if (airResistance > 0) {
        // Simplified air resistance model
        const k = airResistance / mass;
        const vxT = vx0 * Math.exp(-k * time);
        const vyT = (vy0 + gravity / k) * Math.exp(-k * time) - gravity / k;
        posX = (vx0 / k) * (1 - Math.exp(-k * time));
        posY = (1 / k) * ((vy0 + gravity / k) * (1 - Math.exp(-k * time))) - (gravity * time) / k;
      } else {
        posX = vx0 * time;
        posY = vy0 * time - 0.5 * gravity * time * time;
      }
      
      const x = startX + posX * scale;
      const y = startY - posY * scale;

      // Draw trajectory path (predicted)
      ctx.strokeStyle = "hsla(262, 83%, 58%, 0.3)";
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      let predTime = 0;
      let predY = startY;
      ctx.moveTo(startX, startY);
      while (predY <= groundY && predTime < 20) {
        const px = startX + vx0 * predTime * scale;
        const py = startY - (vy0 * predTime - 0.5 * gravity * predTime * predTime) * scale;
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

      // Calculate final projectile position
      const finalX = isFinished ? trailPoints[trailPoints.length - 1]?.x || x : x;
      const finalY = isFinished ? groundY - 10 : Math.min(y, groundY - 10);

      // Draw projectile
      ctx.shadowColor = "hsl(187, 92%, 50%)";
      ctx.shadowBlur = 15;
      ctx.fillStyle = "hsl(187, 92%, 50%)";
      ctx.beginPath();
      ctx.arc(finalX, finalY, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Physics update
      if (!isFinished && y <= groundY) {
        stateRef.current.trailPoints.push({ x, y });
        if (stateRef.current.trailPoints.length > 200) stateRef.current.trailPoints.shift();
        stateRef.current.time += 0.02;
      } else if (!isFinished && y > groundY) {
        setFinalValues({ range, maxHeight, flightTime: time });
        setIsFinished(true);
      }

      // Draw info
      ctx.fillStyle = "hsl(210, 40%, 96%)";
      ctx.font = "14px 'JetBrains Mono', monospace";
      ctx.fillText(`Hmax = ${maxHeight.toFixed(1)} m`, 20, 30);
      ctx.fillText(`R = ${range.toFixed(1)} m`, 20, 50);
      ctx.fillText(`t = ${(isFinished ? finalValues.flightTime : time).toFixed(2)} s`, 20, 70);

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [parameters, isFinished, finalValues]);

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        width={500}
        height={400}
        className="w-full rounded-xl border border-border"
      />
      {isFinished && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 rounded-xl">
          <div className="bg-card border border-border rounded-lg p-6 text-center space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Simulyatsiya tugadi</h3>
            <div className="space-y-2 text-sm font-mono">
              <p className="text-muted-foreground">Maksimal balandlik: <span className="text-primary">{finalValues.maxHeight.toFixed(2)} m</span></p>
              <p className="text-muted-foreground">Uzoqlik: <span className="text-primary">{finalValues.range.toFixed(2)} m</span></p>
              <p className="text-muted-foreground">Uchish vaqti: <span className="text-primary">{finalValues.flightTime.toFixed(2)} s</span></p>
            </div>
            <Button onClick={resetSimulation} className="gap-2">
              <RotateCcw className="w-4 h-4" />
              Qayta boshlash
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
