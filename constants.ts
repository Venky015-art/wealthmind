import { UserProfile } from './types';

export const INITIAL_USER_PROFILE: UserProfile = {
  age: 30,
  retirementAge: 65,
  currentSavings: 10000,
  monthlyContribution: 500,
  annualIncome: 75000,
  riskTolerance: 'Moderate',
  financialGoal: 'Retire comfortably with travel budget'
};

export const CHART_COLORS = [
  '#10b981', // Emerald 500
  '#3b82f6', // Blue 500
  '#8b5cf6', // Violet 500
  '#f59e0b', // Amber 500
  '#ec4899', // Pink 500
  '#6366f1', // Indigo 500
  '#14b8a6', // Teal 500
];

export const GEMINI_MODEL = 'gemini-2.5-flash';
