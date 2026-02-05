"use client";

import { Match } from "@/types/match";
import { MatchCard } from "./match-card";
import { useState } from "react";
import { ChevronDown, ChevronUp, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

export function LeagueGroup({ league, matches }: { league: string, matches: Match[] }) {
    const [isOpen, setIsOpen] = useState(true);

    // Map league codes to friendly names
    const leagueNames: Record<string, string> = {
        'PL': 'Premier League',
        'PD': 'La Liga',
        'SA': 'Serie A',
        'BL1': 'Bundesliga',
        'FL1': 'Ligue 1',
        'CL': 'Champions League',
        'EC': 'Euro Championship',
        'WC': 'World Cup',
    };

    const leagueName = leagueNames[league] || league;

    return (
        <div className="mb-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-4 bg-slate-900/50 hover:bg-slate-900 border-b border-slate-800 rounded-t-xl transition-colors group"
            >
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Trophy className="w-4 h-4 text-yellow-500" />
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">{leagueName}</h3>
                    <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full">{matches.length}</span>
                </div>
                {isOpen ? <ChevronUp className="w-5 h-5 text-slate-500" /> : <ChevronDown className="w-5 h-5 text-slate-500" />}
            </button>

            <div className={cn(
                "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 border-x border-b border-slate-900/50 rounded-b-xl transition-all duration-300 origin-top",
                isOpen ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0 h-0 p-0 overflow-hidden"
            )}>
                {matches.map(match => (
                    <MatchCard key={match.id} match={match} />
                ))}
            </div>
        </div>
    );
}
