import { GoogleGenAI, Type } from "@google/genai";
import { UserProfile, AdvisoryResult } from "../types";
import { GEMINI_MODEL } from "../constants";

export const generateFinancialAdvice = async (profile: UserProfile): Promise<AdvisoryResult> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key is missing");
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
    Act as a senior certified financial planner (CFP) and wealth manager.
    Analyze the following user profile and generate a comprehensive investment strategy.
    
    User Profile:
    - Age: ${profile.age}
    - Target Retirement Age: ${profile.retirementAge}
    - Current Savings: $${profile.currentSavings}
    - Monthly Contribution: $${profile.monthlyContribution}
    - Annual Income: $${profile.annualIncome}
    - Risk Tolerance: ${profile.riskTolerance}
    - Specific Goal: ${profile.financialGoal}

    Generate a customized asset allocation, a year-by-year wealth projection simulation until retirement age based on realistic market returns for the chosen allocation, and actionable advice.
    
    For the projection data:
    - Start from the current age + 1 up to retirement age.
    - Assume compound interest based on historical performance of the recommended allocation.
    - Account for monthly contributions.
    
    Return the response in strict JSON format.
  `;

  try {
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            strategyTitle: { type: Type.STRING, description: "A catchy, professional title for the strategy" },
            riskAnalysis: { type: Type.STRING, description: "Analysis of their risk capacity vs tolerance" },
            executiveSummary: { type: Type.STRING, description: "A paragraph summarizing the approach" },
            allocations: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  assetClass: { type: Type.STRING },
                  percentage: { type: Type.NUMBER, description: "Percentage of portfolio (0-100)" },
                  description: { type: Type.STRING, description: "Why this asset class fits the strategy" }
                }
              }
            },
            projectionData: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  year: { type: Type.NUMBER },
                  age: { type: Type.NUMBER },
                  amount: { type: Type.NUMBER, description: "Projected total wealth" }
                }
              }
            },
            actionableSteps: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["strategyTitle", "riskAnalysis", "executiveSummary", "allocations", "projectionData", "actionableSteps"]
        }
      }
    });

    if (!response.text) {
      throw new Error("No response from AI");
    }

    const result = JSON.parse(response.text) as AdvisoryResult;
    return result;

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to generate financial advice. Please try again.");
  }
};
