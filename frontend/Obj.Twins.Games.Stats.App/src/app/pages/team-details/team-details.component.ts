import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectRouteParamsSelector } from 'src/app/store/selectors/global-state.selectors';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';
import { filter, tap } from 'rxjs/operators';
import { teamDetailsRequested } from 'src/app/store/actions/teams.actions';
import { openPlayerDetails } from 'src/app/store/actions/player.actions';
import { openMatchDetails } from 'src/app/store/actions/match.actions';
import { Observable, of } from 'rxjs';
import { isLoadingSelector, teamDetailSelector, teamPlayersDetailsSelector } from 'src/app/store/selectors/teams-state.selector';
import { TeamDetails } from 'src/app/models/team-details';
import { PlayerInfo } from 'src/app/models/player-info';
import { MatchResult } from 'src/app/models/match-result.enum';

@UntilDestroy()
@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.scss']
})
export class TeamDetailsComponent implements OnInit, OnDestroy {
  public teamDetails$: Observable<TeamDetails> = new Observable();
  public players$: Observable<PlayerInfo[]> = new Observable();
  public isLoading$: Observable<boolean> = new Observable();

  public matchResult: typeof MatchResult = MatchResult;

  constructor(private store: Store<any>) {
    this.teamDetails$ = this.store.select(teamDetailSelector);
    this.isLoading$ = this.store.select(isLoadingSelector);
    this.players$ = this.store.select(teamPlayersDetailsSelector);
  }

  ngOnInit(): void {
    this.store.select(selectRouteParamsSelector).pipe(
      untilDestroyed(this),
      filter(params => params.teamId),
      tap(params => this.store.dispatch(teamDetailsRequested({ teamId: params.teamId })))
    ).subscribe();
  }

  ngOnDestroy(): void { }

  public onPlayerClicked(id: string): void {
    this.store.dispatch(openPlayerDetails({ id }));
  }

  public matchClicked(matchId: string): void {
    this.store.dispatch(openMatchDetails({ matchId }));
  }

  public toObservable(playerInfo: PlayerInfo[]): Observable<PlayerInfo[]> {
    return of(playerInfo);
  }

  public flagUrl(flagCode: string): string {
    return flagCode ? `https://www.countryflags.io/${flagCode}/flat/64.png` : String();
  }

  public winRateDecimalToPercent(input: number): string {
    return `${(input * 100).toFixed(2)}%`;
  }

  public matchResultShortName(matchResult: MatchResult): string {
    switch (matchResult) {
      case MatchResult.Win:
        return 'W';
      case MatchResult.Draw:
        return 'D';
      case MatchResult.Lost:
        return 'L';
      default:
        break;
    }
  }

}
