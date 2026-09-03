export type DrugCategory =
  | 'analgesici'
  | 'sedazione'
  | 'respiratorie'
  | 'anafilassi'
  | 'convulsioni'
  | 'cardiovascolari'
  | 'antibiotici'
  | 'antiemetici'
  | 'antispastici'
  | 'antidoti'
  | 'liquidi'
  | 'sepsi'
  | 'dka';

export interface CategoryInfo {
  id: DrugCategory;
  name: string;
  shortName: string;
  icon: string;
  badgeColor: string;
  sectionNum: number;
}

export interface CalculatedDose {
  label: string;
  route: string;
  rawFormula: string;
  calculatedValue: string;
  unit: string;
  numericDose?: number;
  volumeInfo?: string;
  preparationAdvice?: string;
  maxDoseCap?: string;
  isMaxDoseReached?: boolean;
  frequencyOrDuration?: string;
  alertNote?: string;
}

export interface DrugItem {
  id: string;
  name: string;
  commercialNames?: string[];
  category: DrugCategory;
  sectionNum: number;
  sectionTitle: string;
  summaryDose: string;
  routes: string[];
  indications: string[];
  contraindications: string[];
  adverseEffectsAndNotes: string[];
  antidote?: string;
  highRisk?: boolean;
  priorityEmergency?: boolean;
  calculateDoses: (weightKg: number, ageMonths?: number) => CalculatedDose[];
}

export interface BroselowZone {
  color: string;
  colorHex: string;
  textColor: string;
  weightRange: string;
  minWeight: number;
  maxWeight: number;
  typicalAge: string;
  lengthCm: string;
}

export interface SelectedForDoubleCheck {
  drugId: string;
  drugName: string;
  selectedDose: CalculatedDose;
  notes?: string;
  timestamp: number;
}
