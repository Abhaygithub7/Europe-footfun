"use client";

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';

const data = [
    { subject: 'Attack', A: 120, B: 110, fullMark: 150 },
    { subject: 'Defense', A: 98, B: 130, fullMark: 150 },
    { subject: 'Control', A: 86, B: 130, fullMark: 150 },
    { subject: 'Form', A: 99, B: 100, fullMark: 150 },
    { subject: 'H2H', A: 85, B: 90, fullMark: 150 },
];

export function StatsRadar() {
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
                        name="Home"
                        dataKey="A"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        fill="#3b82f6"
                        fillOpacity={0.4}
                    />
                    <Radar
                        name="Away"
                        dataKey="B"
                        stroke="#ef4444"
                        strokeWidth={2}
                        fill="#ef4444"
                        fillOpacity={0.4}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
}
