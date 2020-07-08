import { createAction } from '@ngrx/store';
import { OPEN_MATCHES, OPEN_PLAYERS_STATS } from './header.action-names';

export const openMatches = createAction(OPEN_MATCHES);
export const openPlayersStats = createAction(OPEN_PLAYERS_STATS);
