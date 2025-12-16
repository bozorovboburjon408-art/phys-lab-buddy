import { useRef, useEffect } from "react";
import { SimulationParameter } from "@/types/physics";

interface Props {
  parameters: SimulationParameter[];
}

export const InterferenceSimulation = ({ parameters }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const getParam = (id: string) =>
      parameters.find((p) => p.id === id)?.value ?? 0;

    const wavelength = getParam("wavelength");
    const slitDistance = getParam("slitDistance");
    const frequency = getParam("frequency");
    const screenDistance = getParam("screenDistance") || 100;

    const source1X = canvas.width / 4;
    const source2X = canvas.width / 4;
    const source1Y = canvas.height / 2 - slitDistance * 5;
    const source2Y = canvas.height / 2 + slitDistance * 5;
    
    // Screen position based on screenDistance parameter
    const screenX = Math.min(canvas.width - 50, source1X + screenDistance * 3);

    const animate = () => {
      timeRef.current += 0.05 * frequency;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Dark background
      ctx.fillStyle = "#0f172a";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw interference pattern
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;

      for (let x = 0; x < canvas.width; x++) {
        for (let y = 0; y < canvas.height; y++) {
          const d1 = Math.sqrt((x - source1X) ** 2 + (y - source1Y) ** 2);
          const d2 = Math.sqrt((x - source2X) ** 2 + (y - source2X) ** 2);
          
          // Calculate phase difference
          const phase1 = (d1 / wavelength) * 2 * Math.PI - timeRef.current;
          const phase2 = (d2 / wavelength) * 2 * Math.PI - timeRef.current;
          
          // Superposition of waves
          const amp1 = Math.sin(phase1) / (1 + d1 * 0.005);
          const amp2 = Math.sin(phase2) / (1 + d2 * 0.005);
          const totalAmp = (amp1 + amp2) / 2;
          
          // Convert amplitude to color intensity
          const intensity = (totalAmp + 1) / 2;
          
          const i = (y * canvas.width + x) * 4;
          
          // Create colorful interference pattern
          data[i] = Math.floor(intensity * 100 + 30); // R
          data[i + 1] = Math.floor(intensity * 180 + 40); // G
          data[i + 2] = Math.floor(intensity * 255); // B
          data[i + 3] = Math.floor(intensity * 200 + 55); // A
        }
      }

      ctx.putImageData(imageData, 0, 0);

      // Draw barrier with slits
      ctx.fillStyle = "#1e293b";
      ctx.fillRect(source1X - 20, 0, 40, source1Y - 15);
      ctx.fillRect(source1X - 20, source1Y + 15, 40, source2Y - source1Y - 30);
      ctx.fillRect(source1X - 20, source2Y + 15, 40, canvas.height - source2Y - 15);

      // Highlight slits
      ctx.strokeStyle = "#60a5fa";
      ctx.lineWidth = 3;
      ctx.shadowColor = "#60a5fa";
      ctx.shadowBlur = 10;
      
      // Slit 1
      ctx.beginPath();
      ctx.moveTo(source1X - 20, source1Y - 15);
      ctx.lineTo(source1X + 20, source1Y - 15);
      ctx.moveTo(source1X - 20, source1Y + 15);
      ctx.lineTo(source1X + 20, source1Y + 15);
      ctx.stroke();
      
      // Slit 2
      ctx.beginPath();
      ctx.moveTo(source1X - 20, source2Y - 15);
      ctx.lineTo(source1X + 20, source2Y - 15);
      ctx.moveTo(source1X - 20, source2Y + 15);
      ctx.lineTo(source1X + 20, source2Y + 15);
      ctx.stroke();
      
      ctx.shadowBlur = 0;

      // Source indicators
      ctx.fillStyle = "#f59e0b";
      ctx.beginPath();
      ctx.arc(source1X, source1Y, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(source2X, source2Y, 8, 0, Math.PI * 2);
      ctx.fill();

      // Draw screen on right side (based on screenDistance)
      ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
      ctx.fillRect(screenX, 0, canvas.width - screenX, canvas.height);

      // Intensity pattern on screen
      ctx.strokeStyle = "#22c55e";
      ctx.lineWidth = 2;
      ctx.beginPath();
      
      for (let y = 0; y < canvas.height; y += 2) {
        const d1 = Math.sqrt((screenX + 10 - source1X) ** 2 + (y - source1Y) ** 2);
        const d2 = Math.sqrt((screenX + 10 - source2X) ** 2 + (y - source2Y) ** 2);
        const pathDiff = Math.abs(d1 - d2);
        const intensity = Math.cos((pathDiff / wavelength) * Math.PI) ** 2;
        const barWidth = intensity * 40;
        
        if (y === 0) {
          ctx.moveTo(screenX + barWidth, y);
        } else {
          ctx.lineTo(screenX + barWidth, y);
        }
      }
      ctx.stroke();

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [parameters]);

  const getParam = (id: string) =>
    parameters.find((p) => p.id === id)?.value ?? 0;

  const wavelength = getParam("wavelength");
  const slitDistance = getParam("slitDistance");
  const frequency = getParam("frequency");
  const screenDistance = getParam("screenDistance") || 100;

  return (
    <div className="space-y-4">
      <canvas
        ref={canvasRef}
        width={800}
        height={450}
        className="w-full rounded-xl border border-border"
      />
      <div className="bg-card/80 backdrop-blur-sm border border-border rounded-lg p-4">
        <h4 className="text-sm font-semibold text-primary mb-2">Ikki tirqishli interferensiya</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
          <div>
            <span className="text-muted-foreground">To'lqin uzunligi (λ):</span>
            <p className="font-medium">{wavelength.toFixed(0)} nm</p>
          </div>
          <div>
            <span className="text-muted-foreground">Tirqishlar orasidagi masofa:</span>
            <p className="font-medium">{slitDistance.toFixed(1)} mm</p>
          </div>
          <div>
            <span className="text-muted-foreground">Ekran masofasi:</span>
            <p className="font-medium">{screenDistance.toFixed(0)} sm</p>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-border text-sm">
          <p className="text-amber-400">Yo'l farqi: Δ = d·sin(θ)</p>
          <p className="text-muted-foreground text-xs mt-1">Konstruktiv: Δ = nλ, Destruktiv: Δ = (n+½)λ</p>
        </div>
      </div>
    </div>
  );
};