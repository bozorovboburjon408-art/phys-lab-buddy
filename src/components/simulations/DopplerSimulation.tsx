import { useRef, useEffect, useState } from "react";
import { SimulationParameter } from "@/types/physics";

interface Props {
  parameters: SimulationParameter[];
}

export const DopplerSimulation = ({ parameters }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const timeRef = useRef(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const getParam = (id: string) =>
      parameters.find((p) => p.id === id)?.value ?? 0;

    const sourceSpeed = getParam("sourceSpeed");
    const waveSpeed = getParam("waveSpeed");
    const frequency = getParam("frequency");
    const observerSpeed = getParam("observerSpeed");

    const waves: { x: number; y: number; radius: number; time: number }[] = [];
    let sourceX = 100;
    const sourceY = canvas.height / 2;
    const waveInterval = 1 / frequency * 60;
    let frameCount = 0;

    const animate = () => {
      if (!isPlaying) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      timeRef.current += 1;
      frameCount++;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
      gradient.addColorStop(0, "#1e3a5f");
      gradient.addColorStop(0.5, "#0f172a");
      gradient.addColorStop(1, "#3d1a1a");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Grid
      ctx.strokeStyle = "rgba(100, 116, 139, 0.15)";
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 50) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 50) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Update source position
      sourceX += sourceSpeed * 0.5;
      if (sourceX > canvas.width + 50) {
        sourceX = -50;
        waves.length = 0;
      }

      // Add new wave
      if (frameCount >= waveInterval) {
        waves.push({
          x: sourceX,
          y: sourceY,
          radius: 0,
          time: timeRef.current,
        });
        frameCount = 0;
      }

      // Draw and update waves
      waves.forEach((wave, index) => {
        wave.radius += waveSpeed * 0.3;

        // Fade out over time
        const alpha = Math.max(0, 1 - wave.radius / 400);
        
        if (alpha <= 0) {
          waves.splice(index, 1);
          return;
        }

        // Wave color based on compression/expansion
        ctx.strokeStyle = `rgba(96, 165, 250, ${alpha})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2);
        ctx.stroke();

        // Inner glow
        ctx.strokeStyle = `rgba(147, 197, 253, ${alpha * 0.5})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(wave.x, wave.y, wave.radius - 3, 0, Math.PI * 2);
        ctx.stroke();
      });

      // Draw source (car/vehicle shape)
      ctx.save();
      ctx.translate(sourceX, sourceY);

      // Car body
      ctx.fillStyle = "#ef4444";
      ctx.beginPath();
      ctx.roundRect(-25, -15, 50, 30, 8);
      ctx.fill();

      // Car roof
      ctx.fillStyle = "#dc2626";
      ctx.beginPath();
      ctx.roundRect(-15, -25, 30, 15, 5);
      ctx.fill();

      // Windows
      ctx.fillStyle = "#60a5fa";
      ctx.fillRect(-12, -22, 10, 10);
      ctx.fillRect(2, -22, 10, 10);

      // Wheels
      ctx.fillStyle = "#1e293b";
      ctx.beginPath();
      ctx.arc(-15, 15, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(15, 15, 8, 0, Math.PI * 2);
      ctx.fill();

      // Speaker/sound source indicator
      ctx.fillStyle = "#fbbf24";
      ctx.beginPath();
      ctx.arc(25, 0, 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      // Draw observers
      const observer1X = 150;
      const observer2X = canvas.width - 150;

      // Observer 1 (approaching)
      ctx.fillStyle = "#22c55e";
      ctx.beginPath();
      ctx.arc(observer1X, sourceY, 15, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#fff";
      ctx.font = "12px Inter, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("👂", observer1X, sourceY + 5);

      // Observer 2 (receding)
      ctx.fillStyle = "#f59e0b";
      ctx.beginPath();
      ctx.arc(observer2X, sourceY, 15, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillText("👂", observer2X, sourceY + 5);

      // Calculate observed frequencies (with observer motion)
      // f' = f₀ × (c + v_observer) / (c - v_source) for approaching
      // f' = f₀ × (c - v_observer) / (c + v_source) for receding
      const observedFreq1 = frequency * ((waveSpeed + observerSpeed) / (waveSpeed - sourceSpeed));
      const observedFreq2 = frequency * ((waveSpeed - observerSpeed) / (waveSpeed + sourceSpeed));

      // Labels for observers
      ctx.font = "bold 12px Inter, sans-serif";
      ctx.fillStyle = "#22c55e";
      ctx.fillText("Yaqinlashayotgan", observer1X, sourceY - 35);
      ctx.fillText(`f = ${observedFreq1.toFixed(1)} Hz`, observer1X, sourceY - 50);
      ctx.fillStyle = "#a3e635";
      ctx.fillText("↑ Yuqori chastota", observer1X, sourceY + 45);

      ctx.fillStyle = "#f59e0b";
      ctx.fillText("Uzoqlashayotgan", observer2X, sourceY - 35);
      ctx.fillText(`f = ${observedFreq2.toFixed(1)} Hz`, observer2X, sourceY - 50);
      ctx.fillStyle = "#fcd34d";
      ctx.fillText("↓ Past chastota", observer2X, sourceY + 45);

      // Direction arrow
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(sourceX + 40, sourceY);
      ctx.lineTo(sourceX + 70, sourceY);
      ctx.lineTo(sourceX + 60, sourceY - 10);
      ctx.moveTo(sourceX + 70, sourceY);
      ctx.lineTo(sourceX + 60, sourceY + 10);
      ctx.stroke();

      // Info panel
      ctx.fillStyle = "rgba(30, 41, 59, 0.95)";
      ctx.fillRect(15, 15, 320, 160);
      ctx.strokeStyle = "rgba(100, 116, 139, 0.5)";
      ctx.lineWidth = 1;
      ctx.strokeRect(15, 15, 320, 160);

      ctx.fillStyle = "#e2e8f0";
      ctx.font = "bold 14px Inter, sans-serif";
      ctx.textAlign = "left";
      ctx.fillText("Dopler effekti", 25, 40);

      ctx.font = "13px Inter, sans-serif";
      ctx.fillStyle = "#94a3b8";
      ctx.fillText(`Manba tezligi (vₛ): ${sourceSpeed.toFixed(0)} m/s`, 25, 65);
      ctx.fillText(`Kuzatuvchi tezligi (vₒ): ${observerSpeed.toFixed(0)} m/s`, 25, 85);
      ctx.fillText(`Tovush tezligi (c): ${waveSpeed.toFixed(0)} m/s`, 25, 105);
      ctx.fillText(`Manba chastotasi (f₀): ${frequency.toFixed(0)} Hz`, 25, 125);

      ctx.fillStyle = "#fbbf24";
      ctx.font = "12px Inter, sans-serif";
      ctx.fillText("f' = f₀ · (c ± vₒ) / (c ∓ vₛ)", 25, 145);
      ctx.fillStyle = "#94a3b8";
      ctx.fillText("Yaqinlashganda: chastota ↑", 25, 160);

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [parameters, isPlaying]);

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        width={800}
        height={450}
        className="w-full rounded-xl border border-border"
      />
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="absolute bottom-4 right-4 px-4 py-2 bg-primary/80 hover:bg-primary text-primary-foreground rounded-lg transition-colors"
      >
        {isPlaying ? "⏸ To'xtatish" : "▶ Davom ettirish"}
      </button>
    </div>
  );
};