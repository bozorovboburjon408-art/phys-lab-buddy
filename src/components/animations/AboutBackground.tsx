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

    // Color palette
    const colors = [
      { h: 187, s: 92, l: 60 },  // Cyan
      { h: 262, s: 83, l: 65 },  // Purple
      { h: 320, s: 80, l: 55 },  // Pink
      { h: 45, s: 90, l: 55 },   // Gold
      { h: 150, s: 70, l: 50 },  // Emerald
    ];

    const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

    // Floating hexagon class
    class Hexagon {
      x: number;
      y: number;
      size: number;
      rotation: number;
      rotationSpeed: number;
      opacity: number;
      color: { h: number; s: number; l: number };
      vx: number;
      vy: number;
      pulsePhase: number;
      pulseSpeed: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 50 + 25;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.01;
        this.opacity = Math.random() * 0.2 + 0.08;
        this.color = getRandomColor();
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.pulsePhase = Math.random() * Math.PI * 2;
        this.pulseSpeed = Math.random() * 0.025 + 0.015;
      }

      draw() {
        if (!ctx) return;
        
        const pulse = Math.sin(this.pulsePhase) * 0.25 + 1;
        const currentSize = this.size * pulse;
        
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        
        // Outer glow
        ctx.shadowColor = `hsla(${this.color.h}, ${this.color.s}%, ${this.color.l}%, 0.5)`;
        ctx.shadowBlur = 20;
        
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
        
        ctx.strokeStyle = `hsla(${this.color.h}, ${this.color.s}%, ${this.color.l}%, ${this.opacity})`;
        ctx.lineWidth = 2;
        ctx.stroke();
        
        ctx.shadowBlur = 0;
        ctx.restore();
      }

      update() {
        this.rotation += this.rotationSpeed;
        this.pulsePhase += this.pulseSpeed;
        this.x += this.vx;
        this.y += this.vy;
        
        if (this.x < -60) this.x = canvas.width + 60;
        if (this.x > canvas.width + 60) this.x = -60;
        if (this.y < -60) this.y = canvas.height + 60;
        if (this.y > canvas.height + 60) this.y = -60;
      }
    }

    // Aurora wave effect
    class AuroraWave {
      y: number;
      amplitude: number;
      wavelength: number;
      phase: number;
      speed: number;
      color: { h: number; s: number; l: number };
      thickness: number;

      constructor() {
        this.y = Math.random() * canvas.height;
        this.amplitude = Math.random() * 50 + 30;
        this.wavelength = Math.random() * 200 + 100;
        this.phase = Math.random() * Math.PI * 2;
        this.speed = Math.random() * 0.015 + 0.008;
        this.color = getRandomColor();
        this.thickness = Math.random() * 60 + 40;
      }

      draw() {
        if (!ctx) return;
        
        const gradient = ctx.createLinearGradient(0, this.y - this.thickness, 0, this.y + this.thickness);
        gradient.addColorStop(0, `hsla(${this.color.h}, ${this.color.s}%, ${this.color.l}%, 0)`);
        gradient.addColorStop(0.5, `hsla(${this.color.h}, ${this.color.s}%, ${this.color.l}%, 0.08)`);
        gradient.addColorStop(1, `hsla(${this.color.h}, ${this.color.s}%, ${this.color.l}%, 0)`);
        
        ctx.beginPath();
        ctx.moveTo(0, this.y + Math.sin(this.phase) * this.amplitude);
        
        for (let x = 0; x < canvas.width; x += 4) {
          const y = this.y + Math.sin((x / this.wavelength) + this.phase) * this.amplitude;
          ctx.lineTo(x, y);
        }
        
        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();
        
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      update() {
        this.phase += this.speed;
        this.y += Math.sin(this.phase * 0.5) * 0.3;
      }
    }

    // Floating orb with gradient
    class GlowOrb {
      x: number;
      y: number;
      radius: number;
      opacity: number;
      color: { h: number; s: number; l: number };
      vx: number;
      vy: number;
      pulsePhase: number;
      pulseSpeed: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 100 + 60;
        this.opacity = Math.random() * 0.12 + 0.04;
        this.color = getRandomColor();
        this.vx = (Math.random() - 0.5) * 0.25;
        this.vy = (Math.random() - 0.5) * 0.25;
        this.pulsePhase = Math.random() * Math.PI * 2;
        this.pulseSpeed = Math.random() * 0.02 + 0.01;
      }

      draw() {
        if (!ctx) return;
        
        const pulse = Math.sin(this.pulsePhase) * 0.3 + 1;
        const currentRadius = this.radius * pulse;
        
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, currentRadius
        );
        gradient.addColorStop(0, `hsla(${this.color.h}, ${this.color.s}%, ${this.color.l}%, ${this.opacity * 1.5})`);
        gradient.addColorStop(0.5, `hsla(${this.color.h}, ${this.color.s}%, ${this.color.l}%, ${this.opacity * 0.5})`);
        gradient.addColorStop(1, `hsla(${this.color.h}, ${this.color.s}%, ${this.color.l}%, 0)`);
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      update() {
        this.pulsePhase += this.pulseSpeed;
        this.x += this.vx;
        this.y += this.vy;
        
        if (this.x < -120) this.x = canvas.width + 120;
        if (this.x > canvas.width + 120) this.x = -120;
        if (this.y < -120) this.y = canvas.height + 120;
        if (this.y > canvas.height + 120) this.y = -120;
      }
    }

    // Sparkle particle
    class Sparkle {
      x: number;
      y: number;
      size: number;
      opacity: number;
      maxOpacity: number;
      fadeSpeed: number;
      color: { h: number; s: number; l: number };
      twinklePhase: number;

      constructor() {
        this.reset();
        this.opacity = Math.random() * this.maxOpacity;
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.maxOpacity = Math.random() * 0.8 + 0.4;
        this.opacity = 0;
        this.fadeSpeed = Math.random() * 0.03 + 0.01;
        this.color = getRandomColor();
        this.twinklePhase = Math.random() * Math.PI * 2;
      }

      draw() {
        if (!ctx || this.opacity <= 0) return;
        
        const twinkle = Math.sin(this.twinklePhase) * 0.5 + 0.5;
        const currentOpacity = this.opacity * twinkle;
        
        // Star shape
        ctx.save();
        ctx.translate(this.x, this.y);
        
        ctx.shadowColor = `hsla(${this.color.h}, ${this.color.s}%, ${this.color.l}%, ${currentOpacity})`;
        ctx.shadowBlur = 10;
        
        ctx.beginPath();
        for (let i = 0; i < 4; i++) {
          const angle = (Math.PI / 2) * i;
          ctx.moveTo(0, 0);
          ctx.lineTo(Math.cos(angle) * this.size * 2, Math.sin(angle) * this.size * 2);
        }
        ctx.strokeStyle = `hsla(${this.color.h}, ${this.color.s}%, 90%, ${currentOpacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();
        
        ctx.beginPath();
        ctx.arc(0, 0, this.size * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${this.color.h}, ${this.color.s}%, 90%, ${currentOpacity})`;
        ctx.fill();
        
        ctx.shadowBlur = 0;
        ctx.restore();
      }

      update() {
        this.twinklePhase += 0.1;
        this.opacity += this.fadeSpeed;
        
        if (this.opacity >= this.maxOpacity) {
          this.fadeSpeed = -Math.abs(this.fadeSpeed);
        }
        
        if (this.opacity <= 0) {
          this.reset();
        }
      }
    }

    // Connection node
    class ConnectionNode {
      x: number;
      y: number;
      vx: number;
      vy: number;
      baseX: number;
      baseY: number;
      range: number;
      color: { h: number; s: number; l: number };

      constructor() {
        this.baseX = Math.random() * canvas.width;
        this.baseY = Math.random() * canvas.height;
        this.x = this.baseX;
        this.y = this.baseY;
        this.range = Math.random() * 60 + 30;
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = (Math.random() - 0.5) * 0.6;
        this.color = getRandomColor();
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${this.color.h}, ${this.color.s}%, ${this.color.l}%, 0.5)`;
        ctx.fill();
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        
        const dx = this.x - this.baseX;
        const dy = this.y - this.baseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist > this.range) {
          this.vx *= -1;
          this.vy *= -1;
        }
      }
    }

    // Create elements
    const hexagons: Hexagon[] = [];
    const auroraWaves: AuroraWave[] = [];
    const glowOrbs: GlowOrb[] = [];
    const sparkles: Sparkle[] = [];
    const nodes: ConnectionNode[] = [];

    for (let i = 0; i < 8; i++) hexagons.push(new Hexagon());
    for (let i = 0; i < 3; i++) auroraWaves.push(new AuroraWave());
    for (let i = 0; i < 5; i++) glowOrbs.push(new GlowOrb());
    for (let i = 0; i < 20; i++) sparkles.push(new Sparkle());
    for (let i = 0; i < 15; i++) nodes.push(new ConnectionNode());

    // Draw connections
    const drawConnections = () => {
      const maxDist = 180;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < maxDist) {
            const opacity = (1 - dist / maxDist) * 0.2;
            const gradient = ctx.createLinearGradient(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
            gradient.addColorStop(0, `hsla(${nodes[i].color.h}, ${nodes[i].color.s}%, ${nodes[i].color.l}%, ${opacity})`);
            gradient.addColorStop(1, `hsla(${nodes[j].color.h}, ${nodes[j].color.s}%, ${nodes[j].color.l}%, ${opacity})`);
            
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = gradient;
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

      // Draw aurora waves (background)
      auroraWaves.forEach(wave => {
        wave.update();
        wave.draw();
      });

      // Draw glow orbs
      glowOrbs.forEach(orb => {
        orb.update();
        orb.draw();
      });

      // Draw connections
      nodes.forEach(node => {
        node.update();
        node.draw();
      });
      drawConnections();

      // Draw hexagons
      hexagons.forEach(hex => {
        hex.update();
        hex.draw();
      });

      // Draw sparkles
      sparkles.forEach(sparkle => {
        sparkle.update();
        sparkle.draw();
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
      style={{ opacity: 0.85 }}
    />
  );
};
