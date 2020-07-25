import { StatsState } from '../state/stats-state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { statsFeatureKey } from '../reducers/stats.reducer';
import { PlayerInfo } from 'src/app/models/player-info';

export const statsFeatureState = createFeatureSelector<StatsState>(statsFeatureKey);

export const isLoadingSelector = createSelector(
    statsFeatureState,
    (stats) => {
        return stats.isLoading;
    }
);

export const matchListSelector = createSelector(
    statsFeatureState,
    (stats) => {
        return stats.matches;
    }
);

export const matchDetailsSelector = createSelector(
    statsFeatureState,
    (stats) => {
        return stats.matchDetails;
    }
);
