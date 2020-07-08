import { Injectable, Inject } from '@angular/core';
import { API_URL } from '../injection-tokens';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PlayerInfo } from '../models/player-info';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {  
  private readonly playerRootEndpoint = 'players';

  constructor(@Inject(API_URL) private apiUrl: string, private http: HttpClient) { }

  public getPlayersStats(): Observable<PlayerInfo[]> {
    return this.http.get<PlayerInfo[]>(`${this.apiUrl}${this.playerRootEndpoint}`, { responseType: 'json' });
  }

}
