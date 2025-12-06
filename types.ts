export interface UserProfile {
  age: number;
  retirementAge: number;
  currentSavings: number;
  monthlyContribution: number;
  annualIncome: number;
  riskTolerance: 'Low' | 'Moderate' | 'High';
  financialGoal: string;
}

export interface AssetAllocation {
  assetClass: string;
  percentage: number;
  description: string;
  color?: string; // Added for UI mapping
}

export interface ProjectionPoint {
  year: number;
  amount: number;
  age: number;
}

export interface AdvisoryResult {
  strategyTitle: string;
  riskAnalysis: string;
  allocations: AssetAllocation[];
  projectionData: ProjectionPoint[];
  actionableSteps: string[];
  executiveSummary: string;
}

export enum AppState {
  INPUT = 'INPUT',
  LOADING = 'LOADING',
  RESULTS = 'RESULTS',
  ERROR = 'ERROR'
}