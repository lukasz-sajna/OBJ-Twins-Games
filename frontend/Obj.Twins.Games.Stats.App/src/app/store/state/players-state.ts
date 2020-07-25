import { PlayerInfo } from 'src/app/models/player-info';
import { PlayerDetails } from 'src/app/models/player-details';
import { PlayerSteamStatus } from 'src/app/models/player-steam-status';

export interface PlayersState {
    allPlayers: PlayerInfo[];
    playerDetails: PlayerDetails;
    isLoading: boolean;
    playerStatus: PlayerSteamStatus;
    isRefreshingStatus: boolean;
}