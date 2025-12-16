import { useEffect, useRef, useState } from "react";
import { SimulationParameter } from "@/types/physics";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

interface Props {
  parameters: SimulationParameter[];
}

export const FreeFallSimulation = ({ parameters }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const [isFinished, setIsFinished] = useState(false);
  const [finalValues, setFinalValues] = useState({ velocity: 0, time: 0 });
  const stateRef = useRef({ position: 0, velocity: 0, time: 0 });
  
  const getParam = (id: string) => parameters.find(p => p.id === id)?.value ?? 0;

  const resetSimulation = () => {
    const initialVelocity = getParam("initialVelocity");
    stateRef.current = { position: 0, velocity: initialVelocity, time: 0 };
    setIsFinished(false);
  };

  useEffect(() => {
    resetSimulation();
  }, [parameters]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const initialHeight = getParam("height");
    const mass = getParam("mass");
    const gravity = getParam("gravity");
    const airResistance = getParam("airResistance");
    const initialVelocity = getParam("initialVelocity");

    // Initialize with initial velocity
    if (stateRef.current.time === 0 && stateRef.current.velocity === 0) {
      stateRef.current.velocity = initialVelocity;
    }

    const scale = (canvas.height - 100) / initialHeight;
    const groundY = canvas.height - 40;
    const startY = groundY - initialHeight * scale;

    const animate = () => {
      ctx.fillStyle = "hsl(222, 47%, 9%)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw grid
      ctx.strokeStyle = "hsla(222, 47%, 18%, 0.3)";
      ctx.lineWidth = 1;
      for (let i = 0; i < canvas.width; i += 40) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
      }
      for (let i = 0; i < canvas.height; i += 40) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
      }

      // Draw height scale
      ctx.strokeStyle = "hsla(210, 40%, 50%, 0.5)";
      ctx.lineWidth = 1;
      for (let h = 0; h <= initialHeight; h += Math.ceil(initialHeight / 10)) {
        const y = groundY - h * scale;
        ctx.beginPath();
        ctx.moveTo(70, y);
        ctx.lineTo(90, y);
        ctx.stroke();
        
        ctx.fillStyle = "hsl(210, 40%, 60%)";
        ctx.font = "12px 'JetBrains Mono'";
        ctx.textAlign = "right";
        ctx.fillText(`${h}m`, 65, y + 4);
      }
      ctx.textAlign = "left";

      // Draw ground
      ctx.fillStyle = "hsl(222, 47%, 15%)";
      ctx.fillRect(0, groundY, canvas.width, canvas.height - groundY);

      // Draw initial position marker
      ctx.strokeStyle = "hsla(262, 83%, 58%, 0.5)";
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2 - 40, startY);
      ctx.lineTo(canvas.width / 2 + 40, startY);
      ctx.stroke();
      ctx.setLineDash([]);

      const { position, velocity, time } = stateRef.current;
      const ballY = startY + position * scale;

      // Draw ball
      const finalBallY = Math.min(ballY, groundY - 15);
      ctx.shadowColor = "hsl(187, 92%, 50%)";
      ctx.shadowBlur = 20;
      ctx.fillStyle = "hsl(187, 92%, 50%)";
      ctx.beginPath();
      ctx.arc(canvas.width / 2, finalBallY, 15, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Draw velocity arrow (only if moving)
      if (!isFinished && velocity > 0.5) {
        const arrowLength = Math.min(velocity * 3, 80);
        ctx.strokeStyle = "hsl(262, 83%, 58%)";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2 + 30, finalBallY);
        ctx.lineTo(canvas.width / 2 + 30, finalBallY + arrowLength);
        ctx.lineTo(canvas.width / 2 + 25, finalBallY + arrowLength - 10);
        ctx.moveTo(canvas.width / 2 + 30, finalBallY + arrowLength);
        ctx.lineTo(canvas.width / 2 + 35, finalBallY + arrowLength - 10);
        ctx.stroke();
      }

      // Physics update (only if not finished)
      if (!isFinished && ballY < groundY - 15) {
        const dragForce = airResistance * velocity * velocity;
        const netForce = mass * gravity - dragForce;
        const acceleration = netForce / mass;
        
        stateRef.current.velocity += acceleration * 0.02;
        stateRef.current.position += stateRef.current.velocity * 0.02;
        stateRef.current.time += 0.02;
      } else if (!isFinished && ballY >= groundY - 15) {
        // Just landed - save final values and stop
        setFinalValues({ 
          velocity: stateRef.current.velocity, 
          time: stateRef.current.time 
        });
        setIsFinished(true);
      }

      // Draw info
      ctx.fillStyle = "hsl(210, 40%, 96%)";
      ctx.font = "14px 'JetBrains Mono', monospace";
      const currentHeight = Math.max(0, initialHeight - stateRef.current.position);
      const currentVelocity = isFinished ? finalValues.velocity : stateRef.current.velocity;
      const currentTime = isFinished ? finalValues.time : stateRef.current.time;
      
      ctx.fillText(`h = ${currentHeight.toFixed(1)} m`, 120, 30);
      ctx.fillText(`v = ${currentVelocity.toFixed(1)} m/s`, 120, 50);
      ctx.fillText(`t = ${currentTime.toFixed(2)} s`, 120, 70);

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [parameters, isFinished, finalValues]);

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        width={500}
        height={400}
        className="w-full rounded-xl border border-border"
      />
      {isFinished && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 rounded-xl">
          <div className="bg-card border border-border rounded-lg p-6 text-center space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Simulyatsiya tugadi</h3>
            <div className="space-y-2 text-sm font-mono">
              <p className="text-muted-foreground">Oxirgi tezlik: <span className="text-primary">{finalValues.velocity.toFixed(2)} m/s</span></p>
              <p className="text-muted-foreground">Tushish vaqti: <span className="text-primary">{finalValues.time.toFixed(2)} s</span></p>
            </div>
            <Button onClick={resetSimulation} className="gap-2">
              <RotateCcw className="w-4 h-4" />
              Qayta boshlash
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
