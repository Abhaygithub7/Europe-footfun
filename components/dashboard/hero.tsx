"use client";

import { Match } from "@/types/match";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";


export function Hero({ featuredMatch }: { featuredMatch: Match }) {
    const [timeLeft, setTimeLeft] = useState("");

    useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = +new Date(featuredMatch.utcDate) - +new Date();

            if (difference > 0) {
                const hours = Math.floor((difference / (1000 * 60 * 60))); // Allow hours > 24 for future matches
                const minutes = Math.floor((difference / 1000 / 60) % 60);
                const seconds = Math.floor((difference / 1000) % 60);
                setTimeLeft(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
            } else {
                setTimeLeft("LIVE");
            }
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);
        return () => clearInterval(timer);
    }, [featuredMatch.utcDate]);

    if (!featuredMatch) return null;

    return (
        <div className="relative w-full h-[400px] rounded-3xl overflow-hidden mb-8 group">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 z-0" />
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 z-0" />

            {/* Content */}
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white">
                <div className="flex items-center gap-8 md:gap-16">
                    {/* Home Team */}
                    <div className="flex flex-col items-center gap-4">
                        <img src={featuredMatch.homeTeam.logo} alt={featuredMatch.homeTeam.name} className="w-24 h-24 md:w-32 md:h-32 object-contain drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
                        <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase">{featuredMatch.homeTeam.name}</h2>
                    </div>

                    {/* VS Badge */}
                    <div className="flex flex-col items-center gap-2">
                        <div className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-500 italic">VS</div>
                        <div className="px-4 py-1 bg-blue-600 rounded-full text-xs font-bold uppercase tracking-widest shadow-[0_0_10px_rgba(37,99,235,0.8)] animate-pulse">
                            Match of the Day
                        </div>
                    </div>

                    {/* Away Team */}
                    <div className="flex flex-col items-center gap-4">
                        <img src={featuredMatch.awayTeam.logo} alt={featuredMatch.awayTeam.name} className="w-24 h-24 md:w-32 md:h-32 object-contain drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]" />
                        <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase">{featuredMatch.awayTeam.name}</h2>
                    </div>
                </div>

                {/* Countdown / Status */}
                <div className="mt-12 flex flex-col items-center gap-2">
                    <span className="text-slate-400 font-mono text-lg">{timeLeft === "LIVE" ? "CURRENTLY" : "KICKOFF IN"}</span>
                    <span className={cn("text-4xl font-bold font-mono", timeLeft === "LIVE" ? "text-red-500 animate-pulse" : "text-white")}>
                        {timeLeft}
                    </span>
                </div>
            </div>
        </div>
    );
}
