"use client";

import { Match } from "@/types/match";
import { cn } from "@/lib/utils";
import { X, Trophy, TrendingUp, Users, Target } from "lucide-react";

import { PredictionResult } from "@/actions/predict-match";

export function AdvancedStatsModal({ match, prediction, onClose }: { match: Match, prediction: PredictionResult | null, onClose: () => void }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-slate-900 border border-slate-700 w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-200">

                {/* Header */}
                <div className="p-6 bg-slate-950 border-b border-slate-800 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                            <Trophy className="w-4 h-4 text-blue-400" />
                        </div>
                        <h2 className="text-xl font-bold text-white uppercase tracking-wider">Tactical Analysis <span className="text-blue-500">Pro</span></h2>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-full transition-colors">
                        <X className="w-5 h-5 text-slate-400" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">

                    {/* H2H Section */}
                    <div>
                        <h3 className="text-sm font-bold text-slate-400 uppercase mb-3 flex items-center gap-2">
                            <Users className="w-4 h-4" /> Head-to-Head Power
                        </h3>
                        {/* Dynamic H2H Bar */}
                        <div className="h-4 bg-slate-800 rounded-full overflow-hidden flex relative">
                            <div
                                style={{ width: `${prediction ? prediction.h2h_score : 50}%` }}
                                className="h-full bg-blue-500 transition-all duration-1000 ease-out"
                            />
                            <div className="absolute inset-0 flex justify-between px-2 items-center text-[10px] font-bold text-white/80">
                                <span>{match.homeTeam.code}</span>
                                <span>{match.awayTeam.code}</span>
                            </div>
                        </div>
                        <div className="flex justify-between text-xs text-slate-500 mt-1 font-mono">
                            <span>Home Adv.</span>
                            <span>Away Adv.</span>
                        </div>
                    </div>

                    {/* Key Battle */}
                    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
                        <h3 className="text-sm font-bold text-slate-400 uppercase mb-4 flex items-center gap-2">
                            <Target className="w-4 h-4" /> Key Battle
                        </h3>
                        <div className="flex justify-center items-center text-sm gap-4">
                            {prediction ? (
                                <div className="text-lg font-black text-white text-center">
                                    {prediction.key_battle}
                                </div>
                            ) : (
                                <div className="text-slate-500 italic">Analyzing matchups...</div>
                            )}
                        </div>
                    </div>

                    {/* AI Summary */}
                    <div className="space-y-2">
                        <h3 className="text-sm font-bold text-slate-400 uppercase flex items-center gap-2">
                            <TrendingUp className="w-4 h-4" /> Match Simulation logic
                        </h3>
                        {prediction ? (
                            <p className="text-slate-300 text-sm leading-relaxed border-l-2 border-blue-500 pl-3">
                                {prediction.analysis}
                            </p>
                        ) : (
                            <p className="text-slate-500 text-sm italic">Loading analysis...</p>
                        )}
                    </div>

                </div>

                {/* Footer */}
                <div className="p-4 bg-slate-950 border-t border-slate-800 text-center">
                    <span className="text-xs text-slate-500 font-mono">POWERED BY GEMINI ENGINE v2.0</span>
                </div>

            </div>
        </div>
    );
}
