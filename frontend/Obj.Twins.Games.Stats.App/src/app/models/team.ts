import { TeamInMatch } from './team-in-match';
import { Streak } from './streak';

export interface Team extends TeamInMatch{
    id: string;
    wins: number;
    draws: number;
    loses: number;
    windRatio: number;
    matchesPlayed: number;
    teamStreak: Streak[];
}
