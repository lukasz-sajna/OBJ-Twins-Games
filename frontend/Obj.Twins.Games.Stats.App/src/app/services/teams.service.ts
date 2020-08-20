import { Injectable, Inject } from '@angular/core';
import { API_URL } from '../injection-tokens';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Team } from '../models/team';
import { TeamDetails } from '../models/team-details';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {
  private readonly teamsEndpoint = 'teams';

  constructor(@Inject(API_URL) private apiUrl: string, private http: HttpClient) { }

  public getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(`${this.apiUrl}${this.teamsEndpoint}`, { responseType: 'json' });
  }

  public getTeamDetails(id: string): Observable<TeamDetails> {
    return this.http.get<TeamDetails>(`${this.apiUrl}${this.teamsEndpoint}/${id}`, { responseType: 'json' });
  }
}
