import { useRef, useEffect } from "react";
import { SimulationParameter } from "@/types/physics";

interface Props {
  parameters: SimulationParameter[];
}

export const LensSimulation = ({ parameters }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const getParam = (id: string) =>
      parameters.find((p) => p.id === id)?.value ?? 0;

    const focalLength = getParam("focalLength");
    const objectDistance = getParam("objectDistance");
    const objectHeight = getParam("objectHeight");
    const lensType = getParam("lensType"); // 1 = yig'uvchi, -1 = sochuvchi

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, "#0f172a");
      gradient.addColorStop(1, "#1e293b");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const scale = 3;

      // Draw grid
      ctx.strokeStyle = "rgba(100, 116, 139, 0.2)";
      ctx.lineWidth = 1;
      for (let x = 0; x <= canvas.width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y <= canvas.height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw optical axis
      ctx.strokeStyle = "rgba(148, 163, 184, 0.6)";
      ctx.lineWidth = 2;
      ctx.setLineDash([10, 5]);
      ctx.beginPath();
      ctx.moveTo(0, centerY);
      ctx.lineTo(canvas.width, centerY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw lens
      const lensHeight = 180;
      ctx.strokeStyle = "#60a5fa";
      ctx.lineWidth = 4;
      ctx.beginPath();
      
      if (lensType >= 0) {
        // Yig'uvchi linza (convex)
        ctx.moveTo(centerX - 10, centerY - lensHeight / 2);
        ctx.quadraticCurveTo(centerX + 20, centerY, centerX - 10, centerY + lensHeight / 2);
        ctx.moveTo(centerX + 10, centerY - lensHeight / 2);
        ctx.quadraticCurveTo(centerX - 20, centerY, centerX + 10, centerY + lensHeight / 2);
      } else {
        // Sochuvchi linza (concave)
        ctx.moveTo(centerX - 10, centerY - lensHeight / 2);
        ctx.quadraticCurveTo(centerX - 30, centerY, centerX - 10, centerY + lensHeight / 2);
        ctx.moveTo(centerX + 10, centerY - lensHeight / 2);
        ctx.quadraticCurveTo(centerX + 30, centerY, centerX + 10, centerY + lensHeight / 2);
      }
      ctx.stroke();

      // Lens glow effect
      ctx.shadowColor = "#60a5fa";
      ctx.shadowBlur = 15;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Draw focal points
      const f = focalLength * scale;
      ctx.fillStyle = "#f59e0b";
      ctx.beginPath();
      ctx.arc(centerX - f, centerY, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(centerX + f, centerY, 6, 0, Math.PI * 2);
      ctx.fill();

      // Labels for focal points
      ctx.fillStyle = "#fbbf24";
      ctx.font = "14px Inter, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("F", centerX - f, centerY + 25);
      ctx.fillText("F'", centerX + f, centerY + 25);

      // Object (arrow)
      const objX = centerX - objectDistance * scale;
      const objH = objectHeight * scale;
      
      ctx.strokeStyle = "#22c55e";
      ctx.fillStyle = "#22c55e";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(objX, centerY);
      ctx.lineTo(objX, centerY - objH);
      ctx.stroke();
      
      // Arrow head
      ctx.beginPath();
      ctx.moveTo(objX, centerY - objH);
      ctx.lineTo(objX - 8, centerY - objH + 15);
      ctx.lineTo(objX + 8, centerY - objH + 15);
      ctx.closePath();
      ctx.fill();

      // Calculate image position using lens formula: 1/f = 1/do + 1/di
      const effectiveF = lensType >= 0 ? focalLength : -focalLength;
      const imageDistance = (objectDistance * effectiveF) / (objectDistance - effectiveF);
      const magnification = -imageDistance / objectDistance;
      const imageHeight = objectHeight * magnification;

      // Draw image if it exists
      if (imageDistance !== Infinity && !isNaN(imageDistance)) {
        const imgX = centerX + imageDistance * scale;
        const imgH = imageHeight * scale;

        // Image is real (solid) or virtual (dashed)
        if (imageDistance > 0) {
          ctx.strokeStyle = "#ef4444";
          ctx.fillStyle = "#ef4444";
          ctx.setLineDash([]);
        } else {
          ctx.strokeStyle = "#ef4444";
          ctx.fillStyle = "#ef4444";
          ctx.setLineDash([8, 4]);
        }

        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(imgX, centerY);
        ctx.lineTo(imgX, centerY - imgH);
        ctx.stroke();
        ctx.setLineDash([]);

        // Arrow head for image
        ctx.beginPath();
        const direction = imgH > 0 ? 1 : -1;
        ctx.moveTo(imgX, centerY - imgH);
        ctx.lineTo(imgX - 8, centerY - imgH + 15 * direction);
        ctx.lineTo(imgX + 8, centerY - imgH + 15 * direction);
        ctx.closePath();
        ctx.fill();

        // Draw principal rays
        ctx.lineWidth = 1.5;
        ctx.globalAlpha = 0.7;

        // Ray 1: Parallel to axis, through focal point
        ctx.strokeStyle = "#fbbf24";
        ctx.beginPath();
        ctx.moveTo(objX, centerY - objH);
        ctx.lineTo(centerX, centerY - objH);
        if (lensType >= 0) {
          ctx.lineTo(imgX, centerY - imgH);
        } else {
          ctx.lineTo(canvas.width, centerY - imgH + (canvas.width - centerX) * (objH - imgH) / (centerX - imgX));
        }
        ctx.stroke();

        // Ray 2: Through center of lens
        ctx.strokeStyle = "#a78bfa";
        ctx.beginPath();
        ctx.moveTo(objX, centerY - objH);
        ctx.lineTo(imgX, centerY - imgH);
        ctx.stroke();

        // Ray 3: Through focal point, then parallel
        if (objectDistance > focalLength) {
          ctx.strokeStyle = "#34d399";
          ctx.beginPath();
          ctx.moveTo(objX, centerY - objH);
          ctx.lineTo(centerX, centerY - objH * (objectDistance - focalLength) / objectDistance);
          ctx.lineTo(imgX, centerY - imgH);
          ctx.stroke();
        }

        ctx.globalAlpha = 1;
      }

      // Info panel
      ctx.fillStyle = "rgba(30, 41, 59, 0.9)";
      ctx.fillRect(15, 15, 280, 140);
      ctx.strokeStyle = "rgba(100, 116, 139, 0.5)";
      ctx.lineWidth = 1;
      ctx.strokeRect(15, 15, 280, 140);

      ctx.fillStyle = "#e2e8f0";
      ctx.font = "bold 14px Inter, sans-serif";
      ctx.textAlign = "left";
      ctx.fillText("Linza formulasi: 1/f = 1/d₀ + 1/dᵢ", 25, 40);

      ctx.font = "13px Inter, sans-serif";
      ctx.fillStyle = "#94a3b8";
      ctx.fillText(`Fokus masofasi (f): ${focalLength.toFixed(1)} sm`, 25, 65);
      ctx.fillText(`Buyum masofasi (d₀): ${objectDistance.toFixed(1)} sm`, 25, 85);
      
      if (imageDistance && !isNaN(imageDistance) && isFinite(imageDistance)) {
        ctx.fillText(`Tasvir masofasi (dᵢ): ${imageDistance.toFixed(1)} sm`, 25, 105);
        ctx.fillText(`Kattalashtirish: ${Math.abs(magnification).toFixed(2)}x`, 25, 125);
        ctx.fillStyle = imageDistance > 0 ? "#22c55e" : "#ef4444";
        ctx.fillText(imageDistance > 0 ? "Haqiqiy tasvir" : "Mavhum tasvir", 25, 145);
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

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={450}
      className="w-full rounded-xl border border-border"
    />
  );
};