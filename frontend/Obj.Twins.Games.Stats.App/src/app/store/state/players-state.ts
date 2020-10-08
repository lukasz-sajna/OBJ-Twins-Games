import { DateRange } from './../../models/date-range';
import { PlayerInfo } from 'src/app/models/player-info';
import { PlayerDetails } from 'src/app/models/player-details';
import { PlayerSteamStatus } from 'src/app/models/player-steam-status';

export interface PlayersState {
    allPlayers: PlayerInfo[];
    filteredPlayers: PlayerInfo[];
    playerDetails: PlayerDetails;
    isLoading: boolean;
    playerStatus: PlayerSteamStatus;
    isRefreshingStatus: boolean;
    dateRange: DateRange;
}