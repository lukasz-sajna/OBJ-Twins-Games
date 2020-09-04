import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { map, catchError, switchMap, tap, withLatestFrom, filter, distinctUntilChanged } from 'rxjs/operators';
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
    filterMatchesRequested,
    filterMatchesRequestedSucceeded,
    filterChangedRequested,
} from '../actions/match.actions';
import { ToastService } from 'src/app/services/toast.service';
import { Router } from '@angular/router';
import { MATCHES_ROUTE } from 'src/app/routes';
import { MatchesService } from 'src/app/services/matches.service';
import { MatchState } from '../state/match-state';
import { Store } from '@ngrx/store';
import { matchListSelector, matchesMapsSelector, filterSelector, isDefaultfilterSelector } from '../selectors/match-state.selector';
import { Match } from 'src/app/models/match';
import { MatchFilter } from 'src/app/models/match-filter';
import * as moment from 'moment';

@Injectable()
export class MatchEffects {
    constructor(
        private actions$: Actions,
        private matchesService: MatchesService,
        private toastService: ToastService,
        private router: Router,
        private store: Store<MatchState>,
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

    public matchDetailsRequestedSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(matchListRequestedSuccess),
            withLatestFrom(this.store.select(isDefaultfilterSelector)),
            filter(([_, isDefault]) => isDefault),
            withLatestFrom(this.store.select(matchListSelector), this.store.select(matchesMapsSelector)),
            map(([_, matches, matchesMaps]) =>
                filterChangedRequested({
                    filter: {
                        maps: matchesMaps,
                        dateRange: {
                            begin: matches.length > 0 ? matches[matches.length - 1].matchFinishedAt : new Date(),
                            end: matches.length > 0 ? matches[0].matchFinishedAt : new Date()
                        },
                        isDefault: true
                    }
                })
            )
        ));

    public filterChangedRequested$ = createEffect(() =>
        this.actions$.pipe(
            ofType(filterChangedRequested),
            withLatestFrom(this.store.select(filterSelector)),
            map(([_, filters]) => filterMatchesRequested({ filter: filters }))
        ));

    public filterMatchesRequested$ = createEffect(() =>
        this.actions$.pipe(
            ofType(filterMatchesRequested),
            distinctUntilChanged(),
            withLatestFrom(this.store.select(matchListSelector)),
            map(([action, matches]) =>
                filterMatchesRequestedSucceeded({ filteredMatches: this.filterMatches(matches, action.filter) })
            )
        ));

    private filterMatches(matches: Match[], filter: MatchFilter): Match[] {
        const matchesAfterMapFilter = matches.filter(x => filter.maps.some(p => p.name === x.map));
        const matchesAfterDateFilter = matchesAfterMapFilter
            .filter(x => this.checkIsDateInRange(x.matchFinishedAt, filter.dateRange.begin, filter.dateRange.end));

        return matchesAfterDateFilter;
    }

    private checkIsDateInRange(dateToCheck: Date, beginDate: Date, endDate: Date): boolean {
        const matchFinishedDate = moment(dateToCheck, 'YYYY-MM-DD');
        const begin = moment(beginDate, 'YYYY-MM-DD');
        const end = moment(endDate, 'YYYY-MM-DD');

        return matchFinishedDate.isSameOrAfter(begin) && matchFinishedDate.isSameOrBefore(end);
    }
}
