"use client";

import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

const data = [
    { minute: 0, value: 0 },
    { minute: 10, value: 15 },
    { minute: 20, value: -10 },
    { minute: 30, value: 25 },
    { minute: 40, value: 40 },
    { minute: 50, value: 10 },
    { minute: 60, value: -20 },
    { minute: 70, value: -35 },
    { minute: 80, value: 10 },
    { minute: 90, value: 50 },
];

export function MomentumChart() {
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
                            return [Math.abs(val), val > 0 ? 'Home Pressure' : 'Away Pressure'];
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
