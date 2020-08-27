import { TeamInMatch } from './team-in-match';
import { PlayerInfo } from './player-info';

export interface TeamInMatchDetails extends TeamInMatch {
    players: PlayerInfo[];
}
