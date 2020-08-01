import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { MatchDetails } from 'src/app/models/match-details';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';
import { tap, filter } from 'rxjs/operators';
import { MapBackgroundService } from 'src/app/services/map-background.service';
import { matchDetailsRequested, openMatchDetails } from 'src/app/store/actions/match.actions';
import { selectRouteParamsSelector } from 'src/app/store/selectors/global-state.selectors';
import { matchDetailsSelector, isLoadingSelector } from 'src/app/store/selectors/match-state.selector';
import { PlayerInfo } from 'src/app/models/player-info';
import { openPlayerDetails } from 'src/app/store/actions/player.actions';

@UntilDestroy()
@Component({
  selector: 'app-match-details',
  templateUrl: './match-details.component.html',
  styleUrls: ['./match-details.component.scss']
})
export class MatchDetailsComponent implements OnInit, OnDestroy {
  public matchDetails$: Observable<MatchDetails>;
  public isLoading$: Observable<boolean>;

  constructor(private store: Store<any>, private backgroundService: MapBackgroundService) {
    this.matchDetails$ = this.store.select(matchDetailsSelector);
    this.isLoading$ = this.store.select(isLoadingSelector);
  }

  public ngOnInit(): void {
    this.store.select(selectRouteParamsSelector).pipe(
      untilDestroyed(this),
      filter(params => params.matchId),
      tap(params => this.store.dispatch(matchDetailsRequested({ matchId: params.matchId })))
    ).subscribe();
  }
  public ngOnDestroy(): void { }

  public toObservable(playerInfo: PlayerInfo[]): Observable<PlayerInfo[]> {
    return of(playerInfo);
  }

  public downloadDemo(url: string): void {
    window.open(url, '_blank');
  }

  public rowClicked(playerId: string): void {
    this.store.dispatch(openPlayerDetails({ id: playerId }));
  }

  public matchClicked(matchId: string): void {
    this.store.dispatch(openMatchDetails({ matchId }));
  }

}
