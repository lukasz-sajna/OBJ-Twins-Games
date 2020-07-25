import { Streak } from './streak';
import { Statistic } from './statistic';
import { PlayerMatch } from './player-match';
import { Team } from './team';
import { PlayerSteamStatus } from './player-steam-status';

export interface PlayerDetails {
    id: string;
    name: string;
    avatar: string;
    profileUrl: string;
    matches: PlayerMatch[];
    teams: Team[];
    kills: Statistic[];
    assists: Statistic[];
    deaths: Statistic[];
    mvps: Statistic[];
    scores: Statistic[];
    kdRatios: Statistic[];
    streak: Streak[];
    matchesPlayed: number;
    longestWinStreak: number;
    wins: number;
    winRate: number;
    kdRatio: number;
}
