import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TeamsState } from 'src/app/store/state/teams-state';
import { teamsStatsRequested, openTeamDetails } from 'src/app/store/actions/teams.actions';
import { Team } from 'src/app/models/team';
import { Observable } from 'rxjs';
import { allTeamsSelector, isLoadingSelector } from 'src/app/store/selectors/teams-state.selector';
import { openPlayerDetails } from 'src/app/store/actions/player.actions';

@Component({
  selector: 'app-team-stats',
  templateUrl: './team-stats.component.html',
  styleUrls: ['./team-stats.component.scss']
})
export class TeamStatsComponent implements OnInit {
  public allTeams$: Observable<Team[]>;
  public isLoading$: Observable<boolean>;

  constructor(private store: Store<TeamsState>) {
    this.allTeams$ = this.store.select(allTeamsSelector);
    this.isLoading$ = this.store.select(isLoadingSelector);
  }

  ngOnInit() {
    this.store.dispatch(teamsStatsRequested());
  }

  public rowClicked(teamId: string): void {
    this.store.dispatch(openTeamDetails({id: teamId}));
  }

  public playerClicked(playerId: string): void {
    this.store.dispatch(openPlayerDetails({ id: playerId }));
  }

}
