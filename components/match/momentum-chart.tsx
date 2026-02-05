"use client";

import { Match } from "@/types/match";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

function pseudoRandom(seed: number) {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
}

function generateMomentum(homeId: number, awayId: number) {
    const data = [];
    let currentValue = 0;

    // Generate 10 data points (every 10 mins)
    for (let i = 0; i <= 90; i += 10) {
        // Seed based on team IDs and minute to be consistent but unique per match
        const seed = homeId + awayId + i;
        const randomShift = (pseudoRandom(seed) * 40) - 20; // Shift between -20 and +20

        // Add momentum based on randomness but slightly weighted
        currentValue += randomShift;

        // Clamp between -60 and 60
        currentValue = Math.max(-55, Math.min(55, currentValue));

        data.push({ minute: i, value: Math.floor(currentValue) });
    }
    return data;
}

export function MomentumChart({ match }: { match?: Match }) {
    if (!match) return null;

    const data = generateMomentum(match.homeTeam.id, match.awayTeam.id);

    return (
        <div className="w-full h-[300px] bg-slate-900 rounded-xl p-4 border border-slate-800">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <span className="w-1 h-5 bg-green-500 rounded-full" />
                Match Momentum
            </h3>
            <ResponsiveContainer width="100%" height="90%">
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorValueNeg" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="minute" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis hide domain={[-60, 60]} />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#fff' }}
                        formatter={(value: number | undefined) => {
                            const val = value ?? 0;
                            return [Math.abs(val), val > 0 ? `${match.homeTeam.code} Pressure` : `${match.awayTeam.code} Pressure`];
                        }}
                    />
                    <ReferenceLine y={0} stroke="#334155" strokeDasharray="3 3" />
                    <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#3b82f6"
                        fill="url(#colorValue)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
