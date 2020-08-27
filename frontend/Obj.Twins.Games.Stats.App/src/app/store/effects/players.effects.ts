import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions, act } from '@ngrx/effects';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastService } from 'src/app/services/toast.service';
import { PlayersService } from 'src/app/services/players.service';
import {
    playersStatsRequested,
    playersStatsRequestedSuccess,
    playersStatsRequestedFailure,
    openPlayerDetails,
    playerDetailsRequested,
    playerDetailsRequestedFailure,
    playerDetailsRequestedSuccess,
    playerStatusRequested,
    playerStatusRequestedSuccess,
    playerStatusRequestedFailure,
    playersRefreshRequested,
    playerDetailsRefreshRequested
} from '../actions/player.actions';
import { PLAYERS_ROUTE } from 'src/app/routes';
import { Router } from '@angular/router';

@Injectable()
export class PlayersEffects {
    constructor(
        private actions$: Actions,
        private playersService: PlayersService,
        private toastService: ToastService,
        private router: Router,
    ) { }

    public playersStatsRequested$ = createEffect(() =>
        this.actions$.pipe(
            ofType(playersStatsRequested, playersRefreshRequested),
            switchMap(() =>
                this.playersService.getPlayersStats().pipe(
                    map(data => playersStatsRequestedSuccess({ response: data })),
                    catchError(error => of(playersStatsRequestedFailure({ error }))))
            ),
        ));

    public openPlayerDetails$ = createEffect(() =>
        this.actions$.pipe(
            ofType(openPlayerDetails),
            tap(action => this.router.navigate([PLAYERS_ROUTE, action.id]))
        ), { dispatch: false }
    );

    public playerDetailsRequested$ = createEffect(() =>
        this.actions$.pipe(
            ofType(playerDetailsRequested, playerDetailsRefreshRequested),
            switchMap((action) =>
                this.playersService.getPlayerDetails(action.playerId).pipe(
                    map(data => playerDetailsRequestedSuccess({ response: data })),
                    catchError(error => of(playerDetailsRequestedFailure({ error }))))
            ),
        ));

    public playerStatusRequested$ = createEffect(() =>
        this.actions$.pipe(
            ofType(playerStatusRequested),
            switchMap((action) =>
                this.playersService.getPlayerSteamStatus(action.id).pipe(
                    map(data => playerStatusRequestedSuccess({ response: data })),
                    catchError(error => of(playerStatusRequestedFailure({ error }))))
            ),
        ));

    public fetchPlayerDataFailure$ = createEffect(() =>
        this.actions$.pipe(
            ofType(playersStatsRequestedFailure, playerDetailsRequestedFailure),
            tap(() => this.toastService.showToast('Failed to fetch data. Please try again'))
        ), { dispatch: false }
    );
}
