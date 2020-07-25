import { createReducer, on, Action } from '@ngrx/store';
import * as StatsActions from '../actions/stats.actions';
import { StatsState } from '../state/stats-state';
import { MatchDetails } from 'src/app/models/match-details';

export const statsFeatureKey = 'stats';

const intitialState: StatsState = {
    matches: [],
    matchDetails: {} as MatchDetails,
    isLoading: false
};

const reducer = createReducer(
    intitialState,
    on(StatsActions.matchListRequested, (state) => ({ ...state, matches: intitialState.matches, isLoading: true })),
    on(StatsActions.matchListRequestedSuccess, (state, action) => ({ ...state, matches: action.response, isLoading: false })),
    on(StatsActions.matchListRequestedFailure, (state) => ({ ...state, isLoading: false })),
    on(StatsActions.matchDetailsRequested, (state) => ({ ...state, isLoading: true, matchDetails: intitialState.matchDetails })),
    on(StatsActions.matchDetailsRequestedSuccess, (state, action) => ({ ...state, matchDetails: action.response, isLoading: false })),
    on(StatsActions.matchDetailsRequestedFailure, (state) => ({ ...state, isLoading: false })),
);

export function playerStatsReducer(state: StatsState | undefined, action: Action): StatsState {
    return reducer(state, action);
}
