import { createFeatureSelector, createSelector } from '@ngrx/store';
import { matchFeatureKey } from '../reducers/match.reducer';
import { MatchState } from '../state/match-state';

export const matchesFeatureState = createFeatureSelector<MatchState>(matchFeatureKey);

export const isLoadingSelector = createSelector(
    matchesFeatureState,
    (matches) => {
        return matches.isLoading;
    }
);

export const matchListSelector = createSelector(
    matchesFeatureState,
    (matches) => {
        return matches.allMatches;
    }
);

export const matchDetailsSelector = createSelector(
    matchesFeatureState,
    (matches) => {
        return matches.matchDetails;
    }
);
