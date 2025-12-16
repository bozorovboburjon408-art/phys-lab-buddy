import { useRef, useEffect, useState } from "react";
import { SimulationParameter } from "@/types/physics";

interface Props {
  parameters: SimulationParameter[];
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

export const IdealGasSimulation = ({ parameters }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const getParam = (id: string) =>
      parameters.find((p) => p.id === id)?.value ?? 0;

    const temperature = getParam("temperature");
    const volume = getParam("volume");
    const particleCount = Math.floor(getParam("particles"));

    // Container dimensions based on volume
    const containerWidth = 250 + volume * 2;
    const containerHeight = 200 + volume;
    const containerX = (canvas.width - containerWidth) / 2;
    const containerY = (canvas.height - containerHeight) / 2;

    // Initialize particles
    if (particlesRef.current.length !== particleCount) {
      particlesRef.current = [];
      for (let i = 0; i < particleCount; i++) {
        const speedFactor = Math.sqrt(temperature / 300) * 3;
        particlesRef.current.push({
          x: containerX + 20 + Math.random() * (containerWidth - 40),
          y: containerY + 20 + Math.random() * (containerHeight - 40),
          vx: (Math.random() - 0.5) * speedFactor,
          vy: (Math.random() - 0.5) * speedFactor,
          radius: 6,
        });
      }
    }

    // Update particle speeds based on temperature
    const speedFactor = Math.sqrt(temperature / 300) * 3;
    particlesRef.current.forEach((p) => {
      const currentSpeed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
      if (currentSpeed > 0) {
        p.vx = (p.vx / currentSpeed) * speedFactor * (0.5 + Math.random());
        p.vy = (p.vy / currentSpeed) * speedFactor * (0.5 + Math.random());
      }
    });

    let wallCollisions = 0;
    let lastTime = Date.now();

    const animate = () => {
      if (!isPlaying) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background gradient
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width / 2
      );
      gradient.addColorStop(0, "#1e293b");
      gradient.addColorStop(1, "#0f172a");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Container with piston effect
      const currentContainerWidth = 250 + volume * 2;
      const currentContainerX = (canvas.width - currentContainerWidth) / 2;

      // Container glow
      ctx.shadowColor = "#3b82f6";
      ctx.shadowBlur = 20;
      ctx.strokeStyle = "#3b82f6";
      ctx.lineWidth = 4;
      ctx.strokeRect(currentContainerX, containerY, currentContainerWidth, containerHeight);
      ctx.shadowBlur = 0;

      // Piston on right side
      ctx.fillStyle = "rgba(100, 116, 139, 0.8)";
      ctx.fillRect(currentContainerX + currentContainerWidth - 15, containerY, 15, containerHeight);

      // Draw container walls
      ctx.fillStyle = "rgba(59, 130, 246, 0.1)";
      ctx.fillRect(currentContainerX, containerY, currentContainerWidth, containerHeight);

      // Reset collision counter periodically
      const now = Date.now();
      if (now - lastTime > 1000) {
        wallCollisions = 0;
        lastTime = now;
      }

      // Update and draw particles
      const particles = particlesRef.current;
      
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Wall collisions
        if (p.x - p.radius < currentContainerX) {
          p.x = currentContainerX + p.radius;
          p.vx = Math.abs(p.vx);
          wallCollisions++;
        }
        if (p.x + p.radius > currentContainerX + currentContainerWidth - 15) {
          p.x = currentContainerX + currentContainerWidth - 15 - p.radius;
          p.vx = -Math.abs(p.vx);
          wallCollisions++;
        }
        if (p.y - p.radius < containerY) {
          p.y = containerY + p.radius;
          p.vy = Math.abs(p.vy);
          wallCollisions++;
        }
        if (p.y + p.radius > containerY + containerHeight) {
          p.y = containerY + containerHeight - p.radius;
          p.vy = -Math.abs(p.vy);
          wallCollisions++;
        }

        // Particle-particle collisions
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p2.x - p.x;
          const dy = p2.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < p.radius + p2.radius) {
            // Elastic collision
            const nx = dx / dist;
            const ny = dy / dist;
            const dvx = p.vx - p2.vx;
            const dvy = p.vy - p2.vy;
            const dvn = dvx * nx + dvy * ny;

            p.vx -= dvn * nx;
            p.vy -= dvn * ny;
            p2.vx += dvn * nx;
            p2.vy += dvn * ny;

            // Separate particles
            const overlap = (p.radius + p2.radius - dist) / 2;
            p.x -= overlap * nx;
            p.y -= overlap * ny;
            p2.x += overlap * nx;
            p2.y += overlap * ny;
          }
        }

        // Draw particle with glow
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        const hue = Math.min(60, speed * 20); // Yellow to red based on speed
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        
        const particleGradient = ctx.createRadialGradient(
          p.x, p.y, 0, p.x, p.y, p.radius
        );
        particleGradient.addColorStop(0, `hsl(${hue}, 100%, 70%)`);
        particleGradient.addColorStop(1, `hsl(${hue}, 100%, 50%)`);
        ctx.fillStyle = particleGradient;
        ctx.fill();

        // Motion blur effect
        ctx.strokeStyle = `hsla(${hue}, 100%, 60%, 0.3)`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x - p.vx * 3, p.y - p.vy * 3);
        ctx.stroke();
      }

      // Calculate pressure (proportional to collision rate)
      const pressure = (particleCount * temperature) / (volume * 10);

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [parameters, isPlaying]);

  const getParam = (id: string) =>
    parameters.find((p) => p.id === id)?.value ?? 0;

  const temperature = getParam("temperature");
  const volume = getParam("volume");
  const particleCount = Math.floor(getParam("particles"));
  const pressure = (particleCount * temperature) / (volume * 10);

  return (
    <div className="space-y-4">
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
      <div className="bg-card/80 backdrop-blur-sm border border-border rounded-lg p-4">
        <h4 className="text-sm font-semibold text-primary mb-2">Ideal gaz holat tenglamasi: PV = nRT</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
          <div>
            <span className="text-muted-foreground">Harorat (T):</span>
            <p className="font-medium">{temperature.toFixed(0)} K</p>
          </div>
          <div>
            <span className="text-muted-foreground">Hajm (V):</span>
            <p className="font-medium">{volume.toFixed(0)} L</p>
          </div>
          <div>
            <span className="text-muted-foreground">Zarrachalar soni:</span>
            <p className="font-medium">{particleCount}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Bosim (P):</span>
            <p className="font-medium text-amber-400">{pressure.toFixed(2)} atm</p>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-2">Zarrachalar tezligi haroratga proporsional</p>
      </div>
    </div>
  );
};