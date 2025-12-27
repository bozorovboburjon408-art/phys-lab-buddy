import React, { useRef, useEffect, useState } from "react";
import { SimulationParameter } from "@/types/physics";
import { Button } from "@/components/ui/button";
import { Play, Pause } from "lucide-react";

interface Props {
  parameters: SimulationParameter[];
}

export const TransformerEfficiencySimulation: React.FC<Props> = ({ parameters }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const timeRef = useRef(0);
  const [isRunning, setIsRunning] = useState(true);

  const getParamValue = (id: string): number => {
    const param = parameters.find((p) => p.id === id);
    return param?.value ?? 0;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Get parameters
    const primaryVoltage = getParamValue("primaryVoltage");
    const primaryTurns = getParamValue("primaryTurns");
    const secondaryTurns = getParamValue("secondaryTurns");
    const loadPower = getParamValue("loadPower");
    const coreLoss = getParamValue("coreLoss");
    const copperLoss = getParamValue("copperLoss");

    // Calculate transformer values
    const transformRatio = secondaryTurns / primaryTurns;
    const secondaryVoltage = primaryVoltage * transformRatio;
    const inputPower = loadPower + coreLoss + copperLoss;
    const efficiency = inputPower > 0 ? (loadPower / inputPower) * 100 : 0;

    // Current calculations
    const primaryCurrent = inputPower / primaryVoltage;
    const secondaryCurrent = loadPower / secondaryVoltage;

    const animate = () => {
      if (isRunning) {
        timeRef.current += 0.02;
      }
      const time = timeRef.current;

      // Clear canvas
      ctx.fillStyle = "#0a0a1a";
      ctx.fillRect(0, 0, width, height);

      // Draw grid
      ctx.strokeStyle = "rgba(100, 100, 150, 0.1)";
      ctx.lineWidth = 1;
      for (let i = 0; i < width; i += 30) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, height);
        ctx.stroke();
      }
      for (let i = 0; i < height; i += 30) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(width, i);
        ctx.stroke();
      }

      // Draw AC source (left)
      const sourceX = 60;
      const sourceY = height / 2;

      // AC wave in source
      ctx.strokeStyle = "#f59e0b";
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let i = -25; i <= 25; i++) {
        const y = sourceY + Math.sin((i * 0.2) + time * 5) * 15;
        if (i === -25) ctx.moveTo(sourceX - 10 + i, y);
        else ctx.lineTo(sourceX - 10 + i, y);
      }
      ctx.stroke();

      // Source circle
      ctx.strokeStyle = "#f59e0b";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(sourceX, sourceY, 30, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = "rgba(245, 158, 11, 0.1)";
      ctx.fill();

      // Draw primary coil
      const coilStartX = 130;
      const coilWidth = 80;
      const coilHeight = 120;

      // Primary coil winding
      ctx.strokeStyle = "#ef4444";
      ctx.lineWidth = 3;
      const primaryWindings = Math.min(primaryTurns / 10, 15);
      for (let i = 0; i < primaryWindings; i++) {
        const y = (height / 2 - coilHeight / 2) + (i * coilHeight / primaryWindings);
        const nextY = (height / 2 - coilHeight / 2) + ((i + 1) * coilHeight / primaryWindings);
        
        ctx.beginPath();
        ctx.ellipse(coilStartX + coilWidth / 2, y + (nextY - y) / 2, coilWidth / 2, (nextY - y) / 2, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Draw iron core
      const coreX = coilStartX + coilWidth + 20;
      const coreWidth = 40;
      const gradient = ctx.createLinearGradient(coreX, 0, coreX + coreWidth, 0);
      gradient.addColorStop(0, "#4b5563");
      gradient.addColorStop(0.5, "#6b7280");
      gradient.addColorStop(1, "#4b5563");
      
      ctx.fillStyle = gradient;
      ctx.fillRect(coreX, height / 2 - coilHeight / 2 - 20, coreWidth, coilHeight + 40);

      // Core loss glow (heat effect)
      if (coreLoss > 0) {
        const glowIntensity = Math.min(coreLoss / 50, 1);
        ctx.fillStyle = `rgba(239, 68, 68, ${glowIntensity * 0.3 * (0.8 + 0.2 * Math.sin(time * 3))})`;
        ctx.fillRect(coreX - 5, height / 2 - coilHeight / 2 - 25, coreWidth + 10, coilHeight + 50);
      }

      // Draw secondary coil
      const secondaryStartX = coreX + coreWidth + 20;

      // Secondary coil winding
      ctx.strokeStyle = "#3b82f6";
      ctx.lineWidth = 3;
      const secondaryWindings = Math.min(secondaryTurns / 10, 15);
      for (let i = 0; i < secondaryWindings; i++) {
        const y = (height / 2 - coilHeight / 2) + (i * coilHeight / secondaryWindings);
        const nextY = (height / 2 - coilHeight / 2) + ((i + 1) * coilHeight / secondaryWindings);
        
        ctx.beginPath();
        ctx.ellipse(secondaryStartX + coilWidth / 2, y + (nextY - y) / 2, coilWidth / 2, (nextY - y) / 2, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Draw load (right side)
      const loadX = secondaryStartX + coilWidth + 60;
      const loadY = height / 2;

      // Resistor symbol
      ctx.strokeStyle = "#10b981";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(loadX - 30, loadY);
      for (let i = 0; i < 6; i++) {
        ctx.lineTo(loadX - 20 + i * 10, loadY + (i % 2 === 0 ? -15 : 15));
      }
      ctx.lineTo(loadX + 40, loadY);
      ctx.stroke();

      // Load box
      ctx.strokeStyle = "#10b981";
      ctx.lineWidth = 2;
      ctx.strokeRect(loadX - 35, loadY - 30, 80, 60);
      ctx.fillStyle = "rgba(16, 185, 129, 0.1)";
      ctx.fillRect(loadX - 35, loadY - 30, 80, 60);

      // Connection wires with current flow
      ctx.strokeStyle = "#f59e0b";
      ctx.lineWidth = 2;
      // Source to primary top
      ctx.beginPath();
      ctx.moveTo(sourceX + 30, sourceY - 20);
      ctx.lineTo(coilStartX, height / 2 - coilHeight / 2);
      ctx.stroke();
      // Source to primary bottom
      ctx.beginPath();
      ctx.moveTo(sourceX + 30, sourceY + 20);
      ctx.lineTo(coilStartX, height / 2 + coilHeight / 2);
      ctx.stroke();

      ctx.strokeStyle = "#3b82f6";
      // Secondary to load top
      ctx.beginPath();
      ctx.moveTo(secondaryStartX + coilWidth, height / 2 - coilHeight / 2);
      ctx.lineTo(loadX - 35, loadY - 20);
      ctx.stroke();
      // Secondary to load bottom
      ctx.beginPath();
      ctx.moveTo(secondaryStartX + coilWidth, height / 2 + coilHeight / 2);
      ctx.lineTo(loadX - 35, loadY + 20);
      ctx.stroke();

      // Animated current dots
      ctx.fillStyle = "#fbbf24";
      for (let i = 0; i < 5; i++) {
        const t = ((time * 2 + i * 0.2) % 1);
        const x = sourceX + 30 + t * (coilStartX - sourceX - 30);
        const y = sourceY - 20 + t * (height / 2 - coilHeight / 2 - sourceY + 20);
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = "#60a5fa";
      for (let i = 0; i < 5; i++) {
        const t = ((time * 2 + i * 0.2) % 1);
        const x = secondaryStartX + coilWidth + t * (loadX - 35 - secondaryStartX - coilWidth);
        const y = height / 2 - coilHeight / 2 + t * (loadY - 20 - height / 2 + coilHeight / 2);
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();
      }

      // Magnetic flux arrows in core
      ctx.strokeStyle = "#a855f7";
      ctx.fillStyle = "#a855f7";
      ctx.lineWidth = 2;
      const fluxY = height / 2 + Math.sin(time * 5) * 20;
      ctx.beginPath();
      ctx.moveTo(coreX + coreWidth / 2, fluxY - 40);
      ctx.lineTo(coreX + coreWidth / 2, fluxY + 40);
      ctx.stroke();
      // Arrow head
      ctx.beginPath();
      ctx.moveTo(coreX + coreWidth / 2, fluxY + 40);
      ctx.lineTo(coreX + coreWidth / 2 - 6, fluxY + 30);
      ctx.lineTo(coreX + coreWidth / 2 + 6, fluxY + 30);
      ctx.closePath();
      ctx.fill();

      // Energy flow diagram at bottom
      const diagramY = height - 80;
      const barWidth = 300;
      const barHeight = 25;
      const startX = (width - barWidth) / 2;

      // Input power bar
      ctx.fillStyle = "rgba(245, 158, 11, 0.3)";
      ctx.fillRect(startX, diagramY, barWidth, barHeight);
      ctx.strokeStyle = "#f59e0b";
      ctx.strokeRect(startX, diagramY, barWidth, barHeight);

      // Losses section
      const lossRatio = (coreLoss + copperLoss) / inputPower;
      const lossWidth = barWidth * lossRatio;
      ctx.fillStyle = "rgba(239, 68, 68, 0.5)";
      ctx.fillRect(startX + barWidth - lossWidth, diagramY, lossWidth, barHeight);

      // Output power section
      const outputRatio = loadPower / inputPower;
      const outputWidth = barWidth * outputRatio;
      ctx.fillStyle = "rgba(16, 185, 129, 0.5)";
      ctx.fillRect(startX, diagramY, outputWidth, barHeight);

      // Labels on energy diagram
      ctx.font = "11px monospace";
      ctx.fillStyle = "#fff";
      ctx.textAlign = "center";
      ctx.fillText(`Kirish: ${inputPower.toFixed(1)} W`, startX + barWidth / 2, diagramY - 8);
      
      if (outputWidth > 50) {
        ctx.fillStyle = "#10b981";
        ctx.fillText(`Chiqish: ${loadPower.toFixed(1)} W`, startX + outputWidth / 2, diagramY + 16);
      }
      
      if (lossWidth > 40) {
        ctx.fillStyle = "#ef4444";
        ctx.fillText(`Yo'qotish`, startX + barWidth - lossWidth / 2, diagramY + 16);
      }

      // Info panel - left side
      ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
      ctx.fillRect(10, 10, 160, 140);
      ctx.strokeStyle = "rgba(245, 158, 11, 0.5)";
      ctx.strokeRect(10, 10, 160, 140);

      ctx.font = "bold 12px monospace";
      ctx.fillStyle = "#f59e0b";
      ctx.textAlign = "left";
      ctx.fillText("BIRLAMCHI CHULG'AM", 20, 30);

      ctx.font = "11px monospace";
      ctx.fillStyle = "#fff";
      ctx.fillText(`Kuchlanish: ${primaryVoltage.toFixed(0)} V`, 20, 50);
      ctx.fillText(`O'ramlar: ${primaryTurns}`, 20, 68);
      ctx.fillText(`Tok: ${primaryCurrent.toFixed(2)} A`, 20, 86);
      ctx.fillText(`Quvvat: ${inputPower.toFixed(1)} W`, 20, 104);
      
      ctx.fillStyle = "#f59e0b";
      ctx.fillText(`⚡ Kirish energiyasi`, 20, 130);

      // Info panel - right side
      ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
      ctx.fillRect(width - 170, 10, 160, 140);
      ctx.strokeStyle = "rgba(59, 130, 246, 0.5)";
      ctx.strokeRect(width - 170, 10, 160, 140);

      ctx.font = "bold 12px monospace";
      ctx.fillStyle = "#3b82f6";
      ctx.textAlign = "left";
      ctx.fillText("IKKILAMCHI CHULG'AM", width - 160, 30);

      ctx.font = "11px monospace";
      ctx.fillStyle = "#fff";
      ctx.fillText(`Kuchlanish: ${secondaryVoltage.toFixed(1)} V`, width - 160, 50);
      ctx.fillText(`O'ramlar: ${secondaryTurns}`, width - 160, 68);
      ctx.fillText(`Tok: ${secondaryCurrent.toFixed(2)} A`, width - 160, 86);
      ctx.fillText(`Quvvat: ${loadPower.toFixed(1)} W`, width - 160, 104);
      
      ctx.fillStyle = "#3b82f6";
      ctx.fillText(`⚡ Chiqish energiyasi`, width - 160, 130);

      // Efficiency display - center top
      const effColor = efficiency >= 90 ? "#10b981" : efficiency >= 70 ? "#f59e0b" : "#ef4444";
      
      ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
      ctx.beginPath();
      ctx.roundRect(width / 2 - 80, 10, 160, 70, 10);
      ctx.fill();
      ctx.strokeStyle = effColor;
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.font = "bold 14px monospace";
      ctx.fillStyle = "#fff";
      ctx.textAlign = "center";
      ctx.fillText("FOYDALI ISH KOEFFITSIENTI", width / 2, 32);

      ctx.font = "bold 28px monospace";
      ctx.fillStyle = effColor;
      ctx.fillText(`η = ${efficiency.toFixed(1)}%`, width / 2, 65);

      // Losses panel
      ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
      ctx.fillRect(width / 2 - 70, height - 145, 140, 55);
      ctx.strokeStyle = "rgba(239, 68, 68, 0.5)";
      ctx.strokeRect(width / 2 - 70, height - 145, 140, 55);

      ctx.font = "bold 11px monospace";
      ctx.fillStyle = "#ef4444";
      ctx.textAlign = "center";
      ctx.fillText("YO'QOTISHLAR", width / 2, height - 130);

      ctx.font = "10px monospace";
      ctx.fillStyle = "#fca5a5";
      ctx.fillText(`Yadro: ${coreLoss.toFixed(1)} W | Mis: ${copperLoss.toFixed(1)} W`, width / 2, height - 112);
      ctx.fillText(`Jami: ${(coreLoss + copperLoss).toFixed(1)} W`, width / 2, height - 97);

      // Transformer ratio
      ctx.fillStyle = "rgba(168, 85, 247, 0.2)";
      ctx.fillRect(width / 2 - 55, height / 2 - 15, 110, 30);
      ctx.strokeStyle = "#a855f7";
      ctx.strokeRect(width / 2 - 55, height / 2 - 15, 110, 30);

      ctx.font = "12px monospace";
      ctx.fillStyle = "#a855f7";
      ctx.textAlign = "center";
      ctx.fillText(`k = ${transformRatio.toFixed(2)}`, width / 2, height / 2 + 5);

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [parameters, isRunning]);

  return (
    <div className="relative w-full">
      <canvas
        ref={canvasRef}
        width={600}
        height={400}
        className="w-full aspect-[3/2] rounded-xl border border-border bg-card"
      />
      <div className="absolute bottom-4 left-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsRunning(!isRunning)}
          className="bg-background/80 backdrop-blur"
        >
          {isRunning ? <Pause className="h-4 w-4 mr-1" /> : <Play className="h-4 w-4 mr-1" />}
          {isRunning ? "To'xtatish" : "Davom"}
        </Button>
      </div>
    </div>
  );
};
