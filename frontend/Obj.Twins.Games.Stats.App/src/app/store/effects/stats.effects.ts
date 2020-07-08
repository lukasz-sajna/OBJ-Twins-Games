import { Injectable } from '@angular/core';
import { StatsDataService } from 'src/app/services/stats-data.service';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import {
    playersStatsRequestedSuccess,
    playersStatsRequestedFailure,
    playersStatsRequested,
    matchListRequested,
    matchListRequestedSuccess,
    matchListRequestedFailure,
    openMatchDetails,
    matchDetailsRequested,
    matchDetailsRequestedSuccess,
    matchDetailsRequestedFailure,
} from '../actions/stats.actions';
import { ToastService } from 'src/app/services/toast.service';
import { Router } from '@angular/router';
import { MATCH_DETAILS_ROUTE } from 'src/app/routes';
import { PlayersService } from 'src/app/services/players.service';

@Injectable()
export class StatsEffects {
    constructor(
        private actions$: Actions,
        private statsDataService: StatsDataService,
        private playerService: PlayersService,
        private toastService: ToastService,
        private router: Router,
    ) { }

    public playersStatsRequested$ = createEffect(() =>
        this.actions$.pipe(
            ofType(playersStatsRequested),
            switchMap(() =>
                this.playerService.getPlayersStats().pipe(
                    map(data => playersStatsRequestedSuccess({ response: data })),
                    catchError(error => of(playersStatsRequestedFailure({ error }))))
            ),
        ));

    public matchListRequested$ = createEffect(() =>
        this.actions$.pipe(
            ofType(matchListRequested),
            switchMap(() =>
                this.statsDataService.getMatches().pipe(
                    map(data => matchListRequestedSuccess({ response: data })),
                    catchError(error => of(matchListRequestedFailure({ error }))))
            ),
        ));

    public fetchDataFailure$ = createEffect(() =>
        this.actions$.pipe(
            ofType(playersStatsRequestedFailure, matchListRequestedFailure, matchDetailsRequestedFailure),
            tap(() => this.toastService.showToast('Failed to fetch data. Please try again'))
        ), { dispatch: false }
    );

    public openMatchDetails$ = createEffect(() =>
        this.actions$.pipe(
            ofType(openMatchDetails),
            tap(action => this.router.navigate([MATCH_DETAILS_ROUTE, action.matchId])),
            map(action => matchDetailsRequested({ matchId: action.matchId }))
        )
    );

    public matchDetailsRequested$ = createEffect(() =>
        this.actions$.pipe(
            ofType(matchDetailsRequested),
            switchMap(action =>
                this.statsDataService.getMatchDetails(action.matchId).pipe(
                    map(data => matchDetailsRequestedSuccess({ response: data })),
                    catchError(error => of(matchDetailsRequestedFailure({ error }))))
            ),
        ));
}
