import { Injectable, Inject, OnDestroy } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { STATS_HUB } from '../injection-tokens';
import { GlobalState } from '../store/state/global-state';
import { Store } from '@ngrx/store';
import { selectUrlSelector, selectRouteParamsSelector } from '../store/selectors/global-state.selectors';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { tap, distinctUntilChanged, withLatestFrom } from 'rxjs/operators';
import { MATCHES_ROUTE, PLAYERS_ROUTE, TEAMS_ROUTE } from '../routes';
import { matchesRefreshRequested, matchDetailsRefreshRequested } from '../store/actions/match.actions';
import { playersRefreshRequested, playerDetailsRefreshRequested } from '../store/actions/player.actions';
import { teamsRefreshRequested, teamDetailsRefreshRequested } from '../store/actions/teams.actions';
import { Params } from '@angular/router';

@UntilDestroy()
@Injectable({
  providedIn: 'root'
})
export class SignalRService implements OnDestroy {
  private hubConnection: signalR.HubConnection;
  private currentUrl: string;
  private currentParams: Params;

  constructor(@Inject(STATS_HUB) private statsHub: string, private store: Store<GlobalState>) {
    this.store.select(selectUrlSelector).pipe(
      untilDestroyed(this),
      withLatestFrom(this.store.select(selectRouteParamsSelector)),
      distinctUntilChanged(),
      tap(([selectedUrl, params]) => {
        this.currentUrl = selectedUrl;
        this.currentParams = params;
      }),
    ).subscribe();
  }

  public ngOnDestroy(): void { }

  public buildConnection(): void {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(this.statsHub)
      .build();
  }

  public startConnection(): void {
    this.hubConnection
      .start()
      .then(() => {
        this.registerSignalEvents();
      })
      .catch(() => {
        setTimeout(() => {
          this.startConnection();
        }, 3000);
      });
  }

  private registerSignalEvents(): void {
    this.hubConnection.on('Refreshed', () => {
      if (this.currentUrl.startsWith(`/${MATCHES_ROUTE}`)) {
        console.log(this.currentParams);
        if (this.currentParams.matchId) {
          this.store.dispatch(matchDetailsRefreshRequested({ matchId: this.currentParams.matchId }));
        } else {
          this.store.dispatch(matchesRefreshRequested());
        }
      }
      if (this.currentUrl.startsWith(`/${PLAYERS_ROUTE}`)) {
        if (this.currentParams.playerId) {
          this.store.dispatch(playerDetailsRefreshRequested({playerId: this.currentParams.playerId}));
        } else {
          this.store.dispatch(playersRefreshRequested());
        }
      }
      if (this.currentUrl.startsWith(`/${TEAMS_ROUTE}`)) {
        if (this.currentParams.teamId) {
          this.store.dispatch(teamDetailsRefreshRequested({teamId: this.currentParams.teamId}));
        } else {
          this.store.dispatch(teamsRefreshRequested());
        }
      }
    });
  }
}
