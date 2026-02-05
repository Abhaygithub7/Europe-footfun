import { Match } from "@/types/match";

export const MOCK_MATCHES: Match[] = [
    {
        id: 1,
        homeTeam: { id: 61, name: "Chelsea", logo: "https://crests.football-data.org/61.png", code: "CHE" },
        awayTeam: { id: 57, name: "Arsenal", logo: "https://crests.football-data.org/57.png", code: "ARS" },
        utcDate: new Date(Date.now() + 86400000).toISOString(),
        status: 'SCHEDULED',
        league: 'PL',
        probs: { home: 35, draw: 25, away: 40 }
    },
    {
        id: 2,
        homeTeam: { id: 86, name: "Real Madrid", logo: "https://crests.football-data.org/86.png", code: "RMA" },
        awayTeam: { id: 81, name: "Barcelona", logo: "https://crests.football-data.org/81.png", code: "FCB" },
        utcDate: new Date(Date.now() + 172800000).toISOString(),
        status: 'SCHEDULED',
        league: 'PD',
        probs: { home: 45, draw: 30, away: 25 }
    }
];
