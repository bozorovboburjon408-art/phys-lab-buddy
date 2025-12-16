import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { SimulationRenderer } from "@/components/simulations/SimulationRenderer";
import { ParameterControl } from "@/components/simulations/ParameterControl";
import { simulations } from "@/data/simulations";
import { SimulationParameter } from "@/types/physics";
import { cn } from "@/lib/utils";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

const Animations = () => {
  const [selectedSimulation, setSelectedSimulation] = useState(simulations[0]);
  const [parameters, setParameters] = useState<SimulationParameter[]>(
    simulations[0].parameters
  );

  const handleSimulationChange = (id: string) => {
    const simulation = simulations.find((s) => s.id === id);
    if (simulation) {
      setSelectedSimulation(simulation);
      setParameters([...simulation.parameters]);
    }
  };

  const handleParameterChange = (parameterId: string, value: number) => {
    setParameters(
      parameters.map((p) =>
        p.id === parameterId ? { ...p, value } : p
      )
    );
  };

  const resetParameters = () => {
    setParameters([...selectedSimulation.parameters]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-12 px-4">
        <div className="container mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Fizika animatsiyalari</h1>
            <p className="text-muted-foreground">
              Mavzuni tanlang va parametrlarni o'zgartirib, fizika qonunlarini interaktiv o'rganing
            </p>
          </div>

          <div className="grid lg:grid-cols-[280px_1fr] gap-6">
            {/* Sidebar - Simulation List */}
            <div className="space-y-2">
              <h2 className="text-sm font-medium text-muted-foreground mb-4 px-2">
                MAVZULAR
              </h2>
              <div className="space-y-1">
                {simulations.map((sim) => (
                  <button
                    key={sim.id}
                    onClick={() => handleSimulationChange(sim.id)}
                    className={cn(
                      "w-full text-left px-4 py-3 rounded-lg transition-all duration-200",
                      "hover:bg-secondary/80",
                      selectedSimulation.id === sim.id
                        ? "bg-primary/10 border border-primary/30 text-primary"
                        : "bg-card border border-transparent text-foreground"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{sim.icon}</span>
                      <span className="text-sm font-medium">{sim.titleUz}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Main Content */}
            <div className="space-y-6">
              {/* Simulation Card */}
              <div className="glass-card p-6 glow-border">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold flex items-center gap-3">
                      <span>{selectedSimulation.icon}</span>
                      {selectedSimulation.titleUz}
                    </h2>
                    <p className="text-muted-foreground mt-1">
                      {selectedSimulation.descriptionUz}
                    </p>
                  </div>
                </div>

                <SimulationRenderer
                  simulationId={selectedSimulation.id}
                  parameters={parameters}
                />
              </div>

              {/* Parameters Panel */}
              <div className="glass-card p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">Parametrlar</h3>
                  <Button variant="ghost" size="sm" onClick={resetParameters}>
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Qayta o'rnatish
                  </Button>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {parameters.map((param) => (
                    <ParameterControl
                      key={param.id}
                      parameter={param}
                      onChange={(value) => handleParameterChange(param.id, value)}
                    />
                  ))}
                </div>
              </div>

              {/* Formulas */}
              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold mb-4">Asosiy formulalar</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {selectedSimulation.id === "pendulum" && (
                    <>
                      <FormulaCard formula="T = 2π√(L/g)" description="Tebranish davri" />
                      <FormulaCard formula="f = 1/T" description="Chastota" />
                    </>
                  )}
                  {selectedSimulation.id === "projectile" && (
                    <>
                      <FormulaCard formula="R = v₀²sin(2θ)/g" description="Uchish masofasi" />
                      <FormulaCard formula="H = v₀²sin²(θ)/2g" description="Maksimal balandlik" />
                    </>
                  )}
                  {selectedSimulation.id === "spring" && (
                    <>
                      <FormulaCard formula="T = 2π√(m/k)" description="Tebranish davri" />
                      <FormulaCard formula="ω = √(k/m)" description="Burchak chastotasi" />
                    </>
                  )}
                  {selectedSimulation.id === "wave" && (
                    <>
                      <FormulaCard formula="v = λf" description="To'lqin tezligi" />
                      <FormulaCard formula="T = 1/f" description="Davr" />
                    </>
                  )}
                  {selectedSimulation.id === "freefall" && (
                    <>
                      <FormulaCard formula="h = ½gt²" description="Bosib o'tilgan masofa" />
                      <FormulaCard formula="v = gt" description="Tezlik" />
                    </>
                  )}
                  {selectedSimulation.id === "collision" && (
                    <>
                      <FormulaCard formula="m₁v₁ + m₂v₂ = const" description="Impulsning saqlanishi" />
                      <FormulaCard formula="KE = ½mv²" description="Kinetik energiya" />
                    </>
                  )}
                  {selectedSimulation.id === "inclinedPlane" && (
                    <>
                      <FormulaCard formula="a = g(sinθ - μcosθ)" description="Tezlanish" />
                      <FormulaCard formula="Ff = μN" description="Ishqalanish kuchi" />
                    </>
                  )}
                  {selectedSimulation.id === "circularMotion" && (
                    <>
                      <FormulaCard formula="ac = ω²r" description="Markazga intilma tezlanish" />
                      <FormulaCard formula="v = ωr" description="Chiziqli tezlik" />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const FormulaCard = ({ formula, description }: { formula: string; description: string }) => (
  <div className="bg-secondary/50 rounded-lg p-4">
    <div className="text-xl font-mono text-primary mb-1">{formula}</div>
    <div className="text-sm text-muted-foreground">{description}</div>
  </div>
);

export default Animations;
