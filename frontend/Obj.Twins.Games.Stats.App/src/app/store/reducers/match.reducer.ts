import { createReducer, on, Action } from '@ngrx/store';
import * as MatchActions from '../actions/match.actions';
import { MatchDetails } from 'src/app/models/match-details';
import { MatchState } from '../state/match-state';

export const matchFeatureKey = 'match';

const intitialState: MatchState = {
    allMatches: [],
    matchDetails: {} as MatchDetails,
    isLoading: false
};

const reducer = createReducer(
    intitialState,
    on(MatchActions.matchListRequested, (state) => ({ ...state, allMatches: intitialState.allMatches, isLoading: true })),
    on(MatchActions.matchListRequestedSuccess, (state, action) => ({ ...state, allMatches: action.response, isLoading: false })),
    on(MatchActions.matchListRequestedFailure, (state) => ({ ...state, isLoading: false })),
    on(MatchActions.matchDetailsRequested, (state) => ({ ...state, isLoading: true, matchDetails: intitialState.matchDetails })),
    on(MatchActions.matchDetailsRequestedSuccess, (state, action) => ({ ...state, matchDetails: action.response, isLoading: false })),
    on(MatchActions.matchDetailsRequestedFailure, (state) => ({ ...state, isLoading: false })),
);

export function matchReducer(state: MatchState | undefined, action: Action): MatchState {
    return reducer(state, action);
}
