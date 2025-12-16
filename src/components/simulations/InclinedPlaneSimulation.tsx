import { useEffect, useRef } from "react";
import { SimulationParameter } from "@/types/physics";

interface Props {
  parameters: SimulationParameter[];
}

export const InclinedPlaneSimulation = ({ parameters }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  
  const getParam = (id: string) => parameters.find(p => p.id === id)?.value ?? 0;

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

    let position = 0;
    let velocity = 0;

    const acceleration = gravity * (Math.sin(angle) - friction * Math.cos(angle));

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

      // Calculate block position
      const blockX = endX - position * Math.cos(angle);
      const blockY = endY + position * Math.sin(angle);

      // Draw angle arc
      ctx.strokeStyle = "hsl(262, 83%, 58%)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(endX, startY, 50, Math.PI, Math.PI + angle, true);
      ctx.stroke();

      ctx.fillStyle = "hsl(262, 83%, 58%)";
      ctx.font = "14px 'JetBrains Mono'";
      ctx.fillText(`${((angle * 180) / Math.PI).toFixed(0)}°`, endX - 70, startY - 20);

      // Draw block
      if (position < rampLength && blockY <= startY) {
        ctx.save();
        ctx.translate(blockX, blockY);
        ctx.rotate(-angle);

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

        // Update physics
        if (acceleration > 0) {
          velocity += acceleration * 0.02;
          position += velocity * 0.02;
        }
      }

      // Reset
      if (position >= rampLength || blockY > startY) {
        setTimeout(() => {
          position = 0;
          velocity = 0;
        }, 1500);
      }

      // Draw force vectors
      const forceScale = 3;
      const Fg = mass * gravity;
      const Fn = Fg * Math.cos(angle);
      const Ff = friction * Fn;
      const Fp = Fg * Math.sin(angle);

      // Draw info
      ctx.fillStyle = "hsl(210, 40%, 96%)";
      ctx.font = "14px 'JetBrains Mono', monospace";
      ctx.textAlign = "left";
      ctx.fillText(`a = ${acceleration.toFixed(2)} m/s²`, 20, 30);
      ctx.fillText(`v = ${velocity.toFixed(2)} m/s`, 20, 50);
      ctx.fillText(`Fg = ${Fg.toFixed(1)} N`, 20, 80);
      ctx.fillText(`Fn = ${Fn.toFixed(1)} N`, 20, 100);
      ctx.fillText(`Ff = ${Ff.toFixed(1)} N`, 20, 120);

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
