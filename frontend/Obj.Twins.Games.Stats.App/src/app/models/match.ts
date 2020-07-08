export interface Match {
    matchId: number;
    firstTeamName: string;
    firstTeamFlag: string;
    firstTeamScore: number;
    secondTeamName: string;
    secondTeamFlag: string;
    secondTeamScore: number;
    map: string;
    matchFinishedAt: Date;
}
