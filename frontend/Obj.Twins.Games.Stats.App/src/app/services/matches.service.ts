import { Injectable, Inject } from '@angular/core';
import { API_URL } from '../injection-tokens';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Match } from '../models/match';
import { MatchDetails } from '../models/match-details';

@Injectable({
  providedIn: 'root'
})
export class MatchesService {
  private readonly matchEndpoint = 'matches';

  constructor(@Inject(API_URL) private apiUrl: string, private http: HttpClient) { }

  public getMatches(): Observable<Match[]> {
    return this.http.get<Match[]>(`${this.apiUrl}${this.matchEndpoint}`, { responseType: 'json' });
  }

  public getMatch(id: string): Observable<MatchDetails> {
    return this.http.get<MatchDetails>(`${this.apiUrl}${this.matchEndpoint}/${id}`, { responseType: 'json' });
  }
}
