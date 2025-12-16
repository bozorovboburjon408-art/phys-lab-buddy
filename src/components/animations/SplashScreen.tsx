import { useEffect, useState } from "react";

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [phase, setPhase] = useState<"enter" | "logo" | "exit">("enter");

  useEffect(() => {
    // Phase 1: Show atoms converging
    const logoTimer = setTimeout(() => setPhase("logo"), 600);
    
    // Phase 2: Show logo, then exit
    const exitTimer = setTimeout(() => setPhase("exit"), 2000);
    
    // Phase 3: Complete and unmount
    const completeTimer = setTimeout(() => onComplete(), 2500);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-background transition-opacity duration-500 ${
        phase === "exit" ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Orbiting atoms */}
      <div className="relative w-64 h-64">
        {/* Central nucleus */}
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/60 shadow-[0_0_30px_hsl(var(--primary)/0.6)] transition-all duration-700 ${
            phase === "enter" ? "scale-0" : "scale-100"
          }`}
        />

        {/* Electron orbits */}
        {[0, 60, 120].map((rotation, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-all duration-700 ${
              phase === "enter" ? "scale-150 opacity-0" : "scale-100 opacity-100"
            }`}
            style={{
              transform: `rotate(${rotation}deg)`,
              transitionDelay: `${i * 100}ms`,
            }}
          >
            {/* Orbit path */}
            <div
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-24 border border-primary/30 rounded-full ${
                phase !== "enter" ? "animate-[spin_3s_linear_infinite]" : ""
              }`}
              style={{
                animationDelay: `${i * 0.3}s`,
                animationDirection: i % 2 === 0 ? "normal" : "reverse",
              }}
            >
              {/* Electron */}
              <div
                className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-accent shadow-[0_0_15px_hsl(var(--accent)/0.8)]"
              />
            </div>
          </div>
        ))}

        {/* Logo text */}
        <div
          className={`absolute top-full left-1/2 -translate-x-1/2 mt-8 text-center transition-all duration-500 ${
            phase === "logo" || phase === "exit"
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
        >
          <h1 className="text-3xl font-bold text-foreground tracking-wider">
            Fizika
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Interaktiv o'quv platformasi
          </p>
        </div>

        {/* Floating formulas */}
        {["E=mc²", "F=ma", "v=λf"].map((formula, i) => (
          <div
            key={formula}
            className={`absolute text-primary/40 font-mono text-sm transition-all duration-700 ${
              phase === "enter"
                ? "opacity-0 scale-50"
                : phase === "exit"
                ? "opacity-0 scale-150"
                : "opacity-100 scale-100"
            }`}
            style={{
              top: `${20 + i * 30}%`,
              left: i % 2 === 0 ? "-60px" : "calc(100% + 20px)",
              transitionDelay: `${300 + i * 150}ms`,
            }}
          >
            {formula}
          </div>
        ))}
      </div>

      {/* Particle burst effect on exit */}
      {phase === "exit" && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-primary/60 animate-[particle-burst_0.5s_ease-out_forwards]"
              style={{
                "--angle": `${i * 30}deg`,
              } as React.CSSProperties}
            />
          ))}
        </div>
      )}
    </div>
  );
};
