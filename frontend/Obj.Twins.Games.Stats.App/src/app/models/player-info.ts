import { PlayerInTeam } from './player-in-team';

export interface PlayerInfo extends PlayerInTeam {
    kills: number;
    assists: number;
    deaths: number;
    mvp: number;
    matchesPlayed: number;
    kdRatio: number;
    score: number;
}
