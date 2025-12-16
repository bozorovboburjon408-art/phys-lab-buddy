import { useEffect, useRef, useState } from "react";
import { SimulationParameter } from "@/types/physics";

interface Props {
  parameters: SimulationParameter[];
}

export const FreeFallSimulation = ({ parameters }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const [time, setTime] = useState(0);
  
  const getParam = (id: string) => parameters.find(p => p.id === id)?.value ?? 0;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const initialHeight = getParam("height");
    const mass = getParam("mass");
    const gravity = getParam("gravity");
    const airResistance = getParam("airResistance");

    const scale = (canvas.height - 100) / initialHeight;
    const groundY = canvas.height - 40;
    const startY = groundY - initialHeight * scale;

    let position = 0;
    let velocity = 0;
    let t = 0;

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

      // Draw height scale
      ctx.strokeStyle = "hsla(210, 40%, 50%, 0.5)";
      ctx.lineWidth = 1;
      for (let h = 0; h <= initialHeight; h += Math.ceil(initialHeight / 10)) {
        const y = groundY - h * scale;
        ctx.beginPath();
        ctx.moveTo(70, y);
        ctx.lineTo(90, y);
        ctx.stroke();
        
        ctx.fillStyle = "hsl(210, 40%, 60%)";
        ctx.font = "12px 'JetBrains Mono'";
        ctx.textAlign = "right";
        ctx.fillText(`${h}m`, 65, y + 4);
      }
      ctx.textAlign = "left";

      // Draw ground
      ctx.fillStyle = "hsl(222, 47%, 15%)";
      ctx.fillRect(0, groundY, canvas.width, canvas.height - groundY);

      // Physics with air resistance
      const dragForce = airResistance * velocity * velocity;
      const netForce = mass * gravity - dragForce;
      const acceleration = netForce / mass;
      
      velocity += acceleration * 0.02;
      position += velocity * 0.02;

      const ballY = startY + position * scale;

      // Draw initial position marker
      ctx.strokeStyle = "hsla(262, 83%, 58%, 0.5)";
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2 - 40, startY);
      ctx.lineTo(canvas.width / 2 + 40, startY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw ball with glow
      if (ballY < groundY) {
        ctx.shadowColor = "hsl(187, 92%, 50%)";
        ctx.shadowBlur = 20;
        ctx.fillStyle = "hsl(187, 92%, 50%)";
        ctx.beginPath();
        ctx.arc(canvas.width / 2, ballY, 15, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Draw velocity arrow
        const arrowLength = Math.min(velocity * 3, 80);
        ctx.strokeStyle = "hsl(262, 83%, 58%)";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2 + 30, ballY);
        ctx.lineTo(canvas.width / 2 + 30, ballY + arrowLength);
        ctx.lineTo(canvas.width / 2 + 25, ballY + arrowLength - 10);
        ctx.moveTo(canvas.width / 2 + 30, ballY + arrowLength);
        ctx.lineTo(canvas.width / 2 + 35, ballY + arrowLength - 10);
        ctx.stroke();

        t += 0.02;
        setTime(t);
      }

      // Draw info
      ctx.fillStyle = "hsl(210, 40%, 96%)";
      ctx.font = "14px 'JetBrains Mono', monospace";
      ctx.fillText(`h = ${(initialHeight - position).toFixed(1)} m`, 120, 30);
      ctx.fillText(`v = ${velocity.toFixed(1)} m/s`, 120, 50);
      ctx.fillText(`t = ${t.toFixed(2)} s`, 120, 70);
      ctx.fillText(`a = ${acceleration.toFixed(1)} m/s²`, 120, 90);

      // Reset if ball hits ground
      if (ballY >= groundY) {
        setTimeout(() => {
          position = 0;
          velocity = 0;
          t = 0;
        }, 1500);
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
