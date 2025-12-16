import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { SimulationRenderer } from "@/components/simulations/SimulationRenderer";
import { SimulationPreview } from "@/components/simulations/SimulationPreview";
import { ParameterControl } from "@/components/simulations/ParameterControl";
import { simulations } from "@/data/simulations";
import { SimulationParameter } from "@/types/physics";
import { cn } from "@/lib/utils";
import { RotateCcw, BookOpen, Calculator, ChevronDown, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import "katex/dist/katex.min.css";
import { BlockMath } from "react-katex";

const Animations = () => {
  const [selectedSimulation, setSelectedSimulation] = useState<typeof simulations[0] | null>(null);
  const [parameters, setParameters] = useState<SimulationParameter[]>([]);
  const [showTheory, setShowTheory] = useState(false);
  const [showFormulas, setShowFormulas] = useState(false);

  const handleSimulationSelect = (sim: typeof simulations[0]) => {
    setSelectedSimulation(sim);
    setParameters([...sim.parameters]);
    setShowTheory(false);
    setShowFormulas(false);
  };

  const handleParameterChange = (parameterId: string, value: number) => {
    setParameters(
      parameters.map((p) =>
        p.id === parameterId ? { ...p, value } : p
      )
    );
  };

  const resetParameters = () => {
    if (selectedSimulation) {
      setParameters([...selectedSimulation.parameters]);
    }
  };

  // Simulation List View
  if (!selectedSimulation) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-20 pb-8 px-4">
          <div className="container mx-auto">
            {/* Header */}
            <div className="mb-8 fade-in-up text-center">
              <h1 className="text-3xl font-bold mb-2">Fizika animatsiyalari</h1>
              <p className="text-muted-foreground">
                Simulyatsiyani tanlang va parametrlarni o'zgartirib, fizika qonunlarini o'rganing
              </p>
            </div>

            {/* Simulation Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {simulations.map((sim, index) => (
                <button
                  key={sim.id}
                  onClick={() => handleSimulationSelect(sim)}
                  className="glass-card p-4 text-left hover:glow-border transition-all duration-300 group hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 fade-in-up"
                  style={{ animationDelay: `${index * 0.03}s` }}
                >
                  {/* Preview Animation */}
                  <div className="mb-3 flex justify-center">
                    <SimulationPreview simulationId={sim.id} />
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <span className="text-2xl group-hover:scale-110 transition-transform shrink-0">
                      {sim.icon}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {sim.titleUz}
                      </h3>
                    </div>
                  </div>
                  
                  <div className="mt-3 pt-2 border-t border-border/50 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {sim.parameters.length} parametr
                    </span>
                    <span className="text-xs text-primary group-hover:translate-x-1 transition-transform">
                      Ochish →
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Simulation Detail View (Full Screen)
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 pb-8 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Back Button & Title */}
          <div className="mb-6 fade-in-up">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setSelectedSimulation(null)}
              className="mb-4 group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Barcha animatsiyalar
            </Button>
            
            <div className="glass-card p-4 glow-border">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{selectedSimulation.icon}</span>
                <div>
                  <h1 className="text-xl font-bold">{selectedSimulation.titleUz}</h1>
                  <p className="text-sm text-muted-foreground">{selectedSimulation.descriptionUz}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Simulation + Parameters */}
          <div className="grid lg:grid-cols-[1fr_300px] gap-4 mb-4">
            {/* Simulation Canvas */}
            <div className="glass-card p-4 scale-in">
              <SimulationRenderer
                simulationId={selectedSimulation.id}
                parameters={parameters}
              />
            </div>

            {/* Parameters Panel */}
            <div className="glass-card p-4 slide-in-right h-fit">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Parametrlar</h3>
                <Button variant="ghost" size="sm" onClick={resetParameters} className="group h-8 text-xs">
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

          {/* Theory & Formulas Row */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Theory Section */}
            {selectedSimulation.theoryUz && (
              <div className="glass-card overflow-hidden slide-in-bottom">
                <button
                  onClick={() => setShowTheory(!showTheory)}
                  className="w-full px-5 py-4 flex items-center justify-between hover:bg-secondary/30 transition-colors group"
                >
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-primary" />
                    <span className="font-semibold">Nazariy qism</span>
                  </div>
                  <ChevronDown className={cn("w-5 h-5 text-muted-foreground transition-transform duration-300", showTheory && "rotate-180")} />
                </button>
                
                <div className={cn(
                  "overflow-hidden transition-all duration-500",
                  showTheory ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                )}>
                  <div className="px-5 pb-5 max-h-[400px] overflow-y-auto">
                    <p className="text-foreground leading-relaxed whitespace-pre-line">
                      {selectedSimulation.theoryUz}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Formulas */}
            {selectedSimulation.formulas && selectedSimulation.formulas.length > 0 && (
              <div className="glass-card overflow-hidden slide-in-bottom">
                <button
                  onClick={() => setShowFormulas(!showFormulas)}
                  className="w-full px-5 py-4 flex items-center justify-between hover:bg-secondary/30 transition-colors group"
                >
                  <div className="flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-primary" />
                    <span className="font-semibold">Asosiy formulalar</span>
                  </div>
                  <ChevronDown className={cn("w-5 h-5 text-muted-foreground transition-transform duration-300", showFormulas && "rotate-180")} />
                </button>
                
                <div className={cn(
                  "overflow-hidden transition-all duration-500",
                  showFormulas ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                )}>
                  <div className="px-5 pb-5 max-h-[400px] overflow-y-auto">
                    <div className="grid gap-3">
                      {selectedSimulation.formulas.map((f, index) => (
                        <div key={index} className="bg-secondary/50 rounded-lg p-3">
                          <div className="text-lg text-primary mb-1 overflow-x-auto">
                            {f.latex ? (
                              <div className="katex-formula">
                                <BlockMath math={f.latex} />
                              </div>
                            ) : (
                              <span className="font-mono">{f.formula}</span>
                            )}
                          </div>
                          <div className="text-xs text-muted-foreground">{f.descriptionUz}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Animations;