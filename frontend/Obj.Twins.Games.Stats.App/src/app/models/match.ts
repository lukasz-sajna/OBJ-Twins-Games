import { Team } from './team';

export interface Match {
    id: string;
    teams: Team[];
    map: string;
    matchFinishedAt: Date;
}
