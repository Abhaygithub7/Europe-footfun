"use client";

import { Match } from "@/types/match";
import { cn } from "@/lib/utils";
import { Sparkles, TrendingUp, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { AdvancedStatsModal } from "./advanced-stats-modal";
import { useProMode } from "@/context/pro-mode-context";

export function PredictionSlip({ match }: { match: Match }) {
    const { isProMode } = useProMode();
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Mock AI reasoning based on probabilities
    const favorite = match.probs && match.probs.home > match.probs.away ? match.homeTeam : match.awayTeam;
    const confidence = match.probs ? Math.max(match.probs.home, match.probs.away) : 0;
    const isHighConfidence = confidence > 50;

    return (
        <>
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-xl border border-slate-800 p-6 relative overflow-hidden group">
                {/* Glow Effect */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-500/20 transition-all duration-700" />

                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-6 text-blue-400">
                        <Sparkles className="w-5 h-5 animate-pulse" />
                        <span className="text-sm font-bold uppercase tracking-widest">AI Prediction Engine</span>
                    </div>

                    <div className="flex flex-col md:flex-row gap-8 justify-between">
                        {/* Winner Pick */}
                        <div className="flex flex-col gap-2">
                            <span className="text-slate-400 text-xs font-mono uppercase">Projected Winner</span>
                            <div className="text-3xl font-black text-white flex items-center gap-3">
                                {favorite.name}
                                <div className={cn("px-2 py-0.5 rounded text-xs font-bold border", isHighConfidence ? "bg-green-500/20 text-green-400 border-green-500/50" : "bg-yellow-500/20 text-yellow-400 border-yellow-500/50")}>
                                    {confidence}% CONFIDENCE
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
                                        {favorite.name}'s high press is likely to overwhelm {match.probs!.home > match.probs!.away ? match.awayTeam.name : match.homeTeam.name}'s defensive line.
                                        Recent form suggests a high-scoring second half.
                                    </p>
                                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-2">
                                        <AlertTriangle className="w-3 h-3 text-yellow-500" />
                                        <span>Key Risk: Star striker injury doubt</span>
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

            {isModalOpen && <AdvancedStatsModal match={match} onClose={() => setIsModalOpen(false)} />}
        </>
    );
}
