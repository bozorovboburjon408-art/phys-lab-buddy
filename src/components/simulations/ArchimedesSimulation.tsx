import { useEffect, useRef } from "react";
import { SimulationParameter } from "@/types/physics";

interface Props {
  parameters: SimulationParameter[];
}

export const ArchimedesSimulation = ({ parameters }: Props) => {
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

    const objectDensity = getParamValue("objectDensity");
    const fluidDensity = getParamValue("fluidDensity");
    const objectVolume = getParamValue("objectVolume");
    const gravity = getParamValue("gravity");

    let time = 0;
    let objectY = 50;
    let velocity = 0;

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

      const containerX = 100;
      const containerY = 80;
      const containerWidth = 200;
      const containerHeight = 250;
      const waterLevel = containerY + 30;
      const waterHeight = containerHeight - 30;

      // Calculate physics
      const objectMass = objectDensity * objectVolume;
      const weight = objectMass * gravity;
      const objectSize = Math.cbrt(objectVolume * 1000000) * 2; // Visual size

      // Calculate equilibrium position
      const densityRatio = objectDensity / fluidDensity;
      let equilibriumY;
      let submergedFraction;

      if (densityRatio >= 1) {
        // Sinks
        equilibriumY = containerY + containerHeight - objectSize / 2 - 10;
        submergedFraction = 1;
      } else {
        // Floats
        submergedFraction = densityRatio;
        const submergedHeight = objectSize * submergedFraction;
        equilibriumY = waterLevel + submergedHeight - objectSize / 2;
      }

      // Animate object falling/rising
      const damping = 0.98;
      const springConstant = 0.05;
      const force = (equilibriumY - objectY) * springConstant;
      velocity = (velocity + force) * damping;
      objectY += velocity;

      // Clamp position
      objectY = Math.max(containerY + objectSize / 2, Math.min(containerY + containerHeight - objectSize / 2 - 10, objectY));

      // Calculate actual submersion
      const objectBottom = objectY + objectSize / 2;
      const objectTop = objectY - objectSize / 2;
      let actualSubmerged = 0;
      if (objectBottom > waterLevel) {
        if (objectTop >= waterLevel) {
          actualSubmerged = 1;
        } else {
          actualSubmerged = (objectBottom - waterLevel) / objectSize;
        }
      }

      const buoyantForce = fluidDensity * objectVolume * actualSubmerged * gravity;
      const netForce = weight - buoyantForce;

      // Draw container
      ctx.strokeStyle = "#60a5fa";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(containerX, containerY);
      ctx.lineTo(containerX, containerY + containerHeight);
      ctx.lineTo(containerX + containerWidth, containerY + containerHeight);
      ctx.lineTo(containerX + containerWidth, containerY);
      ctx.stroke();

      // Draw water
      const waterGradient = ctx.createLinearGradient(containerX, waterLevel, containerX, containerY + containerHeight);
      waterGradient.addColorStop(0, "rgba(59, 130, 246, 0.4)");
      waterGradient.addColorStop(1, "rgba(30, 64, 175, 0.6)");
      ctx.fillStyle = waterGradient;
      ctx.fillRect(containerX + 3, waterLevel, containerWidth - 6, waterHeight);

      // Water surface effect
      ctx.strokeStyle = "rgba(147, 197, 253, 0.5)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(containerX + 3, waterLevel);
      for (let x = containerX + 3; x < containerX + containerWidth - 3; x += 10) {
        ctx.lineTo(x + 5, waterLevel + Math.sin(time * 2 + x * 0.05) * 2);
      }
      ctx.stroke();

      // Draw object
      const objectX = containerX + containerWidth / 2;
      const objectColor = objectDensity > fluidDensity ? "#ef4444" : objectDensity < fluidDensity ? "#22c55e" : "#f59e0b";
      
      ctx.fillStyle = objectColor;
      ctx.fillRect(objectX - objectSize / 2, objectY - objectSize / 2, objectSize, objectSize);
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 2;
      ctx.strokeRect(objectX - objectSize / 2, objectY - objectSize / 2, objectSize, objectSize);

      // Draw density label on object
      ctx.fillStyle = "#fff";
      ctx.font = "bold 10px monospace";
      ctx.textAlign = "center";
      ctx.fillText(`ρ=${objectDensity}`, objectX, objectY + 4);

      // Draw force arrows
      const arrowScale = 0.03;

      // Weight arrow (down)
      if (weight > 0) {
        const weightLength = Math.min(weight * arrowScale, 80);
        ctx.strokeStyle = "#ef4444";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(objectX - 20, objectY);
        ctx.lineTo(objectX - 20, objectY + weightLength);
        ctx.stroke();

        ctx.fillStyle = "#ef4444";
        ctx.beginPath();
        ctx.moveTo(objectX - 20, objectY + weightLength);
        ctx.lineTo(objectX - 25, objectY + weightLength - 10);
        ctx.lineTo(objectX - 15, objectY + weightLength - 10);
        ctx.closePath();
        ctx.fill();

        ctx.font = "10px monospace";
        ctx.fillText("mg", objectX - 35, objectY + weightLength / 2);
      }

      // Buoyant force arrow (up)
      if (buoyantForce > 0) {
        const buoyantLength = Math.min(buoyantForce * arrowScale, 80);
        ctx.strokeStyle = "#22c55e";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(objectX + 20, objectY);
        ctx.lineTo(objectX + 20, objectY - buoyantLength);
        ctx.stroke();

        ctx.fillStyle = "#22c55e";
        ctx.beginPath();
        ctx.moveTo(objectX + 20, objectY - buoyantLength);
        ctx.lineTo(objectX + 15, objectY - buoyantLength + 10);
        ctx.lineTo(objectX + 25, objectY - buoyantLength + 10);
        ctx.closePath();
        ctx.fill();

        ctx.font = "10px monospace";
        ctx.fillText("Fa", objectX + 35, objectY - buoyantLength / 2);
      }

      // Draw fluid density indicator
      ctx.fillStyle = "#3b82f6";
      ctx.font = "11px monospace";
      ctx.textAlign = "left";
      ctx.fillText(`ρ suyuqlik = ${fluidDensity} kg/m³`, containerX + 10, containerY + containerHeight - 10);

      // Draw info panel
      ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
      ctx.fillRect(320, 80, 170, 150);
      ctx.strokeStyle = "rgba(34, 197, 94, 0.5)";
      ctx.strokeRect(320, 80, 170, 150);

      ctx.fillStyle = "#fff";
      ctx.font = "12px monospace";
      ctx.textAlign = "left";
      ctx.fillText("Arximed qonuni", 330, 100);
      ctx.fillText(`Jism zichligi: ${objectDensity}`, 330, 120);
      ctx.fillText(`Suyuqlik: ${fluidDensity}`, 330, 140);
      ctx.fillText(`Hajm: ${(objectVolume * 1000).toFixed(1)} L`, 330, 160);
      ctx.fillText(`Og'irlik: ${weight.toFixed(1)} N`, 330, 180);
      ctx.fillText(`Arximed: ${buoyantForce.toFixed(1)} N`, 330, 200);
      ctx.fillStyle = netForce > 0.1 ? "#ef4444" : netForce < -0.1 ? "#22c55e" : "#f59e0b";
      ctx.fillText(`Natijaviy: ${netForce.toFixed(1)} N`, 330, 220);

      // Status indicator
      ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
      ctx.fillRect(320, 240, 170, 30);
      ctx.strokeStyle = objectColor + "80";
      ctx.strokeRect(320, 240, 170, 30);

      ctx.fillStyle = objectColor;
      ctx.font = "bold 12px monospace";
      ctx.textAlign = "center";
      if (objectDensity > fluidDensity) {
        ctx.fillText("CHO'KADI ⬇", 405, 260);
      } else if (objectDensity < fluidDensity) {
        ctx.fillText("SUZADI ⬆", 405, 260);
      } else {
        ctx.fillText("MUVOZANAT ⚖", 405, 260);
      }

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
