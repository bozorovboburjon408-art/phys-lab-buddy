import { useEffect, useRef } from "react";

export const PhysicsBackground = () => {
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

    // Particle class for atoms
    class Atom {
      x: number;
      y: number;
      radius: number;
      electrons: number;
      rotation: number;
      rotationSpeed: number;
      orbitRadius: number;
      opacity: number;
      color: string;
      vx: number;
      vy: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 8 + 6;
        this.electrons = Math.floor(Math.random() * 3) + 2;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.04;
        this.orbitRadius = this.radius * (Math.random() * 4 + 5);
        this.opacity = Math.random() * 0.5 + 0.3;
        this.color = Math.random() > 0.5 ? "187, 92%, 50%" : "262, 83%, 58%";
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
      }

      draw() {
        if (!ctx) return;
        
        // Glow effect
        ctx.shadowColor = `hsla(${this.color}, 0.5)`;
        ctx.shadowBlur = 15;
        
        // Nucleus
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${this.color}, ${this.opacity})`;
        ctx.fill();
        
        ctx.shadowBlur = 0;

        // Orbits and electrons
        for (let i = 0; i < this.electrons; i++) {
          const angle = this.rotation + (i * Math.PI * 2) / this.electrons;
          const orbitR = this.orbitRadius * (1 + i * 0.4);
          
          // Orbit path
          ctx.beginPath();
          ctx.ellipse(this.x, this.y, orbitR, orbitR * 0.4, i * 0.6, 0, Math.PI * 2);
          ctx.strokeStyle = `hsla(${this.color}, ${this.opacity * 0.4})`;
          ctx.lineWidth = 1;
          ctx.stroke();

          // Electron with glow
          const ex = this.x + Math.cos(angle) * orbitR;
          const ey = this.y + Math.sin(angle) * orbitR * 0.4;
          
          ctx.shadowColor = `hsla(${this.color}, 0.8)`;
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.arc(ex, ey, 3, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${this.color}, ${this.opacity * 1.5})`;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      update() {
        this.rotation += this.rotationSpeed;
        this.x += this.vx;
        this.y += this.vy;
        
        // Bounce off edges
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }
    }

    // Floating formula class
    class Formula {
      x: number;
      y: number;
      text: string;
      opacity: number;
      speed: number;
      size: number;
      wobble: number;
      wobbleSpeed: number;

      constructor() {
        const formulas = ["E=mc²", "F=ma", "v=λf", "p=mv", "ω=2πf", "T=2π√(l/g)", "KE=½mv²", "W=Fd", "a=v²/r", "PV=nRT", "ΔE=hf", "λ=h/p"];
        this.text = formulas[Math.floor(Math.random() * formulas.length)];
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + 50;
        this.opacity = Math.random() * 0.25 + 0.15;
        this.speed = Math.random() * 0.5 + 0.3;
        this.size = Math.random() * 18 + 16;
        this.wobble = 0;
        this.wobbleSpeed = Math.random() * 0.02 + 0.01;
      }

      draw() {
        if (!ctx) return;
        ctx.font = `bold ${this.size}px 'JetBrains Mono', monospace`;
        ctx.fillStyle = `hsla(187, 92%, 50%, ${this.opacity})`;
        ctx.shadowColor = `hsla(187, 92%, 50%, 0.3)`;
        ctx.shadowBlur = 10;
        ctx.fillText(this.text, this.x + Math.sin(this.wobble) * 10, this.y);
        ctx.shadowBlur = 0;
      }

      update() {
        this.y -= this.speed;
        this.wobble += this.wobbleSpeed;
        if (this.y < -50) {
          this.y = canvas.height + 50;
          this.x = Math.random() * canvas.width;
        }
      }
    }

    // Wave particle
    class Wave {
      y: number;
      amplitude: number;
      wavelength: number;
      phase: number;
      speed: number;
      opacity: number;

      constructor() {
        this.y = Math.random() * canvas.height;
        this.amplitude = Math.random() * 30 + 15;
        this.wavelength = Math.random() * 80 + 40;
        this.phase = Math.random() * Math.PI * 2;
        this.speed = Math.random() * 0.03 + 0.02;
        this.opacity = Math.random() * 0.15 + 0.1;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.moveTo(0, this.y);
        
        for (let x = 0; x < canvas.width; x += 3) {
          const y = this.y + Math.sin((x / this.wavelength) + this.phase) * this.amplitude;
          ctx.lineTo(x, y);
        }
        
        ctx.strokeStyle = `hsla(262, 83%, 58%, ${this.opacity})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      update() {
        this.phase += this.speed;
      }
    }

    // Floating particles
    class Particle {
      x: number;
      y: number;
      size: number;
      speed: number;
      opacity: number;
      color: string;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speed = Math.random() * 0.5 + 0.2;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.color = Math.random() > 0.5 ? "187, 92%, 50%" : "262, 83%, 58%";
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${this.color}, ${this.opacity})`;
        ctx.fill();
      }

      update() {
        this.y -= this.speed;
        if (this.y < -10) {
          this.y = canvas.height + 10;
          this.x = Math.random() * canvas.width;
        }
      }
    }

    // Create particles
    const atoms: Atom[] = [];
    const formulas: Formula[] = [];
    const waves: Wave[] = [];
    const particles: Particle[] = [];

    for (let i = 0; i < 8; i++) {
      atoms.push(new Atom());
    }

    for (let i = 0; i < 6; i++) {
      formulas.push(new Formula());
    }

    for (let i = 0; i < 2; i++) {
      waves.push(new Wave());
    }

    for (let i = 0; i < 15; i++) {
      particles.push(new Particle());
    }

    // Animation loop
    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      waves.forEach(wave => {
        wave.update();
        wave.draw();
      });

      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      atoms.forEach(atom => {
        atom.update();
        atom.draw();
      });

      formulas.forEach(formula => {
        formula.update();
        formula.draw();
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
      style={{ opacity: 0.6 }}
    />
  );
};
