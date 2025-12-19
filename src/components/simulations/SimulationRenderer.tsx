import { SimulationParameter } from "@/types/physics";
import { PendulumSimulation } from "./PendulumSimulation";
import { ProjectileSimulation } from "./ProjectileSimulation";
import { SpringSimulation } from "./SpringSimulation";
import { WaveSimulation } from "./WaveSimulation";
import { FreeFallSimulation } from "./FreeFallSimulation";
import { CollisionSimulation } from "./CollisionSimulation";
import { InclinedPlaneSimulation } from "./InclinedPlaneSimulation";
import { CircularMotionSimulation } from "./CircularMotionSimulation";
import { ElectricFieldSimulation } from "./ElectricFieldSimulation";
import { MagneticInductionSimulation } from "./MagneticInductionSimulation";
import { RefractionSimulation } from "./RefractionSimulation";
import { LensSimulation } from "./LensSimulation";
import { IdealGasSimulation } from "./IdealGasSimulation";
import { InterferenceSimulation } from "./InterferenceSimulation";
import { CapacitorSimulation } from "./CapacitorSimulation";
import { DopplerSimulation } from "./DopplerSimulation";
import { AtwoodMachineSimulation } from "./AtwoodMachineSimulation";
import { OhmsLawSimulation } from "./OhmsLawSimulation";
import { ThermalExpansionSimulation } from "./ThermalExpansionSimulation";
import { HarmonicOscillatorSimulation } from "./HarmonicOscillatorSimulation";

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
    electricField: ElectricFieldSimulation,
    magneticInduction: MagneticInductionSimulation,
    refraction: RefractionSimulation,
    lens: LensSimulation,
    idealGas: IdealGasSimulation,
    interference: InterferenceSimulation,
    capacitor: CapacitorSimulation,
    doppler: DopplerSimulation,
    atwoodMachine: AtwoodMachineSimulation,
    ohmsLaw: OhmsLawSimulation,
    thermalExpansion: ThermalExpansionSimulation,
    harmonicOscillator: HarmonicOscillatorSimulation,
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
