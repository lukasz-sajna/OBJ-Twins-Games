import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { PlayersState } from 'src/app/store/state/players-state';
import { Store } from '@ngrx/store';
import { playerDetailSelector, playerIdSelector, isLoadingSelector, playerSteamStatusSelector, playerTeamsSelector } from 'src/app/store/selectors/players-state.selector';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { distinctUntilChanged, switchMap, tap, filter } from 'rxjs/operators';
import { playerStatusRequested, playerDetailsRequested, openPlayerDetails } from 'src/app/store/actions/player.actions';
import { selectRouteParamsSelector } from 'src/app/store/selectors/global-state.selectors';
import { GlobalState } from 'src/app/store/state/global-state';
import { PlayerDetails } from 'src/app/models/player-details';
import { PlayerSteamStatus } from 'src/app/models/player-steam-status';
import { Team } from 'src/app/models/team';

@UntilDestroy()
@Component({
  selector: 'app-player-details',
  templateUrl: './player-details.component.html',
  styleUrls: ['./player-details.component.scss']
})
export class PlayerDetailsComponent implements OnInit, OnDestroy {
  public playerDetails$: Observable<any> = new Observable();
  public playerTeams$: Observable<Team[]> = new Observable();
  public playerStatus$: Observable<PlayerSteamStatus> = new Observable();
  public isLoading$: Observable<boolean> = new Observable();

  public panelOpenState = false;

  constructor(private store: Store<PlayersState | GlobalState>) {
    this.playerDetails$ = this.store.select(playerDetailSelector);
    this.playerTeams$ = this.store.select(playerTeamsSelector);
    this.playerStatus$ = this.store.select(playerSteamStatusSelector);
    this.isLoading$ = this.store.select(isLoadingSelector);

    this.store.select(selectRouteParamsSelector).pipe(
      untilDestroyed(this),
      distinctUntilChanged(),
      filter(params => params.id),
      switchMap((params) => interval(30000).pipe(
        untilDestroyed(this),
        tap(() => this.store.dispatch(playerStatusRequested({ id: params.id })))
      ))
    ).subscribe();
  }

  ngOnInit(): void {
    this.store.select(selectRouteParamsSelector).pipe(
      untilDestroyed(this),
      filter(params => params.id),
      tap(params => {
        this.store.dispatch(playerDetailsRequested({ id: params.id }));
        this.store.dispatch(playerStatusRequested({id: params.id}));
      })
    ).subscribe();
  }

  public ngOnDestroy(): void {

  }

  public goToSteamProfile(url: string): void {
    window.open(url, '_blank');
  }

  public onPlayerClicked(id: string): void {
    this.store.dispatch(openPlayerDetails({id}));
  }

}
