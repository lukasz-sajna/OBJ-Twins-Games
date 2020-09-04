import { createReducer, on, Action } from '@ngrx/store';
import * as MatchActions from '../actions/match.actions';
import { MatchDetails } from 'src/app/models/match-details';
import { MatchState } from '../state/match-state';
import { MatchFilter } from 'src/app/models/match-filter';

export const matchFeatureKey = 'match';

const intitialState: MatchState = {
    allMatches: [],
    filteredMatches: [],
    filter: { maps: [], dateRange: { begin: new Date(2000, 1, 1), end: new Date() }, isDefault: true } as MatchFilter,
    matchDetails: {} as MatchDetails,
    isLoading: false
};

const reducer = createReducer(
    intitialState,
    on(MatchActions.matchListRequested, (state) => (
        { ...state, allMatches: intitialState.allMatches, isLoading: true }
    )),
    on(MatchActions.matchListRequestedSuccess, (state, action) => (
        { ...state, allMatches: action.response,  isLoading: false }
    )),
    on(MatchActions.matchListRequestedFailure, (state) => ({ ...state, isLoading: false })),
    on(MatchActions.matchDetailsRequested, (state) => ({ ...state, isLoading: true, matchDetails: intitialState.matchDetails })),
    on(MatchActions.matchDetailsRequestedSuccess, (state, action) => ({ ...state, matchDetails: action.response, isLoading: false })),
    on(MatchActions.matchDetailsRequestedFailure, (state) => ({ ...state, isLoading: false })),
    on(MatchActions.filterChangedRequested, (state, action) => ({...state, filter: action.filter})),
    on(MatchActions.filterMatchesRequestedSucceeded, (state, action) => ({ ...state, filteredMatches: action.filteredMatches }))
);

export function matchReducer(state: MatchState | undefined, action: Action): MatchState {
    return reducer(state, action);
}
