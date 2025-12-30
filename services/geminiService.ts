
import { GoogleGenAI, Type } from "@google/genai";
import { EXPERTS } from "../constants";

export class GeminiService {
  private getClient() {
    return new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  // Recommend relevant industries based on user query using basic text processing
  async recommendIndustries(query: string) {
    try {
      const ai = this.getClient();
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Given the user's business query: "${query}", identify which consultancy industries from this list are most relevant: Finance & Fintech, AI & Digital Transformation, Legal & Compliance, Sustainability (ESG), Marketing & Strategy. Provide a brief explanation why.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              recommendedIndustries: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              reasoning: { type: Type.STRING }
            },
            required: ["recommendedIndustries", "reasoning"]
          }
        }
      });
      return JSON.parse(response.text || '{}');
    } catch (error) {
      console.error("Gemini Recommendation Error:", error);
      return { recommendedIndustries: [], reasoning: "Unable to process at this time." };
    }
  }

  // Match user problem to specific experts in the registry using advanced reasoning
  async matchExpert(query: string) {
    try {
      const ai = this.getClient();
      // Prepare expert data subset for context
      const expertsData = EXPERTS.map(e => ({
        id: e.id,
        name: e.name,
        title: e.title,
        industry: e.industry,
        specialties: e.specialties,
        description: e.description
      }));

      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `User Objective: "${query}"
        
Available Experts in Registry:
${JSON.stringify(expertsData, null, 2)}

Task: Analyze the user's objective and identify the top 5 most compatible experts from the provided registry list.
For each match, provide:
- expertId: The unique ID of the expert.
- matchScore: A compatibility score from 0 to 100 based on skill overlap.
- reasoning: A specific explanation of why this expert fits the brief.
- suggestedTime: A simulated available time slot (e.g., "Today 15:30" or "Tomorrow 10:00").

Also provide an executiveSummary of the overall matching strategy.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              executiveSummary: { type: Type.STRING },
              matches: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    expertId: { type: Type.STRING },
                    matchScore: { type: Type.NUMBER },
                    reasoning: { type: Type.STRING },
                    suggestedTime: { type: Type.STRING }
                  },
                  required: ["expertId", "matchScore", "reasoning", "suggestedTime"]
                }
              }
            },
            required: ["executiveSummary", "matches"]
          }
        }
      });
      
      const jsonStr = response.text || '{}';
      return JSON.parse(jsonStr);
    } catch (error) {
      console.error("Gemini Match Error:", error);
      return { 
        executiveSummary: "Our matching engine encountered an error while analyzing the registry.", 
        matches: [] 
      };
    }
  }
}

export const geminiService = new GeminiService();
