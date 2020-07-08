import { createAction, props } from '@ngrx/store';
import {
    PLAYERS_STATS_REQUESTED,
    PLAYERS_STATS_REQUESTED_SUCCESS,
    PLAYERS_STATS_REQUESTED_FAILURE,
    MATCH_LIST_REQUESTED,
    MATCH_LIST_REQUESTED_SUCCESS,
    MATCH_LIST_REQUESTED_FAILURE,
    OPEN_MATCH_DETAILS,
    MATCH_DETAILS_REQUESTED,
    MATCH_DETAILS_REQUESTED_FAILURE,
    MATCH_DETAILS_REQUESTED_SUCCESS,
} from './stats.action-names';
import { PlayerInfo } from 'src/app/models/player-info';
import { Match } from 'src/app/models/match';
import { MatchDetails } from 'src/app/models/match-details';

export const playersStatsRequested = createAction(PLAYERS_STATS_REQUESTED);
export const playersStatsRequestedSuccess = createAction(PLAYERS_STATS_REQUESTED_SUCCESS, props<{ response: PlayerInfo[] }>());
export const playersStatsRequestedFailure = createAction(PLAYERS_STATS_REQUESTED_FAILURE, props<{ error: string }>());

export const matchListRequested = createAction(MATCH_LIST_REQUESTED);
export const matchListRequestedSuccess = createAction(MATCH_LIST_REQUESTED_SUCCESS, props<{ response: Match[] }>());
export const matchListRequestedFailure = createAction(MATCH_LIST_REQUESTED_FAILURE, props<{ error: string }>());

export const openMatchDetails = createAction(OPEN_MATCH_DETAILS, props<{ matchId: number }>());

export const matchDetailsRequested = createAction(MATCH_DETAILS_REQUESTED, props<{ matchId: number }>());
export const matchDetailsRequestedSuccess = createAction(MATCH_DETAILS_REQUESTED_SUCCESS, props<{ response: MatchDetails }>());
export const matchDetailsRequestedFailure = createAction(MATCH_DETAILS_REQUESTED_FAILURE, props<{ error: string }>());
