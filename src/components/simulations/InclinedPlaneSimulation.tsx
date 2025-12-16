import { useEffect, useRef, useState } from "react";
import { SimulationParameter } from "@/types/physics";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

interface Props {
  parameters: SimulationParameter[];
}

export const InclinedPlaneSimulation = ({ parameters }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const [isFinished, setIsFinished] = useState(false);
  const [finalValues, setFinalValues] = useState({ velocity: 0, time: 0 });
  const stateRef = useRef({ position: 0, velocity: 0, time: 0 });
  
  const getParam = (id: string) => parameters.find(p => p.id === id)?.value ?? 0;

  const resetSimulation = () => {
    stateRef.current = { position: 0, velocity: 0, time: 0 };
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

    const angle = (getParam("angle") * Math.PI) / 180;
    const mass = getParam("mass");
    const friction = getParam("friction");
    const gravity = getParam("gravity");

    const rampLength = 350;
    const startX = 80;
    const startY = canvas.height - 60;
    const endX = startX + rampLength * Math.cos(angle);
    const endY = startY - rampLength * Math.sin(angle);

    const acceleration = gravity * (Math.sin(angle) - friction * Math.cos(angle));
    const Fg = mass * gravity;
    const Fn = Fg * Math.cos(angle);
    const Ff = friction * Fn;

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
      ctx.fillRect(0, startY, canvas.width, canvas.height - startY);

      // Draw ramp
      ctx.fillStyle = "hsl(222, 47%, 20%)";
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.lineTo(endX, startY);
      ctx.closePath();
      ctx.fill();

      ctx.strokeStyle = "hsl(187, 92%, 40%)";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.stroke();

      const { position, velocity, time } = stateRef.current;

      // Calculate block position
      const blockX = endX - position * Math.cos(angle);
      const blockY = endY + position * Math.sin(angle);
      const isOnRamp = position < rampLength && blockY <= startY;

      // Draw angle arc
      ctx.strokeStyle = "hsl(262, 83%, 58%)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(endX, startY, 50, Math.PI, Math.PI + angle, true);
      ctx.stroke();

      ctx.fillStyle = "hsl(262, 83%, 58%)";
      ctx.font = "14px 'JetBrains Mono'";
      ctx.fillText(`${((angle * 180) / Math.PI).toFixed(0)}°`, endX - 70, startY - 20);

      // Draw block at final position if finished, otherwise at current position
      const finalBlockX = isFinished ? startX + 20 : blockX;
      const finalBlockY = isFinished ? startY - 20 : blockY;
      const finalAngle = isFinished ? 0 : -angle;

      ctx.save();
      ctx.translate(finalBlockX, finalBlockY);
      ctx.rotate(finalAngle);

      ctx.shadowColor = "hsl(187, 92%, 50%)";
      ctx.shadowBlur = 15;
      ctx.fillStyle = "hsl(187, 92%, 50%)";
      ctx.fillRect(-20, -20, 40, 40);
      ctx.shadowBlur = 0;

      ctx.fillStyle = "hsl(222, 47%, 6%)";
      ctx.font = "bold 10px 'JetBrains Mono'";
      ctx.textAlign = "center";
      ctx.fillText(`${mass}kg`, 0, 4);

      ctx.restore();

      // Physics update
      if (!isFinished && isOnRamp && acceleration > 0) {
        stateRef.current.velocity += acceleration * 0.02;
        stateRef.current.position += stateRef.current.velocity * 0.02;
        stateRef.current.time += 0.02;
      } else if (!isFinished && (!isOnRamp || position >= rampLength)) {
        setFinalValues({ velocity, time });
        setIsFinished(true);
      }

      // Draw info
      ctx.fillStyle = "hsl(210, 40%, 96%)";
      ctx.font = "14px 'JetBrains Mono', monospace";
      ctx.textAlign = "left";
      ctx.fillText(`a = ${acceleration.toFixed(2)} m/s²`, 20, 30);
      ctx.fillText(`v = ${(isFinished ? finalValues.velocity : velocity).toFixed(2)} m/s`, 20, 50);
      ctx.fillText(`Fg = ${Fg.toFixed(1)} N`, 20, 80);
      ctx.fillText(`Fn = ${Fn.toFixed(1)} N`, 20, 100);
      ctx.fillText(`Ff = ${Ff.toFixed(1)} N`, 20, 120);

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
              <p className="text-muted-foreground">Oxirgi tezlik: <span className="text-primary">{finalValues.velocity.toFixed(2)} m/s</span></p>
              <p className="text-muted-foreground">Sirpanish vaqti: <span className="text-primary">{finalValues.time.toFixed(2)} s</span></p>
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
