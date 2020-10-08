import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PlayersState } from '../state/players-state';
import { playersFeatureKey } from '../reducers/players.reducer';
import { PlayerInfo } from 'src/app/models/player-info';

export const playersFeatureState = createFeatureSelector<PlayersState>(playersFeatureKey);

export const isLoadingSelector = createSelector(
    playersFeatureState,
    (players) => {
        return players.isLoading;
    }
);

export const allPlayersSelector = createSelector(
    playersFeatureState,
    (players) => {
        return players.allPlayers;
    }
);

export const filteredPlayersSelector = createSelector(
    playersFeatureState,
    (players) => {
        return players.filteredPlayers;
    }
)

export const playersStatsPerMatchSelector = createSelector(
    allPlayersSelector,
    (allPlayers) => {
        const playerStatsPerMatch: PlayerInfo[] = [];

        allPlayers.forEach(x => {
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

export const filteredPlayersStatsPerMatchSelector = createSelector(
    filteredPlayersSelector,
    (filteredPlayers) => {
        const playerStatsPerMatch: PlayerInfo[] = [];

        filteredPlayers.forEach(x => {
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

export const playerDetailSelector = createSelector(
    playersFeatureState,
    (players) => {
        return players.playerDetails;
    }
);

export const playerTeamsSelector = createSelector(
    playerDetailSelector,
    (playerDetail) => {
        return playerDetail.teams;
    }
);

export const playerIdSelector = createSelector(
    playerDetailSelector,
    (player) => {
        return player.id;
    }
);

export const playerSteamStatusSelector = createSelector(
    playersFeatureState,
    (players) => {
        return players.playerStatus;
    }
);

export const playersFilterSelector = createSelector(
    playersFeatureState,
    (players) => players.dateRange
)

function avgWithPrecision(value: number, divider: number): number {
    return Number((value / divider).toFixed(2));
}
