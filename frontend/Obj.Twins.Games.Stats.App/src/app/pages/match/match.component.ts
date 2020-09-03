import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Match } from 'src/app/models/match';
import { matchListRequested, openMatchDetails } from 'src/app/store/actions/match.actions';
import { MatchState } from 'src/app/store/state/match-state';
import { tap } from 'rxjs/operators';
import { matchListSelector, isLoadingSelector, filteredMatchListSelector } from 'src/app/store/selectors/match-state.selector';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss']
})
export class MatchComponent implements OnInit, OnDestroy {
  public matchList$: Observable<Match[]>;

  public isLoading = true;

  constructor(private store: Store<MatchState>) {
    this.matchList$ = this.store.select(filteredMatchListSelector);
    this.store.select(isLoadingSelector).pipe(
      untilDestroyed(this),
      tap(isLoading => this.isLoading = isLoading)
    ).subscribe();
  }

  public ngOnInit(): void {
    this.store.dispatch(matchListRequested());
  }

  public ngOnDestroy(): void { }

  public matchClicked(matchId: string): void {
    this.store.dispatch(openMatchDetails({ matchId }));
  }

}
