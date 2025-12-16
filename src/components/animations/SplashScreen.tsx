import { useEffect, useState, useMemo } from "react";
import { playSplashAudio, setAudioMuted, getAudioMuted } from "@/lib/audioEffects";
import { Volume2, VolumeX, Play } from "lucide-react";

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [phase, setPhase] = useState<"enter" | "build" | "logo" | "exit">("enter");
  const [isMuted, setIsMuted] = useState(() => getAudioMuted());

  // Memoize random values to prevent re-renders
  const particles = useMemo(() => 
    Array.from({ length: 40 }).map((_, i) => ({
      size: Math.random() * 4 + 2,
      left: Math.random() * 100,
      top: Math.random() * 100,
      glow: Math.random() * 10 + 5,
      duration: 3 + Math.random() * 4,
      delay: Math.random() * 2,
      colorType: i % 3,
    })), []
  );

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
    playSplashAudio();
    const buildTimer = setTimeout(() => setPhase("build"), 800);
    const logoTimer = setTimeout(() => setPhase("logo"), 2500);

    return () => {
      clearTimeout(buildTimer);
      clearTimeout(logoTimer);
    };
  }, [onComplete]);

  const physicsFormulas = [
    "E=mc²", "F=ma", "λ=h/p", "ΔE·Δt≥ℏ", "∇×E=-∂B/∂t",
    "p=mv", "W=Fd", "PV=nRT", "v=λf", "E=hf"
  ];

  const physicsSymbols = ["⚛", "∿", "⊗", "∞", "Ω", "∮", "∇", "∂"];

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center overflow-hidden transition-opacity duration-700 ${
        phase === "exit" ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Animated gradient background */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 20% 20%, hsl(var(--primary) / 0.2) 0%, transparent 40%),
            radial-gradient(circle at 80% 80%, hsl(262 83% 58% / 0.2) 0%, transparent 40%),
            radial-gradient(circle at 60% 30%, hsl(200 80% 50% / 0.1) 0%, transparent 30%),
            radial-gradient(circle at 40% 70%, hsl(340 80% 50% / 0.1) 0%, transparent 30%),
            radial-gradient(circle at 50% 50%, hsl(var(--primary) / 0.08) 0%, transparent 60%),
            hsl(var(--background))
          `
        }}
      />

      {/* Animated aurora effect */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div 
          className="absolute w-[200%] h-[200%] -left-1/2 -top-1/2"
          style={{
            background: `
              conic-gradient(from 0deg at 50% 50%, 
                transparent 0deg, 
                hsl(var(--primary) / 0.3) 60deg, 
                transparent 120deg,
                hsl(262 83% 58% / 0.3) 180deg,
                transparent 240deg,
                hsl(200 80% 50% / 0.2) 300deg,
                transparent 360deg
              )
            `,
            animation: phase !== "enter" ? "slow-rotate 20s linear infinite" : "none",
          }}
        />
      </div>

      {/* Grid pattern */}
      <div 
        className={`absolute inset-0 physics-grid transition-opacity duration-1000 ${
          phase === "enter" ? "opacity-0" : "opacity-20"
        }`}
      />

      {/* Sine wave animations */}
      {phase !== "enter" && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
          {[0, 1, 2].map((i) => (
            <path
              key={i}
              d={`M 0 ${50 + i * 10} Q 25 ${30 + i * 10}, 50 ${50 + i * 10} T 100 ${50 + i * 10}`}
              fill="none"
              stroke={i === 0 ? "hsl(var(--primary))" : i === 1 ? "hsl(262 83% 58%)" : "hsl(200 80% 50%)"}
              strokeWidth="1"
              strokeOpacity="0.2"
              style={{
                strokeDasharray: "1000",
                strokeDashoffset: "1000",
                animation: `draw-wave 3s ease-out ${i * 0.3}s forwards`,
              }}
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>
      )}

      {/* Floating physics symbols */}
      {phase !== "enter" && physicsSymbols.map((symbol, i) => (
        <div
          key={symbol}
          className="absolute text-2xl transition-all duration-1000"
          style={{
            left: `${10 + (i % 4) * 25}%`,
            top: i < 4 ? "10%" : "85%",
            color: i % 2 === 0 ? "hsl(var(--primary) / 0.3)" : "hsl(262 83% 58% / 0.3)",
            animation: `float ${3 + i * 0.3}s ease-in-out infinite`,
            animationDelay: `${i * 0.2}s`,
            opacity: phase === "exit" ? 0 : 1,
            transform: phase === "exit" ? "scale(2)" : "scale(1)",
          }}
        >
          {symbol}
        </div>
      ))}

      {/* Pendulum animation */}
      {phase !== "enter" && (
        <div className="absolute left-8 top-1/4 w-20 h-40">
          <div 
            className="absolute top-0 left-1/2 w-0.5 h-32 bg-gradient-to-b from-primary/50 to-transparent origin-top"
            style={{
              animation: "pendulum 2s ease-in-out infinite",
            }}
          >
            <div 
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full"
              style={{
                background: "radial-gradient(circle at 30% 30%, hsl(var(--primary)), hsl(var(--primary) / 0.6))",
                boxShadow: "0 0 20px hsl(var(--primary) / 0.5)",
              }}
            />
          </div>
        </div>
      )}

      {/* Projectile motion path */}
      {phase !== "enter" && (
        <svg className="absolute right-8 top-1/4 w-32 h-32 opacity-40">
          <path
            d="M 0 100 Q 50 0, 100 100"
            fill="none"
            stroke="hsl(262 83% 58%)"
            strokeWidth="2"
            strokeDasharray="5,5"
            style={{
              animation: "dash 2s linear infinite",
            }}
          />
          <circle
            r="4"
            fill="hsl(262 83% 58%)"
            style={{
              animation: "projectile 2s ease-in-out infinite",
            }}
          >
            <animateMotion
              dur="2s"
              repeatCount="indefinite"
              path="M 0 100 Q 50 0, 100 100"
            />
          </circle>
        </svg>
      )}

      {/* Magnetic field lines */}
      {phase !== "enter" && (
        <div className="absolute left-1/4 bottom-20 opacity-30">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="absolute border-2 border-dashed rounded-full"
              style={{
                width: `${60 + i * 30}px`,
                height: `${30 + i * 15}px`,
                borderColor: "hsl(200 80% 50%)",
                left: `${-30 - i * 15}px`,
                top: `${-15 - i * 7.5}px`,
                animation: `pulse ${2 + i * 0.5}s ease-in-out infinite`,
              }}
            />
          ))}
          <div className="text-xs text-[hsl(200_80%_50%)] mt-8 font-mono">B⃗</div>
        </div>
      )}

      {/* Light spectrum / prism effect */}
      {phase !== "enter" && (
        <div className="absolute right-1/4 bottom-24 opacity-50">
          <div 
            className="w-0 h-0 border-l-[20px] border-l-transparent border-b-[35px] border-r-[20px] border-r-transparent"
            style={{ borderBottomColor: "hsl(var(--foreground) / 0.3)" }}
          />
          <div className="absolute top-2 right-[-60px] flex flex-col gap-0.5">
            {["#ff0000", "#ff7f00", "#ffff00", "#00ff00", "#0000ff", "#4b0082", "#8f00ff"].map((color, i) => (
              <div
                key={color}
                className="h-0.5 rounded-full"
                style={{
                  width: `${30 + i * 3}px`,
                  background: color,
                  opacity: 0.6,
                  animation: `spectrum-spread 1s ease-out ${i * 0.1}s forwards`,
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Floating particles background */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle, i) => (
          <div
            key={i}
            className={`absolute rounded-full transition-all duration-1000 ${
              phase === "enter" ? "opacity-0 scale-0" : "opacity-100 scale-100"
            }`}
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              background: particle.colorType === 0 
                ? "hsl(var(--primary))" 
                : particle.colorType === 1 
                ? "hsl(262 83% 58%)" 
                : "hsl(200 80% 50%)",
              boxShadow: `0 0 ${particle.glow}px currentColor`,
              animation: `float ${particle.duration}s ease-in-out infinite`,
              animationDelay: `${particle.delay}s`,
              transitionDelay: `${i * 20}ms`,
            }}
          />
        ))}
      </div>

      {/* Energy waves */}
      {phase !== "enter" && (
        <div className="absolute inset-0 flex items-center justify-center">
          {[1, 2, 3, 4, 5].map((ring) => (
            <div
              key={ring}
              className="absolute rounded-full border animate-[ripple_3s_ease-out_infinite]"
              style={{
                width: `${ring * 120}px`,
                height: `${ring * 120}px`,
                borderColor: ring % 3 === 0 
                  ? "hsl(var(--primary) / 0.3)" 
                  : ring % 3 === 1 
                  ? "hsl(262 83% 58% / 0.3)"
                  : "hsl(200 80% 50% / 0.2)",
                animationDelay: `${ring * 0.3}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Main atom structure */}
      <div className="relative w-80 h-80">
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
            background: `radial-gradient(circle, hsl(var(--primary) / 0.25) 0%, transparent 70%)`,
          }}
        />

        {/* Secondary atoms (smaller, orbiting) */}
        {phase !== "enter" && [0, 120, 240].map((angle, i) => (
          <div
            key={`satellite-${i}`}
            className="absolute w-6 h-6"
            style={{
              top: "50%",
              left: "50%",
              animation: `satellite-orbit ${8 + i}s linear infinite`,
              animationDelay: `${i * 0.5}s`,
            }}
          >
            <div 
              className="w-full h-full rounded-full"
              style={{
                background: `radial-gradient(circle at 30% 30%, hsl(${200 + i * 40} 80% 60%), hsl(${200 + i * 40} 80% 40%))`,
                boxShadow: `0 0 15px hsl(${200 + i * 40} 80% 50% / 0.5)`,
              }}
            />
          </div>
        ))}

        {/* Central nucleus with pulse */}
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ${
            phase === "enter" ? "scale-0" : "scale-100"
          }`}
        >
          {/* Nucleus glow rings */}
          <div 
            className="absolute -inset-8 rounded-full"
            style={{
              background: "radial-gradient(circle, hsl(var(--primary) / 0.15) 0%, transparent 70%)",
              animation: "nucleus-pulse 2s ease-in-out infinite",
            }}
          />
          
          {/* Nucleus core */}
          <div 
            className="w-16 h-16 rounded-full relative"
            style={{
              background: `
                radial-gradient(circle at 30% 30%, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.7) 40%, hsl(262 83% 58% / 0.5) 100%)
              `,
              boxShadow: `
                0 0 40px hsl(var(--primary) / 0.7),
                0 0 80px hsl(var(--primary) / 0.5),
                0 0 120px hsl(262 83% 58% / 0.4),
                0 0 160px hsl(200 80% 50% / 0.2),
                inset 0 0 30px hsl(var(--primary) / 0.6)
              `,
              animation: phase !== "enter" ? "nucleus-pulse 2s ease-in-out infinite" : "none",
            }}
          >
            {/* Inner sparkles */}
            <div className="absolute top-2 left-2 w-4 h-4 rounded-full bg-white/70 blur-[3px]" />
            <div className="absolute bottom-3 right-3 w-2 h-2 rounded-full bg-white/50 blur-[2px]" />
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
                phase !== "enter" ? "animate-[orbit-spin_3s_linear_infinite]" : ""
              }`}
              style={{
                height: `${90 + i * 25}px`,
                border: `2px solid transparent`,
                background: `linear-gradient(${rotation}deg, hsl(var(--primary) / 0.6), hsl(262 83% 58% / 0.4), hsl(200 80% 50% / 0.2)) border-box`,
                WebkitMask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
                animationDelay: `${i * 0.4}s`,
                animationDirection: i % 2 === 0 ? "normal" : "reverse",
              }}
            >
              {/* Electron */}
              <div
                className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full"
                style={{
                  background: i === 0 
                    ? "hsl(var(--primary))" 
                    : i === 1 
                    ? "hsl(262 83% 58%)"
                    : "hsl(200 80% 50%)",
                  boxShadow: `
                    0 0 20px ${i === 0 ? "hsl(var(--primary))" : i === 1 ? "hsl(262 83% 58%)" : "hsl(200 80% 50%)"},
                    0 0 40px ${i === 0 ? "hsl(var(--primary) / 0.5)" : i === 1 ? "hsl(262 83% 58% / 0.5)" : "hsl(200 80% 50% / 0.5)"}
                  `,
                }}
              />
              {/* Trail effect */}
              <div
                className="absolute -top-2 left-1/2 w-12 h-4 rounded-full blur-sm"
                style={{
                  background: `linear-gradient(90deg, transparent, ${i === 0 ? "hsl(var(--primary) / 0.5)" : i === 1 ? "hsl(262 83% 58% / 0.5)" : "hsl(200 80% 50% / 0.4)"})`,
                  transform: "translateX(-100%)",
                }}
              />
            </div>
          </div>
        ))}

        {/* Logo text */}
        <div
          className={`absolute top-full left-1/2 -translate-x-1/2 mt-16 text-center transition-all duration-700 ${
            phase === "logo" || phase === "exit"
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <h1 
            className="text-5xl font-bold tracking-widest"
            style={{
              background: "linear-gradient(135deg, hsl(var(--primary)), hsl(262 83% 58%), hsl(200 80% 50%), hsl(var(--primary)))",
              backgroundSize: "300% 300%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "gradient-shift 4s ease infinite",
              textShadow: "0 0 40px hsl(var(--primary) / 0.3)",
            }}
          >
            FIZIKA
          </h1>
          <p className="text-muted-foreground text-sm mt-3 tracking-widest uppercase">
            Interaktiv o'quv platformasi
          </p>
          
          {/* Start button */}
          <button
            onClick={handleStart}
            className="mt-10 px-10 py-4 rounded-full border border-primary/40 bg-background/30 backdrop-blur-md hover:bg-primary/20 hover:border-primary/60 hover:scale-105 transition-all duration-300 group flex items-center gap-3 mx-auto"
            style={{
              boxShadow: "0 0 30px hsl(var(--primary) / 0.2)",
            }}
          >
            <Play className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
            <span 
              className="text-base font-semibold tracking-wide"
              style={{
                background: "linear-gradient(135deg, hsl(var(--primary)), hsl(262 83% 58%))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Boshlash
            </span>
          </button>
          
          {/* Keyboard hint */}
          <p className="mt-4 text-xs text-muted-foreground/60 animate-pulse">
            yoki <kbd className="px-2 py-1 rounded bg-muted/30 border border-muted/50 text-muted-foreground/80 font-mono text-[10px]">Enter</kbd> bosing
          </p>
        </div>

        {/* Floating formulas - left side */}
        {physicsFormulas.slice(0, 5).map((formula, i) => (
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
              color: i % 3 === 0 ? "hsl(var(--primary) / 0.5)" : i % 3 === 1 ? "hsl(262 83% 58% / 0.5)" : "hsl(200 80% 50% / 0.4)",
              top: `${5 + i * 20}%`,
              left: "-100px",
              transitionDelay: `${400 + i * 100}ms`,
              animation: phase !== "enter" ? `float ${4 + i * 0.5}s ease-in-out infinite` : "none",
              animationDelay: `${i * 0.3}s`,
            }}
          >
            {formula}
          </div>
        ))}

        {/* Floating formulas - right side */}
        {physicsFormulas.slice(5).map((formula, i) => (
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
              color: i % 3 === 0 ? "hsl(var(--primary) / 0.5)" : i % 3 === 1 ? "hsl(262 83% 58% / 0.5)" : "hsl(200 80% 50% / 0.4)",
              top: `${5 + i * 20}%`,
              right: "-100px",
              transitionDelay: `${500 + i * 100}ms`,
              animation: phase !== "enter" ? `float ${4.5 + i * 0.5}s ease-in-out infinite` : "none",
              animationDelay: `${i * 0.4}s`,
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

      {/* Corner decorations with physics symbols */}
      {phase !== "enter" && (
        <>
          <div className="absolute top-8 left-8 w-28 h-28 border-l-2 border-t-2 border-primary/40 rounded-tl-3xl animate-[fade-in_1s_ease-out]">
            <span className="absolute -bottom-6 left-2 text-primary/30 font-mono text-xs">Δx·Δp≥ℏ/2</span>
          </div>
          <div className="absolute top-8 right-8 w-28 h-28 border-r-2 border-t-2 border-[hsl(262_83%_58%_/_0.4)] rounded-tr-3xl animate-[fade-in_1s_ease-out_0.2s_both]">
            <span className="absolute -bottom-6 right-2 text-[hsl(262_83%_58%_/_0.3)] font-mono text-xs">∮E·dl=0</span>
          </div>
          <div className="absolute bottom-8 left-8 w-28 h-28 border-l-2 border-b-2 border-[hsl(200_80%_50%_/_0.4)] rounded-bl-3xl animate-[fade-in_1s_ease-out_0.4s_both]">
            <span className="absolute -top-6 left-2 text-[hsl(200_80%_50%_/_0.3)] font-mono text-xs">S=k·lnW</span>
          </div>
          <div className="absolute bottom-8 right-8 w-28 h-28 border-r-2 border-b-2 border-primary/40 rounded-br-3xl animate-[fade-in_1s_ease-out_0.6s_both]">
            <span className="absolute -top-6 right-2 text-primary/30 font-mono text-xs">∇·B=0</span>
          </div>
        </>
      )}

      {/* Particle burst effect on exit */}
      {phase === "exit" && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 rounded-full animate-[particle-burst_0.8s_ease-out_forwards]"
              style={{
                background: i % 3 === 0 ? "hsl(var(--primary))" : i % 3 === 1 ? "hsl(262 83% 58%)" : "hsl(200 80% 50%)",
                boxShadow: `0 0 15px ${i % 3 === 0 ? "hsl(var(--primary))" : i % 3 === 1 ? "hsl(262 83% 58%)" : "hsl(200 80% 50%)"}`,
                "--angle": `${i * 12}deg`,
              } as React.CSSProperties}
            />
          ))}
        </div>
      )}
    </div>
  );
};