import { Injectable, Inject } from '@angular/core';
import { API_URL } from '../injection-tokens';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PlayerInfo } from '../models/player-info';
import { PlayerDetails } from '../models/player-details';
import { PlayerSteamStatus } from '../models/player-steam-status';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {
  private readonly playerRootEndpoint = 'players';

  constructor(@Inject(API_URL) private apiUrl: string, private http: HttpClient) { }

  public getPlayersStats(): Observable<PlayerInfo[]> {
    return this.http.get<PlayerInfo[]>(`${this.apiUrl}${this.playerRootEndpoint}`, { responseType: 'json' });
  }

  public getPlayerDetails(id: string): Observable<PlayerDetails> {
    return this.http.get<PlayerDetails>(`${this.apiUrl}${this.playerRootEndpoint}/${id}`, { responseType: 'json' });
  }

  public getPlayerSteamStatus(id: string): Observable<PlayerSteamStatus> {
    return this.http.get<PlayerSteamStatus>(`${this.apiUrl}${this.playerRootEndpoint}/${id}/status`, { responseType: 'json' });
  }

}
