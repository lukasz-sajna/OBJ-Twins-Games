import { TeamInMatch } from './team-in-match';
import { TeamInMatchDetails } from './team-in-match-details';

export interface MatchDetails {
    id: string;
    teams: TeamInMatchDetails[];
    map: string;
    demoUrl: string;
    matchFinishedAt: Date;
}
