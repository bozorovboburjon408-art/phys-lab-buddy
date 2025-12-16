export interface SimulationParameter {
  id: string;
  name: string;
  nameUz: string;
  min: number;
  max: number;
  step: number;
  value: number;
  unit: string;
}

export interface SimulationFormula {
  formula: string;
  description: string;
  descriptionUz: string;
}

export interface PhysicsSimulation {
  id: string;
  title: string;
  titleUz: string;
  description: string;
  descriptionUz: string;
  parameters: SimulationParameter[];
  icon: string;
  theory?: string;
  theoryUz?: string;
  formulas?: SimulationFormula[];
}

export interface LabExperiment {
  id: string;
  title: string;
  titleUz: string;
  purpose: string;
  purposeUz: string;
  equipment: string[];
  equipmentUz: string[];
  theory: string;
  theoryUz: string;
  procedure: string[];
  procedureUz: string[];
  tableColumns: TableColumn[];
  calculations: (inputs: Record<string, number>) => Record<string, number>;
}

export interface TableColumn {
  id: string;
  name: string;
  nameUz: string;
  unit: string;
  isInput: boolean;
}

export interface TableRow {
  id: string;
  values: Record<string, number | null>;
}
