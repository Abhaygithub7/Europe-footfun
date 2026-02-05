"use client";

import { Match } from "@/types/match";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';

// Simple seeded random to keep stats consistent for the same team across reloads
function pseudoRandom(seed: number) {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
}

function generateTeamStats(id: number) {
    const r = (offset: number) => 50 + Math.floor(pseudoRandom(id + offset) * 100); // 50-150 range

    return {
        attack: r(1),
        defense: r(2),
        control: r(3),
        form: r(4),
        h2h: r(5)
    };
}

export function StatsRadar({ match }: { match?: Match }) { // Optional match for safety
    if (!match) return null;

    const homeStats = generateTeamStats(match.homeTeam.id);
    const awayStats = generateTeamStats(match.awayTeam.id);

    const data = [
        { subject: 'Attack', A: homeStats.attack, B: awayStats.attack, fullMark: 150 },
        { subject: 'Defense', A: homeStats.defense, B: awayStats.defense, fullMark: 150 },
        { subject: 'Control', A: homeStats.control, B: awayStats.control, fullMark: 150 },
        { subject: 'Form', A: homeStats.form, B: awayStats.form, fullMark: 150 },
        { subject: 'H2H', A: homeStats.h2h, B: awayStats.h2h, fullMark: 150 },
    ];

    return (
        <div className="w-full h-[300px] bg-slate-900 rounded-xl p-4 border border-slate-800">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <span className="w-1 h-5 bg-purple-500 rounded-full" />
                Team Attributes
            </h3>
            <ResponsiveContainer width="100%" height="90%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                    <PolarGrid stroke="#334155" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                    <Radar
                        name={match.homeTeam.code}
                        dataKey="A"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        fill="#3b82f6"
                        fillOpacity={0.4}
                    />
                    <Radar
                        name={match.awayTeam.code}
                        dataKey="B"
                        stroke="#ef4444"
                        strokeWidth={2}
                        fill="#ef4444"
                        fillOpacity={0.4}
                    />
                </RadarChart>
            </ResponsiveContainer>

            {/* Legend */}
            <div className="flex justify-center gap-6 mt-2 pb-2">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500/50 border border-blue-500" />
                    <span className="text-xs text-slate-400 font-bold">{match.homeTeam.code}</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/50 border border-red-500" />
                    <span className="text-xs text-slate-400 font-bold">{match.awayTeam.code}</span>
                </div>
            </div>
        </div>
    );
}
