import { Component, OnInit } from '@angular/core';
import { StatsState } from 'src/app/store/state/stats-state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Match } from 'src/app/models/match';
import { matchListSelector, isLoadingSelector } from 'src/app/store/selectors/stats-state.selector';
import { matchListRequested, openMatchDetails } from 'src/app/store/actions/stats.actions';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss']
})
export class MatchComponent implements OnInit {
  public matchList$: Observable<Match[]>;

  public isLoading$: Observable<boolean>;

  constructor(private store: Store<StatsState>) {
    this.matchList$ = this.store.select(matchListSelector);
    this.isLoading$ = this.store.select(isLoadingSelector);
  }

  public ngOnInit(): void {
    this.store.dispatch(matchListRequested());
  }

  public matchClicked(matchId: number): void {
    this.store.dispatch(openMatchDetails({ matchId }));
  }

  public get ContainerHeight(): string {
    const header = document.getElementById('header');
    return `calc(100vh - ${header.getBoundingClientRect().height + 30}px)`;
  }

}
