import { matchService } from "@/services/match-service";
import { MatchHeader } from "@/components/match/match-header";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function MatchPage({ params }: { params: { id: string } }) {
    // In a real app, we'd fetch by ID. Here we'll just grab the list and find it or default to first mock
    const matches = await matchService.getUpcomingMatches();
    const match = matches.find(m => m.id.toString() === params.id) || matches[0];

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

                <div className="p-4 md:p-8 space-y-12">
                    <div className="text-center text-slate-500 py-12">
                        Visualization content coming soon...
                    </div>
                </div>
            </div>
        </main>
    );
}
