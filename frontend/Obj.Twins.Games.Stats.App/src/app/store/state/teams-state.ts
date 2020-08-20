import { Team } from 'src/app/models/team';
import { TeamDetails } from 'src/app/models/team-details';

export interface TeamsState {
    allTeams: Team[];
    teamDetails: TeamDetails;
    isLoading: boolean;
}
