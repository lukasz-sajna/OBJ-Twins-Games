import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Match } from 'src/app/models/match';
import { matchListRequested, openMatchDetails } from 'src/app/store/actions/match.actions';
import { MatchState } from 'src/app/store/state/match-state';
import { tap } from 'rxjs/operators';
import { matchListSelector, isLoadingSelector } from 'src/app/store/selectors/match-state.selector';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss']
})
export class MatchComponent implements OnInit {
  public matchList$: Observable<Match[]>;

  public isLoading$: Observable<boolean>;

  constructor(private store: Store<MatchState>) {
    this.matchList$ = this.store.select(matchListSelector);
    this.isLoading$ = this.store.select(isLoadingSelector);
  }

  public ngOnInit(): void {
    this.store.dispatch(matchListRequested());
  }

  public matchClicked(matchId: string): void {
    this.store.dispatch(openMatchDetails({ matchId }));
  }

}
