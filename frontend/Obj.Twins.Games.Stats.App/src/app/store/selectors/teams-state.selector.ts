import { TeamsState } from '../state/teams-state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { teamsFeatureKey } from '../reducers/teams.reducer';

export const teamsFeatureState = createFeatureSelector<TeamsState>(teamsFeatureKey);

export const isLoadingSelector = createSelector(
    teamsFeatureState,
    (teams) => {
        return teams.isLoading;
    }
);

export const allTeamsSelector = createSelector(
    teamsFeatureState,
    (teams) => {
        return teams.allTeams;
    }
);

export const teamDetailSelector = createSelector(
    teamsFeatureState,
    (teams) => {
        return teams.teamDetails;
    }
);

export const teamPlayersDetailsSelector = createSelector(
    teamsFeatureState,
    (teams) => {
        if (teams.teamDetails.players.length > 0) {
            return teams.teamDetails.players;
        }
    }
);


