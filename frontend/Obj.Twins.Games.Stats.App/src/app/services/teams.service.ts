import { Injectable, Inject } from '@angular/core';
import { API_URL } from '../injection-tokens';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Team } from '../models/team';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {
  private readonly teamsEndpoint = 'teams';
  private readonly teamDetailEndpoint = 'team/';

  constructor(@Inject(API_URL) private apiUrl: string, private http: HttpClient) { }

  public getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(`${this.apiUrl}${this.teamsEndpoint}`, { responseType: 'json' });
  }
}
