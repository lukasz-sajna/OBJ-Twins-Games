import { TeamsState } from '../state/teams-state';
import { createReducer, Action, on } from '@ngrx/store';
import * as TeamsActions from '../actions/teams.actions';

export const teamsFeatureKey = 'teams';

const intitialState: TeamsState = {
    allTeams: [],
    isLoading: false
};

const reducer = createReducer(
    intitialState,
    on(TeamsActions.teamsStatsRequested, (state) => ({ ...state, allTeams: [], isLoading: true })),
    on(TeamsActions.teamsStatsRequestedSuccess, (state, action) => ({ ...state, allTeams: action.response, isLoading: false })),
    on(TeamsActions.teamsStatsRequestedFailure, (state) => ({ ...state, isLoading: false })),
);

export function teamsReducer(state: TeamsState | undefined, action: Action): TeamsState {
    return reducer(state, action);
}
