import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { SimulationRenderer } from "@/components/simulations/SimulationRenderer";
import { ParameterControl } from "@/components/simulations/ParameterControl";
import { simulations } from "@/data/simulations";
import { SimulationParameter } from "@/types/physics";
import { cn } from "@/lib/utils";
import { RotateCcw, BookOpen, Calculator, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";

const Animations = () => {
  const [selectedSimulation, setSelectedSimulation] = useState(simulations[0]);
  const [parameters, setParameters] = useState<SimulationParameter[]>(
    simulations[0].parameters
  );
  const [showTheory, setShowTheory] = useState(false);

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
      
      <main className="pt-24 pb-12 px-4">
        <div className="container mx-auto">
          <div className="mb-8 fade-in-up">
            <h1 className="text-3xl font-bold mb-2">Fizika animatsiyalari</h1>
            <p className="text-muted-foreground">
              Mavzuni tanlang va parametrlarni o'zgartirib, fizika qonunlarini interaktiv o'rganing
            </p>
          </div>

          <div className="grid lg:grid-cols-[280px_1fr] gap-6">
            {/* Sidebar - Simulation List */}
            <div className="space-y-2 slide-in-left">
              <h2 className="text-sm font-medium text-muted-foreground mb-4 px-2">
                MAVZULAR ({simulations.length})
              </h2>
              <div className="space-y-1 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
                {simulations.map((sim, index) => (
                  <button
                    key={sim.id}
                    onClick={() => handleSimulationChange(sim.id)}
                    className={cn(
                      "w-full text-left px-4 py-3 rounded-lg transition-all duration-300",
                      "hover:bg-secondary/80 hover:translate-x-1",
                      selectedSimulation.id === sim.id
                        ? "bg-primary/10 border border-primary/30 text-primary scale-[1.02]"
                        : "bg-card border border-transparent text-foreground"
                    )}
                    style={{ animationDelay: `${index * 0.03}s` }}
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
              <div className="glass-card p-6 glow-border scale-in" key={selectedSimulation.id}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold flex items-center gap-3">
                      <span className="text-3xl">{selectedSimulation.icon}</span>
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
              <div className="glass-card p-6 slide-in-bottom" style={{ animationDelay: '0.1s' }}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">Parametrlar</h3>
                  <Button variant="ghost" size="sm" onClick={resetParameters} className="group">
                    <RotateCcw className="w-4 h-4 mr-2 group-hover:rotate-180 transition-transform duration-500" />
                    Qayta o'rnatish
                  </Button>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {parameters.map((param, index) => (
                    <div key={param.id} className="fade-in-up" style={{ animationDelay: `${index * 0.05}s` }}>
                      <ParameterControl
                        parameter={param}
                        onChange={(value) => handleParameterChange(param.id, value)}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Theory Section */}
              {selectedSimulation.theoryUz && (
                <div className="glass-card overflow-hidden slide-in-bottom" style={{ animationDelay: '0.2s' }}>
                  <button
                    onClick={() => setShowTheory(!showTheory)}
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-secondary/30 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <BookOpen className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                      <span className="font-semibold">Nazariy qism</span>
                    </div>
                    <div className={cn("transition-transform duration-300", showTheory && "rotate-180")}>
                      <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    </div>
                  </button>
                  
                  <div className={cn(
                    "overflow-hidden transition-all duration-500 ease-in-out",
                    showTheory ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
                  )}>
                    <div className="px-6 pb-6">
                      <div className="prose prose-invert max-w-none">
                        <p className="text-foreground whitespace-pre-line leading-relaxed">
                          {selectedSimulation.theoryUz}
                        </p>
                      </div>
                      
                      {selectedSimulation.theory && (
                        <div className="mt-4 p-4 bg-secondary/30 rounded-lg">
                          <p className="text-sm text-muted-foreground italic">
                            {selectedSimulation.theory}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Formulas */}
              <div className="glass-card p-6 slide-in-bottom" style={{ animationDelay: '0.3s' }}>
                <div className="flex items-center gap-3 mb-6">
                  <Calculator className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold">Asosiy formulalar</h3>
                </div>
                
                {selectedSimulation.formulas && selectedSimulation.formulas.length > 0 ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {selectedSimulation.formulas.map((f, index) => (
                      <FormulaCard
                        key={index}
                        formula={f.formula}
                        latex={f.latex}
                        description={f.descriptionUz}
                        delay={index}
                      />
                    ))}
                  </div>
                ) : null}
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
  description,
  delay 
}: { 
  formula: string; 
  latex?: string; 
  description: string;
  delay: number;
}) => (
  <div 
    className="bg-secondary/50 rounded-lg p-4 hover:bg-secondary/70 transition-all duration-300 group hover:-translate-y-1 hover:shadow-lg fade-in-up"
    style={{ animationDelay: `${delay * 0.05}s` }}
  >
    <div className="text-xl text-primary mb-2 overflow-x-auto group-hover:scale-105 transition-transform origin-left">
      {latex ? (
        <div className="katex-formula">
          <BlockMath math={latex} />
        </div>
      ) : (
        <span className="font-mono">{formula}</span>
      )}
    </div>
    <div className="text-sm text-muted-foreground group-hover:text-foreground/70 transition-colors">{description}</div>
  </div>
);

export default Animations;