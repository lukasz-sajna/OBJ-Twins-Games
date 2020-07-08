import { PlayerSteamInfo } from './player-steam-info';

export interface MatchDetailsPlayerInfo {
    name: string;
    steamId: string;
    account: number;
    kills: number;
    assists: number;
    deaths: number;
    mvp: number;
    score: number;
    kdRatio: number;
    steamPlayerData: PlayerSteamInfo;
}
