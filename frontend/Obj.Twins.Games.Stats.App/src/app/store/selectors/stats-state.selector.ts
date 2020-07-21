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

export const playersStatsSelector = createSelector(
    statsFeatureState,
    (stats) => {
        return stats.players;
    }
);

export const playersStatsPerMatchSelector = createSelector(
    statsFeatureState,
    (stats) => {
        const playerStatsPerMatch: PlayerInfo[] = [];

        stats.players.forEach(x => {
            playerStatsPerMatch.push(
                {
                    id: x.id,
                    kills: avgWithPrecision(x.kills, x.matchesPlayed),
                    assists: avgWithPrecision(x.assists, x.matchesPlayed),
                    deaths: avgWithPrecision(x.deaths, x.matchesPlayed),
                    kdRatio: x.kdRatio,
                    mvp: avgWithPrecision(x.mvp, x.matchesPlayed),
                    score: avgWithPrecision(x.score, x.matchesPlayed),
                    matchesPlayed: x.matchesPlayed,
                    name: x.name,
                    avatar: x.avatar
                }
            );
        });

        return playerStatsPerMatch;
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

function avgWithPrecision(value: number, divider: number): number {
    return Number((value / divider).toFixed(2));
}
