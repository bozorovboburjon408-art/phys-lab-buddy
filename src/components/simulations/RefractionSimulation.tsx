import { useEffect, useRef } from "react";
import { SimulationParameter } from "@/types/physics";

interface Props {
  parameters: SimulationParameter[];
}

export const RefractionSimulation = ({ parameters }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const timeRef = useRef(0);

  const getParamValue = (id: string) => {
    const param = parameters.find(p => p.id === id);
    return param?.value ?? 0;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const incidentAngle = getParamValue("incidentAngle") * Math.PI / 180;
    const n1 = getParamValue("n1");
    const n2 = getParamValue("n2");
    const rayIntensity = getParamValue("rayIntensity") || 0.8;

    const width = canvas.width;
    const height = canvas.height;
    const interfaceY = height / 2;
    const interfaceX = width / 2;

    // Snell's law: n1 * sin(θ1) = n2 * sin(θ2)
    const sinRefracted = (n1 / n2) * Math.sin(incidentAngle);
    const isTotalReflection = Math.abs(sinRefracted) > 1;
    const refractedAngle = isTotalReflection ? 0 : Math.asin(sinRefracted);
    const reflectedAngle = incidentAngle;

    // Critical angle
    const criticalAngle = n1 < n2 ? null : Math.asin(n2 / n1);

    const animate = () => {
      timeRef.current += 0.02;
      const t = timeRef.current;

      // Clear canvas
      ctx.fillStyle = "#0a0a0f";
      ctx.fillRect(0, 0, width, height);

      // Draw medium 1 (top)
      ctx.fillStyle = `rgba(59, 130, 246, ${0.1 + 0.05 * (n1 - 1)})`;
      ctx.fillRect(0, 0, width, interfaceY);

      // Draw medium 2 (bottom)
      ctx.fillStyle = `rgba(139, 92, 246, ${0.1 + 0.05 * (n2 - 1)})`;
      ctx.fillRect(0, interfaceY, width, height);

      // Draw interface line
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(0, interfaceY);
      ctx.lineTo(width, interfaceY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw normal line
      ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(interfaceX, 0);
      ctx.lineTo(interfaceX, height);
      ctx.stroke();
      ctx.setLineDash([]);

      // Calculate ray points
      const rayLength = 180;
      
      // Incident ray
      const incidentStartX = interfaceX - rayLength * Math.sin(incidentAngle);
      const incidentStartY = interfaceY - rayLength * Math.cos(incidentAngle);

      // Draw incident ray with animation
      ctx.strokeStyle = `rgba(251, 191, 36, ${rayIntensity})`;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(incidentStartX, incidentStartY);
      ctx.lineTo(interfaceX, interfaceY);
      ctx.stroke();

      // Draw light particles along incident ray
      ctx.fillStyle = `rgba(251, 191, 36, ${rayIntensity})`;
      for (let i = 0; i < 5; i++) {
        const progress = ((t * 2 + i * 0.2) % 1);
        const x = incidentStartX + (interfaceX - incidentStartX) * progress;
        const y = incidentStartY + (interfaceY - incidentStartY) * progress;
        const size = 4 - i * 0.5;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw reflected ray
      const reflectedEndX = interfaceX + rayLength * Math.sin(reflectedAngle);
      const reflectedEndY = interfaceY - rayLength * Math.cos(reflectedAngle);

      const reflectionIntensity = isTotalReflection ? 1 : 0.3;
      ctx.strokeStyle = `rgba(239, 68, 68, ${reflectionIntensity})`;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(interfaceX, interfaceY);
      ctx.lineTo(reflectedEndX, reflectedEndY);
      ctx.stroke();

      // Draw particles along reflected ray
      if (isTotalReflection || reflectionIntensity > 0) {
        ctx.fillStyle = `rgba(239, 68, 68, ${reflectionIntensity})`;
        for (let i = 0; i < 3; i++) {
          const progress = ((t * 2 + i * 0.25) % 1);
          const x = interfaceX + (reflectedEndX - interfaceX) * progress;
          const y = interfaceY + (reflectedEndY - interfaceY) * progress;
          const size = 3 - i * 0.5;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Draw refracted ray (if not total internal reflection)
      if (!isTotalReflection) {
        const refractedEndX = interfaceX + rayLength * Math.sin(refractedAngle);
        const refractedEndY = interfaceY + rayLength * Math.cos(refractedAngle);

        ctx.strokeStyle = `rgba(34, 197, 94, ${rayIntensity})`;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(interfaceX, interfaceY);
        ctx.lineTo(refractedEndX, refractedEndY);
        ctx.stroke();

        // Draw particles along refracted ray
        ctx.fillStyle = `rgba(34, 197, 94, ${rayIntensity})`;
        for (let i = 0; i < 5; i++) {
          const progress = ((t * (2 * n1 / n2) + i * 0.2) % 1);
          const x = interfaceX + (refractedEndX - interfaceX) * progress;
          const y = interfaceY + (refractedEndY - interfaceY) * progress;
          const size = 4 - i * 0.5;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Draw angle arcs
      ctx.lineWidth = 1;
      
      // Incident angle arc
      ctx.strokeStyle = "#fbbf24";
      ctx.beginPath();
      ctx.arc(interfaceX, interfaceY, 40, -Math.PI / 2, -Math.PI / 2 + incidentAngle, false);
      ctx.stroke();

      // Reflected angle arc
      ctx.strokeStyle = "#ef4444";
      ctx.beginPath();
      ctx.arc(interfaceX, interfaceY, 50, -Math.PI / 2 - reflectedAngle, -Math.PI / 2, false);
      ctx.stroke();

      // Refracted angle arc
      if (!isTotalReflection) {
        ctx.strokeStyle = "#22c55e";
        ctx.beginPath();
        ctx.arc(interfaceX, interfaceY, 40, Math.PI / 2 - refractedAngle, Math.PI / 2, false);
        ctx.stroke();
      }

      // Labels
      ctx.font = "14px monospace";
      ctx.textAlign = "center";
      
      // Medium labels
      ctx.fillStyle = "#3b82f6";
      ctx.fillText(`Muhit 1 (n₁ = ${n1.toFixed(2)})`, width / 2, 30);
      
      ctx.fillStyle = "#8b5cf6";
      ctx.fillText(`Muhit 2 (n₂ = ${n2.toFixed(2)})`, width / 2, height - 20);

      // Angle labels
      ctx.fillStyle = "#fbbf24";
      ctx.fillText(`θ₁ = ${(incidentAngle * 180 / Math.PI).toFixed(1)}°`, interfaceX + 70, interfaceY - 60);
      
      if (!isTotalReflection) {
        ctx.fillStyle = "#22c55e";
        ctx.fillText(`θ₂ = ${(refractedAngle * 180 / Math.PI).toFixed(1)}°`, interfaceX + 70, interfaceY + 70);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [parameters]);

  const incidentAngle = getParamValue("incidentAngle") * Math.PI / 180;
  const n1 = getParamValue("n1");
  const n2 = getParamValue("n2");
  const sinRefracted = (n1 / n2) * Math.sin(incidentAngle);
  const isTotalReflection = Math.abs(sinRefracted) > 1;
  const refractedAngle = isTotalReflection ? 0 : Math.asin(sinRefracted);
  const criticalAngle = n1 < n2 ? null : Math.asin(n2 / n1);

  return (
    <div className="w-full space-y-4">
      <canvas
        ref={canvasRef}
        width={600}
        height={400}
        className="w-full aspect-[3/2] rounded-xl border border-border"
      />
      <div className="bg-card/80 backdrop-blur-sm border border-border rounded-lg p-4">
        <h4 className="text-sm font-semibold text-primary mb-2">Snell qonuni: n₁sin(θ₁) = n₂sin(θ₂)</h4>
        <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
          <p>Tushish burchagi: {(incidentAngle * 180 / Math.PI).toFixed(1)}°</p>
          {isTotalReflection ? (
            <>
              <p className="text-destructive font-medium">To'liq ichki qaytish!</p>
              {criticalAngle !== null && (
                <p>Kritik burchak: {(criticalAngle * 180 / Math.PI).toFixed(1)}°</p>
              )}
            </>
          ) : (
            <>
              <p>Sinish burchagi: {(refractedAngle * 180 / Math.PI).toFixed(1)}°</p>
              <p>Nur tezligi: v = c/n</p>
            </>
          )}
          <p>v₁ = {(300000 / n1).toFixed(0)} km/s</p>
          <p>v₂ = {(300000 / n2).toFixed(0)} km/s</p>
        </div>
      </div>
    </div>
  );
};
