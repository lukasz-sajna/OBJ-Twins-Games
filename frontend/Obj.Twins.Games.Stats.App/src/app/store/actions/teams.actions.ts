import { TEAMS_STATS_REQUESTED, TEAMS_STATS_REQUESTED_SUCCESS, TEAMS_STATS_REQUESTED_FAILURE } from './teams.action-names';
import { createAction, props } from '@ngrx/store';
import { Team } from 'src/app/models/team';

export const teamsStatsRequested = createAction(TEAMS_STATS_REQUESTED);
export const teamsStatsRequestedSuccess = createAction(TEAMS_STATS_REQUESTED_SUCCESS, props<{ response: Team[] }>());
export const teamsStatsRequestedFailure = createAction(TEAMS_STATS_REQUESTED_FAILURE, props<{ error: string }>());