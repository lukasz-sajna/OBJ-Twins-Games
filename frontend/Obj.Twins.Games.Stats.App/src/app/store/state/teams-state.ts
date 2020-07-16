import { Team } from 'src/app/models/team';

export interface TeamsState {
    allTeams: Team[];
    isLoading: boolean;
}