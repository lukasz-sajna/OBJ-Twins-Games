import { TeamInMatch } from './team-in-match';

export interface Match {
    id: string;
    teams: TeamInMatch[];
    map: string;
    matchFinishedAt: Date;
}
