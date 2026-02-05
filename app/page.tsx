import { matchService } from "@/services/match-service";
import { Hero } from "@/components/dashboard/hero";
import { DateStrip } from "@/components/dashboard/date-strip";
import { LeagueGroup } from "@/components/dashboard/league-group";
import { Match } from "@/types/match";
import { ProToggle } from "@/components/dashboard/pro-toggle";

export const dynamic = 'force-dynamic'; // Force dynamic for search params

interface HomeProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function Home({ searchParams }: HomeProps) {
  const resolvedParams = await searchParams;
  const date = typeof resolvedParams.date === 'string' ? resolvedParams.date : undefined;

  const matches = await matchService.getUpcomingMatches(date);

  // Find featured match (e.g., biggest match or first match)
  const featuredMatch = matches.length > 0 ? matches[0] : null;

  // Group matches by league
  const groupedMatches = matches.reduce((acc, match) => {
    if (!acc[match.league]) {
      acc[match.league] = [];
    }
    acc[match.league].push(match);
    return acc;
  }, {} as Record<string, Match[]>);

  return (
    <main className="min-h-screen bg-black text-white font-sans">
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <header className="flex justify-between items-center mb-8">
          <div className="flex flex-col">
            <h1 className="text-2xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              MATCH PREDICTOR
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <ProToggle />
            <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center border border-slate-700">
              <span className="font-bold">JS</span>
            </div>
          </div>
        </header>

        {/* Show Hero only on default view or if matches exist */}
        {(!date || matches.length > 0) && featuredMatch && <Hero featuredMatch={featuredMatch} />}

        <div className="mt-12">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            Match Calendar
          </h2>

          <DateStrip />

          {/* League Groups */}
          <div className="space-y-4">
            {Object.keys(groupedMatches).length > 0 ? (
              Object.entries(groupedMatches).map(([league, leagueMatches]) => (
                <LeagueGroup key={league} league={league} matches={leagueMatches} />
              ))
            ) : (
              <div className="text-center py-20 text-slate-500 border border-dashed border-slate-800 rounded-xl">
                <p className="text-lg">No matches scheduled for this date.</p>
                <p className="text-sm">Try checking the weekend!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
