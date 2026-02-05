import { Match } from "@/types/match";
import { MOCK_MATCHES } from "@/lib/mock-data";

export const matchService = {
    getUpcomingMatches: async (): Promise<Match[]> => {
        // Simulating API call
        return new Promise((resolve) => {
            setTimeout(() => resolve(MOCK_MATCHES), 500);
        });
    }
};
