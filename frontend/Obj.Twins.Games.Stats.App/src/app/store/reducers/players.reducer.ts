import { createReducer, Action, on } from '@ngrx/store';
import * as PlayersActions from '../actions/player.actions';
import { PlayersState } from '../state/players-state';
import { SteamStatus } from 'src/app/models/steam-status.enum';

export const playersFeatureKey = 'players';

const intitialState: PlayersState = {
    allPlayers: [],
    playerDetails: {
        id: String(),
        name: String(),
        avatar: String(),
        profileUrl: String(),
        matches: [],
        teams: [],
        kills: [],
        assists: [],
        deaths: [],
        mvps: [],
        scores: [],
        kdRatios: [],
        streak: [],
        matchesPlayed: 0,
        longestWinStreak: 0,
        wins: 0,
        winRate: 0,
        kdRatio: 0,
    },
    isLoading: false,
    isRefreshingStatus: false,
    playerStatus: { status: SteamStatus.Offline, lastOnline: null }
};

const reducer = createReducer(
    intitialState,
    on(PlayersActions.playersStatsRequested, (state) => ({ ...state, allPlayers: intitialState.allPlayers, isLoading: true })),
    on(PlayersActions.playersStatsRequestedSuccess, (state, action) => ({ ...state, allPlayers: action.response, isLoading: false })),
    on(PlayersActions.playersStatsRequestedFailure, (state) => ({ ...state, isLoading: false })),
    on(PlayersActions.playerDetailsRequested, (state) => ({ ...state, playerDetails: intitialState.playerDetails, isLoading: true })),
    on(PlayersActions.playerDetailsRequestedSuccess, (state, action) => ({ ...state, playerDetails: action.response, isLoading: false })),
    on(PlayersActions.playerDetailsRequestedFailure, (state) => ({ ...state, isLoading: false })),
    on(PlayersActions.playerStatusRequested, (state) => ({ ...state, isRefreshingStatus: true })),
    on(PlayersActions.playerStatusRequestedSuccess, (state, action) => (
        { ...state, playerStatus: action.response, isRefreshingStatus: false })),
    on(PlayersActions.playerStatusRequestedFailure, (state) => ({ ...state, isRefreshingStatus: false })),
);

export function playersReducer(state: PlayersState | undefined, action: Action): PlayersState {
    return reducer(state, action);
}
