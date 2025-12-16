import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { SimulationRenderer } from "@/components/simulations/SimulationRenderer";
import { ParameterControl } from "@/components/simulations/ParameterControl";
import { simulations } from "@/data/simulations";
import { SimulationParameter } from "@/types/physics";
import { cn } from "@/lib/utils";
import { RotateCcw, BookOpen, Calculator, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import "katex/dist/katex.min.css";
import { BlockMath } from "react-katex";

const Animations = () => {
  const [selectedSimulation, setSelectedSimulation] = useState(simulations[0]);
  const [parameters, setParameters] = useState<SimulationParameter[]>(
    simulations[0].parameters
  );
  const [showTheory, setShowTheory] = useState(false);
  const [showFormulas, setShowFormulas] = useState(false);

  const handleSimulationChange = (id: string) => {
    const simulation = simulations.find((s) => s.id === id);
    if (simulation) {
      setSelectedSimulation(simulation);
      setParameters([...simulation.parameters]);
      setShowTheory(false);
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
      
      <main className="pt-20 pb-8 px-4">
        <div className="container mx-auto">
          {/* Header */}
          <div className="mb-6 fade-in-up">
            <h1 className="text-2xl font-bold mb-1">Fizika animatsiyalari</h1>
            <p className="text-muted-foreground text-sm">
              Mavzuni tanlang va parametrlarni o'zgartirib, fizika qonunlarini interaktiv o'rganing
            </p>
          </div>

          <div className="grid lg:grid-cols-[240px_1fr] gap-4">
            {/* Sidebar - Simulation List */}
            <div className="slide-in-left">
              <h2 className="text-xs font-medium text-muted-foreground mb-3 px-2">
                MAVZULAR ({simulations.length})
              </h2>
              <div className="space-y-1 max-h-[calc(100vh-180px)] overflow-y-auto pr-1">
                {simulations.map((sim, index) => (
                  <button
                    key={sim.id}
                    onClick={() => handleSimulationChange(sim.id)}
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-lg transition-all duration-300",
                      "hover:bg-secondary/80 hover:translate-x-1",
                      selectedSimulation.id === sim.id
                        ? "bg-primary/10 border border-primary/30 text-primary"
                        : "bg-card/50 border border-transparent text-foreground"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{sim.icon}</span>
                      <span className="text-xs font-medium truncate">{sim.titleUz}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Main Content */}
            <div className="space-y-4">
              {/* Simulation + Parameters Row */}
              <div className="grid xl:grid-cols-[1fr_320px] gap-4" key={selectedSimulation.id}>
                {/* Simulation Card */}
                <div className="glass-card p-4 glow-border scale-in">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">{selectedSimulation.icon}</span>
                    <div>
                      <h2 className="text-lg font-bold">{selectedSimulation.titleUz}</h2>
                      <p className="text-muted-foreground text-xs">{selectedSimulation.descriptionUz}</p>
                    </div>
                  </div>

                  <SimulationRenderer
                    simulationId={selectedSimulation.id}
                    parameters={parameters}
                  />
                </div>

                {/* Parameters Panel - Side */}
                <div className="glass-card p-4 slide-in-right h-fit">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold">Parametrlar</h3>
                    <Button variant="ghost" size="sm" onClick={resetParameters} className="group h-7 text-xs">
                      <RotateCcw className="w-3 h-3 mr-1 group-hover:rotate-180 transition-transform duration-500" />
                      Qaytarish
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    {parameters.map((param) => (
                      <ParameterControl
                        key={param.id}
                        parameter={param}
                        onChange={(value) => handleParameterChange(param.id, value)}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Theory & Formulas - Collapsible Row */}
              <div className="grid md:grid-cols-2 gap-4">
                {/* Theory Section */}
                {selectedSimulation.theoryUz && (
                  <div className="glass-card overflow-hidden">
                    <button
                      onClick={() => setShowTheory(!showTheory)}
                      className="w-full px-4 py-3 flex items-center justify-between hover:bg-secondary/30 transition-colors group"
                    >
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-primary" />
                        <span className="font-semibold text-sm">Nazariy qism</span>
                      </div>
                      <ChevronDown className={cn("w-4 h-4 text-muted-foreground transition-transform duration-300", showTheory && "rotate-180")} />
                    </button>
                    
                    <div className={cn(
                      "overflow-hidden transition-all duration-500",
                      showTheory ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                    )}>
                      <div className="px-4 pb-4 max-h-[400px] overflow-y-auto">
                        <p className="text-foreground text-sm whitespace-pre-line leading-relaxed">
                          {selectedSimulation.theoryUz}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Formulas */}
                <div className="glass-card overflow-hidden">
                  <button
                    onClick={() => setShowFormulas(!showFormulas)}
                    className="w-full px-4 py-3 flex items-center justify-between hover:bg-secondary/30 transition-colors group"
                  >
                    <div className="flex items-center gap-2">
                      <Calculator className="w-4 h-4 text-primary" />
                      <span className="font-semibold text-sm">Asosiy formulalar</span>
                    </div>
                    <ChevronDown className={cn("w-4 h-4 text-muted-foreground transition-transform duration-300", showFormulas && "rotate-180")} />
                  </button>
                  
                  <div className={cn(
                    "overflow-hidden transition-all duration-500",
                    showFormulas ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                  )}>
                    <div className="px-4 pb-4 max-h-[400px] overflow-y-auto">
                      {selectedSimulation.formulas && selectedSimulation.formulas.length > 0 ? (
                        <div className="grid gap-3">
                          {selectedSimulation.formulas.map((f, index) => (
                            <FormulaCard
                              key={index}
                              formula={f.formula}
                              latex={f.latex}
                              description={f.descriptionUz}
                            />
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const FormulaCard = ({ 
  formula, 
  latex, 
  description
}: { 
  formula: string; 
  latex?: string; 
  description: string;
}) => (
  <div className="bg-secondary/50 rounded-lg p-3 hover:bg-secondary/70 transition-all duration-300">
    <div className="text-lg text-primary mb-1 overflow-x-auto">
      {latex ? (
        <div className="katex-formula">
          <BlockMath math={latex} />
        </div>
      ) : (
        <span className="font-mono">{formula}</span>
      )}
    </div>
    <div className="text-xs text-muted-foreground">{description}</div>
  </div>
);

export default Animations;