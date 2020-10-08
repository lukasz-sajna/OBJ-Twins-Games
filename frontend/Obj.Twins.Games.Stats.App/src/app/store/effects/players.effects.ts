import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { PLAYERS_ROUTE } from "src/app/routes";
import { PlayersService } from "src/app/services/players.service";
import { ToastService } from "src/app/services/toast.service";
import {
  openPlayerDetails,
  playerDetailsRefreshRequested,
  playerDetailsRequested,
  playerDetailsRequestedFailure,
  playerDetailsRequestedSuccess,
  playersRefreshRequested,
  playersStatsFilterChanged,
  playersStatsRequested,
  playersStatsRequestedFailure,
  playersStatsRequestedSuccess,
  playerStatusRequested,
  playerStatusRequestedFailure,
  playerStatusRequestedSuccess,
  filteredPlayersStatsRequestedSucceeded,
} from "../actions/player.actions";

@Injectable()
export class PlayersEffects {
  constructor(
    private actions$: Actions,
    private playersService: PlayersService,
    private toastService: ToastService,
    private router: Router
  ) {}

  public playersStatsRequested$ = createEffect(() =>
    this.actions$.pipe(
      ofType(playersStatsRequested, playersRefreshRequested),
      switchMap(() =>
        this.playersService.getPlayersStats().pipe(
          map((data) => playersStatsRequestedSuccess({ response: data })),
          catchError((error) => of(playersStatsRequestedFailure({ error })))
        )
      )
    )
  );

  public openPlayerDetails$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(openPlayerDetails),
        tap((action) => this.router.navigate([PLAYERS_ROUTE, action.id]))
      ),
    { dispatch: false }
  );

  public playerDetailsRequested$ = createEffect(() =>
    this.actions$.pipe(
      ofType(playerDetailsRequested, playerDetailsRefreshRequested),
      switchMap((action) =>
        this.playersService.getPlayerDetails(action.playerId).pipe(
          map((data) => playerDetailsRequestedSuccess({ response: data })),
          catchError((error) => of(playerDetailsRequestedFailure({ error })))
        )
      )
    )
  );

  public playerStatusRequested$ = createEffect(() =>
    this.actions$.pipe(
      ofType(playerStatusRequested),
      switchMap((action) =>
        this.playersService.getPlayerSteamStatus(action.id).pipe(
          map((data) => playerStatusRequestedSuccess({ response: data })),
          catchError((error) => of(playerStatusRequestedFailure({ error })))
        )
      )
    )
  );

  public fetchPlayerDataFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(playersStatsRequestedFailure, playerDetailsRequestedFailure),
        tap(() =>
          this.toastService.showToast("Failed to fetch data. Please try again")
        )
      ),
    { dispatch: false }
  );

  public fetchFilteredPlayers$ = createEffect(() =>
  this.actions$.pipe(
    ofType(playersStatsFilterChanged),
    switchMap((payload) =>
      this.playersService.getFilteredPlayersStats(payload.dateRange).pipe(
        map((data) => filteredPlayersStatsRequestedSucceeded({ response: data })),
        catchError((error) => of(playersStatsRequestedFailure({ error })))
      )
    )
  )
);
}
