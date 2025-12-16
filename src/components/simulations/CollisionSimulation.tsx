import { useEffect, useRef } from "react";
import { SimulationParameter } from "@/types/physics";

interface Props {
  parameters: SimulationParameter[];
}

export const CollisionSimulation = ({ parameters }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  
  const getParam = (id: string) => parameters.find(p => p.id === id)?.value ?? 0;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const m1 = getParam("mass1");
    const m2 = getParam("mass2");
    const v1Initial = getParam("velocity1");
    const v2Initial = getParam("velocity2");
    const restitution = getParam("restitution"); // 1 = elastic, 0 = inelastic

    const centerY = canvas.height / 2;
    const scale = 20;

    let x1 = 100;
    let x2 = 400;
    let v1 = v1Initial;
    let v2 = v2Initial;
    let hasCollided = false;

    const r1 = 15 + m1 * 5;
    const r2 = 15 + m2 * 5;

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

      // Check collision with restitution coefficient
      if (!hasCollided && Math.abs(x1 - x2) <= r1 + r2) {
        hasCollided = true;
        // Collision formulas with coefficient of restitution (e)
        // For e=1: fully elastic, e=0: fully inelastic
        const newV1 = (m1 * v1 + m2 * v2 + m2 * restitution * (v2 - v1)) / (m1 + m2);
        const newV2 = (m1 * v1 + m2 * v2 + m1 * restitution * (v1 - v2)) / (m1 + m2);
        v1 = newV1;
        v2 = newV2;
      }

      // Update positions
      x1 += v1 * 0.5;
      x2 += v2 * 0.5;

      // Reset if objects go off screen
      if (x1 < -50 || x1 > canvas.width + 50 || x2 < -50 || x2 > canvas.width + 50) {
        x1 = 100;
        x2 = 400;
        v1 = v1Initial;
        v2 = v2Initial;
        hasCollided = false;
      }

      // Draw ball 1
      ctx.shadowColor = "hsl(187, 92%, 50%)";
      ctx.shadowBlur = 15;
      ctx.fillStyle = "hsl(187, 92%, 50%)";
      ctx.beginPath();
      ctx.arc(x1, centerY, r1, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Draw ball 2
      ctx.shadowColor = "hsl(262, 83%, 58%)";
      ctx.shadowBlur = 15;
      ctx.fillStyle = "hsl(262, 83%, 58%)";
      ctx.beginPath();
      ctx.arc(x2, centerY, r2, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Draw velocity arrows
      const drawArrow = (x: number, v: number, color: string) => {
        const arrowLength = v * 8;
        ctx.strokeStyle = color;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(x, centerY - 50);
        ctx.lineTo(x + arrowLength, centerY - 50);
        if (arrowLength !== 0) {
          ctx.lineTo(x + arrowLength - Math.sign(arrowLength) * 10, centerY - 55);
          ctx.moveTo(x + arrowLength, centerY - 50);
          ctx.lineTo(x + arrowLength - Math.sign(arrowLength) * 10, centerY - 45);
        }
        ctx.stroke();
      };

      drawArrow(x1, v1, "hsl(187, 92%, 50%)");
      drawArrow(x2, v2, "hsl(262, 83%, 58%)");

      // Draw labels
      ctx.fillStyle = "hsl(222, 47%, 6%)";
      ctx.font = "bold 12px 'JetBrains Mono'";
      ctx.textAlign = "center";
      ctx.fillText(`${m1}kg`, x1, centerY + 4);
      ctx.fillText(`${m2}kg`, x2, centerY + 4);
      ctx.textAlign = "left";

      // Draw info
      const p1 = m1 * v1;
      const p2 = m2 * v2;
      const totalP = p1 + p2;
      const totalKE = 0.5 * m1 * v1 * v1 + 0.5 * m2 * v2 * v2;
      
      ctx.fillStyle = "hsl(210, 40%, 96%)";
      ctx.font = "14px 'JetBrains Mono', monospace";
      ctx.fillText(`v₁ = ${v1.toFixed(1)} m/s`, 20, 30);
      ctx.fillText(`v₂ = ${v2.toFixed(1)} m/s`, 20, 50);
      ctx.fillText(`Σp = ${totalP.toFixed(1)} kg·m/s`, 20, 80);
      ctx.fillText(`ΣKE = ${totalKE.toFixed(1)} J`, 20, 100);
      ctx.fillText(`e = ${restitution.toFixed(1)}`, 20, 120);

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
