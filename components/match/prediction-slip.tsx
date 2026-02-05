"use client";

import { Match } from "@/types/match";
import { cn } from "@/lib/utils";
import { Sparkles, TrendingUp, AlertTriangle, Bookmark, CheckCircle, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { AdvancedStatsModal } from "./advanced-stats-modal";
import { useProMode } from "@/context/pro-mode-context";
import { useAuth } from "@/context/auth-context";
import { predictMatch, PredictionResult } from "@/actions/predict-match";

export function PredictionSlip({ match }: { match: Match }) {
    const { isProMode } = useProMode();
    const { isAuthenticated } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    // AI State
    const [aiPrediction, setAiPrediction] = useState<PredictionResult | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPrediction = async () => {
            setIsLoading(true);
            try {
                // Try to get real prediction
                const result = await predictMatch(match);
                if (result) {
                    setAiPrediction(result);
                } else {
                    // Fallback to mock logic if no API key or error
                    const favorite = match.probs && match.probs.home > match.probs.away ? match.homeTeam : match.awayTeam;
                    const confidence = match.probs ? Math.max(match.probs.home, match.probs.away) : 0;
                    setAiPrediction({
                        winner: favorite.name,
                        confidence,
                        analysis: `${favorite.name}'s high press is likely to overwhelm ${match.probs!.home > match.probs!.away ? match.awayTeam.name : match.homeTeam.name}'s defensive line. Recent form suggests a high-scoring second half.`,
                        key_risk: "Star striker injury doubt",
                        key_battle: `${favorite.name} Attack vs Defense`,
                        h2h_score: 55
                    });
                }
            } catch (error) {
                console.error("Prediction error:", error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchPrediction();
    }, [match]);

    const handleSave = async () => {
        setIsSaved(true);

        // Hybrid Logic: Save to DB if real auth, else just mock
        try {
            // @ts-ignore - extended context type
            const { supabase, user } = useAuth();

            if (supabase && user) {
                const { error } = await supabase
                    .from('predictions')
                    .insert({
                        user_id: (await supabase.auth.getUser()).data.user?.id,
                        match_id: match.id,
                        home_team: match.homeTeam.name,
                        away_team: match.awayTeam.name,
                        predicted_winner: aiPrediction?.winner || "Unknown",
                        confidence: aiPrediction?.confidence || 0,
                        ai_analysis: aiPrediction?.analysis
                    });

                if (error) {
                    console.error("Failed to save to DB:", error);
                    // Check for "row level security" or "relation does not exist" which means tables aren't set up
                }
            }
        } catch (e) {
            console.error("Save error:", e);
        }

        setTimeout(() => setIsSaved(false), 3000);
    };

    if (isLoading) {
        return (
            <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 flex flex-col items-center justify-center min-h-[300px] animate-pulse">
                <Loader2 className="w-8 h-8 text-blue-500 animate-spin mb-4" />
                <p className="text-slate-500 font-mono text-sm uppercase">Analyzing Match Data...</p>
            </div>
        )
    }

    const isHighConfidence = (aiPrediction?.confidence || 0) > 50;

    return (
        <>
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-xl border border-slate-800 p-6 relative overflow-hidden group">
                {/* Glow Effect */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-500/20 transition-all duration-700" />

                <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2 text-blue-400">
                            <Sparkles className="w-5 h-5 animate-pulse" />
                            <span className="text-sm font-bold uppercase tracking-widest">AI Prediction Engine</span>
                        </div>

                        {isAuthenticated ? (
                            <button
                                onClick={handleSave}
                                disabled={isSaved}
                                className={cn(
                                    "text-xs font-bold uppercase tracking-wider flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all",
                                    isSaved ? "bg-green-500/20 text-green-400 border-green-500/50" : "bg-slate-800 text-slate-400 border-slate-700 hover:text-white"
                                )}
                            >
                                {isSaved ? <CheckCircle className="w-3 h-3" /> : <Bookmark className="w-3 h-3" />}
                                {isSaved ? "Saved" : "Save Prediction"}
                            </button>
                        ) : (
                            <span className="text-xs text-slate-500 font-mono">LOGIN TO SAVE</span>
                        )}
                    </div>

                    <div className="flex flex-col md:flex-row gap-8 justify-between">
                        {/* Winner Pick */}
                        <div className="flex flex-col gap-2">
                            <span className="text-slate-400 text-xs font-mono uppercase">Projected Winner</span>
                            <div className="text-3xl font-black text-white flex items-center gap-3">
                                {aiPrediction?.winner}
                                <div className={cn("px-2 py-0.5 rounded text-xs font-bold border", isHighConfidence ? "bg-green-500/20 text-green-400 border-green-500/50" : "bg-yellow-500/20 text-yellow-400 border-yellow-500/50")}>
                                    {aiPrediction?.confidence}% CONFIDENCE
                                </div>
                            </div>
                        </div>

                        {/* AI Insight */}
                        <div className="flex-1 bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                            <div className="flex items-start gap-3">
                                <TrendingUp className="w-5 h-5 text-blue-400 mt-0.5" />
                                <div className="space-y-1">
                                    <p className="text-sm text-slate-200 leading-relaxed">
                                        <span className="font-semibold text-blue-300">Tactical Edge: </span>
                                        {aiPrediction?.analysis}
                                    </p>
                                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-2">
                                        <AlertTriangle className="w-3 h-3 text-yellow-500" />
                                        <span>Key Risk: {aiPrediction?.key_risk}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Button */}
                    <button
                        onClick={() => setIsModalOpen(true)}
                        disabled={!isProMode}
                        className={cn(
                            "mt-8 w-full py-4 font-bold rounded-lg uppercase tracking-wider transition-all",
                            isProMode
                                ? "bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)]"
                                : "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700"
                        )}
                    >
                        {isProMode ? "Generate Detailed Report" : "Enable Pro Mode to Unlock Report"}
                    </button>
                </div>
            </div>

            {isModalOpen && <AdvancedStatsModal match={match} prediction={aiPrediction} onClose={() => setIsModalOpen(false)} />}
        </>
    );
}
