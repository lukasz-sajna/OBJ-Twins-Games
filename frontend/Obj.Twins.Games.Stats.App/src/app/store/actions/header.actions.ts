import { createAction } from '@ngrx/store';
import { OPEN_MATCHES, OPEN_PLAYERS_STATS, OPEN_TEAMS_STATS } from './header.action-names';

export const openMatches = createAction(OPEN_MATCHES);
export const openPlayersStats = createAction(OPEN_PLAYERS_STATS);
export const openTeamsStats = createAction(OPEN_TEAMS_STATS);
