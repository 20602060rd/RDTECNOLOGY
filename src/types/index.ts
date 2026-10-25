export type TabType = 
  | 'diagnostico' 
  | 'manuales' 
  | 'codigos' 
  | 'multimetro' 
  | 'repuestos' 
  | 'presupuestos' 
  | 'historial';

export interface DiagnosticStep {
  title: string;
  subtitle: string;
  instructions: string[];
  safetyAlert?: string;
  checkpoints: string[];
  multimeterSpec?: {
    component: string;
    setting: 'Resistencia (Ω)' | 'Voltaje AC (V)' | 'Voltaje DC (V)' | 'Continuidad';
    expectedValue: string;
    tolerance: string;
  };
}

export interface RepairGuide {
  id: string;
  title: string;
  summary: string;
  category: string;
  estimatedTime: string;
  difficulty: 'Básica' | 'Intermedia' | 'Avanzada';
  commonSymptoms: string[];
  imagePath?: string;
  toolsNeeded: string[];
  safetyWarnings: string[];
  step1Identify: {
    question: string;
    checklist: string[];
  };
  step2InitialChecks: {
    title: string;
    items: string[];
  };
  step3RootCause: {
    title: string;
    probableCauses: {
      cause: string;
      probability: 'Alta' | 'Media' | 'Baja';
      howToConfirm: string;
      multimeterCheck?: string;
    }[];
  };
  step4RepairProcedure: {
    disassemblySteps: string[];
    replacementSteps: string[];
    tips: string[];
  };
  step5FinalVerification: {
    testCycle: string;
    safetyChecks: string[];
    acceptanceCriteria: string;
  };
  compatibleParts: {
    name: string;
    specs: string;
    avgPriceCOP: number;
    reference: string;
  }[];
  testValues: {
    component: string;
    nominal: string;
    shortCircuit: string;
    openCircuit: string;
  }[];
}

export interface FaultCategory {
  id: string;
  name: string;
  totalFaults: number;
  iconName: string;
  description: string;
  faults: {
    id: string;
    title: string;
    symptom: string;
    quickCheck: string;
    probableCause: string;
    recommendedPart: string;
    guideId?: string;
  }[];
}

export interface ErrorCodeItem {
  code: string;
  brand: 'Whirlpool' | 'LG' | 'Samsung' | 'Mabe' | 'Haceb' | 'Electrolux' | 'Bosch' | 'Otras';
  modelType: 'Carga Frontal' | 'Carga Superior' | 'Inverter' | 'Universal';
  description: string;
  probableCauses: string[];
  solutionSteps: string[];
  multimeterTest?: string;
  resetProcedure?: string;
}

export interface SparePart {
  id: string;
  name: string;
  category: 'Agua' | 'Motor' | 'Eléctrico' | 'Electrónica' | 'Mecánica' | 'Puerta y Controles';
  partNumber: string;
  compatibleBrands: string[];
  avgPriceCOP: number;
  nominalSpecs: string;
  multimeterRange: string;
  failureSymptoms: string[];
  maintenanceTip: string;
  image?: string;
}

export interface RepairRecord {
  id: string;
  clientName: string;
  clientPhone: string;
  address?: string;
  brand: string;
  model: string;
  symptom: string;
  diagnosis: string;
  partsReplaced: string[];
  laborCost: number;
  partsCost: number;
  transportCost: number;
  totalCost: number;
  currency: 'COP' | 'USD';
  warrantyDays: number;
  status: 'Diagnosticado' | 'En Espera de Repuesto' | 'En Reparación' | 'Reparada' | 'Entregada con Garantía';
  date: string;
  notes?: string;
}

export interface BudgetQuote {
  id: string;
  clientName: string;
  clientPhone: string;
  clientAddress: string;
  brand: string;
  model: string;
  failureDescription: string;
  technicianName: string;
  items: {
    description: string;
    quantity: number;
    unitPrice: number;
  }[];
  laborCost: number;
  transportCost: number;
  discount: number;
  warrantyPeriod: string;
  currency: 'COP' | 'USD';
  createdAt: string;
}
