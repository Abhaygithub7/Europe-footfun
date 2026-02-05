import { Match } from "@/types/match";
import { cn } from "@/lib/utils";

export function MatchHeader({ match }: { match: Match }) {
    return (
        <div className="relative w-full h-[300px] overflow-hidden flex items-center justify-center bg-slate-900 border-b border-slate-800">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />

            <div className="z-10 flex items-center gap-8 md:gap-24 w-full justify-center px-4">
                {/* Home Team */}
                <div className="flex flex-col items-center gap-4 flex-1 text-right">
                    <img src={match.homeTeam.logo} alt={match.homeTeam.name} className="w-20 h-20 md:w-32 md:h-32 object-contain drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]" />
                    <div className="flex flex-col items-center">
                        <span className="text-4xl md:text-6xl font-black tracking-tighter text-white/10 absolute select-none transform -translate-y-4">{match.homeTeam.code}</span>
                        <span className="text-xl md:text-3xl font-bold relative z-10">{match.homeTeam.name}</span>
                    </div>
                </div>

                {/* Center Status */}
                <div className="flex flex-col items-center shrink-0">
                    <div className="text-4xl md:text-6xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-600 italic">VS</div>
                    <div className={cn(
                        "px-4 py-1 mt-4 text-xs font-mono rounded-full border tracking-widest uppercase",
                        match.status === 'LIVE' ? "bg-red-500/20 text-red-400 border-red-500/50 animate-pulse" : "bg-green-500/20 text-green-400 border-green-500/50"
                    )}>
                        {match.status === 'SCHEDULED' ? new Date(match.utcDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : match.status}
                    </div>
                </div>

                {/* Away Team */}
                <div className="flex flex-col items-center gap-4 flex-1 text-left">
                    <img src={match.awayTeam.logo} alt={match.awayTeam.name} className="w-20 h-20 md:w-32 md:h-32 object-contain drop-shadow-[0_0_15px_rgba(239,68,68,0.3)]" />
                    <div className="flex flex-col items-center">
                        <span className="text-4xl md:text-6xl font-black tracking-tighter text-white/10 absolute select-none transform -translate-y-4">{match.awayTeam.code}</span>
                        <span className="text-xl md:text-3xl font-bold relative z-10">{match.awayTeam.name}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
