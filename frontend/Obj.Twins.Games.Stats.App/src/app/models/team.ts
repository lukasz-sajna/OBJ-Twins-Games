import { TeamInMatch } from './team-in-match';
import { Streak } from './streak';
import { PlayerInTeam } from './player-in-team';

export interface Team extends TeamInMatch {
    id: string;
    wins: number;
    draws: number;
    loses: number;
    windRatio: number;
    matchesPlayed: number;
    streak: Streak[];
    players: PlayerInTeam[];
}
