import { useEffect, useRef } from "react";

export const AboutBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Floating hexagon class
    class Hexagon {
      x: number;
      y: number;
      size: number;
      rotation: number;
      rotationSpeed: number;
      opacity: number;
      color: string;
      vx: number;
      vy: number;
      pulsePhase: number;
      pulseSpeed: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 40 + 20;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.008;
        this.opacity = Math.random() * 0.15 + 0.05;
        this.color = Math.random() > 0.5 ? "187, 92%, 60%" : "262, 83%, 65%";
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.pulsePhase = Math.random() * Math.PI * 2;
        this.pulseSpeed = Math.random() * 0.02 + 0.01;
      }

      draw() {
        if (!ctx) return;
        
        const pulse = Math.sin(this.pulsePhase) * 0.3 + 1;
        const currentSize = this.size * pulse;
        
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const angle = (Math.PI / 3) * i;
          const x = Math.cos(angle) * currentSize;
          const y = Math.sin(angle) * currentSize;
          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.closePath();
        
        ctx.strokeStyle = `hsla(${this.color}, ${this.opacity})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        
        ctx.restore();
      }

      update() {
        this.rotation += this.rotationSpeed;
        this.pulsePhase += this.pulseSpeed;
        this.x += this.vx;
        this.y += this.vy;
        
        if (this.x < -50) this.x = canvas.width + 50;
        if (this.x > canvas.width + 50) this.x = -50;
        if (this.y < -50) this.y = canvas.height + 50;
        if (this.y > canvas.height + 50) this.y = -50;
      }
    }

    // Floating circle with gradient
    class GlowCircle {
      x: number;
      y: number;
      radius: number;
      opacity: number;
      color: string;
      vx: number;
      vy: number;
      pulsePhase: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 80 + 40;
        this.opacity = Math.random() * 0.08 + 0.02;
        this.color = Math.random() > 0.5 ? "187, 92%" : "262, 83%";
        this.vx = (Math.random() - 0.5) * 0.2;
        this.vy = (Math.random() - 0.5) * 0.2;
        this.pulsePhase = Math.random() * Math.PI * 2;
      }

      draw() {
        if (!ctx) return;
        
        const pulse = Math.sin(this.pulsePhase) * 0.2 + 1;
        const currentRadius = this.radius * pulse;
        
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, currentRadius
        );
        gradient.addColorStop(0, `hsla(${this.color}, 60%, ${this.opacity * 2})`);
        gradient.addColorStop(1, `hsla(${this.color}, 60%, 0)`);
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      update() {
        this.pulsePhase += 0.015;
        this.x += this.vx;
        this.y += this.vy;
        
        if (this.x < -100) this.x = canvas.width + 100;
        if (this.x > canvas.width + 100) this.x = -100;
        if (this.y < -100) this.y = canvas.height + 100;
        if (this.y > canvas.height + 100) this.y = -100;
      }
    }

    // Connecting lines between points
    class ConnectionNode {
      x: number;
      y: number;
      vx: number;
      vy: number;
      baseX: number;
      baseY: number;
      range: number;

      constructor() {
        this.baseX = Math.random() * canvas.width;
        this.baseY = Math.random() * canvas.height;
        this.x = this.baseX;
        this.y = this.baseY;
        this.range = Math.random() * 50 + 20;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        
        // Keep within range of base position
        const dx = this.x - this.baseX;
        const dy = this.y - this.baseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist > this.range) {
          this.vx *= -1;
          this.vy *= -1;
        }
      }
    }

    // Floating dots
    class Dot {
      x: number;
      y: number;
      size: number;
      opacity: number;
      speed: number;
      angle: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.4 + 0.2;
        this.speed = Math.random() * 0.3 + 0.1;
        this.angle = Math.random() * Math.PI * 2;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(187, 92%, 60%, ${this.opacity})`;
        ctx.fill();
      }

      update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
      }
    }

    // Create elements
    const hexagons: Hexagon[] = [];
    const glowCircles: GlowCircle[] = [];
    const nodes: ConnectionNode[] = [];
    const dots: Dot[] = [];

    for (let i = 0; i < 6; i++) {
      hexagons.push(new Hexagon());
    }

    for (let i = 0; i < 4; i++) {
      glowCircles.push(new GlowCircle());
    }

    for (let i = 0; i < 12; i++) {
      nodes.push(new ConnectionNode());
    }

    for (let i = 0; i < 25; i++) {
      dots.push(new Dot());
    }

    // Draw connections between nearby nodes
    const drawConnections = () => {
      const maxDist = 150;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < maxDist) {
            const opacity = (1 - dist / maxDist) * 0.15;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `hsla(262, 83%, 65%, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
    };

    // Animation loop
    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw glow circles first (background)
      glowCircles.forEach(circle => {
        circle.update();
        circle.draw();
      });

      // Draw connections
      nodes.forEach(node => node.update());
      drawConnections();

      // Draw hexagons
      hexagons.forEach(hex => {
        hex.update();
        hex.draw();
      });

      // Draw dots
      dots.forEach(dot => {
        dot.update();
        dot.draw();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.8 }}
    />
  );
};
