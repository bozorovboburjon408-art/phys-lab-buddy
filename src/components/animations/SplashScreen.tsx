import { useEffect, useState } from "react";
import { playSplashAudio, setAudioMuted, getAudioMuted } from "@/lib/audioEffects";
import { Volume2, VolumeX, Play } from "lucide-react";

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [phase, setPhase] = useState<"enter" | "build" | "logo" | "exit">("enter");
  const [isMuted, setIsMuted] = useState(() => getAudioMuted());

  const toggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    setAudioMuted(newMuted);
  };

  const handleStart = () => {
    if (phase === "logo") {
      setPhase("exit");
      setTimeout(() => onComplete(), 800);
    }
  };

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === "Enter" || e.key === " ") && phase === "logo") {
        e.preventDefault();
        handleStart();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [phase]);

  useEffect(() => {
    // Start audio sequence
    playSplashAudio();

    // Phase 1: Initial entrance
    const buildTimer = setTimeout(() => setPhase("build"), 800);
    
    // Phase 2: Build up atoms and effects
    const logoTimer = setTimeout(() => setPhase("logo"), 2500);

    return () => {
      clearTimeout(buildTimer);
      clearTimeout(logoTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center overflow-hidden transition-opacity duration-700 ${
        phase === "exit" ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Animated gradient background */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-background via-background to-background"
        style={{
          background: `
            radial-gradient(circle at 30% 20%, hsl(var(--primary) / 0.15) 0%, transparent 50%),
            radial-gradient(circle at 70% 80%, hsl(262 83% 58% / 0.15) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, hsl(var(--primary) / 0.05) 0%, transparent 70%),
            hsl(var(--background))
          `
        }}
      />

      {/* Grid pattern */}
      <div 
        className={`absolute inset-0 physics-grid transition-opacity duration-1000 ${
          phase === "enter" ? "opacity-0" : "opacity-30"
        }`}
      />

      {/* Floating particles background */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full transition-all duration-1000 ${
              phase === "enter" ? "opacity-0 scale-0" : "opacity-100 scale-100"
            }`}
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: i % 3 === 0 
                ? "hsl(var(--primary))" 
                : i % 3 === 1 
                ? "hsl(262 83% 58%)" 
                : "hsl(var(--accent))",
              boxShadow: `0 0 ${Math.random() * 10 + 5}px currentColor`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
              transitionDelay: `${i * 30}ms`,
            }}
          />
        ))}
      </div>

      {/* Energy waves */}
      {phase !== "enter" && (
        <div className="absolute inset-0 flex items-center justify-center">
          {[1, 2, 3, 4].map((ring) => (
            <div
              key={ring}
              className="absolute rounded-full border animate-[ripple_3s_ease-out_infinite]"
              style={{
                width: `${ring * 150}px`,
                height: `${ring * 150}px`,
                borderColor: ring % 2 === 0 
                  ? "hsl(var(--primary) / 0.3)" 
                  : "hsl(262 83% 58% / 0.3)",
                animationDelay: `${ring * 0.4}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Main atom structure */}
      <div className="relative w-72 h-72">
        {/* Outer glow */}
        <div
          className={`absolute inset-0 rounded-full transition-all duration-1000 ${
            phase === "enter" 
              ? "opacity-0 scale-50" 
              : phase === "exit"
              ? "opacity-0 scale-150"
              : "opacity-100 scale-100"
          }`}
          style={{
            background: `radial-gradient(circle, hsl(var(--primary) / 0.2) 0%, transparent 70%)`,
          }}
        />

        {/* Central nucleus with pulse */}
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ${
            phase === "enter" ? "scale-0" : "scale-100"
          }`}
        >
          {/* Nucleus core */}
          <div 
            className="w-12 h-12 rounded-full relative"
            style={{
              background: `
                radial-gradient(circle at 30% 30%, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.6) 50%, hsl(262 83% 58% / 0.4) 100%)
              `,
              boxShadow: `
                0 0 40px hsl(var(--primary) / 0.6),
                0 0 80px hsl(var(--primary) / 0.4),
                0 0 120px hsl(262 83% 58% / 0.3),
                inset 0 0 20px hsl(var(--primary) / 0.5)
              `,
              animation: phase !== "enter" ? "nucleus-pulse 2s ease-in-out infinite" : "none",
            }}
          >
            {/* Inner sparkle */}
            <div 
              className="absolute top-2 left-2 w-3 h-3 rounded-full bg-white/60 blur-[2px]"
            />
          </div>
        </div>

        {/* Electron orbits */}
        {[0, 60, 120].map((rotation, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-all duration-700 ${
              phase === "enter" ? "scale-150 opacity-0" : "scale-100 opacity-100"
            }`}
            style={{
              transform: `rotate(${rotation}deg)`,
              transitionDelay: `${i * 150}ms`,
            }}
          >
            {/* Orbit path with gradient */}
            <div
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full rounded-full ${
                phase !== "enter" ? "animate-[orbit-spin_4s_linear_infinite]" : ""
              }`}
              style={{
                height: `${80 + i * 20}px`,
                border: `1.5px solid transparent`,
                background: `linear-gradient(${rotation}deg, hsl(var(--primary) / 0.5), hsl(262 83% 58% / 0.3), hsl(var(--primary) / 0.1)) border-box`,
                WebkitMask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
                animationDelay: `${i * 0.5}s`,
                animationDirection: i % 2 === 0 ? "normal" : "reverse",
              }}
            >
              {/* Electron */}
              <div
                className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full"
                style={{
                  background: i % 2 === 0 
                    ? "hsl(var(--primary))" 
                    : "hsl(262 83% 58%)",
                  boxShadow: `
                    0 0 15px ${i % 2 === 0 ? "hsl(var(--primary))" : "hsl(262 83% 58%)"},
                    0 0 30px ${i % 2 === 0 ? "hsl(var(--primary) / 0.5)" : "hsl(262 83% 58% / 0.5)"}
                  `,
                }}
              />
              {/* Trail effect */}
              <div
                className="absolute -top-1.5 left-1/2 w-8 h-3 rounded-full blur-sm"
                style={{
                  background: `linear-gradient(90deg, transparent, ${i % 2 === 0 ? "hsl(var(--primary) / 0.4)" : "hsl(262 83% 58% / 0.4)"})`,
                  transform: "translateX(-100%)",
                }}
              />
            </div>
          </div>
        ))}

        {/* Logo text */}
        <div
          className={`absolute top-full left-1/2 -translate-x-1/2 mt-12 text-center transition-all duration-700 ${
            phase === "logo" || phase === "exit"
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <h1 
            className="text-4xl font-bold tracking-wider"
            style={{
              background: "linear-gradient(135deg, hsl(var(--primary)), hsl(262 83% 58%), hsl(var(--primary)))",
              backgroundSize: "200% 200%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "gradient-shift 3s ease infinite",
            }}
          >
            FIZIKA
          </h1>
          <p className="text-muted-foreground text-sm mt-2 tracking-wide">
            Interaktiv o'quv platformasi
          </p>
          
          {/* Start button */}
          <button
            onClick={handleStart}
            className="mt-8 px-8 py-3 rounded-full border border-primary/30 bg-background/20 backdrop-blur-sm hover:bg-primary/20 hover:border-primary/50 transition-all duration-300 group flex items-center gap-2 mx-auto"
          >
            <Play className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
            <span 
              className="text-sm font-medium"
              style={{
                background: "linear-gradient(135deg, hsl(var(--primary)), hsl(262 83% 58%))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Boshlash
            </span>
          </button>
        </div>

        {/* Floating formulas */}
        {["E=mc²", "F=ma", "λ=h/p", "ΔE·Δt≥ℏ", "∇×E=-∂B/∂t"].map((formula, i) => (
          <div
            key={formula}
            className={`absolute font-mono text-sm transition-all duration-700 ${
              phase === "enter"
                ? "opacity-0 scale-50"
                : phase === "exit"
                ? "opacity-0 scale-150"
                : "opacity-100 scale-100"
            }`}
            style={{
              color: i % 2 === 0 ? "hsl(var(--primary) / 0.5)" : "hsl(262 83% 58% / 0.5)",
              top: `${10 + i * 18}%`,
              left: i % 2 === 0 ? "-80px" : "calc(100% + 30px)",
              transitionDelay: `${400 + i * 100}ms`,
              animation: phase !== "enter" ? `float ${4 + i * 0.5}s ease-in-out infinite` : "none",
              animationDelay: `${i * 0.3}s`,
            }}
          >
            {formula}
          </div>
        ))}
      </div>

      {/* Sound toggle button */}
      <button
        onClick={toggleMute}
        className="absolute top-6 right-6 z-10 p-3 rounded-full bg-background/20 backdrop-blur-sm border border-primary/20 hover:bg-background/30 transition-all duration-300 group"
        title={isMuted ? "Ovozni yoqish" : "Ovozni o'chirish"}
      >
        {isMuted ? (
          <VolumeX className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
        ) : (
          <Volume2 className="w-5 h-5 text-primary animate-pulse" />
        )}
      </button>

      {/* Corner decorations */}
      {phase !== "enter" && (
        <>
          <div className="absolute top-8 left-8 w-24 h-24 border-l-2 border-t-2 border-primary/30 rounded-tl-3xl animate-[fade-in_1s_ease-out]" />
          <div className="absolute top-8 right-8 w-24 h-24 border-r-2 border-t-2 border-[hsl(262_83%_58%_/_0.3)] rounded-tr-3xl animate-[fade-in_1s_ease-out_0.2s_both]" />
          <div className="absolute bottom-8 left-8 w-24 h-24 border-l-2 border-b-2 border-[hsl(262_83%_58%_/_0.3)] rounded-bl-3xl animate-[fade-in_1s_ease-out_0.4s_both]" />
          <div className="absolute bottom-8 right-8 w-24 h-24 border-r-2 border-b-2 border-primary/30 rounded-br-3xl animate-[fade-in_1s_ease-out_0.6s_both]" />
        </>
      )}

      {/* Particle burst effect on exit */}
      {phase === "exit" && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full animate-[particle-burst_0.7s_ease-out_forwards]"
              style={{
                background: i % 2 === 0 ? "hsl(var(--primary))" : "hsl(262 83% 58%)",
                boxShadow: `0 0 10px ${i % 2 === 0 ? "hsl(var(--primary))" : "hsl(262 83% 58%)"}`,
                "--angle": `${i * 18}deg`,
              } as React.CSSProperties}
            />
          ))}
        </div>
      )}
    </div>
  );
};
