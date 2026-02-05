import { Match } from "@/types/match";
import { MOCK_MATCHES } from "@/lib/mock-data";
import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_FOOTBALL_DATA_API_KEY;
const BASE_URL = "https://api.football-data.org/v4";

export const matchService = {
    getUpcomingMatches: async (date?: string): Promise<Match[]> => {
        if (!API_KEY) {
            console.warn("No API key found, using mock data");
            return Promise.resolve(MOCK_MATCHES);
        }

        try {
            // Fetch matches from top leagues (PL, PD, SA, BL1, FL1, CL, EC, WC)
            // Getting matches for the specific date or next 7 days if no date
            const dateFrom = date || new Date().toISOString().split('T')[0];
            const dateTo = date || new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0];

            const response = await axios.get(`${BASE_URL}/matches`, {
                headers: {
                    'X-Auth-Token': API_KEY
                },
                params: {
                    competitions: 'PL,PD,SA,BL1,FL1,CL,EC,WC',
                    dateFrom,
                    dateTo,
                }
            });

            const matches = response.data.matches.map((m: any) => ({
                id: m.id,
                homeTeam: {
                    id: m.homeTeam.id,
                    name: m.homeTeam.shortName || m.homeTeam.name,
                    logo: m.homeTeam.crest,
                    code: m.homeTeam.tla || m.homeTeam.shortName?.substring(0, 3).toUpperCase() || "HOM"
                },
                awayTeam: {
                    id: m.awayTeam.id,
                    name: m.awayTeam.shortName || m.awayTeam.name,
                    logo: m.awayTeam.crest,
                    code: m.awayTeam.tla || m.awayTeam.shortName?.substring(0, 3).toUpperCase() || "AWY"
                },
                utcDate: m.utcDate,
                status: m.status === 'IN_PLAY' || m.status === 'PAUSED' ? 'LIVE' : m.status,
                league: m.competition.code,
                score: {
                    fullTime: {
                        home: m.score.fullTime.home,
                        away: m.score.fullTime.away
                    }
                },
                // Generating probabilities based on odds would go here, 
                // for now we'll simulate them slightly based on current standings/form if available
                // or just mock them for visualization
                probs: {
                    home: Math.floor(Math.random() * 30) + 30,
                    draw: Math.floor(Math.random() * 20) + 20,
                    away: Math.floor(Math.random() * 30) + 10,
                }
            }));

            // Strict filtering primarily for the date view to avoid timezone bleeds
            if (date) {
                return matches.filter((m: any) => m.utcDate.startsWith(date));
            }

            return matches; // Return empty array if no matches, don't fallback to MOCK unless error to allow "No matches" state

        } catch (error) {
            console.error("Error fetching matches:", error);
            return Promise.resolve(MOCK_MATCHES); // Fallback on error
        }
    }
};
