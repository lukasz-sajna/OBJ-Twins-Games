import { Injectable } from '@angular/core';
import { TeamsService } from 'src/app/services/teams.service';
import { teamsStatsRequested, teamsStatsRequestedSuccess, teamsStatsRequestedFailure, openTeamDetails, teamDetailsRequested, teamDetailsRequestedSuccess, teamDetailsRequestedFailure, teamsRefreshRequested, teamDetailsRefreshRequested } from '../actions/teams.actions';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastService } from 'src/app/services/toast.service';
import { Router } from '@angular/router';
import { TEAMS_ROUTE } from 'src/app/routes';

@Injectable()
export class TeamsEffects {
    constructor(
        private actions$: Actions,
        private teamsService: TeamsService,
        private toastService: ToastService,
        private router: Router
    ) { }

    public teamsStatsRequested$ = createEffect(() =>
        this.actions$.pipe(
            ofType(teamsStatsRequested, teamsRefreshRequested),
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

    public openTeamDetails$ = createEffect(() =>
        this.actions$.pipe(
            ofType(openTeamDetails),
            tap(action => this.router.navigate([TEAMS_ROUTE, action.id]))
        ), { dispatch: false }
    );

    public teamDetailsRequested$ = createEffect(() =>
        this.actions$.pipe(
            ofType(teamDetailsRequested, teamDetailsRefreshRequested),
            switchMap((action) =>
                this.teamsService.getTeamDetails(action.teamId).pipe(
                    map(data => teamDetailsRequestedSuccess({ response: data })),
                    catchError(error => of(teamDetailsRequestedFailure({ error }))))
            ),
        ));
}
