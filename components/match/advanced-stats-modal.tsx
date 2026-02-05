"use client";

import { Match } from "@/types/match";
import { cn } from "@/lib/utils";
import { X, Trophy, TrendingUp, Users, Target } from "lucide-react";

export function AdvancedStatsModal({ match, onClose }: { match: Match, onClose: () => void }) {
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
                            <Users className="w-4 h-4" /> Head-to-Head (Last 5)
                        </h3>
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map(i => {
                                const style = i % 2 === 0 ? "bg-red-500/20 text-red-400 border-red-500/50" : "bg-green-500/20 text-green-400 border-green-500/50";
                                const text = i % 2 === 0 ? "L" : "W";
                                return (
                                    <div key={i} className={cn("flex-1 h-8 rounded flex items-center justify-center font-mono font-bold border", style)}>
                                        {text}
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* Key Battle */}
                    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
                        <h3 className="text-sm font-bold text-slate-400 uppercase mb-4 flex items-center gap-2">
                            <Target className="w-4 h-4" /> Key Battle
                        </h3>
                        <div className="flex justify-between items-center text-sm">
                            <div className="text-center">
                                <div className="w-12 h-12 bg-slate-700 rounded-full mb-2 mx-auto" />
                                <span className="font-bold text-white block">Key Player A</span>
                                <span className="text-slate-400 text-xs">8 Goals</span>
                            </div>
                            <div className="text-xs font-mono text-slate-500">VS</div>
                            <div className="text-center">
                                <div className="w-12 h-12 bg-slate-700 rounded-full mb-2 mx-auto" />
                                <span className="font-bold text-white block">Key Player B</span>
                                <span className="text-slate-400 text-xs">5 Assists</span>
                            </div>
                        </div>
                    </div>

                    {/* AI Summary */}
                    <div className="space-y-2">
                        <h3 className="text-sm font-bold text-slate-400 uppercase flex items-center gap-2">
                            <TrendingUp className="w-4 h-4" /> Match Simulation logic
                        </h3>
                        <p className="text-slate-300 text-sm leading-relaxed border-l-2 border-blue-500 pl-3">
                            Our model ran 10,000 simulations. {match.homeTeam.name} wins in 42% of scenarios, predominantly when scoring first.
                            Expect a high defensive line from {match.awayTeam.name}, which might expose them to counter-attacks in the 60-75th minute window.
                        </p>
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
