import { TeamsState } from '../state/teams-state';
import { createReducer, Action, on } from '@ngrx/store';
import * as TeamsActions from '../actions/teams.actions';

export const teamsFeatureKey = 'teams';

const intitialState: TeamsState = {
    allTeams: [],
    teamDetails: {
        name: String(),
        flag: String(),
        wins: 0,
        draws: 0,
        loses: 0,
        winRatio: 0,
        matchesPlayed: 0,
        longestWinStreak: 0,
        streak: [],
        matches: [],
        players: [{
            id: String(),
            name: String(),
            avatar: String(),
            kills: 0,
            assists: 0,
            deaths: 0,
            mvp: 0,
            score: 0,
            kdRatio: 0,
            matchesPlayed: 0,
        }]
    },
    isLoading: false
};

const reducer = createReducer(
    intitialState,
    on(TeamsActions.teamsStatsRequested, (state) => ({ ...state, allTeams: [], isLoading: true })),
    on(TeamsActions.teamsStatsRequestedSuccess, (state, action) => ({ ...state, allTeams: action.response, isLoading: false })),
    on(TeamsActions.teamsStatsRequestedFailure, (state) => ({ ...state, isLoading: false })),
    on(TeamsActions.teamDetailsRequested, (state) => ({ ...state, teamDetails: intitialState.teamDetails, isLoading: true })),
    on(TeamsActions.teamDetailsRequestedSuccess, (state, action) => ({ ...state, teamDetails: action.response, isLoading: false })),
    on(TeamsActions.teamDetailsRequestedFailure, (state) => ({ ...state, isLoading: false })),
);

export function teamsReducer(state: TeamsState | undefined, action: Action): TeamsState {
    return reducer(state, action);
}
