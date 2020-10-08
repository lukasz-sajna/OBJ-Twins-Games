import { createAction, props } from '@ngrx/store';
import { DateRange } from 'src/app/models/date-range';
import { PlayerDetails } from 'src/app/models/player-details';
import { PlayerInfo } from 'src/app/models/player-info';
import { PlayerSteamStatus } from 'src/app/models/player-steam-status';
import { OPEN_PLAYER_DETAILS, PLAYERS_REFRESH_REQUESTED, PLAYERS_STATS_REQUESTED, PLAYERS_STATS_REQUESTED_FAILURE, PLAYERS_STATS_REQUESTED_SUCCESS, PLAYER_DETAILS_REFRESH_REQUESTED, PLAYER_DETAILS_REQUESTED, PLAYER_DETAILS_REQUESTED_FAILURE, PLAYER_DETAILS_REQUESTED_SUCCESS, PLAYER_STATUS_REQUESTED, PLAYER_STATUS_REQUESTED_FAILURE, PLAYER_STATUS_REQUESTED_SUCCESS } from './player.action-names';

export const openPlayerDetails = createAction(OPEN_PLAYER_DETAILS, props<{ id: string}>());

export const playersStatsRequested = createAction(PLAYERS_STATS_REQUESTED);
export const playersStatsRequestedSuccess = createAction(PLAYERS_STATS_REQUESTED_SUCCESS, props<{ response: PlayerInfo[] }>());
export const playersStatsRequestedFailure = createAction(PLAYERS_STATS_REQUESTED_FAILURE, props<{ error: string }>());

export const playerDetailsRequested = createAction(PLAYER_DETAILS_REQUESTED, props<{playerId: string}>());
export const playerDetailsRequestedSuccess = createAction(PLAYER_DETAILS_REQUESTED_SUCCESS, props<{ response: PlayerDetails }>());
export const playerDetailsRequestedFailure = createAction(PLAYER_DETAILS_REQUESTED_FAILURE, props<{ error: string }>());

export const playerStatusRequested = createAction(PLAYER_STATUS_REQUESTED, props<{id: string}>());
export const playerStatusRequestedSuccess = createAction(PLAYER_STATUS_REQUESTED_SUCCESS, props<{ response: PlayerSteamStatus }>());
export const playerStatusRequestedFailure = createAction(PLAYER_STATUS_REQUESTED_FAILURE, props<{ error: string }>());

export const playersRefreshRequested = createAction(PLAYERS_REFRESH_REQUESTED);
export const playerDetailsRefreshRequested = createAction(PLAYER_DETAILS_REFRESH_REQUESTED, props<{playerId: string}>());

export const playersStatsFilterChanged = createAction('Players_Stats_Filter_Changed', props<{dateRange: DateRange}>());
export const filteredPlayersStatsRequestedSucceeded = createAction('Filtered_Players_Stats_Fetch_Succeeded', props<{ response: PlayerInfo[] }>());
