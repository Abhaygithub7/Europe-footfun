import { matchService } from "@/services/match-service";
import { MatchHeader } from "@/components/match/match-header";
import { MomentumChart } from "@/components/match/momentum-chart";
import { StatsRadar } from "@/components/match/stats-radar";
import { PredictionSlip } from "@/components/match/prediction-slip";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function MatchPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    // In a real app, we'd fetch by ID. Here we'll just grab the list and find it or default to first mock
    const matches = await matchService.getUpcomingMatches();
    const match = matches.find(m => m.id.toString() === id) || matches[0];

    return (
        <main className="min-h-screen bg-black text-white font-sans pb-20">
            <div className="max-w-7xl mx-auto md:border-x md:border-slate-900 min-h-screen">

                {/* Nav */}
                <div className="p-4 flex items-center border-b border-slate-900">
                    <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                        <span className="font-bold uppercase tracking-wider text-sm">Back to Dashboard</span>
                    </Link>
                </div>

                <MatchHeader match={match} />

                <div className="p-4 md:p-8 space-y-8">
                    {/* Charts */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <MomentumChart />
                        <StatsRadar />
                    </div>

                    {/* Prediction Engine */}
                    <div>
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <span className="w-1 h-6 bg-blue-500 rounded-full" />
                            AI Insights
                        </h3>
                        <PredictionSlip match={match} />
                    </div>
                </div>
            </div>
        </main>
    );
}
