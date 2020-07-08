import { MatchDetailsPlayerInfo } from './match-details-player-info';

export interface MatchDetails {
    firstTeamName: string;
    firstTeamFlag: string;
    firstTeamScore: number;
    secondTeamName: string;
    secondTeamFlag: string;
    secondTeamScore: number;
    map: string;
    demoUrl: string;
    firstTeamStats: MatchDetailsPlayerInfo[];
    secondTeamStats: MatchDetailsPlayerInfo[];
}
