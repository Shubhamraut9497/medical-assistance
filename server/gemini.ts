import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();
// DON'T DELETE THIS COMMENT
// Follow these instructions when using this blueprint:
// - Note that the newest Gemini model series is "gemini-2.5-flash" or gemini-2.5-pro"
//   - do not change this unless explicitly requested by the user

// This API key is from Gemini Developer API Key, not vertex AI API Key
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export interface ConditionAnalysisResult {
  category: string;
  severity: "Critical" | "Moderate" | "Low";
  analysis: string;
  recommendedSpecializations: string[];
}

export async function analyzeCondition(conditionInput: string): Promise<ConditionAnalysisResult> {
  try {
    const systemPrompt = `You are a medical triage AI assistant. Analyze the patient's symptoms and provide:
1. Category: The type of medical emergency (e.g., "Cardiac Emergency", "Neurological Emergency", "Trauma", "Respiratory Emergency", "Burn Emergency", "Orthopedic Emergency")
2. Severity: Rate as "Critical", "Moderate", or "Low"
3. Analysis: A brief 2-3 sentence explanation of the condition
4. Recommended Specializations: Array of hospital specializations needed. IMPORTANT: Use ONLY these exact specialization names:
   - "Cardiac" (for heart/chest pain/cardiovascular issues)
   - "Trauma" (for injuries/accidents/wounds)
   - "Neurological" (for brain/stroke/neurological issues)
   - "Respiratory" (for breathing/lung problems)
   - "Burn" (for burn injuries)
   - "Orthopedic" (for fractures/bone injuries)
   - "General" (for general emergencies or when multiple specializations apply)

Respond with JSON in this exact format:
{
  "category": "Emergency Type",
  "severity": "Critical|Moderate|Low",
  "analysis": "Brief explanation",
  "recommendedSpecializations": ["Cardiac", "Trauma"]
}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            category: { type: "string" },
            severity: { type: "string" },
            analysis: { type: "string" },
            recommendedSpecializations: {
              type: "array",
              items: { type: "string" }
            },
          },
          required: ["category", "severity", "analysis", "recommendedSpecializations"],
        },
      },
      contents: conditionInput,
    });

    const rawJson = response.text;
    console.log(`Gemini Analysis Response: ${rawJson}`);

    if (rawJson) {
      const data: ConditionAnalysisResult = JSON.parse(rawJson);
      return data;
    } else {
      throw new Error("Empty response from Gemini");
    }
  } catch (error) {
    console.error("Gemini analysis error:", error);
    throw new Error(`Failed to analyze condition: ${error}`);
  }
}

export interface ProgressInsights {
  accuracyScore: number;
  insights: string;
  improvementSuggestions: string;
}

export async function analyzeProgress(
  conditionInput: string,
  analyzedCategory: string,
  recommendedHospitals: string[]
): Promise<ProgressInsights> {
  try {
    const systemPrompt = `You are evaluating the accuracy of a hospital recommendation system. Given:
- Original condition: "${conditionInput}"
- Analyzed as: "${analyzedCategory}"
- Number of hospitals recommended: ${recommendedHospitals.length}

Evaluate the recommendation quality and provide:
1. Accuracy Score (1-100): How well the analysis matched the condition
2. Insights: Brief assessment of the recommendation quality
3. Improvement Suggestions: What could be improved

Respond with JSON in this exact format:
{
  "accuracyScore": 85,
  "insights": "Brief insights about the recommendation quality",
  "improvementSuggestions": "Suggestions for improvement"
}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            accuracyScore: { type: "number" },
            insights: { type: "string" },
            improvementSuggestions: { type: "string" },
          },
          required: ["accuracyScore", "insights", "improvementSuggestions"],
        },
      },
      contents: "Evaluate this recommendation",
    });

    const rawJson = response.text;
    console.log(`Gemini Progress Analysis: ${rawJson}`);

    if (rawJson) {
      const data: ProgressInsights = JSON.parse(rawJson);
      return data;
    } else {
      throw new Error("Empty response from Gemini");
    }
  } catch (error) {
    console.error("Gemini progress analysis error:", error);
    throw new Error(`Failed to analyze progress: ${error}`);
  }
}
