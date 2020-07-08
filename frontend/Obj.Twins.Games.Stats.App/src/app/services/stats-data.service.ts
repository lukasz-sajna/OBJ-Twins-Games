import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as StatsDataEndpoints from './stats-data.enpoints';
import { API_URL } from '../injection-tokens';
import { PlayerInfo } from '../models/player-info';
import { Match } from '../models/match';
import { MatchDetails } from '../models/match-details';

@Injectable({
  providedIn: 'root'
})
export class StatsDataService {

  constructor(@Inject(API_URL) private apiUrl: string, private http: HttpClient) { }

  public getPlayersStats(): Observable<PlayerInfo[]> {
    return this.http.get<PlayerInfo[]>(`${this.apiUrl}${StatsDataEndpoints.playersStats}`, { responseType: 'json' });
  }

  public getMatches(): Observable<Match[]> {
    return this.http.get<Match[]>(`${this.apiUrl}${StatsDataEndpoints.matches}`);
  }
  public getMatchDetails(matchId: number): Observable<MatchDetails> {
    return this.http.get<MatchDetails>(`${this.apiUrl}${StatsDataEndpoints.matchDetails}${matchId}`);
  }

}
