import { SimulationParameter } from "@/types/physics";
import { PendulumSimulation } from "./PendulumSimulation";
import { ProjectileSimulation } from "./ProjectileSimulation";
import { SpringSimulation } from "./SpringSimulation";
import { WaveSimulation } from "./WaveSimulation";
import { FreeFallSimulation } from "./FreeFallSimulation";
import { CollisionSimulation } from "./CollisionSimulation";
import { InclinedPlaneSimulation } from "./InclinedPlaneSimulation";
import { CircularMotionSimulation } from "./CircularMotionSimulation";

interface Props {
  simulationId: string;
  parameters: SimulationParameter[];
}

export const SimulationRenderer = ({ simulationId, parameters }: Props) => {
  const simulations: Record<string, React.ComponentType<{ parameters: SimulationParameter[] }>> = {
    pendulum: PendulumSimulation,
    projectile: ProjectileSimulation,
    spring: SpringSimulation,
    wave: WaveSimulation,
    freefall: FreeFallSimulation,
    collision: CollisionSimulation,
    inclinedPlane: InclinedPlaneSimulation,
    circularMotion: CircularMotionSimulation,
  };

  const SimulationComponent = simulations[simulationId];

  if (!SimulationComponent) {
    return (
      <div className="w-full aspect-[4/3] rounded-xl border border-border bg-card flex items-center justify-center">
        <p className="text-muted-foreground">Simulyatsiya topilmadi</p>
      </div>
    );
  }

  return <SimulationComponent parameters={parameters} />;
};
