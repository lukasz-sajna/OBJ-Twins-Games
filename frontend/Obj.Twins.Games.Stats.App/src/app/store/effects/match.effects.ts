import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import {
    matchListRequested,
    matchListRequestedSuccess,
    matchListRequestedFailure,
    openMatchDetails,
    matchDetailsRequested,
    matchDetailsRequestedSuccess,
    matchDetailsRequestedFailure,
    matchesRefreshRequested,
    matchDetailsRefreshRequested,
} from '../actions/match.actions';
import { ToastService } from 'src/app/services/toast.service';
import { Router } from '@angular/router';
import { MATCHES_ROUTE } from 'src/app/routes';
import { MatchesService } from 'src/app/services/matches.service';

@Injectable()
export class MatchEffects {
    constructor(
        private actions$: Actions,
        private matchesService: MatchesService,
        private toastService: ToastService,
        private router: Router,
    ) { }

    public matchListRequested$ = createEffect(() =>
        this.actions$.pipe(
            ofType(matchListRequested, matchesRefreshRequested),
            switchMap(() =>
                this.matchesService.getMatches().pipe(
                    map(data => matchListRequestedSuccess({ response: data })),
                    catchError(error => of(matchListRequestedFailure({ error }))))
            ),
        ));

    public fetchDataFailure$ = createEffect(() =>
        this.actions$.pipe(
            ofType(matchListRequestedFailure, matchDetailsRequestedFailure),
            tap(() => this.toastService.showToast('Failed to fetch data. Please try again'))
        ), { dispatch: false }
    );

    public openMatchDetails$ = createEffect(() =>
        this.actions$.pipe(
            ofType(openMatchDetails),
            tap(action => this.router.navigate([MATCHES_ROUTE, action.matchId])),
            map(action => matchDetailsRequested({ matchId: action.matchId }))
        )
    );

    public matchDetailsRequested$ = createEffect(() =>
        this.actions$.pipe(
            ofType(matchDetailsRequested, matchDetailsRefreshRequested),
            switchMap(action =>
                this.matchesService.getMatch(action.matchId).pipe(
                    map(data => matchDetailsRequestedSuccess({ response: data })),
                    catchError(error => of(matchDetailsRequestedFailure({ error }))))
            ),
        ));
}
