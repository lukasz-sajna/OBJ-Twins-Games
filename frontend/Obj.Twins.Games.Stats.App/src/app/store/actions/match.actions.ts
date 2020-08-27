import { createAction, props } from '@ngrx/store';
import {
    MATCH_LIST_REQUESTED,
    MATCH_LIST_REQUESTED_SUCCESS,
    MATCH_LIST_REQUESTED_FAILURE,
    OPEN_MATCH_DETAILS,
    MATCH_DETAILS_REQUESTED,
    MATCH_DETAILS_REQUESTED_FAILURE,
    MATCH_DETAILS_REQUESTED_SUCCESS,
    MATCHES_REFRESH_REQUESTED,
} from './match.action-names';
import { Match } from 'src/app/models/match';
import { MatchDetails } from 'src/app/models/match-details';

export const matchListRequested = createAction(MATCH_LIST_REQUESTED);
export const matchListRequestedSuccess = createAction(MATCH_LIST_REQUESTED_SUCCESS, props<{ response: Match[] }>());
export const matchListRequestedFailure = createAction(MATCH_LIST_REQUESTED_FAILURE, props<{ error: string }>());

export const openMatchDetails = createAction(OPEN_MATCH_DETAILS, props<{ matchId: string }>());

export const matchDetailsRequested = createAction(MATCH_DETAILS_REQUESTED, props<{ matchId: string }>());
export const matchDetailsRequestedSuccess = createAction(MATCH_DETAILS_REQUESTED_SUCCESS, props<{ response: MatchDetails }>());
export const matchDetailsRequestedFailure = createAction(MATCH_DETAILS_REQUESTED_FAILURE, props<{ error: string }>());

export const matchesRefreshRequested = createAction(MATCHES_REFRESH_REQUESTED);
export const matchDetailsRefreshRequested = createAction(MATCH_DETAILS_REQUESTED, props<{ matchId: string }>());
