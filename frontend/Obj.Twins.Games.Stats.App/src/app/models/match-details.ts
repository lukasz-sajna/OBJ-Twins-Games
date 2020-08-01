import { TeamInMatch } from './team-in-match';
import { TeamInMatchDetails } from './team-in-match-details';

export interface MatchDetails {
    id: string;
    teams: TeamInMatchDetails[];
    map: string;
    demuUrl: string;
    matchFinishedAt: Date;
}
