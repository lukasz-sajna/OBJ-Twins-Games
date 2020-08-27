import { Streak } from './streak';
import { Match } from './match';
import { PlayerInfo } from './player-info';

export interface TeamDetails {
    name: string;
    flag: string;
    wins: number;
    draws: number;
    loses: number;
    winRatio: number;
    matchesPlayed: number;
    longestWinStreak: number;
    streak: Streak[];
    matches: Match[];
    players: PlayerInfo[];
}
