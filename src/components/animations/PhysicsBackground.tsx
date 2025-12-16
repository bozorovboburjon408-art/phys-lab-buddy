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

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 4 + 2;
        this.electrons = Math.floor(Math.random() * 3) + 1;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.02;
        this.orbitRadius = this.radius * (Math.random() * 3 + 4);
        this.opacity = Math.random() * 0.3 + 0.1;
        this.color = Math.random() > 0.5 ? "187, 92%, 50%" : "262, 83%, 58%";
      }

      draw() {
        if (!ctx) return;
        
        // Nucleus
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${this.color}, ${this.opacity})`;
        ctx.fill();

        // Orbits and electrons
        for (let i = 0; i < this.electrons; i++) {
          const angle = this.rotation + (i * Math.PI * 2) / this.electrons;
          const orbitR = this.orbitRadius * (1 + i * 0.3);
          
          // Orbit path
          ctx.beginPath();
          ctx.ellipse(this.x, this.y, orbitR, orbitR * 0.3, i * 0.5, 0, Math.PI * 2);
          ctx.strokeStyle = `hsla(${this.color}, ${this.opacity * 0.3})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();

          // Electron
          const ex = this.x + Math.cos(angle) * orbitR;
          const ey = this.y + Math.sin(angle) * orbitR * 0.3;
          ctx.beginPath();
          ctx.arc(ex, ey, 2, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${this.color}, ${this.opacity * 2})`;
          ctx.fill();
        }
      }

      update() {
        this.rotation += this.rotationSpeed;
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

      constructor() {
        const formulas = ["E=mc²", "F=ma", "v=λf", "p=mv", "ω=2πf", "T=2π√(l/g)", "KE=½mv²", "W=Fd", "a=v²/r", "PV=nRT"];
        this.text = formulas[Math.floor(Math.random() * formulas.length)];
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + 50;
        this.opacity = Math.random() * 0.15 + 0.05;
        this.speed = Math.random() * 0.3 + 0.1;
        this.size = Math.random() * 14 + 12;
      }

      draw() {
        if (!ctx) return;
        ctx.font = `${this.size}px 'JetBrains Mono', monospace`;
        ctx.fillStyle = `hsla(187, 92%, 50%, ${this.opacity})`;
        ctx.fillText(this.text, this.x, this.y);
      }

      update() {
        this.y -= this.speed;
        if (this.y < -50) {
          this.y = canvas.height + 50;
          this.x = Math.random() * canvas.width;
        }
      }
    }

    // Wave particle
    class Wave {
      x: number;
      y: number;
      amplitude: number;
      wavelength: number;
      phase: number;
      speed: number;
      opacity: number;

      constructor() {
        this.y = Math.random() * canvas.height;
        this.x = 0;
        this.amplitude = Math.random() * 20 + 10;
        this.wavelength = Math.random() * 50 + 30;
        this.phase = Math.random() * Math.PI * 2;
        this.speed = Math.random() * 0.02 + 0.01;
        this.opacity = Math.random() * 0.1 + 0.05;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.moveTo(0, this.y);
        
        for (let x = 0; x < canvas.width; x += 5) {
          const y = this.y + Math.sin((x / this.wavelength) + this.phase) * this.amplitude;
          ctx.lineTo(x, y);
        }
        
        ctx.strokeStyle = `hsla(262, 83%, 58%, ${this.opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      update() {
        this.phase += this.speed;
      }
    }

    // Create particles
    const atoms: Atom[] = [];
    const formulas: Formula[] = [];
    const waves: Wave[] = [];

    for (let i = 0; i < 8; i++) {
      atoms.push(new Atom());
    }

    for (let i = 0; i < 6; i++) {
      formulas.push(new Formula());
    }

    for (let i = 0; i < 3; i++) {
      waves.push(new Wave());
    }

    // Animation loop
    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      waves.forEach(wave => {
        wave.update();
        wave.draw();
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
