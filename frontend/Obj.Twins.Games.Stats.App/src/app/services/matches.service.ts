import { Injectable, Inject } from '@angular/core';
import { API_URL } from '../injection-tokens';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PlayerInfo } from '../models/player-info';
import { Match } from '../models/match';

@Injectable({
  providedIn: 'root'
})
export class MatchesService {
  private readonly matchEndpoint = 'matches';
  private readonly matchDetailsEndpoint = 'matches/MatchDetails/';


  constructor(@Inject(API_URL) private apiUrl: string, private http: HttpClient) { }

  public getMatches(): Observable<Match[]> {
    return this.http.get<Match[]>(`${this.apiUrl}${this.matchEndpoint}`, { responseType: 'json' });
  }
}
