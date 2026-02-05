import { matchService } from "@/services/match-service";
import { MatchCard } from "@/components/dashboard/match-card";
import { Hero } from "@/components/dashboard/hero";

export default async function Home() {
  const matches = await matchService.getUpcomingMatches();
  const featuredMatch = matches[0]; // Just picking the first one for now

  return (
    <main className="min-h-screen bg-black text-white p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold tracking-tighter flex items-center gap-2">
            <span className="text-blue-500">EUROPE</span>
            <span className="italic">FOOTFUN</span>
          </h1>
          <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700" />
        </header>

        <Hero featuredMatch={featuredMatch} />

        <div className="mt-12">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <span className="w-1 h-6 bg-blue-500 rounded-full" />
            Upcoming Matches
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {matches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
