import { SteamStatus } from './steam-status.enum';

export interface PlayerSteamStatus {
    lastOnline: Date;
    status: SteamStatus;
}
