import { useEffect, useRef } from "react";
import { SimulationParameter } from "@/types/physics";

interface Props {
  parameters: SimulationParameter[];
}

export const IlluminationSimulation = ({ parameters }: Props) => {
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

    const luminousIntensity = getParamValue("luminousIntensity");
    const distance = getParamValue("distance");
    const angle = getParamValue("angle");

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

      const sourceX = 80;
      const sourceY = 180;
      const angleRad = (angle * Math.PI) / 180;

      // Calculate illumination
      const illumination = (luminousIntensity * Math.cos(angleRad)) / (distance * distance);

      // Draw light source
      const pulseRadius = 20 + Math.sin(time * 3) * 3;
      
      // Glow effect
      const glowGradient = ctx.createRadialGradient(sourceX, sourceY, 0, sourceX, sourceY, 60);
      glowGradient.addColorStop(0, `rgba(255, 220, 100, ${0.3 + Math.sin(time * 3) * 0.1})`);
      glowGradient.addColorStop(1, "rgba(255, 220, 100, 0)");
      ctx.fillStyle = glowGradient;
      ctx.beginPath();
      ctx.arc(sourceX, sourceY, 60, 0, Math.PI * 2);
      ctx.fill();

      // Light bulb
      ctx.fillStyle = "#fcd34d";
      ctx.beginPath();
      ctx.arc(sourceX, sourceY, pulseRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#fbbf24";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Bulb filament
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(sourceX - 5, sourceY);
      ctx.lineTo(sourceX - 3, sourceY - 5);
      ctx.lineTo(sourceX + 3, sourceY + 5);
      ctx.lineTo(sourceX + 5, sourceY);
      ctx.stroke();

      // Light intensity label
      ctx.fillStyle = "#fcd34d";
      ctx.font = "bold 12px monospace";
      ctx.textAlign = "center";
      ctx.fillText(`${luminousIntensity} cd`, sourceX, sourceY + 45);

      // Draw light rays
      const rayCount = 8;
      const scale = 30;
      const targetX = sourceX + distance * scale;
      const targetY = sourceY;

      for (let i = -rayCount / 2; i <= rayCount / 2; i++) {
        const rayAngle = (i / rayCount) * 0.5;
        const endX = sourceX + Math.cos(rayAngle) * distance * scale;
        const endY = sourceY + Math.sin(rayAngle) * distance * scale;

        const gradient = ctx.createLinearGradient(sourceX, sourceY, endX, endY);
        gradient.addColorStop(0, "rgba(255, 220, 100, 0.6)");
        gradient.addColorStop(1, "rgba(255, 220, 100, 0.1)");

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(sourceX + 20, sourceY + i * 3);
        ctx.lineTo(endX, endY);
        ctx.stroke();
      }

      // Draw surface
      const surfaceX = targetX;
      const surfaceWidth = 15;
      const surfaceHeight = 100;

      // Calculate surface brightness based on illumination
      const brightness = Math.min(255, illumination * 50);
      const surfaceColor = `rgb(${brightness}, ${brightness * 0.9}, ${brightness * 0.7})`;

      // Draw surface at angle
      ctx.save();
      ctx.translate(surfaceX, sourceY);
      ctx.rotate(angleRad);

      ctx.fillStyle = surfaceColor;
      ctx.fillRect(-surfaceWidth / 2, -surfaceHeight / 2, surfaceWidth, surfaceHeight);
      ctx.strokeStyle = "#718096";
      ctx.lineWidth = 2;
      ctx.strokeRect(-surfaceWidth / 2, -surfaceHeight / 2, surfaceWidth, surfaceHeight);

      ctx.restore();

      // Draw normal line
      ctx.strokeStyle = "rgba(168, 85, 247, 0.5)";
      ctx.setLineDash([5, 5]);
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(surfaceX, sourceY);
      ctx.lineTo(surfaceX + 60, sourceY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw angle arc
      if (angle > 0) {
        ctx.strokeStyle = "#a855f7";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(surfaceX, sourceY, 30, 0, angleRad);
        ctx.stroke();

        ctx.fillStyle = "#a855f7";
        ctx.font = "12px monospace";
        const labelX = surfaceX + Math.cos(angleRad / 2) * 45;
        const labelY = sourceY + Math.sin(angleRad / 2) * 45;
        ctx.fillText(`${angle}°`, labelX, labelY);
      }

      // Draw distance indicator
      ctx.strokeStyle = "#22c55e";
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(sourceX, sourceY + 60);
      ctx.lineTo(surfaceX, sourceY + 60);
      ctx.stroke();
      ctx.setLineDash([]);

      // Distance arrows
      ctx.beginPath();
      ctx.moveTo(sourceX, sourceY + 55);
      ctx.lineTo(sourceX, sourceY + 65);
      ctx.moveTo(surfaceX, sourceY + 55);
      ctx.lineTo(surfaceX, sourceY + 65);
      ctx.stroke();

      ctx.fillStyle = "#22c55e";
      ctx.font = "12px monospace";
      ctx.textAlign = "center";
      ctx.fillText(`r = ${distance.toFixed(1)} m`, (sourceX + surfaceX) / 2, sourceY + 80);

      // Draw illumination graph
      const graphX = 50;
      const graphY = 280;
      const graphWidth = 200;
      const graphHeight = 80;

      ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
      ctx.lineWidth = 1;
      ctx.strokeRect(graphX, graphY, graphWidth, graphHeight);

      // Axes
      ctx.beginPath();
      ctx.moveTo(graphX, graphY + graphHeight);
      ctx.lineTo(graphX + graphWidth, graphY + graphHeight);
      ctx.stroke();

      // 1/r² curve
      ctx.strokeStyle = "#fcd34d";
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let x = 0; x < graphWidth; x++) {
        const r = 1 + (x / graphWidth) * 9;
        const E = luminousIntensity / (r * r);
        const y = graphY + graphHeight - (E / luminousIntensity) * graphHeight * 0.8;
        if (x === 0) ctx.moveTo(graphX + x, y);
        else ctx.lineTo(graphX + x, y);
      }
      ctx.stroke();

      // Current point on graph
      const currentGraphX = graphX + ((distance - 1) / 9) * graphWidth;
      const currentGraphY = graphY + graphHeight - (illumination / luminousIntensity) * graphHeight * 0.8;
      ctx.fillStyle = "#ef4444";
      ctx.beginPath();
      ctx.arc(currentGraphX, currentGraphY, 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#a5b4fc";
      ctx.font = "10px monospace";
      ctx.textAlign = "left";
      ctx.fillText("E (lux)", graphX + 5, graphY + 15);
      ctx.fillText("r (m)", graphX + graphWidth - 30, graphY + graphHeight - 5);

      // Draw info panel
      ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
      ctx.fillRect(300, 280, 190, 100);
      ctx.strokeStyle = "rgba(252, 211, 77, 0.5)";
      ctx.strokeRect(300, 280, 190, 100);

      ctx.fillStyle = "#fff";
      ctx.font = "12px monospace";
      ctx.textAlign = "left";
      ctx.fillText("Yoritilganlik qonuni", 310, 300);
      ctx.fillText(`Yorug'lik kuchi: ${luminousIntensity} cd`, 310, 320);
      ctx.fillText(`Masofa: ${distance.toFixed(1)} m`, 310, 340);
      ctx.fillText(`Tushish burchagi: ${angle}°`, 310, 360);

      ctx.fillStyle = "#fcd34d";
      ctx.font = "bold 14px monospace";
      ctx.fillText(`E = ${illumination.toFixed(2)} lux`, 310, 375);

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
