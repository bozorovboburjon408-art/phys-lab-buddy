import { useEffect, useRef } from "react";
import { SimulationParameter } from "@/types/physics";

interface Props {
  parameters: SimulationParameter[];
}

export const ElectromagneticInductionSimulation = ({ parameters }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  const getParamValue = (id: string): number => {
    const param = parameters.find(p => p.id === id);
    return param?.value ?? 0;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const magnetStrength = getParamValue("magnetStrength");
    const coilTurns = getParamValue("coilTurns");
    const velocity = getParamValue("velocity");

    let magnetX = 100;
    let direction = 1;
    let time = 0;

    const animate = () => {
      ctx.fillStyle = "#0a0a0f";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw grid
      ctx.strokeStyle = "rgba(59, 130, 246, 0.1)";
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      const coilX = 280;
      const coilY = 150;
      const coilWidth = 80;
      const coilHeight = 100;

      // Update magnet position
      magnetX += direction * velocity * 0.5;
      if (magnetX > 350) {
        direction = -1;
      } else if (magnetX < 100) {
        direction = 1;
      }

      // Calculate induced EMF
      const distanceToCoil = Math.abs(magnetX - coilX);
      const fluxChange = distanceToCoil < 100 ? (100 - distanceToCoil) / 100 : 0;
      const emf = magnetStrength * coilTurns * velocity * fluxChange * direction * 0.01;

      // Draw coil (solenoid)
      ctx.strokeStyle = "#f59e0b";
      ctx.lineWidth = 3;
      
      for (let i = 0; i < coilTurns && i < 10; i++) {
        const y = coilY - coilHeight / 2 + (i * coilHeight) / Math.min(coilTurns, 10);
        ctx.beginPath();
        ctx.ellipse(coilX, y, coilWidth / 2, 8, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Coil wire connections
      ctx.beginPath();
      ctx.moveTo(coilX - coilWidth / 2, coilY - coilHeight / 2);
      ctx.lineTo(coilX - coilWidth / 2 - 30, coilY - coilHeight / 2 - 20);
      ctx.moveTo(coilX - coilWidth / 2, coilY + coilHeight / 2);
      ctx.lineTo(coilX - coilWidth / 2 - 30, coilY + coilHeight / 2 + 20);
      ctx.stroke();

      // Draw galvanometer
      ctx.fillStyle = "#1e1b4b";
      ctx.beginPath();
      ctx.arc(coilX - 80, coilY, 35, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#6366f1";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Galvanometer needle
      const needleAngle = -Math.PI / 2 + (emf / 5) * (Math.PI / 3);
      ctx.strokeStyle = "#ef4444";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(coilX - 80, coilY);
      ctx.lineTo(coilX - 80 + Math.cos(needleAngle) * 25, coilY + Math.sin(needleAngle) * 25);
      ctx.stroke();

      // Galvanometer center
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.arc(coilX - 80, coilY, 3, 0, Math.PI * 2);
      ctx.fill();

      // Galvanometer label
      ctx.fillStyle = "#a5b4fc";
      ctx.font = "10px monospace";
      ctx.textAlign = "center";
      ctx.fillText("G", coilX - 80, coilY + 50);

      // Draw magnet
      const magnetWidth = 60;
      const magnetHeight = 30;

      // North pole (red)
      ctx.fillStyle = "#ef4444";
      ctx.fillRect(magnetX - magnetWidth / 2, coilY - magnetHeight / 2, magnetWidth / 2, magnetHeight);
      ctx.fillStyle = "#fff";
      ctx.font = "bold 14px monospace";
      ctx.fillText("N", magnetX - magnetWidth / 4, coilY + 5);

      // South pole (blue)
      ctx.fillStyle = "#3b82f6";
      ctx.fillRect(magnetX, coilY - magnetHeight / 2, magnetWidth / 2, magnetHeight);
      ctx.fillStyle = "#fff";
      ctx.fillText("S", magnetX + magnetWidth / 4, coilY + 5);

      // Magnet border
      ctx.strokeStyle = "#718096";
      ctx.lineWidth = 2;
      ctx.strokeRect(magnetX - magnetWidth / 2, coilY - magnetHeight / 2, magnetWidth, magnetHeight);

      // Draw magnetic field lines
      ctx.strokeStyle = "rgba(239, 68, 68, 0.3)";
      ctx.lineWidth = 1;
      for (let i = -2; i <= 2; i++) {
        ctx.beginPath();
        ctx.moveTo(magnetX + magnetWidth / 2 + 5, coilY + i * 8);
        ctx.bezierCurveTo(
          magnetX + magnetWidth / 2 + 40, coilY + i * 15,
          magnetX + magnetWidth / 2 + 40, coilY + i * 15,
          magnetX - magnetWidth / 2 - 5, coilY + i * 8
        );
        ctx.stroke();
      }

      // Draw velocity arrow
      if (Math.abs(velocity) > 0) {
        ctx.strokeStyle = "#22c55e";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(magnetX, coilY + 40);
        ctx.lineTo(magnetX + direction * 30, coilY + 40);
        ctx.stroke();

        ctx.fillStyle = "#22c55e";
        ctx.beginPath();
        ctx.moveTo(magnetX + direction * 30, coilY + 40);
        ctx.lineTo(magnetX + direction * 20, coilY + 35);
        ctx.lineTo(magnetX + direction * 20, coilY + 45);
        ctx.closePath();
        ctx.fill();

        ctx.font = "10px monospace";
        ctx.textAlign = "center";
        ctx.fillText("v", magnetX + direction * 15, coilY + 55);
      }

      // Draw info panel
      ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
      ctx.fillRect(10, canvas.height - 110, 230, 100);
      ctx.strokeStyle = "rgba(99, 102, 241, 0.5)";
      ctx.strokeRect(10, canvas.height - 110, 230, 100);

      ctx.fillStyle = "#fff";
      ctx.font = "12px monospace";
      ctx.textAlign = "left";
      ctx.fillText("Faradey qonuni: ε = -N(dΦ/dt)", 20, canvas.height - 90);
      ctx.fillText(`Magnit kuchi: ${magnetStrength.toFixed(1)} T`, 20, canvas.height - 70);
      ctx.fillText(`O'ramlar soni: ${coilTurns}`, 20, canvas.height - 50);
      ctx.fillText(`Tezlik: ${velocity.toFixed(1)} m/s`, 20, canvas.height - 30);

      // EMF display
      ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
      ctx.fillRect(canvas.width - 130, 10, 120, 50);
      ctx.strokeStyle = emf > 0 ? "rgba(34, 197, 94, 0.5)" : emf < 0 ? "rgba(239, 68, 68, 0.5)" : "rgba(100, 100, 100, 0.5)";
      ctx.strokeRect(canvas.width - 130, 10, 120, 50);

      ctx.fillStyle = emf > 0 ? "#22c55e" : emf < 0 ? "#ef4444" : "#6b7280";
      ctx.font = "bold 10px monospace";
      ctx.textAlign = "center";
      ctx.fillText("INDUKSIYA EYK", canvas.width - 70, 28);
      ctx.font = "bold 16px monospace";
      ctx.fillText(`${emf.toFixed(3)} V`, canvas.width - 70, 50);

      time += 0.016;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [parameters]);

  return (
    <div className="relative w-full">
      <canvas
        ref={canvasRef}
        width={500}
        height={400}
        className="w-full rounded-xl border border-border"
      />
    </div>
  );
};
