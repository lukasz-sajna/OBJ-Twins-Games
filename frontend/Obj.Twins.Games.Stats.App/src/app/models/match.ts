import { TeamInMatch } from './team-in-match';
import { MatchResult } from './match-result.enum';

export interface Match {
    id: string;
    teams: TeamInMatch[];
    map: string;
    matchFinishedAt: Date;
}
