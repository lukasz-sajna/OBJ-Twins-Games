import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { openMatches, openPlayersStats } from '../actions/header.actions';
import { Observable } from 'rxjs';
import { MATCHES_ROUTE, PLAYERS_STATS_ROUTE } from 'src/app/routes';
import { tap } from 'rxjs/operators';

@Injectable()
export class HeaderEffects {
    constructor(private actions$: Actions, private router: Router) { }

    public openMatches$: Observable<any> = createEffect(() =>
        this.actions$.pipe(
            ofType(openMatches),
            tap(() => this.router.navigate([MATCHES_ROUTE]))
        ), { dispatch: false }
    );

    public openPlayersStats$: Observable<any> = createEffect(() =>
        this.actions$.pipe(
            ofType(openPlayersStats),
            tap(() => this.router.navigate([PLAYERS_STATS_ROUTE]))
        ), { dispatch: false }
    );
}
