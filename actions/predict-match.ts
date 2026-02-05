"use server";

import { model } from "@/lib/gemini";
import { Match } from "@/types/match";

export interface PredictionResult {
    winner: string;
    confidence: number;
    analysis: string;
    key_risk: string;
}

export async function predictMatch(match: Match): Promise<PredictionResult | null> {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.warn("No GEMINI_API_KEY found, returning null to use fallback.");
        return null;
    }

    try {
        console.log(`[Gemini] Predicting match: ${match.homeTeam.name} vs ${match.awayTeam.name}`);
        const prompt = `
      Analyze this football match and provide a betting-style prediction.
      
      Match: ${match.homeTeam.name} vs ${match.awayTeam.name}
      League: ${match.league}
      Date: ${match.utcDate}
      
      Return a JSON object with:
      - winner: (string) Predicted winner name
      - confidence: (number) 0-100 score
      - analysis: (string) A concise 2-sentence tactical analysis. avoid generic phrases. mention specific team styles.
      - key_risk: (string) One short key risk factor (max 5 words).
      
      Response:`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        console.log("[Gemini] Response:", text.substring(0, 50) + "...");

        // Clean up markdown code blocks if present
        const cleanedText = text.replace(/```json/g, "").replace(/```/g, "").trim();

        return JSON.parse(cleanedText) as PredictionResult;
    } catch (error) {
        console.error("Gemini prediction failed:", error);
        return null;
    }
}
