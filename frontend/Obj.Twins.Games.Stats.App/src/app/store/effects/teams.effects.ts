import { Injectable } from '@angular/core';
import { TeamsService } from 'src/app/services/teams.service';
import { teamsStatsRequested, teamsStatsRequestedSuccess, teamsStatsRequestedFailure } from '../actions/teams.actions';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastService } from 'src/app/services/toast.service';

@Injectable()
export class TeamsEffects {
    constructor(
        private actions$: Actions,
        private teamsService: TeamsService,
        private toastService: ToastService
    ) { }

    public playersStatsRequested$ = createEffect(() =>
        this.actions$.pipe(
            ofType(teamsStatsRequested),
            switchMap(() =>
                this.teamsService.getTeams().pipe(
                    map(data => teamsStatsRequestedSuccess({ response: data })),
                    catchError(error => of(teamsStatsRequestedFailure({ error }))))
            ),
        ));

    public teamsStatsRequestedFailure$ = createEffect(() =>
        this.actions$.pipe(
            ofType(teamsStatsRequestedFailure),
            tap(() => this.toastService.showToast('Failed to fetch data. Please try again'))
        ), { dispatch: false }
    );
}
