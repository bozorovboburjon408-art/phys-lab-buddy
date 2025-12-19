import { useEffect, useRef } from "react";

interface SimulationPreviewProps {
  simulationId: string;
}

export const SimulationPreview = ({ simulationId }: SimulationPreviewProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    const drawPendulum = () => {
      const angle = Math.sin(timeRef.current * 2) * 0.5;
      const length = 50;
      const x = width / 2 + Math.sin(angle) * length;
      const y = 15 + Math.cos(angle) * length;
      
      ctx.strokeStyle = "hsla(187, 92%, 50%, 0.5)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(width / 2, 15);
      ctx.lineTo(x, y);
      ctx.stroke();
      
      ctx.fillStyle = "hsl(187, 92%, 50%)";
      ctx.beginPath();
      ctx.arc(x, y, 8, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawProjectile = () => {
      const t = (timeRef.current * 2) % 3;
      const x = 10 + t * 30;
      const y = 70 - (t * 40 - t * t * 15);
      
      // Trail
      ctx.strokeStyle = "hsla(187, 92%, 50%, 0.3)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let i = 0; i < t; i += 0.1) {
        const tx = 10 + i * 30;
        const ty = 70 - (i * 40 - i * i * 15);
        if (i === 0) ctx.moveTo(tx, ty);
        else ctx.lineTo(tx, ty);
      }
      ctx.stroke();
      
      ctx.fillStyle = "hsl(187, 92%, 50%)";
      ctx.beginPath();
      ctx.arc(x, Math.min(y, 70), 6, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawSpring = () => {
      const stretch = Math.sin(timeRef.current * 4) * 15;
      const baseY = 10;
      const ballY = 50 + stretch;
      
      // Spring coils
      ctx.strokeStyle = "hsla(262, 83%, 58%, 0.6)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(width / 2, baseY);
      for (let i = 0; i < 6; i++) {
        const y = baseY + (ballY - baseY) * (i / 6);
        const x = width / 2 + (i % 2 === 0 ? 10 : -10);
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width / 2, ballY);
      ctx.stroke();
      
      ctx.fillStyle = "hsl(187, 92%, 50%)";
      ctx.beginPath();
      ctx.arc(width / 2, ballY + 8, 8, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawWave = () => {
      ctx.strokeStyle = "hsl(187, 92%, 50%)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let x = 0; x < width; x += 2) {
        const y = height / 2 + Math.sin((x / 15) + timeRef.current * 3) * 20;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    };

    const drawFreeFall = () => {
      const t = (timeRef.current * 1.5) % 2;
      const y = 10 + t * t * 20;
      
      ctx.fillStyle = "hsl(187, 92%, 50%)";
      ctx.beginPath();
      ctx.arc(width / 2, Math.min(y, 70), 8, 0, Math.PI * 2);
      ctx.fill();
      
      // Ground
      ctx.fillStyle = "hsla(222, 47%, 30%, 0.5)";
      ctx.fillRect(0, 75, width, 5);
    };

    const drawCollision = () => {
      const t = timeRef.current * 2;
      const collide = Math.abs(Math.sin(t)) < 0.1;
      const x1 = collide ? width / 2 - 12 : width / 2 - 12 - Math.cos(t) * 20;
      const x2 = collide ? width / 2 + 12 : width / 2 + 12 + Math.cos(t) * 20;
      
      ctx.fillStyle = "hsl(187, 92%, 50%)";
      ctx.beginPath();
      ctx.arc(x1, height / 2, 10, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = "hsl(262, 83%, 58%)";
      ctx.beginPath();
      ctx.arc(x2, height / 2, 10, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawInclinedPlane = () => {
      // Ramp
      ctx.fillStyle = "hsla(222, 47%, 30%, 0.5)";
      ctx.beginPath();
      ctx.moveTo(10, 70);
      ctx.lineTo(90, 70);
      ctx.lineTo(90, 30);
      ctx.closePath();
      ctx.fill();
      
      // Ball position
      const t = (timeRef.current * 1.5) % 2;
      const progress = t / 2;
      const x = 90 - progress * 70;
      const y = 30 + progress * 35;
      
      ctx.fillStyle = "hsl(187, 92%, 50%)";
      ctx.beginPath();
      ctx.arc(x, y - 5, 7, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawCircularMotion = () => {
      const angle = timeRef.current * 3;
      const cx = width / 2;
      const cy = height / 2;
      const r = 30;
      
      // Orbit
      ctx.strokeStyle = "hsla(262, 83%, 58%, 0.3)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();
      
      // Ball
      const x = cx + Math.cos(angle) * r;
      const y = cy + Math.sin(angle) * r;
      
      ctx.fillStyle = "hsl(187, 92%, 50%)";
      ctx.beginPath();
      ctx.arc(x, y, 7, 0, Math.PI * 2);
      ctx.fill();
      
      // Center
      ctx.fillStyle = "hsl(262, 83%, 58%)";
      ctx.beginPath();
      ctx.arc(cx, cy, 4, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawRefraction = () => {
      // Water line
      ctx.fillStyle = "hsla(187, 92%, 50%, 0.2)";
      ctx.fillRect(0, height / 2, width, height / 2);
      
      // Light ray
      ctx.strokeStyle = "hsl(45, 100%, 60%)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(20, 10);
      ctx.lineTo(width / 2, height / 2);
      ctx.lineTo(70, 75);
      ctx.stroke();
    };

    const drawElectricField = () => {
      // Positive charge
      ctx.fillStyle = "hsl(0, 80%, 60%)";
      ctx.beginPath();
      ctx.arc(25, height / 2, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "white";
      ctx.font = "bold 12px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("+", 25, height / 2 + 4);
      
      // Negative charge
      ctx.fillStyle = "hsl(210, 80%, 60%)";
      ctx.beginPath();
      ctx.arc(75, height / 2, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "white";
      ctx.fillText("−", 75, height / 2 + 4);
      
      // Field lines
      ctx.strokeStyle = "hsla(187, 92%, 50%, 0.4)";
      ctx.lineWidth = 1;
      for (let i = -1; i <= 1; i++) {
        ctx.beginPath();
        ctx.moveTo(33, height / 2 + i * 12);
        ctx.quadraticCurveTo(50, height / 2 + i * 20, 67, height / 2 + i * 12);
        ctx.stroke();
      }
    };

    const drawLens = () => {
      // Lens
      ctx.strokeStyle = "hsla(187, 92%, 50%, 0.6)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse(width / 2, height / 2, 5, 30, 0, 0, Math.PI * 2);
      ctx.stroke();
      
      // Light rays
      ctx.strokeStyle = "hsl(45, 100%, 60%)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(10, 25);
      ctx.lineTo(width / 2, 25);
      ctx.lineTo(80, height / 2);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(10, height / 2);
      ctx.lineTo(width / 2, height / 2);
      ctx.lineTo(80, height / 2);
      ctx.stroke();
    };

    const drawIdealGas = () => {
      // Container
      ctx.strokeStyle = "hsla(187, 92%, 50%, 0.5)";
      ctx.lineWidth = 2;
      ctx.strokeRect(15, 15, 70, 50);
      
      // Particles
      for (let i = 0; i < 8; i++) {
        const x = 25 + ((i * 37 + timeRef.current * 50) % 50);
        const y = 25 + ((i * 23 + timeRef.current * 30) % 30);
        ctx.fillStyle = `hsla(${187 + i * 10}, 92%, 50%, 0.8)`;
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const drawInterference = () => {
      for (let x = 0; x < width; x += 3) {
        for (let y = 0; y < height; y += 3) {
          const d1 = Math.sqrt((x - 25) ** 2 + (y - height / 2) ** 2);
          const d2 = Math.sqrt((x - 75) ** 2 + (y - height / 2) ** 2);
          const wave = Math.sin(d1 / 8 - timeRef.current * 3) + Math.sin(d2 / 8 - timeRef.current * 3);
          const intensity = (wave + 2) / 4;
          ctx.fillStyle = `hsla(187, 92%, 50%, ${intensity * 0.5})`;
          ctx.fillRect(x, y, 3, 3);
        }
      }
    };

    const drawCapacitor = () => {
      // Plates
      ctx.fillStyle = "hsl(187, 92%, 50%)";
      ctx.fillRect(30, 15, 5, 50);
      ctx.fillRect(65, 15, 5, 50);
      
      // Field lines
      ctx.strokeStyle = "hsla(262, 83%, 58%, 0.4)";
      ctx.lineWidth = 1;
      for (let i = 0; i < 4; i++) {
        const y = 22 + i * 12;
        ctx.beginPath();
        ctx.moveTo(35, y);
        ctx.lineTo(65, y);
        ctx.stroke();
      }
      
      // Charges
      ctx.fillStyle = "hsl(0, 80%, 60%)";
      ctx.font = "10px sans-serif";
      ctx.fillText("+", 32, 45);
      ctx.fillStyle = "hsl(210, 80%, 60%)";
      ctx.fillText("−", 67, 45);
    };

    const drawDoppler = () => {
      const cx = 30 + (timeRef.current * 20) % 40;
      
      // Source
      ctx.fillStyle = "hsl(187, 92%, 50%)";
      ctx.beginPath();
      ctx.arc(cx, height / 2, 6, 0, Math.PI * 2);
      ctx.fill();
      
      // Waves
      for (let i = 1; i <= 3; i++) {
        const r = i * 15 + (timeRef.current * 10) % 15;
        ctx.strokeStyle = `hsla(262, 83%, 58%, ${0.5 - i * 0.15})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(cx - i * 5, height / 2, r, 0, Math.PI * 2);
        ctx.stroke();
      }
    };

    const drawMagneticInduction = () => {
      // Coil
      ctx.strokeStyle = "hsl(187, 92%, 50%)";
      ctx.lineWidth = 2;
      for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        ctx.ellipse(width / 2, 20 + i * 15, 25, 8, 0, 0, Math.PI);
        ctx.stroke();
      }
      
      // Magnet moving
      const my = 30 + Math.sin(timeRef.current * 2) * 20;
      ctx.fillStyle = "hsl(0, 80%, 60%)";
      ctx.fillRect(width / 2 - 8, my, 8, 15);
      ctx.fillStyle = "hsl(210, 80%, 60%)";
      ctx.fillRect(width / 2, my, 8, 15);
    };

    const drawAtwoodMachine = () => {
      // Pulley
      ctx.strokeStyle = "hsla(187, 92%, 50%, 0.6)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(width / 2, 12, 10, 0, Math.PI * 2);
      ctx.stroke();
      
      // Rope and masses
      const offset = Math.sin(timeRef.current * 2) * 15;
      
      ctx.strokeStyle = "hsla(262, 83%, 58%, 0.5)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(width / 2 - 10, 12);
      ctx.lineTo(width / 2 - 10, 40 - offset);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(width / 2 + 10, 12);
      ctx.lineTo(width / 2 + 10, 40 + offset);
      ctx.stroke();
      
      // Masses
      ctx.fillStyle = "hsl(187, 92%, 50%)";
      ctx.fillRect(width / 2 - 18, 40 - offset, 16, 20);
      ctx.fillStyle = "hsl(262, 83%, 58%)";
      ctx.fillRect(width / 2 + 2, 40 + offset, 16, 14);
    };

    const drawOhmsLaw = () => {
      // Battery
      ctx.fillStyle = "hsl(0, 80%, 60%)";
      ctx.fillRect(15, 35, 5, 20);
      ctx.fillStyle = "hsl(210, 80%, 60%)";
      ctx.fillRect(22, 30, 3, 30);
      
      // Wire
      ctx.strokeStyle = "hsl(187, 92%, 50%)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(27, 45);
      ctx.lineTo(40, 45);
      ctx.lineTo(40, 25);
      ctx.lineTo(60, 25);
      ctx.lineTo(60, 45);
      ctx.lineTo(75, 45);
      ctx.stroke();
      
      // Resistor
      ctx.strokeStyle = "hsl(262, 83%, 58%)";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(40, 25);
      for (let i = 0; i < 4; i++) {
        ctx.lineTo(45 + i * 5, i % 2 === 0 ? 20 : 30);
      }
      ctx.lineTo(60, 25);
      ctx.stroke();
      
      // Electrons
      const t = timeRef.current * 3;
      for (let i = 0; i < 3; i++) {
        const pos = ((t + i * 30) % 80);
        ctx.fillStyle = "hsl(45, 100%, 60%)";
        ctx.beginPath();
        ctx.arc(20 + pos, 45, 2, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const drawThermalExpansion = () => {
      const temp = Math.sin(timeRef.current) * 0.5 + 0.5;
      const barWidth = 50 + temp * 20;
      
      // Bar
      const gradient = ctx.createLinearGradient(20, 0, 20 + barWidth, 0);
      gradient.addColorStop(0, `hsl(${240 - temp * 200}, 80%, 50%)`);
      gradient.addColorStop(1, `hsl(${240 - temp * 200}, 80%, 60%)`);
      ctx.fillStyle = gradient;
      ctx.fillRect(20, 35, barWidth, 15);
      
      // Thermometer
      ctx.strokeStyle = "hsla(187, 92%, 50%, 0.5)";
      ctx.lineWidth = 1;
      ctx.strokeRect(10, 20, 6, 45);
      ctx.fillStyle = `hsl(${240 - temp * 200}, 80%, 50%)`;
      ctx.fillRect(11, 65 - temp * 40, 4, temp * 40);
    };

    const drawHarmonicOscillator = () => {
      const x = width / 2 + Math.sin(timeRef.current * 3) * 25;
      const prevX = width / 2 + Math.sin((timeRef.current - 0.5) * 3) * 25;
      
      // Spring
      ctx.strokeStyle = "hsla(262, 83%, 58%, 0.6)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(10, height / 2);
      for (let i = 0; i < 8; i++) {
        const sx = 10 + (x - 20) * (i / 8);
        const sy = height / 2 + (i % 2 === 0 ? 8 : -8);
        ctx.lineTo(sx, sy);
      }
      ctx.lineTo(x - 10, height / 2);
      ctx.stroke();
      
      // Mass
      ctx.fillStyle = "hsl(187, 92%, 50%)";
      ctx.fillRect(x - 10, height / 2 - 10, 20, 20);
      
      // Velocity indicator
      ctx.strokeStyle = "hsl(45, 100%, 60%)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x, height / 2);
      ctx.lineTo(x + (x - prevX) * 3, height / 2);
      ctx.stroke();
    };

    const drawNewtonRings = () => {
      const cx = width / 2;
      const cy = height / 2;
      
      for (let r = 5; r < 35; r += 5) {
        const phase = Math.sin(r / 5 + timeRef.current * 2);
        ctx.strokeStyle = `hsla(187, 92%, 50%, ${0.3 + phase * 0.3})`;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();
      }
      
      // Center bright spot
      ctx.fillStyle = "hsl(187, 92%, 70%)";
      ctx.beginPath();
      ctx.arc(cx, cy, 4, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawElectromagneticInduction = () => {
      // Coil
      ctx.strokeStyle = "hsl(262, 83%, 58%)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse(width / 2, height / 2, 30, 15, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.ellipse(width / 2, height / 2 - 5, 30, 15, 0, 0, Math.PI * 2);
      ctx.stroke();
      
      // Moving magnet
      const mx = width / 2 + Math.sin(timeRef.current * 2) * 20;
      ctx.fillStyle = "hsl(0, 80%, 60%)";
      ctx.fillRect(mx - 12, height / 2 - 8, 12, 16);
      ctx.fillStyle = "hsl(210, 80%, 60%)";
      ctx.fillRect(mx, height / 2 - 8, 12, 16);
      
      // Current indicator
      const current = Math.cos(timeRef.current * 2);
      ctx.fillStyle = `hsla(45, 100%, 60%, ${Math.abs(current) * 0.8})`;
      ctx.beginPath();
      ctx.arc(85, height / 2, 5, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawArchimedes = () => {
      // Water
      ctx.fillStyle = "hsla(210, 80%, 50%, 0.3)";
      ctx.fillRect(15, 35, 70, 40);
      
      // Floating object
      const buoyancy = Math.sin(timeRef.current * 1.5) * 5;
      const objY = 40 + buoyancy;
      
      ctx.fillStyle = "hsl(30, 80%, 50%)";
      ctx.fillRect(35, objY, 30, 20);
      
      // Force arrows
      ctx.strokeStyle = "hsl(0, 80%, 60%)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(50, objY + 25);
      ctx.lineTo(50, objY + 35);
      ctx.lineTo(47, objY + 32);
      ctx.moveTo(50, objY + 35);
      ctx.lineTo(53, objY + 32);
      ctx.stroke();
      
      ctx.strokeStyle = "hsl(187, 92%, 50%)";
      ctx.beginPath();
      ctx.moveTo(50, objY - 5);
      ctx.lineTo(50, objY - 15);
      ctx.lineTo(47, objY - 12);
      ctx.moveTo(50, objY - 15);
      ctx.lineTo(53, objY - 12);
      ctx.stroke();
    };

    const drawIllumination = () => {
      // Light source
      const pulse = 0.7 + Math.sin(timeRef.current * 3) * 0.3;
      ctx.fillStyle = `hsla(45, 100%, 60%, ${pulse})`;
      ctx.beginPath();
      ctx.arc(20, height / 2, 10, 0, Math.PI * 2);
      ctx.fill();
      
      // Light rays
      ctx.strokeStyle = `hsla(45, 100%, 60%, ${pulse * 0.5})`;
      ctx.lineWidth = 1;
      for (let i = -2; i <= 2; i++) {
        ctx.beginPath();
        ctx.moveTo(30, height / 2);
        ctx.lineTo(85, height / 2 + i * 15);
        ctx.stroke();
      }
      
      // Surface
      ctx.fillStyle = "hsla(187, 92%, 50%, 0.4)";
      ctx.fillRect(80, 15, 10, 55);
    };

    const animations: Record<string, () => void> = {
      pendulum: drawPendulum,
      projectile: drawProjectile,
      spring: drawSpring,
      wave: drawWave,
      freeFall: drawFreeFall,
      collision: drawCollision,
      inclinedPlane: drawInclinedPlane,
      circularMotion: drawCircularMotion,
      refraction: drawRefraction,
      electricField: drawElectricField,
      lens: drawLens,
      idealGas: drawIdealGas,
      interference: drawInterference,
      capacitor: drawCapacitor,
      doppler: drawDoppler,
      magneticInduction: drawMagneticInduction,
      atwoodMachine: drawAtwoodMachine,
      ohmsLaw: drawOhmsLaw,
      thermalExpansion: drawThermalExpansion,
      harmonicOscillator: drawHarmonicOscillator,
      newtonRings: drawNewtonRings,
      electromagneticInduction: drawElectromagneticInduction,
      archimedes: drawArchimedes,
      illumination: drawIllumination,
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      const drawFn = animations[simulationId];
      if (drawFn) {
        drawFn();
      }
      
      timeRef.current += 0.016;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [simulationId]);

  return (
    <canvas
      ref={canvasRef}
      width={100}
      height={80}
      className="rounded-lg bg-card/50 border border-border/30"
    />
  );
};
