import { useEffect, useRef } from "react";
import { SimulationParameter } from "@/types/physics";

interface Props {
  parameters: SimulationParameter[];
}

export const ThermalExpansionSimulation = ({ parameters }: Props) => {
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

    const initialLength = getParamValue("initialLength");
    const temperature = getParamValue("temperature");
    const initialTemp = getParamValue("initialTemp");
    const coefficient = getParamValue("coefficient");

    const deltaT = temperature - initialTemp;
    const deltaL = initialLength * coefficient * deltaT * 1000; // in mm
    const finalLength = initialLength + deltaL / 1000;

    let animatedTemp = initialTemp;

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

      // Animate temperature
      if (animatedTemp < temperature) {
        animatedTemp = Math.min(animatedTemp + 0.5, temperature);
      } else if (animatedTemp > temperature) {
        animatedTemp = Math.max(animatedTemp - 0.5, temperature);
      }

      const currentDeltaT = animatedTemp - initialTemp;
      const currentDeltaL = initialLength * coefficient * currentDeltaT * 1000;

      // Calculate color based on temperature
      const tempRatio = (animatedTemp - 0) / 200;
      const red = Math.floor(50 + tempRatio * 205);
      const blue = Math.floor(200 - tempRatio * 200);

      // Draw original bar outline
      const barY = 140;
      const barHeight = 40;
      const scale = 100; // pixels per meter
      const originalWidth = initialLength * scale;
      const currentWidth = originalWidth + currentDeltaL * scale / 1000 * 100;

      // Original bar (dashed outline)
      ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
      ctx.setLineDash([5, 5]);
      ctx.lineWidth = 2;
      ctx.strokeRect(80, barY, originalWidth, barHeight);
      ctx.setLineDash([]);

      // Current bar with temperature color
      const gradient = ctx.createLinearGradient(80, barY, 80 + currentWidth, barY);
      gradient.addColorStop(0, `rgb(${red}, 50, ${blue})`);
      gradient.addColorStop(1, `rgb(${Math.min(255, red + 50)}, 80, ${Math.max(0, blue - 50)})`);
      ctx.fillStyle = gradient;
      ctx.fillRect(80, barY, currentWidth, barHeight);

      ctx.strokeStyle = `rgb(${red}, 100, ${blue})`;
      ctx.lineWidth = 2;
      ctx.strokeRect(80, barY, currentWidth, barHeight);

      // Draw heat waves if hot
      if (animatedTemp > 50) {
        ctx.strokeStyle = `rgba(${red}, 50, 50, 0.3)`;
        ctx.lineWidth = 1;
        for (let i = 0; i < 5; i++) {
          const waveY = barY - 10 - i * 8;
          ctx.beginPath();
          ctx.moveTo(100 + i * 30, waveY);
          ctx.bezierCurveTo(110 + i * 30, waveY - 5, 120 + i * 30, waveY + 5, 130 + i * 30, waveY);
          ctx.stroke();
        }
      }

      // Draw ruler
      ctx.strokeStyle = "#718096";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(80, barY + barHeight + 20);
      ctx.lineTo(80 + currentWidth, barY + barHeight + 20);
      ctx.stroke();

      // Ruler marks
      for (let i = 0; i <= Math.ceil(currentWidth / 20); i++) {
        const x = 80 + i * 20;
        if (x <= 80 + currentWidth) {
          ctx.beginPath();
          ctx.moveTo(x, barY + barHeight + 15);
          ctx.lineTo(x, barY + barHeight + 25);
          ctx.stroke();
        }
      }

      // Draw thermometer
      const thermoX = 420;
      const thermoY = 80;
      const thermoHeight = 200;

      // Thermometer tube
      ctx.fillStyle = "#1e1b4b";
      ctx.beginPath();
      ctx.roundRect(thermoX - 15, thermoY, 30, thermoHeight, 15);
      ctx.fill();
      ctx.strokeStyle = "#4c1d95";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Mercury level
      const mercuryHeight = (animatedTemp / 200) * (thermoHeight - 30);
      ctx.fillStyle = "#ef4444";
      ctx.beginPath();
      ctx.roundRect(thermoX - 8, thermoY + thermoHeight - 20 - mercuryHeight, 16, mercuryHeight + 10, 8);
      ctx.fill();

      // Thermometer bulb
      ctx.beginPath();
      ctx.arc(thermoX, thermoY + thermoHeight + 10, 20, 0, Math.PI * 2);
      ctx.fillStyle = "#ef4444";
      ctx.fill();
      ctx.strokeStyle = "#4c1d95";
      ctx.stroke();

      // Temperature marks
      ctx.fillStyle = "#a5b4fc";
      ctx.font = "10px monospace";
      ctx.textAlign = "left";
      for (let t = 0; t <= 200; t += 50) {
        const markY = thermoY + thermoHeight - 20 - (t / 200) * (thermoHeight - 30);
        ctx.fillText(`${t}°C`, thermoX + 20, markY + 4);
        ctx.beginPath();
        ctx.moveTo(thermoX + 10, markY);
        ctx.lineTo(thermoX + 15, markY);
        ctx.stroke();
      }

      // Current temperature display
      ctx.fillStyle = "#fff";
      ctx.font = "bold 16px monospace";
      ctx.textAlign = "center";
      ctx.fillText(`${animatedTemp.toFixed(1)}°C`, thermoX, thermoY - 10);

      // Draw info panel
      ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
      ctx.fillRect(10, canvas.height - 110, 250, 100);
      ctx.strokeStyle = "rgba(239, 68, 68, 0.5)";
      ctx.strokeRect(10, canvas.height - 110, 250, 100);

      ctx.fillStyle = "#fff";
      ctx.font = "12px monospace";
      ctx.textAlign = "left";
      ctx.fillText("Chiziqli kengayish: ΔL = L₀ × α × ΔT", 20, canvas.height - 90);
      ctx.fillText(`Boshlang'ich uzunlik: ${initialLength.toFixed(2)} m`, 20, canvas.height - 70);
      ctx.fillText(`Harorat o'zgarishi: ${currentDeltaT.toFixed(1)} °C`, 20, canvas.height - 50);
      ctx.fillText(`Uzunlik o'zgarishi: ${currentDeltaL.toFixed(3)} mm`, 20, canvas.height - 30);

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
