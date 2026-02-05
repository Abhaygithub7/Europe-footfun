export interface Team {
    id: number;
    name: string;
    logo: string;
    code: string;
}

export interface Match {
    id: number;
    homeTeam: Team;
    awayTeam: Team;
    utcDate: string;
    status: 'SCHEDULED' | 'LIVE' | 'FINISHED';
    league: 'PL' | 'PD' | 'SA' | 'BL1' | 'FL1' | 'CL';
    score?: {
        fullTime: { home: number | null; away: number | null };
    };
    probs?: {
        home: number;
        draw: number;
        away: number;
    };
}
