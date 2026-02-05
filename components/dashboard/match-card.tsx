import { Match } from "@/types/match";
import { type ClassValue } from "clsx";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function MatchCard({ match, className }: { match: Match, className?: ClassValue }) {
    return (
        <Link href={`/match/${match.id}`} className="block">
            <div className={cn("p-4 bg-slate-900 rounded-xl border border-slate-800 hover:border-blue-500 transition-colors cursor-pointer group", className as string)}>
                <div className="flex justify-between items-center text-white mb-4">
                    <div className="flex items-center gap-3">
                        <span className="text-xl font-bold">{match.homeTeam.code}</span>
                        <img src={match.homeTeam.logo} alt={match.homeTeam.name} className="w-8 h-8 object-contain" />
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-xs text-slate-400 font-mono">VS</span>
                        <span className="text-xs text-slate-500">{new Date(match.utcDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <img src={match.awayTeam.logo} alt={match.awayTeam.name} className="w-8 h-8 object-contain" />
                        <span className="text-xl font-bold">{match.awayTeam.code}</span>
                    </div>
                </div>

                {match.probs && (
                    <div className="space-y-1">
                        <div className="flex justify-between text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                            <span>Home {match.probs.home}%</span>
                            <span>Draw {match.probs.draw}%</span>
                            <span>Away {match.probs.away}%</span>
                        </div>
                        <div className="h-1.5 bg-slate-700 rounded-full flex overflow-hidden">
                            <div style={{ width: `${match.probs.home}%` }} className="bg-blue-500 transition-all duration-500 group-hover:bg-blue-400" />
                            <div style={{ width: `${match.probs.draw}%` }} className="bg-slate-500 transition-all duration-500 group-hover:bg-slate-400" />
                            <div style={{ width: `${match.probs.away}%` }} className="bg-red-500 transition-all duration-500 group-hover:bg-red-400" />
                        </div>
                    </div>
                )}
            </div>
        </Link>
    );
}
