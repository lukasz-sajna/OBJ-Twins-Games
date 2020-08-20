import {
    TEAMS_STATS_REQUESTED,
    TEAMS_STATS_REQUESTED_SUCCESS,
    TEAMS_STATS_REQUESTED_FAILURE,
    TEAM_DETAILS_REQUESTED,
    TEAM_DETAILS_REQUESTED_SUCCESS,
    TEAM_DETAILS_REQUESTED_FAILURE,
    OPEN_TEAM_DETAILS,
} from './teams.action-names';
import { createAction, props } from '@ngrx/store';
import { Team } from 'src/app/models/team';
import { TeamDetails } from 'src/app/models/team-details';


export const openTeamDetails = createAction(OPEN_TEAM_DETAILS, props<{ id: string}>());

export const teamsStatsRequested = createAction(TEAMS_STATS_REQUESTED);
export const teamsStatsRequestedSuccess = createAction(TEAMS_STATS_REQUESTED_SUCCESS, props<{ response: Team[] }>());
export const teamsStatsRequestedFailure = createAction(TEAMS_STATS_REQUESTED_FAILURE, props<{ error: string }>());

export const teamDetailsRequested = createAction(TEAM_DETAILS_REQUESTED, props<{ id: string }>());
export const teamDetailsRequestedSuccess = createAction(TEAM_DETAILS_REQUESTED_SUCCESS, props<{ response: TeamDetails }>());
export const teamDetailsRequestedFailure = createAction(TEAM_DETAILS_REQUESTED_FAILURE, props<{ error: string }>());
